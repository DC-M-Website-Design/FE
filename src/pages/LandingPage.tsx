import { useEffect, useRef } from "react";
import { club } from "../data/content";
import { Icon } from "../components/Common";

const memberActivities = [
  {
    path: "projects",
    icon: "code",
    title: "함께 도전하는 공모전과 프로젝트",
    description:
      "관심 있는 분야의 공모전과 팀 프로젝트에 함께 도전합니다.",
  },
  {
    path: "study",
    icon: "book-2",
    title: "개발 역량을 함께 키우는 스터디",
    description:
      "궁금했던 기술을 함께 공부하고 경험과 노하우를 나눕니다.",
  },
  {
    path: "events",
    icon: "users",
    title: "선후배 간의 교류 활동",
    description:
      "수업과 진로, 대학 생활에 대한 경험과 조언을 나누며 교류합니다.",
  },
];

export default function LandingPage() {
  const goalsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = goalsRef.current;
    if (!section || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      section.classList.toggle("is-visible", entry.isIntersecting);
    }, { threshold: 0.15 });
    section.classList.add("goals-animated");
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="container landing-page">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="hero-kicker">LEARN. BUILD. TOGETHER.</p>
          <h1 id="hero-title">DC&amp;M</h1>
          <p className="hero-description">한성대학교 학술 정동아리</p>
          <p className="hero-introduction">함께 배우고, 직접 만들고.<br />우리의 가능성을 넓혀가는 곳.</p>
          <div className="hero-actions">
            <a className="button mint" href="#/about">
              DC&amp;M 알아보기 <Icon name="arrow-up-right" />
            </a>
            <button
              className="text-link plain-button"
              onClick={() =>
                document.getElementById("member-activities")?.scrollIntoView({
                  behavior: matchMedia("(prefers-reduced-motion: reduce)")
                    .matches
                    ? "instant"
                    : "smooth",
                })
              }
            >
              어떤 활동을 하나요? <Icon name="arrow-right" />
            </button>
          </div>
        </div>
        <figure className="landing-collage">
          <div className="collage-orbit" aria-hidden="true" />
          <div className="collage-photo collage-photo-main">
            <img src="/assets/club-project-ai.png" width="1536" height="1024" alt="대학생들이 노트북으로 함께 프로젝트를 진행하는 AI 생성 예시 이미지" fetchPriority="high" />
            <span className="collage-photo-label"><Icon name="code" /> BUILD TOGETHER</span>
          </div>
          <div className="collage-photo collage-photo-detail">
            <img src="/assets/club-study-ai.png" width="1536" height="1024" alt="노트북과 노트를 보며 공부하는 AI 생성 스터디 예시 이미지" />
            <span className="collage-photo-label">작은 아이디어에서 시작하는 우리</span>
          </div>
          <span className="collage-tag collage-tag-study"><Icon name="book-2" /> STUDY</span>
          <span className="collage-tag collage-tag-project"><Icon name="users" /> TOGETHER</span>
          <figcaption>동아리 활동을 표현한 AI 생성 이미지입니다.</figcaption>
        </figure>
      </section>
      <section className="goals-section" aria-labelledby="goals-title" ref={goalsRef}>
        <div className="goal-layout">
          <div className="goal-intro">
            <span className="section-label">동아리 목표</span>
            <h2 id="goals-title">
              <span>선후배와 소통하고,</span>{" "}
              <span>같이 성장할 수 있는 학술 동아리</span>
            </h2>
            <p>{club.goal}</p>
          </div>
          <ol className="growth-journey" aria-label="함께 성장하는 과정">
            <li>
              <span className="growth-icon"><Icon name="message-circle" /></span>
              <span className="growth-step">01 / CONNECT</span>
              <h3>소통</h3>
              <p>먼저 걸어온 선배와, 함께할 동료.<br />대학 생활과 진로의 경험을 나눕니다.</p>
            </li>
            <li>
              <span className="growth-icon"><Icon name="book-2" /></span>
              <span className="growth-step">02 / LEARN</span>
              <h3>배움</h3>
              <p>혼자서는 막막했던 새로운 기술도.<br />서로 묻고 알려주며 함께 익힙니다.</p>
            </li>
            <li>
              <span className="growth-icon"><Icon name="code" /></span>
              <span className="growth-step">03 / BUILD</span>
              <h3>도전</h3>
              <p>작은 아이디어를 실제 결과물로.<br />함께 만들며 다음 가능성을 엽니다.</p>
            </li>
          </ol>
        </div>
      </section>
      <section
        className="home-section landing-activities"
        id="member-activities"
        aria-labelledby="activities-title"
      >
        <div className="section-heading">
          <div>
            <h2 id="activities-title">DC&amp;M에 들어오면</h2>
            <p>함께 배우는 시간부터, 직접 만드는 경험까지 가능합니다.</p>
          </div>
          <a className="text-link" href="#/activities">
            활동 살펴보기 <Icon name="arrow-up-right" />
          </a>
        </div>
        <div className="join-activities-layout">
          <div className="member-activity-photo">
            <img
              src="/assets/study.jpg"
              alt="동료와 함께 콘텐츠를 기획하는 예시 사진"
              loading="lazy"
              width="650"
              height="600"
            />
          </div>
          <div className="activity-options">
            {memberActivities.map((item) => (
              <a
                className="activity-option"
                key={item.path}
                href={`#/activities/${item.path}`}
              >
                <div className="option-heading">
                  <span className="quick-icon">
                    <Icon name={item.icon} />
                  </span>
                  <Icon name="arrow-up-right" />
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
      <aside className="landing-invite">
        <div>
          <h2>처음이어도 괜찮아요. 함께 시작해요.</h2>
          <p>함께 배우고 도전할 동료를 DC&amp;M에서 만나 보세요.</p>
        </div>
        <a className="button" href="#/join">
          가입 안내 보기 <Icon name="arrow-up-right" />
        </a>
      </aside>
    </div>
  );
}
