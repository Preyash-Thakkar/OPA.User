// import React, { useContext, useState, useEffect } from "react";
// import BreadCrumb from "../../Components/Common/BreadCrumb";
// import UiContent from "../../Components/Common/UiContent";
// import PreviewCardHeader from "../../Components/Common/PreviewCardHeader";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import logo from "../../assets/images/brands/slack.png";
// import Example from "./FormOne";
// import SignContext from "../../contextAPI/Context/SignContext";
// import { useNavigate } from "react-router-dom";
// import DeleteModal from "../../common/DeleteModal";
// import { ToastContainer } from "react-toastify";
// import SearchComponent from "../../common/SearchComponent";
// import {
//   Button,
//   Card,
//   CardBody,
//   CardHeader,
//   Col,
//   Input,
//   Label,
//   Table,
//   Container,
//   ListGroup,
//   ListGroupItem,
//   Modal,
//   ModalBody,
//   ModalFooter,
//   ModalHeader,
//   Row,
// } from "reactstrap";
// const AssignMaster = () => {
//   const navigate = useNavigate();

//   const id = localStorage.getItem("DepartmentTypeID");

//   const { GetallAssignTask, DeleteAssignTask } = useContext(SignContext);
//   const [deleteModal, setDeleteModal] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [selectedForUpdate, setselectedForUpdate] = useState(null);
//   const [isDeletebuttonLoading, setIsDeletebuttonLoading] = useState(false);
//   const [originalAssignTask, setOriginalAssignTask] = useState(null);
//   const [task, settask] = useState(null);
//   const [paginatetask, setpaginateTask] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(10);
//   const getalltask = async () => {
//     const res = await axios.get(
//       `${process.env.REACT_APP_BASE_URL}/assigntask/getassigntaskbyDeptid/${id}`
//     );

//     settask(res.data);
//     setOriginalAssignTask(res.data);
//     setpaginateTask(res.data);
//   };

//   useEffect(() => {
//     getalltask();
//   }, []);
//   useEffect(() => {}, [task]);
//   const handleDelete = (previewImage) => {
//     setselectedForUpdate(previewImage);
//     setDeleteModal(true);
//   };

//   const handleDeleteAssignTask = async () => {
//     if (selectedForUpdate) {
//       setIsDeletebuttonLoading(true);

//       try {
//         await DeleteAssignTask(selectedForUpdate);
//         getalltask();
//       } catch (error) {
//         // Handle error if needed
//         // console.error("Error deleting department group:", error);
//       } finally {
//         setIsDeletebuttonLoading(false);
//         setDeleteModal(false);
//       }
//     }
//   };
//   const handleEdit = async (id) => {
//     navigate(`/edit-assigntask/${id}`);
//   };
//   const searchList = (e) => {
//     let inputVal = e.toLowerCase();
//     let filterData = originalAssignTask.filter(
//       (el) =>
//         el.documentname.toLowerCase().indexOf(inputVal) !== -1 ||
//         el.documentdepartmenttype.name.toLowerCase().indexOf(inputVal) !== -1 ||
//         el.tasktypes.taskName.toLowerCase().indexOf(inputVal) !== -1 ||
//         el.documenttype.toLowerCase().indexOf(inputVal) !== -1 ||
//         el.isActive.toString().toLowerCase().indexOf(inputVal) !== -1
//     );
//     settask(filterData);
//   };
//   const handleViewDocument = (item) => {
//     setSelectedItem(item);
//   };

//   const handleExampleClose = () => {
//     setSelectedItem(null);
//   };
//   // const searchList = (e) => {
//   //   let inputVal = e.toLowerCase();
//   //   let filterData = originalAssignTask.filter(
//   //     (el) =>
//   //     el.documentname.toLowerCase().indexOf(inputVal) !== -1 ||
//   //     el.documentdepartmenttype.name.toLowerCase().indexOf(inputVal) !==
//   //       -1 ||
//   //     el.tasktypes.taskName.toLowerCase().indexOf(inputVal) !== -1 ||
//   //     el.documenttype.toLowerCase().indexOf(inputVal) !== -1 ||
//   //     el.isActive.toString().toLowerCase().indexOf(inputVal) !== -1
//   //   );
//   //   settask(filterData);

//   // };
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = task && task.slice(indexOfFirstItem, indexOfLastItem);
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);
//   return (
//     <>
//       <ToastContainer closeButton={false} />
//       <DeleteModal
//         show={deleteModal}
//         isLoading={isDeletebuttonLoading}
//         onDeleteClick={() => handleDeleteAssignTask()}
//         onCloseClick={() => setDeleteModal(false)}
//       />
//       <UiContent />
//       <div className="page-content">
//         <Container fluid={true}>
//           <div className="row">
//             <div className="col-12">
//               <div className="page-title-box d-sm-flex align-items-center justify-content-between">
//                 <div className="d-flex align-items-center">
//                   <h4 className="mb-0">Add Assign Task</h4>
//                   <div className="d-flex align-items-center" style={{marginLeft:"920px"}}>
//         <Link to="/assign-task" >
//         <button className="custom_hover btn btn-primary btn-color" type="submit" style={{ display: 'flex' }}>
//           <i className="ri-add-line me-1 mb"></i>Add Assign Task
//           </button>
//         </Link>
// </div>
// </div>
// </div>
// </div>
// </div>
//           <Row>
//             <Col xl={12}>
//               <Card>
//                 <div class="card-header align-items-center d-flex card-body">
//                   <h4 class="card-title mb-0 flex-grow-1">
//                     Assign Task Details
//                   </h4>{" "}
//                 </div>
//                 <br />
//                 <br />
//                 <br />
//                 <CardBody>
//                   <div className="live-preview">
//                     <SearchComponent searchList={searchList} />
//                     <div className="table-responsive">
//                       <Table className="align-middle table-nowrap mb-0 table-with-border">
//                         <thead className="table-light">
//                           <tr>
                        
//                             <th scope="col"  style={{ backgroundColor: '#185abc', color: 'white',borderRight: '1px solid lightgray' }}>
                            
//                               ID
//                             </th>{" "}
//                             <th scope="col" style={{ backgroundColor: '#185abc', color: 'white',borderRight: '1px solid lightgray' }}>
                        
//                               Assigned By
//                             </th>
//                             <th scope="col" style={{ backgroundColor: '#185abc', color: 'white',borderRight: '1px solid lightgray' }}>
//                               Document
//                              Name
//                             </th>
//                             <th scope="col" style={{ backgroundColor: '#185abc', color: 'white',borderRight: '1px solid lightgray' }}>
//                               Document Department Type
//                             </th>
//                             <th
//                               scope="col"
//                               style={{
//                                 backgroundColor: "#185abc",
//                                 color: "white",
//                                 borderRight: "1px solid lightgray",
//                               }}
//                             >
//                               Task Type
//                             </th>
//                             <th
//                               scope="col"
//                               style={{
//                                 backgroundColor: "#185abc",
//                                 color: "white",
//                                 borderRight: "1px solid lightgray",
//                               }}
//                             >
//                               Document Type
//                             </th>
//                             <th
//                               scope="col"
//                               style={{
//                                 backgroundColor: "#185abc",
//                                 color: "white",
//                                 borderRight: "1px solid lightgray",
//                               }}
//                             >
//                               Access Location
//                             </th>
//                             <th
//                               scope="col"
//                               style={{ backgroundColor: '#185abc', color: 'white',borderRight: '1px solid lightgray' }}
//                             >
//                               Status
//                             </th>
//                             <th
//                               scope="col"
//                               style={{
//                                 backgroundColor: "#185abc",
//                                 color: "white",
//                                 borderRight: "1px solid lightgray",
//                               }}
//                             >
//                               Actions
//                             </th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {currentItems &&
//                             currentItems.length > 0 &&
//                             currentItems.map((type, index) => {
//                               return (
//                                 <tr key={type._id}>
//                                   <td
//                                     style={{
//                                       borderRight: "1px solid lightgray",
//                                     }}
//                                   >
//                                     {index + 1}
//                                   </td>
//                                   <td
//                                     style={{
//                                       borderRight: "1px solid lightgray",
//                                     }}
//                                   >
//                                     {type.assignedby}
//                                   </td>
//                                   <td
//                                     style={{
//                                       borderRight: "1px solid lightgray",
//                                     }}
//                                   >
//                                     {type.documentname}
//                                   </td>

//                                   <td
//                                     style={{
//                                       borderRight: "1px solid lightgray",
//                                     }}
//                                   >
//                                     {type.documentdepartmenttype.name}
//                                   </td>
//                                   <td
//                                     style={{
//                                       borderRight: "1px solid lightgray",
//                                     }}
//                                   >
//                                     {type.tasktypes.taskName}
//                                   </td>
//                                   <td
//                                     style={{
//                                       borderRight: "1px solid lightgray",
//                                     }}
//                                   >
//                                     {" "}
//                                     {type.documenttype === ""
//                                       ? "FormLink"
//                                       : type.documenttype}
//                                   </td>
//                                   <td
//                                     style={{
//                                       borderRight: "1px solid lightgray",
//                                     }}
//                                   >
//                                     {" "}
//                                     {!type.departmentGroup.length
//                                       ? "No"
//                                       : "Yes"}
//                                   </td>

//                                   <td style={{borderRight: '1px solid lightgray'}}>
//                                     {type.isActive ? (
//                                       <span className="badge bg-success">
//                                         Active
//                                       </span>
//                                     ) : (
//                                       <span className="badge bg-danger">
//                                         InActive
//                                       </span>
//                                     )}
//                                   </td>
//                                   <td
//                                     style={{
//                                       borderRight: "1px solid lightgray",
//                                       display: "flex",
//                                       justifyContent: "center",
//                                       alignItems: "center",
//                                     }}
//                                   >
//                                     <div className="d-flex gap-2 align-items-center">
//                                       <div className="flex-shrink-0">
//                                         <button
//                                           type="button"
//                                           className="btn btn-success btn-icon waves-effect waves-light"
//                                           // onClick={() => handleEdit(type._id)}
//                                         >
//                                           <i className="ri-pencil-fill"></i>
//                                         </button>
//                                       </div>
//                                       <div className="flex-grow-1">
//                                         <button
//                                           type="button"
//                                           className="btn btn-danger btn-icon waves-effect waves-light"
//                                           onClick={() => handleDelete(type._id)}
//                                         >
//                                           <i className="ri-delete-bin-5-line"></i>
//                                         </button>
//                                       </div>

//                                       <div className="flex-grow-1">
//                                         <button
//                                           type="button"
//                                           className="btn btn-primary btn-icon waves-effect waves-light"
//                                           onClick={() =>
//                                             handleViewDocument(type)
//                                           }
//                                         >
//                                           {/* <i className="ri-eye-line"></i> */}
//                                           <Example
//                                             selectedItem={selectedItem}
//                                             handleClose={handleExampleClose}
//                                           />
//                                         </button>
//                                       </div>
//                                     </div>
//                                   </td>
//                                 </tr>
//                               );
//                             })}
//                         </tbody>
//                       </Table>
//                     </div>
//                   </div>
//                 </CardBody>
//               </Card>
//             </Col>
//           </Row>
//           <nav>
//             <ul className="pagination">
//               {task && task.length > itemsPerPage && (
//                 <>
//                   <li
//                     className={`page-item ${
//                       currentPage === 1 ? "disabled" : ""
//                     }`}
//                   >
//                     <button
//                       className="page-link"
//                       onClick={() => paginate(currentPage - 1)}
//                       disabled={currentPage === 1}
//                     >
//                       Previous
//                     </button>
//                   </li>
//                   {Array.from(
//                     { length: Math.ceil(task.length / itemsPerPage) },
//                     (_, i) => i + 1
//                   ).map((pageNumber) => (
//                     <li
//                       key={pageNumber}
//                       className={`page-item ${
//                         currentPage === pageNumber ? "active" : ""
//                       }`}
//                     >
//                       <button
//                         onClick={() => paginate(pageNumber)}
//                         className="page-link"
//                       >
//                         {pageNumber}
//                       </button>
//                     </li>
//                   ))}
//                   <li
//                     className={`page-item ${
//                       currentPage === Math.ceil(task.length / itemsPerPage)
//                         ? "disabled"
//                         : ""
//                     }`}
//                   >
//                     <button
//                       className="page-link"
//                       onClick={() => paginate(currentPage + 1)}
//                       disabled={
//                         currentPage === Math.ceil(task.length / itemsPerPage)
//                       }
//                     >
//                       Next
//                     </button>
//                   </li>
//                 </>
//               )}
//             </ul>
//           </nav>
//         </Container>
//       </div>
//     </>
//   );
// };

// export default AssignMaster;
import React, { useContext, useState, useEffect } from "react";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import UiContent from "../../Components/Common/UiContent";
import PreviewCardHeader from "../../Components/Common/PreviewCardHeader";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/images/brands/slack.png";
import Example from "./FormOne";
import SignContext from "../../contextAPI/Context/SignContext";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../common/DeleteModal";
import { ToastContainer } from "react-toastify";
import SearchComponent from "../../common/SearchComponent";
import DataTable from "react-data-table-component";
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
const AssignMaster = () => {
  const navigate = useNavigate();

  const id = localStorage.getItem("EmployeeNameID");
  console.log(">>", id);
  const { GetallAssignTask, DeleteAssignTask } = useContext(SignContext);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedForUpdate, setselectedForUpdate] = useState(null);
  const [isDeletebuttonLoading, setIsDeletebuttonLoading] = useState(false);
  const [pinnedItems, setPinnedItems] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [originalAssignTask, setOriginalAssignTask] = useState(null);
  const [task, settask] = useState(null);
  const [paginatetask, setpaginateTask] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [pageNo, setPageNo] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [column, setcolumn] = useState();
  const [sortDirection, setsortDirection] = useState();
  const [BGForm, setBGForm] = useState([]);
   const [currentItems, setCurrentItems] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  // const [isChecked, setIsChecked] = useState(false);
  // const [pinnedItems, setPinnedItems] = useState([])
  const getalltask = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/assigntask/getassigntaskbyemployeeid/${id}`
      
    );
    console.log(">>>>", res.data);
    settask(res.data);
    setOriginalAssignTask(res.data);
    setpaginateTask(res.data);
    // setBGForm(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    getalltask();
  }, []);
  useEffect(() => {}, [task]);
  const handleDelete = (previewImage) => {
    setselectedForUpdate(previewImage);
    setDeleteModal(true);
  };

  const handleDeleteAssignTask = async () => {
    if (selectedForUpdate) {
      setIsDeletebuttonLoading(true);

      try {
        await DeleteAssignTask(selectedForUpdate);
        getalltask();
      } catch (error) {
        // Handle error if needed
        // console.error("Error deleting department group:", error);
      } finally {
        setIsDeletebuttonLoading(false);
        setDeleteModal(false);
      }
    }
  };
  const handleEdit = async (id) => {
    navigate(`/edit-assigntask/${id}`);
  };
  // const searchList = (e) => {
  //   let inputVal = e.toLowerCase();
  //   let filterData = originalAssignTask.filter(
  //     (el) =>
  //       el.documentname.toLowerCase().indexOf(inputVal) !== -1 ||
  //       el.documentdepartmenttype.name.toLowerCase().indexOf(inputVal) !==
  //         -1 ||
  //       el.tasktypes.taskName.toLowerCase().indexOf(inputVal) !== -1 ||
  //       el.documenttype.toLowerCase().indexOf(inputVal) !== -1 ||
  //       el.isActive.toString().toLowerCase().indexOf(inputVal) !== -1
  //   );
  //   settask(filterData);
  // };
  const handleViewDocument = (item) => {
    setSelectedItem(item);
  };

  const handleExampleClose = () => {
    setSelectedItem(null);
  };
  const searchList = (e) => {
    let inputVal = e.toLowerCase();
    let filterData = originalAssignTask.filter(
      (el) =>
        el.documentname.toLowerCase().indexOf(inputVal) !== -1 ||
        el.documentdepartmenttype.name.toLowerCase().indexOf(inputVal) !== -1 ||
        el.tasktypes.taskName.toLowerCase().indexOf(inputVal) !== -1 ||
        el.documenttype.toLowerCase().indexOf(inputVal) !== -1 ||
        el.isActive.toString().toLowerCase().indexOf(inputVal) !== -1||
        el.assignedby.toString().toLowerCase().indexOf(inputVal) !== -1
    );
    settask(filterData);
    setBGForm(filterData);
    setTotalRows(filterData.length);
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
 // const currentItems = task && task.slice(indexOfFirstItem, indexOfLastItem);

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
          setIsChecked(response.data[0].AssignMaster);
        }
      } catch (error) {
        console.error('Error fetching pinned items:', error);
      }
    };
    fetchData();
  }, [cleanedUserID]);

  // const handleCheckboxChange = async (event) => {
  //   const checked = event.target.checked; // Get the new checked state directly from the event
  //   setIsChecked(checked);

  //   const userID = localStorage.getItem("EmployeeNameID");
  //   const cleanedUserID = userID.trim().replace(/^["']+|["']+$/g, '');
  //   // Assuming this is the ID you want to update
  //   try {
  //     const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/pin/updateAssignMaster/${cleanedUserID}`, {
  //       AssignMaster: checked, // Use the new checked state here for AssignTask
  //     });

  //     console.log('Updated AssignTask:', response.data);
  //     // Optionally, you might want to handle the response or trigger further actions

  //   } catch (error) {
  //     console.error('Error updating AssignTask:', error.response ? error.response.data : error.message);
  //     setIsChecked(!checked); // Revert the checkbox state in case of an error
  //     // Optionally, you might want to show an error message to the user
  //   }
  // };

  const userID1= localStorage.getItem("EmployeeNameID");
  const cleanedUserID1 = userID1.trim().replace(/^["']+|["']+$/g, '');
  useEffect(() => {
    // Assuming you fetch pinned items and set it to the state
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/pin/getPinnedItemsbyid/${cleanedUserID1}`);
        setPinnedItems(response.data);
  
        // Set the initial value for isChecked based on the DepartmentGroup field in pinnedItems
        if (response.data.length > 0) {
          setIsChecked(response.data[0].AssignMaster);
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
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/pin/updateAssignMaster/${cleanedUserID}`, {
        AssignMaster: checked, // Use the new checked state here for AssignTask
      });

      console.log('Updated AssignTask:', response.data);
      // Optionally, you might want to handle the response or trigger further actions

    } catch (error) {
      console.error('Error updating AssignTask:', error.response ? error.response.data : error.message);
      setIsChecked(!checked); // Revert the checkbox state in case of an error
      // Optionally, you might want to show an error message to the user
    }
  };

  const fetchAssignTask = async () => {

    try {
      setLoading(true);
      let skip = (pageNo - 1) * perPage;
      if (skip < 0) {
        skip = 0;
      }

     
      const defaultColumn = "Task Name"; 
      const defaultSortDirection = "asc"; 
const newid=localStorage.getItem("DepartmentTypeID")
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/assigntask/assignspec/${newid}`,
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
        setBGForm(paginatedData);
        setTotalRows(response.length);
      
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

  const handlePerRowsChange = async (newPerPage, page) => {
    // setPageNo(page);
    setPerPage(newPerPage);
  };
  const handleSort = (column, sortDirection) => {
    setcolumn(column.sortField);
    setsortDirection(sortDirection);
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
      name: 'Assign By',
      selector: (row) => row.assignedby,
      sortable: true,
    },
    {
      name: 'Document Name',
      selector: (row) => row.documentname,
      sortable: true,
    },
    {
      name: 'Department Types Name',
      selector: (row) => row.documentdepartmenttype.name,
      sortable: true,
    },
    {
      name: 'Task Name',
      selector: (row) => row.tasktypes.taskName,
      sortable: true,
    },
    {
      name: 'Document Type',
      selector: (row) => (row.documenttype === '' ? 'FormLink' : row.documenttype),
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
              // onClick={() => handleEdit(row._id)}
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
          <div
                                        className="flex-grow-1"
                                        style={{
                                          marginTop: "94px",
                                          marginLeft: "-64px",
                                        }}
                                      >
                                        <button
                                          type="button"
                                          className="btn btn-primary btn-icon waves-effect waves-light"
                                          onClick={() =>
                                            handleViewDocument(row)
                                          }
                                        >
                                       
                                          <Example
                                            selectedItem={selectedItem}
                                            handleClose={handleExampleClose}
                                          />
                                        </button>
                                      </div>
        </div>
      ),
    },
  ];
  useEffect(() => {
    fetchAssignTask();
  }, [pageNo, perPage, column, sortDirection,]);
  useEffect(() => {
    fetchAssignTask();
  }, [currentPage, itemsPerPage, column, sortDirection]);
  return (
    <>
      <ToastContainer closeButton={false} />
      <DeleteModal
        show={deleteModal}
        isLoading={isDeletebuttonLoading}
        onDeleteClick={() => handleDeleteAssignTask()}
        onCloseClick={() => setDeleteModal(false)}
      />
      <UiContent />
      <div className="page-content">
        <Container fluid={true}>
        <div className="row">
  <div className="col-12">
    <div className="page-title-box d-sm-flex align-items-center justify-content-between">
    <h4 className="mb-0">Add Assign Task</h4>
      <div className="d-flex align-items-center" style={{marginLeft:"850px"}}>
     

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
        <Link to="/assign-task" >
        <button className="custom_hover btn btn-primary btn-color" type="submit" style={{ display: 'flex' }}>
          <i className="ri-add-line me-1 mb"></i>Add Assign Task
          </button>
        </Link>
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
          {/* 9.20 to 14:30  */}
          <Row>
            <Col xl={12}>
              <Card>
              
              <div class="card-header align-items-center d-flex card-body">
                                    <h4 class="card-title mb-0 flex-grow-1">Assign Task Details</h4>  </div>
                                    <br />
                                    <br />
                                    <br />
               
                <CardBody>
                  <div className="live-preview">
                    <SearchComponent searchList={searchList} />
                    <div className="table-responsive">
                      {/* <Table className="align-middle table-nowrap mb-0">
                        <thead className="table-light">
                          <tr>
                           
                            <th scope="col">
                              <br />
                              ID
                            </th>{" "}
                            <th scope="col">
                              <br />
                              Assigned By
                            </th>
                            <th scope="col">
                              Document
                              <br></br> Name
                            </th>
                            <th scope="col">
                              Document
                              <br></br> Department
                              <br />
                              Type
                            </th>
                            <th scope="col">Task Type</th>
                            <th scope="col">Document Type</th>
                            <th scope="col">Access Location</th>
                            <th scope="col">Status</th>
                            <th scope="col">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentItems &&
                            currentItems.length > 0 &&
                            currentItems.map((type, index) => {
                              return (
                                <tr key={type._id}>
                                  <td>{index + 1}</td>
                                  <td>{type.assignedby}</td>
                                  <td>{type.documentname}</td>

                                  <td>{type.documentdepartmenttype.name}</td>
                                  <td>{type.tasktypes.taskName}</td>
                                  <td>
                                    {" "}
                                    {type.documenttype === ""
                                      ? "FormLink"
                                      : type.documenttype}
                                  </td>
                                  <td>
                                    {" "}
                                    {!type.departmentGroup.length
                                      ? "No"
                                      : "Yes"}
                                  </td>

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

                                      <div
                                        className="flex-grow-1"
                                        style={{
                                          marginTop: "94px",
                                          marginLeft: "-81px",
                                        }}
                                      >
                                        <button
                                          type="button"
                                          className="btn btn-primary btn-icon waves-effect waves-light"
                                          onClick={() =>
                                            handleViewDocument(type)
                                          }
                                        >
                                       
                                          <Example
                                            selectedItem={selectedItem}
                                            handleClose={handleExampleClose}
                                          />
                                        </button>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </Table> */}
                    </div>
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
          {/* <nav>
            <ul className="pagination">
              {task && task.length > itemsPerPage && (
                <>
                  <li
                    className={`page-item ${
                      currentPage === 1 ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                  </li>
                  {Array.from(
                    { length: Math.ceil(task.length / itemsPerPage) },
                    (_, i) => i + 1
                  ).map((pageNumber) => (
                    <li
                      key={pageNumber}
                      className={`page-item ${
                        currentPage === pageNumber ? "active" : ""
                      }`}
                    >
                      <button
                        onClick={() => paginate(pageNumber)}
                        className="page-link"
                      >
                        {pageNumber}
                      </button>
                    </li>
                  ))}
                  <li
                    className={`page-item ${
                      currentPage === Math.ceil(task.length / itemsPerPage)
                        ? "disabled"
                        : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => paginate(currentPage + 1)}
                      disabled={
                        currentPage === Math.ceil(task.length / itemsPerPage)
                      }
                    >
                      Next
                    </button>
                  </li>
                </>
              )}
            </ul>
          </nav> */}
         
        </Container>
      </div>
    </>
  );
};

export default AssignMaster;
