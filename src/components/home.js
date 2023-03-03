import { useEffect, useContext, useState } from 'react'
import { getblogs } from './apiUtils'
import { Card } from './card'
import { Blogcontext } from './context'
import { Nav } from './Nav'
export const Home = () => {
    const { Blogs, setBlogs } = useContext(Blogcontext)
    const [isloading,setIsloading]=useState(true)
    useEffect(() => {
        getblogs().then(res => {
            console.log(res.allBlogs)
            setIsloading(false)
            res = (res.allBlogs).reverse()
            setBlogs(res)
            
        })
    }, [])
    return (
        <>  <Nav />
            <div className='Card-container'>
                <div>
                    <h1 style={{ textAlign: "center",color:"purple" }}>Blogs</h1>
                    <div className='Card-cont'>

                        {
                            Blogs.length>0 ? Blogs.map((blog, index) => {
                                return (
                                    <div className='Card' key={index} id={blog._id}>
                                        <Card blog={blog} />
                                    </div>
                                )
                            })
                                : <div style={{fontStyle:"italic",border:"1px solid gray",borderRadius:"20px",padding:"10px 5px 10px 5px"}}>
                                    👋 hello buddy..!😍 create your first post
                                </div>
                        }
                        {isloading?<i className="fa fa-spinner" aria-hidden="true"></i>:""}
                    </div>
                </div>

            </div>
        </>
    )
}