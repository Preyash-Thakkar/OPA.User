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
import { useNavigate, useParams } from "react-router-dom";

const AddTask = () => {
  const validationSchema = Yup.object().shape({
    departmentType: Yup.string().required("Please select a Department Type"),
    taskName: Yup.string().required("Please Enter a Task Name"),
    taskType: Yup.string().required("Please select a task Type"),
    accessLocation: Yup.string().required("Please select Access Location"),

  detail: Yup.string().required("Detail is required"),
  // email: Yup.string().email("Invalid email").required("Email is required"),
  // password: Yup.string()
    // .min(8, "Password must be at least 8 characters")
    // .required("Password is required"),

    
    });
  const navigate=useNavigate();
  const [departmenttype, setdepartmentype] = useState(null);
  const { GetDepTypeByIdForEditing,addTask,setDepartmentName,departmentName,GetallAddTask } = useContext(SignContext);
  const getalldtype = async () => {

    try {
      // Retrieve department ID from localStorage
      const departmentId = localStorage.getItem('DepartmentTypeID'); // Replace 'your_department_id_key' with the actual key
  // const departmentId = "65b0ebc59d84e445fc900f18";
      // Make API call to get department data by ID for editing
      const response = await GetDepTypeByIdForEditing(departmentId);
      console.log("Dtype", response);
      console.log("Department",response.data);
      setdepartmentype(response.data);
  
      // Set the department type in state
      // setdepartmentype(response.data);
    } catch (error) {
      // Handle error
      console.error('Error fetching department type for editing:', error);
    }
  };
  

  const addDetails = async (values) => {
    const response = await addTask(values);
return response;
    console.log(response);
  };
  const cancel=()=>{
    navigate('/add-taskmaster')
  }
  useEffect(() => {
    getalldtype();
  }, []);
  useEffect(() => {
    console.log("shdbhsdbhsdb",departmenttype);
  }, [departmenttype]);
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
                validationSchema={validationSchema}
                initialValues={
                  {
                    departmentType:"",
                    taskName:"",
                    taskType:"",
                    accessLocation:"",
                    detail:"",
                    isActive: true,
                  }
                }
                onSubmit={(values, { resetForm }) => {
                    const res=addDetails(values);
                    if(res){
                      GetallAddTask();
                      navigate('/add-taskmaster');
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
                      {/* Passing handleSubmit parameter tohtml form onSubmit property */}
                      <form noValidate onSubmit={handleSubmit}>
                        {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}

                        <Card>
                          <CardHeader>
                            <Row className="g-1 m-1">
                              <Col className="col-sm">
                                <div className="d-flex justify-content-sm-between">
                                  <h2 className="card-title mb-0 justify-content-sm-start">
                                    <strong>Task Details</strong>
                                  </h2>
                                </div>
                              </Col>
                            </Row>
                          </CardHeader>
                          <div className="card-body">
                            <div className="live-preview">
                              <Row className="align-items-center g-3">
                                <Col sm={4}>
                                  <label
                                    className="form-label mt-3"
                                    htmlFor="product-orders-input"
                                  >
                                    Department Types
                                  </label>
                                  <div className="">
      <select
        className="form-select"
        name="departmentType"
        onBlur={handleBlur}
        value={values.departmenttype}
        onChange={handleChange}
      >
        <option value="">-- Select Department --</option>
        {departmenttype ? (
          <option key={departmenttype} value={departmenttype._id}>{departmenttype.name}</option>
        ) : (
          <option value="" disabled>
            No department available
          </option>
        )}
      </select>
      <ErrorMessage
              name="departmentType"
              component="div"
              className="text-danger"
            />
                
    </div>



                   </Col>
                                <Col sm={4}>
                                  <label
                                    className="form-label mt-3"
                                    htmlFor="product-orders-input"
                                  >
                                    Task name
                                  </label>
                                  <div className="">
                                    <Input
                                      type="text"
                                      row="5"
                                      className="form-control"
                                      id="product-orders-input"
                                      name="taskName"
                                      aria-label="orders"
                                      ar
                                      ia-describedby="product-orders-addon"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.taskName}
                                    />
                                  </div>

                                  <ErrorMessage
              name="taskName"
              component="div"
              className="text-danger"
            />
                
                                </Col>

                                
                                <Col sm={4}>
                                  <label
                                    className="form-label mt-3"
                                    htmlFor="product-orders-input"
                                  >
                                    Task Types
                                  </label>
                                  <div className="">
                                    <select
                                      className="form-select"
                                      name="taskType"
                                      onBlur={handleBlur}
                                      value={values.taskType}
                                      onChange={handleChange}
                                    >
                                      <option value="">--select--</option>
                                      <option value="Form">Form</option>
                                      <option value="Data">Data</option>
                                    </select>
                                    
                                  </div>
                                  <ErrorMessage
              name="taskType"
              component="div"
              className="text-danger"/>
                                  {/* <p className="error text-danger">
                                  //   {errors.checkupType &&
                                  //     touched.checkupType &&
                                  //     errors.checkupType}
                                  // </p> */}
                                </Col>

                                <Col sm={4}>
                                  <label
                                    className="form-label mt-3"
                                    htmlFor="product-orders-input"
                                  >
                                    Access Location
                                  </label>
                                  <div className="">
                                    <select
                                      className="form-select"
                                      name="accessLocation"
                                      onBlur={handleBlur}
                                      value={values.accessLocation}
                                      onChange={handleChange}
                                    >
                                      <option value="">--select--</option>
                                      <option value="Yes">Yes</option>
                                      <option value="No">No</option>
                                    </select>
                                    <ErrorMessage
              name="accessLocation"
              component="div"
              className="text-danger"
            />
                                  </div>
                                  <p className="error text-danger">
                                    {errors.checkupType &&
                                      touched.checkupType &&
                                      errors.checkupType}
                                  </p>
                                </Col>

                                <Col sm={8}>
                                  <div>
                                    <Label
                                      htmlFor="exampleFormControlTextarea5"
                                      className="form-label"
                                    >
                                      Details
                                    </Label>
                                    <textarea
                                      className="form-control"
                                      id="exampleFormControlTextarea5"
                                      rows="4"
                                      name="detail"
                                      value={values.detail}
                                      onChange={handleChange}
                                    ></textarea>
                                     <ErrorMessage
              name="detail"
              component="div"
              className="text-danger"
            />
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

export default AddTask;