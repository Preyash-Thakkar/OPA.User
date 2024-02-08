
import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import UiContent from "../../Components/Common/UiContent";
import axios from "axios";
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
//const id = localStorage.getItem("")
import { useNavigate } from "react-router-dom";
const AddEmployeeRoles = () => {
  const navigate=useNavigate();
  const [depgroup, setDepgroup] = useState(null);
  const[deptypebygroup,setDepTypeByGroup]=useState(null);
  const { GetallDepartmentGroup, GetDepTypeById,addEmployeeRole } = useContext(SignContext);
  const getdepgroup = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}employeename/getemployeebyrole/65b22b237bdbe67e3abbb8a2`);

    console.log(response.data);
    setDepgroup(response.data);
  };
  const getdeptype = async (id) => {
    const res = await GetDepTypeById(id);
    console.log(">>>>final",res);
    setDepTypeByGroup(res.data);
  };
  const handleDepGrp = (e) => {
    let depgrpid = e.target.value;
     
    if(depgrpid)
    {
      getdeptype(depgrpid);
    }
  };
  const addemployeerole = async (values) => {
    const response = await addEmployeeRole(values);

    console.log(response);
  };
  const cancel=()=>{
    navigate('/employee-roles')
  }
  useEffect(() => {
    getdepgroup();
  }, []);
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
                        departmentGroup: "",
                        departmentType: "",
                        EmployeeRole:"",
                        isActive:true,
                  }
                }
                onSubmit={(values, { resetForm }) => {
                    addemployeerole(values);
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
                                    <strong>Employee Role Detail</strong>
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
                                      onChange={(e) => {
                                      handleChange(e);
                                      handleDepGrp(e);
                                     }}
                                    >
                                      <option value="">--select--</option>
                                      {depgroup && depgroup.length > 0 ? (
                                          depgroup.map((type) => (
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
                                      onChange={handleChange}
                                    >
                                      <option value="">--select--</option>
                                      {deptypebygroup && deptypebygroup.length > 0 ? (
                                        deptypebygroup.map((type) => (
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
                                      Employee Role Name
                                    </label>
                                    <div className="mb-3">
                                      <Input
                                        type="text"
                                        className="form-control"
                                        id="product-orders-input"
                                        placeholder="Enter Title"
                                        name="EmployeeRole"
                                        aria-label="orders"
                                        aria-describedby="product-orders-addon"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.EmployeeRole}
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
                                      name="isActive"
                                      checked={values.isActive}
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

export default AddEmployeeRoles;
