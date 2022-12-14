import styled from "styled-components";

import { useCallback } from "react";
import { remove } from "../../module/todoActionSlice";
import { removeRequest } from "../../module/todoActionSlice";
import { useAppDispatch } from "../../module/store";
const TodoContainter = styled.div``;
const TodoComponet = styled.span`
  font-size: 2em;
`;
const TodoRemoveButton = styled.input``;
interface propsTypes {
  id: string;
  todoText: string;
  userid: string;
}
function Todo({ id, todoText, userid }: propsTypes) {
  const dispatch = useAppDispatch();
  const onClickHandle = useCallback(() => {
    dispatch(removeRequest({ userid, id }));
    dispatch(remove(id));
  }, []);
  return (
    <TodoContainter>
      <TodoComponet>{todoText}</TodoComponet>
      <TodoRemoveButton
        type="button"
        onClick={() => onClickHandle()}
        value="❌"
      />
    </TodoContainter>
  );
}
export default Todo;
