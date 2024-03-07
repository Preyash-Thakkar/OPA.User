// import React, { useState, useEffect, useContext } from "react";
// import CountUp from "react-countup";
// import { Link } from "react-router-dom";
// import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
// import axios from "axios";
// import { FaRupeeSign } from "react-icons/fa";
// import { FaUsers } from "react-icons/fa";
// import { FaShoppingCart } from "react-icons/fa";
// import { FaHourglassHalf } from "react-icons/fa";
// import { FaUndo } from "react-icons/fa";
// import { FaBan } from "react-icons/fa";
// import { FaShoppingBag } from "react-icons/fa";
// import FeatherIcon from "feather-icons-react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { useParams } from "react-router-dom";
// import "../Dashboard/dashboard.css";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import "swiper/css/scrollbar";
// import "swiper/css/effect-fade";
// import "swiper/css/effect-flip";
// import SignContext from "../contextAPI/Context/SignContext";

// import {
//   Pagination,
//   Navigation,
//   Scrollbar,
//   EffectFade,
//   EffectCreative,
//   Mousewheel,
//   EffectFlip,
//   EffectCoverflow,
//   Autoplay,
// } from "swiper";
// // const url = "http://localhost:5002";
// const NewDashboard = () => {
//   document.title = "Dashboard";
//   //const getReqCommDetails = useContext(SignContext)
//   const id = localStorage.getItem("LocationID");
//   console.log(typeof id);

//   //const { id } = useParams();
//   const {
//     GetallDepartmentType,
//     GetallDepartmentTypefordashboard,
//     GetSpecificAddTaskByDeptId,
//     deletetype,
//   } = useContext(SignContext);
//   const [communityrequireddetails, setcommunityrequireddetails] =
//     useState(null);
//   const [rolesresponsibilities, setrolesresponsibility] = useState(null);
//   const [admin, setadmin] = useState(null);
//   const [addtask, setaddtask] = useState(null);
//   const [assigntask, setassigntask] = useState(null);
//   const [commsg, setcommmsg] = useState(null);
//   const [deptype, setdeptype] = useState([]);
//   const [tasklength, settasklength] = useState(null);
//   const getreqcommdetails = async () => {
//     const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/communitymaster/getrequiredcommunitymessagebylocation/${id}`);


    
//     console.log("jfjfijefjekf", res.data);

//     setcommunityrequireddetails(res.data);
//   };
//   const getreqassigntask = async () => {
//     const res = await axios.get(
//       `${process.env.REACT_APP_BASE_URL}/assigntask/getassigntask`
//     );
//     console.log("jfjfijefjekf", res);
//     setassigntask(res.assigncount);
//   };
//   const getreqadmincount = async () => {
//     const res = await axios.get(
//       `${process.env.REACT_APP_BASE_URL}/auth/getadmins`
//     );
//     console.log("jfjfijefjekf", res);
//     setadmin(res.adminCount);
//   };
//   const getrolesresponsibility = async () => {
//     const res = await axios.get(
//       `${process.env.REACT_APP_BASE_URL}/rolesresponsibilities/getRolesResponsibilities`
//     );
//     setrolesresponsibility(res.rolesResponsibilitiesCount);

//     console.log(res.rolesResponsibilitiesCount);
//   };

//   const getcomdetails = async () => {
//     const res = await axios.get(
//       `${process.env.REACT_APP_BASE_URL}/communitymaster/getrequiredcommunitymessage`
//     );
//     setcommmsg(res.count);
//   };
//   const gettaskdetails = async () => {
//     const res = await axios.get(
//      ` ${process.env.REACT_APP_BASE_URL}/addtask/getalltask`
//     );
//     setaddtask(res.formTasksCount);
//   };

//   const getalldepartmenttye = async () => {
//     const res = await GetallDepartmentTypefordashboard();
//     setdeptype(res.data);
//     console.log(">>dtype", res);
//   };
//   const gettingid = async (id) => {
//     const res = await GetSpecificAddTaskByDeptId(id);
//     console.log("number", res);

//     settasklength(res.data.length);
//   };
//   useEffect(() => {
//     console.log(">>>", deptype);
//   }, [deptype]);
//   useEffect(() => {
//     getrolesresponsibility();
//     getreqadmincount();
//     getreqassigntask();
//     getreqcommdetails();
//     getcomdetails();
//     gettaskdetails();
//     getalldepartmenttye();
//   }, []);

//   // useEffect(() => {
//   //   gettingid();
//   // }, [id]);
//   console.log(rolesresponsibilities);
//   console.log(commsg);
//   console.log(admin);
//   console.log(assigntask);

//   useEffect(() => {
//     // Set a delay for the execution
//     const timer = setTimeout(() => {
//       getreqcommdetails();
//     }); // Delay the execution for 5000 milliseconds (5 seconds)

//     return () => clearTimeout(timer);
//   }, []);
//   return (
//     <>
//       <div className="bg-white page-content">
//         <Container fluid>
//           <Row>
//             <h5>
//               <b>Dashboard</b>
//             </h5>
//             <br />
//             <br />
//             <Col md={4}>
//               <div class="col-lg-12 col-lg-4">
//                 <Card
//                   className="card-animate card-res"
//                   style={{ borderRadius: "15px" }}
//                 >
//                   <CardBody>
//                     <div className="d-flex justify-content-between">
//                       <div>
//                         <p class="fw-semibold new-class fs-16 mb-0">Users</p>

//                         <h2 className="mt-4 ff-secondary fw-semibold">
//                           <span className="counter-value">
//                             {rolesresponsibilities}
//                           </span>
//                         </h2>
//                       </div>
//                       <div>
//                         <div className="avatar-sm flex-shrink-0">
//                           <span className="avatar-title bg-soft-info rounded-circle fs-2">
//                             <FeatherIcon icon="users" className="text-info" />
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </CardBody>
//                 </Card>
//               </div>
//             </Col>

//             <Col md={4}>
//               <div class="col-lg-12 col-lg-4">
//                 <Card
//                   className="card-animate card-custom card-res"
//                   style={{ borderRadius: "15px" }}
//                 >
//                   <CardBody>
//                     <div className="d-flex justify-content-between">
//                       <div>
//                         <p class="fw-semibold new-class fs-16 mb-0">
//                           No. of Document
//                         </p>
//                         <h2 className="mt-4 ff-secondary fw-semibold">
//                           <span className="counter-value">
//                             {commsg + admin + assigntask}
//                           </span>
//                         </h2>
//                       </div>
//                       <div>
//                         <div className="avatar-sm flex-shrink-0">
//                           <span className="avatar-title bg-soft-info rounded-circle fs-2">
//                             <FeatherIcon icon="users" className="text-info" />
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </CardBody>
//                 </Card>
//               </div>
//             </Col>
//             <Col md={4}>
//               <Card
//                 className="card-animate card-res"
//                 style={{ borderRadius: "15px" }}
//               >
//                 <CardBody>
//                   <div className="d-flex justify-content-between">
//                     <div>
//                       <p class="fw-semibold new-class fs-16 mb-0">
//                         No. of Form
//                       </p>
//                       <h2 className="mt-4 ff-secondary fw-semibold">
//                         <span className="counter-value">{addtask}</span>
//                       </h2>
//                     </div>
//                     <div>
//                       <div className="avatar-sm flex-shrink-0">
//                         <span className="avatar-title bg-soft-info rounded-circle fs-2">
//                           <FeatherIcon icon="file-text" className="text-info" />
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </CardBody>
//               </Card>
//             </Col>
//           </Row>
//           {/* vaishal */}

//           {/* <Row>
//             {deptype && deptype.length>0 && deptype.map((type, index) => (


//               <Col md={4} key={index}>
//                 <Link to={/subdashboard/${type._id}}>
//                   <Card
//                     className="card-animate card-res"
//                     style={{ borderRadius: "15px" }}
//                   >
//                     <CardBody>
//                       <div className="d-flex justify-content-between">
//                         <div>
//                           <p class="fw-semibold new-class fs-16 mb-0">
//                             {type.name}
//                           </p>

                          
//                           <h2
//                             className="mt-1 ff-secondary fs-14"
//                             style={{ fontWeight: "bold" }}
//                           >
//                             SOPs
//                           </h2>
//                           <h2
//                             className="mt-1 ff-secondary fs-14"
//                             style={{ fontWeight: "bold" }}
//                           >
                            
//                           </h2>
//                         </div>
//                         <div>
//                           <div className="avatar-sm flex-shrink-0">
//                             <span className="avatar-title bg-soft-info rounded-circle fs-2">
//                               <FeatherIcon
//                                 icon="file-text"
//                                 className="text-info"
//                               />
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     </CardBody>
//                   </Card>
//                 </Link>
//               </Col>
//             ))}
//           </Row> */}

//           <Row>
//             {deptype &&
//               deptype.length > 0 &&
//               deptype.map((type, index) => {
//                 {
//                   /* gettingid(type._id); // Assuming you want to fetch data for each item */
//                 }
//                 return (
//                   <Col md={4} key={index}>
//                     <Link to={`/subdashboard/${type.departmentType._id}`}>
//                       <Card
//                         className="card-animate card-res"
//                         style={{ borderRadius: "15px" }}
//                       >
//                         <CardBody>
//                           <div className="d-flex justify-content-between">
//                             <div>
//                               <p className="fw-semibold new-class fs-16 mb-0">
//                                 {type.departmentType.name}
//                               </p>
//                               <br />
//                               <br />
//                               <h2 className="mt-1 ff-secondary fs-14 myClass">
                              
//                                 <b><h2>{type.taskLength}</h2></b>
//                               </h2>
//                               <h2
//                                 className="mt-1 ff-secondary fs-14"
//                                 style={{ fontWeight: "bold" }}
//                               >
//                                 {/* {type.taskLength} */}
//                               </h2>
//                               <h2
//                                 className="mt-1 ff-secondary fs-14"
//                                 style={{ fontWeight: "bold" }}
//                               >
//                                 {/* Task Length: {tasklength} */}
//                               </h2>
//                             </div>
//                             <div>
//                               <div className="avatar-sm flex-shrink-0">
//                                 <span className="avatar-title bg-soft-info rounded-circle fs-2">
//                                   <FeatherIcon
//                                     icon="file-text"
//                                     className="text-info"
//                                   />
//                                 </span>
//                               </div>
//                             </div>
//                           </div>
//                         </CardBody>
//                       </Card>
//                     </Link>
//                   </Col>
//                 );
//               })}
//           </Row>

//           <Col lg={12}>
//             <Card>
//               <CardBody>
//                 <h4 className="mb-4">Business Community Updates</h4>
//                 <hr />
//                 <Swiper
//                   slidesPerView={1}
//                   spaceBetween={10}
//                   pagination={{
//                     el: ".swiper-pagination",
//                     clickable: true,
//                   }}
//                   breakpoints={{
//                     640: {
//                       slidesPerView: 2,
//                       spaceBetween: 20,
//                     },
//                     768: {
//                       slidesPerView: 3,
//                       spaceBetween: 40,
//                     },
//                     1024: {
//                       slidesPerView: 4,
//                       spaceBetween: 50,
//                     },
//                   }}
//                   loop={true}
//                   modules={[Pagination]}
//                   className="mySwiper swiper responsive-swiper rounded gallery-light pb-5"
//                 >
//                   <div className="swiper-wrapper">
//                     <div className="swiper-wrapper">
//                       {communityrequireddetails &&
//                       communityrequireddetails.length > 0 ? (
//                         communityrequireddetails.map((detail, index) => (
//                           <SwiperSlide key={index}>
//                             <div className="gallery-box card">
//                               <div className="gallery-container">
//                                 <Link
//                                   className="image-popup"
//                                   title={detail.name}
//                                 >
//                                   <img
//                                     className="gallery-img img-fluid mx-auto"
//                                     src={`${process.env.REACT_APP_BASE_URL}/${detail.uploadimage}`} // Adjust accordingly if using base64 strings
//                                     alt={detail.name}
//                                     style={{
//                                       height: "305px",
//                                       width: "208.5px",
//                                     }}
//                                   />
//                                   <div className="gallery-overlay">
//                                     <h5 className="overlay-caption">
//                                       {/* Assuming you want to display all locations for this detail */}
//                                       {detail.locationSchema
//                                         .map((location) => location.name)
//                                         .join(", ")}
//                                       <br />
//                                       10:00 - 6:00{" "}
//                                       {/* Static time, replace if dynamic */}
//                                     </h5>
//                                   </div>
//                                 </Link>
//                               </div>
//                               <div className="box-content">
//                                 <div className="d-flex align-items-center mt-1">
//                                   <h5 className="m-1">{detail.name}</h5>
//                                 </div>
//                                 <p className="m-1">{detail.message}</p>
//                               </div>
//                             </div>
//                           </SwiperSlide>
//                         ))
//                       ) : (
//                         <p>No community updates to display</p>
//                       )}
//                     </div>
//                   </div>
//                   <div className="swiper-pagination swiper-pagination-dark"></div>
//                 </Swiper>
//               </CardBody>
//             </Card>
//           </Col>
//         </Container>
//       </div>
//     </>
//   );
// };

// export default NewDashboard;
import React, { useState, useEffect, useContext } from "react";
import CountUp from "react-countup";
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import axios from "axios";
import { FaRupeeSign } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaHourglassHalf } from "react-icons/fa";
import { FaUndo } from "react-icons/fa";
import { FaBan } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
import FeatherIcon from "feather-icons-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../Dashboard/dashboard.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import "swiper/css/effect-flip";
import SignContext from "../contextAPI/Context/SignContext";

import {
  Pagination,
  Navigation,
  Scrollbar,
  EffectFade,
  EffectCreative,
  Mousewheel,
  EffectFlip,
  EffectCoverflow,
  Autoplay,
} from "swiper";
// const url = "http://localhost:5002";
const NewDashboard = () => {
  document.title = "Dashboard";
  //const getReqCommDetails = useContext(SignContext)
  const id = localStorage.getItem("LocationID");
  const navigate=useNavigate();
  //const { id } = useParams();
  const {
    GetallDepartmentType,
    GetallDepartmentTypefordashboard,
    GetSpecificAddTaskByDeptId,
    deletetype,
  } = useContext(SignContext);
  const [communityrequireddetails, setcommunityrequireddetails] =
    useState(null);
  const [rolesresponsibilities, setrolesresponsibility] = useState(null);
  const [admin, setadmin] = useState(null);
  const [addtask, setaddtask] = useState(null);
  const [assigntask, setassigntask] = useState(null);
  const [commsg, setcommmsg] = useState(null);
  const [deptype, setdeptype] = useState([]);
  const [tasklength, settasklength] = useState(null);
  const [response, setresponse] = useState(null);
  const getreqcommdetails = async () => {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/communitymaster/getrequiredcommunitymessagebylocation/${id}`);


    
    console.log("jfjfijefjekf", res.data);

    setcommunityrequireddetails(res.data);
  };
  const getreqassigntask = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/assigntask/getassigntask`
    );
    console.log("jfjfijefjekf", res);
    setassigntask(res.assigncount);
  };
  const getreqadmincount = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/auth/getadmins`
    );
    console.log("jfjfijefjekf", res);
    setadmin(res.adminCount);
  };
  const getrolesresponsibility = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/rolesresponsibilities/getRolesResponsibilities`
    );
    setrolesresponsibility(res.rolesResponsibilitiesCount);

    console.log(res.rolesResponsibilitiesCount);
  };

  const getcomdetails = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/communitymaster/getrequiredcommunitymessage`
    );
    setcommmsg(res.count);
  };
  const gettaskdetails = async () => {
    const res = await axios.get(
     ` ${process.env.REACT_APP_BASE_URL}/addtask/getalltask`
    );
    setaddtask(res.formTasksCount);
  };

  const getalldepartmenttye = async () => {
    const res = await GetallDepartmentTypefordashboard();
    setdeptype(res.data);
    console.log(">>dtype", res);
  };
  const gettingid = async (id) => {
    const res = await GetSpecificAddTaskByDeptId(id);
    console.log("number", res);

    settasklength(res.data.length);
  };
  const userID = localStorage.getItem("EmployeeNameID");
  let cleanedUserID = userID.trim().replace(/^["']+|["']+$/g, "");

  // console.log("AdminID", typeof userID);
  const getPinnedItem = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/pin/getPinnedItemsbyid/${cleanedUserID}`
    );
    console.log("pinneditems", res.data[0]);
    setresponse(res.data[0]);
  };
  useEffect(() => {
    getPinnedItem();
  }, [cleanedUserID]);
  // console.log(response.AddTask)
  const schema = {
    "Add Task": response?.AddTask,
    "Roles Responsibility": response?.RolesResponsibility,
    "Admin User": response?.AdminUser,
    "Assign Master": response?.AssignMaster,
    "Community Update Master": response?.CommunityUpdateMaster,
    Dashboard: response?.Dashboard,
    "Department Group": response?.DepartmentGroup,
    "Department Type": response?.DepartmentType,
    "Employee Role": response?.EmployeeRole,
    "Employee Master": response?.Employeemaster,
    "Location Master": response?.LocationMaster,
    "Menu Master": response?.MenuMaster,
  };
  const trueKeys = Object.keys(schema).filter((key) => schema[key]);
  const handleRedirect = (field) => {
    // You can customize the URL or route based on your needs
    console.log(field);
    if (field === "Dashboard") {
      navigate("/dashboard");
    }
    if (field === "AddTask") {
      navigate("/add-taskmaster");
    }
    if (field === "Assign Master") {
      navigate("/assign-master");
    }
    if (field === "Community Update Master") {
      navigate("/community-update");
    }
    if (field === "Department Group") {
      navigate("/department-group");
    }
    if (field === "Department Type") {
      navigate("/department-type");
    }
    if (field === "Employee Role") {
      navigate("/employee-roles");
    }
    if (field === "Employee Master") {
      navigate("/employee-master");
    }
    if (field === "Location Master") {
      navigate("/location-master");
    }
    if (field === "Menu Master") {
      navigate("/menumaster");
    }
    if (field === "Roles Responsibility") {
      navigate("/roles-responsibilty");
    }
    if (field === "Admin User") {
      navigate("/admin-user");
    }

    // Define route mappings for each field
    const routeMappings = {
      AddTask: "/add-task",
      AssignMaster: "/assign-master",
      CommunityUpdateMaster: "/community-update-master",
      // Dashboard: '/dashboard',
      DepartmentGroup: "/department-group",
      DepartmentType: "/department-type",
      EmployeeRole: "/employee-role",
      Employeemaster: "/employee-master",
      LocationMaster: "/location-master",
      MenuMaster: "/menu-master",
      // Add more mappings as needed
    };

    // Check if the field is true and has a corresponding route
    if (field && routeMappings[field]) {
      // Redirect to the corresponding route
      // console.log(Redirecting to `${routeMappings[field]});
      // Example using React Router's useNavigate hook
      // navigate(routeMappings[field]);
    } else {
      // Handle default case or display a message
      console.log("Invalid field or no valid route found for redirection");
      // Handle default case or display a message to the user
    }
  };
  useEffect(() => {
    console.log(">>>", deptype);
  }, [deptype]);
  useEffect(() => {
    getrolesresponsibility();
    getreqadmincount();
    getreqassigntask();
    getreqcommdetails();
    getcomdetails();
    gettaskdetails();
    getalldepartmenttye();
  }, []);

  // useEffect(() => {
  //   gettingid();
  // }, [id]);
  console.log(rolesresponsibilities);
  console.log(commsg);
  console.log(admin);
  console.log(assigntask);

  useEffect(() => {
    // Set a delay for the execution
    const timer = setTimeout(() => {
      getreqcommdetails();
    }); // Delay the execution for 5000 milliseconds (5 seconds)

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <div className="bg-white page-content">
        <Container fluid>
          <Row>
            <h5>
              <b>Dashboard</b>
            </h5>
            <br />
            <br />
            <Col md={4}>
              <div class="col-lg-12 col-lg-4">
                <Card
                  className="card-animate card-res"
                  style={{ borderRadius: "15px" }}
                >
                  <CardBody>
                    <div className="d-flex justify-content-between">
                      <div>
                        <p class="fw-semibold new-class fs-16 mb-0">Users</p>

                        <h2 className="mt-4 ff-secondary fw-semibold">
                          <span className="counter-value">
                            {rolesresponsibilities}
                          </span>
                        </h2>
                      </div>
                      <div>
                        <div className="avatar-sm flex-shrink-0">
                          <span className="avatar-title bg-soft-info rounded-circle fs-2">
                            <FeatherIcon icon="users" className="text-info" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </Col>

            <Col md={4}>
              <div class="col-lg-12 col-lg-4">
                <Card
                  className="card-animate card-custom card-res"
                  style={{ borderRadius: "15px" }}
                >
                  <CardBody>
                    <div className="d-flex justify-content-between">
                      <div>
                        <p class="fw-semibold new-class fs-16 mb-0">
                          No. of Document
                        </p>
                        <h2 className="mt-4 ff-secondary fw-semibold">
                          <span className="counter-value">
                            {commsg + admin + assigntask}
                          </span>
                        </h2>
                      </div>
                      <div>
                        <div className="avatar-sm flex-shrink-0">
                          <span className="avatar-title bg-soft-info rounded-circle fs-2">
                            <FeatherIcon icon="users" className="text-info" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </Col>
            <Col md={4}>
              <Card
                className="card-animate card-res"
                style={{ borderRadius: "15px" }}
              >
                <CardBody>
                  <div className="d-flex justify-content-between">
                    <div>
                      <p class="fw-semibold new-class fs-16 mb-0">
                        No. of Form
                      </p>
                      <h2 className="mt-4 ff-secondary fw-semibold">
                        <span className="counter-value">{addtask}</span>
                      </h2>
                    </div>
                    <div>
                      <div className="avatar-sm flex-shrink-0">
                        <span className="avatar-title bg-soft-info rounded-circle fs-2">
                          <FeatherIcon icon="file-text" className="text-info" />
                        </span>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

         <Row>
            <Col lg={4}>
              <div style={{ display: "flex" }}>
                <div>
                  <img
                    src={
                      "https://portfolio.barodaweb.com/Dev/OpaSystem.com/L1/assets/images/pin.png"
                    }
                    style={{
                      width: "50px",
                      marginRight: "10px",
                    }}
                  />
                </div>
                <div style={{ fontSize: "22px", marginTop: "10px" }}>
                  Pinned Items
                </div>
              </div>
            </Col>
        </Row>
          
          <Row>
            {trueKeys.map((field) => (
              <Col key={field} sm={3} onClick={() => handleRedirect(field)}>
                <Card
                  className="card-animate card-custom card-res"
                  style={{ borderRadius: "15px" }}
                >
                  <CardBody>
                    <div className="d-flex justify-content-between">
                      <div>
                        <p
                          className="fw-semibold new-class fs-16 mb-0"
                          style={{ textAlign: "center" }}
                        >
                          {field}
                        </p>
                      </div>
                      
                    </div>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
          {/* vaishal */}

          {/* <Row>
            {deptype && deptype.length>0 && deptype.map((type, index) => (


              <Col md={4} key={index}>
                <Link to={/subdashboard/${type._id}}>
                  <Card
                    className="card-animate card-res"
                    style={{ borderRadius: "15px" }}
                  >
                    <CardBody>
                      <div className="d-flex justify-content-between">
                        <div>
                          <p class="fw-semibold new-class fs-16 mb-0">
                            {type.name}
                          </p>

                          
                          <h2
                            className="mt-1 ff-secondary fs-14"
                            style={{ fontWeight: "bold" }}
                          >
                            SOPs
                          </h2>
                          <h2
                            className="mt-1 ff-secondary fs-14"
                            style={{ fontWeight: "bold" }}
                          >
                            
                          </h2>
                        </div>
                        <div>
                          <div className="avatar-sm flex-shrink-0">
                            <span className="avatar-title bg-soft-info rounded-circle fs-2">
                              <FeatherIcon
                                icon="file-text"
                                className="text-info"
                              />
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row> */}

          <Row>
            {deptype &&
              deptype.length > 0 &&
              deptype.map((type, index) => {
                {
                  /* gettingid(type._id); // Assuming you want to fetch data for each item */
                }
                return (
                  <Col md={4} key={index}>
                    <Link to={`/subdashboard/${type.departmentType._id}`}>
                      <Card
                        className="card-animate card-res"
                        style={{ borderRadius: "15px" }}
                      >
                        <CardBody>
                          <div className="d-flex justify-content-between">
                            <div>
                              <p className="fw-semibold new-class fs-16 mb-0">
                                {type.departmentType.name}
                              </p>
                              <br />
                              <br />
                              <h2 className="mt-1 ff-secondary fs-14 myClass">
                                {type.taskLength}
                              </h2>
                              <h2
                                className="mt-1 ff-secondary fs-14"
                                style={{ fontWeight: "bold" }}
                              >
                                {/* {type.taskLength} */}
                              </h2>
                              <h2
                                className="mt-1 ff-secondary fs-14"
                                style={{ fontWeight: "bold" }}
                              >
                                {/* Task Length: {tasklength} */}
                              </h2>
                            </div>
                            <div>
                              <div className="avatar-sm flex-shrink-0">
                                <span className="avatar-title bg-soft-info rounded-circle fs-2">
                                  <FeatherIcon
                                    icon="file-text"
                                    className="text-info"
                                  />
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    </Link>
                  </Col>
                );
              })}
          </Row>

          <Col lg={12}>
            <Card>
              <CardBody>
                <h4 className="mb-4">Business Community Updates</h4>
                <hr />
                <Swiper
                  slidesPerView={1}
                  spaceBetween={10}
                  pagination={{
                    el: ".swiper-pagination",
                    clickable: true,
                  }}
                  breakpoints={{
                    640: {
                      slidesPerView: 2,
                      spaceBetween: 20,
                    },
                    768: {
                      slidesPerView: 3,
                      spaceBetween: 40,
                    },
                    1024: {
                      slidesPerView: 4,
                      spaceBetween: 50,
                    },
                  }}
                  loop={true}
                  modules={[Pagination]}
                  className="mySwiper swiper responsive-swiper rounded gallery-light pb-5"
                >
                  <div className="swiper-wrapper">
                    <div className="swiper-wrapper">
                      {communityrequireddetails &&
                      communityrequireddetails.length > 0 ? (
                        communityrequireddetails.map((detail, index) => (
                          <SwiperSlide key={index}>
                            <div className="gallery-box card">
                              <div className="gallery-container">
                                <Link
                                  className="image-popup"
                                  title={detail.name}
                                >
                                  <img
                                    className="gallery-img img-fluid mx-auto"
                                    src={`${process.env.REACT_APP_BASE_URL}/${detail.uploadimage}`} // Adjust accordingly if using base64 strings
                                    alt={detail.name}
                                    style={{
                                      height: "305px",
                                      width: "208.5px",
                                    }}
                                  />
                                  <div className="gallery-overlay">
                                    <h5 className="overlay-caption">
                                      {/* Assuming you want to display all locations for this detail */}
                                      {detail.locationSchema
                                        .map((location) => location.name)
                                        .join(", ")}
                                      <br />
                                      10:00 - 6:00{" "}
                                      {/* Static time, replace if dynamic */}
                                    </h5>
                                  </div>
                                </Link>
                              </div>
                              <div className="box-content">
                                <div className="d-flex align-items-center mt-1">
                                  <h5 className="m-1">{detail.name}</h5>
                                </div>
                                <p className="m-1">{detail.message}</p>
                              </div>
                            </div>
                          </SwiperSlide>
                        ))
                      ) : (
                        <p>No community updates to display</p>
                      )}
                    </div>
                  </div>
                  <div className="swiper-pagination swiper-pagination-dark"></div>
                </Swiper>
              </CardBody>
            </Card>
          </Col>
        </Container>
      </div>
    </>
  );
};

export default NewDashboard;