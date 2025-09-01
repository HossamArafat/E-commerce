import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../CSS/components/bars.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Menu } from "../../Context/MenuContext";
import { WindowSize } from "../../Context/WindowContext";
import { NavLinks } from "./NavLinks";
import { USER } from "../../API/Api";
import { customAxios } from "../../API/CustomAxios";

export default function SideBar() {
  // States
  const {isOpen, setIsOpen} = useContext(Menu);
  const [user, setUser] = useState('') 
  const navigate = useNavigate();

  const windowSize = useContext(WindowSize);
  const width = windowSize.width;

  useEffect(()=>{
    if(width < 768) {
      setIsOpen(false)
    }
    customAxios.get(`${USER}`)
    .then((data) => setUser(data.data))
    .catch((err) => {
        console.log(err)
        navigate('/login')
    })
    }, [])
  return (
    <>
      <div
        className="side-bar pt-3"
        style={{
          minWidth: "fit-content",
          width: isOpen ? "250px" : "fit-content",
          transition: "width 0.3s",
          left: width < 768 ? (isOpen ? "-100%" : 0 ) : 0,
        }}
      >
        {NavLinks.map((navLink, index) => (
          navLink.role.includes(user.role) && (
          <NavLink
            key={index}
            to={navLink.path}
            className="d-flex align-items-center gap-2 side-bar-link"
          >
            <FontAwesomeIcon icon={navLink.icon} />
            <p className="m-0" style={{ display: isOpen ? "block" : "none" }}>
              {navLink.name}
            </p>
          </NavLink>
        )))}
      </div>
    </>
  );
}
