import React, { createContext ,useState} from "react";
export const Blogcontext=createContext()
export const BlogContextProvider=({children})=>{
    const [Blogs,setBlogs]=useState([])
    const [blogdtail,setBlogdetail]=useState(null)
    const [token,setToken]=useState(null)
    const [isauthentiacated,setisauthenticated]=useState(false)

    return <Blogcontext.Provider value={{
        Blogs,setBlogs,blogdtail,setBlogdetail,
        token,setToken,isauthentiacated,setisauthenticated
    }}>
         { children}
    </Blogcontext.Provider>
}
 