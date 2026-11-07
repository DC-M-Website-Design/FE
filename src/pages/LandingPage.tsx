import { club } from "../data/content";
import { Icon } from "../components/Common";

const memberActivities = [
  {
    path: "projects",
    icon: "code",
    title: "함께 도전하는 공모전과 프로젝트",
    description:
      "관심 있는 분야의 공모전과 팀 프로젝트에 함께 도전합니다.",
    detail: "공모전 · 개발 · 협업",
  },
  {
    path: "study",
    icon: "book-2",
    title: "개발 역량을 함께 키우는 스터디",
    description:
      "궁금했던 기술을 함께 공부하고 경험과 노하우를 나눕니다.",
    detail: "학습 · 실습 · 피드백",
  },
  {
    path: "events",
    icon: "users",
    title: "선후배 간의 교류 활동",
    description:
      "수업과 진로, 대학 생활에 대한 경험과 조언을 나누며 교류합니다.",
    detail: "정보 공유 · 조언 · 교류",
  },
];

export default function LandingPage() {
  return (
    <div className="container landing-page">
      <div className="landing-intro">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <h1 id="hero-title">DC&amp;M</h1>
            <p className="hero-description">한성대학교 학술 정동아리</p>
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
        </section>
        <section className="goals-section" aria-labelledby="goals-title">
          <div className="goal-layout">
            <div className="goal-intro">
              <span className="section-label">동아리 목표</span>
              <h2 id="goals-title">
                <span>선후배와 소통하고,</span>{" "}
                <span>같이 성장할 수 있는 학술 동아리</span>
              </h2>
              <p>{club.goal}</p>
            </div>
          </div>
        </section>
      </div>
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
            <div className="member-photo-caption">
              <strong>서로의 경험이, 다음 도전의 시작.</strong>
              <p>같은 관심사를 가진 동료와 함께해요.</p>
            </div>
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
                <span className="option-detail">{item.detail}</span>
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
