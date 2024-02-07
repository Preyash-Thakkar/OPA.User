import React, { useState, useEffect, useContext } from "react";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import UiContent from "../../Components/Common/UiContent";
import PreviewCardHeader from "../../Components/Common/PreviewCardHeader";
import { Link } from "react-router-dom";
import logo from "../../assets/images/brands/slack.png";

import { useNavigate } from "react-router-dom";
import SignContext from "../../contextAPI/Context/SignContext";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Input,
  Label,
  Table,
  Container,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";

const baseURL = "http://localhost:5002";

const CommunityUpdateMaster = () => {
  const navigate = useNavigate();
  console.log("SingContext working : ", SignContext);
  const { getReqCommDetails, DeleteCommunityMaster } = useContext(SignContext);
  console.log("useContext : ", getReqCommDetails, DeleteCommunityMaster);
  // console.log("test1,", getReqCommDetails);

  const [communityrequireddetails, setcommunityrequireddetails] =
    useState(null);
  const getreqcommdetails = async () => {
    const res = await getReqCommDetails();
    console.log("jfjfijefjekf", res);
    setcommunityrequireddetails(res.data);
  };
  console.log(">>>", communityrequireddetails);

  const handleDelete = async (id) => {
    console.log(id);
    const abc = window.confirm("Are you sure you want to delete");
    if (abc) {
      const res = await DeleteCommunityMaster(id);
      console.log("The id isss", id);
      getreqcommdetails();
    }

    console.log(">>", id);
  };
  const handleEdit = async (id) => {
    console.log(">>>>>", id);
    navigate(`/edit-communitymaster/${id}`);
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
      <UiContent />
      <div className="page-content">
        <Container fluid={true}>
          <BreadCrumb title="Form Validation" pageTitle="Forms" />

          <Row>
            <Col xl={14}>
              <Card>
                <div className="d-flex flex-wrap justify-content-between align-items-center">
                  <PreviewCardHeader title="Community Update Detail" />
                  <div className="mt-3 mb-2">
                    <Link to="/add-community">
                      <button
                        className="btn btn-primary"
                        type="submit"
                        style={{ marginRight: "9px" }}
                      >
                        Add Community Update
                      </button>
                    </Link>
                  </div>
                </div>
                <CardBody>
                  <div className="live-preview">
                    <div className="table-responsive">
                      <Table className="align-middle table-nowrap mb-0">
                        <thead className="table-light">
                          <tr>
                            <th scope="col">ID</th>

                            <th scope="col" width="12px">
                              Uploaded Images
                            </th>
                            <th scope="col" width="20px">
                              Community Title
                            </th>
                            <th scope="col">Community Message</th>
                            <th scope="col">Status</th>
                            <th scope="col">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {communityrequireddetails &&
                            communityrequireddetails.length > 0 &&
                            communityrequireddetails.map((type, index) => {
                              return (
                                <tr key={type._id}>
                                  <td>{index + 1}</td>
                                  <td>
                                    {type.uploadimage ? (
                                      <img
                                        src={`${baseURL}/${type.uploadimage}`}
                                        alt="Admin"
                                        style={{
                                          height: "50px",
                                          width: "50px",
                                        }}
                                      />
                                    ) : (
                                      "No Image"
                                    )}
                                  </td>
                                  <td>{type.name}</td>
                                  <td>{type.message}</td>
                                  <td>
                                    {type.isActive ? (
                                      <span className="badge bg-success">
                                        Active
                                      </span>
                                    ) : (
                                      <span className="badge bg-danger">
                                        InActive
                                      </span>
                                    )}
                                  </td>
                                  <td>
                                    <div className="d-flex gap-2 align-items-center">
                                      <div className="flex-shrink-0">
                                        <button
                                          type="button"
                                          className="btn btn-success btn-icon waves-effect waves-light"
                                          onClick={() => handleEdit(type._id)}
                                        >
                                          <i className="ri-pencil-fill"></i>
                                        </button>
                                      </div>
                                      <div className="flex-grow-1">
                                        <button
                                          type="button"
                                          className="btn btn-danger btn-icon waves-effect waves-light"
                                          onClick={() => handleDelete(type._id)}
                                        >
                                          <i className="ri-delete-bin-5-line"></i>
                                        </button>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default CommunityUpdateMaster;
