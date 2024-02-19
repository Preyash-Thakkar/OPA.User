import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import UiContent from "../../Components/Common/UiContent";
import { Card, CardHeader, Col, Container, Input, Row, Label } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { TagsInput } from "react-tag-input-component";
import SignContext from "../../contextAPI/Context/SignContext";
import { useNavigate } from "react-router-dom";
const AddAdmin = () => {
  const navigate=useNavigate();
  const {
    GetallLocation,
    GetallDepartmentGroup,
    GetDepTypeById,
    GetEmployeeRoleById,
    addEmployeeName,
    addadmin, 
    GetRoles,
    addImage,
  } = useContext(SignContext);
  const cancel=()=>{
    navigate('/admin-user')
  }
  const [locations, setLocations] = useState([]);
  const [departmentGroups, setDepartmentGroups] = useState([]);
  const [departmentTypes, setDepartmentTypes] = useState([]);
  const [Roles, setRoles] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDepartmentGroup, setSelectedDepartmentGroup] = useState("");
  const [selectedDepartmentType, setSelectedDepartmentType] = useState("");
  const [selectedEmployeeRole, setSelectedEmployeeRole] = useState("");
  const [status,setstatus]=useState("");
  const [image, setImage] = useState(null);
const [allimage, setallImage] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const locationResponse = await GetallLocation();
        setLocations(locationResponse.data);

        const departmentGroupResponse = await GetallDepartmentGroup();
        setDepartmentGroups(departmentGroupResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [GetallDepartmentGroup]);
 /* function ConvertToBase64(e){
       var reader=new FileReader();
       reader.readAsDataURL(e.target.files[0]);
       reader.onload=()=>{
        console.log(reader.result);
        setImage(reader.result);
       };
       reader.onerror=error=>{
        console.log("error",error);
       };
  }
  */
  /*function uploadImage() {
  fetch("http://localhost:5002/adminname/adddaminname", {
    method: "POST",
    crossDomain: true,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      base64: image,
    }),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
}*/
 
  const handleDepartmentGroupChange = async (e) => {
    const depGrpId = e.target.value;
    
    setSelectedDepartmentGroup(depGrpId);

    // Fetch department types based on the selected department group
    const depTypeResponse = await GetDepTypeById(depGrpId);
    setDepartmentTypes(depTypeResponse.data);
  };

  const handleDepartmentTypeChange = async (e) => {
    const depTypeId = e.target.value;
    setSelectedDepartmentType(depTypeId);

    // Fetch employee roles based on the selected department group and department type
    
  };
  const handleRoleChange = async (e) => {
    const roleId = e.target.value;
    setRoles(roleId);

    // Fetch employee roles based on the selected department group and department type
    
  };
  useEffect(() => {
        const roleload=async()=>{
          try{
          const RoleResponse = await GetRoles();
           const res=setRoles(RoleResponse);
           console.log("roles are",RoleResponse.data);
          }
       catch (error) {
        console.error("Error fetching data:", error);
      }}

    roleload();
  }, [GetRoles]);

  const handleEmployeeRoleChange = (e) => {
    const empRoleId = e.target.value;
    setSelectedEmployeeRole(empRoleId);
  };

const AddAdmin1=async(name,email,image,password,departmentGroup,departmentType,location,Role,status)=>{
  //uploadimage=profilePhoto;
  const response=await addadmin(name,email,image,password,departmentGroup,departmentType,location,Role,status);
  console.log(">>> image is",image);
  console.log(">>>name",name);
   //console.log(">>>message",message);
  console.log("response",response);
}   
const handleImageChange = (e) => {
    //setImage(e.target.files[0]);
    const file = e.target.files[0];
  console.log(file);
  setImage(file);
  };    
    
  /*useEffect(()=>{
   console.log("roles are",Roles)
  },[Roles])*/



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
                     name: "", // Set initial value for the "Name" field
          email: "", // Set initial value for the "Email" field
          password: "", // Set initial value for the "Password" fiel
          location: "", // Set initial value for the "Location" dropdown
          departmentGroup: "", // Set initial value for the "Department Group" dropdown
          departmentType: "", // Set initial value for the "Department Type" dropdown
          Role: "", 
          image:"",
          status:""
                  }
                }
                onSubmit={(values, { resetForm }) => {
                  console.log("image",values.image);
                  values.image=image;

                  //name,email,password,location,departmentGroup,departmentType,Role,status,image
          AddAdmin1(values.name,values.email,values.password,values.location,values.departmentGroup,values.departmentType,values.Role,values.status,values.image);
          //uploadImage();
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
                      <form noValidate onSubmit={handleSubmit}  encType="multipart/form-data">
                        {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}

                        <Card>
                          <CardHeader>
                            <Row className="g-1 m-1">
                              <Col className="col-sm">
                                <div className="d-flex justify-content-sm-between">
                                  <h2 className="card-title mb-0 justify-content-sm-start">
                                    <strong>Add Admin</strong>
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
                                     Name
                                  </label>
                                  <div className="">
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="product-orders-input"
                                      name="name"
                                      aria-label="orders"
                                      ia-describedby="product-orders-addon"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.name}
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
                                    Email
                                  </label>
                                  <div className="">
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="product-orders-input"
                                      name="email"
                                      aria-label="orders"
                                      ia-describedby="product-orders-addon"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.email}
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
                                    Password
                                  </label>
                                  <div className="">
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="product-orders-input"
                                      name="password"
                                      aria-label="orders"
                                      ia-describedby="product-orders-addon"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.password} 
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
      {locations && locations.length > 0 ? (
        locations.map((location) => (  // Change from loc to locations
          <option key={location._id} value={location._id}>
            {location.name}
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
                                </Col>
                                <Col sm={4}>
                                  <label
                                    className="form-label mt-3"
                                    htmlFor="product-orders-input"
                                  >
                                    Department Groups
                                  </label>
                                  <div className="">
                                    <select
                                      className="form-select"
                                      name="departmentGroup"
                                      onBlur={handleBlur}
                                      value={values.departmentGroup}
                                  onChange={(e) => {
                                    //setSelectedDepartmentGroup(e.target.value);
                                    handleChange(e);
                                    handleDepartmentGroupChange(e);
                                  }}
                                    >
                                      <option value="">--select--</option>
      {departmentGroups && departmentGroups.length > 0 ? (
        departmentGroups.map((group) => (  // Change from loc to departmentGroups
          <option key={group._id} value={group._id}>
            {group.name}
          </option>
        ))
      ) : (
        <option value="" disabled>
          No department groups available
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
                                    Department Type
                                  </label>
                                  <div className="">
                                    <select
                                      className="form-select"
                                      name="departmentType"
                                      onBlur={handleBlur}
                                       value={values.departmentType}
                                  onChange={(e) => {
                                    //setSelectedDepartmentType(e.target.value);
                                    handleChange(e);
                                    handleDepartmentTypeChange(e);
                                  }}
                                    >
                                       <option value="">--select--</option>
                                    {departmentTypes &&
                                    departmentTypes.length > 0 ? (
                                      departmentTypes.map((type) => (
                                        <option
                                          key={type._id}
                                          value={type._id}
                                        >
                                          {type.name}
                                        </option>
                                      ))
                                    ) : (
                                      <option value="" disabled>
                                        No department types available
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
                                    User Role
                                  </label>
                                  <div className="">
                                    <select
                                      className="form-select"
                                      name="Role"
                                      onBlur={handleBlur}
                                      value={values.Role}
                                      onChange={
                                        //setSelectedDepartmentType(e.target.value);
                                        handleChange
                                        //handleRoleChange(e);
                                      }
                                    >
                                 <option value="">--select--</option>
                                  {Roles &&
                                    Roles.length > 0 ? (
                                      Roles.map((role) => (
                                        <option
                                          key={role._id}
                                          value={role._id}
                                        >
                                          {role.role}
                                        </option>
                                      ))
                                    ) : (
                                      <option value="" disabled>
                                        No employee roles available
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
          <label className="form-label mt-3" htmlFor="product-orders-input">
            Image
          </label>
          <div className="">
            <Input
              type="file"
              className="form-control"
              id="image"
              name="image"
              onChange={handleImageChange}
             
            />
          </div>
          <p className="error text-danger"></p>
        </Col>
                                <Col sm={4}>
                                  <label
                                    className="form-label mt-3"
                                    htmlFor="product-orders-input"
                                  >
                                    Status
                                  </label>
                                  <div className="">
                                    <select
                                      className="form-select"
                                      name="status"
                                      onBlur={handleBlur}
                                      value={values.status}
                                      onChange={handleChange}
                                    >
                                      <option value="">--select--</option>
                                      <option value="Active">Active</option>
                                      <option value="InActive">InActive</option>
                                    </select>
                                  </div>
                                  <p className="error text-danger">
                                    {errors.checkupType &&
                                      touched.checkupType &&
                                      errors.checkupType}
                                  </p>
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

export default AddAdmin;


