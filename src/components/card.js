import React, { useContext } from "react"
import { useNavigate } from 'react-router-dom'
import { Blogcontext } from "./context"
export const Card = ({ blog }) => {
    const navigate = useNavigate()
    const { blogdtail, setBlogdetail } = useContext(Blogcontext)
    const showDetails = (e) => {
        setBlogdetail(e)
        navigate('/details')
    }
    return (
        <>
            <div className="" onClick={() => showDetails(blog)} id={blog.id}>
                <div className="rows upper">
                    <div>Title :{blog.title}</div>
                    <div className="date">{blog.created_at}</div>
                </div>

                <img src={blog.Image} width="300px" height="350px" />
                <div className="description">{blog.Description}</div>
                <div  className="rows bottom">
                    <i className="fa fa-paper-plane" aria-hidden="true" id={blog._id}></i>
                    <div className="rows comments">
                        <i className="fa fa-comment" style={{ fontSize: "25px" }}></i>
                        <div className="round">{(blog.comments).length}</div>
                    </div>

                </div>
            </div>
        </>
    )
}