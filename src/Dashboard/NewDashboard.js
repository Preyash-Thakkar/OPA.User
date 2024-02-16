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

  //const { id } = useParams();
  const [communityrequireddetails, setcommunityrequireddetails] =
    useState(null);
  const getreqcommdetails = async () => {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/communitymaster/getrequiredcommunitymessage`);
    console.log("jfjfijefjekf", res);
    setcommunityrequireddetails(res.data);
  };

  useEffect(() => {
    // Set a delay for the execution
    const timer = setTimeout(() => {
      getreqcommdetails();
    }, 5000); // Delay the execution for 5000 milliseconds (5 seconds)

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col md={4}>
              <Card className="card-animate">
                <CardBody>
                  <div className="d-flex justify-content-between">
                    <div>
                      <p className="fw-medium text-muted mb-0">Users</p>
                      <h2 className="mt-4 ff-secondary fw-semibold">
                        <span className="counter-value">
                          <CountUp
                            start={0}
                            end={28.05}
                            decimals={1}
                            duration={4}
                          />
                          2
                        </span>
                        k
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
            </Col>
            <Col md={4}>
              <Card className="card-animate">
                <CardBody>
                  <div className="d-flex justify-content-between">
                    <div>
                      <p className="fw-medium text-muted mb-0">No. Document</p>
                      <h2 className="mt-4 ff-secondary fw-semibold">
                        <span className="counter-value">
                          <CountUp
                            start={0}
                            end={2}
                            decimals={1}
                            duration={4}
                          />
                          0
                        </span>
                        k
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
            </Col>
            <Col md={4}>
              <Card className="card-animate">
                <CardBody>
                  <div className="d-flex justify-content-between">
                    <div>
                      <p className="fw-medium text-muted mb-0">No. Form</p>
                      <h2 className="mt-4 ff-secondary fw-semibold">
                        <span className="counter-value">
                          <CountUp
                            start={0}
                            end={100}
                            decimals={1}
                            duration={4}
                          />
                          0
                        </span>
                        k
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
            </Col>
          </Row>
          <Row>
            <Col md={4}>
            <Link to="/subdashboard">
              <Card className="card-animate">
                <CardBody>
                  <div className="d-flex justify-content-between">
                    <div>
                      <h5 className="fw-medium text-muted mb-0">
                        Finance Department
                      </h5>
                      <p className="mt-4 ff-secondary fw-semibold">MIS</p>
                      <p className="mt-4 ff-secondary fw-semibold">SOP</p>
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
              <Card className="card-animate">
                <CardBody>
                  <div className="d-flex justify-content-between">
                    <div>
                      <h5 className="fw-medium text-muted mb-0">
                        Commercial Department
                      </h5>
                      <p className="mt-4 ff-secondary fw-semibold">
                        Buisness Plan
                      </p>
                      <p className="mt-4 ff-secondary fw-semibold">MIS</p>
                      <p className="mt-4 ff-secondary fw-semibold">SOP</p>
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
              <Card className="card-animate">
                <CardBody>
                  <div className="d-flex justify-content-between">
                    <div>
                      <h5 className="fw-medium text-muted mb-0">
                        Treasury Department
                      </h5>
                      <p className="mt-4 ff-secondary fw-semibold">
                        Buisness Plan
                      </p>
                      <p className="mt-4 ff-secondary fw-semibold">MIS</p>
                      <p className="mt-4 ff-secondary fw-semibold">SOP</p>
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
              <Card className="card-animate">
                <CardBody>
                  <div className="d-flex justify-content-between">
                    <div>
                      <h5 className="fw-medium text-muted mb-0">
                        Finance Department
                      </h5>
                      <p className="mt-4 ff-secondary fw-semibold">MIS</p>
                      <p className="mt-4 ff-secondary fw-semibold">SOP</p>
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
              <Card className="card-animate">
                <CardBody>
                  <div className="d-flex justify-content-between">
                    <div>
                      <h5 className="fw-medium text-muted mb-0">
                        Commercial Department
                      </h5>
                      <p className="mt-4 ff-secondary fw-semibold">
                        Buisness Plan
                      </p>
                      <p className="mt-4 ff-secondary fw-semibold">MIS</p>
                      <p className="mt-4 ff-secondary fw-semibold">SOP</p>
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
              <Card className="card-animate">
                <CardBody>
                  <div className="d-flex justify-content-between">
                    <div>
                      <h5 className="fw-medium text-muted mb-0">
                        Treasury Department
                      </h5>
                      <p className="mt-4 ff-secondary fw-semibold">
                        Buisness Plan
                      </p>
                      <p className="mt-4 ff-secondary fw-semibold">MIS</p>
                      <p className="mt-4 ff-secondary fw-semibold">SOP</p>
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
                height="305px"
                width="208.5px"
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