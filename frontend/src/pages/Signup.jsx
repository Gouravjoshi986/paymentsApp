import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import  SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import { Heading } from "../components/Heading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div>
      <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
          <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
            <Heading label={"SIGN UP"} />
            <SubHeading label={"Enter your information to create an account"} />
            <InputBox
              placeholder="First Name"
              label={"First Name"}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
            <InputBox
              placeholder="Last Name"
              label={"Last Name"}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
            <InputBox
              placeholder="name@gmail.com"
              label={"Email"}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
            <InputBox
              placeholder="Password"
              label={"Password"}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <div className="pt-4">
              <Button
                onClick={async () => {
                  const response = await axios.post(
                    "http://localhost:3000/api/v1/user/signup",
                    {
                      username,
                      password,
                      firstName,
                      lastName,
                    }
                  );
                    localStorage.setItem("token",response.data.token);
                    navigate('/dashboard');
                }}
                label={"Sign Up"}
              />
            </div>
            <BottomWarning
                label={"Already have an account?"}
                buttonText={"Sign in"}
                to={"/signin"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;