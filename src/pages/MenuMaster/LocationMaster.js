import React,{useEffect,useState,useContext}from "react";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import UiContent from "../../Components/Common/UiContent";
import PreviewCardHeader from "../../Components/Common/PreviewCardHeader";
import { Link } from "react-router-dom";
import logo from "../../assets/images/brands/slack.png";
import SignContext from "../../contextAPI/Context/SignContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import SearchComponent from "../../common/SearchComponent";
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
const LocationMaster = () => {
  const navigate=useNavigate();
  const {GetallLocation,DeleteLocation}=useContext(SignContext);
  const [loc, setLoc] = useState([]);
  const [pagloc,setpageloc]=useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Update to display 10 records per page
  const [totalPages, setTotalPages] = useState(1);
  // const[loc,setloc]=useState("")
  const getlocation=async()=>{
       const res=await GetallLocation();

       setLoc(res.data);
  }
  const handleDelete=async(id)=>{
    const abc=window.confirm("Are you sure you want to delete");
    if(abc){
    const res1=await DeleteLocation(id);
    getlocation();
    }

    
  }
  const handleEdit=async(id)=>{
      
    navigate(`/edit-location/${id}`)
    
  }

  useEffect(()=>{
         getlocation();
  },[])
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = loc.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
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
                  <PreviewCardHeader title="Location Detail" />
                  <div className="mt-3 mb-2">
                    {/* <Link to="/add-location">
                      <button
                        className="btn btn-primary"
                        type="submit"
                        style={{ marginRight: "9px" }}
                      >
                        Add Location
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

                            <th scope="col">Location Name</th>
                            
                            <th scope="col">Status</th>
                            <th scope="col">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {loc &&
                            loc.length > 0 &&
                            loc.map((type, index) => {
                              return (
                                <tr key={type._id}>
                                  <td>{index+1}</td>
                                  
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
                                          // onClick={()=>handleEdit(type._id)}
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
                    <nav>
                      <ul className="pagination">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                          <button
                            className="page-link"
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                          >
                            Previous
                          </button>
                        </li>
                        {Array.from({ length: totalPages }, (_, i) => (
                          <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => paginate(i + 1)}>{i + 1}</button>
                          </li>
                        ))}
                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                          <button
                            className="page-link"
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === totalPages}
                          >
                            Next
                          </button>
                        </li>
                      </ul>
                    </nav>
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

export default LocationMaster;

