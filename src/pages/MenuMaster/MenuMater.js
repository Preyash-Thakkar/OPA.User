import React, { useContext, useState, useEffect } from "react";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import UiContent from "../../Components/Common/UiContent";
import PreviewCardHeader from "../../Components/Common/PreviewCardHeader";
import { Link } from "react-router-dom";
import logo from "../../assets/images/brands/slack.png";
import SignContext from "../../contextAPI/Context/SignContext";
import DeleteModal from "../../common/DeleteModal";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import '../MenuMaster/1.css'
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

const MenuMater = () => {
  const { GetallMenuMaster, DeleteMenuMaster } = useContext(SignContext);
  const [menumaster, setmenumaster] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [originalMenuMaster, setOriginalMenuMaster] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedForUpdate, setselectedForUpdate] = useState(null);
  const [isDeletebuttonLoading, setIsDeletebuttonLoading] = useState(false);
  const [itemsPerPage] = useState(5);
  const navigate = useNavigate();
  const getallmenumaster = async () => {
    const res = await GetallMenuMaster();

    setmenumaster(res.data);
  };
  // const handleDelete = async (id) => {
  //   const abc1 = window.confirm("Are you sure you want to delete?");
  //   if (abc1) {
  //     const res = await DeleteMenuMaster(id);
  //     getallmenumaster();
  //   }
  // };
  const handleDelete = (previewImage) => {
    setselectedForUpdate(previewImage);
    setDeleteModal(true);
  };
  const handleDeleteAddTask = async () => {
    if (selectedForUpdate) {
      setIsDeletebuttonLoading(true);
  
      try {
        await DeleteMenuMaster(selectedForUpdate);
        getallmenumaster();
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
    navigate(`/edit-menu/${id}`);
  };
  useEffect(() => {
    getallmenumaster();
  }, []);
  const searchList = (e) => {
    let inputVal = e.toLowerCase();
    let filterData = originalMenuMaster.filter(
      (el) =>
        el.menuname.toLowerCase().indexOf(inputVal) !== -1 ||
        el.menugroup.toLowerCase().indexOf(inputVal) !== -1 ||
        el.isActive.toString().toLowerCase().indexOf(inputVal) !== -1
    );
    setmenumaster(filterData);
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = menumaster && menumaster.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  return (
    <>
    <ToastContainer closeButton={false} />
      <DeleteModal
        show={deleteModal}
        isLoading={isDeletebuttonLoading}
        onDeleteClick={() => handleDeleteAddTask()}
        onCloseClick={() => setDeleteModal(false)}
      />
      <UiContent />
      <div className="page-content">
        <Container fluid={true}>
        <div className="row">
  <div className="col-12">
    <div className="page-title-box d-sm-flex align-items-center justify-content-between">
       <div className="d-flex align-items-center">
        <h4 className="mb-0">Menu Master</h4>
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
                                    <h4 class="card-title mb-0 flex-grow-1">Menu Details</h4>  </div>
                                    <br />
                                    <br />
                                    <br />
                <CardBody>
                  <div className="live-preview">
                  <SearchComponent searchList={searchList}/>
                    <div className="table-responsive">
                      <Table className="align-middle table-nowrap mb-0 table-with-border">
                        <thead className="table-light">
                          <tr>
                            <th scope="col" style={{ backgroundColor: '#185abc', color: 'white',borderRight: '1px solid lightgray'}}>ID</th>
                            <th scope="col" style={{ backgroundColor: '#185abc', color: 'white',borderRight: '1px solid lightgray'}}>Name</th>
                            <th scope="col" style={{ backgroundColor: '#185abc', color: 'white',borderRight: '1px solid lightgray'}}>Menu Group </th>

                            <th scope="col" style={{ backgroundColor: '#185abc', color: 'white',borderRight: '1px solid lightgray'}}>Status</th>
                            <th scope="col" style={{ backgroundColor: '#185abc', color: 'white',borderRight: '1px solid lightgray'}}>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentItems.map((type, index) => {
                              return (
                                <tr key={type._id}>
                                  <td style={{borderRight: '1px solid lightgray'}}>{index + 1}</td>
                                  <td style={{borderRight: '1px solid lightgray'}}>{type.menuname}</td>
                                  <td style={{borderRight: '1px solid lightgray'}}>{type.menugroup}</td>
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
                                          // onClick={() => handleEdit(type._id)}
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
          <nav>
            <ul className="pagination">
              {menumaster && menumaster.length > itemsPerPage && (
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
                  {Array.from({ length: Math.ceil(menumaster.length / itemsPerPage) }, (_, i) => {
                    if (i < 10) {
                      return (
                        <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                          <button className="page-link" onClick={() => paginate(i + 1)}>{i + 1}</button>
                        </li>
                      );
                    }
                  })}
                  <li className={`page-item ${currentPage === Math.ceil(menumaster.length / itemsPerPage) ? 'disabled' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === Math.ceil(menumaster.length / itemsPerPage)}
                    >
                      Next
                    </button>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </Container>
      </div>
    </>
  );
};

export default MenuMater;
