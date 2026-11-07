import { useEffect, useRef, useState } from "react";
import { Brand, Icon } from "./Common";
import type { Profile } from "../lib/storage";
import { navigation } from "../data/navigation";

export default function Header({
  profile,
  onProfile,
  dark,
  onTheme,
}: {
  profile: Profile | null;
  onProfile: () => void;
  dark: boolean;
  onTheme: () => void;
}) {
  const [menu, setMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !ref.current?.contains(event.target)
      ) {
        setMenu(null);
        setMobileOpen(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      ref.current
        ?.querySelector<HTMLButtonElement>('[aria-expanded="true"]')
        ?.focus();
      setMenu(null);
      setMobileOpen(false);
    };
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <>
      <div className="announcement">
        <span>우리의 다음 이야기에 함께해요.</span>
        <a href="#/join">
          DC&amp;M 가입 안내 <span aria-hidden="true">↗</span>
        </a>
      </div>
      <header
        ref={ref}
        className="site-header"
        onClick={(event) => {
          if (event.target instanceof Element && event.target.closest("a")) {
            setMenu(null);
            setMobileOpen(false);
          }
        }}
      >
        <div className="container header-inner">
          <Brand />
          <nav className="desktop-nav" aria-label="주 메뉴">
            {navigation.map((group) => (
              <div className="nav-group" key={group.id}>
                <button
                  className="nav-trigger"
                  aria-expanded={menu === group.id}
                  aria-controls={`nav-${group.id}`}
                  onClick={() => setMenu(menu === group.id ? null : group.id)}
                  onKeyDown={(event) => {
                    if (event.key === "ArrowDown") {
                      event.preventDefault();
                      setMenu(group.id);
                      requestAnimationFrame(() =>
                        document
                          .querySelector<HTMLAnchorElement>(
                            `#nav-${group.id} a`,
                          )
                          ?.focus(),
                      );
                    }
                  }}
                >
                  {group.title}
                  <Icon name="chevron-down" />
                </button>
                <div
                  className="nav-dropdown"
                  id={`nav-${group.id}`}
                  hidden={menu !== group.id}
                >
                  {group.links.map(([path, title]) => (
                    <a key={path} href={`#/${path}`}>
                      {title}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </nav>
          <div className="header-actions">
            <button
              className="icon-button theme-toggle"
              aria-label={dark ? "밝은 테마로 변경" : "어두운 테마로 변경"}
              onClick={onTheme}
            >
              <Icon name={dark ? "sun" : "moon"} />
            </button>
            <a className="header-apply-button" href="#/join">
              동아리 지원
            </a>
            <button
              className="login-button"
              aria-label={profile ? "내 체험 프로필 보기" : "로그인 체험 열기"}
              onClick={onProfile}
            >
              <span className="login-label">
                {profile ? `${profile.name.slice(0, 10)}님` : "로그인"}
              </span>
              <span className="login-arrow" aria-hidden="true">
                ↗
              </span>
            </button>
            <button
              className="icon-button mobile-menu-toggle"
              aria-label={mobileOpen ? "모바일 메뉴 닫기" : "모바일 메뉴 열기"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <Icon name={mobileOpen ? "x" : "menu-2"} />
            </button>
          </div>
        </div>
        <nav
          id="mobile-nav"
          className="mobile-nav container"
          aria-label="모바일 메뉴"
          hidden={!mobileOpen}
        >
          {[
            ["about", "동아리 소개"],
            ["activities", "활동 내용"],
            ["community", "공지사항"],
            ["community/faq", "FAQ"],
            ["community/qna", "Q&A"],
            ["join", "가입 안내"],
          ].map(([path, title]) => (
            <a key={path} href={`#/${path}`}>
              {title}
            </a>
          ))}
          <button
            className="mobile-theme-toggle"
            aria-label={dark ? "밝은 테마로 변경" : "어두운 테마로 변경"}
            onClick={onTheme}
          >
            <Icon name={dark ? "sun" : "moon"} />
            {dark ? "밝은 테마" : "어두운 테마"}
          </button>
        </nav>
      </header>
    </>
  );
}
