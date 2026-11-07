import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import Header from "./components/Header";
import Dialog from "./components/Dialog";
import { Brand, Icon } from "./components/Common";
import LandingPage from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage";
import CommunityPage from "./pages/CommunityPage";
import JoinPage from "./pages/JoinPage";
import {
  ActivitiesPage,
  CreditsDialog,
  ProfileDialog,
} from "./pages/SitePages";
import {
  readProfile,
  removeProfile,
  saveLocal,
} from "./lib/storage";
import { club } from "./data/content";

const currentRoute = () =>
  location.hash.startsWith("#/") ? location.hash.slice(2) : "";
const readDark = () =>
  document.documentElement.dataset.theme
    ? document.documentElement.dataset.theme === "dark"
    : matchMedia("(prefers-color-scheme: dark)").matches;
const validRoutes = new Set([
  "",
  "about",
  "about/people",
  "about/history",
  "activities",
  "activities/projects",
  "activities/study",
  "activities/events",
  "community",
  "community/faq",
  "community/qna",
  "community/contact",
  "join",
]);

export default function App() {
  const [route, setRoute] = useState(currentRoute);
  const [modal, setModal] = useState<ReactNode | null>(null);
  const [profile, setProfile] = useState(readProfile);
  const [dark, setDark] = useState(readDark);
  const main = useRef<HTMLElement>(null);
  const closeModal = useCallback(() => setModal(null), []);
  const openModal = useCallback((content: ReactNode) => setModal(content), []);

  useEffect(() => {
    function onHashChange() {
      if (!location.hash.startsWith("#/")) return;
      setRoute(currentRoute());
      setModal(null);
    }
    function closeOnNavigation(event: MouseEvent) {
      if (
        event.target instanceof Element &&
        event.target.closest('a[href^="#/"]')
      )
        setModal(null);
    }
    window.addEventListener("hashchange", onHashChange);
    document.addEventListener("click", closeOnNavigation);
    return () => {
      window.removeEventListener("hashchange", onHashChange);
      document.removeEventListener("click", closeOnNavigation);
    };
  }, []);

  useEffect(() => {
    const titles: Record<string, string> = {
      about: "동아리 소개",
      activities: "활동 내용",
      community: "커뮤니티",
      join: "동아리 지원",
    };
    document.title = `DC&M | ${route ? titles[route.split("/")[0]] || "페이지를 찾을 수 없습니다" : club.fullName}`;
    window.scrollTo({ top: 0, behavior: "instant" });
    if (route) main.current?.focus({ preventScroll: true });
  }, [route]);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }, [dark]);

  useEffect(() => {
    const media = matchMedia("(prefers-color-scheme: dark)");
    const followSystem = () => {
      let preference: string | null = null;
      try {
        preference = localStorage.getItem("dcnm-theme");
      } catch {
        /* Follow the system without local storage. */
      }
      if (preference !== "light" && preference !== "dark")
        setDark(media.matches);
    };
    media.addEventListener("change", followSystem);
    return () => media.removeEventListener("change", followSystem);
  }, []);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    try {
      localStorage.setItem("dcnm-theme", next ? "dark" : "light");
    } catch {
      /* Theme still changes for this session. */
    }
  }

  function showProfile() {
    openModal(
      <ProfileDialog
        profile={profile}
        onSignIn={(name) => {
          const next = { name };
          saveLocal("dcnm-profile", next);
          setProfile(next);
          closeModal();
        }}
        onSignOut={() => {
          removeProfile();
          setProfile(null);
          closeModal();
        }}
      />,
    );
  }

  const [page, section = ""] = route.split("/");
  const content = !validRoutes.has(route) ? (
    <div className="container page">
      <div className="empty-state">
        <h1>페이지를 찾을 수 없어요.</h1>
        <p>메뉴에서 원하는 페이지를 다시 찾아 주세요.</p>
        <a className="button dialog-action" href="#/">
          홈으로 돌아가기 <Icon name="arrow-right" />
        </a>
      </div>
    </div>
  ) : page === "about" ? (
    <AboutPage section={section} />
  ) : page === "activities" ? (
    <ActivitiesPage key={route} category={section} openModal={openModal} />
  ) : page === "community" ? (
    <CommunityPage key={route} section={section} openModal={openModal} />
  ) : page === "join" ? (
    <JoinPage />
  ) : (
    <LandingPage />
  );

  return (
    <>
      <a href="#main" className="skip-link">
        본문으로 바로가기
      </a>
      <Header
        profile={profile}
        onProfile={showProfile}
        dark={dark}
        onTheme={toggleTheme}
      />
      <main ref={main} id="main" tabIndex={-1}>
        {content}
      </main>
      <footer className="site-footer">
        <div className="container footer-top">
          <Brand />
          <p>{club.fullName}</p>
          <div className="footer-links">
            <a href="#/about">동아리 소개</a>
            <a href="#/community/qna">문의하기</a>
            <button
              className="text-button"
              onClick={() => openModal(<CreditsDialog />)}
            >
              사이트 정보
            </button>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© 2026 DC&amp;M. Made together.</span>
          <span>한성대학교 학술 정동아리 · Digital Contents and Multimedia</span>
        </div>
      </footer>
      {modal !== null ? <Dialog onClose={closeModal}>{modal}</Dialog> : null}
    </>
  );
}
