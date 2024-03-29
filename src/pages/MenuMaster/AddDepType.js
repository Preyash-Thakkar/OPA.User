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
const AddDepType = () => {
  const [depgroup, setDepgroup] = useState(null);

  const { getSpecificDepartmentGroup, addDepType } = useContext(SignContext);
  const navigate=useNavigate();
  const getdepgroup = async () => {
    try {
      // Retrieve department group ID from local storage
      // const departmentGroupId = localStorage.getItem('your_department_group_id_key'); // Replace 'your_department_group_id_key' with the actual key
      const departmentGroupId = "65b0ea599d84e445fc900f09";
      // Fetch the specific department group using the ID
      const response = await getSpecificDepartmentGroup(departmentGroupId);
  
      console.log(response.data);
      // setDepgroup(response.data);
    } catch (error) {
      console.error("Error fetching department group:", error);
      // Handle error as needed
    }
  };
  
  const adddeptype = async (values) => {
    console.log(">>>>>> dep type")
    console.log(values);
    const response = await addDepType(values);

    console.log(response);
  };
  const cancel=()=>{
    navigate('/department-type')
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
                initialValues={{
                  departmentGroup: "",
                  name: " ",
                  isActive: true,
                }}
                onSubmit={(values, { resetForm }) => {
                  adddeptype(values);
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
                                    <strong>Add Department Type</strong>
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
  <label className="form-label" htmlFor="product-orders-input">
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
      <option value="">-- Select --</option>
      {depgroup ? (
        <option key={depgroup._id} value={depgroup._id}>
          {depgroup.name}
        </option>
      ) : (
        <option value="" disabled>
          No department group available
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
                                      <p className="error text-danger">
                                        {errors.gallaryCategoryTitle &&
                                          touched.gallaryCategoryTitle &&
                                          errors.gallaryCategoryTitle}
                                      </p>
                                    </div>
                                  </div>
                                </Col>
                                <Col sm={4}></Col>
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

export default AddDepType;
