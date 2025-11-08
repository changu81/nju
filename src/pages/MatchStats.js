import { useState } from "react";
import styled from "styled-components";
import NavigationBar from "../components/NavigationBar";

// ---------------- Styled Components ----------------
const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  max-width: 1200px;
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
  margin-bottom: 25px;
  padding: 20px 25px;
  background: rgba(0,0,0,0.03);
  border-radius: 18px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 123, 255, 0.08);
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  text-align: center;

  th, td {
    padding: 10px;
    border-bottom: 1px solid rgba(0,0,0,0.1);
  }

  th {
    background: #0077ff;
    color: #ffffff;
    font-weight: 600;
    border-radius: 8px 8px 0 0;
  }

  tr:nth-child(even) td {
    background: rgba(0,0,0,0.02);
  }
`;

const Select = styled.select`
  margin-top: 10px;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
  width: 100%;
  max-width: 250px;
`;

const PlayerBox = styled.div`
  margin-top: 15px;
`;

const PlayerTitle = styled.h3`
  margin-bottom: 10px;
  color: #0077ff;
`;

const StatRow = styled.div`
  margin-bottom: 6px;
`;

const StatLabel = styled.span`
  font-weight: 600;
  margin-right: 6px;
`;

// ---------------- Sample Data ----------------
const players = [
  { name: "철수", score: 85 },
  { name: "영희", score: 90 },
  { name: "민수", score: 78 },
  { name: "지우", score: 82 },
  { name: "수빈", score: 88 },
  { name: "예린", score: 80 },
  { name: "하준", score: 92 },
  { name: "서연", score: 77 },
  { name: "준호", score: 86 },
  { name: "다은", score: 81 },
];

const matchHistory = [
  { matchId: 1, red: ["철수","영희"], blue: ["민수","지우"], winner: "red", line: { 철수: "top", 영희: "mid", 민수: "jungle", 지우: "adc" }, champion: { 철수: "아리", 영희: "리신", 민수: "리븐", 지우: "쓰레쉬" } },
  { matchId: 2, red: ["수빈","예린"], blue: ["하준","서연"], winner: "blue", line: { 수빈: "top", 예린: "adc", 하준: "mid", 서연: "support" }, champion: { 수빈: "리븐", 예린: "쓰레쉬", 하준: "아리", 서연: "리신" } },
  { matchId: 3, red: ["철수","민수"], blue: ["영희","지우"], winner: "red", line: { 철수: "top", 민수: "jungle", 영희: "mid", 지우: "adc" }, champion: { 철수: "리븐", 민수: "아리", 영희: "쓰레쉬", 지우: "리신" } },
  { matchId: 4, red: ["준호","다은"], blue: ["하준","서연"], winner: "blue", line: { 준호: "top", 다은: "mid", 하준: "adc", 서연: "support" }, champion: { 준호: "리신", 다은: "아리", 하준: "쓰레쉬", 서연: "리븐" } },
];

// ---------------- Helper Functions ----------------
function calcPlayerStats(playerName) {
  const matchesPlayed = matchHistory.filter(
    (m) => m.red.includes(playerName) || m.blue.includes(playerName)
  );

  const wins = matchesPlayed.filter(
    (m) => (m.red.includes(playerName) && m.winner === "red") || (m.blue.includes(playerName) && m.winner === "blue")
  );

  // 맞상대 통계
  const opponents = {};
  matchesPlayed.forEach((m) => {
    const opponentsTeam = m.red.includes(playerName) ? m.blue : m.red;
    opponentsTeam.forEach((opp) => {
      if (!opponents[opp]) opponents[opp] = { matches: 0, wins: 0 };
      opponents[opp].matches += 1;
      if (wins.includes(m)) opponents[opp].wins += 1;
    });
  });

  // 같은 팀 통계
  const teammates = {};
  matchesPlayed.forEach((m) => {
    const teammatesTeam = m.red.includes(playerName) ? m.red : m.blue;
    teammatesTeam.forEach((mate) => {
      if (mate === playerName) return;
      if (!teammates[mate]) teammates[mate] = { matches: 0, wins: 0 };
      teammates[mate].matches += 1;
      if (wins.includes(m)) teammates[mate].wins += 1;
    });
  });

  // 라인별 승률
  const lines = {};
  matchesPlayed.forEach((m) => {
    const lineName = m.line[playerName];
    if (!lines[lineName]) lines[lineName] = { matches: 0, wins: 0 };
    lines[lineName].matches += 1;
    if (wins.includes(m)) lines[lineName].wins += 1;
  });

  // 챔피언별 승률
  const champions = {};
  matchesPlayed.forEach((m) => {
    const champName = m.champion[playerName];
    if (!champions[champName]) champions[champName] = { matches: 0, wins: 0 };
    champions[champName].matches += 1;
    if (wins.includes(m)) champions[champName].wins += 1;
  });

  return {
    totalMatches: matchesPlayed.length,
    totalWins: wins.length,
    winRate: matchesPlayed.length > 0 ? ((wins.length / matchesPlayed.length) * 100).toFixed(1) : 0,
    opponents,
    teammates,
    lines,
    champions,
  };
}

// ---------------- Main Component ----------------
export default function MatchStats() {
  const [selectedPlayer, setSelectedPlayer] = useState("");

  const playerStats = selectedPlayer ? calcPlayerStats(selectedPlayer) : null;

  return (
    <>
      <NavigationBar />
      <Container>
        <Title>내전 통계 보기</Title>

        {/* 전체 승률 */}
        <SectionBox>
          <h3>전체 플레이어 승률</h3>
          <Table>
            <thead>
              <tr>
                <th>플레이어</th>
                <th>승/경기</th>
                <th>승률 (%)</th>
              </tr>
            </thead>
            <tbody>
              {players.map((p, idx) => {
                const stats = calcPlayerStats(p.name);
                return (
                  <tr key={idx}>
                    <td>{p.name}</td>
                    <td>{stats.totalWins} / {stats.totalMatches}</td>
                    <td>{stats.winRate}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </SectionBox>

        {/* 개인 상세 */}
        <SectionBox>
          <h3>개인 상세 통계</h3>
          <Select value={selectedPlayer} onChange={(e) => setSelectedPlayer(e.target.value)}>
            <option value="">-- 플레이어 선택 --</option>
            {players.map((p) => (
              <option key={p.name} value={p.name}>{p.name}</option>
            ))}
          </Select>

          {playerStats && (
            <PlayerBox>
              <PlayerTitle>{selectedPlayer} 전적</PlayerTitle>
              <StatRow><StatLabel>총 경기:</StatLabel> {playerStats.totalMatches}</StatRow>
              <StatRow><StatLabel>승리:</StatLabel> {playerStats.totalWins}</StatRow>
              <StatRow><StatLabel>승률:</StatLabel> {playerStats.winRate} %</StatRow>

              <PlayerTitle>라인별 승률</PlayerTitle>
              {Object.entries(playerStats.lines).map(([line, s]) => (
                <StatRow key={line}>
                  <StatLabel>{line}:</StatLabel> {s.wins} / {s.matches} ({((s.wins/s.matches)*100).toFixed(1)}%)
                </StatRow>
              ))}

              <PlayerTitle>챔피언별 승률</PlayerTitle>
              {Object.entries(playerStats.champions).map(([champ, s]) => (
                <StatRow key={champ}>
                  <StatLabel>{champ}:</StatLabel> {s.wins} / {s.matches} ({((s.wins/s.matches)*100).toFixed(1)}%)
                </StatRow>
              ))}

              <PlayerTitle>맞상대 통계</PlayerTitle>
              {Object.keys(playerStats.opponents).length === 0 && <p>없음</p>}
              {Object.entries(playerStats.opponents).map(([opp, s]) => (
                <StatRow key={opp}>
                  <StatLabel>{opp}:</StatLabel> {s.wins} / {s.matches} ({((s.wins/s.matches)*100).toFixed(1)}%)
                </StatRow>
              ))}

              <PlayerTitle>같은 팀 통계</PlayerTitle>
              {Object.keys(playerStats.teammates).length === 0 && <p>없음</p>}
              {Object.entries(playerStats.teammates).map(([mate, s]) => (
                <StatRow key={mate}>
                  <StatLabel>{mate}:</StatLabel> {s.wins} / {s.matches} ({((s.wins/s.matches)*100).toFixed(1)}%)
                </StatRow>
              ))}
            </PlayerBox>
          )}
        </SectionBox>
      </Container>
    </>
  );
}
