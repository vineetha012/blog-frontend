import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom'
import { Blogcontext } from "./context";
export const Nav = () => {
    const navigate = useNavigate()
    const { isauthentiacated, setisauthenticated } = useContext(Blogcontext)
    const logouthandler = (e) => {
        setisauthenticated(false)
        navigate('/')
        localStorage.clear()
    }
    return (
        <div className="NavBar">
            <div className="logo">
                <i className="fa fa-italic" aria-hidden="true" style={{ fontSize: "25px", color: "white", border: "1px solid white", borderRadius: "5px", padding: "3px", height: "23px" }}></i>
                <div style={{ color: "white", marginLeft: "10px" }}>INSTA CLONE APP</div>
            </div>
            <div className="buttons">
                <button onClick={() => navigate('/home')}>home</button>
                <button onClick={() => navigate('/postBlog')}>Create Blog</button>
                <button type="button" onClick={(e) => logouthandler(e)}>logout</button>

            </div>
        </div>
    )
}