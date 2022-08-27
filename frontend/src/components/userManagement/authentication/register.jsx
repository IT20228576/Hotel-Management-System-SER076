import { useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import countryList from "react-select-country-list";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [mobile, setMobile] = useState("");
  const [country, setCountry] = useState("lk");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");

  const options = useMemo(() => countryList().getData(), []);

  const navigate = useNavigate();

  /**
   * When the user clicks the submit button, prevent the default action, then send a Put request to the
   * server with the user's details, and if successful, navigate to the home page.
   */
  const register = async (e) => {
    e.preventDefault();
    try {
      /* Creating an object with the same name as the variables. */
      const RegisterData = {
        firstName,
        lastName,
        email,
        dob,
        mobile,
        country,
        password,
        passwordVerify,
      };

      /* Sending a PUT request to the server with the user's details. */
      const result = await axios.post(
        "http://localhost:8000/user/register",
        RegisterData
      );

      /* This is a conditional statement that checks if the status of the response is 200. If it is,
      then it will alert the user that the registration was successful and then it will remove the
      type and status from local storage. It will then navigate to the login page and reload the
      page. */
      if (result?.status === 200) {
        alert("Verification Email Sent successfully");
        /* Removing the type and status from local storage. */
        localStorage.removeItem("type");
        /* Reloading the page. */
        navigate("/");
        window.location.reload();
      }
    } catch (err) {
      console.error(err?.response?.data?.errorMessage);
      alert(err?.response?.data?.errorMessage);
    }
  };

    const countryHandler = (e) => {
    setCountry(e.value);
  };

  return (
    <div className="main">
      <div className="sub-main">
        <h1>Register</h1>
        <hr />
        <form onSubmit={register}>
          <div>
            <label>First Name</label>
            <input
              type="text"
              placeholder="First Name"
              required
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              className="form-input"
            />
          </div>
          <div>
            <label>Last Name</label>
            <input
              type="text"
              placeholder="Last Name"
              required
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              className="form-input"
            />
          </div>
          <div>
            <label>E-mail</label>
            <input
              type="email"
              placeholder="E-mail"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="form-input"
            />
          </div>
          <div>
            <label>Mobile</label>
            <input
              type="text"
              placeholder="Mobile"
              maxLength="10"
              required
              onChange={(e) => setMobile(e.target.value)}
              value={mobile}
              className="form-input"
            />
          </div>
          <div>
            <label>Country</label>
            <Select options={options} value={country} onChange={countryHandler} />
          </div>
          <div>
            <label>Date Of Birth</label>
            <input
              type="date"
              placeholder="Date Of Birth"
              required
              onChange={(e) => setDob(e.target.value)}
              value={dob}
              className="form-input"
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="form-input"
            />
          </div>
          <div>
            <label>Password Verify</label>
            <input
              type="password"
              placeholder="Password Verify"
              required
              onChange={(e) => setPasswordVerify(e.target.value)}
              value={passwordVerify}
              className="form-input"
            />
          </div>
          <div>
            <button className="button" type="submit">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
