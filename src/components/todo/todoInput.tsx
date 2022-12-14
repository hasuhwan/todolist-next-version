import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../module/store";
import { add, Iadd } from "../../module/todoActionSlice";
import { addRequest } from "../../module/todoActionSlice";
import uuidv4 from "../../../func/uuid";
const TodoAddForm = styled.form``;
const TodoAddInput = styled.input``;
const TodoAddSubmit = styled.input``;
function TodoInput({ userid }) {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useAppDispatch();
  const onSubmit = (data: Iadd) => {
    const id = uuidv4();
    const { text } = data;
    dispatch(addRequest({ text, userid, id }));
    dispatch(add({ text, id }));
    reset();
  };
  const onError = (e) => {
    console.log(e);
  };
  return (
    <TodoAddForm onSubmit={handleSubmit(onSubmit, onError)}>
      <TodoAddInput {...register("text")} required />
      <TodoAddSubmit type="submit" />
    </TodoAddForm>
  );
}
export default TodoInput;
