import styled from "styled-components";
import { useForm } from "react-hook-form";
import { loginRequest } from "../src/module/todoActionSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toggle } from "../src/module/signBooleanSlice";
import SignIn from "./signin/signIn";

const HomeContainer = styled.div`
  background-color: yellow;
  width: 100vw;
  height: 100vh;
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

export default function Home() {
  const { register, handleSubmit, reset } = useForm();
  const user = useSelector((state) => state.todoAction);
  const signIn = useSelector((state) => state.signBoolean);
  const dispatch = useDispatch();
  const router = useRouter();
  const onSubmit = async (data) => {
    const verfiy = await dispatch(loginRequest(data)).then(
      (data) => data.payload
    );
    if (verfiy === "") {
      alert("확인하세요");
    }
    reset();
  };
  const onError = (e) => {
    console.log(e);
  };

  useEffect(() => {
    if (user.userid !== undefined) {
      router.push(
        "/todo/authenticated",
        `/todo/authenticated/?userid=${user.userid}`
      );
    }
  }, [user]);
  return (
    <HomeContainer>
      {signIn.bool === true ? (
        <SignIn />
      ) : (
        <LoginForm onSubmit={handleSubmit(onSubmit, onError)}>
          <LoginInput {...register("userid")} required />
          <LoginInput {...register("password")} required />
          <LoginSubmit
            type="button"
            value="회원가입"
            onClick={() => dispatch(toggle(signIn.bool))}
          />
          <LoginSubmit type="submit" />
        </LoginForm>
      )}
    </HomeContainer>
  );
}
