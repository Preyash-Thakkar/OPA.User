import React,{useEffect,useState,useContext}from "react";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import UiContent from "../../Components/Common/UiContent";
import PreviewCardHeader from "../../Components/Common/PreviewCardHeader";
import { Link } from "react-router-dom";
import logo from "../../assets/images/brands/slack.png";
import SignContext from "../../contextAPI/Context/SignContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import DeleteModal from "../../common/DeleteModal";
import SearchComponent from "../../common/SearchComponent";
import axios from "axios";
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
  const {GetallLocation,DeleteLocation,GetLocationById}=useContext(SignContext);
  const [loc, setLoc] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [pagloc,setpageloc]=useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedForUpdate, setselectedForUpdate] = useState(null);
  const [itemsPerPage] = useState(5); // Update to display 10 records per page
  const [isDeletebuttonLoading, setIsDeletebuttonLoading] = useState(false);
  const [originalLocation, setOriginalLocation] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [pinnedItems, setPinnedItems] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  // const[loc,setloc]=useState("")
  const id=localStorage.getItem("LocationID")

  const getlocation=async()=>{
       const res=await GetLocationById(id);

       setLoc(res.data);
       setOriginalLocation(res.data);
       const totalPagesCount = Math.ceil(res.data.length / itemsPerPage);
       // console.log(totalPagesCount);
       setpageloc(res.data.length);
       setTotalPages(totalPagesCount);
  }
  const handleDelete = (previewImage) => {
    setselectedForUpdate(previewImage);
    setDeleteModal(true);
  };

  const handleDeleteLocation = async () => {
    if (selectedForUpdate) {
      setIsDeletebuttonLoading(true);

      try {
        await DeleteLocation(selectedForUpdate);
        GetallLocation();
      } catch (error) {
        // Handle error if needed
        // console.error("Error deleting department group:", error);
      } finally {
        setIsDeletebuttonLoading(false);
        setDeleteModal(false);
      }
    }
  };
  const handleEdit=async(id)=>{
      
    navigate(`/edit-location/${id}`)
    
  }

  useEffect(()=>{
         getlocation();
  },[])
  const searchList = (e) => {
    let inputVal = e.toLowerCase();
    let filterData = originalLocation.filter(
      (el) =>
        el.name.toLowerCase().indexOf(inputVal) !== -1 ||
        el.isActive.toString().toLowerCase().indexOf(inputVal) !== -1
    );
    setLoc(filterData);
    // console.log(filterData);
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = loc.slice(indexOfFirstItem, indexOfLastItem);
  console.log(loc)
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const userID = localStorage.getItem("EmployeeNameID");
  const cleanedUserID = userID.trim().replace(/^["']+|["']+$/g, '');
  useEffect(() => {
    // Assuming you fetch pinned items and set it to the state
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/pin/getPinnedItemsbyid/${cleanedUserID}`
        );
        setPinnedItems(response.data);

        // Set the initial value for isChecked based on the DepartmentGroup field in pinnedItems
        if (response.data.length > 0) {
          setIsChecked(response.data[0].CommunityUpdateMaster);
        }
      } catch (error) {
        console.error("Error fetching pinned items:", error);
      }
    };
    fetchData();
  }, [cleanedUserID]);

  const handleCheckboxChange = async (event) => {
    const checked = event.target.checked;
    console.log(checked) // Get the new checked state directly from the event
    setIsChecked(checked);

    const userID = localStorage.getItem("EmployeeNameID");
    const cleanedUserID = userID.trim().replace(/^["']+|["']+$/g, "");
    // Assuming this is the ID you want to update
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/pin/updateLocationMaster/${cleanedUserID}`,
        {
          LocationMaster: checked, // Use the new checked state here for CommunityUpdateMaster
        }
      );

      console.log("Updated CommunityUpdateMaster:", response.data);
      // Optionally, you might want to handle the response or trigger further actions
    } catch (error) {
      console.error(
        "Error updating CommunityUpdateMaster:",
        error.response ? error.response.data : error.message
      );
      setIsChecked(!checked); // Revert the checkbox state in case of an error
      // Optionally, you might want to show an error message to the user
    }
  };
  return (
    <>
    <ToastContainer closeButton={false} />
      <DeleteModal
        show={deleteModal}
        isLoading={isDeletebuttonLoading}
        onDeleteClick={() => handleDeleteLocation()}
        onCloseClick={() => setDeleteModal(false)}
      />
      <UiContent />
      <div className="page-content">
        <Container fluid={true}>
        <div className="row">
  <div className="col-12">
    <div className="page-title-box d-sm-flex align-items-center justify-content-between">
    <h4 className="mb-0">Location Master</h4>
      <div className="d-flex align-items-center" style={{marginLeft:"810px"}}>
     

        <div>
                      <input
                        style={{
                          visibility: "visible",
                          width: "40px",
                          marginRight: "10px",
                          cursor: "pointer",
                          zIndex: "1111",
                          position: "absolute",
                         
                          width: "40px",
                          height: "40px",
                          opacity: "0",
                        }}
                        type="checkbox"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                      />
                      <label>
                      <img
                        src={
                          "https://portfolio.barodaweb.com/Dev/OpaSystem.com/L1/assets/images/pin.png"
                        }
                        style={{
                          width: "40px",
                          marginRight: "10px",
                          opacity: isChecked ? "1" : "0.4",
                        }}
                      />
                    </label>
                    
                    </div>
        
      </div>
      <div className="page-title-right">
        <div className="form-check d-inline-block mb-0">
          <input className="form-check-input" type="checkbox" id="formCheck1" style={{ visibility: 'hidden' }} />
          {/* <label className="form-check-label" htmlFor="formCheck1">
            <img src="pin.png" style={{ width: '40px', marginRight: '10px' }} />
          </label> */}
        </div>
      </div>
    </div>
  </div>
</div>


          <Row>
            <Col xl={12}>
              <Card>
              <div class="card-header align-items-center d-flex card-body">
                                    <h4 class="card-title mb-0 flex-grow-1">Location Details</h4>  </div>
                                    <br />
                                    <br />
                                    <br />
                <CardBody>
                  <div className="live-preview">
                  <SearchComponent searchList={searchList} />
                    <div className="table-responsive">
                      <Table className="align-middle table-nowrap mb-0 table-with-border">
                        <thead className="table-light">
                          <tr>
                            <th scope="col" style={{ backgroundColor: '#185abc', color: 'white',borderRight: '1px solid lightgray' }}>ID</th>

                            <th scope="col" style={{ backgroundColor: '#185abc', color: 'white',borderRight: '1px solid lightgray' }}>Location Name</th>
                            
                            <th scope="col" style={{ backgroundColor: '#185abc', color: 'white',borderRight: '1px solid lightgray' }}>Status</th>
                            <th scope="col" style={{ backgroundColor: '#185abc', color: 'white',borderRight: '1px solid lightgray' }}>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                        
                          
                                <tr >
                                  <td style={{borderRight: '1px solid lightgray'}}>{1}</td>
                                  
                                  <td style={{borderRight: '1px solid lightgray'}}>{loc.name}</td>
                                  
                                  <td style={{borderRight: '1px solid lightgray'}}>
                                    {loc.isActive ? (
                                      <span className="badge bg-success">
                                        Active
                                      </span>
                                    ) : (
                                      <span className="badge bg-danger">
                                        InActive
                                      </span>
                                    )}
                                  </td>
                                  <td style={{ borderRight: '1px solid lightgray', display: 'flex', justifyContent: 'center', alignItems: 'center'  }}>
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
                                          onClick={() => handleDelete(loc._id)}
                                        >
                                          <i className="ri-delete-bin-5-line"></i>
                                        </button>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              
                            }
                        </tbody>
                      </Table>
                    </div>
                    <nav>
                      <ul className="pagination">
                        {loc.length > itemsPerPage && (
                          <>
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                              <button
                                className="page-link"
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                              >
                                Previous
                              </button>
                            </li>
                            {Array.from({ length: Math.ceil(loc.length / itemsPerPage) }, (_, i) => {
                              if (i < 5) {
                                return (
                                  <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                    <button className="page-link" onClick={() => paginate(i + 1)}>{i + 1}</button>
                                  </li>
                                );
                              }
                            })}
                            <li className={`page-item ${currentPage === Math.ceil(loc.length / itemsPerPage) ? 'disabled' : ''}`}>
                              <button
                                className="page-link"
                                onClick={() => paginate(currentPage + 1)}
                                disabled={currentPage === Math.ceil(loc.length / itemsPerPage)}
                              >
                                Next
                              </button>
                            </li>
                          </>
                        )}
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

