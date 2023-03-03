import { useState } from 'react'
import axios from 'axios'
import { postBlogs } from './apiUtils'
import { Nav } from './Nav'
import { useNavigate } from 'react-router-dom'
export const PostBlog = () => {
    const [title, setTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Image, setImage] = useState("")
    const [isloading, setIsloading] = useState(false)
    const navigate = useNavigate()
    const submitPost = () => {
        if (Image) {
            postBlogs(title, Image, Description)
                .then(res => {
                    console.log(res)

                }).catch(err => console.log(err))
        }
        else {
            alert("please select image..")
        }
        navigate('/home')
    }
    const imageHandler = (img) => {
        setIsloading(true)
        const formdata = new FormData()
        formdata.append("file", img)
        formdata.append("upload_preset", "blogs-app")
        axios.post("https://api.cloudinary.com/v1_1/dhtnrmzms/upload", formdata)
            .then(res => {
                setImage(res.data.url)
                setIsloading(false)
            })
            .catch(err => console.log(err))
    }
    //console.log(Image)
    return (
        <div className='details'>
            <Nav />
            <h1 style={{ textAlign: "center", color: "white" }}>CREATE NEW POST</h1>
            <div className="post-create">
                <form className='createpost'>
                    {isloading ? <div>please wait image is uploading....</div> : ""}
                    <div className='cols'>
                        <label>Title</label>
                        <input type="text" placeholder="post title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className='cols'>
                        <label>Description</label>
                        <input type="text" placeholder="Post Description" value={Description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div>
                        <div className='cols'>
                            <span>Upload Post Image</span>
                            <input type="file" onChange={(e) => imageHandler(e.target.files[0])} />
                        </div>
                    </div>
                    <button onClick={() => submitPost()} className="submitPOst">SUBMIT POST</button>
                </form>
            </div>
        </div>
    )
}