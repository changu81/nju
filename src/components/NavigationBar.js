import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

const Nav = styled.nav`
  width: 100%;
  padding: 12px 0;
  margin: 0; /* 기본 margin 제거 */
  background: #ffffff;  /* 흰색 배경 */
  display: flex;
  justify-content: center;
  gap: 20px;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 1px 5px rgba(0,0,0,0.1); /* 살짝 그림자 추가 */
`;

const NavButton = styled(Link)`
  padding: 10px 20px;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 600;
  color: ${(props) => (props.active ? "#ffffff" : "#333333")};
  background: ${(props) =>
    props.active ? "linear-gradient(90deg, #0077ff, #00bfff)" : "rgba(0,0,0,0.05)"};
  transition: 0.2s;

  &:hover {
    background: ${(props) =>
      props.active ? "linear-gradient(90deg, #00bfff, #0077ff)" : "rgba(0,0,0,0.15)"};
  }
`;

export default function NavigationBar() {
  const location = useLocation();

  return (
    <Nav>
      <NavButton to="/" active={location.pathname === "/" ? 1 : 0}>홈</NavButton>
      <NavButton to="/input" active={location.pathname === "/input" ? 1 : 0}>경기 결과 입력</NavButton>
      <NavButton to="/stats" active={location.pathname === "/stats" ? 1 : 0}>내전 통계</NavButton>
      <NavButton to="/balance" active={location.pathname === "/balance" ? 1 : 0}>내전 팀 밸런싱</NavButton>
    </Nav>
  );
}
