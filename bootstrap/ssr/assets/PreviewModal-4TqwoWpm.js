import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { FaDownload, FaCompress, FaExpand, FaTimes } from "react-icons/fa";
function PreviewModal({ isOpen, imageUrl, onClose }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        if (isFullscreen) {
          document.exitFullscreen();
        } else {
          onClose();
        }
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEsc);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, isFullscreen]);
  const toggleFullscreen = () => {
    if (!isFullscreen) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };
  const isPDF = imageUrl == null ? void 0 : imageUrl.toLowerCase().endsWith(".pdf");
  if (!isOpen || !imageUrl) return null;
  return /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-[100] bg-black", children: [
    /* @__PURE__ */ jsxs("div", { className: "fixed top-4 right-4 z-[101] flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(
        "a",
        {
          href: imageUrl,
          download: true,
          className: "p-3 bg-white/10 hover:bg-white/20 rounded-full \n                        backdrop-blur-sm transition-colors",
          onClick: (e) => e.stopPropagation(),
          children: /* @__PURE__ */ jsx(FaDownload, { className: "w-5 h-5 text-white" })
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: toggleFullscreen,
          className: "p-3 bg-white/10 hover:bg-white/20 rounded-full \n                        backdrop-blur-sm transition-colors",
          children: isFullscreen ? /* @__PURE__ */ jsx(FaCompress, { className: "w-5 h-5 text-white" }) : /* @__PURE__ */ jsx(FaExpand, { className: "w-5 h-5 text-white" })
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: onClose,
          className: "p-3 bg-white/10 hover:bg-white/20 rounded-full \n                        backdrop-blur-sm transition-colors",
          children: /* @__PURE__ */ jsx(FaTimes, { className: "w-5 h-5 text-white" })
        }
      )
    ] }),
    isLoading && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent" }) }),
    /* @__PURE__ */ jsx("div", { className: "w-full h-full flex items-center justify-center", children: isPDF ? /* @__PURE__ */ jsx(
      "iframe",
      {
        src: `${imageUrl}#view=FitH`,
        className: "w-full h-full",
        style: {
          opacity: isLoading ? 0 : 1,
          transition: "opacity 0.3s ease-in-out"
        },
        onLoad: () => setIsLoading(false)
      }
    ) : /* @__PURE__ */ jsx(
      "img",
      {
        src: imageUrl,
        alt: "Preview",
        className: "max-w-full max-h-full object-contain select-none",
        onLoad: () => setIsLoading(false),
        style: {
          opacity: isLoading ? 0 : 1,
          transition: "opacity 0.3s ease-in-out"
        },
        onClick: (e) => e.stopPropagation()
      }
    ) })
  ] });
}
export {
  PreviewModal as default
};
