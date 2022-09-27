const router = require("express").Router();
const User = require("../../models/userManagement/user.model");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const validation = require("../../utils/userManagement/validation.util");
const service = require("../../utils/userManagement/service.util");
const email = require("../../utils/userManagement/email.util");
const { userAccess, adminAccess } = require("../../middleware/accessChecker");

/* The above code is a route handler for the /register route. It is used to register a new user. */
router.post("/register", async (req, res) => {
  try {
    /* Validating the request body using the Joi schema. */
    const validated = await validation.userRegisterSchema.validateAsync(
      req.body
    );

    /* Checking if the email is already in the database. */
    const user = await User.findOne({ email: validated.email });

    /* Checking if the email is already in the database. */
    if (user)
      return res.status(400).json({
        errorMessage: "An account with this email already exists.",
      });

    // hash the password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(validated.password, salt);

    // save a new user account to the db
    const newUser = new User({
      firstName: validated.firstName,
      lastName: validated.lastName,
      email: validated.email,
      mobile: validated.mobile,
      dob: validated.dob,
      country: validated.country,
      passwordHash: passwordHash,
      userType: validated.userType,
    });

    /* Saving the new User to the database. */
    const savedUser = await newUser.save();

    //email verification
    const token = await service.getVerifyToken(savedUser._id);

    /* Sending an verification email to the user. */
    await email.sendVeri(
      savedUser.email,
      savedUser.firstName,
      savedUser._id,
      token.token
    );

    /* Sending a response to the client. */
    res.status(201).send({ Message: "Verification Email sent to your email." });
  } catch (err) {
    if (err.isJoi === true) {
      console.error(err);
      return res.status(422).send({ errorMessage: err.details[0].message });
    } else {
      console.error(err);
      res.status(500).send(err);
    }
  }
});

/* This is a route handler for the /profile route. It is used to get the user information. */
router.get("/profile", userAccess, async (req, res) => {
  try {
    res.json(req.body.user);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

/* This is a route handler for the / route. It is used to get all the users. */
router.get("/", adminAccess, async (req, res) => {
  try {
    /* Destructuring the query parameters. */
    let { page, size } = req.query;

    /* Checking if the page and size query parameters are not present, then it is setting the default
    values. */
    if (!page) {
      page = 1;
    }
    if (!size) {
      size = 10;
    }
    /* Finding all the admins in the database. */
    const users = await User.find()
      .skip((page - 1) * size)
      .limit(size)
      .exec();
    /* count total users in the database. */
    let total = await User.countDocuments();
    total = parseInt(total / size + 1);

    /* Sending the users object to the client. */
    res.json({ users: users, total: total });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

/* This is a route handler for the update route. It is updating the user account. */
router.put("/update", userAccess, async (req, res) => {
  try {
    /* Validating the request body using the Joi schema. */
    const validated = await validation.userUpdateSchema.validateAsync(req.body);

    /* Updating the user account. */
    await User.findByIdAndUpdate(req.body.user._id, validated).exec();

    res.status(201).send({ Message: "Successfully updated the user." });
  } catch (err) {
    if (err.isJoi === true) {
      console.error(err);
      return res.status(422).send({ errorMessage: err.details[0].message });
    } else {
      res.json(false);
      console.error(err);
      res.status(500).send(err);
    }
  }
});

/* This is a route handler for the /changepassword route. It is used to change the password of the
user. */
router.put("/changepassword", userAccess, async (req, res) => {
  try {
    /* Validating the request body. */
    const validated = await validation.changePasswordSchema.validateAsync(
      req.body
    );

    /* Comparing the password entered by the user with the password stored in the database. */
    const isPasswordCorrect = await bcrypt.compare(
      validated.password,
      validated.user.passwordHash
    );

    /* Checking if the password entered by the user is correct or not. */
    if (!isPasswordCorrect)
      return res.status(401).json({ errorMessage: "Wrong Current Password." });

    // hash the password
    /* Hashing the password. */
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(validated.newPassword, salt);

    /* Checking the type of the user and updating the password of the user. */
      await User.findByIdAndUpdate(validated.user._id, {
        passwordHash: passwordHash,
      }).exec();

    /* Removing the cookie from the browser. */
    await service.removeCookie(res);
  } catch (err) {
    if (err.isJoi === true) {
      console.error(err);
      res.status(422).send({ errorMessage: err.details[0].message });
    } else {
      console.error(err);
      res.status(500).send(err);
    }
  }
});

/* This is a route handler for the /admin-register route. It is used to register a new admin. */
router.post("/create-user", adminAccess, async (req, res) => {
  try {
    /* Validating the request body. */
    const validated = await validation.createUserSchema.validateAsync(req.body);

    /* Checking if the email is already in the database. */
    const user = await User.findOne({ email: validated.email });
    if (user)
      return res.status(400).json({
        errorMessage: "An account with this email already exists.",
      });

    /* Generating a random string of length 10. */
    const oneTimePassword = crypto.randomBytes(10).toString("hex");

    // hash the password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(oneTimePassword, salt);

    // save a new user account to the db
    const newUser = new User({
      firstName: validated.firstName,
      lastName: validated.lastName,
      email: validated.email,
      mobile: validated.mobile,
      dob: validated.dob,
      passwordHash: hashedPassword,
      userType: validated.userType,
      adminCreated: true,
    });

    /* Saving the new user to the database. */
    const savedUser = await newUser.save();

    /* Sending an verification email to the user. */
    await email.sendVerification(savedUser.email, oneTimePassword);

    /* Sending a response to the client. */
    res.status(201).send({ Message: "Successfully created a new user" });

  } catch (err) {
    if (err.isJoi === true) {
      console.error(err);
      return res.status(422).send({ errorMessage: err.details[0].message });
    } else {
      console.error(err);
      res.status(500).send(err);
    }
  }
});

module.exports = router;
