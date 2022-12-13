import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { add, Iadd } from "../../module/todoActionSlice";
import { addRequest } from "../../module/todoActionSlice";
import uuidv4 from "../../../func/uuid";
const TodoAddForm = styled.form``;
const TodoAddInput = styled.input``;
const TodoAddSubmit = styled.input``;
function TodoInput({ userid }) {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const onSubmit = (data: Iadd) => {
    const id = uuidv4();
    const { text } = data;
    dispatch(addRequest({ text, userid, id }));
    dispatch(add({ todotext, todoid }));
    reset();
  };
  const onError = (e) => {
    console.log(e);
  };
  return (
    <TodoAddForm onSubmit={handleSubmit(onSubmit, onError)}>
      <TodoAddInput {...register("todotext")} required />
      <TodoAddSubmit type="submit" />
    </TodoAddForm>
  );
}
export default TodoInput;
