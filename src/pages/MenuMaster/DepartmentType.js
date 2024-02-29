import React,{useState,useEffect,useContext} from "react";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import UiContent from "../../Components/Common/UiContent";
import PreviewCardHeader from "../../Components/Common/PreviewCardHeader";
import { Link } from "react-router-dom";
import logo from "../../assets/images/brands/slack.png";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../common/DeleteModal";
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
import SignContext from "../../contextAPI/Context/SignContext";

const DepartmentType = () => {
  const navigate=useNavigate();
  const [deptype,setdeptype]=useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedForUpdate, setselectedForUpdate] = useState(null);
  const [isDeletebuttonLoading, setIsDeletebuttonLoading] = useState(false);
  const [originalDepType, setOriginalDepType] = useState(null);
  const {GetallDepartmentType,deletetype} = useContext(SignContext);
  const getalldeptype = async () => {
    const response = await GetallDepartmentType();


    setOriginalDepType(response.data)
    setdeptype(response.data);
  };

  // const handleDelete=async(id)=>{
  //   const abc=window.confirm('Are you sure you want to delete')
  //   if(abc){
  //   const res=await deletetype(id);
  //   getalldeptype();
  //     }    
  //   console.log(">>",id)
  // }
  const handleDelete = (previewImage) => {
    setselectedForUpdate(previewImage);
    setDeleteModal(true);
  };

  const handleDeleteDepartmentType = async () => {
    if (selectedForUpdate) {
      setIsDeletebuttonLoading(true);

      try {
        await deletetype(selectedForUpdate);
        getalldeptype();
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

    navigate(`/edit-deptype/${id}`)
  }

  useEffect(() => {
    getalldeptype();
  }, []);
  const searchList = (e) => {
    let inputVal = e.toLowerCase();
    let filterData = originalDepType.filter(
      (el) =>
        el.name.toLowerCase().indexOf(inputVal) !== -1 ||
        el.isActive.toString().toLowerCase().indexOf(inputVal) !== -1
    );
    setdeptype(filterData);
  };
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
          <BreadCrumb title="Form Validation" pageTitle="Forms" />

          <Row>
            <Col xl={12}>
              <Card>
                

                <div className="d-flex flex-wrap justify-content-between align-items-center">
                  <PreviewCardHeader title="Department Type" />
                  <div className="mt-3 mb-2">
                    {/* <Link to='/add-dtype'><button className="btn btn-primary" type="submit" style={{marginRight:'9px'}}>
                      Add Department Type
                    </button>
                    </Link> */}
                  </div>
                </div>
                <CardBody>
                  <div className="live-preview">
                  <SearchComponent searchList={searchList}  />
                    <div className="table-responsive">
                      <Table className="align-middle table-nowrap mb-0">
                        <thead className="table-light">
                          <tr>
                            <th scope="col">ID</th>

                            <th scope="col">Department Group Name</th>
                            <th scope="col">Department Type Name</th>
                            <th scope="col">Status</th>
                            <th scope="col">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {deptype &&
                            deptype.length > 0 &&
                            deptype.map((type, index) => {
                              return (
                                <tr key={type._id}>
                                  <td>DT:{index+1}</td>
                                  <td>{type.departmentGroup.name}</td>
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

export default DepartmentType;

