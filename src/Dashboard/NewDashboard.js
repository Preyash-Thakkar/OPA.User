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
import "../Dashboard/dashboard.css"
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

const NewDashboard = () => {
  document.title = "Dashboard";
  //const getReqCommDetails = useContext(SignContext)

 const id = localStorage.getItem("LocationID");
  // const { id } = useParams();
  const [communityrequireddetails, setcommunityrequireddetails] =
    useState(null);
 
    const[rolesresponsibilities,setrolesresponsibility]=useState(null);
    const[admin,setadmin]=useState(null);
    const[addtask,setaddtask]=useState(null);
    const[assigntask,setassigntask]=useState(null);
    const[commsg,setcommmsg]=useState(null);

  const getreqcommdetails = async () => {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/communitymaster/getrequiredcommunitymessagebylocation/${id}`);
    console.log("jfjfijefjekf", res);
    setcommunityrequireddetails(res.data);
  };
  const getreqassigntask = async () => {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/assigntask/getassigntask`);
    console.log("jfjfijefjekf", res);
    setassigntask(res.assigncount)
  };
  const getreqadmincount = async () => {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/auth/getadmins`);
    console.log("jfjfijefjekf", res);
    setadmin(res.adminCount)
  };
  const getrolesresponsibility=async()=>{
    const res=await axios.get(`${process.env.REACT_APP_BASE_URL}/rolesresponsibilities/getRolesResponsibilities`)
    setrolesresponsibility(res.rolesResponsibilitiesCount);
console.log(res.rolesResponsibilitiesCount);
  }

  const getcomdetails=async()=>{
    const res=await axios.get(`${process.env.REACT_APP_BASE_URL}/communitymaster/getrequiredcommunitymessage`)
setcommmsg(res.count);


  }
  const gettaskdetails=async()=>{
    const res=await axios.get(`${process.env.REACT_APP_BASE_URL}/addtask/getalltask`)
setaddtask(res.formTasksCount);


  }
  useEffect(()=>{
    getrolesresponsibility();
    getreqadmincount();
    getreqassigntask();
    getreqcommdetails();
    getcomdetails();
    gettaskdetails();
  },[])



  useEffect(() => {
    // Set a delay for the execution
    const timer = setTimeout(() => {
      getreqcommdetails();
    }, []); // Delay the execution for 5000 milliseconds (5 seconds)

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <div className="bg-white page-content">
        <Container fluid>
          <Row>
            <h5><b>Dashboard</b></h5>
            <br />
            <br />
            <Col md={4} >
            <div class="col-lg-12 col-lg-4">
              <Card className="card-animate card-res" style={{borderRadius:'15px'}}>
                <CardBody>
                  <div className="d-flex justify-content-between">
                    <div>
                    <p class="fw-semibold new-class fs-16 mb-0">
                        Users
                      </p>
                      
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
            <Card className="card-animate card-custom card-res"  style={{borderRadius:'15px'}}>
          
                <CardBody>
                  <div className="d-flex justify-content-between">
                    <div>
                    <p class="fw-semibold new-class fs-16 mb-0">No. of Document</p>
                      <h2 className="mt-4 ff-secondary fw-semibold">
                        <span className="counter-value">
                          {commsg+admin+assigntask}
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
            <Card className="card-animate card-res" style={{borderRadius:'15px'}}>
                <CardBody>
                  <div className="d-flex justify-content-between">
                    <div>
                    <p class="fw-semibold new-class fs-16 mb-0">No. of Form</p>
                      <h2 className="mt-4 ff-secondary fw-semibold">
                        <span className="counter-value">
                          {addtask}
                        </span>
                        
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
            <Col md={4}>
            <Link to="/subdashboard">
            <Card className="card-animate card-res" style={{borderRadius:'15px'}}>
                <CardBody>
                  <div className="d-flex justify-content-between">
                    <div>
                    <p class="fw-semibold new-class fs-16 mb-0">
                        Finance Department
                  </p>
                      <h2 className="mt-4 ff-secondary fs-14" style={{ fontWeight: "bold" }}>MIS</h2>
                      <h2 className="mt-1 ff-secondary fs-14" style={{ fontWeight: "bold" }}>SOPs</h2>
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
              </Link>
            </Col>
            <Col md={4}>
            <Link to="/subdashboard">
            <Card className="card-animate card-res card-hover" style={{borderRadius:'15px'}}>
                <CardBody>
                  <div className="d-flex justify-content-between">
                    <div>
                    <p class="fw-semibold new-class fs-16 mb-0">
                        Commercial Department
                      </p>
                      <h2 className="mt-4 ff-secondary fs-14" style={{ fontWeight: "bold" }}>
                        Business Plan
                      </h2>
                      <h2 className="mt-2 ff-secondary fs-14" style={{ fontWeight: "bold" }}>MIS</h2>
                        <h2 className="mt-1 ff-secondary fs-14" style={{ fontWeight: "bold" }}>SOPs</h2>
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
              </Link>
            </Col>
            <Col md={4}>
            <Link to="/subdashboard">
            <Card className="card-animate card-res" style={{borderRadius:'15px'}}>
                <CardBody>
                  <div className="d-flex justify-content-between">
                    <div>
                    <p class="fw-semibold new-class fs-16 mb-0">
                        Treasury Department
                 </p>
                
                      <h2 className="mt-4 ff-secondary fs-14" style={{ fontWeight: "bold" }}>MIS</h2>
                      <h2 className="mt-1 ff-secondary fs-14" style={{ fontWeight: "bold" }}>SOPs</h2>
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
              </Link>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
            <Link to="/subdashboard">
            <div class="col-lg-12 col-lg-4">
            <Card className="card-animate card-res" style={{borderRadius:'15px'}}>
                <CardBody>

                  <div className="d-flex justify-content-between">
                    <div>
                    <p class="fw-semibold new-class fs-16 mb-0">
                        Compliance Department
                      </p>
                      <h2 class="mt-4 ff-secondary fs-14" style={{ fontWeight: "bold" }}>MIS</h2>
<h2 class="mt-1 ff-secondary fs-14" style={{ fontWeight: "bold" }}>SOPs</h2>

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
              </div>
              </Link>
            </Col>
            <Col md={4}>
            <Link to="/subdashboard">
            <Card className="card-animate card-res" style={{borderRadius:'15px'}}>
                <CardBody>
                  <div className="d-flex justify-content-between">
                    <div>
                    <p class="fw-semibold new-class fs-16 mb-0">
                        Technology Department
                      </p>
                      <h2 className="mt-4 ff-secondary fs-14" style={{ fontWeight: "bold" }}>IT requests </h2>
                      <h2 className="mt-2 ff-secondary fs-14" style={{ fontWeight: "bold" }}>Inventory</h2>
                      <h2 className="mt-1 ff-secondary fs-14" style={{ fontWeight: "bold" }}>SOPs</h2>
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
              </Link>
            </Col>
            <Col md={4}>
            <Link to="/subdashboard">
            <Card className="card-animate card-res" style={{borderRadius:'15px'}}>
                <CardBody>
                  <div className="d-flex justify-content-between">
                    <div>
                    <p class="fw-semibold new-class fs-16 mb-0">
                        Data Analytics Department
                      </p>
                      <h2 className="mt-4 ff-secondary fs-14" style={{ fontWeight: "bold" }}>
                        New Dashboard Request
                      </h2>
                      <h2 className="mt-2 ff-secondary fs-14" style={{ fontWeight: "bold" }}>Item Master Creation</h2>

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
              </Link>
            </Col>
          </Row>

          <Col lg={12}>
            <Card>
              <CardBody>
              <h4 className="mb-4">Business Community Updates</h4>
              <hr/>
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
  {communityrequireddetails && communityrequireddetails.length > 0 ? (
    communityrequireddetails.map((detail, index) => (
      <SwiperSlide key={index}>
        <div className="gallery-box card">
          <div className="gallery-container">
            <Link className="image-popup" title={detail.name}>
              <img
                className="gallery-img img-fluid mx-auto"
                src={`${process.env.REACT_APP_BASE_URL}/${detail.uploadimage}`} // Adjust accordingly if using base64 strings
                alt={detail.name}
                style={{ height: "305px", width: "208.5px" }}
              />
              <div className="gallery-overlay">
                <h5 className="overlay-caption">
                  {/* Assuming you want to display all locations for this detail */}
                  {detail.locationSchema.map(location => location.name).join(', ')}
                  <br />
                  10:00 - 6:00 {/* Static time, replace if dynamic */}
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