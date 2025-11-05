import { motion } from "framer-motion";
import styled, { keyframes } from "styled-components";

const backgroundPulse1 = keyframes`
  0% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.05); }
  100% { opacity: 0.3; transform: scale(1); }
`;

const backgroundPulse2 = keyframes`
  0% { opacity: 0.2; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.1); }
  100% { opacity: 0.2; transform: scale(1); }
`;

const moveLight = keyframes`
  0% { left: -100%; }
  100% { left: 100%; }
`;

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
`;

const Glow1 = styled.div`
  position: absolute;
  top: 30%;
  left: 25%;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(0, 255, 255, 0.15) 0%, transparent 70%);
  filter: blur(120px);
  animation: ${backgroundPulse1} 6s ease-in-out infinite;
`;

const Glow2 = styled.div`
  position: absolute;
  bottom: 20%;
  right: 25%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(128, 0, 255, 0.15) 0%, transparent 70%);
  filter: blur(120px);
  animation: ${backgroundPulse2} 8s ease-in-out infinite;
`;

const Title = styled(motion.h1)`
  font-size: 8rem;
  font-weight: 900;
  letter-spacing: 0.2em;
  text-align: center;
  color: transparent;
  background: linear-gradient(90deg, #00ffff, #0088ff, #b300ff);
  -webkit-background-clip: text;
  background-clip: text;
  text-shadow: 0 0 30px rgba(0, 200, 255, 0.5);
`;

const Subtitle = styled(motion.div)`
  position: absolute;
  bottom: 50px;
  color: #ccc;
  font-size: 1.2rem;
  letter-spacing: 0.1em;
`;

const LightLine = styled(motion.div)`
  position: absolute;
  bottom: 0;
  height: 2px;
  width: 100%;
  background: linear-gradient(to right, transparent, #00ffff, transparent);
  opacity: 0.5;
  animation: ${moveLight} 6s linear infinite;
`;

export default function Home() {
  return (
    <Container>
      <Glow1 />
      <Glow2 />

      <Title
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        내 전 업
      </Title>

      <Subtitle
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 0.8, y: 0 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        ⚡ 내전 통계 & 밸런싱 시스템 ⚡
      </Subtitle>

      <LightLine />
    </Container>
  );
}
