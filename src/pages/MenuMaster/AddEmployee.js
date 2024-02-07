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
import { useNavigate } from "react-router-dom";
const AddEmployee = () => {
  const { GetallLocation, GetallDepartmentGroup, GetDepTypeById,GetEmployeeRoleById,addEmployeeName } =
    useContext(SignContext);
    const navigate=useNavigate();
  const [loc, setloc] = useState(null);
  const [grp, setgrp] = useState(null);
  const [dtype, setdtype] = useState(null);
  const [aa, setaa] = useState("");
  const [employeerole,setemployeerole]=useState(null);
  const getdeptype = async (id) => {
    const res = await GetDepTypeById(id);
    console.log(">>>>final", res);
    setdtype(res.data);
    
    
    console.log("hello>>>",res.data[0].departmentGroup._id)
    setaa(res.data[0].departmentGroup._id);
  };
  const handleDepGrp = (e) => {
    let depgrpid = e.target.value;
    console.log(depgrpid);
    
    if(depgrpid){
    getdeptype(depgrpid);
    }
    

   
  };
  const getemployeerole = async (id,s) => {
    console.log(s);
    console.log(id);
    const res = await GetEmployeeRoleById(s,id);
    setemployeerole(res.data);
  };
  const handleDepType = (e) => {
    let deptypeid = e.target.value;
    // console.log("dpetype>>",deptypeid);
    // console.log("vaishal",aa);

    if(deptypeid)
    {
      getemployeerole(deptypeid,aa)
    }
    
    

   
  };
  const cancel=()=>{
    navigate('/employee-master')
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await GetallLocation();
        setloc(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [GetallLocation]);

  const fetchData1 = async () => {
    try {
      const res = await GetallDepartmentGroup();
      setgrp(res.data);
      console.log(grp);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const addEmployeeName1 = async (values) => {
    const response = await addEmployeeName(values);

    console.log(response);
  };
  useEffect(() => {
    fetchData1();
  }, []);
  useEffect(() => {
    console.log(grp);
  }, [grp]);
  useEffect(() => {
    console.log(loc);
  }, [loc]);
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
                  {
                    location:"",
                      departmentGroup: "",
                      departmentType: "",
                      employeeRole: "",
                       name: "",
                      email:"",
                      password:"",

                  }
                }
                onSubmit={(values, { resetForm }) => {
                    console.log("hello");
                    console.log(">>>>>",values);
                    addEmployeeName1(values);
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
                      {/* Passing handleSubmit parameter tohtml form onSubmit property */}
                      <form noValidate onSubmit={handleSubmit}>
                        {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}

                        <Card>
                          <CardHeader>
                            <Row className="g-1 m-1">
                              <Col className="col-sm">
                                <div className="d-flex justify-content-sm-between">
                                  <h2 className="card-title mb-0 justify-content-sm-start">
                                    <strong>Employee Details</strong>
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
                                      Location
                                    </label>
                                    <div className="">
                                      <select
                                        className="form-select"
                                        name="location"
                                        onBlur={handleBlur}
                                        value={values.location}
                                        onChange={handleChange}
                                      >
                                        <option value="">--select--</option>
                                        {loc && loc.length > 0 ? (
                                          loc.map((type) => (
                                            <option key={type} value={type._id}>
                                              {type.name}
                                            </option>
                                          ))
                                        ) : (
                                          <option value="" disabled>
                                            No locations available
                                          </option>
                                        )}
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
                                      Department Group
                                    </label>
                                    <div className="">
                                      <select
                                        className="form-select"
                                        name="departmentGroup"
                                        onBlur={handleBlur}
                                        value={values.departmentGroup}
                                        onChange={(e) => {
                                          handleChange(e);
                                          handleDepGrp(e);
                                        }}
                                      >
                                        <option value="">--select--</option>
                                        {grp && grp.length > 0 ? (
                                          grp.map((type) => (
                                            <option key={type} value={type._id}>
                                              {type.name}
                                            </option>
                                          ))
                                        ) : (
                                          <option value="" disabled>
                                            No grp available
                                          </option>
                                        )}
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
                                        value={values.departmentType}
                                        onChange={(e) => {
                                          handleChange(e);
                                          handleDepType(e);
                                        }}
                                      >
                                        <option value="">--select--</option>
                                        {dtype && dtype.length > 0 ? (
                                          dtype.map((type) => (
                                            <option key={type} value={type._id}>
                                              {type.name}
                                            </option>
                                          ))
                                        ) : (
                                          <option value="" disabled>
                                            No type available
                                          </option>
                                        )}
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
                                      Employee Roles
                                    </label>
                                    <div className="">
                                      <select
                                        className="form-select"
                                        name="employeeRole"
                                        onBlur={handleBlur}
                                        value={values.employeeRole}
                                        onChange={handleChange}
                                      >
                                        <option value="">--select--</option>
                                        {employeerole && employeerole.length > 0 ? (
                                          employeerole.map((type) => (
                                            <option key={type} value={type._id}>
                                              {type.EmployeeRole}
                                            </option>
                                          ))
                                        ) : (
                                          <option value="" disabled>
                                            No role available
                                          </option>
                                        )}
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
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.name}
                                      />
                                      {/* <p className="error text-danger">
                                        {errors.gallaryCategoryTitle &&
                                          touched.gallaryCategoryTitle &&
                                          errors.gallaryCategoryTitle}
                                      </p> */}
                                    </div>
                                  </div>
                                </Col>
                                <Col sm={4}>
                                  <div className="mb-3">
                                    <label
                                      className="form-label"
                                      htmlFor="product-orders-input"
                                    >
                                      Email
                                    </label>
                                    <div className="mb-3">
                                      <Input
                                        type="text"
                                        className="form-control"
                                        id="product-orders-input"
                                        placeholder="Enter Title"
                                        name="email"
                                        aria-label="orders"
                                        aria-describedby="product-orders-addon"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                      />
                                      {/* <p className="error text-danger">
                                        {errors.gallaryCategoryTitle &&
                                          touched.gallaryCategoryTitle &&
                                          errors.gallaryCategoryTitle}
                                      </p> */}
                                    </div>
                                  </div>
                                </Col>
                                <Col sm={4}>
                                  <div className="mb-3">
                                    <label
                                      className="form-label"
                                      htmlFor="product-orders-input"
                                    >
                                      Password
                                    </label>
                                    <div className="mb-3">
                                      <Input
                                        type="text"
                                        className="form-control"
                                        id="product-orders-input"
                                        placeholder="Enter Title"
                                        name="password"
                                        aria-label="orders"
                                        aria-describedby="product-orders-addon"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password}
                                      />
                                      {/* <p className="error text-danger">
                                        {errors.gallaryCategoryTitle &&
                                          touched.gallaryCategoryTitle &&
                                          errors.gallaryCategoryTitle}
                                      </p> */}
                                    </div>
                                  </div>
                                </Col>
                                <Col sm={2}>
                                  <div className="mt-3">
                                    <Input
                                      type="checkbox"
                                      id="isActive"
                                      label="Is Active"
                                      name="active"
                                      checked={values.active}
                                      onChange={handleChange}
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

export default AddEmployee;
