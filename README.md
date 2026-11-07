# DC&M Frontend

DC&M 동아리 웹사이트의 React + TypeScript + Vite 프런트엔드입니다.
2026-11-07 수정된 Figma 와이어프레임의 구조·문구·인원 정보를 반영하고,
기존 초안의 민트 색상, Pretendard 글꼴, 카드 디자인과 반응형 구성을 유지했습니다.

## 실행

Node.js 버전은 `.node-version`과 `package.json`의 `engines`를 참고하세요.

```sh
npm ci
npm run dev
```

개발 주소: `http://127.0.0.1:4173`

```sh
npm run check
npm run build
```

## FE / BE 구분

- 이 레포지토리: 화면, 내비게이션, 밑줄 탭, 활동·공지 검색, 상세 모달, 지원 안내.
- 별도의 `BE` 레포지토리: 향후 Spring 기반 서버 구현. 현재 연결된 서버 API는 없습니다.
- 이전 `dcnm-club` 폴더는 디자인 초안 참고용입니다. 수정된 프런트엔드 작업 위치는 이 `FE` 레포지토리입니다.
- 두 레포지토리의 `.git`과 원격 저장소 설정은 각각 유지합니다.

## 화면

- `#/`: 랜딩 페이지
- `#/about`, `#/about/people`, `#/about/history`: 소개, 구성원, 연혁
- `#/activities`, `#/activities/projects`, `#/activities/study`, `#/activities/events`: 활동
- `#/community`, `#/community/faq`, `#/community/qna`: 공지사항, FAQ, Q&A
- `#/community/contact`: 기존 문의 주소 호환용 Q&A 화면
- `#/join`: Google 폼 지원 안내

FAQ와 Q&A를 분리했습니다. 기존 `#/community/qna`는 이제 문의 화면이며,
기존 FAQ 화면은 `#/community/faq`로 이동했습니다.

## Google 폼 연결

아직 지원 Google 폼 주소가 정해지지 않아 버튼은 모집 준비 중 상태입니다.
`.env.example`을 참고하여 `.env.local`을 만들고 다음 값을 설정한 뒤 서버를 재시작하세요.

```env
VITE_RECRUITMENT_FORM_URL=https://forms.gle/실제주소
```

`https://forms.gle/…` 또는 `https://docs.google.com/forms/…` 주소를 지원합니다.
URL이 유효하고 지원 절차 확인란을 체크했을 때 새 창으로 이동할 수 있습니다.
실제 지원 접수·면접 결과는 프런트엔드에서 저장하거나 성공 처리하지 않습니다.

## 콘텐츠와 기능 범위

- 구성원·인원·실적: `src/data/organization.ts`
- 활동·공지 예시: `src/data/content.ts`
- 메뉴·탭 명칭: `src/data/navigation.ts`
- 공식 이메일·Google 폼 설정: `src/config/club.ts`
- 로그인은 브라우저의 이름 저장 체험이며 실제 인증이 아닙니다.
- Q&A 폼은 입력 확인용 미리보기입니다. 실제 문의는 공식 이메일 링크를 사용합니다.
- `/api` 요청을 추가할 때 개발 서버는 `http://127.0.0.1:8080`의 Spring 서버로 프록시할 수 있습니다.

사진은 기존 초안의 예시 이미지입니다. 실제 동아리 사진으로 교체할 수 있습니다.
글꼴·아이콘 출처는 사이트 정보 화면과 `public`의 안내 파일에서 확인할 수 있습니다.
