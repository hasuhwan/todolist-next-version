import styled from "styled-components";
import { useForm } from "react-hook-form";
import { loginRequest } from "../src/redux/todoActionSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";

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
  const dispatch = useDispatch();
  const router = useRouter();
  const onSubmit = (data) => {
    dispatch(loginRequest(data));
    reset();
  };
  const onError = (e) => {
    console.log(e);
  };
  useEffect(() => {
    console.log(user);
    if (user.userid !== undefined) {
      console.log("hi");
      router.push("/todo/todoList", `/todo/${user.userid}`);
    }
  }, [user]);
  return (
    <HomeContainer>
      <LoginForm onSubmit={handleSubmit(onSubmit, onError)}>
        <LoginInput {...register("userid")} required />
        <LoginInput {...register("password")} required />
        <LoginSubmit type="submit" />
      </LoginForm>
    </HomeContainer>
  );
}
