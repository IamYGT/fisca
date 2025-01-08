import { jsxs, jsx } from "react/jsx-runtime";
import { FaQuoteRight, FaEye, FaDownload } from "react-icons/fa";
const formatDate = (date) => {
  return new Date(date).toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });
};
const formatFileSize = (size) => {
  if (size < 1024) {
    return `${size} B`;
  } else if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(2)} KB`;
  } else if (size < 1024 * 1024 * 1024) {
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  } else {
    return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  }
};
const AttachmentItem = ({ attachment, onPreview }) => {
  const isImage = attachment.type.startsWith("image/");
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 rounded bg-gray-50 p-2", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex-1 truncate", children: [
      attachment.name,
      /* @__PURE__ */ jsxs("span", { className: "ml-2 text-sm text-gray-500", children: [
        "(",
        formatFileSize(attachment.size),
        ")"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
      isImage && /* @__PURE__ */ jsx(
        "button",
        {
          onClick: onPreview,
          className: "text-blue-600 hover:text-blue-800",
          children: /* @__PURE__ */ jsx(FaEye, {})
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: attachment.url,
          download: true,
          className: "text-blue-600 hover:text-blue-800",
          children: /* @__PURE__ */ jsx(FaDownload, {})
        }
      )
    ] })
  ] });
};
const MessageBubble = ({
  isAdmin,
  message,
  user,
  date,
  attachments = [],
  quote,
  onPreviewImage,
  onQuote,
  t
}) => {
  const bubbleClass = isAdmin ? "bg-blue-50 ml-auto" : "bg-gray-50";
  return /* @__PURE__ */ jsxs("div", { className: `mb-4 max-w-3xl rounded-lg p-4 ${bubbleClass}`, children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-2 flex items-start justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        user.avatar ? /* @__PURE__ */ jsx(
          "img",
          {
            src: user.avatar,
            alt: user.name,
            className: "h-8 w-8 rounded-full"
          }
        ) : /* @__PURE__ */ jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-full bg-gray-300", children: user.name.charAt(0).toUpperCase() }),
        /* @__PURE__ */ jsx("span", { className: "font-medium", children: user.name })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: onQuote,
          className: "text-gray-500 hover:text-gray-700",
          title: t("ticket.quote"),
          children: /* @__PURE__ */ jsx(FaQuoteRight, {})
        }
      )
    ] }),
    quote && /* @__PURE__ */ jsx("div", { className: "mb-2 border-l-4 border-gray-300 bg-gray-100 p-2 text-sm", children: quote }),
    /* @__PURE__ */ jsx("div", { className: "mb-2 whitespace-pre-wrap", children: message }),
    attachments.length > 0 && /* @__PURE__ */ jsx("div", { className: "mt-4 space-y-2", children: attachments.map((attachment) => /* @__PURE__ */ jsx(
      AttachmentItem,
      {
        attachment,
        onPreview: () => onPreviewImage(attachment.url)
      },
      attachment.id
    )) }),
    /* @__PURE__ */ jsx("div", { className: "mt-2 text-sm text-gray-500", children: formatDate(date) })
  ] });
};
export {
  MessageBubble
};
