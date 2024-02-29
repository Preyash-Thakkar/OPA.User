import React, { useState, useEffect, useContext } from "react";
import { isEmpty } from "lodash";

import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  CardBody,
  Button,
  Label,
  Input,
  FormFeedback,
  Form,
} from "reactstrap";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

//redux
import { useSelector, useDispatch } from "react-redux";


// actions

import SignContext from "../../contextAPI/Context/SignContext";
import { useNavigate, useParams } from "react-router-dom";

const UserProfile = () => {
  const { id } = useParams();
  const { updateUser, getSpecificUser } = useContext(SignContext);
  const [AdminInfo, setAdminInfo] = useState({name:""});
  const [Error, setError] = useState("");
  const [Success, setSuccess] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Update the name field only
    setAdminInfo({ ...AdminInfo, name: value });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    getspecificuser(id);
    const res = await updateUser(AdminInfo, id);
    // console.log("newwww",res);
    if (res.success) {
      setSuccess(res.msg);
      setTimeout(() => {
      }, 1000);
    } else {
      setError(res.msg);
      setTimeout(() => {
        setError("");
      }, 1000);
    }
  };

  const getspecificuser = async (id) => {
    const res = await getSpecificUser(id);
    if (res.success) {
      setAdminInfo(res);
      // console.log("This is the message",res);
    } else {
      // console.log("Hiii",res.msg);
    }
  };

  useEffect(() => {
    getspecificuser(id);
  }, []);

  document.title = "OPA|Profile";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg="12">
              {Error && Error ? <Alert color="danger">{Error}</Alert> : null}
              {Success ? (
                <Alert color="success">Username Updated To {AdminInfo.name}</Alert>
              ) : null}

              <Card>
                <CardBody>
                  <div className="d-flex">
                    <div className="mx-3">
                      <img
                        src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTStsoSO-6uUysC6wwkhhCmuXoY26DRV_jL1wo_4sC-yQ&s"}
                        alt=""
                        className="avatar-md rounded-circle img-thumbnail"
                      />
                    </div>
                    <div className="flex-grow-1 align-self-center">
                      <div className="text-muted">
                        <h5>{AdminInfo.name}</h5>
                        <p className="mb-1">Email Id : {AdminInfo.email}</p>
                        <p className="mb-0">Id No : {AdminInfo._id}</p>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <h4 className="card-title mb-4">Change User Name</h4>

          <Card>
            <CardBody>
              <Form onSubmit={(e) => handleSubmit(e)}
                className="form-horizontal"
              >
                <div className="form-group">
                  <Label className="form-label">User Name</Label>
                  <Input
                    type="text"
                    className="form-control mt-1"
                    id="name"
                    placeholder="name"
                    name="name"
                    value={AdminInfo.name}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    disabled={!AdminInfo.editable}
                  />
                </div>
                <div className="text-center mt-4">
                  <Button type="submit" color="danger">
                    Update User Name
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default UserProfile;
