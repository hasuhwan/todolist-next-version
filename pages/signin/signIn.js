import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { signInRequest } from "../../src/module/todoActionSlice";
import { toggle } from "../../src/module/signBooleanSlice";

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
async function SignIn() {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const signIn = useSelector((state) => state.signBoolean);
  const onSubmit = (data) => {
    dispatch(signInRequest(data)).then((data) => data.payload);
    reset();
  };
  const onError = (e) => {
    console.log(e);
  };
  return (
    <SignInContainer>
      <LoginForm onSubmit={handleSubmit(onSubmit, onError)}>
        <LoginInput {...register("username")} required placeholder="username" />
        <LoginInput {...register("userid")} required placeholder="id" />
        <LoginInput {...register("password")} required placeholder="password" />
        <LoginSubmit
          type="submit"
          onClick={() => dispatch(toggle(signIn.bool))}
        />
      </LoginForm>
    </SignInContainer>
  );
}
export default SignIn;
