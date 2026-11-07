import type { CSSProperties, ReactNode } from "react";
import { faqs } from "../data/content";
import type { Activity } from "../data/content";

export function Icon({ name }: { name: string }) {
  return (
    <span
      className="icon"
      style={{ "--icon": `url('/assets/icons/${name}.svg')` } as CSSProperties}
      aria-hidden="true"
    />
  );
}

export function Brand() {
  return (
    <a href="#/" className="brand" aria-label="DC&M 홈">
      <span className="brand-symbol" aria-hidden="true">
        &amp;
      </span>
      <span>
        DC&amp;M
      </span>
    </a>
  );
}

export function SampleNote({
  children = "현재 보이는 활동과 게시글은 웹사이트 구성을 위한 예시입니다.",
}: {
  children?: ReactNode;
}) {
  return (
    <div className="sample-note">
      <Icon name="file-text" />
      <span>{children}</span>
    </div>
  );
}

export function PageHeader({
  title,
  description,
  breadcrumb,
}: {
  title: string;
  description: string;
  breadcrumb: string;
}) {
  return (
    <>
      <div className="breadcrumb">
        <a href="#/">홈</a>
        <Icon name="chevron-down" />
        <span>{breadcrumb}</span>
      </div>
      <div className="page-header">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </>
  );
}

export function PageTabs({
  items,
  active,
}: {
  items: readonly (readonly [string, string])[];
  active: string;
}) {
  return (
    <nav className="page-tabs" aria-label="하위 메뉴">
      {items.map(([path, title]) => (
        <a
          key={path}
          href={`#/${path}`}
          className={active === path ? "active" : ""}
          aria-current={active === path ? "page" : undefined}
        >
          {title}
        </a>
      ))}
    </nav>
  );
}

export function ActivityCover({ activity }: { activity: Activity }) {
  return (
    <div
      className={`activity-cover ${activity.art ? `project-art ${activity.tone || ""}` : ""}`}
    >
      {activity.image ? (
        <img
          src={`/assets/${activity.image}`}
          alt={activity.alt || ""}
          loading="lazy"
          width="600"
          height="380"
        />
      ) : (
        <>
          <div>
            <div className="project-monogram">{activity.art}</div>
            <small>{activity.subtitle}</small>
          </div>
          <span className="project-star" aria-hidden="true">
            ✳︎
          </span>
        </>
      )}
    </div>
  );
}

export function ActivityCard({
  activity,
  onSelect,
}: {
  activity: Activity;
  onSelect: (activity: Activity) => void;
}) {
  return (
    <button
      className="activity-card"
      onClick={() => onSelect(activity)}
      aria-label={`${activity.title} 자세히 보기`}
    >
      <ActivityCover activity={activity} />
      <div className="activity-meta">
        <span>{activity.type}</span>
        <span>{activity.date}</span>
      </div>
      <h3>{activity.title}</h3>
      <p>{activity.description}</p>
    </button>
  );
}

export function FaqList() {
  return (
    <div className="faq-list">
      {faqs.map(([q, a], index) => (
        <details key={q} open={index === 0}>
          <summary>
            <span>
              <span className="faq-prefix">Q.</span>
              {q}
            </span>
          </summary>
          <p>{a}</p>
        </details>
      ))}
    </div>
  );
}
