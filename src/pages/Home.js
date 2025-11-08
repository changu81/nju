import { motion } from "framer-motion";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import { useEffect } from "react";

// ---------------- Animations ----------------
const backgroundPulse1 = keyframes`
  0% { opacity: 0.15; transform: scale(1); }
  50% { opacity: 0.35; transform: scale(1.05); }
  100% { opacity: 0.15; transform: scale(1); }
`;

const backgroundPulse2 = keyframes`
  0% { opacity: 0.1; transform: scale(1); }
  50% { opacity: 0.25; transform: scale(1.1); }
  100% { opacity: 0.1; transform: scale(1); }
`;

const moveLight = keyframes`
  0% { left: -100%; }
  100% { left: 100%; }
`;

// ---------------- Container ----------------
const Container = styled.div`
  min-height: 100vh;
  width: 100vw;
  overflow: hidden;
  margin: 0;
  padding: 0;
  background: #ffffff; /* 배경 흰색 */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
`;

// ---------------- Glow ----------------
const Glow1 = styled.div`
  position: absolute;
  top: 20%;
  left: 20%;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(0, 123, 255, 0.15) 0%, transparent 70%);
  filter: blur(120px);
  animation: ${backgroundPulse1} 6s ease-in-out infinite;
`;

const Glow2 = styled.div`
  position: absolute;
  bottom: 15%;
  right: 15%;
  width: 350px;
  height: 350px;
  background: radial-gradient(circle, rgba(255, 140, 0, 0.15) 0%, transparent 70%);
  filter: blur(120px);
  animation: ${backgroundPulse2} 8s ease-in-out infinite;
`;

// ---------------- Title & Subtitle ----------------
const Title = styled(motion.h1)`
  font-size: 6rem;
  font-weight: 900;
  letter-spacing: 0.15em;
  text-align: center;
  background: linear-gradient(90deg, #0077ff, #00bfff, #b300ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 20px rgba(0, 123, 255, 0.3);
`;

const Subtitle = styled(motion.div)`
  position: absolute;
  bottom: 50px;
  color: #555555;
  font-size: 1.2rem;
  letter-spacing: 0.1em;
`;

// ---------------- LightLine ----------------
const LightLine = styled(motion.div)`
  position: absolute;
  bottom: 0;
  height: 2px;
  width: 100%;
  background: linear-gradient(to right, transparent, #0077ff, transparent);
  opacity: 0.5;
  animation: ${moveLight} 6s linear infinite;
`;

// ---------------- Buttons ----------------
const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 50px;
`;

const NavButton = styled.button`
  padding: 14px 30px;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 700;
  border: none;
  cursor: pointer;
  background: linear-gradient(90deg, #0077ff, #00bfff);
  color: white;
  transition: 0.2s;

  &:hover {
    background: linear-gradient(90deg, #00bfff, #ff7f50);
  }
`;

// ---------------- Home Component ----------------
export default function Home() {
  const navigate = useNavigate();

  // body margin 제거
  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.background = "#ffffff";
  }, []);

  return (
    <>
      <NavigationBar />
      <Container>
        <Glow1 />
        <Glow2 />
        <Title
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          내즤언UP
        </Title>
        <Subtitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          ⚡ 멸3 기원 내전 페이지 ⚡
        </Subtitle>
        <ButtonContainer>
          <NavButton onClick={() => navigate("/input")}>경기결과 입력</NavButton>
          <NavButton onClick={() => navigate("/stats")}>내전 통계 보기</NavButton>
          <NavButton onClick={() => navigate("/balance")}>내전 팀 밸짜기</NavButton>
        </ButtonContainer>
        <LightLine />
      </Container>
    </>
  );
}
