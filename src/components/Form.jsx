import React, { useState, useEffect } from "react";
import styled from "styled-components";
import signIn from "../functions/signIn";
import createUser from "../functions/createUser";
import { pc, sp, tab } from "../functions/media";
import { auth } from "../firebase";

const TitleText = styled.h1`
  ${pc`
    margin-top: 12%;
    font-size: 4rem;
    letter-spacing: 16px;
  `}
  ${tab`
    margin-top: 40%;
    font-size: 4rem;
    letter-spacing: 16px;
  `}
  ${sp`
    margin-top: 40%;
    font-size: 2rem;
    letter-spacing: 4px;
  `}
  position: relative;
  color: #fff;
  text-shadow: 0 0 5px #03bcf4, 0 0 10px #03bcf4, 0 0 20px #03bcf4,
    0 0 40px #03bcf4, 0 0 80px #03bcf4;
  width: 100%;
  text-align: center;
  line-height: 0.7em;
  outline: none;
  pointer-events: none;
`;

const Buttons = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  margin-top: 64px;
  ${sp`
    margin-top: 176px;
    flex-direction: column;
  `}
`;

const Button = styled.button`
  color: ${(props) => (props.isSelected ? "#fff" : "#3acbec")};
  font-size: 15px;
  width: 180px;
  margin: 15px 30px;
  outline: none;
  text-align: center;
  font-weight: 500;
  border: 1px solid #3acbec;
  padding: 14px 0;
  border-radius: 6px;
  transition: 0.3s linear;
  pointer-events: all;
  background-color: ${(props) => (props.isSelected ? "#3acbec" : "#00000000")};
  &:hover {
    background-color: #3acbec;
    color: #fff;
  }
  &:active {
    box-shadow: 0 0 9px rgba(255, 255, 255, 0.6);
    text-shadow: 0 0 12px rgba(255, 255, 255, 0.9);
  }
`;

const FormBox = styled.div`
  position: relative;
  width: 420px;
  height: 40px;
  background: #f1f1f1b3;
  border-radius: 10px;
  margin: 20px auto 0;
  pointer-events: none;
  &:active {
    box-shadow: 0 0 12px rgba(255, 254, 59, 0.2);
  }
`;

const FormInput = styled.input`
  background: none;
  border: none;
  outline: none;
  text-align: center;
  width: 90%;
  font-family: "Montserrat", sans-serif;
  line-height: 37px;
  color: #333;
  pointer-events: all;
  &:-webkit-autofill {
    animation-name: onAutoFillStart;
    transition: background-color 50000s ease-in-out 0s;
  }
`;

const SubmitButton = styled.div`
  position: relative;
  color: #fff;
  font-size: 15px;
  width: 420px;
  margin: 20px auto 0;
  outline: none;
  text-align: center;
  font-weight: 500;
  border: 1px solid #3acbec;
  padding: 14px 0;
  border-radius: 6px;
  transition: 0.3s linear;
  background-color: #3acbec;
  &:hover {
    box-shadow: 0 0 16px rgba(255, 255, 255, 0.4);
    text-shadow: 0 0 16px #fff;
  }
`;

const Form = (props) => {
  const [isSignIn, setisSignIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      user && props.history.push("/");
    });
    return () => unSub();
  }, [props.history]);

  return (
    <div>
      <TitleText>うちゅいったー</TitleText>
      <Buttons>
        <Button isSelected={!isSignIn} onClick={() => setisSignIn(false)}>
          Register
        </Button>
        <Button isSelected={isSignIn} onClick={() => setisSignIn(true)}>
          Login
        </Button>
      </Buttons>
      <FormBox>
        <FormInput
          type="email"
          placeholder="@email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormBox>
      <FormBox>
        <FormInput
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormBox>
      <SubmitButton
        onClick={
          isSignIn
            ? () => signIn(email, password, props)
            : () => createUser(email, password, props)
        }
      >
        {isSignIn ? "Login" : "Register"}
      </SubmitButton>
    </div>
  );
};

export default Form;
