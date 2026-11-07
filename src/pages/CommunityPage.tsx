import { useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { FaqList, Icon, PageHeader, PageTabs, SampleNote } from "../components/Common";
import { clubContact } from "../config/club";
import { notices } from "../data/content";
import { communityTabs } from "../data/navigation";
import { NoticeDetail } from "./SitePages";

type OpenModal = (content: ReactNode) => void;

function ContactForm({ openModal }: { openModal: OpenModal }) {
  const [error, setError] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const message = String(data.get("message") || "").trim();
    if (!name || message.replace(/\s/g, "").length < 5) {
      setError("이름과 공백을 제외한 5자 이상의 문의 내용을 작성해 주세요.");
      return;
    }
    setError("");
    openModal(
      <>
        <div className="dialog-category">문의 내용 미리보기</div>
        <h2 id="dialog-title" className="dialog-title">{String(data.get("category"))}</h2>
        <div className="dialog-meta">작성자: {name}</div>
        <div className="dialog-content">
          <p className="preserve-text">{message}</p>
          <SampleNote>
            외부로 전송되지 않았습니다. 실제 문의는 공식 이메일로 보내 주세요.
          </SampleNote>
          <a className="text-link" href={`mailto:${clubContact.email}`}>{clubContact.email}</a>
        </div>
      </>,
    );
  }

  return (
    <div className="contact-layout">
      <div className="contact-copy">
        <h2>어떤 이야기가<br />궁금하신가요?</h2>
        <p>가입, 활동, 협업 등 궁금한 내용을 남겨 주세요.</p>
        <div className="info-box">
          <h3>공식 이메일 문의</h3>
          <a className="contact-email" href={`mailto:${clubContact.email}`}>{clubContact.email}</a>
        </div>
      </div>
      <form className="form-panel" onSubmit={submit}>
        <div className="field">
          <label htmlFor="contact-category">문의 유형 (선택)</label>
          <select id="contact-category" name="category">
            <option>가입 문의</option><option>활동 문의</option><option>협업 제안</option><option>기타 문의</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="contact-name">이름 또는 닉네임</label>
          <input id="contact-name" name="name" maxLength={30} required autoComplete="off" placeholder="편하게 불러 드릴 이름" />
        </div>
        <div className="field">
          <label htmlFor="contact-message">궁금한 내용</label>
          <textarea id="contact-message" name="message" maxLength={1500} minLength={5} required placeholder="궁금한 내용을 5자 이상 남겨 주세요." aria-describedby={error ? "contact-error contact-help" : "contact-help"} />
        </div>
        {error ? <p className="form-error" id="contact-error" role="alert">{error}</p> : null}
        <button className="button" type="submit">문의하기 <Icon name="arrow-right" /></button>
        <p className="field-help" id="contact-help">작성한 내용의 미리보기를 제공합니다. 실제 문의는 공식 이메일로 보내 주세요.</p>
      </form>
    </div>
  );
}

function Notices({ openModal }: { openModal: OpenModal }) {
  const [query, setQuery] = useState("");
  const filtered = notices.filter((notice) =>
    `${notice.title} ${notice.type}`.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <>
      <div className="notice-controls">
        <label className="search-field">
          <Icon name="search" />
          <input type="search" aria-label="공지 검색" placeholder="공지 검색" value={query} onChange={(event) => setQuery(event.target.value)} />
        </label>
      </div>
      <p className="result-count" aria-live="polite">총 {filtered.length}개의 공지</p>
      <div className="board-table">
        {filtered.map((notice) => (
          <button className="news-row" key={notice.id} aria-label={`${notice.title} 읽기`} onClick={() => openModal(<NoticeDetail notice={notice} />)}>
            <span className={`category ${notice.type === "행사" ? "neutral" : ""}`}>{notice.type}</span>
            <span className="news-title">
              {notice.title}
              {notice.isNew ? <span className="new-mark" aria-label="새 글">N</span> : null}
            </span>
            <time className="news-date" dateTime={notice.date.replaceAll(".", "-")}>{notice.date.slice(2)}</time>
          </button>
        ))}
        {filtered.length === 0 ? (
          <div className="empty-state">
            <Icon name="search" /><h2>일치하는 공지가 없어요.</h2><p>다른 검색어로 찾아보세요.</p>
            <button className="button outline" type="button" onClick={() => setQuery("")}>전체 공지 보기</button>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default function CommunityPage({ section, openModal }: { section: string; openModal: OpenModal }) {
  const isFaq = section === "faq";
  const isQna = section === "qna" || section === "contact";
  const [title, description] = isFaq
    ? ["시작 전, 궁금한 이야기.", "DC&M이 궁금한 여러분을 위해 자주 묻는 질문을 모았습니다."]
    : isQna
      ? ["편하게, 이야기해 주세요.", "궁금한 점도 새로운 제안도 좋습니다. 여러분의 이야기를 기다립니다."]
      : ["공지사항", "함께할 기회와 놓치지 말아야 할 이야기를 확인해 보세요."];

  return (
    <div className="container page community-page">
      <PageHeader title={title} description={description} breadcrumb="커뮤니티" />
      <PageTabs items={communityTabs} active={isFaq ? "community/faq" : isQna ? "community/qna" : "community"} />
      {isFaq ? <FaqList /> : isQna ? <ContactForm openModal={openModal} /> : <Notices openModal={openModal} />}
    </div>
  );
}
