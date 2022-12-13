import styled from "styled-components";

const HeaderContainer = styled.div`
  background-color: black;
  width: 100%;
  height: 10vh;
  position: fixed;
  top: 0;
`;

function Header() {
  return <HeaderContainer></HeaderContainer>;
}
export default Header;
