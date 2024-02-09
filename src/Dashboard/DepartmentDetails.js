import React, { useState, useEffect } from "react";
import { Card, CardBody } from "reactstrap";
import axios from "axios";
import FeatherIcon from "feather-icons-react";

const SubDashboard = () => {
  document.title = "Dashboard";
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks from the server (replace with your API endpoint)
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/addtask/getalltask`);
        setTasks(response.data.data); // Access 'data' property from the API response
      } catch (error) {
        console.error("Error fetching tasks:", error.message);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div>
      {tasks.map((task) => (
        <Card key={task._id} className="card-animate">
          <CardBody>
            <div className="d-flex justify-content-between">
              <div>
                <h5 className="fw-medium text-muted mb-0">{task.taskType}</h5>
                <h2 className="mt-4 ff-secondary fw-semibold">{task.taskName}</h2>
                <p>{task.detail}</p>
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
      ))}
    </div>
  );
};

export default SubDashboard;
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
