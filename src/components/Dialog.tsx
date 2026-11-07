import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { Icon } from "./Common";

export default function Dialog({
  children,
  onClose,
}: {
  children: ReactNode;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const previous = document.activeElement;
    // StrictMode may queue a close event from cleanup before reopening the dialog.
    // Only a dialog that is currently closed should dismiss the React content.
    const handleClose = () => {
      if (!dialog.open) onClose();
    };
    dialog.addEventListener("close", handleClose);
    dialog.showModal();
    return () => {
      dialog.removeEventListener("close", handleClose);
      dialog.close();
      if (previous instanceof HTMLElement && previous.isConnected)
        previous.focus({ preventScroll: true });
    };
  }, [onClose]);
  return (
    <dialog
      ref={ref}
      aria-labelledby="dialog-title"
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const r = event.currentTarget.getBoundingClientRect();
        if (
          event.clientX < r.left ||
          event.clientX > r.right ||
          event.clientY < r.top ||
          event.clientY > r.bottom
        )
          onClose();
      }}
    >
      <button
        className="dialog-close icon-button"
        aria-label="창 닫기"
        onClick={onClose}
      >
        <Icon name="x" />
      </button>
      {children}
    </dialog>
  );
}
