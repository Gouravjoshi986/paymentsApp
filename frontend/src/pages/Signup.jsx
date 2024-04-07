import { useState } from "react";
import InputBox from "../components/InputBox";
import { Heading } from "../components/Heading";
import axios from 'axios';
import {useNavigate} from "react-router-dom"

const SignUp = () =>{
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [userName,setUserName] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    return (
        <>
           Hello World!
           <Heading label={"This is Heading"}/>
           <InputBox label={"Input Box"} placeholder={"placeholder"} onChange={()=>{
            alert("Changed input Box")
           }}/>
        </>
    )
}
export default SignUp;