// // import React, { useState, useEffect } from "react";
// // import { Card, CardBody } from "reactstrap";
// // import axios from "axios";
// // import FeatherIcon from "feather-icons-react";

// // const SubDashboard = () => {
// //   document.title = "Dashboard";
// //   const [tasks, setTasks] = useState([]);

// //   useEffect(() => {
// //     // Fetch tasks from the server (replace with your API endpoint)
// //     const fetchTasks = async () => {
// //       try {
// //         const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/addtask/getalltask`);
// //         setTasks(response.data.data); // Access 'data' property from the API response
// //       } catch (error) {
// //         console.error("Error fetching tasks:", error.message);
// //       }
// //     };

// //     fetchTasks();
// //   }, []);

// //   return (
// //     <div>
// //       {tasks.map((task) => (
// //         <Card key={task._id} className="card-animate">
// //           <CardBody>
// //             <div className="d-flex justify-content-between">
// //               <div>
// //                 <h5 className="fw-medium text-muted mb-0">{task.taskType}</h5>
// //                 <h2 className="mt-4 ff-secondary fw-semibold">{task.taskName}</h2>
// //                 <p>{task.detail}</p>
// //               </div>
// //               <div>
// //                 <div className="avatar-sm flex-shrink-0">
// //                   <span className="avatar-title bg-soft-info rounded-circle fs-2">
// //                     <FeatherIcon icon="file-text" className="text-info" />
// //                   </span>
// //                 </div>
// //               </div>
// //             </div>
// //           </CardBody>
// //         </Card>
// //       ))}
// //     </div>
// //   );
// // };

// // export default SubDashboard;
// import React, { useState, useEffect } from "react";
// import { Card, CardBody, Col, Container, Row } from "reactstrap";
// import axios from "axios";
// import FeatherIcon from "feather-icons-react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import CountUp from "react-countup";
// import { Link } from "react-router-dom";

// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import "swiper/css/scrollbar";
// import "swiper/css/effect-fade";
// import "swiper/css/effect-flip";

// const SubDashboard = () => {
//   document.title = "Dashboard";

  

//   return (
//     <div className="page-content">
//       <Container fluid>
//         <Row>
//           <Col md={4}>
            
//           </Col>
//           {/* Add similar cards for 'No. Document' and 'No. Form' here */}
//         </Row>

//         <Col lg={12}>
          
//         </Col>

//         <Row>
//           {/* Display only the bottom cards of different departments */}
//           <Col md={4}>
//             <Card className="card-animate">
//               <CardBody>
//                 <div className="d-flex justify-content-between">
//                   <div>
//                     <h5 className="fw-medium text-muted mb-0">MIS</h5>
//                     <h2 className="mt-4 ff-secondary fw-semibold">400</h2>
                    
//                   </div>
//                   <div>
//                     <div className="avatar-sm flex-shrink-0">
//                       <span className="avatar-title bg-soft-info rounded-circle fs-2">
//                         <FeatherIcon icon="file-text" className="text-info" />
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </CardBody>
//             </Card>
//           </Col>
//           <Col md={4}>
//             <Card className="card-animate">
//               <CardBody>
//                 <div className="d-flex justify-content-between">
//                   <div>
//                     <h5 className="fw-medium text-muted mb-0">SOP</h5>
//                     <h2 className="mt-4 ff-secondary fw-semibold">400</h2>
                    
//                   </div>
//                   <div>
//                     <div className="avatar-sm flex-shrink-0">
//                       <span className="avatar-title bg-soft-info rounded-circle fs-2">
//                         <FeatherIcon icon="file-text" className="text-info" />
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </CardBody>
//             </Card>
//           </Col>
        
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default SubDashboard;
// import React, { useState, useEffect } from "react";
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
// import "../Dashboard/dashboard.css"
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

// const SubDashboard = () => {
//   document.title = "Dashboard";
//   const [tasks, setTasks] = useState([]);

//   useEffect(() => {
//     // Fetch tasks from the server (replace with your API endpoint)
//     const fetchTasks = async () => {
//       try {
//         const response = await axios.get(${process.env.REACT_APP_BASE_URL}/addtask/getalltask);
//         setTasks(response.data); // Access 'data' property from the API response
//       } catch (error) {
//         console.error("Error fetching tasks:", error.message);
//       }
//     };

//     fetchTasks();
//   }, []);

//   return (
//     <div className="bg-white page-content">
//       <Container fluid>

//       {tasks.map((task,index) => (
//         <Card key={task._id} className="card-animate"
//         style={{ display: "inline-block",  paddingTop: "110px",marginBottom: "20px",marginRight: index < tasks.length - 1 ? "20px" : "0",width:"300px"}}>
//           <CardBody>
//             <div className="d-flex justify-content-between">
//               <div>
//                 <h5 className="fw-medium text-muted mb-0">{task.taskType}</h5>
//                 <h2 className="mt-4 ff-secondary fw-semibold">{task.taskName}</h2>
//                 <p>{task.detail}</p>
//               </div>
//               <div>
//                 <div className="avatar-sm flex-shrink-0">
//                   <span className="avatar-title bg-soft-info rounded-circle fs-2">
//                     <FeatherIcon icon="file-text" className="text-info" />
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </CardBody>
//         </Card>
//       ))}
      

          
//         </Container>
//     </div>
//   );
// };

// export default SubDashboard;
import React, { useState, useEffect } from "react";
import {Row,Col, Card, CardBody, Container } from "reactstrap";
import axios from "axios";
import FeatherIcon from "feather-icons-react";

const SubDashboard = () => {
  document.title = "Dashboard";
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/addtask/getalltask`);
        setTasks(response.data);
      } catch (error) {
        // console.error("Error fetching tasks:", error.message);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="bg-white page-content">
    
      <Container fluid>
      <Row>
      <div className="d-flex flex-wrap justify-content-between">

{tasks.map((task, index) => (
  <Col md={4} key={task._id} className="px-2">
    <div class="col-lg-12 col-lg-4">
    <Card
  className="card-animate card-res" style={{borderRadius:'15px'}}
  >
    <CardBody>
      <div className="d-flex justify-content-between">
        <div>
          <h5 className="fw-semibold new-class fs-16 mb-0">{task.taskType}</h5>
          <h2 className="mt-4 ff-secondary fw-semibold">{task.taskName}</h2>
          <p>{task.detail}</p>
        </div>
        <div className="avatar-sm flex-shrink-0">
          <span className="avatar-title bg-soft-info rounded-circle fs-2">
            <FeatherIcon icon="file-text" className="text-info" />
          </span>
        </div>
      </div>
    </CardBody>
  </Card>
    </div>
    </Col>

))}
</div>
      </Row>
      
      </Container>
    </div>
  );
};

export default SubDashboard;