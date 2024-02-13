import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, setFormik } from "formik";
import * as Yup from "yup";
import UiContent from "../../Components/Common/UiContent";
import Select from "react-select";
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
import { useNavigate } from "react-router-dom";
const SingleOptions = [
  { value: "Choices 1", label: "Choices 1" },
  { value: "Choices 2", label: "Choices 2" },
  { value: "Choices 3", label: "Choices 3" },
  { value: "Choices 4", label: "Choices 4" },
];

const AddRoles = () => {
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    // name: Yup.string().required("Community Updates Name is required"),
    // uploadimage: Yup.mixed(), // Make uploadimage optional
    // message: Yup.string().required("Community Updates Message is required"),
    // locationSchema: Yup.array().min(1, "Please select at least one Location"),
    // departmentGroup: Yup.array().min(1, "Please select at least one Department Group"),
    // departmentType: Yup.array().min(1, "Please select at least one Department Type"),
    // employeeRole: Yup.array().min(1, "Please select at least one Employee Role"),
    // employeeName: Yup.array().min(1, "Please select at least one Employee Name"),
    isActive: Yup.boolean(),
  });
 
  const url = `${process.env.REACT_APP_BASE_URL}`;
  const {
    GetallDepartmentGroup,
    GetallLocation,
    GetallDepartmentType,
    GetallEmployeeRole,
    GetallEmployeeName,
    addCommMaster,
    getReqCommDetails,
  } = useContext(SignContext);

  const addcommunitymaster = async (
    loc1,
    departmentgroup,
    departmenttype,
    employeerole,
    employeename,
    isActive
  ) => {
    const formData = new FormData(); // Use FormData to handle file uploads

    loc1.forEach((loc) => formData.append("locationSchema", loc));
    departmentgroup.forEach((dg) => formData.append("departmentGroup", dg));
    departmenttype.forEach((dt) => formData.append("departmentType", dt));
    employeerole.forEach((er) => formData.append("employeeRole", er));
    employeename.forEach((en) => formData.append("employeeName", en));
    formData.append("isActive", isActive);

    try {
      // Adjust baseURL to your server's address
      const response = await axios.post(
        `${url}/rolesresponsibilities/addRolesResponsibilities`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("response 123456", response.data);
      // Additional actions based on success (e.g., navigate or show a success message)
    } catch (error) {
      console.error("Error submitting form", error.response.data);
      // Handle errors (e.g., show error message)
    }
  };
  const getrequiredcommdetails = async () => {
    const res = await getReqCommDetails();
  };
  const [selectedMulti, setselectedMulti] = useState(null);
  const [selectedMulti1, setselectedMulti1] = useState(null);
  const [selectedMulti2, setselectedMulti2] = useState(null);
  const [selectedMulti3, setselectedMulti3] = useState(null);
  const [selectedMulti4, setselectedMulti4] = useState(null);
  const [dep, setdep] = useState(null);
  const [loc, setloc] = useState(null);
  const [dtype, setdtype] = useState(null);
  const [emprole, setemprole] = useState(null);
  const [empname, setempname] = useState(null);
  const [locationSchema, setlocationSchema] = useState(null);
  // const [addloc,setaddloc]=useState([]);

  const [profilePhoto, setProfilePhoto] = useState("");
  const [uniqueDepartmentTypes, setUniqueDepartmentTypes] = useState([]);

  const [uniqueEmployeeRoles, setUniqueEmployeeRoles] = useState([]);

  const [uniqueEmployeeNames, setuniqueEmployeeNames] = useState([]);

  useEffect(() => {
    console.log(uniqueDepartmentTypes);
  }, [uniqueDepartmentTypes]);
  useEffect(() => {
    console.log(uniqueEmployeeRoles);
  }, [uniqueEmployeeRoles]);
  useEffect(() => {
    console.log(uniqueEmployeeRoles);
  }, [uniqueEmployeeNames]);

  /*const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    console.log(e.target.files[0]);
  };  */
  const getloc = async () => {
    const response = await GetallLocation();

    const names = response.data.map((item) => ({
      value: item._id,
      label: item.name,
      id: item._id,
    }));
    setloc(names);
  };

  const getdepgroup = async () => {
    const response = await GetallDepartmentGroup();

    const names = response.data.map((item) => ({
      value: item._id,
      label: item.name,
      id: item._id,
    }));
    setdep(names);
  };
  const getdeptype = async () => {
    const response = await GetallDepartmentType();
    //  console.log("res>>",response);
    const names = response.data.map((item) => ({
      value: item._id,
      label: item.name,
      id: item.departmentGroup._id,
      new_id: item._id,
    }));
    setdtype(names);
  };

  const getemprole = async () => {
    const response = await GetallEmployeeRole();
    const names = response.data.map((item) => ({
      value: item._id,
      label: item.EmployeeRole,
      id: item.departmentType._id,
      new_empId: item._id,
    }));
    setemprole(names);
    console.log(names);
  };
  const getempname = async () => {
    const response = await GetallEmployeeName();
    const names = response.data.map((item) => ({
      value: item._id,
      label: item.name,
      id: item.employeeRole._id,
      main_id: item._id,
    }));
    setempname(names);
    console.log(names);
  };

  function handleMulti(selectedMulti) {
    setselectedMulti(selectedMulti);

    console.log(">>>>vaishal", selectedMulti);
    let selectedValues = [];
    for (let i = 0; i < selectedMulti.length; i++) {
      const selectempId = selectedMulti[i].id;

      for (let j = 0; j < dtype.length; j++) {
        const departtype = dtype[j];

        if (departtype && departtype.id === selectempId) {
          selectedValues.push({
            label: departtype.label,
            id: departtype.id,
            value: departtype.label,
            new_Id: departtype.new_id,
          });
        }
      }
    }
    setUniqueDepartmentTypes(selectedValues);

    console.log(uniqueDepartmentTypes);

    //  console.log(selectedMulti);
  }

  function handleMulti1(selectedMulti1) {
    console.log("hello");
    console.log(selectedMulti1);
    setselectedMulti1(selectedMulti1);
    console.log("vaishal11", selectedMulti1);
    let selectedempValues = [];
    for (let i = 0; i < selectedMulti1.length; i++) {
      const selectId = selectedMulti1[i].new_Id;
      //  console.log(selectId)

      for (let j = 0; j < emprole.length; j++) {
        const employeetype = emprole[j];
        // console.log(employeetype);

        if (employeetype && employeetype.id === selectId) {
          selectedempValues.push({
            label: employeetype.label,
            id: employeetype.id,
            value: employeetype.label,
            neww_id: employeetype.new_empId,
          });
        }
      }
    }
    setUniqueEmployeeRoles(selectedempValues);
  }
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setProfilePhoto(file);
  };
  function handleMulti4(selectedMulti4) {
    setselectedMulti4(selectedMulti4);

    console.log("hii", selectedMulti4);
  }
  function handleMulti2(selectedMulti2) {
    setselectedMulti2(selectedMulti2);
  }

  function handleMulti3(selectedMulti3) {
    setselectedMulti3(selectedMulti3);
    let selectedempNames = [];
    for (let i = 0; i < selectedMulti3.length; i++) {
      const selectId = selectedMulti3[i].neww_id;

      for (let j = 0; j < empname.length; j++) {
        const EmployeeName = empname[j];

        if (EmployeeName && EmployeeName.id === selectId) {
          selectedempNames.push({
            label: EmployeeName.label,
            id: EmployeeName.id,
            value: EmployeeName.label,
            main_Id: EmployeeName.main_id,
          });
        }
      }
    }
    setuniqueEmployeeNames(selectedempNames);
    console.log(selectedempNames);
  }
  useEffect(() => {
    getdepgroup();
    getloc();
    getdeptype();
    getemprole();
    getempname();
  }, []);
  const cancel = () => {
    navigate("/roles-responsibilty");
  };
  useEffect(() => {
    // console.log(dep);
  }, [dep]);
  useEffect(() => {
    // console.log("departmenttype>>", dtype);
  }, [dtype]);
  useEffect(() => {
    // console.log(emprole);
  }, [emprole]);
  useEffect(() => {
    // console.log(emprole);
  }, [empname]);

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
                initialValues={{
                  locationSchema: [],
                  departmentGroup: [],
                  departmentType: [],
                  employeeRole: [],
                  employeeName: [],
                  isActive: true,
                }}
                onSubmit={(values) => {
                  // addCheckupDetails(values);
                  console.log("form values", values.locationSchema);
                  let loc1 = [];
                  let dg1 = [];
                  let dt = [];
                  let er = [];
                  let en = [];

                  console.log(">>>", selectedMulti2);

                  selectedMulti2.map((type) => {
                    loc1.push(type.id);
                  });

                  selectedMulti.map((type) => {
                    dg1.push(type.id);
                  });
                  selectedMulti1.map((type) => {
                    dt.push(type.new_Id);
                  });
                  selectedMulti3.map((type) => {
                    er.push(type.neww_id);
                  });
                  selectedMulti4.map((type) => {
                    //  en.push(empname.main_id);
                    en.push(type.main_Id);
                  });
                  console.log("dg1", dg1);
                  console.log("en", en);

                  const response = addcommunitymaster(
                    loc1,
                    dg1,
                    dt,
                    er,
                    en,
                    values.isActive
                  );
                  if (response) {
                    getrequiredcommdetails();
                    // navigate("/roles-responsibility");
                  }

                  // resetForm();
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  resetForm,
                }) => (
                  <div className="login">
                    <div className="form">
                      <form enctype="multipart/form-data">
                        <Card>
                          <CardHeader>
                            <Row className="g-1 m-1">
                              <Col className="col-sm">
                                <div className="d-flex justify-content-sm-between">
                                  <h2 className="card-title mb-0 justify-content-sm-start">
                                    <strong>Roles & Responsibility</strong>
                                  </h2>
                                </div>
                              </Col>
                            </Row>
                          </CardHeader>
                          <div className="card-body">
                            <div className="live-preview">
                              <Row className="align-items-center g-3">
                                <Col lg={4}>
                                  <div className="mb-3">
                                    <Label
                                      htmlFor="choices-multiple-default"
                                      className="form-label text-muted"
                                    >
                                      Location
                                    </Label>
                                    <Select
                                      value={selectedMulti2}
                                      values={locationSchema}
                                      isMulti={true}
                                      onChange={(selectedOptions) => {
                                        handleMulti2(selectedOptions);
                                        // setFieldValue("locationSchema",selectedOptions);
                                      }}
                                      options={loc}
                                    />
                                  </div>
                                </Col>
                                <Col lg={4}>
                                  <div className="mb-3">
                                    <Label
                                      htmlFor="choices-multiple-default"
                                      className="form-label text-muted"
                                    >
                                      Department Group
                                    </Label>
                                    <Select
                                      value={selectedMulti}
                                      isMulti={true}
                                      onChange={(selectedOptions) => {
                                        handleMulti(selectedOptions);
                                      }}
                                      options={dep}
                                    />
                                  </div>
                                </Col>
                                <Col lg={4}>
                                  <div className="mb-3">
                                    <Label
                                      htmlFor="choices-multiple-default"
                                      className="form-label text-muted"
                                    >
                                      Department Type
                                    </Label>
                                    <Select
                                      value={selectedMulti1}
                                      isMulti={true}
                                      onChange={(selectedOptions) => {
                                        handleMulti1(selectedOptions);
                                      }}
                                      options={uniqueDepartmentTypes}
                                    />
                                  </div>
                                </Col>

                                <Col lg={4}>
                                  <div className="mb-3">
                                    <Label
                                      htmlFor="choices-multiple-default"
                                      className="form-label text-muted"
                                    >
                                      Employee Roles
                                    </Label>
                                    <Select
                                      value={selectedMulti3}
                                      isMulti={true}
                                      onChange={(selectedOptions) => {
                                        handleMulti3(selectedOptions);
                                      }}
                                      options={uniqueEmployeeRoles}
                                    />
                                  </div>
                                </Col>
                                <Col lg={4}>
                                  <div className="mb-3">
                                    <Label
                                      htmlFor="choices-multiple-default"
                                      className="form-label text-muted"
                                    >
                                      Employee Name
                                    </Label>
                                    <Select
                                      value={selectedMulti4}
                                      isMulti={true}
                                      onChange={(selectedOptions) => {
                                        handleMulti4(selectedOptions);
                                      }}
                                      options={uniqueEmployeeNames}
                                    />
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
                                  <div
                                    className="table-responsive table-card mt-4"
                                    style={{ marginRight: "0px" }}
                                  >
                                    <table className="table align-middle table-nowrap table-striped-columns mb-0">
                                      <tbody>
                                        <tr>
                                          <td>
                                            <div className="form-check ">
                                              <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value=""
                                                id="cardtableCheck01"
                                                style={{ marginRight: "10px" }}
                                              />
                                              <label
                                                className="form-check-label"
                                                htmlFor="cardtableCheck01"
                                              >
                                                DashBoard
                                              </label>
                                            </div>
                                          </td>
                                        </tr>

                                        <tr>
                                          <td>
                                            <div className="form-check">
                                              <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value=""
                                                id="cardtableCheck01"
                                                style={{ marginRight: "10px" }}
                                              />
                                              <label
                                                className="form-check-label"
                                                htmlFor="cardtableCheck01"
                                              >
                                                Menu Master
                                              </label>
                                            </div>
                                          </td>
                                        </tr>

                                        <tr>
                                          <td>
                                            <div className="form-check">
                                              <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value=""
                                                id="cardtableCheck01"
                                                style={{ marginRight: "10px" }}
                                              />
                                              <label
                                                className="form-check-label"
                                                htmlFor="cardtableCheck01"
                                              >
                                                Roles Responsibility
                                              </label>
                                            </div>
                                          </td>
                                        </tr>

                                        <tr>
                                          <td>
                                            <div className="form-check">
                                              <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value=""
                                                id="cardtableCheck01"
                                                style={{ marginRight: "10px" }}
                                              />
                                              <label
                                                className="form-check-label"
                                                htmlFor="cardtableCheck01"
                                              >
                                                Admin User
                                              </label>
                                            </div>
                                          </td>
                                        </tr>

                                        <tr>
                                          <td>
                                            <div
                                              className="form-check"
                                              style={{ display: "flex" }}
                                            >
                                              <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value=""
                                                id="cardtableCheck01"
                                                style={{ marginRight: "10px" }}
                                              />
                                              <label
                                                className="form-check-label"
                                                htmlFor="cardtableCheck01"
                                              >
                                                Community Update Master
                                              </label>
                                            </div>
                                          </td>
                                        </tr>

                                        <tr>
                                          <td>
                                            <div className="form-check">
                                              <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value=""
                                                id="cardtableCheck01"
                                                style={{ marginRight: "10px" }}
                                              />
                                              <label
                                                className="form-check-label"
                                                htmlFor="cardtableCheck01"
                                              >
                                                Location Master
                                              </label>
                                            </div>
                                          </td>
                                        </tr>

                                        <tr>
                                          <td>
                                            <div className="form-check">
                                              <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value=""
                                                id="cardtableCheck01"
                                                style={{ marginRight: "10px" }}
                                              />
                                              <label
                                                className="form-check-label"
                                                htmlFor="cardtableCheck01"
                                              >
                                                Department Group
                                              </label>
                                            </div>
                                          </td>
                                        </tr>

                                        <tr>
                                          <td>
                                            <div className="form-check">
                                              <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value=""
                                                id="cardtableCheck01"
                                                style={{ marginRight: "10px" }}
                                              />
                                              <label
                                                className="form-check-label"
                                                htmlFor="cardtableCheck01"
                                              >
                                                Department Type
                                              </label>
                                            </div>
                                          </td>
                                        </tr>

                                        <tr>
                                          <td>
                                            <div className="form-check">
                                              <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value=""
                                                id="cardtableCheck01"
                                                style={{ marginRight: "10px" }}
                                              />
                                              <label
                                                className="form-check-label"
                                                htmlFor="cardtableCheck01"
                                              >
                                                Employee Role
                                              </label>
                                            </div>
                                          </td>
                                        </tr>

                                        <tr>
                                          <td>
                                            <div className="form-check">
                                              <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value=""
                                                id="cardtableCheck01"
                                                style={{ marginRight: "10px" }}
                                              />
                                              <label
                                                className="form-check-label"
                                                htmlFor="cardtableCheck01"
                                              >
                                                Employee Master
                                              </label>
                                            </div>
                                          </td>
                                        </tr>

                                        <tr>
                                          <td>
                                            <div className="form-check">
                                              <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value=""
                                                id="cardtableCheck01"
                                                style={{ marginRight: "10px" }}
                                              />
                                              <label
                                                className="form-check-label"
                                                htmlFor="cardtableCheck01"
                                              >
                                                Add task
                                              </label>
                                            </div>
                                          </td>
                                        </tr>

                                        <tr>
                                          <td>
                                            <div className="form-check">
                                              <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value=""
                                                id="cardtableCheck01"
                                                style={{ marginRight: "10px" }}
                                              />
                                              <label
                                                className="form-check-label"
                                                htmlFor="cardtableCheck01"
                                              >
                                                Assign Master
                                              </label>
                                            </div>
                                          </td>
                                        </tr>

                                        <tr>
                                          <td>
                                            <div className="form-check">
                                              <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value=""
                                                id="cardtableCheck01"
                                                style={{ marginRight: "10px" }}
                                              />
                                              <label
                                                className="form-check-label"
                                                htmlFor="cardtableCheck01"
                                              >
                                                CMS
                                              </label>
                                            </div>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </Col>
                              </Row>
                            </div>
                          </div>

                          <div className="text-end mb-3 me-3">
                            <button
                              type="submit"
                              className="btn btn-success w-sm"
                              onClick={handleSubmit}
                            >
                              Submit
                            </button>
                            <button
                              type="button"
                              className="btn btn-danger w-sm"
                              onClick={cancel}
                              style={{ marginLeft: "3px" }}
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

export default AddRoles;
