// import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
// import { Collapse } from "reactstrap";
// import {Roles} from "../../pages/Authentication/Login";
// import { AiOutlineDashboard } from "react-icons/ai";
// import { AiFillAppstore } from "react-icons/ai";
// import { RiPagesLine } from "react-icons/ri";
// import { RiAccountCircleLine } from "react-icons/ri";
// import { IoFileTrayFullOutline } from "react-icons/io5";
// import { FaPencilAlt } from "react-icons/fa";
// // Import Data
// import navdata from "../LayoutMenuData";
// //i18n
// import { withTranslation } from "react-i18next";
// import withRouter from "../../Components/Common/withRouter";
// // const userRole = localStorage.getItem('Rights');
// console.log(typeof(Roles));



// const VerticalLayout = (props) => {
//   console.log("This Is Roles",Roles);
//   console.log("niceee",Roles);

// let isAdmin=false;
// if(Roles==="Admin"){
//   isAdmin=true;
// }
// console.log(isAdmin)
//   const [locationSetup, setLocationSetup] = useState(false);
//   const [product, setproduct] = useState(false);
//   const [category, setCategory] = useState(false);
//   const [subs, setSubs] = useState(false);
//   const [inquiry, setInquiry] = useState(false);
//   const [policy, setPolicy] = useState(false);
//   const [reports, setreports] = useState(false);
//   const [mediaManage, setMediaManage] = useState(false);

//   const navData = navdata().props.children;
//   const path = props.router.location.pathname;

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//     const initMenu = () => {
//       const pathName = process.env.PUBLIC_URL + path;
//       const ul = document.getElementById("navbar-nav");
//       const items = ul.getElementsByTagName("a");
//       let itemsArray = [...items]; // converts NodeList to Array
//       removeActivation(itemsArray);
//       let matchingMenuItem = itemsArray.find((x) => {
//         return x.pathname === pathName;
//       });
//       if (matchingMenuItem) {
//         activateParentDropdown(matchingMenuItem);
//       }
//     };
//     if (props.layoutType === "vertical") {
//       initMenu();
//     }
//   }, [path, props.layoutType]);

//   function activateParentDropdown(item) {
//     item.classList.add("active");
//     let parentCollapseDiv = item.closest(".collapse.menu-dropdown");

//     if (parentCollapseDiv) {
//       // to set aria expand true remaining
//       parentCollapseDiv.classList.add("show");
//       parentCollapseDiv.parentElement.children[0].classList.add("active");
//       parentCollapseDiv.parentElement.children[0].setAttribute(
//         "aria-expanded",
//         "true"
//       );
//       if (parentCollapseDiv.parentElement.closest(".collapse.menu-dropdown")) {
//         parentCollapseDiv.parentElement
//           .closest(".collapse")
//           .classList.add("show");
//         if (
//           parentCollapseDiv.parentElement.closest(".collapse")
//             .previousElementSibling
//         )
//           parentCollapseDiv.parentElement
//             .closest(".collapse")
//             .previousElementSibling.classList.add("active");
//         if (
//           parentCollapseDiv.parentElement
//             .closest(".collapse")
//             .previousElementSibling.closest(".collapse")
//         ) {
//           parentCollapseDiv.parentElement
//             .closest(".collapse")
//             .previousElementSibling.closest(".collapse")
//             .classList.add("show");
//           parentCollapseDiv.parentElement
//             .closest(".collapse")
//             .previousElementSibling.closest(".collapse")
//             .previousElementSibling.classList.add("active");
//         }
//       }
//       return false;
//     }
//     return false;
//   }

//   const removeActivation = (items) => {
//     let actiItems = items.filter((x) => x.classList.contains("active"));

//     actiItems.forEach((item) => {
//       if (item.classList.contains("menu-link")) {
//         if (!item.classList.contains("active")) {
//           item.setAttribute("aria-expanded", false);
//         }
//         if (item.nextElementSibling) {
//           item.nextElementSibling.classList.remove("show");
//         }
//       }
//       if (item.classList.contains("nav-link")) {
//         if (item.nextElementSibling) {
//           item.nextElementSibling.classList.remove("show");
//         }
//         item.setAttribute("aria-expanded", false);
//       }
//       item.classList.remove("active");
//     });
//   };

//   return (
//     <React.Fragment>
//       {/* menu Items */}
      

//      <li className="nav-item">
//         <Link className="ps-2 nav-link menu-link" to="/dashboard">
//           <span data-key="t-apps"> <AiOutlineDashboard className="fs-4"/> Dashboard </span>
//         </Link>
//       </li> 

//       <li className="nav-item">
//         <Link
//           className="ps-2 nav-link menu-link"
//           to="#"
//           data-bs-toggle="collapse"
//           onClick={() => {
//             setLocationSetup(!locationSetup);
//           }}
//         >
//           <span data-key="t-apps"><AiFillAppstore /> Setup </span>
//         </Link>
//         <Collapse
//           className="menu-dropdown"
//           isOpen={locationSetup}
//           //   id="sidebarApps"
//         >
//           <ul className="nav nav-sm flex-column test">
//             <li className="nav-item">
//               <Link to="/menumaster" className="nav-link">
             
//                 Menu Master
//               </Link>
//             </li>
//             {/* <li className="nav-item">
//               <Link to="/roles-responsibilty" className="nav-link">
//                 Roles & Responsibility
//               </Link>
//             </li> */}

//             {!isAdmin ? (
//                 <li className="nav-item">
//                 <Link to="/admin-user" className="nav-link">
//                   Admin User
//                 </Link>
//                 </li>
//                 ) : (null)
//             }
            
//           </ul>
//         </Collapse>
//       </li>

//       <li className="nav-item">
//         <Link
//           className="ps-2 nav-link menu-link"
//           to="#"
//           data-bs-toggle="collapse"
//           onClick={() => {
//             setCategory(!category);
//           }}
//         >
//           <span data-key="t-apps"><RiPagesLine />  Master</span>
//         </Link>
//         <Collapse
//           className="menu-dropdown"
//           isOpen={category}
//         >
//           <ul className="nav nav-sm flex-column test">
//             <li className="nav-item">
//               <Link className="ps-2 nav-link menu-link" to="/community-update">
//                 <span data-key="t-apps"> Community Update Master  </span>
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="ps-2 nav-link menu-link" to="/location-master">
//                 <span data-key="t-apps">Location Master</span>
//               </Link>
//             </li>
//           </ul>
//         </Collapse>
//       </li>

//       <li className="nav-item">
//         <Link
//           className="ps-2 nav-link menu-link"
//           to="#"
//           data-bs-toggle="collapse"
//           onClick={() => {
//             setproduct(!product);
//           }}
//         >
//           <span data-key="t-apps"><RiAccountCircleLine /> Department Master </span>
//         </Link>
//         <Collapse
//           className="menu-dropdown"
//           isOpen={product}
//           //   id="sidebarApps"
//         >
//           <ul className="nav nav-sm flex-column test">
//             <li className="new-nav nav-item">
//               <Link to="/department-group" className="nav-link">
//                 Department Group
//               </Link>
//             </li>
//           </ul>
//           <ul className="nav nav-sm flex-column test">
//             <li className="nav-item">
//               <Link to="/department-type" className="nav-link">
//                 Department Type
//               </Link>
//             </li>
//           </ul>
//           <ul className="nav nav-sm flex-column test">
//             <li className="nav-item">
//               <Link to="/employee-roles" className="nav-link">
//                 Employee Role
//               </Link>
//             </li>
//           </ul>
//           <ul className="nav nav-sm flex-column test">
//             <li className="nav-item">
//               <Link to="/employee-master" className="nav-link">
//                 Employee Master
//               </Link>
//             </li>
//           </ul>          
//         </Collapse>
//       </li>

//       <li className="nav-item">
//         <Link
//           className="ps-2 nav-link menu-link"
//           to="#"
//           data-bs-toggle="collapse"
//           onClick={() => {
//             setSubs(!subs);
//           }}
//         >
//           <span data-key="t-apps"><IoFileTrayFullOutline />Task Master </span>
//         </Link>
//         <Collapse
//           className="menu-dropdown"
//           isOpen={subs}
//         >
//            <ul className="nav nav-sm flex-column test">
//             <li className="nav-item">
//               <Link to="/add-taskmaster" className="nav-link">
//                 Add Task 
//               </Link>
//             </li>
//           </ul>
//           <ul className="nav nav-sm flex-column test">
//             <li className="nav-item">
//               <Link to="/assign-master" className="nav-link">
//                 Assign Master
//               </Link>
//             </li>
//           </ul>
//         </Collapse>
//       </li>

     

//       <li className="nav-item">
//         <Link className="ps-2 nav-link menu-link" to="/dashboard">
//           <span data-key="t-apps"><FaPencilAlt />CMS </span>
//         </Link>
//       </li>


//     </React.Fragment>
//   );
// };

// VerticalLayout.propTypes = {
//   location: PropTypes.object,
//   t: PropTypes.any,
// };

// export default withRouter(withTranslation()(VerticalLayout));
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Collapse } from "reactstrap";
import { Roles } from "../../pages/Authentication/Login";


// Import Data
import navdata from "../LayoutMenuData";
//i18n
import { withTranslation } from "react-i18next";
import withRouter from "../../Components/Common/withRouter";
// const userRole = localStorage.getItem('Rights');
console.log(typeof (Roles));
// console.log("<<<<<<<<<<<<<<<<<<<<<<<", dashboard)
let cms = "";
let departmenttype = "";
let menumaster = "";
let addtask = "";
let dashboard = ""
let communityupdatemaster = "";
let employeemaster = "";
let roless = "";
let assignmaster = "";
let locationmaster = "";
let employeerole = "";
let departmentgroup = "";


const VerticalLayout = (props) => {
  console.log("This Is Roles", Roles);
  console.log("niceee", Roles);
  console.log("1. " , roless)
  console.log("2. " , menumaster)
  
  // console.log(isAdmin)
  const [locationSetup, setLocationSetup] = useState(false);
  const [product, setproduct] = useState(false);
  const [category, setCategory] = useState(false);
  const [subs, setSubs] = useState(false);
  const [inquiry, setInquiry] = useState(false);
  const [policy, setPolicy] = useState(false);
  const [reports, setreports] = useState(false);
  const [mediaManage, setMediaManage] = useState(false);

  
  const [ismenumaster, setIsMenuMaster] = useState(true);
  const[iscms , setiscms] = useState(true);
  const[isdepartmenttype , setisdepartmenttype] = useState(true);
  const[isaddtask , setisaddtask] = useState(true);
  const[isdashboard , setisdashboard] = useState(true);
  const[iscommunityupdatemaster , setiscommunityupdatemaster] = useState(true);
  const[isemployeemaster , setisemployeemaster] = useState(true);
  const[isroless , setisroless] = useState(true);
  const[isassignmaster , setisassignmaster] = useState(true);
  const[islocationmaster , setislocationmaster] = useState(true);
  const[isemployeerole , setisemployeerole] = useState(true);
  const[isdepartmentgroup , setisdepartmentgroup] = useState(true);

  const navData = navdata().props.children;
  const path = props.router.location.pathname;

  useEffect(() => {
    

    window.scrollTo({ top: 0, behavior: "smooth" });
    const initMenu = () => {
      const pathName = process.env.PUBLIC_URL + path;
      const ul = document.getElementById("navbar-nav");
      const items = ul.getElementsByTagName("a");
      let itemsArray = [...items]; // converts NodeList to Array
      removeActivation(itemsArray);
      let matchingMenuItem = itemsArray.find((x) => {
        return x.pathname === pathName;
      });
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem);
      }
    };
    if (props.layoutType === "vertical") {
      initMenu();
    }
  }, [path, props.layoutType]);

  useEffect(() => {
    cms = localStorage.getItem('CMS');
    if (cms === 'false') {
      setiscms(false);
    }
    departmenttype = localStorage.getItem('DepartmentType');
    if (departmenttype === 'false') {
      setisdepartmenttype(false);
    }
    menumaster = localStorage.getItem('MenuMaster');
    if (menumaster === 'false') {
      setIsMenuMaster(false);
    }
    addtask = localStorage.getItem('AddTask');
    if (addtask === 'false') {
      setisaddtask(false);
    }
    dashboard = localStorage.getItem('Dashboard');
    if (dashboard === 'false') {
      setisdashboard(false);
    }
    communityupdatemaster = localStorage.getItem('CommunityUpdateMaster');
    if (communityupdatemaster === 'false') {
      setiscommunityupdatemaster(false);
    }
    employeemaster = localStorage.getItem('Employeemaster');
    if (employeemaster === 'false') {
      setisemployeemaster(false);
    }
  
   
      setisroless(false);
    
    assignmaster = localStorage.getItem('AssignMaster');
    if (assignmaster === 'false') {
      setisassignmaster(false);
    }
    locationmaster = localStorage.getItem('LocationMaster');
    if (locationmaster === 'false') {
      setislocationmaster(false);
    }
    employeerole = localStorage.getItem('EmployeeRole');
    if (employeerole === 'false') {
      setisemployeerole(false);
    }
    departmentgroup = localStorage.getItem('DepartmentGroup');
    if (departmentgroup === 'false') {
      setisdepartmentgroup(false);
    }

  },[]);



  function activateParentDropdown(item) {
    item.classList.add("active");
    let parentCollapseDiv = item.closest(".collapse.menu-dropdown");

    if (parentCollapseDiv) {
      // to set aria expand true remaining
      parentCollapseDiv.classList.add("show");
      parentCollapseDiv.parentElement.children[0].classList.add("active");
      parentCollapseDiv.parentElement.children[0].setAttribute(
        "aria-expanded",
        "true"
      );
      if (parentCollapseDiv.parentElement.closest(".collapse.menu-dropdown")) {
        parentCollapseDiv.parentElement
          .closest(".collapse")
          .classList.add("show");
        if (
          parentCollapseDiv.parentElement.closest(".collapse")
            .previousElementSibling
        )
          parentCollapseDiv.parentElement
            .closest(".collapse")
            .previousElementSibling.classList.add("active");
        if (
          parentCollapseDiv.parentElement
            .closest(".collapse")
            .previousElementSibling.closest(".collapse")
        ) {
          parentCollapseDiv.parentElement
            .closest(".collapse")
            .previousElementSibling.closest(".collapse")
            .classList.add("show");
          parentCollapseDiv.parentElement
            .closest(".collapse")
            .previousElementSibling.closest(".collapse")
            .previousElementSibling.classList.add("active");
        }
      }
      return false;
    }
    return false;
  }

  const removeActivation = (items) => {
    let actiItems = items.filter((x) => x.classList.contains("active"));

    actiItems.forEach((item) => {
      if (item.classList.contains("menu-link")) {
        if (!item.classList.contains("active")) {
          item.setAttribute("aria-expanded", false);
        }
        if (item.nextElementSibling) {
          item.nextElementSibling.classList.remove("show");
        }
      }
      if (item.classList.contains("nav-link")) {
        if (item.nextElementSibling) {
          item.nextElementSibling.classList.remove("show");
        }
        item.setAttribute("aria-expanded", false);
      }
      item.classList.remove("active");
    });
  };

  return (
    <React.Fragment>
      {/* menu Items */}

      {isdashboard ? (
        <li className="nav-item">
          <Link className="nav-link menu-link" to="/dashboard">
            <span data-key="t-apps"> Dashboard </span>
          </Link>
        </li>) : (null)}

      <li className="nav-item">
        <Link
          className="nav-link menu-link"
          to="#"
          data-bs-toggle="collapse"
          onClick={() => {
            setLocationSetup(!locationSetup);
          }}
        >
          <span data-key="t-apps"> Setup </span>
        </Link>
        <Collapse
          className="menu-dropdown"
          isOpen={locationSetup}
        //   id="sidebarApps"
        >
          <ul className="nav nav-sm flex-column test">
            {ismenumaster ? (
              <li className="nav-item">
                <Link to="/menumaster" className="nav-link">
                  Menu Master
                </Link>
              </li>) : (null)}

            {isroless ? (
              <li className="nav-item">
                <Link to="/roles-responsibilty" className="nav-link">
                  Roles & Responsibility
                </Link>
              </li>
            ) : (null)
            }



           
          </ul>
        </Collapse>
      </li>

      <li className="nav-item">
        <Link
          className="nav-link menu-link"
          to="#"
          data-bs-toggle="collapse"
          onClick={() => {
            setCategory(!category);
          }}
        >
          <span data-key="t-apps">  Master</span>
        </Link>
        <Collapse
          className="menu-dropdown"
          isOpen={category}
        >
          <ul className="nav nav-sm flex-column test">
            {iscommunityupdatemaster ? (
              <li className="nav-item">
                <Link className="nav-link menu-link" to="/community-update">
                  <span data-key="t-apps"> Community Update Master  </span>
                </Link>
              </li>) : (null)}

            {islocationmaster ? (
              <li className="nav-item">
                <Link className="nav-link menu-link" to="/location-master">
                  <span data-key="t-apps">Location Master</span>
                </Link>
              </li>) : (null)}

          </ul>
        </Collapse>
      </li>

      <li className="nav-item">
        <Link
          className="nav-link menu-link"
          to="#"
          data-bs-toggle="collapse"
          onClick={() => {
            setproduct(!product);
          }}
        >
          <span data-key="t-apps"> Department Master </span>
        </Link>
        <Collapse
          className="menu-dropdown"
          isOpen={product}
        //   id="sidebarApps"
        >
          <ul className="nav nav-sm flex-column test">
            {isdepartmentgroup ? (
              <li className="nav-item">
                <Link to="/department-group" className="nav-link">
                  Department Group
                </Link>
              </li>) : (null)}
          </ul>
          <ul className="nav nav-sm flex-column test">
            {isdepartmenttype ? (
              <li className="nav-item">
                <Link to="/department-type" className="nav-link">
                  Department Type
                </Link>
              </li>) : (null)}
          </ul>
          <ul className="nav nav-sm flex-column test">

            {isemployeerole ? (
              <li className="nav-item">
                <Link to="/employee-roles" className="nav-link">
                  Employee Role
                </Link>
              </li>) : (null)}
          </ul>
          <ul className="nav nav-sm flex-column test">
            {isemployeemaster ? (
              <li className="nav-item">
                <Link to="/employee-master" className="nav-link">
                  Employee Master
                </Link>
              </li>) : (null)}
          </ul>
        </Collapse>
      </li>

      <li className="nav-item">
        <Link
          className="nav-link menu-link"
          to="#"
          data-bs-toggle="collapse"
          onClick={() => {
            setSubs(!subs);
          }}
        >
          <span data-key="t-apps"> Task Master </span>
        </Link>
        <Collapse
          className="menu-dropdown"
          isOpen={subs}
        >
          <ul className="nav nav-sm flex-column test">
            {isaddtask ? (
              <li className="nav-item">
                <Link to="/add-taskmaster" className="nav-link">
                  Add Task
                </Link>
              </li>) : (null)}
          </ul>
          <ul className="nav nav-sm flex-column test">
            {isassignmaster ? (
              <li className="nav-item">
                <Link to="/assign-master" className="nav-link">
                  Assign Master
                </Link>
              </li>) : (null)}
          </ul>
        </Collapse>
      </li>



      {iscms ? (
        <li className="nav-item">
          <Link className="nav-link menu-link" to="/dashboard">
            <span data-key="t-apps">CMS </span>
          </Link>
        </li>) : (null)}


    </React.Fragment>
  );
};

VerticalLayout.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
};

export default withRouter(withTranslation()(VerticalLayout));