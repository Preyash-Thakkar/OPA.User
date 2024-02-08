import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
// import User from "../"
import { gapi } from 'gapi-script';


import {
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Label,
  Row,
  Button,
  Form,
  Spinner,
  FormFeedback,
  Alert,
} from "reactstrap";
import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";
import logo from "../../assets/images/logo-white.png";
import { GoogleLogin } from "react-google-login";


// import { googleLogin } from "../../../../OPA_backend/middlewares/authMiddleware";
// const clientId="1005087809695-bm5o5takeq3sug0au1n0hab4ge5ug7e2.apps.googleusercontent.com
// "

//redux
import { Link, useNavigate } from "react-router-dom";

import withRouter from "../../Components/Common/withRouter";
import SignContext from "../../contextAPI/Context/SignContext";
const url = `${process.env.REACT_APP_BASE_URL}`;
let arr = []

let Roles = "";
let cms = ""
let departmenttype = ""
let menumaster = ""
let addtask = ""
let dashboard = ""
let communityupdatemaster = ""
let employeemaster = ""
let roless = ""
let assignmaster = "" 
let locationmaster = ""
let employeerole = ""
let departmentgroup = ""



const Login = () => {
  const [others , setothers] = useState(null)

 
  const url = `${process.env.REACT_APP_BASE_URL}`;

  const { loginAdmin } = useContext(SignContext);
  const navigate = useNavigate();
  const [AdminInfo, setAdminInfo] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setAdminInfo({ ...AdminInfo, [e.target.name]: e.target.value });
  };

 
  // This effect will run whenever selectedRole changes
  
  
  const [Error, setError] = useState("");
  const [Success, setSuccess] = useState("");
  const [confirmPasswordShow, setconfirmPasswordShow] = useState(false);
  const [buttnLoading, setButtnLoading] = useState(false);

  const handleGoogleSuccess = async (response) => {
    console.log("Nenenen", response);
    // console.log("neww",response.profileObj.email);
    try {
      const serverResponse = await axios.post(`${url}/auth/google-login-authentication`, {
        email: response.profileObj.email,

      });
      console.log("Hii", serverResponse.success);
      // console.log("Hii",serverResponse.location);

      if (serverResponse.success === true) {
        const { token, roles, id, location } = serverResponse;

        console.log("My default ID", id);
        console.log(serverResponse);
        // console.log("This is the Type",typeof(JSON.stringify(roles)));

        // console.log('Roles:', roles);
        // localStorage.setItem("loggedIn", true);
        // localStorage.setItem("authToken", token);
        // localStorage.setItem("user", JSON.stringify(serverResponse));
        // localStorage.setItem("Rights", JSON.stringify(roles));
        // Roles = roles;

        // localStorage.setItem("OPA ID", JSON.stringify(id));
        // window.localStorage.setItem("Google Location", JSON.stringify(location));
        // window.localStorage.setItem("email", JSON.stringify(serverResponse.profileObj.email));

        if (roles === "Admin" || roles === "Superadmin") {
          // Roles=roles;
          setSuccess(serverResponse.msg);

          navigate("/dashboard");
          // localStorage.removeItem("Rights");
        }
        else if (roles === "User") {
          // Roles=roles;

          setSuccess(serverResponse.msg);
          setTimeout(() => {
            navigate("/dashboard");
            // localStorage.removeItem("Rights");
          }, 3000);
        }
      } else {
        // Handle the case where the server response indicates failure
        console.error('Error during Google login:', serverResponse.data.message);
        alert("Please Enter a Valid Email Id")
      }
    } catch (error) {
      console.error('Error during Google login:', error);
      alert("Please Enter a Valid Email Id");
      // Handle the error as needed
    }

  };

  const handleGoogleFailure = (error) => {
    console.error('Google login failure:', error);

  };




  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtnLoading(true);
  
    try {
      let apiEndpoint = '';
       
      //  const response = await axios.get('')
        // If the selected role is User, hit the /user/authentication endpoint
        apiEndpoint = `${url}/user/authentication`;
      
  
      // Perform login based on the determined API endpoint
      const res = await axios.post(apiEndpoint, AdminInfo);
        if (res.success) {
        localStorage.setItem("loggedIn", true);
        localStorage.setItem("authToken", res.token);

        localStorage.setItem("ID", res._id);
        localStorage.setItem("Location ID", res.locationSchema);
        localStorage.setItem("Department Group ID", res.departmentGroup);
        localStorage.setItem("Department Type ID", res.departmentType);
        localStorage.setItem("Employee Role ID", res.employeeRole);
        localStorage.setItem("Employee Name ID", res.employeeName);
        localStorage.setItem("CommunityUpdateMaster", res.CommunityUpdateMaster);
        localStorage.setItem("AdminUser", res.AdminUser);
        localStorage.setItem("Roles", res.Roles);
        localStorage.setItem("MenuMaster", res.MenuMaster);
        localStorage.setItem("Dashboard", res. Dashboard);
        localStorage.setItem("isActive", res.isActive);
        localStorage.setItem("DepartmentGroup", res.DepartmentGroup);
        localStorage.setItem("DepartmentType", res.DepartmentType);
        localStorage.setItem("EmployeeRole", res.EmployeeRole);
        localStorage.setItem("Employeemaster", res.Employeemaster);
        localStorage.setItem("AddTask", res.AddTask);
        localStorage.setItem("AssignMaster", res.AssignMaster);
        localStorage.setItem("CMS", res.CMS);
        navigate("/dashboard")
      } else {
        setError(res.msg);
      }
      setButtnLoading(false);
    } catch (error) {
      // Handle error
      setButtnLoading(false);
    }
  };
  useEffect(()=>{
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",others)
 },[others])
  document.title = "OPA | Login";
  return (
    <React.Fragment>
      <ParticlesAuth>
        <div className="auth-page-content">
          <Container>
            <Row>
              <Col lg={12}>
                <div className="text-center mt-sm-5 mb-4 text-white-50">
                  <div>
                    <img
                      src={logo}
                      alt="OPA"
                      style={{ maxHeight: "100px" }}
                    ></img>
                  </div>
                  {/* <p className="mt-3 fs-15 fw-medium">
                    Premium Admin & Dashboard Template
                  </p> */}
                </div>
              </Col>
            </Row>

            <Row className="justify-content-center">
              <Col md={8} lg={6} xl={5}>
                <Card className="mt-4">
                  <CardBody className="p-4">
                    <div className="text-center mt-2">
                      <h5 className="text-primary">Welcome Back !</h5>
                      <p className="text-muted">
                        Sign in to continue to One Portal for All (OPA) System.
                      </p>
                    </div>
                    {Error && Error ? (
                      <Alert color="danger"> {Error} </Alert>
                    ) : null}
                    {Success && Success ? (
                      <Alert color="success"> {Success} </Alert>
                    ) : null}
                    <div className="p-2 mt-4">
                      <Form onSubmit={(e) => handleSubmit(e)}>
                        <div className="mb-3">
                          <Label htmlFor="email" className="form-label">
                            Email
                          </Label>
                          <Input
                            className="form-control"
                            placeholder="Enter email"
                            type="email"
                            name="email"
                            value={AdminInfo.email}
                            onChange={(e) => {
                              handleChange(e);
                            }}
                          />
                        </div>

                        <div className="mb-3">
                          {/* <div className="float-end">
                            <Link to="/forgot-password" className="text-muted">
                              Forgot password?
                            </Link>
                          </div> */}
                          <Label
                            className="form-label"
                            htmlFor="password-input"
                          >
                            Password
                          </Label>
                          <div className="position-relative auth-pass-inputgroup mb-3">
                            <Input
                              className="form-control pe-5"
                              placeholder="Enter Password"
                              name="password"
                              type={confirmPasswordShow ? "text" : "password"}
                              value={AdminInfo.password}
                              onChange={(e) => {
                                handleChange(e);
                              }}
                            />
                            <button
                              className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
                              type="button"
                              id="password-addon"
                              onClick={() =>
                                setconfirmPasswordShow(!confirmPasswordShow)
                              }
                            >
                              <i className="ri-eye-fill align-middle"></i>
                            </button>
                          </div>
                        </div>

                        {/* <div className="form-check">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="auth-remember-check"
                          />
                          <Label
                            className="form-check-label"
                            htmlFor="auth-remember-check"
                          >
                            Remember me
                          </Label>
                        </div> */}
                        
                        {!buttnLoading ? (
                          <div className="mt-4">
                            <Button
                              color="success"
                              className="btn btn-success w-100"
                              type="submit"
                            >
                              Sign In
                            </Button>
                          </div>
                        ) : (
                          <Button
                            color="success"
                            className="btn-load  w-100"
                            outline
                            disabled
                          >
                            <span className="d-flex align-items-center">
                              <Spinner size="sm" className="flex-shrink-0">
                                {" "}
                                Loading...{" "}
                              </Spinner>
                              <span className="flex-grow-1 ms-2">
                                Loading...
                              </span>
                            </span>
                          </Button>
                        )}

                        <div className="mt-4 text-center">
                          <div className="signin-other-title">
                            <h5 className="fs-13 mb-4 title">Sign In with</h5>
                          </div>
                          <div>
                            <GoogleLogin
                              clientId="1005087809695-bm5o5takeq3sug0au1n0hab4ge5ug7e2.apps.googleusercontent.com"

                              render={(renderProps) => (
                                <span
                                  onClick={renderProps.onClick}
                                  disabled={renderProps.disabled}
                                  style={{ color: "red" }}
                                >
                                  <i className="ri-google-fill" style={{ color: "brown", fontSize: "30px" }} />
                                </span>
                              )}
                              onSuccess={handleGoogleSuccess}
                              onFailure={handleGoogleFailure}
                              cookiePolicy={'single_host_origin'}
                              prompt="select_account"
                              googleToken
                            />
                          </div>
                        </div>
                        <div className="mt-4 text-center">
                          <p className="mb-0">
                            Forgot Password ?{" "}
                            <Link
                              to="/forgot-password"
                              className="fw-semibold text-primary text-decoration-underline"
                            >
                              {" "}
                              Forgot{" "}
                            </Link>{" "}
                          </p>
                        </div>
                      </Form>
                    </div>
                  </CardBody>
                </Card>


              </Col>
            </Row>
          </Container>
        </div>
      </ParticlesAuth>
    </React.Fragment>
  );
};
export { Roles };
export default withRouter(Login);
export {cms , departmenttype , menumaster , addtask , dashboard , communityupdatemaster , employeemaster , roless , assignmaster , locationmaster , employeerole , departmentgroup}