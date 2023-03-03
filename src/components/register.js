import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios'
import './login.css'
import { registerUser } from "./apiUtils";
export const Register = () => {
    const [registerData, setRegisterData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [errorMessage, setErrormesage] = useState({
        EmailErrorMessage: "",
        PasswordErrorMessage: "",
        confirmPasswordErrorMessage: ""
    })
    const [allvalidation, setAllValidation] = useState(false)
    const navigate = useNavigate();
    const validationUserInputs = (e) => {
        var emailRegex = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/
        var passwordRegex = /^.*(?=.{6,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!&$%&@? "]).*$/

        if (registerData.email === "" || registerData.password === "" || registerData.confirmPassword == "") {
            setAllValidation(false)
        }
        if (emailRegex.test(registerData.email)) {
            setErrormesage((val) => ({ ...val, EmailErrorMessage: "" }))
        }
        else {
            setErrormesage((val) => ({ ...val, EmailErrorMessage: "Email shoud contain@ and .com" }))
        }
        if (passwordRegex.test(registerData.password)) {
            setErrormesage((val) => ({ ...val, PasswordErrorMessage: "" }))
        }
        else {
            setErrormesage((val) => ({ ...val, PasswordErrorMessage: "Password should contain atlease 6 characters" }))
        }
        if (registerData.password === registerData.confirmPassword) {
            setErrormesage((val) => ({ ...val, confirmPasswordErrorMessage: "" }))

        }
        else {
            setErrormesage((val) => ({ ...val, confirmPasswordErrorMessage: "password and confirm password should be same" }))

        }
    }

    const HandleuserInput = (e) => {
        setRegisterData({ ...registerData, [e.target.name]: e.target.value })
        validationUserInputs(e)
    }
    console.log(registerData);
    const RegisterHandler = async (e) => {
        e.preventDefault()
        if (errorMessage.email == "" && errorMessage.PasswordErrorMessage == "" && errorMessage.confirmPasswordErrorMessage == "") {
            setAllValidation(true)
        }
        registerUser(registerData).then(res => {
            alert(res.data.message)
            navigate('/');
        }).catch((err) => alert(err.response.data.message))
    }
    return (
        <div className="login-reg">
            <div className="login-reg-container">
                <div className="center">
                    <div className="form-container">
                        <form onSubmit={(e) => RegisterHandler(e)}>
                            <div style={{ textAlign: "center", color: "white", fontFamily: "sans-serif", marginBottom: "20px", fontSize: "30px" }}>Register</div>
                            <div>
                                <input type="text" name="email" placeholder="Email" onChange={(e) => HandleuserInput(e)} style={{ width: "200px", height: "30px", borderRadius: "5px" }} /><br />
                                <div>{errorMessage.EmailErrorMessage}</div>

                            </div>
                            <div>
                                <input type="text" name="password" placeholder="Password" onChange={(e) => HandleuserInput(e)} style={{ width: "200px", height: "30px", borderRadius: "5px" }} /><br />
                                <div>{errorMessage.PasswordErrorMessage}</div>

                            </div>
                            <div>
                                <input type="text" name="confirmPassword" placeholder="Confirm Password" onChange={(e) => HandleuserInput(e)} style={{ width: "200px", height: "30px", borderRadius: "5px" }} /><br />
                                <div>{errorMessage.confirmPasswordErrorMessage}</div>

                            </div>
                            <div style={{ display: "flex" }}>
                                <button className="sign-btn" style={{ width: "100px", margin: "auto" ,marginTop:"10px"}} type="submit">Register</button>

                            </div>
                        </form>
                        <div style={{ display: "flex" }}>
                            <Link style={{ margin: "auto" }} to="/"><button className="sign-btn" style={{ width: "100px" }}>LogIn</button></Link>

                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}