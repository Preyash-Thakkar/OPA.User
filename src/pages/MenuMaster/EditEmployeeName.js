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
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const EditEmployeeName = () => {

    const navigate=useNavigate();
    const { GetEmployeeNameIdForEditing,setEditEmployeeNameValues} = useContext(SignContext);
    const { id } = useParams();
    const[typeid1,settypeid1]=useState({
        departmentGroup:" ",
        departmentType:" ",
        employeeRole:" ",
        name:" ",
        isActive:" ",
      });
    
    const gettingempname=async (id)=>{
      const res=await GetEmployeeNameIdForEditing(id);
      console.log(res);
      settypeid1(res.data)
      console.log("Hiiidfsdjbf",typeid1)
      
    }
    useEffect(() => {
        
      }, []);
    useEffect(()=>{
        gettingempname(id);
    },[])
    // console.log("Testing",typeid1.departmentGroup.name);
  return (
    <>
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            grandParent="Setup"
            parent="Company Master"
            child="Add-Company"
          />
          <Row>
            <Col lg={12}>
              <Formik
                // validationSchema={schema}
                initialValues={
                    typeid1
                }
                onSubmit={(values, { resetForm }) => {
                    const res=setEditEmployeeNameValues(id,typeid1.departmentGroup._id,typeid1.departmentType._id,typeid1.employeeRole._id,typeid1.name,typeid1.isActive)
                    console.log("Yesss",res);
                    if(res){
                        navigate('/employee-master');
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
                      
                      <form noValidate onSubmit={handleSubmit}>


                        <Card>
                          <CardHeader>
                            <Row className="g-1 m-1">
                              <Col className="col-sm">
                                <div className="d-flex justify-content-sm-between">
                                  <h2 className="card-title mb-0 justify-content-sm-start">
                                    <strong>Edit Employee Name</strong>
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
                                      Department Group
                                    </label>
                                    <div className="">
                                      <select
                                        className="form-select"
                                        name="departmentGroup"
                                        onBlur={handleBlur}
                                        value={values.departmentGroup}
                                        onChange={handleChange}
                                      >
                                        <option>{typeid1.departmentGroup.name}
                                      </option>
                                        
                                      </select>
                                    </div>
                                  </div>
                                </Col>
                                <Col sm={4}>
                                  <div className="mb-3">
                                    <label
                                      className="form-label"
                                      htmlFor="product-orders-input"
                                    >
                                      Department Type
                                    </label>
                                    <div className="">
                                      <select
                                        className="form-select"
                                        name="departmentType"
                                        onBlur={handleBlur}
                                        value={values.departmentGroup}
                                        onChange={handleChange}
                                      >
                                        <option>{typeid1.departmentType.name}</option>
                                        
                                      </select>
                                    </div>
                                  </div>
                                </Col>
                                <Col sm={4}>
                                  <div className="mb-3">
                                    <label
                                      className="form-label"
                                      htmlFor="product-orders-input"
                                    >
                                      Employee Role
                                    </label>
                                    <div className="">
                                      <select
                                        className="form-select"
                                        name="employeeRole"
                                        onBlur={handleBlur}
                                        value={values.departmentGroup}
                                        onChange={handleChange}
                                      >
                                        <option>{typeid1.employeeRole.EmployeeRole}</option>
                                        
                                      </select>
                                    </div>
                                  </div>
                                </Col>
                                <Col sm={4}>
                                  <div className="mb-3">
                                    <label
                                      className="form-label"
                                      htmlFor="product-orders-input"
                                    >
                                      Employee Name
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
                                        
                                        onChange={(e) => settypeid1((prev) => ({ ...prev, name: e.target.value }))}



                                        onBlur={handleBlur}
                                        value={typeid1.name}
                                      />
                                      <p className="error text-danger">
                                        {errors.gallaryCategoryTitle &&
                                          touched.gallaryCategoryTitle &&
                                          errors.gallaryCategoryTitle}
                                      </p>
                                    </div>
                                  </div>
                                </Col>
                                
                                <Col sm={2}>
                                  <div className="mt-3">
                                    <Input
                                      type="checkbox"
                                      id="isActive"
                                      label="Is Active"
                                      name="isActive"
                                      checked={typeid1.isActive}
                                      onChange={(e) => settypeid1({ ...typeid1, isActive: e.target.checked })}
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
                              Submit
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

export default EditEmployeeName;