import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import UiContent from "../../Components/Common/UiContent";
import {
  Card,
  CardHeader,
  Col,
  Container,
  Input,
  Row,
  Label,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { TagsInput } from "react-tag-input-component";
import SignContext from "../../contextAPI/Context/SignContext";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
const EditLocation = () => {
  const navigate=useNavigate();
  const[grp,setgrp]=useState({
    name:" ",
    isActive:" ",
  }
  );
  
  const { EditDepGrp,GetLocationById,setEditLocationValues,GetallLocation } = useContext(SignContext);
  const { id } = useParams();
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("department group is required"),
  });
 
  const gettingid=async()=>{
     console.log("hello");
      const res= await GetLocationById(id);
      console.log(res);
      setgrp(res.data);
      
    
      
  }
  const cancel=()=>{
    navigate('/location-master')
  }

  useEffect(() => {
    console.log(grp);
  }, [grp]);
  useEffect(()=>{
    gettingid();
  },[id])

  return (
    <>
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            grandParent="Location Master"
            parent="Company Master"
            child="Add-Company"
          />
          <Row>
            <Col lg={12}>
              <Formik
                validationSchema={validationSchema}
                initialValues={
                  grp
                }
                onSubmit={(values, { resetForm }) => {
                   console.log(">>>",id,grp.name,grp.isActive)
                   const res=setEditLocationValues(id,grp.name,grp.isActive);
                   console.log(res);
                   if(res)
                   {
                    GetallLocation();
                    navigate('/location-master')
                   }
                    resetForm();
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                }) => (
                  <div className="login">
                    <div className="form">
                      
                      <form onSubmit={handleSubmit}>
                       

                        <Card>
                          <CardHeader>
                            <Row className="g-1 m-1">
                              <Col className="col-sm">
                                <div className="d-flex justify-content-sm-between">
                                  <h2 className="card-title mb-0 justify-content-sm-start">
                                    <strong>Edit Location</strong>
                                  </h2>
                                </div>
                              </Col>
                            </Row>
                          </CardHeader>
                          <div className="card-body">
                            <div className="live-preview">
                              <Row className="align-items-center g-3">
                                <Col sm={4}>
                                  <div className="mb-3">
                                    <label
                                      className="form-label"
                                      htmlFor="product-orders-input"
                                    >
                                      Location name
                                    </label>
                                    <div className="mb-3">
                                      <Input
                                        type="text"
                                        className="form-control"
                                        id="product-orders-input"
                                        placeholder="Enter Title"
                                        name="name"
                                        aria-label="orders"
                                        aria-describedby="product-orders-addon"
                                        onChange={(e) => setgrp({ ...grp, name: e.target.value })}
                                        onBlur={handleBlur}
                                        value={grp.name}
                                      />
                                      <p className="error text-danger">
                                        {errors.name &&
                                          touched.name &&
                                          errors.name}
                                      </p>
                                    </div>
                                  </div>
                                </Col>
                                <Col sm={8}></Col>
                                <Col sm={2}>
                                  <div className="mt-3">
                                    <Input
                                      type="checkbox"
                                      id="isActive"
                                      label="Is Active"
                                      name="isActive"
                                      checked={grp.isActive}
                                      onChange={(e) => setgrp({ ...grp, isActive: e.target.checked })}
                                    />
                                    <label className="me-2">Is Active</label>
                                  </div>
                                </Col>
                              </Row>
                            </div>
                          </div>
                          <div className="text-end mb-3 me-3">
                            <button
                              className="btn btn-success w-sm"
                              type="submit"
                            >
                              SUBMIT
                            </button>
                            <button
                              className="btn btn-danger w-sm"
                              onClick={cancel}
                              style={{marginLeft:'3px'}}
                            >
                              Cancel
                              
                            </button>
                          </div>
                        </Card>
                      </form>
                    </div>
                  </div>
                )}
              </Formik>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default EditLocation;
