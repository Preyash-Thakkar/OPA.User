import React, { useContext, useState, useEffect } from "react";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import UiContent from "../../Components/Common/UiContent";
import PreviewCardHeader from "../../Components/Common/PreviewCardHeader";
import { Link } from "react-router-dom";
import logo from "../../assets/images/brands/slack.png";
import SignContext from "../../contextAPI/Context/SignContext";
import { useNavigate } from 'react-router-dom';

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

const DepartmentGroup = () => {
  const { GetallDepartmentGroup ,deletegrp } = useContext(SignContext);
  const [depgroup, setDepgroup] = useState(null);
  // const [itemsPerPage] = useState(3);
  const navigate=useNavigate();
  const getdepgroup = async () => {
    const response = await GetallDepartmentGroup();
    console.log(">>>");
    console.log(response.data);
    setDepgroup(response.data);
  };

  


  const handleDelete=async (abc)=>{
     const abc1= window.confirm("Are you sure you want to delete?");
     if(abc1){  
     const res=await deletegrp(abc);
     getdepgroup();
     }

  }
  const handleEdit=(id)=>{
      console.log("edit>>>",id);

      navigate(`/edit_dggroup/${id}`);
  }
  useEffect(() => {
    getdepgroup();
  }, []);
  
  return (
    <>
      <UiContent />
      <div className="page-content">
        <Container fluid={true}>
          <BreadCrumb title="Form Validation" pageTitle="Forms" />

          <Row>
            <Col xl={12}>
              <Card>
                <div className="d-flex flex-wrap justify-content-between align-items-center">
                  <PreviewCardHeader title="Depatment Group" />
                  <div className="mt-3 mb-2">
                    {/* <Link to="/add-dgroup">
                      <button
                        className="btn btn-primary"
                        type="submit"
                        style={{ marginRight: "9px" }}
                      >
                        Add Department Group
                      </button>
                    </Link> */}
                  </div>
                </div>
                <CardBody>
                  <div className="live-preview">
                    <div className="table-responsive">
                      <Table className="align-middle table-nowrap mb-0">
                        <thead className="table-light">
                          <tr>
                            <th scope="col">ID</th>

                            <th scope="col">Department Group Name</th>

                            <th scope="col">Status</th>
                            <th scope="col">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {depgroup &&
                            depgroup.length > 0 &&
                            depgroup.map((type, index) => {
                              return (
                                <tr key={type._id}>
                                  <td>DG:{index+1}</td>
                                  <td>{type.name}</td>
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
                                          // onClick={() => handleEdit(type._id)}
                                        >
                                          <i className="ri-pencil-fill"></i>
                                        </button>
                                      </div>
                                      <div className="flex-grow-1">
                                        <button
                                          type="button"
                                          className="btn btn-danger btn-icon waves-effect waves-light"
                                          // onClick={() => handleDelete(type._id)}
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

export default DepartmentGroup;
