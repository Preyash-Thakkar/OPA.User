import React ,{useState,useContext,useEffect}from "react";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import UiContent from "../../Components/Common/UiContent";
import PreviewCardHeader from "../../Components/Common/PreviewCardHeader";
import { Link } from "react-router-dom";
import logo from "../../assets/images/brands/slack.png";
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
const id = localStorage.getItem("DepartmentTypeID");


// console.log("type",typeof(id));
console.log(id);
// const parsedIdArray = JSON.parse(id);
const AddTaskMaster = () => {

  const navigate=useNavigate();
  const { GetallAddTask,DeleteAddTask } = useContext(SignContext);
  const [task, setTask] = useState(null);
//   const gettask = async () => {
//     try {
//       // Retrieve the data from localStorage
//       const idArrayString = localStorage.getItem("DepartmentTypeID");
//       console.log("details", idArrayString);
//       console.log("hdhd", typeof idArrayString);
  
//       // Ensure that idArrayString is a non-empty string
//       if (!idArrayString || typeof idArrayString !== "string") {
//         console.error("Error: DepartmentTypeID is not a valid string");
//         return;
//       }
  
//       // // Split the string into an array of IDs
// const parsedIdArray = idArrayString.split(',');

// console.log("type:", Array.isArray(parsedIdArray) ? "Array" : typeof(parsedIdArray));

  
//       // // Ensure that parsedIdArray is an array of strings
//       // if (!Array.isArray(parsedIdArray)) {
//       //   console.error("Error: DepartmentTypeID is not an array");
//       //   return;
//       // }
  
//       // Perform the axios GET request for each individual ID
//       const responseArray = await Promise.all(parsedIdArray.map(async (id) => {
//         return await axios.get(`${process.env.REACT_APP_BASE_URL}/addtask/getallspecifictaskbydtype/${id}`);
//       }));
  
//       // Combine or process the responses as needed
//       const combinedData = responseArray.reduce((accumulator, response) => {
//         return accumulator.concat(response.data);
//       }, []);
  
//       console.log(">>>");
//       console.log(combinedData);
  
//       // Set the task state with the combined data
//       setTask(combinedData);
//     } catch (error) {
//       console.error("Error fetching tasks:", error);
//       // Handle errors appropriately
//     }
//   };
// const gettask = async () => {
//   try {
//     // Retrieve the data from localStorage
//     const idArrayString = localStorage.getItem("DepartmentTypeID");

//     // Check if idArrayString is defined and not null
//     if (idArrayString) {
//       // Split the string into an array of IDs
//       const parsedIdArray = idArrayString.split(',');

//       // Perform the axios GET request for each individual ID
//       const responseArray = await Promise.all(parsedIdArray.map(async (id) => {
//         try {
//           // Perform the axios GET request for the individual ID
//           const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/addtask/getallspecifictaskbydtype/${id}`);
          
//           // Return the data if the request was successful
//           return response.data;
//         } catch (error) {
//           // Handle errors or empty responses appropriately
//           console.error(`Error fetching tasks for ID ${id}:`, error);
//           return []; // Return an empty array in case of error
//         }
//       }));

//       // Combine the responses using an OR operation
//       const combinedData = responseArray.reduce((accumulator, responseData) => {
//         // Perform OR operation between accumulator and responseData
//         // You need to define your own logic for OR operation based on your requirements
//         // For example, you might want to merge arrays or combine data in a different way
//         return accumulator || responseData;
//       }, []);

//       console.log("Combined data:", combinedData);

//       // Set the task state with the combined data
//       setTask(combinedData);
//     } else {
//       console.error("Error: DepartmentTypeID is undefined or null");
//     }
//   } catch (error) {
//     console.error("Error fetching tasks:", error);
//     // Handle errors appropriately
//   }
// };

  
  
  const gettask = async () => {
    // window.location.reload();
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/addtask/getallspecifictaskbydtype/${id}`);
    console.log(">>>");
    console.log(response.data);
    setTask(response.data);
  };
  const handleDelete=async (abc)=>{
    const abc1= window.confirm("Are you sure you want to delete?");
    if(abc1){  
    const res=await DeleteAddTask(abc);
    gettask();
    }

 }

 const handleEdit=async(id)=>{
  console.log(">>>id",id)
  navigate(`/edit-task/${id}`)
}
  useEffect(() => {
    gettask();
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
                  <PreviewCardHeader title="Add Task" />
                  <div className="mt-3 mb-2">
                    <Link to='/add-task'><button className="btn btn-primary" type="submit" style={{marginRight:'9px'}}>
                      Add Task
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
                            <th scope="col">ID</th>

                            <th scope="col">Department Types Name</th>
                            <th scope="col">Task Name </th>
                            <th scope="col">Task Types </th>
                            <th scope="col">Access Location</th>
                            <th scope="col">Status</th>
                            <th scope="col">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {task &&
                            task.length > 0 &&
                            task.map((type, index) => {
                              {/* window.location.reload();    */}
                              return (
                                <tr key={type._id}>
                                  <td>{index+1}</td>
                                  <td>{type.departmentType.name}</td>
                                  <td>{type.taskName}</td>
                                  <td>{type.taskType}</td>
                                  <td>{type.accessLocation}</td>
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
                                          onClick={() => handleEdit(type._id)}
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
        </Container>
      </div>
    </>
  );
};

export default AddTaskMaster;