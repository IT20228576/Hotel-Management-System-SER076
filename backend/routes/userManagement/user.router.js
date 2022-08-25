const router = require("express").Router();
const User = require("../../models/userManagement/user.model");
const bcrypt = require("bcryptjs");
const validation = require("../../utils/userManagement/validation.util");

/* The above code is a route handler for the /register route. It is used to register a new user. */
router.post("/register", async (req, res) => {
  try {
    /* Validating the request body using the Joi schema. */
    const validated = await validation.userRegisterSchema.validateAsync(
      req.body
    );

    /* Checking if the email is already in the database. */
    const user = await User.findUser({ email: validated.email });

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
