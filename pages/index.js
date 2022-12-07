import styled from "styled-components";
import { useForm } from "react-hook-form";
import { loginRequest, signInRequest } from "../src/module/todoActionSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { toggle } from "../src/module/signBooleanSlice";
import axios from "axios";

const HomeContainer = styled.div`
  background-color: yellow;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SignInContainer = styled.div`
  width: 30em;
  height: 30em;
  border-color: black;
  border-radius: 2em;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const LoginInput = styled.input`
  width: 30em;
  height: 5em;
`;
const LoginSubmit = styled.input``;
const LoginForm = styled.form`
  background-color: blue;
  display: flex;
  flex-direction: column;
`;
const SignInInput = styled.input`
  width: 30em;
  height: 5em;
`;
const SignInSubmit = styled.input``;
const SignInForm = styled.form`
  background-color: blue;
  display: flex;
  flex-direction: column;
`;

export default function Home({}) {
  const { register, handleSubmit, reset } = useForm();
  const signIn = useSelector((state) => state.signBoolean);
  const dispatch = useDispatch();
  const router = useRouter();
  const onSubmit = async (data) => {
    const verfiy = await dispatch(loginRequest(data)).then(
      (data) => data.payload
    );
    if (verfiy === "") {
      alert("확인하세요");
    } else if (verfiy !== "") {
      router.push(`/todo/${verfiy.userid}`);
    }

    reset();
  };
  const onSignInHandle = async (data) => {
    const verfiy = await dispatch(signInRequest(data)).then(
      (data) => data.payload
    );

    if (verfiy === "") {
      alert("중복된 아이디 입니다.");
    } else {
      reset();
      dispatch(toggle(signIn.bool));
    }
  };
  const onError = (e) => {
    console.log(e);
  };

  return (
    <HomeContainer>
      {signIn.bool === true ? (
        <SignInContainer>
          <SignInForm onSubmit={handleSubmit(onSignInHandle, onError)}>
            <SignInInput
              {...register("username")}
              required
              placeholder="username"
            />
            <SignInInput {...register("userid")} required placeholder="id" />
            <SignInInput
              {...register("password")}
              required
              placeholder="password"
            />
            <SignInSubmit type="submit" />
            <SignInSubmit
              type="button"
              value="취소"
              onClick={() => {
                reset();
                dispatch(toggle(signIn.bool));
              }}
            />
          </SignInForm>
        </SignInContainer>
      ) : (
        <LoginForm onSubmit={handleSubmit(onSubmit, onError)}>
          <LoginInput {...register("userid")} required />
          <LoginInput {...register("password")} required />
          <LoginSubmit
            type="button"
            value="회원가입"
            onClick={() => {
              reset();
              dispatch(toggle(signIn.bool));
            }}
          />
          <LoginSubmit type="submit" />
        </LoginForm>
      )}
    </HomeContainer>
  );
}
