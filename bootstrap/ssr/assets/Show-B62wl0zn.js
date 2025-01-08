import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { P as PriorityBadge, S as StatusBadge } from "./Badges-DUeZD0fO.js";
import { u as useTranslation } from "./TranslationContext-BjzEj_91.js";
import { A as Authenticated } from "./AuthenticatedLayout-C-BHxDfp.js";
import { a as formatDate } from "./ticket_format-Cs4F_5rM.js";
import { useForm, Head, router } from "@inertiajs/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaUser, FaQuoteRight, FaFile, FaEye, FaDownload, FaTimes, FaPaperclip, FaCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import "./ApplicationLogo-Cm2He-vj.js";
import "react-icons/md";
import "@tippyjs/react";
function Show({ auth, ticket, statuses }) {
  var _a;
  const { t } = useTranslation();
  const [previewImage, setPreviewImage] = useState(null);
  const [quoteText, setQuoteText] = useState(null);
  const { data, setData, post, processing, reset } = useForm({
    message: "",
    attachments: [],
    quote: null
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("message", data.message);
    if (data.quote) {
      formData.append("quote", data.quote);
    }
    data.attachments.forEach((file, index) => {
      formData.append(`attachments[${index}]`, file);
    });
    post(route("tickets.reply", ticket.id), {
      data: formData,
      forceFormData: true,
      onSuccess: () => {
        reset();
        setQuoteText(null);
        toast.success(t("tickets.replySent"));
      },
      onError: () => {
        toast.error(t("common.error"));
      }
    });
  };
  const handleFiles = (files) => {
    if (!files) return;
    const validFiles = Array.from(files).filter((file) => {
      const isValidType = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ].includes(file.type);
      const isValidSize = file.size <= 10 * 1024 * 1024;
      if (!isValidType) {
        toast.error(t("tickets.invalidFileType", { name: file.name }));
      }
      if (!isValidSize) {
        toast.error(t("tickets.fileTooLarge", { name: file.name }));
      }
      return isValidType && isValidSize;
    });
    setData("attachments", [...data.attachments, ...validFiles]);
  };
  const removeFile = (index) => {
    const newFiles = [...data.attachments];
    newFiles.splice(index, 1);
    setData("attachments", newFiles);
  };
  const handleQuote = (text) => {
    setQuoteText(text);
    setData("quote", text);
  };
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      auth: { user: { ...auth.user, roles: auth.user.roles || [] } },
      header: /* @__PURE__ */ jsxs("h2", { className: "text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200", children: [
        t("tickets.ticket"),
        " #",
        ticket.id,
        " - ",
        /* @__PURE__ */ jsx(
          "span",
          {
            className: `text-sm ${ticket.status === "open" ? "text-blue-600" : ticket.status === "answered" ? "text-green-600" : "text-gray-600"}`,
            children: t(`tickets.status.${ticket.status}`)
          }
        )
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: `${t("tickets.ticket")} #${ticket.id}` }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsx("div", { className: "mb-6 overflow-hidden rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-between gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900 dark:text-gray-100", children: ticket.subject }),
              /* @__PURE__ */ jsxs("div", { className: "mt-1 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400", children: [
                /* @__PURE__ */ jsxs("span", { children: [
                  t("tickets.createdAt"),
                  ":",
                  " ",
                  formatDate(ticket.created_at)
                ] }),
                /* @__PURE__ */ jsx("span", { children: "•" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  t("tickets.lastReply"),
                  ":",
                  " ",
                  formatDate(ticket.last_reply_at)
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsx(PriorityBadge, { priority: ticket.priority }),
              /* @__PURE__ */ jsx(StatusBadge, { status: ticket.status })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "mb-6 space-y-6", children: ticket.replies.map((reply) => /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              className: `overflow-hidden rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800 ${reply.user.id === auth.user.id ? "ml-auto" : "mr-auto"}`,
              children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700", children: /* @__PURE__ */ jsx(FaUser, { className: "h-5 w-5 text-gray-500 dark:text-gray-400" }) }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("div", { className: "font-medium text-gray-900 dark:text-gray-100", children: reply.user.name }),
                      /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500 dark:text-gray-400", children: formatDate(reply.created_at) })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => handleQuote(reply.message),
                      className: "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300",
                      children: /* @__PURE__ */ jsx(FaQuoteRight, { className: "h-4 w-4" })
                    }
                  )
                ] }),
                reply.quote && /* @__PURE__ */ jsx("div", { className: "mt-4 rounded-lg border-l-4 border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700/50", children: /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-600 dark:text-gray-300", children: reply.quote }) }),
                /* @__PURE__ */ jsx("div", { className: "mt-4 whitespace-pre-wrap text-gray-700 dark:text-gray-300", children: reply.message }),
                reply.attachments.length > 0 && /* @__PURE__ */ jsx("div", { className: "mt-4 space-y-2", children: reply.attachments.map((attachment) => /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: "flex items-center justify-between rounded-lg bg-gray-50 p-2 dark:bg-gray-700",
                    children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                        /* @__PURE__ */ jsx(FaFile, { className: "mr-2 h-4 w-4 text-gray-400" }),
                        /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-600 dark:text-gray-300", children: attachment.name })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                        attachment.type.startsWith(
                          "image/"
                        ) && /* @__PURE__ */ jsx(
                          "button",
                          {
                            onClick: () => setPreviewImage(
                              attachment.url
                            ),
                            className: "text-gray-400 hover:text-blue-500",
                            children: /* @__PURE__ */ jsx(FaEye, { className: "h-4 w-4" })
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          "a",
                          {
                            href: attachment.url,
                            download: true,
                            className: "text-gray-400 hover:text-blue-500",
                            children: /* @__PURE__ */ jsx(FaDownload, { className: "h-4 w-4" })
                          }
                        )
                      ] })
                    ]
                  },
                  attachment.id
                )) })
              ]
            },
            reply.id
          )) }),
          /* @__PURE__ */ jsx("div", { className: "rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
            quoteText && /* @__PURE__ */ jsxs("div", { className: "mb-4 rounded-lg border-l-4 border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700/50", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-gray-700 dark:text-gray-300", children: t("tickets.quote") }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      setQuoteText(null);
                      setData("quote", null);
                    },
                    className: "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300",
                    children: /* @__PURE__ */ jsx(FaTimes, { className: "h-4 w-4" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("div", { className: "mt-2 text-sm text-gray-600 dark:text-gray-400", children: quoteText })
            ] }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                value: data.message,
                onChange: (e) => setData("message", e.target.value),
                className: "w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white",
                rows: 6,
                placeholder: t("tickets.writeReply"),
                required: true
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "file",
                    multiple: true,
                    onChange: (e) => handleFiles(e.target.files),
                    className: "hidden",
                    id: "attachments",
                    accept: "image/*,.pdf,.doc,.docx"
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "label",
                  {
                    htmlFor: "attachments",
                    className: "flex cursor-pointer items-center gap-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200",
                    children: [
                      /* @__PURE__ */ jsx(FaPaperclip, { className: "h-4 w-4" }),
                      t("tickets.attachFiles")
                    ]
                  }
                )
              ] }),
              data.attachments.length > 0 && /* @__PURE__ */ jsx("div", { className: "mt-4 space-y-2", children: data.attachments.map((file, index) => /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "flex items-center justify-between rounded-lg bg-gray-50 p-2 dark:bg-gray-700",
                  children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                      /* @__PURE__ */ jsx(FaFile, { className: "mr-2 h-4 w-4 text-gray-400" }),
                      /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-600 dark:text-gray-300", children: file.name })
                    ] }),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => removeFile(index),
                        className: "text-gray-400 hover:text-red-500",
                        children: /* @__PURE__ */ jsx(FaTimes, { className: "h-4 w-4" })
                      }
                    )
                  ]
                },
                index
              )) })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mt-4 flex justify-end", children: /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                disabled: processing,
                className: "inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50",
                children: processing ? /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsxs(
                    "svg",
                    {
                      className: "mr-2 h-4 w-4 animate-spin",
                      viewBox: "0 0 24 24",
                      children: [
                        /* @__PURE__ */ jsx(
                          "circle",
                          {
                            className: "opacity-25",
                            cx: "12",
                            cy: "12",
                            r: "10",
                            stroke: "currentColor",
                            strokeWidth: "4",
                            fill: "none"
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          "path",
                          {
                            className: "opacity-75",
                            fill: "currentColor",
                            d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          }
                        )
                      ]
                    }
                  ),
                  t("common.processing")
                ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsx(FaCheckCircle, { className: "mr-2 h-4 w-4" }),
                  t("tickets.send")
                ] })
              }
            ) })
          ] }) })
        ] }) }),
        previewImage && /* @__PURE__ */ jsx(
          "div",
          {
            className: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75",
            onClick: () => setPreviewImage(null),
            children: /* @__PURE__ */ jsx("div", { className: "max-h-[90vh] max-w-[90vw]", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: previewImage,
                alt: "Preview",
                className: "max-h-full max-w-full object-contain"
              }
            ) })
          }
        ),
        ((_a = auth.user.roles) == null ? void 0 : _a.some((role) => role.name === "admin")) && /* @__PURE__ */ jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsx(
          "select",
          {
            value: ticket.status,
            onChange: (e) => {
              const newStatus = e.target.value;
              router.post(
                route("tickets.update-status", ticket.id),
                {
                  status: newStatus
                },
                {
                  preserveScroll: true
                }
              );
            },
            className: "rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white",
            children: statuses.map((status) => /* @__PURE__ */ jsx("option", { value: status, children: t(`tickets.status.${status}`) }, status))
          }
        ) })
      ]
    }
  );
}
export {
  Show as default
};
