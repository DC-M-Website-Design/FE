import { useState } from "react";
import { Icon, PageHeader } from "../components/Common";
import { clubContact } from "../config/club";

const applicationSteps = [
  "구글폼 제출",
  "지원서 양식 전송",
  "지원서 작성 후 이메일로 제출",
  "지원서 합격자 대상 면접 진행",
] as const;

export default function JoinPage() {
  const [confirmed, setConfirmed] = useState(false);
  const formUrl = clubContact.recruitmentFormUrl;

  return (
    <div className="container page">
      <PageHeader
        title="DC&M과 함께할래요?"
        description="동아리에 지원하여 저희와 함께 새로운 이야기를 시작해요."
        breadcrumb="동아리 지원"
      />
      <div className="join-intro">
        <div className="join-copy">
          <h2>
            어떤 시작이든,
            <br />
            함께하면 더 재미있으니까.
          </h2>
          <p>
            배우고 싶은 것, 만들어 보고 싶은 것.
            <br />
            DC&amp;M에서 함께할 동료를 찾아 보세요.
          </p>
          <section className="recruitment-process" aria-labelledby="process-title">
            <h3 id="process-title">지원 과정</h3>
            <ol className="join-steps">
              {applicationSteps.map((step, index) => (
                <li className="join-step" key={step}>
                  <span className="step-number" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p>{step}</p>
                </li>
              ))}
            </ol>
          </section>
        </div>
        <section className="form-panel recruitment-panel" aria-labelledby="form-title">
          <span className="section-label">JOIN DC&amp;M</span>
          <h2 className="form-heading" id="form-title">구글폼 제출</h2>
          <p className="form-description">
            지원 절차를 확인하고, 구글폼에서 첫인사를 남겨 주세요.
          </p>
          <label className="check-label">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(event) => setConfirmed(event.target.checked)}
            />
            <span>
              구글폼 작성 후 전송받은 지원서를 제출해야 지원이 완료되는 사실을
              확인했어요.
            </span>
          </label>
          {formUrl && confirmed ? (
            <a className="button full-width" href={formUrl} target="_blank" rel="noopener noreferrer">
              구글폼 제출하러 가기 <Icon name="arrow-up-right" />
            </a>
          ) : (
            <button className="button full-width" type="button" disabled aria-describedby="recruitment-help">
              구글폼 제출하러 가기 <Icon name="arrow-up-right" />
            </button>
          )}
          <p className="field-help" id="recruitment-help" role="status">
            {formUrl
              ? confirmed
                ? "새 창에서 구글폼을 열어요."
                : "위의 지원 절차를 확인해 주세요."
              : "아직 모집 폼이 열리지 않았어요. 준비가 끝나면 이곳에서 안내할게요."}
          </p>
          <a className="recruitment-contact text-link" href={`mailto:${clubContact.email}`}>
            지원 관련 문의 <Icon name="arrow-right" />
          </a>
        </section>
      </div>
    </div>
  );
}
