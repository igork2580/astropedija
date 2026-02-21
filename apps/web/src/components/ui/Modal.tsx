"use client";

import {
  forwardRef,
  useEffect,
  useCallback,
  type HTMLAttributes,
  type MouseEvent,
} from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  ModalOverlay                                                      */
/* ------------------------------------------------------------------ */

export interface ModalOverlayProps extends HTMLAttributes<HTMLDivElement> {
  /** Whether the modal is visible. */
  open: boolean;
  /** Called when the user clicks the backdrop or presses Escape. */
  onClose: () => void;
}

const ModalOverlay = forwardRef<HTMLDivElement, ModalOverlayProps>(
  ({ open, onClose, className, children, ...props }, ref) => {
    /* Close on Escape */
    const handleKeyDown = useCallback(
      (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      },
      [onClose],
    );

    useEffect(() => {
      if (!open) return;
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "";
      };
    }, [open, handleKeyDown]);

    if (!open) return null;

    const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) onClose();
    };

    return (
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        className={cn(
          "fixed inset-0 z-50 flex items-center justify-center",
          "bg-black/60 backdrop-blur-sm",
          "animate-in fade-in duration-200",
          className,
        )}
        onClick={handleBackdropClick}
        {...props}
      >
        {children}
      </div>
    );
  },
);
ModalOverlay.displayName = "ModalOverlay";

/* ------------------------------------------------------------------ */
/*  ModalContent                                                      */
/* ------------------------------------------------------------------ */

export interface ModalContentProps extends HTMLAttributes<HTMLDivElement> {}

const ModalContent = forwardRef<HTMLDivElement, ModalContentProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative w-full max-w-lg mx-4 rounded-2xl border border-border bg-bg-mid p-6",
        "shadow-xl shadow-black/30",
        className,
      )}
      {...props}
    />
  ),
);
ModalContent.displayName = "ModalContent";

/* ------------------------------------------------------------------ */
/*  ModalClose                                                        */
/* ------------------------------------------------------------------ */

export interface ModalCloseProps
  extends HTMLAttributes<HTMLButtonElement> {
  onClose: () => void;
}

const ModalClose = forwardRef<HTMLButtonElement, ModalCloseProps>(
  ({ onClose, className, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      aria-label="Close"
      onClick={onClose}
      className={cn(
        "absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-lg",
        "text-text-muted hover:text-text-primary hover:bg-surface-hover",
        "transition-colors duration-200 cursor-pointer",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
        className,
      )}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
        aria-hidden="true"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
  ),
);
ModalClose.displayName = "ModalClose";

/* ------------------------------------------------------------------ */
/*  Convenience composite                                             */
/* ------------------------------------------------------------------ */

export interface ModalProps extends ModalOverlayProps {}

/**
 * Full modal component that combines overlay, content panel and close button.
 *
 * ```tsx
 * <Modal open={open} onClose={() => setOpen(false)}>
 *   <h2>Title</h2>
 *   <p>Body content here</p>
 * </Modal>
 * ```
 */
const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ open, onClose, children, className, ...props }, ref) => (
    <ModalOverlay open={open} onClose={onClose} {...props}>
      <ModalContent ref={ref} className={className}>
        <ModalClose onClose={onClose} />
        {children}
      </ModalContent>
    </ModalOverlay>
  ),
);
Modal.displayName = "Modal";

export { Modal, ModalOverlay, ModalContent, ModalClose };
