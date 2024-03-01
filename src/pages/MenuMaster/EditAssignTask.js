// import React, { useContext, useEffect, useState } from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import UiContent from "../../Components/Common/UiContent";
// import Select from "react-select";
// import { useNavigate } from "react-router-dom";
// import {
//   Card,
//   CardHeader,
//   Col,
//   Container,
//   Input,
//   Row,
//   Label,
// } from "reactstrap";
// import BreadCrumb from "../../Components/Common/BreadCrumb";
// import { TagsInput } from "react-tag-input-component";
// import SignContext from "../../contextAPI/Context/SignContext";
// import { useParams } from "react-router-dom";
// const EditAssignTask = () => {
//   let location1 = [];
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [selectedSingle, setSelectedSingle] = useState(null);
//   const [selectedGroup, setSelectedGroup] = useState(null);
//   const [selectedGroup2, setSelectedGroup2] = useState(null);
//   const [selectedNoSortingGroup, setSelectedNoSortingGroup] = useState(null);
//   const [selectedMulti, setselectedMulti] = useState(null);
//   const [selectedMulti1, setselectedMulti1] = useState(null);
//   const [selectedMulti2, setselectedMulti2] = useState(null);
//   const [selectedMulti3, setselectedMulti3] = useState(null);
//   const [selectedMulti4, setselectedMulti4] = useState(null);
//   const [accesslocation, setaccesslocation] = useState("");
//   const [type, settype] = useState("");
//   const [type1, settype1] = useState("");
//   const [departmenttype, setdepartmenttype] = useState(null);
//   const [tasktype, settasktype] = useState([]);
//   const [document, setdocument] = useState("");
//   const [dep, setdep] = useState(null);
//   const [loc, setloc] = useState(null);
//   const [dtype, setdtype] = useState(null);
//   const [emprole, setemprole] = useState(null);
//   const [empname, setempname] = useState(null);
//   const [deptvalueid, setdeptvalueid] = useState(null);

//   const [taskvaluetype, settaskvaluetype] = useState(null);
//   const [location, setlocation] = useState([]);
//   const [uniqueDepartmentTypes, setUniqueDepartmentTypes] = useState([]);

//   const [uniqueEmployeeRoles, setUniqueEmployeeRoles] = useState([]);

//   const [uniqueEmployeeNames, setuniqueEmployeeNames] = useState([]);
//   const [typeid1, settypeid1] = useState({
//     documentname: "",
//     documentdepartmenttype: "",
//     tasktypes: "",
//     formlink: "",
//     documenttype: "",
//     uploaddocument:"",
//     documentlink: "",
//     documentdescription: "",
//     locationSchema: [],
//     departmentGroup: [],
//     departmentType: [],
//     employeeRole: [],
//     employeeName: [],
//     isActive: true,
//   });
//   const [assigntask, setassigntask] = useState(null);
//   const {
//     GetallDepartmentType,
//     GetSpecificTaskByDepartmentGroup,
//     GetAddTaskById,
//     GetallDepartmentGroup,
//     GetallLocation,
//     GetallEmployeeRole,
//     GetallEmployeeName,
//     addAssignTaskmaster,
//     GetSpecificAssignTaskById,
//     GetSpecificAssignTaskByDeptId,
//     setEditAssignTask,
//     GetallAssignTask
//   } = useContext(SignContext);
  
//   const getalldtype = async () => {
//     const response = await GetallDepartmentType();

//     setdepartmenttype(response.data);
//   };
//   function handleSelectSingle(selectedSingle) {
//     setSelectedSingle(selectedSingle);
//   }

//   function handleSelectGroups(selectedGroup) {
//     setSelectedGroup(selectedGroup);
//   }

//   function handleSelectGroups2(selectedGroup2) {
//     setSelectedGroup2(selectedGroup2);
//   }

//   function handleSelectNoSortingGroup(selectedNoSortingGroup) {
//     setSelectedNoSortingGroup(selectedNoSortingGroup);
//   }

//   function handleMulti(selectedMulti) {
//     setselectedMulti(selectedMulti);
//     let selectedValues = [];
//     for (let i = 0; i < selectedMulti.length; i++) {
//       const selectempId = selectedMulti[i].id;

//       for (let j = 0; j < dtype.length; j++) {
//         const departtype = dtype[j];

//         if (departtype && departtype.id === selectempId) {
//           selectedValues.push({
//             label: departtype.label,
//             id: departtype.id,
//             value: departtype.label,
//             new_Id: departtype.new_id,
//           });
//         }
//       }
//     }
//     setUniqueDepartmentTypes(selectedValues);
//   }

//   function handleMulti1(selectedMulti1) {

//     setselectedMulti1(selectedMulti1);

//     let selectedempValues = [];
//     for (let i = 0; i < selectedMulti1.length; i++) {
//       const selectId = selectedMulti1[i].new_Id;
//       //  console.log(selectId)

//       for (let j = 0; j < emprole.length; j++) {
//         const employeetype = emprole[j];
//         // console.log(employeetype);

//         if (employeetype && employeetype.id === selectId) {
//           selectedempValues.push({
//             label: employeetype.label,
//             id: employeetype.id,
//             value: employeetype.label,
//             neww_id: employeetype.new_empId,
//           });
//         }
//       }
//     }
//     setUniqueEmployeeRoles(selectedempValues);
//   }
//   function handleMulti4(selectedMulti4) {
//     console.log(selectedMulti4);
//     setselectedMulti4(selectedMulti4);
//   }
//   function handleMulti2(selectedMulti2) {
//     // console.log("vaishal", selectedMulti2);
//     setselectedMulti2(selectedMulti2);
//   }

//   function handleMulti3(selectedMulti3) {
//     setselectedMulti3(selectedMulti3);
//     let selectedempNames = [];
//     for (let i = 0; i < selectedMulti3.length; i++) {
//       const selectId = selectedMulti3[i].neww_id;

//       for (let j = 0; j < empname.length; j++) {
//         const EmployeeName = empname[j];

//         if (EmployeeName && EmployeeName.id === selectId) {
//           selectedempNames.push({
//             label: EmployeeName.label,
//             id: EmployeeName.id,
//             value: EmployeeName.label,
//             newid: EmployeeName.newid,
//           });
//         }
//       }
//     }
//     setuniqueEmployeeNames(selectedempNames);
//   }
//   const gettingtasktype = async (id) => {
//     console.log("get task type id", assigntask?.documentdepartmenttype?._id);
//     const res = await GetSpecificAssignTaskByDeptId(
//       assigntask?.documentdepartmenttype?._id
//     );
//      console.log(res);
//     let typearr = res.data.map((f) => f.tasktypes);
//     console.log("task is ", typearr);
//     settasktype(typearr);

//     console.log("This is task type", res.data[0].tasktypes.name);
//   };
//   const getdeptype = async () => {
//     const response = await GetallDepartmentType();
//     //  console.log("res>>",response);
//     const names = response.data.map((item) => ({
//       value: item._id,
//       label: item.name,
//       id: item.departmentGroup._id,
//       new_id: item._id,
//     }));
//     setdtype(names);
//   };
//   const handleTaskChange = async (e) => {
//     let taskid = e.target.value;

//     // // console.log(">>>>", taskid);
//     const res = await GetAddTaskById(taskid);
//     // // console.log(">>>>", res.data);
//     setaccesslocation(res.data.accessLocation);
//     settype(res.data.taskType);
//     // // console.log(">>>>>>>>>>>>>", res.data.accessLocation);
//     setdocument(res.data.uploaddocument);
//     console.log("Image",res.data.uploaddocument)
//   };
//   const handleDepType = (e) => {
//     let deptypeid = e.target.value;
//     // console.log(">>>>>>>>>>>>>>>>>>>", deptypeid);
//     gettingtasktype(deptvalueid);
//   };
//   const getdepgroup = async () => {
//     const response = await GetallDepartmentGroup();

//     const names = response.data.map((item) => ({
//       value: item._id,
//       label: item.name,
//       id: item._id,
//     }));
//     setdep(names);
//   };
//   // const addassigntask = async (values, loc1, dg1, dt, er, en) => {
//   //   console.log(">>>>", values.documentlink);
//   //   // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", values,loc1,dg1,dt,er,en);
//   //   const res = await addAssignTaskmaster(
//   //     values.documentname,
//   //     values.documentdepartmenttype,
//   //     values.tasktypes,
//   //     values.documenttype,
//   //     values.formlink,
//   //     values.documentlink,
//   //     values.uploaddocument,
//   //     values.documentdescription,
//   //     loc1,
//   //     dg1,
//   //     dt,
//   //     er,
//   //     en,
//   //     values.isActive
//   //   );
//   //   console.log(">>", res);
//   // };
//   // const addassigntask1 = async (
//   //   values,
//   //   values1,
//   //   values2,
//   //   values3,
//   //   values4,
//   //   values5
//   // ) => {
//   //   const res = await addAssignTaskmaster(
//   //     values,
//   //     values1,
//   //     values2,
//   //     null,
//   //     values3,
//   //     null,
//   //     null,
//   //     values4,
//   //     null,
//   //     null,
//   //     null,
//   //     null,
//   //     null,
//   //     values5
//   //   );
//   // };
//   const handle1 = (e) => {
//     let deptypeid = e.target.value;
//     // console.log(deptypeid);
//     setdocument(deptypeid);
//   };
//   const getloc = async () => {
//     const response = await GetallLocation();

//     const names = response.data.map((item) => ({
//       value: item._id,
//       label: item.name,
//       id: item._id,
//     }));
//     setloc(names);
//   };
//   const getemprole = async () => {
//     const response = await GetallEmployeeRole();
//     const names = response.data.map((item) => ({
//       value: item._id,
//       label: item.EmployeeRole,
//       id: item.departmentType._id,
//       new_empId: item._id,
//     }));
//     setemprole(names);
//     // console.log(names);
//   };
//   const getassigntask1 = async () => {
//     const res = await GetSpecificAssignTaskById(id);
//     console.log("This is res", res);
//     setassigntask(res.data);
//     const newloc = res.data.locationSchema;
//     console.log(newloc);
//     const newdepgrp = res.data.departmentGroup;
//     const newdeptype = res.data.departmentType;
//     const newemprole = res.data.employeeRole;
//     const newempname = res.data.employeeName;

//     console.log("Resfggggggg", res.data);
//     setdeptvalueid(res.data.documentdepartmenttype._id);
//     console.log(">>>>>>>>>", res.data.locationSchema);
//     settaskvaluetype(res.data.tasktypes._id);

//     const restype = await GetAddTaskById(res.data.tasktypes._id);
//     console.log("response", restype);
//     setaccesslocation(restype.data.accessLocation);
//     settype1(restype.data.taskType);
//     setdocument(res.data.documenttype);
//     console.log("Image",res.data.documenttype)
//     let loc = [];
//     let dg = [];
//     let dt = [];
//     let er = [];
//     let en = [];

//     // location1=[];

//     newloc.map((type) => {
//       //  location1.push(type.name);
//       loc.push({
//         value: type._id,
//         label: type.name,
//       });
//     });
//     newdepgrp.map((type) => {
     
//       dg.push({
//         value: type._id,
//         label: type.name,
//       });
//     });
//     newdeptype.map((type) => {
//       //  location1.push(type.name);
//       dt.push({
//         value: type._id,
//         label: type.name,
//       });
//     });
//     newemprole.map((type) => {
//       //  location1.push(type.name);
//       er.push({
//         value: type._id,
//         label: type.EmployeeRole,
//       });
//     });
//     newempname.map((type) => {
//       //  location1.push(type.name);
//       en.push({
//         value: type._id,
//         label: type.name,
//       });
//     });
//     console.log("Location", loc);
//     console.log("Department Group", dg);
//     console.log("dt", dt);
//     console.log("er", er);
//     console.log("en", en);

//     settypeid1({
//       documentname: res.data.documentname,
//       documentdepartmenttype: res.data.documentdepartmenttype,
//       tasktypes: res.data.tasktypes,
//       formlink: res.data.formlink,
//       documenttype: res.data.documenttype,
//       uploaddocument: res.data.uploaddocument,
//       documentlink: res.data.documentlink,
//       documentdescription: res.data.documentdescription,
//       locationSchema: loc,
//       departmentGroup: dg,
//       departmentType: dt,
//       employeeRole: er,
//       employeeName: en,
//       isActive: true,
//     });

//     console.log("THis is my data", typeid1);
//   };
//   const getempname = async () => {
//     const response = await GetallEmployeeName();
//     console.log(">>>>>", response);
//     const names = response.data.map((item) => ({
//       value: item._id,
//       label: item.name,
//       id: item.employeeRole._id,
//       newid: item._id,
//     }));
//     setempname(names);
//     console.log(names);
//   };
//   const cancel = () => {
//     // location1=[];
//     navigate("/assign-master");
//   };

 
//   useEffect(() => {
//     // console.log(accesslocation);
//   }, [accesslocation]);
//   useEffect(() => {
//     // console.log(accesslocation);
//     settaskvaluetype(assigntask?.tasktypes?._id);
//     console.log("Niceee", taskvaluetype);
//   }, []);

//   useEffect(() => {
//     getalldtype();
//     getdepgroup();
//     getloc();
//     getdeptype();
//     getemprole();
//     getempname();
//     getassigntask1();
//   }, []);

//   useEffect(() => {
//     gettingtasktype();
//   }, [assigntask?.documentdepartmenttype?._id]);

//   return (
//     <>
//       <UiContent />
//       <div className="page-content">
//         <Container fluid>
//           <BreadCrumb
//             grandParent="Setup"
//             parent="OPA"
//             child="Edit-AssignTask"
//           />
//           <Row>
//             <Col lg={12}>
//               <Formik
//                 // validationSchema={schema}
//                 initialValues={
//                   typeid1
//                 }
//                 onSubmit={async(values, { resetForm }) => {
       
//                   const locationSchemaValues = typeid1.locationSchema ? typeid1.locationSchema.map(item => item.value) : [];
//   const departmentGroupValues = typeid1.departmentGroup ? typeid1.departmentGroup.map(item => item.value) : [];
//   const departmentTypeValues = typeid1.departmentType ? typeid1.departmentType.map(item => item.value) : [];
//   const employeeRoleValues = typeid1.employeeRole ? typeid1.employeeRole.map(item => item.value) : [];
//   const employeeNameValues = typeid1.employeeName ? typeid1.employeeName.map(item => item.value) : [];
//                   console.log("helooooooooo",typeid1.documentname);
//                   //  console.log(typeid1.documentname);
//                   const response =await setEditAssignTask(
//                     id,
//                     typeid1.documentname,
//                     typeid1.documentdepartmenttype,
//                     typeid1.tasktypes,
//                     typeid1.formlink,
//                     typeid1.documenttype,
//                     typeid1.uploaddocument,
//                     typeid1.documentlink,
//                     typeid1.documentdescription,
//                     locationSchemaValues, // Pass only the values of locationSchema
//     departmentGroupValues, // Pass only the values of departmentGroup
//     departmentTypeValues, // Pass only the values of departmentType
//     employeeRoleValues, // Pass only the values of employeeRole
//     employeeNameValues, 
//     // typeid1.locationSchema,
//     // typeid1.departmentGroup,
//     // typeid1.departmentType,
//     // typeid1.employeeRole,
//     // typeid1.employeeName,
//                     typeid1.isActive
//                 );
                
//                   if (response) {
//                     // console.log("THis is the form link",response.formlink)
//                     GetallAssignTask();
                    
//                     navigate("/assign-master");
                    
//                   }
//                   // addassigntask(values, loc1, dg1, dt, er, en);
//                   resetForm();
//                 }}
//               >
//                 {({
//                   values,
//                   errors,
//                   touched,
//                   handleChange,
//                   handleBlur,
//                   handleSubmit,
//                 }) => (
//                   <div className="login">
//                     <div className="form">
//                       {/* Passing handleSubmit parameter tohtml form onSubmit property */}
//                       <form noValidate onSubmit={handleSubmit}>
//                         {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}

//                         <Card>
//                           <CardHeader>
//                             <Row className="g-1 m-1">
//                               <Col className="col-sm">
//                                 <div className="d-flex justify-content-sm-between">
//                                   <h2 className="card-title mb-0 justify-content-sm-start">
//                                     <strong>Assigns Task Details</strong>
//                                   </h2>
//                                 </div>
//                               </Col>
//                             </Row>
//                           </CardHeader>
//                           <div className="card-body">
//                             <div className="live-preview">
//                               <Row className="align-items-center g-3">
//                                 <Col sm={4}>
//                                   <label
//                                     className="form-label mt-3"
//                                     htmlFor="product-orders-input"
//                                   >
//                                     Document Name
//                                   </label>
//                                   <div className="">
//                                     <Input
//                                       type="text"
//                                       className="form-control"
//                                       id="product-orders-input"
//                                       name="documentname"
//                                       aria-label="orders"
//                                       ar
//                                       ia-describedby="product-orders-addon"
//                                       onChange={(e) => settypeid1((prev) => ({ ...prev, documentname: e.target.value }))}
//                                       onBlur={handleBlur}
//                                       value={typeid1.documentname}
//                                     />
//                                   </div>

                             
//                                 </Col>
//                                 <Col sm={4}>
//                                   <label
//                                     className="form-label mt-3"
//                                     htmlFor="product-orders-input"
//                                   >
//                                     Document Department Types
//                                   </label>
//                                   <div className="">
//                                     <select
//                                       className="form-select"
//                                       name="documentdepartmenttype"
//                                       onBlur={handleBlur}
//                                       value={typeid1.documentdepartmenttype._id}
//                                       onChange={(e) => settypeid1((prev) => ({ ...prev, documentdepartmenttype: e.target.value }))}
//                                     >
//                                       <option value="">--select--</option>
//                                       {departmenttype &&
//                                         departmenttype.length > 0 ? (
//                                         departmenttype.map((type) => (
//                                           <option key={type} value={type._id}>
//                                             {type.name}
//                                           </option>
//                                         ))
//                                       ) : (
//                                         <option value="" disabled>
//                                           No department available
//                                         </option>
//                                       )}
//                                     </select>
//                                   </div>
                               
//                                 </Col>
//                                 <Col sm={4}>
//                                   <label
//                                     className="form-label mt-3"
//                                     htmlFor="product-orders-input"
//                                   >
//                                     Task Types
//                                   </label>
//                                   <div className="">
//                                     <select
//                                       className="form-select"
//                                       name="tasktypes"
//                                       onBlur={handleBlur}
//                                       value={typeid1.tasktypes._id}
//                                       onChange={(e) => settypeid1((prev) => ({ ...prev, tasktypes: e.target.value }))}
//                                     >
//                                       <option value="">--select--</option>
//                                       {tasktype && tasktype.length > 0 ? (
//                                         tasktype.map((type) => (
//                                           <option key={type} value={type._id}>
//                                             {type.taskName}
//                                           </option>
//                                         ))
//                                       ) : (
//                                         <option value="" disabled>
//                                           No task available
//                                         </option>
//                                       )}
//                                     </select>
//                                   </div>
//                                   <p className="error text-danger">
//                                     {errors.checkupType &&
//                                       touched.checkupType &&
//                                       errors.checkupType}
//                                   </p>
//                                 </Col>
//                                 {type1 === "Form" && (
//                                   <Col sm={4}>
//                                     <label
//                                       className="form-label mt-3"
//                                       htmlFor="product-orders-input"
//                                     >
//                                       Form Link
//                                     </label>
//                                     <div className="">
//                                       <Input
//                                         type="text"
//                                         className="form-control"
//                                         id="product-orders-input"
//                                         name="formlink"
//                                         aria-label="orders"
//                                         ar
//                                         ia-describedby="product-orders-addon"
//                                         onChange={(e) => settypeid1((prev) => ({ ...prev, formlink: e.target.value }))}
//                                         onBlur={handleBlur}
//                                         value={typeid1.formlink}
//                                       />
//                                     </div>

//                                     {/* <p className="error text-danger"></p> */}
//                                     <div className="text-start mb-3 ms-3" style={{ paddingRight: '20px' , paddingTop: '40px' }}>
//   <button
//     className="btn btn-success w-sm"
//     type="submit"
//     style={{ marginLeft: '-20px' }}
//   >
// Update
//   </button>
//   <button
//                                         className="btn btn-danger w-sm"
//                                         onClick={cancel}
//                                         style={{ marginLeft: "5px" }}
//                                       >
//                                         Cancel
//                                       </button>
// </div>
//                                   </Col>
                                  
                              
//                                 )}
//                                 {type1 === "Data" && (
//                                   <>
//                                     <Col sm={4}>
//                                       <label
//                                         className="form-label mt-3"
//                                         htmlFor="product-orders-input"
//                                       >
//                                         Document Types
//                                       </label>
//                                       <div className="">
//                                         <select
//                                           className="form-select"
//                                           name="documenttype"
//                                           onBlur={handleBlur}
//                                           value={typeid1.documenttype}
//                                           onChange={(e) => settypeid1((prev) => ({ ...prev, documenttype: e.target.value }))}
//                                         >
//                                           <option value="">--select--</option>
//                                           <option value="File Upload">
//                                             File Upload
//                                           </option>
//                                           <option value="Link">Link</option>
//                                         </select>
//                                       </div>
//                                       <p className="error text-danger">
//                                         {errors.checkupType &&
//                                           touched.checkupType &&
//                                           errors.checkupType}
//                                       </p>
//                                     </Col>
//                                     {document === "File Upload" && (
//                                       <Col sm={4}>
//                                         <div>
//                                           <Label
//                                             htmlFor="formFile"
//                                             className="form-label"
//                                           >
//                                             File Upload
//                                           </Label>
//                                           <Input
//                                             className="form-control"
//                                             type="file"
//                                             id="formFile"
//                                             name="uploaddocument"
//                                           />
//                                         </div>
//                                       </Col>
//                                     )}

//                                     {(document === "Link") && (
//                                       <Col sm={4}>
//                                         <label
//                                           className="form-label mt-3"
//                                           htmlFor="product-orders-input"
//                                         >
//                                           Document Link
//                                         </label>
//                                         <div className="">
//                                           <Input
//                                             type="text"
//                                             className="form-control"
//                                             id="product-orders-input"
//                                             name="documentlink"
//                                             aria-label="orders"
//                                             ar
//                                             ia-describedby="product-orders-addon"
//                                             onChange={(e) => settypeid1((prev) => ({ ...prev, documentlink: e.target.value }))}
//                                             onBlur={handleBlur}
//                                             value={typeid1.documentlink}
//                                           />
//                                         </div>

//                                         <p className="error text-danger">
//                                           {/* {errors.checkupNumber &&
//                                       touched.checkupNumber &&
//                                       errors.checkupNumber} */}
//                                         </p>
//                                       </Col>
//                                     )}
//                                     <Col sm={2}>
//                                       <div className="mt-3">
//                                         <Input
//                                           type="checkbox"
//                                           id="isActive"
//                                           label="Is Active"
//                                           name="isActive"
//                                           onChange={(e) => settypeid1((prev) => ({ ...prev, isActive: e.target.checked }))}
//                                           onChange={handleChange}
//                                         />
//                                         <label className="me-2">
//                                           Is Active
//                                         </label>
//                                       </div>
//                                     </Col>
                                    

//                                   <div className="text-end mb-3 me-3">
//                                     <button
//                                       className="btn btn-success w-sm"
//                                       type="submit"
//                                     >
//                                       Update
//                                     </button>
//                                     <button
//                                         className="btn btn-danger w-sm"
//                                         onClick={cancel}
//                                         style={{ marginLeft: "6px" }}
//                                       >
//                                         Cancel
//                                       </button>
//                                   </div>
//                                   </>
//                                 )}
//                                 <Col sm={8}>
//                                   <div>
//                                     <Label
//                                       htmlFor="exampleFormControlTextarea5"
//                                       className="form-label"
//                                     >
//                                       Document Description
//                                     </Label>
//                                     <textarea
//                                       className="form-control"
//                                       id="exampleFormControlTextarea5"
//                                       rows="4"
//                                       name="documentdescription"
//                                       value={typeid1.documentdescription}
//                                       onChange={(e) => settypeid1((prev) => ({ ...prev, documentdescription: e.target.value }))}
//                                     ></textarea>
//                                   </div>
//                                 </Col>
//                                 {type === "Form" &&(
//                                   <>
//                                     <Col sm={2}>
//                                       <div className="mt-3">
//                                         <Input
//                                           type="checkbox"
//                                           id="isActive"
//                                           label="Is Active"
//                                           name="isActive"
//                                           checked={typeid1.isActive}
//                                           onChange={(e) => settypeid1((prev) => ({ ...prev, isActive: e.target.checked }))}
//                                         />
//                                         <label className="me-2">
//                                           Is Active
//                                         </label>
//                                       </div>
//                                     </Col>
                                    
//                                     {accesslocation==="No"&&(

//                                     <div className="text-end mb-3 me-3">
//                                       <button
//                                         className="btn btn-success w-sm"
//                                         type="submit"
//                                         onClick={() => {
//                                           const res=EditAssignTask(
//                                             values.documentname,
//                                             values.documentdepartmenttype,
//                                             values.tasktypes,
//                                             values.formlink,
//                                             values.documentdescription,
//                                             values.isActive
//                                           );
//                                           if(res){
//                                             GetallAssignTask();
//                                             navigate('/assign-task');
//                                           }
//                                         }}
//                                       >
//                                         Update
//                                       </button>
//                                       <button
//                                         className="btn btn-danger w-sm"
//                                         onClick={cancel}
//                                         style={{ marginLeft: "6px" }}
//                                       >
//                                         Cancel
//                                       </button>
//                                     </div>
//                                     )}
//                                   </>
//                                 )}
//                               </Row>
//                             </div>
//                           </div>
//                         </Card>

//                         {accesslocation === "Yes" && (
//                           <Card>
//                             <CardHeader>
//                               <Row className="g-1 m-1">
//                                 <Col className="col-sm">
//                                   <div className="d-flex justify-content-sm-between">
//                                     <h2 className="card-title mb-0 justify-content-sm-start">
//                                       <strong> Task Access</strong>
//                                     </h2>
//                                   </div>
//                                 </Col>
//                               </Row>
//                             </CardHeader>
//                             <div className="card-body">
//                               <div className="live-preview">
//                                 <Row className="align-items-center g-3">
//                                   <Col lg={4}>
//                                     <div className="mb-3">
//                                       <Label
//                                         htmlFor="choices-multiple-default"
//                                         className="form-label text-muted"
//                                       >
//                                         Location
//                                       </Label>
//                                       <Select
//                                         isMulti={true}
//                                         isDisabled={true}
//                                         options={typeid1.locationSchema.map(
//                                           (loc) => ({
//                                             value: loc.value,
//                                             label: loc.label,
//                                             isDisabled: true,
//                                             // Disable each option if in edit mode
//                                           })
//                                         )}
//                                         value={typeid1.locationSchema.map(
//                                           (loc) => ({
//                                             value: loc.value,
//                                             label: loc.label,
//                                           })
//                                         )}
//                                       />
//                                     </div>
//                                   </Col>
//                                   <Col lg={4}>
//                                     <div className="mb-3">
//                                       <Label
//                                         htmlFor="choices-multiple-default"
//                                         className="form-label text-muted"
//                                       >
//                                         Department Group
//                                       </Label>
//                                       <Select
//                                         isMulti={true}
//                                         isDisabled={true}
//                                         options={typeid1.departmentGroup.map(
//                                           (loc) => ({
//                                             value: loc.value,
//                                             label: loc.label,
//                                             isDisabled: true,
//                                             // Disable each option if in edit mode
//                                           })
//                                         )}
//                                         value={typeid1.departmentGroup.map(
//                                           (loc) => ({
//                                             value: loc.value,
//                                             label: loc.label,
//                                           })
//                                         )}
//                                       />
//                                     </div>
//                                   </Col>
//                                   <Col lg={4}>
//                                     <div className="mb-3">
//                                       <Label
//                                         htmlFor="choices-multiple-default"
//                                         className="form-label text-muted"
//                                       >
//                                         Department Type
//                                       </Label>
//                                       <Select

//                                         isMulti={true}
//                                         isDisabled={true}


//                                         options={typeid1.departmentType.map((loc) => ({
//                                           value: loc.value,
//                                           label: loc.label,
//                                           isDisabled: true
//                                           // Disable each option if in edit mode
//                                         }))}

//                                         value={typeid1.departmentType.map((loc) => ({
//                                           value: loc.value,
//                                           label: loc.label,
//                                         }))}

//                                       />
//                                     </div>
//                                   </Col>
//                                   <Col lg={6}>
//                                     <div className="mb-3">
//                                       <Label
//                                         htmlFor="choices-multiple-default"
//                                         className="form-label text-muted"
//                                       >
//                                         Employee Roles
//                                       </Label>
//                                       <Select
//                                         isMulti={true}
//                                         isDisabled={true}


//                                         options={typeid1.employeeRole.map((loc) => ({
//                                           value: loc.value,
//                                           label: loc.label,
//                                           isDisabled: true
//                                           // Disable each option if in edit mode
//                                         }))}

//                                         value={typeid1.employeeRole.map((loc) => ({
//                                           value: loc.value,
//                                           label: loc.label,
//                                         }))}
//                                       />
//                                     </div>
//                                   </Col>
//                                   <Col lg={6}>
//                                     <div className="mb-3">
//                                       <Label
//                                         htmlFor="choices-multiple-default"
//                                         className="form-label text-muted"
//                                       >
//                                         Employee Name
//                                       </Label>
//                                       <Select

//                                         isMulti={true}
//                                         isDisabled={true}


//                                         options={typeid1.employeeName.map((loc) => ({
//                                           value: loc.value,
//                                           label: loc.label,
//                                           isDisabled: true
//                                           // Disable each option if in edit mode
//                                         }))}

//                                         value={typeid1.employeeName.map((loc) => ({
//                                           value: loc.value,
//                                           label: loc.label,
//                                         }))}
//                                       />
//                                     </div>
//                                   </Col>
//                                   <Col sm={2}>
//                                     <div className="mt-3">
//                                       <Input
//                                         type="checkbox"
//                                         id="isActive"
//                                         label="Is Active"
//                                         name="active"
//                                         checked={values.active}
//                                         onChange={handleChange}
//                                       />
//                                       <label className="me-2">Is Active</label>
//                                     </div>
//                                   </Col>
//                                   {type!=="Form"&&(
//                                   <div className="text-end mb-3 me-3">
//                                     <button
//                                       className="btn btn-success w-sm"
//                                       type="submit"
//                                     >
//                                       Update
//                                     </button>
//                                     <button
//                                       className="btn btn-danger w-sm"
//                                       type="submit"
//                                       onClick={cancel}
//                                       style={{ marginLeft: "6px" }}
//                                     >
//                                       Cancel
//                                     </button>
//                                   </div>
//                                   )}
//                                 </Row>
//                               </div>
//                             </div>
//                           </Card>
//                         )}
//                       </form>
//                     </div>
//                   </div>
//                 )}
//               </Formik>
//             </Col>
//           </Row>
//         </Container>
//       </div>
//     </>
//   );
// };

// export default EditAssignTask;
import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import UiContent from "../../Components/Common/UiContent";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
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
// const SingleOptions = [
//   { value: "Choices 1", label: "Choices 1" },
//   { value: "Choices 2", label: "Choices 2" },
//   { value: "Choices 3", label: "Choices 3" },
//   { value: "Choices 4", label: "Choices 4" },
// ];

const EditAssignTask = () => {
  let location1 = [];
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSingle, setSelectedSingle] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedGroup2, setSelectedGroup2] = useState(null);
  const [selectedNoSortingGroup, setSelectedNoSortingGroup] = useState(null);
  const [selectedMulti, setselectedMulti] = useState(null);
  const [selectedMulti1, setselectedMulti1] = useState(null);
  const [selectedMulti2, setselectedMulti2] = useState(null);
  const [selectedMulti3, setselectedMulti3] = useState(null);
  const [selectedMulti4, setselectedMulti4] = useState(null);
  const [accesslocation, setaccesslocation] = useState("");
  const [type, settype] = useState("");
  const [type1, settype1] = useState("");
  const [departmenttype, setdepartmenttype] = useState(null);
  const [tasktype, settasktype] = useState([]);
  const [document, setdocument] = useState("");
  const [dep, setdep] = useState(null);
  const [loc, setloc] = useState(null);
  const [dtype, setdtype] = useState(null);
  const [emprole, setemprole] = useState(null);
  const [empname, setempname] = useState(null);
  const [deptvalueid, setdeptvalueid] = useState(null);

  const [taskvaluetype, settaskvaluetype] = useState(null);
  const [location, setlocation] = useState([]);
  const [uniqueDepartmentTypes, setUniqueDepartmentTypes] = useState([]);

  const [uniqueEmployeeRoles, setUniqueEmployeeRoles] = useState([]);

  const [uniqueEmployeeNames, setuniqueEmployeeNames] = useState([]);
  const [typeid1, settypeid1] = useState({
    documentname: "",
    documentdepartmenttype: "",
    tasktypes: "",
    formlink: "",
    documenttype: "",
    uploaddocument:"",
    documentlink: "",
    documentdescription: "",
    locationSchema: [],
    departmentGroup: [],
    departmentType: [],
    employeeRole: [],
    employeeName: [],
    isActive: "",
  });
  const [assigntask, setassigntask] = useState(null);
  const {
    GetallDepartmentType,
    GetSpecificTaskByDepartmentGroup,
    GetAddTaskById,
    GetallDepartmentGroup,
    GetallLocation,
    GetallEmployeeRole,
    GetallEmployeeName,
    addAssignTaskmaster,
    GetSpecificAssignTaskById,
    GetSpecificAssignTaskByDeptId,
    setEditAssignTask,
    GetDepTypeByIdForEditing
  } = useContext(SignContext);
  
  const getalldtype = async () => {
    // const response = await axios.get(`${P}`);
    // const response = await GetallDepartmentType();
    // setdepartmenttype(response.data);
    // console.log("This is the data",response.data)
    // setdepartmenttype(response.data);
 
      // // Retrieve department ID from localStorage
      try {
        // Retrieve department ID from localStorage
        const departmentId = localStorage.getItem('DepartmentTypeID'); // Replace 'your_department_id_key' with the actual key
    // const departmentId = "65b0ebc59d84e445fc900f18";
        // Make API call to get department data by ID for editing
        const response = await GetDepTypeByIdForEditing(departmentId);

        setdepartmenttype(response.data);
    
        // Set the department type in state
        // setdepartmentype(response.data);
      } catch (error) {
        // Handle error
        // console.error('Error fetching department type for editing:', error);
      }
      
   
  };
  function handleSelectSingle(selectedSingle) {
    setSelectedSingle(selectedSingle);
  }

  function handleSelectGroups(selectedGroup) {
    setSelectedGroup(selectedGroup);
  }

  function handleSelectGroups2(selectedGroup2) {
    setSelectedGroup2(selectedGroup2);
  }

  function handleSelectNoSortingGroup(selectedNoSortingGroup) {
    setSelectedNoSortingGroup(selectedNoSortingGroup);
  }

  function handleMulti(selectedMulti) {
    setselectedMulti(selectedMulti);
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
  }

  function handleMulti1(selectedMulti1) {

    setselectedMulti1(selectedMulti1);

    let selectedempValues = [];
    for (let i = 0; i < selectedMulti1.length; i++) {
      const selectId = selectedMulti1[i].new_Id;


      for (let j = 0; j < emprole.length; j++) {
        const employeetype = emprole[j];

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
  function handleMulti4(selectedMulti4) {

    setselectedMulti4(selectedMulti4);
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
            newid: EmployeeName.newid,
          });
        }
      }
    }
    setuniqueEmployeeNames(selectedempNames);
  }
  const gettingtasktype = async (id) => {
    const res = await GetSpecificAssignTaskByDeptId(
      assigntask?.documentdepartmenttype?._id
    );

    let typearr = res.data.map((f) => f.tasktypes);
    settasktype(typearr);


  };
  const getdeptype = async () => {
    const response = await GetallDepartmentType();

    const names = response.data.map((item) => ({
      value: item._id,
      label: item.name,
      id: item.departmentGroup._id,
      new_id: item._id,
    }));
    setdtype(names);
  };
  const handleTaskChange = async (e) => {
    let taskid = e.target.value;


    const res = await GetAddTaskById(taskid);

    setaccesslocation(res.data.accessLocation);
    settype(res.data.taskType);
    setdocument(res.data.uploaddocument);
  };
  const handleDepType = (e) => {
    let deptypeid = e.target.value;

    gettingtasktype(deptvalueid);
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
  const addassigntask = async (values, loc1, dg1, dt, er, en) => {


    const res = await addAssignTaskmaster(
      values.documentname,
      values.documentdepartmenttype,
      values.tasktypes,
      values.documenttype,
      values.formlink,
      values.documentlink,
      values.uploaddocument,
      values.documentdescription,
      loc1,
      dg1,
      dt,
      er,
      en,
      values.isActive
    );
    
  };
  const addassigntask1 = async (
    values,
    values1,
    values2,
    values3,
    values4,
    values5
  ) => {
    const res = await addAssignTaskmaster(
      values,
      values1,
      values2,
      null,
      values3,
      null,
      null,
      values4,
      null,
      null,
      null,
      null,
      null,
      values5
    );
  };
  const handle1 = (e) => {
    let deptypeid = e.target.value;

    setdocument(deptypeid);
  };
  const getloc = async () => {
    const response = await GetallLocation();

    const names = response.data.map((item) => ({
      value: item._id,
      label: item.name,
      id: item._id,
    }));
    setloc(names);
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

  };
  const getassigntask1 = async () => {
    const res = await GetSpecificAssignTaskById(id);

    setassigntask(res.data);
    const newloc = res.data.locationSchema;
    const newdepgrp = res.data.departmentGroup;
    const newdeptype = res.data.departmentType;
    const newemprole = res.data.employeeRole;
    const newempname = res.data.employeeName;


    setdeptvalueid(res.data.documentdepartmenttype._id);

    settaskvaluetype(res.data.tasktypes._id);

    const restype = await GetAddTaskById(res.data.tasktypes._id);

    setaccesslocation(restype.data.accessLocation);
    settype1(restype.data.taskType);
    setdocument(res.data.documenttype);

    let loc = [];
    let dg = [];
    let dt = [];
    let er = [];
    let en = [];

    // location1=[];

    newloc.map((type) => {
      //  location1.push(type.name);
      loc.push({
        value: type._id,
        label: type.name,
      });
    });
    newdepgrp.map((type) => {
     
      dg.push({
        value: type._id,
        label: type.name,
      });
    });
    newdeptype.map((type) => {
      //  location1.push(type.name);
      dt.push({
        value: type._id,
        label: type.name,
      });
    });
    newemprole.map((type) => {
      //  location1.push(type.name);
      er.push({
        value: type._id,
        label: type.EmployeeRole,
      });
    });
    newempname.map((type) => {
      //  location1.push(type.name);
      en.push({
        value: type._id,
        label: type.name,
      });
    });

    settypeid1({
      documentname: res.data.documentname,
      documentdepartmenttype: res.data.documentdepartmenttype,
      tasktypes: res.data.tasktypes,
      formlink: res.data.formlink,
      documenttype: res.data.documenttype,
      uploaddocument: res.data.uploaddocument,
      documentlink: res.data.documentlink,
      documentdescription: res.data.documentdescription,
      locationSchema: loc,
      departmentGroup: dg,
      departmentType: dt,
      employeeRole: er,
      employeeName: en,
      isActive: res.data.isActive,
    });


  };
  const getempname = async () => {
    const response = await GetallEmployeeName();

    const names = response.data.map((item) => ({
      value: item._id,
      label: item.name,
      id: item.employeeRole._id,
      newid: item._id,
    }));
    setempname(names);

  };
  const cancel = () => {
    // location1=[];
    navigate("/assign-master");
  };

 
  useEffect(() => {
    
  }, [accesslocation]);
  useEffect(() => {
    
    settaskvaluetype(assigntask?.tasktypes?._id);

  }, []);

  useEffect(() => {
    getalldtype();
    getdepgroup();
    getloc();
    getdeptype();
    getemprole();
    getempname();
    getassigntask1();
  }, []);

  useEffect(() => {
    gettingtasktype();
  }, [assigntask?.documentdepartmenttype?._id]);

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
                onSubmit={async(values, { resetForm }) => {

       
                  const locationSchemaValues = typeid1.locationSchema ? typeid1.locationSchema.map(item => item.value) : [];

  const departmentGroupValues = typeid1.departmentGroup ? typeid1.departmentGroup.map(item => item.value) : [];
  const departmentTypeValues = typeid1.departmentType ? typeid1.departmentType.map(item => item.value) : [];
  const employeeRoleValues = typeid1.employeeRole ? typeid1.employeeRole.map(item => item.value) : [];
  const employeeNameValues = typeid1.employeeName ? typeid1.employeeName.map(item => item.value) : [];

                  //  console.log(typeid1.documentname);
                  const response =await setEditAssignTask(
                    id,
                    typeid1.documentname,
                    typeid1.documentdepartmenttype,
                    typeid1.tasktypes,
                    typeid1.formlink,
                    typeid1.documenttype,
                    typeid1.uploaddocument,
                    typeid1.documentlink,
                    typeid1.documentdescription,
                    locationSchemaValues, // Pass only the values of locationSchema
    departmentGroupValues, // Pass only the values of departmentGroup
    departmentTypeValues, // Pass only the values of departmentType
    employeeRoleValues, // Pass only the values of employeeRole
    employeeNameValues, 
    // typeid1.locationSchema,
    // typeid1.departmentGroup,
    // typeid1.departmentType,
    // typeid1.employeeRole,
    // typeid1.employeeName,
                    typeid1.isActive
                );
                
                  if (response) {

                    GetSpecificAssignTaskByDeptId();
                    navigate("/assign-master");
                    
                  }
                  // addassigntask(values, loc1, dg1, dt, er, en);
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
                                    <strong>Assigns Task Details</strong>
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
                                    Document Name
                                  </label>
                                  <div className="">
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="product-orders-input"
                                      name="documentname"
                                      aria-label="orders"
                                      ar
                                      ia-describedby="product-orders-addon"
                                      onChange={(e) => settypeid1((prev) => ({ ...prev, documentname: e.target.value }))}
                                      onBlur={handleBlur}
                                      value={typeid1.documentname}
                                    />
                                  </div>

                             
                                </Col>
                                <Col sm={4}>
                                  <label
                                    className="form-label mt-3"
                                    htmlFor="product-orders-input"
                                  >
                                    Document Department Types
                                  </label>
                                  <div className="">
                                    <select
                                      className="form-select"
                                      name="documentdepartmenttype"
                                      onBlur={handleBlur}
                                      value={typeid1.documentdepartmenttype._id}
                                      onChange={(e) => settypeid1((prev) => ({ ...prev, documentdepartmenttype: e.target.value }))}
                                    >
                                     
                                     
                                          <option key={type} value={type._id}>
                                          {departmenttype ? (
          <option key={departmenttype} value={departmenttype._id}>{departmenttype.name}</option>
        ) : (
          <option value="" disabled>
            No department available
          </option>
        )}
                                      
                                        </option>
                                      )}
                                    </select>
                                  </div>
                               
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
                                      name="tasktypes"
                                      onBlur={handleBlur}
                                      value={typeid1.tasktypes._id}
                                      onChange={(e) => settypeid1((prev) => ({ ...prev, tasktypes: e.target.value }))}
                                    >
                                      <option value="">--select--</option>
                                      {tasktype && tasktype.length > 0 ? (
                                        tasktype.map((type) => (
                                          <option key={type} value={type._id}>
                                            {type.taskName}
                                          </option>
                                        ))
                                      ) : (
                                        <option value="" disabled>
                                          No task available
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
                                {type1 === "Form" && (
                                  <Col sm={4}>
                                    <label
                                      className="form-label mt-3"
                                      htmlFor="product-orders-input"
                                    >
                                      Form Link
                                    </label>
                                    <div className="">
                                      <Input
                                        type="text"
                                        className="form-control"
                                        id="product-orders-input"
                                        name="formlink"
                                        aria-label="orders"
                                        ar
                                        ia-describedby="product-orders-addon"
                                        onChange={(e) => settypeid1((prev) => ({ ...prev, formlink: e.target.value }))}
                                        onBlur={handleBlur}
                                        value={typeid1.formlink}
                                      />
                                    </div>
                                    <Row style={{ position: 'relative', bottom: '-85px',justifyContent: 'flex-end', display: 'flex', marginRight:'-950px'  }}>
                                    {accesslocation==="No"&&(
                                      
                                      <div className="text-end mb-3 ms-3 d-flex justify-content-end">
 <button
    className="btn btn-success w-sm"
    type="submit"
    style={{ marginLeft: '50px' }}
  >
Update
</button>
 <button
                                        className="btn btn-danger w-sm"
                                        onClick={cancel}
                                        style={{ marginLeft: "5px" }}
                                      >
                                        Cancel
                                      </button>
                                      </div>
                                )}
                                </Row>
                                  </Col>
                                )}
                                {type1 === "Data" && (
                                  <>
                                    <Col sm={4}>
                                      <label
                                        className="form-label mt-3"
                                        htmlFor="product-orders-input"
                                      >
                                        Document Types
                                      </label>
                                      <div className="">
                                        <select
                                          className="form-select"
                                          name="documenttype"
                                          onBlur={handleBlur}
                                          value={typeid1.documenttype}
                                          onChange={(e) => settypeid1((prev) => ({ ...prev, documenttype: e.target.value }))}
                                        >
                                          <option value="">--select--</option>
                                          <option value="File Upload">
                                            File Upload
                                          </option>
                                          <option value="Link">Link</option>
                                        </select>
                                      </div>
                                      <p className="error text-danger">
                                        {errors.checkupType &&
                                          touched.checkupType &&
                                          errors.checkupType}
                                      </p>
                                    </Col>
                                    {document === "File Upload" && (
                                      <Col sm={4}>
                                        <div>
                                          <Label
                                            htmlFor="formFile"
                                            className="form-label"
                                          >
                                            File Upload
                                          </Label>
                                          <Input
                                            className="form-control"
                                            type="file"
                                            id="formFile"
                                            name="uploaddocument"
                                          />
                                        </div>
                                      </Col>
                                    )}

                                    {(assigntask?.documentlink !== ""||document === "Link") && (
                                      <Col sm={4}>
                                        <label
                                          className="form-label mt-3"
                                          htmlFor="product-orders-input"
                                        >
                                          Document Link
                                        </label>
                                        <div className="">
                                          <Input
                                            type="text"
                                            className="form-control"
                                            id="product-orders-input"
                                            name="documentlink"
                                            aria-label="orders"
                                            ar
                                            ia-describedby="product-orders-addon"
                                            onChange={(e) => settypeid1((prev) => ({ ...prev, documentlink: e.target.value }))}
                                            onBlur={handleBlur}
                                            value={typeid1.documentlink}
                                          />
                                        </div>

                                        <p className="error text-danger">
                                          {/* {errors.checkupNumber &&
                                      touched.checkupNumber &&
                                      errors.checkupNumber} */}
                                        </p>
                                      </Col>
                                    )}
                                    <Row style={{ position: 'relative', bottom: '-155px', zIndex: 99999999999999 }}>
                                   <div className="text-end mb-3 pe-3" >
<button
  className="btn btn-success w-sm"
  type="submit"
  >
  Update
</button>
<button
  className="btn btn-danger w-sm"
  onClick={cancel}
  style={{ marginLeft: '5px' }}
>
  Cancel
</button>
</div>
</Row>
                                  </>
                                )}
                                <Col sm={8}>
                                  <div>
                                    <Label
                                      htmlFor="exampleFormControlTextarea5"
                                      className="form-label"
                                    >
                                      Document Description
                                    </Label>
                                    <textarea
                                      className="form-control"
                                      id="exampleFormControlTextarea5"
                                      rows="4"
                                      name="documentdescription"
                                      value={typeid1.documentdescription}
                                      onChange={(e) => settypeid1((prev) => ({ ...prev, documentdescription: e.target.value }))}
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
                                          checked={typeid1.isActive}
                                          onChange={(e) => settypeid1((prev) => ({ ...prev, isActive: e.target.checked }))}
                                          // onChange={handleChange}
                                        />
                                        <label className="me-2">
                                          Is Active
                                        </label>
                                      </div>
                                    </Col>
                                {type === "Form" && (
                                  <>
                                    

                                  <div className="text-end mb-3 me-3">
                                      <button
                                        className="btn btn-success w-sm"
                                        type="submit"
                                        onClick={() => {
                                          addassigntask1(
                                            values.documentname,
                                            values.documentdepartmenttype,
                                            values.tasktypes,
                                            values.formlink,
                                            values.documentdescription,
                                            values.isActive
                                          );
                                        }}
                                      >
                                        Update
                                      </button>
                                      <button
  className="btn btn-danger w-sm"
  onClick={cancel}
  style={{ marginLeft: '5px' }}
>
  Cancel
</button>
</div>
                                  </>
                                )}
                              </Row>
                            </div>
                          </div>
                        </Card>

                        {accesslocation === "Yes" && (
                          <Card>
                            <CardHeader>
                              <Row className="g-1 m-1">
                                <Col className="col-sm">
                                  <div className="d-flex justify-content-sm-between">
                                    <h2 className="card-title mb-0 justify-content-sm-start">
                                      <strong> Task Access</strong>
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
                                        isMulti={true}
                                        isDisabled={true}
                                        options={typeid1.locationSchema.map(
                                          (loc) => ({
                                            value: loc.value,
                                            label: loc.label,
                                            isDisabled: true,
                                            // Disable each option if in edit mode
                                          })
                                        )}
                                        value={typeid1.locationSchema.map(
                                          (loc) => ({
                                            value: loc.value,
                                            label: loc.label,
                                          })
                                        )}
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
                                        isMulti={true}
                                        isDisabled={true}
                                        options={typeid1.departmentGroup.map(
                                          (loc) => ({
                                            value: loc.value,
                                            label: loc.label,
                                            isDisabled: true,
                                            // Disable each option if in edit mode
                                          })
                                        )}
                                        value={typeid1.departmentGroup.map(
                                          (loc) => ({
                                            value: loc.value,
                                            label: loc.label,
                                          })
                                        )}
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

                                        isMulti={true}
                                        isDisabled={true}


                                        options={typeid1.departmentType.map((loc) => ({
                                          value: loc.value,
                                          label: loc.label,
                                          isDisabled: true
                                          // Disable each option if in edit mode
                                        }))}

                                        value={typeid1.departmentType.map((loc) => ({
                                          value: loc.value,
                                          label: loc.label,
                                        }))}

                                      />
                                    </div>
                                  </Col>
                                  <Col lg={6}>
                                    <div className="mb-3">
                                      <Label
                                        htmlFor="choices-multiple-default"
                                        className="form-label text-muted"
                                      >
                                        Employee Roles
                                      </Label>
                                      <Select
                                        isMulti={true}
                                        isDisabled={true}


                                        options={typeid1.employeeRole.map((loc) => ({
                                          value: loc.value,
                                          label: loc.label,
                                          isDisabled: true
                                          // Disable each option if in edit mode
                                        }))}

                                        value={typeid1.employeeRole.map((loc) => ({
                                          value: loc.value,
                                          label: loc.label,
                                        }))}
                                      />
                                    </div>
                                  </Col>
                                  <Col lg={6}>
                                    <div className="mb-3">
                                      <Label
                                        htmlFor="choices-multiple-default"
                                        className="form-label text-muted"
                                      >
                                        Employee Name
                                      </Label>
                                      <Select

                                        isMulti={true}
                                        isDisabled={true}


                                        options={typeid1.employeeName.map((loc) => ({
                                          value: loc.value,
                                          label: loc.label,
                                          isDisabled: true
                                          // Disable each option if in edit mode
                                        }))}

                                        value={typeid1.employeeName.map((loc) => ({
                                          value: loc.value,
                                          label: loc.label,
                                        }))}
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
                                        checked={typeid1.isActive}
                                        // onChange={handleChange}
                                        onChange={(e) => settypeid1((prev) => ({ ...prev, isActive: e.target.checked }))}
                                      />
                                      <label className="me-2">Is Active</label>
                                    </div>
                                  </Col>
                                  <div className="text-end mb-3 pe-3" >
<button
  className="btn btn-success w-sm"
  type="submit"
  >
  Update
</button>
<button
  className="btn btn-danger w-sm"
  onClick={cancel}
  style={{ marginLeft: '5px' }}
>
  Cancel
</button>
</div>

                                </Row>
                              </div>
                            </div>
                          </Card>
                        )}
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

export default EditAssignTask;
