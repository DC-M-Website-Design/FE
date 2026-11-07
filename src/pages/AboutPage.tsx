import { useEffect, useRef } from "react";
import "./HistoryTimeline.css";
import { aboutParagraphs, club } from "../data/content";
import {
  achievements,
  departments,
  faculty,
  officers,
} from "../data/organization";
import type { MemberProfile } from "../data/organization";
import { Icon, PageHeader, PageTabs } from "../components/Common";
import { aboutTabs } from "../data/navigation";

function MemberCard({
  member,
  isFaculty = false,
}: {
  member: MemberProfile;
  isFaculty?: boolean;
}) {
  return (
    <article
      className={`member-card ${isFaculty ? "faculty-card" : "officer-card"}`}
    >
      <div className="member-avatar" aria-hidden="true">
        <Icon name="user" />
      </div>
      <div className="member-details">
        <p className="member-role">{member.role}</p>
        <h3>
          {member.name}
          <span>{isFaculty ? "교수" : ""}</span>
        </h3>
        {member.affiliation && (
          <p className="member-affiliation">{member.affiliation}</p>
        )}
        <p className="member-description">{member.description}</p>
      </div>
      {isFaculty && (member.profileUrl || member.email) && (
        <div className="faculty-links">
          {member.profileUrl && (
            <a
              href={member.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} 교수 소개 페이지 (새 창)`}
            >
              <span>교수님 소개 페이지</span>
              <Icon name="external-link" />
            </a>
          )}
          {member.email && (
            <a href={`mailto:${member.email}`}>
              <span>{member.email}</span>
              <Icon name="mail" />
            </a>
          )}
        </div>
      )}
    </article>
  );
}

function PeopleSection() {
  const allCountsKnown = departments.every(
    (department) => department.count !== null,
  );
  const total = departments.reduce(
    (sum, department) => sum + (department.count ?? 0),
    0,
  );
  return (
    <div className="organization-page">
      <section className="organization-section" aria-labelledby="faculty-title">
        <div className="organization-heading">
          <h2 id="faculty-title">지도교수</h2>
          <p>우리의 배움과 도전을 함께 이끌어 주시는 분.</p>
        </div>
        <MemberCard member={faculty} isFaculty />
      </section>
      <section
        className="organization-section"
        aria-labelledby="officers-title"
      >
        <div className="organization-heading">
          <h2 id="officers-title">운영진</h2>
          <p>함께할 기회를 만들고, 동아리의 일상을 준비합니다.</p>
        </div>
        <div className="officers-grid">
          {officers.map((member) => (
            <MemberCard key={member.name} member={member} />
          ))}
        </div>
      </section>
      <section className="organization-section" aria-labelledby="members-title">
        <div className="organization-heading">
          <h2 id="members-title">구성원</h2>
          <p>서로 다른 전공의 우리가 모여, 함께 배우고 성장합니다.</p>
        </div>
        <div className="department-panel">
          <div className="department-panel-heading">
            <h3>학과별 인원</h3>
            {allCountsKnown ? (
              <p>
                총 <strong>{total}</strong>명
              </p>
            ) : (
              <p>인원 집계 예정</p>
            )}
          </div>
          <dl className="department-counts">
            {departments.map(({ department, count }) => (
              <div className="department-item" key={department}>
                <dt>
                  <Icon name="users" />
                  {department}
                </dt>
                <dd className={count === null ? "pending-count" : ""}>
                  {count === null ? (
                    "집계 예정"
                  ) : (
                    <>
                      <strong>{count}</strong>
                      <span>명</span>
                    </>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </div>
  );
}

function AchievementsSection() {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;
    let frame = 0;
    const track = timeline.querySelector<HTMLElement>(".history-track");
    const rows = timeline.querySelectorAll<HTMLElement>(".achievement-year, .history-origin");
    const update = () => {
      const rect = (track ?? timeline).getBoundingClientRect();
      const trigger = window.innerHeight * 0.78;
      const progress = Math.max(0, Math.min(1, (trigger - rect.top) / rect.height));
      timeline.style.setProperty("--history-progress", String(progress));
      rows.forEach((row) => {
        row.classList.toggle("is-visible", row.getBoundingClientRect().top <= trigger);
      });
      frame = 0;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    // Only hide upcoming cards after the scroll handler is ready.
    timeline.classList.add("is-animated");
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <div className="achievements-timeline" ref={timelineRef}>
      <div className="history-track" aria-hidden="true"><span /></div>
      {achievements.map(({ year, items }) => (
        <section
          className="achievement-year"
          key={year}
          aria-labelledby={`year-${year}`}
        >
          <span className="history-dot" aria-hidden="true" />
          <div className="history-card">
            <h2 id={`year-${year}`}>{year}</h2>
            <ul>
              {items.map((item) => (
                <li key={item}><Icon name="check" /><span>{item}</span></li>
              ))}
            </ul>
          </div>
        </section>
      ))}
      <section className="history-origin" aria-labelledby="history-origin-year">
        <div className="history-origin-badge">
          <span className="history-origin-label">SINCE</span>
          <h2 id="history-origin-year">2001</h2>
          <p>DC&amp;M 동아리 시작</p>
        </div>
      </section>
    </div>
  );
}

export default function AboutPage({ section }: { section: string }) {
  const title =
    section === "people"
      ? "함께 만드는 DC&M."
      : section === "history"
        ? "우리 동아리의 실적"
        : "저희는 DC&M입니다";
  const description =
    section === "people"
      ? "동아리를 이끄는 지도교수와 운영진, 함께하는 구성원을 소개합니다."
      : section === "history"
        ? "공모전과 프로젝트, 다양한 활동으로 만들어 온 DC&M의 실적입니다."
        : club.introduction;
  return (
    <div className="container page">
      <PageHeader
        title={title}
        description={description}
        breadcrumb="동아리 소개"
      />
      <PageTabs
        items={aboutTabs}
        active={section ? `about/${section}` : "about"}
      />
      {section === "people" ? (
        <PeopleSection />
      ) : section === "history" ? (
        <AchievementsSection />
      ) : (
        <section className="about-intro">
          <img
            src="/assets/team.jpg"
            width="650"
            height="430"
            alt="함께 모여 이야기하는 예시 사진"
          />
          <div>
            <span className="section-label">{club.fullName}</span>
            <h2>
              함께 도전하고,
              <br />
              경험을 나누며 성장합니다.
            </h2>
            {aboutParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <a className="text-link" href="#/join">
              함께하는 방법 <Icon name="arrow-right" />
            </a>
          </div>
        </section>
      )}
    </div>
  );
}
