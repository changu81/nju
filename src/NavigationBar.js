import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

const Nav = styled.nav`
  width: 100%;
  padding: 12px 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  gap: 20px;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const NavButton = styled(Link)`
  padding: 8px 16px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  color: white;
  background: ${(props) =>
    props.active ? "linear-gradient(90deg, #00ffff, #0088ff)" : "rgba(255,255,255,0.1)"};
  transition: 0.2s;

  &:hover {
    opacity: 0.85;
  }
`;

export default function NavigationBar() {
  const location = useLocation();

  return (
    <Nav>
      <NavButton to="/" active={location.pathname === "/" ? 1 : 0}>
        홈
      </NavButton>
      <NavButton to="/input" active={location.pathname === "/input" ? 1 : 0}>
        경기 결과 입력
      </NavButton>
      <NavButton to="/stats" active={location.pathname === "/stats" ? 1 : 0}>
        내전 통계
      </NavButton>
      <NavButton to="/balance" active={location.pathname === "/balance" ? 1 : 0}>
        내전 팀 밸런싱
      </NavButton>
    </Nav>
  );
}
