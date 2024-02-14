import React,{useState,useEffect,useContext} from "react";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import UiContent from "../../Components/Common/UiContent";
import PreviewCardHeader from "../../Components/Common/PreviewCardHeader";
import { Link } from "react-router-dom";
import logo from "../../assets/images/brands/slack.png";
import { useNavigate } from "react-router-dom";
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
const AdminUser = () => {
  const navigate=useNavigate();
  const { GetallAdminname,Deleteadmin } = useContext(SignContext);
  const [adminData, setAdminData] = useState(null);
  const [allimage, setallImage] = useState(null);
   const handleDelete=async(id)=>{
        console.log(">>id",id);
      
      const abc=window.confirm("Are you sure you want to delete");
      if(abc){
      const res= await Deleteadmin(id);
      getAdmin()
      console.log(res);
      }
  }
  function getImage() {
  fetch(`${process.env.REACT_APP_BASE_URL}/adminname/getadminnames`, {
   method: "GET",

  })
    .then((res) => res.json())
    .then((data) =>setallImage(data.data))
}
  const baseURL = `${process.env.REACT_APP_BASE_URL}`;

  const getAdmin = async () => {
    try {
      const res = await GetallAdminname();
      console.log(res);
      setAdminData(res.data);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    }
  };
    const handleEdit=async(id)=>{
         console.log(id);
         navigate( `/edit-admin/${id}`)
  }

  useEffect(() => {
    getAdmin();
  }, []);
  useEffect(() => {
    getImage();
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
                {/* <div className="d-flex">
                  <PreviewCardHeader title="User Detail" />
                  <button className="btn btn-primary float-end mt-3 mb-2 " type="submit" style={{marginLeft:'880px'}} >Add Admin User</button>
                </div> */}

                <div className="d-flex flex-wrap justify-content-between align-items-center">
                  <PreviewCardHeader title="Admin User" />
                  <div className="mt-3 mb-2">
                    <Link to='/add-user'><button className="btn btn-primary" type="submit" style={{marginRight:'9px'}}>
                      Add Admin User
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
                            {/* <th scope="col" style={{ "width": "42px" }}>
                                                            <div className="form-check">
                                                                <Input className="form-check-input" type="checkbox" defaultValue="" id="responsivetableCheck" />
                                                                <Label className="form-check-label" for="responsivetableCheck"></Label>
                                                            </div>
                                                        </th> */}
                            <th scope="col">ID</th>
                            <th scope="col">Image</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email|Password</th>
                            <th scope="col">Role</th>
                            <th scope="col">Status</th>
                            <th scope="col">location</th>
                            <th scope="col">Group</th>
                            <th scope="col">Type</th>
                            <th scope="col">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
  {adminData &&
    adminData.length > 0 &&
    adminData.map((admin, index) => (
      <tr key={admin._id}>
        <td>{index + 1}</td>
        <td><td>{admin.image ? <img src={`${baseURL}/${admin.image}`} alt="Admin"  style={{ height: '50px', width: '50px'}} /> : 'No Image'}</td></td>
        <td>{admin.name}</td>
        <td>{`${admin.email} | ${admin.password}`}</td>
        <td>{admin.roles && admin.roles.role}</td>
        <td>
          {admin.status ? (
            <span className="badge bg-success">Active</span>
          ) : (
            <span className="badge bg-danger">Inactive</span>
          )}
        </td>
         <td>{admin.location && admin.location.name}</td>
      <td>{admin.departmentGroup && admin.departmentGroup.name}</td>
      <td>{admin.departmentType && admin.departmentType.name}</td>
        <td>
          <div className="d-flex gap-2 align-items-center">
            <div className="flex-shrink-0">
              <button
                type="button"
                className="btn btn-success btn-icon waves-effect waves-light"
                onClick={()=>handleEdit(admin._id)}
              >
                <i className="ri-pencil-fill"></i>
              </button>
            </div>
            <div className="flex-grow-1">
              <button
                type="button"
                onClick={() => handleDelete(admin._id)}
                className="btn btn-danger btn-icon waves-effect waves-light"
              >
                <i className="ri-delete-bin-5-line"></i>
              </button>
            </div>
          </div>
        </td>
      </tr>
    ))}
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

export default AdminUser;
