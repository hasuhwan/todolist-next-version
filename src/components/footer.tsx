import styled from "styled-components";

const FooterContainer = styled.div`
  background-color: black;
  width: 100%;
  height: 10vh;
  position: absolute;
  bottom: 0;
`;

function Footer() {
  return <FooterContainer></FooterContainer>;
}
export default Footer;
