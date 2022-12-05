import Todo from "../../src/components/todo/todo";
import Header from "../../src/components/header";
import Footer from "../../src/components/footer";
import { useSelector } from "react-redux";
import styled from "styled-components";
const AuthenticatedContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Welcome = styled.h1``;

const TodoList = styled.li`
  display: flex;
  flex-direction: column;
`;

function Authenticated() {
  const { username, todo, userid } = useSelector((state) => state.todoAction);

  return (
    <>
      <Header />
      <AuthenticatedContainer>
        <Welcome>반갑습니다 {username}님</Welcome>
        <TodoList>
          {todo.map((el) => {
            return (
              <Todo key={el.id} id={el.id} userid={userid} todoText={el.text} />
            );
          })}
        </TodoList>
      </AuthenticatedContainer>
      <Footer />
    </>
  );
}
export default Authenticated;
