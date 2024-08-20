import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { adminLogin } from "../services/allApis";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Login() {
  const [status, setStatus] = useState(true);
  const [data, setData] = useState({
    username: "",
    password: "",
    email: "",
  });


  const navigate = useNavigate("");


  //Login handling function
  const handleLogin = async () => {
    const { password, email } = data;
    if (!password || !email) {
      toast.warning("Invalid Inputs!! Enter all inputs!!");
    } else {
      const result = await adminLogin({ email, password });
      if (result.status == 200) {
        toast.success("Login successfull");
        sessionStorage.setItem("token", result.data.token);
        sessionStorage.setItem("admin","admin");
        sessionStorage.setItem("userId", result.data.userId);
        navigate("/admin");
      } else {
        toast.error(result.response.data);
      }
    }
  };


  return (
    <>
      <div
        className="w-100 d-flex justify-content-center align-items-center"
        style={{ height: "90vh" }}
      >
        <div className="w-10 bg-danger border shadow ">
        <Row>
          <Col className="p-5">
              <h3 className="mb-3">Admin Login</h3>
            <div>
              {!status && (
                <FloatingLabel
                  controlId="floatingUser"
                  label="Username"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    onChange={(e) => {
                      setData({ ...data, username: e.target.value });
                    }}
                  />
                </FloatingLabel>
              )}

              <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className="mb-3"
              >
                <Form.Control
                  type="email"
                  placeholder="Username"
                  onChange={(e) => {
                    setData({ ...data, email: e.target.value });
                  }}
                />
              </FloatingLabel>
              <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control
                  type="password"
                  minLength="8"
                  placeholder="Password"
                  onChange={(e) => {
                    setData({ ...data, password: e.target.value });
                  }}
                />
              </FloatingLabel>
              <div className="mt-3 d-flex justify-content-between">
            
                  <button
                    className="btn btn-success"
                    onClick={handleLogin}
                  >
                    Login
                  </button>
              </div>
            </div>
          </Col>
        </Row>
        </div>
      </div>
    </>
  );
}

export default Login;