import React, { useState, useEffect } from "react";
import styled from "styled-components";
import signIn from "../functions/signIn";
import createUser from "../functions/createUser";
import { pc, sp, tab } from "../functions/media";
import { auth } from "../firebase";

// タイトル
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
    flex-direction: column;
  `}
`;

// ログイン
const Button = styled.button`
  color: ${(props) =>
    props.isSelected ? "skyblue" : "rgba(147, 229, 223, 0.7)"};
  font-size: 15px;
  font-weight: bold;
  width: 180px;
  margin: 10px 30px;
  outline: none;
  text-align: center;
  font-weight: 500;
  border: 1px solid rgba(147, 229, 223, 0.7);
  padding: 14px 0;
  /* border-radius: 6px; */
  transition: 0.3s linear;
  pointer-events: all;
  background-color: ${(props) =>
    props.isSelected ? "#00000000" : "#00000000"};
  &:hover {
    background-color: rgba(147, 229, 223, 0.7);
    box-shadow: 0px 0px 16px skyblue;
    color: white;
  }
  &:active {
    box-shadow: 0 0 9px rgba(147, 229, 223, 0.7);
    text-shadow: 0 0 12px rgba(147, 229, 223, 0.7);
  }
`;

// 入力するところ
const FormBox = styled.div`
  font-weight: bold;
  position: relative;
  width: 420px;
  height: 40px;
  background: #f1f1f1b3;
  /* border-radius: 10px; */
  margin: 20px auto 0;
  pointer-events: none;
  &:active {
    box-shadow: 0 0 12px rgba(181, 233, 230, 0.3);
  }
  ${sp`
    margin-bottom: 2px;
    width: 80%;
  `}
`;

// フォームの文字
const FormInput = styled.input`
  background: none;
  border: none;
  outline: none;
  text-align: center;
  width: 100%;
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
  line-height: 37px;
  color: #333;
  pointer-events: all;
  &:-webkit-autofill {
    animation-name: onAutoFillStart;
    transition: background-color 50000s ease-in-out 0s;
  }
  ${sp`
    margin-bottom: 2px;
    width: 100%;
  `}
`;

// register
const SubmitButton = styled.div`
  position: relative;
  color: skyblue;
  font-size: 15px;
  font-weight: bold;
  width: 420px;
  margin: 20px auto 0;
  outline: none;
  text-align: center;
  /* text-shadow: blue; */
  font-weight: 500;
  border: 1px solid rgba(147, 229, 223, 0.7);
  padding: 14px 0;
  /* border-radius: 6px; */
  transition: 0.3s linear;
  background-color: none;
  &:hover {
    box-shadow: 0 0 16px;
    text-shadow: 0 0 16px skyblue;
  }
  ${sp`
    margin-bottom: 5px;
    width: 80%;
  `}
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
          新規登録
        </Button>
        <Button isSelected={isSignIn} onClick={() => setisSignIn(true)}>
          ログイン
        </Button>
      </Buttons>
      <FormBox>
        <FormInput
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormBox>
      <FormBox>
        <FormInput
          type="password"
          placeholder="パスワード"
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
        {isSignIn ? "ログイン" : "新規登録"}
      </SubmitButton>
    </div>
  );
};

export default Form;
