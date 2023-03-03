import { useContext, useState } from "react"
import { Blogcontext } from "./context"
import axios from "axios"
import { Nav } from "./Nav"

const url = "http://localhost:5001"
export const Details = () => {
    const [comment, setComment] = useState("")
    const { blogdtail, setBlogdetail, Blogs, setBlogs } = useContext(Blogcontext)
    const addComment = async (e) => {
        let id = e.target.id
        if (comment) {
            let response = await axios.put(`${url}/blogs/put/${id}`, { "comment": comment })
            setBlogdetail(response.data)
        }
        else {
            alert("please provide the comment")
        }
    }

    return (
        <>
            <Nav />
            {
                blogdtail ? (
                    <div className="cols details">
                        <div style={{ textAlign: "center" }}>Post Details</div>
                        <div className="rows">
                            <div className="left">
                                <div className="Title  upper">Title :{blogdtail.title}</div>
                                <img src={blogdtail.Image} width="300px" height={"400px"} />
                                <div className="rows bottom detail-bottom">
                                    <i className="fa fa-paper-plane" aria-hidden="true" id={blogdtail._id} style={{ color: "white" }}></i>
                                    <div style={{ color: "white" }}>post:{blogdtail.created_at}</div>
                                    <div className="rows comments">
                                        <i className="fa fa-comment" style={{ fontSize: "25px", color: "white" }}></i>
                                        <div className="round">{(blogdtail.comments).length}</div>
                                    </div>
                                </div>
                                <div className="desc description">Description : {blogdtail.Description}</div>
                            </div>
                            <div className="right">
                                <h1 style={{ textAlign: "center" }}>Comments</h1>
                                <form>
                                    <input className="comment-input" type='text' onChange={(e) => setComment(e.target.value)} placeholder="Type Comment.." />
                                    <button type="button" onClick={(e) => addComment(e)} id={blogdtail._id} className="sendButton">
                                        <i className="fa fa-paper-plane" aria-hidden="true" id={blogdtail._id}></i>
                                    </button>
                                </form>
                                {
                                    (blogdtail.comments) ? (blogdtail.comments).map((comment, index) => {
                                        return (
                                            <div key={index} className="comment-cont">
                                                <div className="main-comment">{comment}</div>
                                            </div>
                                        )
                                    })
                                        : ""
                                }

                            </div>

                        </div>
                    </div>

                ) : ""
            }
        </>
    )
}