import React, { useState,useEffect,useContext } from "react";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import UiContent from "../../Components/Common/UiContent";
import PreviewCardHeader from "../../Components/Common/PreviewCardHeader";
import { Link } from "react-router-dom";
import logo from "../../assets/images/brands/slack.png";
import DeleteModal from "../../common/DeleteModal";
import { ToastContainer } from "react-toastify";
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
import SignContext from "../../contextAPI/Context/SignContext";
import { useNavigate } from "react-router-dom";
const EmployeeRoles = () => {
  const navigate=useNavigate();      
  const { GetallEmployeeRole, DeleteEmployeeRole} = useContext(SignContext);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedForUpdate, setselectedForUpdate] = useState(null);
  const [isDeletebuttonLoading, setIsDeletebuttonLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [pinnedItems, setPinnedItems] = useState([]);
  const [originalEmployeeRole, setOriginalEmployeeRole] = useState(null);
  const [employeerole,setemployeerole]=useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const id=localStorage.getItem("DepartmentTypeID");
  console.log("DeartmentType",id);
 
  // const getemployerole=async()=>{
  //    const res=await GetallEmployeeRole(); 
  //    console.log(res); 
  //    setOriginalEmployeeRole(res.data)
  //    setemployeerole(res.data);    
  // }
  const getemployerole=async()=>{
    const res=await axios.get(`${process.env.REACT_APP_BASE_URL}/employeerole/getEmployeeRolesByDType/${id}`)
    console.log("This is it",res); 
    setemployeerole(res.data);    
    console.log("Hiii",res.data);
    setOriginalEmployeeRole(res.data);
 }
  // const handleDelete=async(id)=>{
  //       console.log(">>id",id);
      
  //     const abc=window.confirm("Are you sure you want to delete");
  //     if(abc){
  //     const res= await DeleteEmployeeRole(id);
  //     getemployerole()
  //     console.log(res);
  //     }
  // }
  const handleDelete = (previewImage) => {
    setselectedForUpdate(previewImage);
    setDeleteModal(true);
  };

  const handleDeleteEmployeeRole = async () => {
    if (selectedForUpdate) {
      setIsDeletebuttonLoading(true);

      try {
        await DeleteEmployeeRole(selectedForUpdate);
        getemployerole();
      } catch (error) {
        // Handle error if needed
        console.error("Error deleting department group:", error);
      } finally {
        setIsDeletebuttonLoading(false);
        setDeleteModal(false);
      }
    }
  };
  
  const handleEdit=async(id)=>{
         console.log(id);
         navigate( `/edit-employeerole/${id}`)
  }
  
  useEffect(()=>{
       getemployerole()
  },[])
  const searchList = (e) => {
    let inputVal = e.toLowerCase();
    console.log("Input Value:", inputVal); // Log input value for debugging
    let filterData = [];
    
    if (originalEmployeeRole) {
      filterData = originalEmployeeRole.filter((el) => {
        const lowerCaseName = el.EmployeeRole && el.EmployeeRole.toLowerCase();
        const lowerCaseGroup = el.departmentGroup.name && el.departmentGroup.name.toLowerCase();
        console.log("Lowercase Name:", lowerCaseName); // Log lowercase name for debugging
        return (lowerCaseName && lowerCaseName.indexOf(inputVal) !== -1) ||
               (el.isActive && el.isActive.toString().toLowerCase().indexOf(inputVal) !== -1)||
               (lowerCaseGroup && lowerCaseGroup.toString().toLowerCase().indexOf(inputVal) !== -1);
      });
    }
    
    console.log("Filtered Data:", filterData); // Log filtered data for debugging
    setemployeerole(filterData);

  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = employeerole.slice(indexOfFirstItem, indexOfLastItem);
  const userID = localStorage.getItem("EmployeeNameID");
  const cleanedUserID = userID.trim().replace(/^["']+|["']+$/g, "");
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
          setIsChecked(response.data[0].EmployeeRole);
        }
      } catch (error) {
        console.error("Error fetching pinned items:", error);
      }
    };
    fetchData();
  }, [cleanedUserID]);

  const handleCheckboxChange = async (event) => {
    const checked = event.target.checked; // Get the new checked state directly from the event
    setIsChecked(checked);

    const userID = localStorage.getItem("EmployeeNameID");
    const cleanedUserID = userID.trim().replace(/^["']+|["']+$/g, "");
    // Assuming this is the ID you want to update
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/pin/updateEmployeeRole/${cleanedUserID}`,
        {
          EmployeeRole: checked, // Use the new checked state here for EmployeeRole
        }
      );

      console.log("Updated EmployeeRole:", response.data);
      // Optionally, you might want to handle the response or trigger further actions
    } catch (error) {
      console.error(
        "Error updating EmployeeRole:",
        error.response ? error.response.data : error.message
      );
      setIsChecked(!checked); // Revert the checkbox state in case of an error
      // Optionally, you might want to show an error message to the user
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <>
    <ToastContainer closeButton={false} />
    <DeleteModal
      show={deleteModal}
      isLoading={isDeletebuttonLoading}
      onDeleteClick={() => handleDeleteEmployeeRole()}
      onCloseClick={() => setDeleteModal(false)}
    />
      <UiContent />
      <div className="page-content">
        <Container fluid={true}>
        <div className="row">
  <div className="col-12">
    <div className="page-title-box d-sm-flex align-items-center justify-content-between">
    <h4 className="mb-0">Department Type</h4>
      <div className="d-flex align-items-center" style={{marginLeft:"820px"}}>
     

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
                                    <h4 class="card-title mb-0 flex-grow-1">Employee Role Details</h4>  </div>
                                    <br />
                                    <br />
                                    <br />
                <CardBody>
                  <div className="live-preview">
                  <SearchComponent searchList={searchList}  />
                    <div className="table-responsive">
                      <Table className="align-middle table-nowrap mb-0 table-with-border">
                        <thead className="table-light">
                          <tr>
                            <th scope="col" style={{ backgroundColor: '#185abc', color: 'white',borderRight: '1px solid lightgray' }}>ID</th>

                            <th scope="col" style={{ backgroundColor: '#185abc', color: 'white',borderRight: '1px solid lightgray' }}>Department Group Name</th>
                            <th scope="col" style={{ backgroundColor: '#185abc', color: 'white',borderRight: '1px solid lightgray' }}>Department Type Name</th>
                            <th scope="col" style={{ backgroundColor: '#185abc', color: 'white',borderRight: '1px solid lightgray' }}>Employee Role</th>
                            <th scope="col" style={{ backgroundColor: '#185abc', color: 'white',borderRight: '1px solid lightgray' }}>Status</th>
                            <th scope="col" style={{ backgroundColor: '#185abc', color: 'white',borderRight: '1px solid lightgray' }}>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            currentItems.map((type, index) => {
                              return (
                                <tr key={type._id}>
                                  <td style={{borderRight: '1px solid lightgray'}}>{index+1}</td>
                                  <td style={{borderRight: '1px solid lightgray'}}>{type.departmentGroup.name}</td>
                                  <td style={{borderRight: '1px solid lightgray'}}>{type.departmentType.name}</td>
                                  <td style={{borderRight: '1px solid lightgray'}}>{type.EmployeeRole}</td>
                                  
                                  <td style={{borderRight: '1px solid lightgray'}}>
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
                                          onClick={() => handleDelete(employeerole._id)}
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
                        {employeerole.length > itemsPerPage && (
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
                            {Array.from({ length: Math.ceil(employeerole.length / itemsPerPage) }, (_, i) => {
                              if (i < 5) {
                                return (
                                  <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                    <button className="page-link" onClick={() => paginate(i + 1)}>{i + 1}</button>
                                  </li>
                                );
                              }
                            })}
                            <li className={`page-item ${currentPage === Math.ceil(employeerole.length / itemsPerPage) ? 'disabled' : ''}`}>
                              <button
                                className="page-link"
                                onClick={() => paginate(currentPage + 1)}
                                disabled={currentPage === Math.ceil(employeerole.length / itemsPerPage)}
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

export default EmployeeRoles;
