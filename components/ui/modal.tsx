import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  isHeader?: boolean;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "xxl";
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
}

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  xxl:"max-w-3xl"
};

export default function Modal({
  isOpen,
  onClose,
  title,
  isHeader = false,
  description,
  children,
  size = "md",
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Store the element that had focus before modal opened
    previousActiveElement.current = document.activeElement as HTMLElement;

    // Focus the modal when it opens
    modalRef.current?.focus();

    // Prevent body scroll when modal is open
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Handle Escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (closeOnEscape && e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    // Cleanup
    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleEscape);
      
      // Restore focus to the element that had it before modal opened
      previousActiveElement.current?.focus();
    };
  }, [isOpen, onClose, closeOnEscape]);

  // Focus trap - keep focus within modal
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    const modal = modalRef.current;
    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0] as HTMLElement;
    const lastFocusable = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable?.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable?.focus();
        }
      }
    };

    modal.addEventListener("keydown", handleTabKey as EventListener);

    return () => {
      modal.removeEventListener("keydown", handleTabKey as EventListener);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-50 tracking-[-1] flex items-center justify-center p-4 bg-black/80 animate-in fade-in duration-200"
      onClick={handleOverlayClick}
      aria-hidden="true"
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby={description ? "modal-description" : undefined}
        tabIndex={-1}
        className={`
          relative bg-white rounded-2xl shadow-xl 
          w-full ${sizeClasses[size]} 
          max-h-[90vh] pt-8 overflow-y-auto
          animate-in zoom-in-95 slide-in-from-bottom-4 duration-200
          focus:outline-none focus:ring-none
        `}
      >
        {/* Header */}
       {isHeader && <div className="flex items-start justify-between py-4 px-8">
          <div className="flex-1">
            <h2
              id="modal-title"
              className="text-2xl font-semibold text-gray-900 mb-2"
            >
              {title}
            </h2>
            {description && (
              <p
                id="modal-description"
                className="text-gray-600"
              >
                {description}
              </p>
            )}
          </div>

        </div>
        }
      {showCloseButton && (
        <button
        type="button"
        onClick={onClose}
        className="ml-4 p-2 absolute right-8 top-8 text-gray-900 hover:text-black hover:bg-gray-100 rounded-full cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>
      )}

        {/* Body */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );

  // Render modal in a portal at the end of document.body
  return createPortal(modalContent, document.body);
}
