export const aboutTabs = [
  ["about", "DC&M 소개"],
  ["about/people", "지도교수 · 구성원"],
  ["about/history", "동아리 연혁"],
] as const;

export const communityTabs = [
  ["community", "공지사항"],
  ["community/faq", "FAQ"],
  ["community/qna", "Q&A"],
] as const;

export const navigation = [
  { title: "동아리 소개", id: "about", links: aboutTabs },
  {
    title: "활동 내용",
    id: "activities",
    links: [
      ["activities", "모든 활동"],
      ["activities/projects", "프로젝트"],
      ["activities/study", "스터디"],
      ["activities/events", "행사 · 교류"],
    ],
  },
  { title: "커뮤니티", id: "community", links: communityTabs },
] as const;
