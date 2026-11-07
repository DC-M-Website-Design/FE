export interface MemberProfile {
  name: string;
  role: string;
  description: string;
  affiliation?: string;
  profileUrl?: string;
  email?: string;
}

// Roster and counts supplied in the updated club wireframe.
export const faculty: MemberProfile = {
  name: "김태리",
  role: "지도교수",
  affiliation: "한성대학교 컴퓨터공학부",
  description: "추천 시스템과 그래프 기반 학습, 멀티모달 학습을 연구합니다.",
  profileUrl: "https://taerikkk.github.io/#education",
  email: "taerik@hansung.ac.kr",
};

export const officers: MemberProfile[] = [
  {
    name: "문선우",
    role: "회장",
    description: "동아리의 활동 방향과 운영을 함께 이끕니다.",
  },
  {
    name: "이규원",
    role: "부회장",
    description: "부원들의 활동과 모임을 함께 준비합니다.",
  },
  {
    name: "양다원",
    role: "총무",
    description: "동아리 운영에 필요한 실무를 맡습니다.",
  },
];

export interface DepartmentMembers {
  department: string;
  count: number | null;
}

export const departments: DepartmentMembers[] = [
  { department: "컴퓨터공학부", count: 26 },
  { department: "AI응용학과", count: 4 },
  { department: "융합보안학과", count: 1 },
];

export interface YearlyAchievements {
  year: number;
  items: string[];
}

// Historical achievements supplied by the user, grouped without deduplicating years.
export const achievements: YearlyAchievements[] = [
  {
    year: 2026,
    items: [
      "호반 주관 K-과학인재 아카데미 본선 진출",
      "한이음 드림업 본선 진행 중",
    ],
  },
  {
    year: 2025,
    items: [
      "2025 시스코 이노베이션 공모전 수상",
      "한이음 드림업 공모전 수상",
      "ACK 2025 학회 발표대회 참여",
      "Digicon-25 학회 발표대회 참여",
    ],
  },
  {
    year: 2022,
    items: [
      "과학기술정보통신부 주최 ‘이브와 ICT멘토링’ 선정",
      "한국정보처리학회 2022 추계학술발표대회 참여",
    ],
  },
  { year: 2020, items: ["과학기술정보통신부 주최 ‘이브와 ICT멘토링’ 선정"] },
  {
    year: 2019,
    items: [
      "‘한성대 증강현실(AR) 어플 - 한성GO’ 개발",
      "한성대학교 High Success Project 대상",
      "과학기술정보통신부 주최 ‘이브와 ICT멘토링’ 동상",
      "2019-2학기 HS 트랙탐색 프로그램(VR제작자팀) 선정",
    ],
  },
  {
    year: 2018,
    items: [
      "한성대학교 공학경진대회 대상",
      "성북구청 동북권 메이커 페스티벌 최우수상",
      "‘한성대 증강현실(AR) 어플 - 한성GO’ 개발",
      "과학기술정보통신부 주최 ‘이브와 ICT멘토링’ 장려상",
      "한성대학교 High Success Project 최우수상, 우수상",
    ],
  },
];
