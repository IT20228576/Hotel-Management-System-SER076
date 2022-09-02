import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  /**
   * When the user clicks the submit button, prevent the default action, then send a POST request to the
   * server with the user's email and password, and if successful, navigate to the home page.
   */
  const login = async (e) => {
    e.preventDefault();
    try {
      /* Creating an object with the email and password. */
      const loginData = {
        email,
        password,
      };

      /* Sending a POST request to the server with the user's email and password. */
      const result = await axios.post("http://localhost:8000/login", loginData);

      /* Checking if the status is true. */
      if (result) {
        /* Setting the local storage with the type and status. */
        localStorage.setItem("type", result?.data?.type);
        /* Reloading the page. */
        navigate("/");
        window.location.reload();
      }
    } catch (err) {
      console.error(err.response.data.errorMessage);
      alert(err.response.data.errorMessage);
    }
  };

  return (
    <div className="main">
      <div className="sub-main">
        <div className="main-center">
          <h1 style={{ margin: "2%" }}>Login</h1>
        </div>
        <hr />
        <form border="dark" onSubmit={login}>
          <Container>
            <Row className="justify-content-md-center">
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="E-mail"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Container>
          <div className="main-center">
            <Button
              variant="primary"
              size="lg"
              type="submit"
              style={{ width: "40%", float: "center", margin: "5px" }}
            >
              Submit
            </Button>
          </div>
        </form>
        <hr />
        <div className="main-center">
          <button className="forgot-button">Forgot Password?</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
