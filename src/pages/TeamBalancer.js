import { useState } from "react";
import styled from "styled-components";
import NavigationBar from "../components/NavigationBar";

// ---------------- Styled Components ----------------
const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 30px 20px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #333333;
`;

const Title = styled.h1`
  font-size: 2.4rem;
  font-weight: 700;
  margin-bottom: 25px;
  text-align: center;
  background: linear-gradient(90deg, #0077ff, #00bfff, #b300ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const SectionBox = styled.div`
  width: 100%;
  padding: 20px;
  margin-bottom: 25px;
  background: rgba(0,0,0,0.03);
  border-radius: 18px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 123, 255, 0.08);
`;

const PlayerList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const PlayerItem = styled.div`
  flex: 1 1 calc(20% - 12px);
  min-width: 100px;
  max-width: 150px;
  padding: 10px 8px;
  border-radius: 10px;
  background: ${(props) => (props.selected ? "#00bfff33" : "#f0f0f0")};
  text-align: center;
  cursor: pointer;
  user-select: none;

  &:hover {
    background: ${(props) => (props.selected ? "#00bfff55" : "#e0e0e0")};
  }
`;

const Button = styled.button`
  margin-top: 15px;
  padding: 12px 25px;
  font-weight: 600;
  border-radius: 10px;
  border: none;
  background: linear-gradient(90deg, #0077ff, #00bfff);
  color: #fff;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: linear-gradient(90deg, #0055aa, #0088cc);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const TeamTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  margin-top: 15px;

  th, td {
    padding: 10px;
    border-bottom: 1px solid rgba(0,0,0,0.1);
  }

  th {
    background: #0077ff;
    color: #fff;
    font-weight: 600;
    border-radius: 8px 8px 0 0;
  }

  tr:nth-child(even) td {
    background: rgba(0,0,0,0.02);
  }
`;

// ---------------- Sample Players ----------------
const allPlayers = [
  { name: "건하", score: 374 },
  { name: "영빈", score: 245 },
  { name: "영재", score: 245 },
  { name: "진규", score: 355 },
  { name: "태원", score: 150 },
  { name: "태현", score: 200 },
  { name: "준성", score: 250 },
  { name: "현수", score: 350 },
  { name: "창우", score: 361 },
  { name: "동건", score: 305 },
  { name: "민규", score: 324 },
  { name: "수호", score: 288 },
  { name: "양원", score: 350 },
  { name: "재원", score: 229 },
  { name: "지인", score: 245 },
  { name: "지연", score: 189 },
  { name: "우진", score: 406 },
  { name: "아현", score: 200 },
  { name: "준혁", score: 284 },
  { name: "효림", score: 200 }
];

// ---------------- Main Component ----------------
export default function TeamBalancer() {
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [teams, setTeams] = useState(null);

  const togglePlayer = (player) => {
    if (selectedPlayers.includes(player)) {
      setSelectedPlayers(selectedPlayers.filter(p => p !== player));
    } else if (selectedPlayers.length < 10) {
      setSelectedPlayers([...selectedPlayers, player]);
    }
  };

  // 간단한 최적화 알고리즘: 점수 합 차 최소화
  const balanceTeams = () => {
    if (selectedPlayers.length !== 10) return;

    const sorted = [...selectedPlayers].sort((a, b) => b.score - a.score);
    const red = [];
    const blue = [];
    let sumRed = 0;
    let sumBlue = 0;

    sorted.forEach(p => {
      if (sumRed <= sumBlue) {
        red.push(p.name);
        sumRed += p.score;
      } else {
        blue.push(p.name);
        sumBlue += p.score;
      }
    });

    setTeams({ red, blue });
  };

  return (
    <>
      <NavigationBar />
      <Container>
        <Title>내전 팀 밸런싱</Title>

        <SectionBox>
          <h3>전체 플레이어 목록 (10명 선택)</h3>
          <PlayerList>
            {allPlayers.map((player, idx) => (
              <PlayerItem
                key={idx}
                selected={selectedPlayers.includes(player)}
                onClick={() => togglePlayer(player)}
              >
                {player.name} ({player.score})
              </PlayerItem>
            ))}
          </PlayerList>
          <Button
            onClick={balanceTeams}
            disabled={selectedPlayers.length !== 10}
          >
            팀 밸런싱 실행
          </Button>
        </SectionBox>

        {teams && (
          <SectionBox>
            <h3>밸런스된 팀 결과</h3>
            <TeamTable>
              <thead>
                <tr>
                  <th>Red 팀</th>
                  <th>Blue 팀</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(5)].map((_, i) => (
                  <tr key={i}>
                    <td>{teams.red[i]}</td>
                    <td>{teams.blue[i]}</td>
                  </tr>
                ))}
              </tbody>
            </TeamTable>
          </SectionBox>
        )}
      </Container>
    </>
  );
}
