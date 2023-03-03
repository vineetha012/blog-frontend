import React, { useContext, useState, useEffect } from "react";
//import './login.css'
import axios from 'axios'
import { Blogcontext } from "./context";
import { Link, useNavigate } from 'react-router-dom'
export const LogIn = () => {
    const [loginData, setloginData] = useState({
        email: '',
        password: ''
    })

    const [errorMessage, setErrormesage] = useState({
        EmailErrorMessage: "",
        PasswordErrorMessage: ""
    })
    const [allvalidation, setAllValidation] = useState(false)
    const navigate = useNavigate()
    const { isauthentiacated, setisauthenticated } = useContext(Blogcontext)

    // const { token, setToken, isauthentiacated, setisauthenticated } = useContext(RegLogcontext)
    const validationUserInputs = (e) => {
        var emailRegex = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/
        var passwordRegex = /^.*(?=.{6,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!&$%&@? "]).*$/

        if (loginData.email === "" || loginData.password === "") {
            setAllValidation(false)
        }
        if (emailRegex.test(loginData.email)) {
            setErrormesage((val) => ({ ...val, EmailErrorMessage: "" }))
        }
        else {
            setErrormesage((val) => ({ ...val, EmailErrorMessage: "Email shoud contain@ and .com" }))
        }
        if (passwordRegex.test(loginData.password)) {
            setErrormesage((val) => ({ ...val, PasswordErrorMessage: "" }))
        }
        else {
            setErrormesage((val) => ({ ...val, PasswordErrorMessage: "Password should contain atlease 6 characters" }))
        }
    }
    const HandleuserInput = (e) => {
        setloginData({ ...loginData, [e.target.name]: e.target.value })
        validationUserInputs(e)
    }
    console.log(loginData);
    const LoginHandler = async (e) => {
        e.preventDefault()
        if (errorMessage.email == "" && errorMessage.PasswordErrorMessage == "") {
            setAllValidation(true)
        }
        await axios.post('http://localhost:5001/login', loginData).then(
            (res) => {
                if (res.data.status == 'Success') {
                    console.log(res.data.token)
                    localStorage.setItem('token', res.data.token)
                    //setToken(res.data.token)
                    navigate('/home')
                }
            }
        ).catch((error) => {
            console.log(error.response.data)
            alert(error.response.data.message)
        })

    }
    // useEffect(()=>{
    //     if (token) {
    //         localStorage.setItem("token",token)
    //         navigate('/Home')
    //         setisauthenticated(!isauthentiacated)
    //     }
    // },[token])

    //console.log(token)

    return (
        <div className="login-reg">
            <div className="login-reg-container">
                <div className="center">
                    <div className="form-container">
                        <form onSubmit={(e) => LoginHandler(e)}>
                            <div style={{ textAlign: "center", color: "white", fontFamily: "sans-serif", marginBottom: "20px", fontSize: "30px" }}>Log In</div>
                            <div>
                                <input type="text" name="email" placeholder="Email" onChange={(e) => HandleuserInput(e)} style={{ width: "200px" ,height:"30px",borderRadius:"5px"}} /><br />
                                <div>{errorMessage.EmailErrorMessage}</div>
                            </div>
                            <div>
                                <input type="text" name="password" placeholder="Password" onChange={(e) => HandleuserInput(e)} style={{ width: "200px" ,height:"30px",borderRadius:"5px"}}/><br />
                                <div>{errorMessage.PasswordErrorMessage}</div>
                            </div>
                            <div style={{ display: "flex" }}>
                                <button className="sign-btn" style={{ width: "100px", margin: "auto" ,marginTop:"10px"}} type="submit">LogIn</button>
                            </div>
                        </form>
                        <div style={{ display: "flex" }}>
                            <Link style={{ margin: "auto" }} to="/register"><button className="sign-btn" style={{ width: "100px" }}>Register</button></Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}