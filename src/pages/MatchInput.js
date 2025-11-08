import { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import NavigationBar from "../components/NavigationBar";

// ---------------- Container ----------------
const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  max-width: 1000px; /* 최대 폭 제한 */
  margin: 0 auto;    /* 좌우 중앙 */
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 20px; /* 양쪽 여유 확보 */
  color: #333333;
`;

// ---------------- Title ----------------
const Title = styled(motion.h1)`
  font-size: 2.4rem;
  font-weight: 700;
  margin-bottom: 25px;
  text-align: center;
  background: linear-gradient(90deg, #0077ff, #00bfff, #b300ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

// ---------------- FormBox & Section ----------------
const FormBox = styled.div`
  width: 100%;
  padding: 25px 30px;
  background: rgba(0, 0, 0, 0.03);
  border-radius: 18px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 123, 255, 0.08);
`;

const SectionTitle = styled.h2`
  margin: 20px 0 8px;
  font-size: 1rem;
  font-weight: 600;
  color: #0077ff;
`;

// ---------------- WinLose ----------------
const WinLoseContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 18px;
`;

const WinLoseButton = styled.button`
  flex: 1;
  padding: 10px 0;
  border-radius: 10px;
  border: none;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  color: ${(props) => (props.active ? "#ffffff" : "#555555")};
  background: ${(props) =>
    props.active ? (props.red ? "#ff5555" : "#55ccff") : "rgba(0,0,0,0.05)"};
  transition: 0.2s;

  &:hover {
    opacity: 0.85;
  }
`;

// ---------------- TwoCol ----------------
const TwoCol = styled.div`
  display: flex;
  flex-direction: column; /* 기본 모바일 세로 */
  gap: 20px;

  @media(min-width: 700px) {
    flex-direction: row; /* 화면 넓으면 좌우 배치 */
  }
`;

// ---------------- PlayerBox & Input ----------------
const PlayerBox = styled.div`
  flex: 1;
  background: rgba(0, 0, 0, 0.03);
  padding: 12px;
  border-radius: 12px;
  margin-bottom: 12px;

  @media(max-width: 700px) {
    padding: 10px;
  }
`;

const Label = styled.div`
  font-size: 0.85rem;
  margin-bottom: 4px;
  color: #333333;
`;

const TeamRow = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  flex-wrap: wrap; /* 좁아지면 input 줄바꿈 */
`;

const SmallInput = styled.input`
  flex: 1;
  padding: 10px 12px;
  border-radius: 8px;
  border: none;
  background: rgba(0,0,0,0.05);
  color: #333333;

  &::placeholder {
    color: #888888;
  }
`;

// ---------------- SaveButton ----------------
const SaveButton = styled(motion.button)`
  margin-top: 20px;
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  border-radius: 10px;
  font-weight: 700;
  border: none;
  background: linear-gradient(90deg, #0077ff, #00bfff);
  color: white;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: linear-gradient(90deg, #00bfff, #ff7f50);
  }
`;

// ---------------- MatchInput Component ----------------
export default function MatchInput() {
  const [winner, setWinner] = useState(null);
  const [red, setRed] = useState(Array(5).fill({ name: "", champ: "" }));
  const [blue, setBlue] = useState(Array(5).fill({ name: "", champ: "" }));

  const update = (team, setTeam, i, field, value) => {
    const copy = [...team];
    copy[i] = { ...copy[i], [field]: value };
    setTeam(copy);
  };

  const handleSave = () => {
    if (!winner) {
      alert("승패를 선택해주세요!");
      return;
    }
    const matchData = { winner, red, blue };
    console.log("경기 데이터:", matchData);
  };

  useEffect(() => {
    document.body.style.background = "#ffffff";
    document.body.style.margin = "0";
    document.body.style.padding = "0";
  }, []);

  return (
    <>
      <NavigationBar />
      <Container>
        <Title
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          경기 결과 입력
        </Title>

        <FormBox>
          <SectionTitle>승 / 패</SectionTitle>
          <WinLoseContainer>
            <WinLoseButton red active={winner === "red"} onClick={() => setWinner("red")}>
              레드팀 승
            </WinLoseButton>
            <WinLoseButton active={winner === "blue"} onClick={() => setWinner("blue")}>
              블루팀 승
            </WinLoseButton>
          </WinLoseContainer>

          <TwoCol>
            <div style={{ flex: 1 }}>
              <SectionTitle>레드팀</SectionTitle>
              {red.map((p, i) => (
                <PlayerBox key={i}>
                  <Label>플레이어 {i + 1}</Label>
                  <TeamRow>
                    <SmallInput
                      placeholder="닉네임"
                      value={p.name}
                      onChange={(e) => update(red, setRed, i, "name", e.target.value)}
                    />
                    <SmallInput
                      placeholder="챔피언"
                      value={p.champ}
                      onChange={(e) => update(red, setRed, i, "champ", e.target.value)}
                    />
                  </TeamRow>
                </PlayerBox>
              ))}
            </div>

            <div style={{ flex: 1 }}>
              <SectionTitle>블루팀</SectionTitle>
              {blue.map((p, i) => (
                <PlayerBox key={i}>
                  <Label>플레이어 {i + 1}</Label>
                  <TeamRow>
                    <SmallInput
                      placeholder="닉네임"
                      value={p.name}
                      onChange={(e) => update(blue, setBlue, i, "name", e.target.value)}
                    />
                    <SmallInput
                      placeholder="챔피언"
                      value={p.champ}
                      onChange={(e) => update(blue, setBlue, i, "champ", e.target.value)}
                    />
                  </TeamRow>
                </PlayerBox>
              ))}
            </div>
          </TwoCol>

          <SaveButton whileTap={{ scale: 0.95 }} onClick={handleSave}>
            저장하기
          </SaveButton>
        </FormBox>
      </Container>
    </>
  );
}
