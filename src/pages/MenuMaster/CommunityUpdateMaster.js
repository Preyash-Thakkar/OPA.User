// import React, { useState, useEffect, useContext } from "react";
// import BreadCrumb from "../../Components/Common/BreadCrumb";
// import UiContent from "../../Components/Common/UiContent";
// import PreviewCardHeader from "../../Components/Common/PreviewCardHeader";
// import { Link } from "react-router-dom";
// import logo from "../../assets/images/brands/slack.png";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import SignContext from "../../contextAPI/Context/SignContext";
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

// const baseURL = `${process.env.REACT_APP_BASE_URL}`;

// const CommunityUpdateMaster = () => {
//   const navigate = useNavigate();
//   const [deleteModal, setDeleteModal] = useState(false);
//   const [selectedForUpdate, setselectedForUpdate] = useState(null);
//   const [isDeletebuttonLoading, setIsDeletebuttonLoading] = useState(false);
//   const [originalcommunityrequireddetails, setoriginalcommunityrequireddetails] = useState([]);
//   const [itemsPerPage] = useState(5);
//   const { getReqCommDetails, DeleteCommunityMaster } = useContext(SignContext);
  
//   const [currentPage, setCurrentPage] = useState(1);

//   const [communityrequireddetails, setcommunityrequireddetails] =
//     useState([]);

// const id=localStorage.getItem("EmployeeNameID")
//   const getreqcommdetails = async () => {
//     const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/communitymaster/getrequiredcommunitymessagebynames/${id}`);
// console.log(res.data)
//     setcommunityrequireddetails(res.data);
//     setoriginalcommunityrequireddetails(res.data)
//   };


//   // const handleDelete = async (id) => {
//   //   console.log(id);
//   //   const abc = window.confirm("Are you sure you want to delete");
//   //   if (abc) {
//   //     const res = await DeleteCommunityMaster(id);
//   //     console.log("The id isss", id);
//   //     getreqcommdetails();
//   //   }
//   //   console.log(">>", id);
//   // };
//   const handleDelete = (previewImage) => {
//     setselectedForUpdate(previewImage);
//     setDeleteModal(true);
//   };

//   const handleDeleteDepartmentType = async () => {
//     if (selectedForUpdate) {
//       setIsDeletebuttonLoading(true);

//       try {
//         await DeleteCommunityMaster(selectedForUpdate);
//         getreqcommdetails();
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

//     navigate(`/edit-communitymaster/${id}`);
//   };

//   useEffect(() => {
//     // Set a delay for the execution
   
//       getreqcommdetails();
//     }, []); // Delay the execution for 5000 milliseconds (5 seconds)

  
//   const searchList = (e) => {
//     let inputVal = e.toLowerCase();
//     let filterData = originalcommunityrequireddetails.filter(
//       (el) =>
//         el.name.toLowerCase().indexOf(inputVal) !== -1 ||
//         el.message.toString().toLowerCase().indexOf(inputVal) !== -1
//     );
//     setcommunityrequireddetails(filterData);
//   };
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = communityrequireddetails.slice(indexOfFirstItem, indexOfLastItem);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);
//   return (
//     <><ToastContainer closeButton={false} />
//     <DeleteModal
//       show={deleteModal}
//       isLoading={isDeletebuttonLoading}
//       onDeleteClick={() => handleDeleteDepartmentType()}
//       onCloseClick={() => setDeleteModal(false)}
//     />
//       <UiContent />
//       <div className="page-content">
//         <Container fluid={true}>
//         <div className="row">
//   <div className="col-12">
//     <div className="page-title-box d-sm-flex align-items-center justify-content-between">
//       <div className="d-flex align-items-center">
//         <h4 className="mb-0" >Community Update Master</h4>
        
//       </div>
//       <div className="page-title-right">
//         <div className="form-check d-inline-block mb-0">
//           <input className="form-check-input" type="checkbox" id="formCheck1" style={{ visibility: 'hidden' }} />
//           {/* <label className="form-check-label" htmlFor="formCheck1">
//             <img src="pin.png" style={{ width: '40px', marginRight: '10px' }} />
//           </label> */}
//         </div>
//       </div>
//     </div>
//   </div>
// </div>

//           <Row>
//             <Col xl={14}>
//               <Card>
//               <div class="card-header align-items-center d-flex card-body">
//                                     <h4 class="card-title mb-0 flex-grow-1">Community Update Master Details</h4>  </div>
//                                     <br />
//                                     <br />
//                                     <br />
//                 <CardBody>
//                   <div className="live-preview">
//                   <SearchComponent searchList={searchList}  />
//                     <div className="table-responsive">
//                       <Table className="align-middle table-nowrap mb-0 table-with-border">
//                         <thead className="table-light">
//                           <tr>
//                             <th scope="col" style={{ backgroundColor: '#185abc', color: 'white',borderRight: '1px solid lightgray' }}>ID</th>

//                             <th scope="col" width="12px" style={{ backgroundColor: '#185abc', color: 'white',borderRight: '1px solid lightgray' }}>
//                               Uploaded Images
//                             </th>
//                             <th scope="col" width="20px" style={{ backgroundColor: '#185abc', color: 'white',borderRight: '1px solid lightgray' }}>
//                               Community Title
//                             </th>
//                             <th scope="col" style={{ backgroundColor: '#185abc', color: 'white',borderRight: '1px solid lightgray' }}>Community Message</th>
//                             <th scope="col" style={{ backgroundColor: '#185abc', color: 'white',borderRight: '1px solid lightgray' }}>Status</th>
//                             <th scope="col" style={{ backgroundColor: '#185abc', color: 'white',borderRight: '1px solid lightgray' }}>Actions</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {currentItems.map((type, index) => {
//                               return (
//                                 <tr key={type._id}>
//                                   <td style={{borderRight: '1px solid lightgray'}}>{index + 1}</td>
//                                   <td style={{borderRight: '1px solid lightgray'}}>
//                                     {type.uploadimage ? (
//                                       <img
//                                         src={`${baseURL}/${type.uploadimage}`}
//                                         alt="Admin"
//                                         style={{
//                                           height: "50px",
//                                           width: "50px",
//                                         }}
//                                       />
//                                     ) : (
//                                       "No Image"
//                                     )}
//                                   </td>
//                                   <td style={{borderRight: '1px solid lightgray'}}>{type.name}</td>
//                                   <td style={{borderRight: '1px solid lightgray'}}>{type.message}</td>
//                                   <td style={{ padding: "15px",borderRight: '1px solid lightgray' }}>
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
//                                   <td style={{borderRight: '1px solid lightgray'}}>
//                                     <div className="d-flex gap-2 align-items-center">
//                                       <div className="flex-shrink-0">
//                                         <button
//                                           type="button"
//                                           className="btn btn-success btn-icon waves-effect waves-light"
//                                           onClick={() => handleEdit(type._id)}
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
//                                     </div>
//                                   </td>
//                                 </tr>
//                               );
//                             })}
//                         </tbody>
//                       </Table>
//                     </div>
//                     <nav>
//                       <ul className="pagination">
//                         {Array.from(
//                           { length: Math.ceil(communityrequireddetails.length / itemsPerPage) },
//                           (_, i) => (
//                             <li
//                               key={i}
//                               className={`page-item ${
//                                 currentPage === i + 1 ? "active" : ""
//                               }`}
//                             >
//                               <button
//                                 className="page-link"
//                                 onClick={() => paginate(i + 1)}
//                               >
//                                 {i + 1}
//                               </button>
//                             </li>
//                           )
//                         )}
//                       </ul>
//                     </nav>
//                   </div>
//                 </CardBody>
//               </Card>
//             </Col>
//           </Row>
//         </Container>
//       </div>
//     </>
//   );
// };

// export default CommunityUpdateMaster;
import React, { useState, useEffect, useContext } from "react";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import UiContent from "../../Components/Common/UiContent";
import PreviewCardHeader from "../../Components/Common/PreviewCardHeader";
import { Link } from "react-router-dom";
import logo from "../../assets/images/brands/slack.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SignContext from "../../contextAPI/Context/SignContext";
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

// const baseURL = ${process.env.REACT_APP_BASE_URL};

const CommunityUpdateMaster = () => {
  const navigate = useNavigate();
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedForUpdate, setselectedForUpdate] = useState(null);
  const [isDeletebuttonLoading, setIsDeletebuttonLoading] = useState(false);
  const [originalcommunityrequireddetails, setoriginalcommunityrequireddetails] = useState([]);
  const [itemsPerPage] = useState(5);
  const { getReqCommDetails, DeleteCommunityMaster } = useContext(SignContext);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [pageNo, setPageNo] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [column, setcolumn] = useState();
  const [sortDirection, setsortDirection] = useState();
  const [BGForm, setBGForm] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [pinnedItems, setPinnedItems] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [communityrequireddetails, setcommunityrequireddetails] =
    useState([]);

const id=localStorage.getItem("EmployeeNameID")
  const getreqcommdetails = async () => {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/communitymaster/getrequiredcommunitymessagebynames/${id}`);

    setcommunityrequireddetails(res.data);
    setoriginalcommunityrequireddetails(res.data)
    // setBGForm(res.data);
    console.log(res.data);
  };


  // const handleDelete = async (id) => {
  //   console.log(id);
  //   const abc = window.confirm("Are you sure you want to delete");
  //   if (abc) {
  //     const res = await DeleteCommunityMaster(id);
  //     console.log("The id isss", id);
  //     getreqcommdetails();
  //   }
  //   console.log(">>", id);
  // };
  const handleDelete = (previewImage) => {
    setselectedForUpdate(previewImage);
    setDeleteModal(true);
  };

  const handleDeleteDepartmentType = async () => {
    if (selectedForUpdate) {
      setIsDeletebuttonLoading(true);

      try {
        await DeleteCommunityMaster(selectedForUpdate);
        getreqcommdetails();
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

    navigate(`/edit-communitymaster/${id}`);
  };

  useEffect(() => {
    // Set a delay for the execution
    const timer = setTimeout(() => {
      getreqcommdetails();
    }, 5000); // Delay the execution for 5000 milliseconds (5 seconds)

    return () => clearTimeout(timer);
  }, []);
  const searchList = (e) => {
    let inputVal = e.toLowerCase();
    let filterData = originalcommunityrequireddetails.filter(
      (el) =>
        el.name.toLowerCase().indexOf(inputVal) !== -1 ||
        el.message.toString().toLowerCase().indexOf(inputVal) !== -1
    );
    setcommunityrequireddetails(filterData);
    setBGForm(filterData);
    setTotalRows(filterData.length);
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  //const currentItems = communityrequireddetails.slice(indexOfFirstItem, indexOfLastItem);

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
    const checked = event.target.checked; // Get the new checked state directly from the event
    setIsChecked(checked);

    const userID = localStorage.getItem("EmployeeNameID");
    const cleanedUserID = userID.trim().replace(/^["']+|["']+$/g, "");
    // Assuming this is the ID you want to update
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/pin/updateCommunityUpdateMaster/${cleanedUserID}`,
        {
          CommunityUpdateMaster: checked, // Use the new checked state here for CommunityUpdateMaster
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
  const fetchCommunity = async () => {
    try {
      setLoading(true);
      let skip = (pageNo - 1) * perPage;
      if (skip < 0) {
        skip = 0;
      }

      const defaultColumn = "community name";
      const defaultSortDirection = "asc";
const newid=localStorage.getItem("EmployeeNameID")
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/communitymaster/listspeccommmaster/${id}`,
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
  const handleSort = (column, sortDirection) => {
    setcolumn(column.sortField);
    setsortDirection(sortDirection);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    // setPageNo(page);
    setPerPage(newPerPage);
  };
  const renderImage = (uploadimage) => {
    const imageUrl = `${process.env.REACT_APP_BASE_URL}/${uploadimage}`;
    return (
      <img
        src={imageUrl}
        alt="Image"
        style={{ width: "75px", height: "75px" }}
      />
    );
  };

  const columns = [
    {
      name: "ID",
      selector: (_, index) => `${index + 1}`,
      sortable: true,
      style: {
        fontWeight: "bold",
      },
      className: "table-light",
    },
    {
      name: "Image",
      selector: (row) => renderImage(row.uploadimage),
      sortable: true,
    },
    {
      name: "Community Name",
      selector: (row) => row.name,
      sortable: true,
    },

    {
      name: "Community Message",
      selector: (row) => row.message,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.isActive,
      sortable: true,
      cell: (row) =>
        row.isActive ? (
          <span className="badge bg-success">Active</span>
        ) : (
          <span className="badge bg-danger">Inactive</span>
        ),
    },

    {
      name: "Actions",
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
    fetchCommunity();
  }, [pageNo, perPage, column, sortDirection]);
  useEffect(() => {
    fetchCommunity();
  }, [currentPage, itemsPerPage, column, sortDirection]);
  return (
    <><ToastContainer closeButton={false} />
    <DeleteModal
      show={deleteModal}
      isLoading={isDeletebuttonLoading}
      onDeleteClick={() => handleDeleteDepartmentType()}
      onCloseClick={() => setDeleteModal(false)}
    />
      <UiContent />
      <div className="page-content">
        <Container fluid={true}>
        <div className="row">
  <div className="col-12">
    <div className="page-title-box d-sm-flex align-items-center justify-content-between">
    <h4 className="mb-0">Community Update Master</h4>
      <div className="d-flex align-items-center" style={{marginLeft:"710px"}}>
     

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
        <Link to="/add-community" >
        <button className="custom_hover btn btn-primary btn-color" type="submit" style={{ display: 'flex' }}>
          <i className="ri-add-line me-1 mb"></i>Add Community Update
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

          <Row>
            <Col xl={14}>
              <Card>
              <div class="card-header align-items-center d-flex card-body">
                                    <h4 class="card-title mb-0 flex-grow-1">Community Details</h4>  </div>
                                    <br />
                                    <br />
                                    <br />
                <CardBody>
                  <div className="live-preview">
                  <SearchComponent searchList={searchList}  />
                    <div className="table-responsive">
                      {/* <Table className="align-middle table-nowrap mb-0">
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
                          {currentItems.map((type, index) => {
                              return (
                                <tr key={type._id}>
                                  <td>{index + 1}</td>
                                  <td>
                                    {type.uploadimage ? (
                                      <img
                                        src={${baseURL}/${type.uploadimage}}
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
                      </Table> */}
                    </div>
                    {/* <nav>
                      <ul className="pagination">
                        {Array.from(
                          { length: Math.ceil(communityrequireddetails.length / itemsPerPage) },
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
                    </nav> */}
                    <DataTable className=" align-middle table-nowrap mb-0 table-with-border heading"
                      columns={columns}
                      data={BGForm}
                      progressPending={loading}
                      sortServer
                      pagination
                      paginationServer
                      paginationDefaultPage={currentPage}
                      paginationTotalRows={totalRows}
                      paginationRowsPerPageOptions={[
                        10,
                        20,
                        50,
                        100,
                        totalRows,
                      ]}
                      onChangeRowsPerPage={handlePerRowsChange}
                      onChangePage={handlePageChange}
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

export default CommunityUpdateMaster;
