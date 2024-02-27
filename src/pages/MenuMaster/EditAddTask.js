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
import { SignState } from "../../contextAPI/State/SignState";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClickTrigger } from "lord-icon-element";
const EditAddTask = () => {
  const [departmenttype, setdepartmentype] = useState(null);
  const { GetAddTaskById, GetallDepartmentType,setEditAddTaskValues,GetDepTypeByIdForEditing } = useContext(SignContext);
  const { id } = useParams();
  const navigate=useNavigate();
  const [task, settask] = useState({
    departmentType: "",
    taskName: "",
    taskType: "",
    accessLocation: "",
    detail: "",
    isActive: "",
  });
  const gettingtaskbyid = async () => {
    const res = await GetAddTaskById(id);
    settask(res.data);

    console.log(res);
  };
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
  const cancel=()=>{
    navigate('/add-taskmaster')
  }
  useEffect(() => {
    console.log(task);
    // console.log(task.departmentType.name)
  }, [task]);
  useEffect(() => {
    gettingtaskbyid();
    getalldtype();
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
                  task,
                }}
                onSubmit={(values, { resetForm }) => {
                  
                  const res=setEditAddTaskValues(id,task.departmentType._id,task.taskName,task.taskType,task.accessLocation,task.detail,task.isActive);
                  if(!task.taskName){
                  toast.error("Please Fill Task Name");
                  return ;
                }
                if(!task.detail){
                  toast.error("Please Fill Details");
                  return;
                }
                    if(res){

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
                 
                      <form noValidate onSubmit={handleSubmit}>

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
                                {/* <Col sm={4}>
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
                                      // value={values.departmentType}
                                      value={task.departmentType ? task.departmentType.name : ""}
                                      onChange={handleChange}
                                    >
                                      <option value="">--select--</option>
                                      {departmenttype &&
                                      departmenttype.length > 0 ? (
                                        departmenttype.map((type) => (
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
                                  <p className="error text-danger">
                                    {errors.checkupType &&
                                      touched.checkupType &&
                                      errors.checkupType}
                                  </p>
                                </Col> */}
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
                                      value={
                                        task.departmentType &&
                                        typeof task.departmentType === "object"
                                          ? task.departmentType._id
                                          : ""
                                      }
                                      onChange={(e) =>
                                        settask({
                                          ...task,
                                          departmentType: {
                                            _id: e.target.value,
                                            name: e.target.options[
                                              e.target.selectedIndex
                                            ].text,
                                          },
                                        })
                                      }
                                    >
                                      {/* <option value="">--select--</option>
                                      {departmenttype &&
                                      departmenttype.length > 0 ? (
                                        departmenttype.map((type) => (
                                          <option
                                            key={type._id}
                                            value={type._id}
                                          >
                                            {type.name}
                                          </option>
                                        ))
                                      ) : (
                                        <option value="" disabled>
                                          No locations available
                                        </option>
                                      )} */}
                                      {departmenttype ? (
          <option key={departmenttype} value={departmenttype._id}>{departmenttype.name}</option>
        ) : (
          <option value="" disabled>
            No department available
          </option>
        )}
                                    </select>
                                  </div>
                                  <p className="error text-danger">
                                    {errors.checkupType &&
                                      touched.checkupType &&
                                      errors.checkupType}
                                  </p>
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
                                      onChange={(e) =>
                                        settask({
                                          ...task,
                                          taskName: e.target.value,
                                        })
                                      }
                                      onBlur={handleBlur}
                                      value={task.taskName}
                                    />
                                  </div>

                                  <p className="error text-danger">
                                    {/* {errors.checkupNumber &&
                                      touched.checkupNumber &&
                                      errors.checkupNumber} */}
                                  </p>
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
                                      value={task.taskType}
                                      onChange={(e) =>
                                        settask({
                                          ...task,
                                          taskType: e.target.value,
                                        })
                                      }
                                    >
                                      <option value="">--select--</option>
                                      <option value="Form">Form</option>
                                      <option value="Data">Data</option>
                                    </select>
                                  </div>
                                  <p className="error text-danger">
                                    {errors.checkupType &&
                                      touched.checkupType &&
                                      errors.checkupType}
                                  </p>
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
                                      value={task.accessLocation}
                                      // onChange={handleChange}
                                      onChange={(e) =>
                                        settask({
                                          ...task,
                                          accessLocation: e.target.value,
                                        })
                                      }
                                    >
                                      <option value="">--select--</option>
                                      <option value="Yes">Yes</option>
                                      <option value="No">No</option>
                                    </select>
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
                                      value={task.detail}
                                      onChange={(e) =>
                                        settask({
                                          ...task,
                                          detail: e.target.value,
                                        })
                                      }
                                    ></textarea>
                                  </div>
                                </Col>
                                <Col sm={2}>
                                  <div className="mt-3">
                                    <Input
                                      type="checkbox"
                                      id="isActive"
                                      label="Is Active"
                                      name="isActive"
                                      checked={task.isActive}
                                      onChange={(e) =>
                                        settask({
                                          ...task,
                                          isActive: e.target.checked,
                                        })
                                      }
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
              <ToastContainer />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default EditAddTask;
