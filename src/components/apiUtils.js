import axios from "axios"

const url = "http://localhost:5001"
export const postBlogs = (title, Image, Description) => {

    //call create post api
    let response = fetch(`${url}/blogs`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            'token': localStorage.getItem('token')
        },
        body: JSON.stringify({
            title: title,
            Description: Description,
            Image: Image
        })
    }).then(res => (res.json()))
    return response
}
export const getblogs = async () => {
    // const response = await axios.get(`${url}/blogs`).catch(res => console.log(res))
    // // console.log(response)
    // return response.data
    const res = await fetch(`${url}/blogs`, {
        method: 'GET',
        headers: {
            'token': localStorage.getItem('token')
        }
    })
    console.log(res.json)
    return res.json();
}
export const registerUser = async (user) => {
    // const res = await fetch(`${URL}/v1/register`, {
    //     method: "POST",
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(user)
    // })
    let res=await axios.post(`${url}/register`,user)   
    return res
}