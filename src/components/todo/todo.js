import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { remove } from "../../module/todoActionSlice";
import { removeRequest } from "../../module/todoActionSlice";
const TodoContainter = styled.div``;
const TodoComponet = styled.span`
  font-size: 2em;
`;
const TodoRemoveButton = styled.input``;

function Todo({ id, todoText, userid }) {
  const dispatch = useDispatch();
  const onClickHandle = useCallback((id) => {
    dispatch(removeRequest({ userid, id }));
    dispatch(remove(id));
  });
  return (
    <TodoContainter>
      <TodoComponet>{todoText}</TodoComponet>
      <TodoRemoveButton
        type="button"
        onClick={() => onClickHandle(id)}
        value="❌"
      />
    </TodoContainter>
  );
}
export default Todo;
