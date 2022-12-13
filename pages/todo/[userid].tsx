import Todo from "../../src/components/todo/todo";
import Header from "../../src/components/header";
import Footer from "../../src/components/footer";
import TodoInput from "../../src/components/todo/todoInput";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { loginRequest, logoutRequest } from "../../src/module/todoActionSlice";
import { Fragment } from "react";
import { RootState } from "../../src/module/store";
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
const LogOutButton = styled.button``;

function Authenticated() {
  const { username, todo, userid } = useSelector(
    (state: RootState) => state.todoAction
  );
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    dispatch(loginRequest()).then((data) => {
      if (data.payload === "") {
        router.push("/");
      } else {
        setLoading(false);
      }
    });
  }, []);

  return (
    <>
      {loading === true ? (
        <div>Loading</div>
      ) : (
        <Fragment>
          <Header />
          <AuthenticatedContainer>
            <Welcome>반갑습니다 {username}님</Welcome>
            <TodoInput userid={userid} />
            <TodoList>
              {todo.map((el) => {
                return (
                  <Todo
                    key={el.id}
                    id={el.id}
                    userid={userid}
                    todoText={el.text}
                  />
                );
              })}
            </TodoList>
            <LogOutButton
              onClick={async () => {
                const response = await dispatch(logoutRequest()).then(
                  (data) => data.payload
                );
                if (response === "success") {
                  router.push("/");
                }
              }}
            >
              LogOut
            </LogOutButton>
          </AuthenticatedContainer>
          <Footer />
        </Fragment>
      )}
    </>
  );
}

// export const getServerSideProps = async (context) => {
//   const token = context.req.headers.cookie;
//   if (token === undefined) {
//   }
//   axios
//     .get(process.env.NEXT_PUBLIC_API_URL + "api/loginRequest")
//     .then((data) => console.log(data));

//   return { props: {} };
// };

export default Authenticated;
