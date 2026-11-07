import { useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { activities } from "../data/content";
import type { Activity, ActivityCategory, Notice } from "../data/content";
import {
  ActivityCard,
  ActivityCover,
  Icon,
  PageHeader,
} from "../components/Common";
import type { Profile } from "../lib/storage";

type OpenModal = (content: ReactNode) => void;


export function ActivityDetail({ activity }: { activity: Activity }) {
  return (
    <>
      <div className="dialog-cover">
        <ActivityCover activity={activity} />
      </div>
      <div className="dialog-category">{activity.type} · 예시 활동</div>
      <h2 className="dialog-title" id="dialog-title">
        {activity.title}
      </h2>
      <div className="dialog-meta">{activity.date} · DC&amp;M 활동 기록</div>
      <div className="dialog-content">
        <p>{activity.body}</p>
        <h3>이런 경험을 함께해요</h3>
        <ul>
          {activity.details.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p>
          활동 구성의 예시입니다. 실제 활동 기록과 결과물은 추후 등록할 수
          있습니다.
        </p>
      </div>
    </>
  );
}

export function ActivitiesPage({
  category,
  openModal,
}: {
  category: string;
  openModal: OpenModal;
}) {
  const initial = ["projects", "study", "events"].includes(category)
    ? (category as ActivityCategory)
    : "all";
  const [filter, setFilter] = useState<ActivityCategory | "all">(initial);
  const [query, setQuery] = useState("");
  const filtered = activities.filter(
    (activity) =>
      (filter === "all" || activity.category === filter) &&
      `${activity.title} ${activity.description} ${activity.type}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  const filters = [
    ["all", "전체 활동"],
    ["projects", "프로젝트"],
    ["study", "스터디"],
    ["events", "행사 · 교류"],
  ] as const;
  return (
    <div className="container page activities-page">
      <PageHeader
        title="DC&M의 발자취"
        description="DC&M에서 현재까지 이룬 경험입니다."
        breadcrumb="활동 내용"
      />
      <div className="activities-controls">
        <div className="tab-row" role="group" aria-label="활동 분류">
          {filters.map(([value, label]) => (
            <button
              key={value}
              className="filter-tab"
              aria-pressed={filter === value}
              onClick={() => setFilter(value)}
            >
              {label}
            </button>
          ))}
        </div>
        <label className="search-field">
          <Icon name="search" />
          <input
            type="search"
            aria-label="활동 검색"
            placeholder="활동 검색"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
      </div>
      <p className="result-count" aria-live="polite">
        총 {filtered.length}개의 활동
      </p>
      <div className="activity-grid">
        {filtered.length ? (
          filtered.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              onSelect={(selected) =>
                openModal(<ActivityDetail activity={selected} />)
              }
            />
          ))
        ) : (
          <div className="empty-state">
            <Icon name="search" />
            <h2>아직 일치하는 활동이 없어요.</h2>
            <p>다른 검색어로 찾아보거나 전체 활동을 확인해 보세요.</p>
            <button
              className="button outline"
              onClick={() => {
                setFilter("all");
                setQuery("");
              }}
            >
              전체 활동 보기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export function NoticeDetail({ notice }: { notice: Notice }) {
  return (
    <>
      <div className="dialog-category">{notice.type} · 예시 게시글</div>
      <h2 className="dialog-title" id="dialog-title">
        {notice.title}
      </h2>
      <div className="dialog-meta">DC&amp;M 운영진 · {notice.date}</div>
      <div className="dialog-content">
        {notice.paragraphs.map((text) => (
          <p key={text}>{text}</p>
        ))}
        {notice.items ? (
          <ul>
            {notice.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : null}
      </div>
      {notice.action ? (
        <a className="button dialog-action" href="#/join">
          가입 안내 보기 <Icon name="arrow-right" />
        </a>
      ) : null}
    </>
  );
}

export function ProfileDialog({
  profile,
  onSignIn,
  onSignOut,
}: {
  profile: Profile | null;
  onSignIn: (name: string) => void;
  onSignOut: () => void;
}) {
  const [error, setError] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const name = String(
      new FormData(event.currentTarget).get("name") || "",
    ).trim();
    if (!name) {
      setError("공백을 제외한 이름을 입력해 주세요.");
      return;
    }
    onSignIn(name);
  }
  return profile ? (
    <>
      <div className="dialog-category">이 브라우저의 체험용 프로필</div>
      <h2 id="dialog-title" className="profile-heading">
        반가워요, {profile.name}님.
      </h2>
      <p className="profile-description">
        실제 회원 계정이나 인증 기능은 연결되지 않았습니다.
      </p>
      <div className="profile-controls">
        <a href="#/join" className="button">
          가입 안내 보기 <Icon name="arrow-right" />
        </a>
        <button className="text-button" onClick={onSignOut}>
          프로필 나가기
        </button>
      </div>
    </>
  ) : (
    <>
      <h2 id="dialog-title" className="profile-heading">
        반가워요!
      </h2>
      <p className="profile-description">
        이름으로 동아리 사이트를 가볍게 체험해 보세요.
        <br />
        실제 로그인은 추후 연결할 수 있습니다.
      </p>
      <form className="profile-form" onSubmit={submit}>
        <div className="field">
          <label htmlFor="profile-name">이름 또는 닉네임</label>
          <input
            id="profile-name"
            name="name"
            required
            maxLength={30}
            placeholder="어떻게 불러 드릴까요?"
            autoComplete="off"
          />
          <p className="field-help">
            이 브라우저에서만 사용하는 체험 기능입니다. 브라우저가 저장을
            지원하면 이름을 보관합니다.
          </p>
        </div>
        {error ? (
          <p role="alert" className="form-error">
            {error}
          </p>
        ) : null}
        <button className="button" type="submit">
          체험 시작하기 <Icon name="arrow-right" />
        </button>
      </form>
    </>
  );
}

export function CreditsDialog() {
  return (
    <>
      <h2 id="dialog-title" className="dialog-title">
        이 웹사이트에 관하여
      </h2>
      <div className="dialog-content credits-grid">
        <p>
          DC&amp;M은 Digital Contents and Multimedia의 약자입니다. 소개와 실적은
          동아리에서 제공한 내용을 바탕으로 구성했습니다. 지도교수와 운영진의
          이름·직책과 학과별 인원은 수정한 와이어프레임을 반영했습니다. 일부 활동·게시글은 예시입니다.
        </p>
        <p>
          프로필은 이 브라우저에서만 사용하는 체험 기능입니다. 동아리 지원은
          구글폼으로 안내하며, 문의는 공식 이메일을 이용할 수 있습니다.
        </p>
        <h3>사진과 글꼴</h3>
        <p>
          사진은{" "}
          <a
            href="https://unsplash.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Unsplash
          </a>
          의 예시 이미지로 실제 동아리 구성원과 활동 사진이 아닙니다.
        </p>
        <p>
          <a
            href="https://github.com/orioncactus/pretendard"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pretendard
          </a>{" "}
          (SIL Open Font License) ·{" "}
          <a
            href="https://tabler.io/icons"
            target="_blank"
            rel="noopener noreferrer"
          >
            Tabler Icons
          </a>{" "}
          (MIT)
        </p>
      </div>
    </>
  );
}
