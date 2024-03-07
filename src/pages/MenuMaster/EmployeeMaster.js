import React,{useState,useEffect,useContext} from "react";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import UiContent from "../../Components/Common/UiContent";
import PreviewCardHeader from "../../Components/Common/PreviewCardHeader";


import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import axios from "axios";
import DeleteModal from "../../common/DeleteModal";
import { ToastContainer } from "react-toastify";
import SearchComponent from "../../common/SearchComponent";

import logo from "../../assets/images/brands/slack.png";
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
import { SignState } from "../../contextAPI/State/SignState";
import SignContext from "../../contextAPI/Context/SignContext";
import { useNavigate } from "react-router-dom";

const EmployeeMaster = () => {
  const navigate=useNavigate();
  const {GetallEmployeeName,DeleteEmployeeName}=useContext(SignContext)
  // const [employeename,setemployeename]=useState([]);
  // const [deleteModal, setDeleteModal] = useState(false);
  // const [selectedForUpdate, setselectedForUpdate] = useState(null);
  // const [isChecked, setIsChecked] = useState(false);
  // const [pinnedItems, setPinnedItems] = useState([])
  // const [isDeletebuttonLoading, setIsDeletebuttonLoading] = useState(false);
  // const [originalEmployeeMaster, setOriginalEmployeeMaster] = useState(null);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [itemsPerPage] = useState(5);
  const [employeename, setemployeename] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedForUpdate, setselectedForUpdate] = useState(null);
  const [isDeletebuttonLoading, setIsDeletebuttonLoading] = useState(false);
  const [originalEmployeeMaster, setOriginalEmployeeMaster] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [pageNo, setPageNo] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [itemsPerPage] = useState(5);
  const [column, setcolumn] = useState();
  const [sortDirection, setsortDirection] = useState();
  const [BGForm, setBGForm] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [pinnedItems, setPinnedItems] = useState([])
 const id=localStorage.getItem("DepartmentTypeID");
 console.log(id);
  const getemployeename=async()=>{
     const res=await axios.get(`${process.env.REACT_APP_BASE_URL}/employeename/getemployeebyrole/${id}`)
     console.log("This is it",res); 
     setemployeename(res.data);    
     console.log("Hiii",res.data);
     setOriginalEmployeeMaster(res.data);
     setBGForm(res.data);
     console.log(res.data)
  }
  // const handleDelete=async(id)=>{
  //  const confirm=window.confirm("Are U sure You want to delete this page");
  //  if(confirm){
  //   const res=await DeleteEmployeeName(id);
  //   getemployeename();
  //  }
  //  console.log(id);
  // }
  const handleDelete = (previewImage) => {
    setselectedForUpdate(previewImage);
    setDeleteModal(true);
  };
  const handleDeleteEmployee = async () => {
    if (selectedForUpdate) {
      setIsDeletebuttonLoading(true);
  
      try {
        await DeleteEmployeeName(selectedForUpdate);
        getemployeename();
      } catch (error) {
        // Handle error if needed
        console.error("Error deleting employee:", error);
      } finally {
        setIsDeletebuttonLoading(false);
        setDeleteModal(false);
      }
    }
  };

  const handleEdit=async(id)=>{
    console.log(">>>id",id)
    navigate(`/edit-employeename/${id}`)
  }

  
  useEffect(()=>{
    getemployeename()
},[])
const searchList = (e) => {
  let inputVal = e.toLowerCase();
  console.log(originalEmployeeMaster)
  let filterData = originalEmployeeMaster.filter(
    (el) =>
      el.employeeRole.EmployeeRole.toLowerCase().indexOf(inputVal) !== -1 ||
      el.name.toString().toLowerCase().indexOf(inputVal) !== -1||
      el.departmentType.name.toString().toLowerCase().indexOf(inputVal) !== -1||
      el.isActive.toString().toLowerCase().indexOf(inputVal) !== -1
  );
  setemployeename(filterData);
   setBGForm(filterData);
   console.log(filterData)
   setTotalRows(filterData.length)
};
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
// const currentItems = employeename.slice(indexOfFirstItem, indexOfLastItem);

const paginate = (pageNumber) => setCurrentPage(pageNumber);
const userID= localStorage.getItem("EmployeeNameID");
    const cleanedUserID = userID.trim().replace(/^["']+|["']+$/g, '');
    useEffect(() => {
      // Assuming you fetch pinned items and set it to the state
      const fetchData = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/pin/getPinnedItemsbyid/${cleanedUserID}`);
          setPinnedItems(response.data);
    
          // Set the initial value for isChecked based on the DepartmentGroup field in pinnedItems
          if (response.data.length > 0) {
            setIsChecked(response.data[0].Employeemaster);
          }
        } catch (error) {
          console.error('Error fetching pinned items:', error);
        }
      };
      fetchData();
    }, [cleanedUserID]);

  const handleCheckboxChange = async (event) => {
    const checked = event.target.checked; // Get the new checked state directly from the event
    setIsChecked(checked);

    const userID = localStorage.getItem("EmployeeNameID");
    const cleanedUserID = userID.trim().replace(/^["']+|["']+$/g, '');
    // Assuming this is the ID you want to update
    try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/pin/updateEmployeemaster/${cleanedUserID}`, {
            Employeemaster: checked, // Use the new checked state here for Employeemaster
        });

        console.log('Updated Employeemaster:', response.data);
        // Optionally, you might want to handle the response or trigger further actions

    } catch (error) {
        console.error('Error updating Employeemaster:', error.response ? error.response.data : error.message);
        setIsChecked(!checked); // Revert the checkbox state in case of an error
        // Optionally, you might want to show an error message to the user
    }
};
const fetchname = async () => {
  try {
    setLoading(true);
    let skip = (pageNo - 1) * perPage;
    if (skip < 0) {
      skip = 0;
    }

   
    const defaultColumn = "employeeName"; 
    const defaultSortDirection = "asc"; 
const newid=localStorage.getItem("DepartmentGroupID")
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/employeename/listemployeenamespec/${newid}`,
      {
        skip: skip,
        per_page: perPage,
        sorton: column || defaultColumn, // Use column or defaultColumn if column is undefined
        sortdir: sortDirection || defaultSortDirection, // Use sortDirection or defaultSortDirection if sortDirection is undefined
        match: "",
      }
    );

    console.log("Response:", response);

    console.log(Array.isArray(response));

    if (Array.isArray(response)) {
      setLoading(false);

      // Extract data for the current page
      const startIndex = skip;
      const endIndex = startIndex + perPage;
      const paginatedData = response.slice(startIndex, endIndex);

      // setBGForm(paginatedData);
      // setTotalRows(response.length);
    } else {
      // Handle non-200 status code or non-array data
      console.error("Invalid response:", response);
      setLoading(false);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    setLoading(false);
  }
};
const handlePageChange = (page) => {
  setPageNo(page);
};
const handleSort = (column, sortDirection) => {
  setcolumn(column.sortField);
  setsortDirection(sortDirection);
};

const handlePerRowsChange = async (newPerPage, page) => {
  // setPageNo(page);
  setPerPage(newPerPage);
};
const columns = [
  {
    name: 'ID',
    selector: (_, index) => `${index + 1}`,
    sortable: true,
    style: {
      fontWeight: 'bold',
    },
    className: 'table-light',
  },
  {
    name: 'Employee Name',
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: 'Department Group Name',
    selector: (row) => row.departmentGroup.name,
    sortable: true,
  },
  {
    name: 'Department Type Name',
    selector: (row) => row.departmentType.name,
    sortable: true,
  },
  {
    name: 'Employee Role',
    selector: (row) => row.employeeRole.EmployeeRole,
    sortable: true,
  },
  {
    name: 'Status',
    selector: (row) => row.isActive,
    sortable: true,
    cell: (row) => (
      row.isActive ? <span className="badge bg-success">Active</span> : <span className="badge bg-danger">Inactive</span>
    ),
  },

  {
    name: 'Actions',
    cell: (row) => (
      <div className="d-flex gap-2 align-items-center">
        <div className="flex-shrink-0">
          <button
            type="button"
            className="btn btn-success btn-icon waves-effect waves-light"
            onClick={() => handleEdit(row._id)}
          >
            <i className="ri-pencil-fill"></i>
          </button>
        </div>
        <div className="flex-grow-1">
          <button
            type="button"
            className="btn btn-danger btn-icon waves-effect waves-light"
            onClick={() => handleDelete(row._id)}
          >
            <i className="ri-delete-bin-5-line"></i>
          </button>
        </div>
      </div>
    ),
  },
];
useEffect(() => {
  fetchname();
}, [pageNo, perPage, column, sortDirection,]);
useEffect(() => {
  fetchname();
}, [currentPage, itemsPerPage, column, sortDirection]);

  return (
    <><ToastContainer closeButton={false} />
    <DeleteModal
      show={deleteModal}
      isLoading={isDeletebuttonLoading}
      onDeleteClick={() => handleDeleteEmployee()}
      onCloseClick={() => setDeleteModal(false)}
    />
      <UiContent />
      <div className="page-content">
        <Container fluid={true}>
        <div className="row">
  <div className="col-12">
    <div className="page-title-box d-sm-flex align-items-center justify-content-between">
    <h4 className="mb-0">Employee Name</h4>
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
                                    <h4 class="card-title mb-0 flex-grow-1">Employee Name Details</h4>  </div>
                                    <br />
                                    <br />
                                    <br />
                <CardBody>
                  <div className="live-preview">
                  <SearchComponent searchList={searchList}  />
                    <div className="table-responsive">
                     
                    </div>
                    {/* <nav>
                      <ul className="pagination">
                        {Array.from(
                          { length: Math.ceil(employeename.length / itemsPerPage) },
                          (_, i) => (
                            <li
                              key={i}
                              className={`page-item ${
                                currentPage === i + 1 ? "active" : ""
                              }`}
                            >
                              <button
                                className="page-link"
                                onClick={() => paginate(i + 1)}
                              >
                                {i + 1}
                              </button>
                            </li>
                          )
                        )}
                      </ul>
                    {/* </nav> */}
                    <DataTable className= "align-middle table-nowrap mb-0 table-with-border heading"
                      columns={columns}
                      data={BGForm}
                      progressPending={loading}
                      sortServer
                      pagination
                      paginationServer
                      paginationDefaultPage={currentPage}
                      paginationTotalRows={totalRows}
                      paginationRowsPerPageOptions={[10, 20, 50, 100, totalRows]}
                      onChangeRowsPerPage={handlePerRowsChange}
                      onChangePage={
                       handlePageChange
                        
                      }
                      onSort={handleSort}
                    />
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

export default EmployeeMaster;

