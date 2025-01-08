import { jsxs, jsx } from "react/jsx-runtime";
import { u as useTranslation } from "./TranslationContext-BjzEj_91.js";
import { A as Authenticated } from "./AuthenticatedLayout-CA30F8TA.js";
import { useForm, Head, router } from "@inertiajs/react";
import { useState, useRef, useCallback } from "react";
import { FaTicketAlt, FaReply, FaQuoteRight, FaPaperclip, FaTimes, FaUser, FaHistory, FaHeadset, FaImage, FaFile, FaEye, FaDownload } from "react-icons/fa";
import { toast } from "react-toastify";
import { PriorityBadge } from "./Badges-BMp3kczU.js";
import PreviewModal from "./PreviewModal-4TqwoWpm.js";
import StatusSelect from "./StatusSelect-CeryoOjT.js";
import TicketHistoryPanel from "./TicketHistoryPanel-B1uEXylk.js";
import "./ApplicationLogo-B9pIlq8y.js";
import "react-icons/md";
import "framer-motion";
import "@tippyjs/react";
import "@headlessui/react";
const MessageBubble = ({
  isAdmin,
  message,
  user,
  date,
  attachments,
  quote,
  onPreviewImage,
  formatDate
}) => {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `group flex gap-3 p-2 transition-all ${isAdmin ? "flex-row-reverse" : "flex-row"}`,
      children: [
        /* @__PURE__ */ jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          user.avatar ? /* @__PURE__ */ jsx(
            "img",
            {
              src: user.avatar,
              alt: user.name,
              className: "h-10 w-10 rounded-full object-cover shadow-sm ring-2 ring-white dark:ring-gray-700"
            }
          ) : /* @__PURE__ */ jsx(
            "div",
            {
              className: `flex h-10 w-10 items-center justify-center rounded-full shadow-sm ${isAdmin ? "bg-indigo-100 dark:bg-indigo-900/50" : "bg-emerald-100 dark:bg-emerald-900/50"}`,
              children: /* @__PURE__ */ jsx(
                FaUser,
                {
                  className: `h-5 w-5 ${isAdmin ? "text-indigo-600 dark:text-indigo-400" : "text-emerald-600 dark:text-emerald-400"}`
                }
              )
            }
          ),
          isAdmin && /* @__PURE__ */ jsx("div", { className: "absolute -bottom-0.5 -right-0.5 rounded-full bg-indigo-500 p-1", children: /* @__PURE__ */ jsx(FaHeadset, { className: "h-2.5 w-2.5 text-white" }) })
        ] }) }),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: `min-w-0 flex-1 space-y-1.5 rounded-xl p-3 shadow-sm ${isAdmin ? "bg-indigo-50 dark:bg-indigo-900/20" : "bg-emerald-50 dark:bg-emerald-900/20"}`,
            children: [
              quote && /* @__PURE__ */ jsx("div", { className: "mb-2 rounded-lg border-l-2 border-gray-300 bg-gray-100 p-2 text-sm text-gray-600 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400", children: quote }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2", children: [
                /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: `text-sm font-medium ${isAdmin ? "text-indigo-900 dark:text-indigo-100" : "text-emerald-900 dark:text-emerald-100"}`,
                    children: user.name
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "whitespace-nowrap text-xs text-gray-500 dark:text-gray-400", children: formatDate(date) })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "text-sm leading-relaxed text-gray-700 dark:text-gray-300", children: message }),
              attachments && attachments.length > 0 && /* @__PURE__ */ jsx("div", { className: "mt-2 space-y-1.5 border-t border-gray-100 pt-2 dark:border-gray-700/50", children: attachments.map((attachment) => /* @__PURE__ */ jsx(
                AttachmentItem,
                {
                  attachment,
                  onPreview: () => onPreviewImage(attachment.url)
                },
                attachment.id
              )) })
            ]
          }
        )
      ]
    }
  );
};
function Show({ auth, ticket, statuses }) {
  const { t, locale } = useTranslation();
  const [isReplying, setIsReplying] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);
  const [, setCurrentStatus] = useState(ticket.status);
  const [isStatusUpdating, setIsStatusUpdating] = useState(false);
  const { data, setData, processing, reset } = useForm({
    message: "",
    status: ticket.status,
    attachments: [],
    quote: ""
  });
  const handleStatusChange = async (newStatus) => {
    setIsStatusUpdating(true);
    router.put(
      route("admin.tickets.update-status", ticket.id),
      {
        status: newStatus
      },
      {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => {
          setCurrentStatus(newStatus);
        },
        onError: () => {
          toast.error(t("common.error"));
        },
        onFinish: () => {
          setIsStatusUpdating(false);
        }
      }
    );
  };
  const handleQuote = (message) => {
    setData("quote", message);
    setIsReplying(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("message", data.message);
    if (data.quote) {
      formData.append("quote", data.quote);
    }
    if (data.attachments.length > 0) {
      data.attachments.forEach((file, index) => {
        formData.append(`attachments[${index}]`, file);
      });
    }
    try {
      await router.post(
        route("admin.tickets.reply", ticket.id),
        formData,
        {
          forceFormData: true,
          preserveScroll: true,
          preserveState: true,
          onSuccess: () => {
            setData("message", "");
            setData("quote", null);
            setData("attachments", []);
            setIsReplying(false);
            toast.success(t("ticket.replyAdded"));
          },
          onError: (errors) => {
            console.error("Reply errors:", errors);
            toast.error(t("common.error"));
          }
        }
      );
    } catch (error) {
      console.error("Reply failed:", error);
      toast.error(t("common.error"));
    }
  };
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    const maxSize = 10 * 1024 * 1024;
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];
    const validFiles = files.filter((file) => {
      if (file.size > maxSize) {
        toast.error(t("ticket.fileTooLarge", { name: file.name }));
        return false;
      }
      if (!allowedTypes.includes(file.type)) {
        toast.error(t("ticket.invalidFileType", { name: file.name }));
        return false;
      }
      return true;
    });
    setData("attachments", [...data.attachments, ...validFiles]);
  };
  const removeAttachment = (index) => {
    const newAttachments = [...data.attachments];
    newAttachments.splice(index, 1);
    setData("attachments", newAttachments);
  };
  const formatDate = useCallback((date) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    };
    const dateFormats = {
      "tr": {
        ...options,
        timeZone: "Europe/Istanbul"
      },
      "en": {
        ...options,
        timeZone: "UTC"
      }
    };
    try {
      return new Date(date).toLocaleDateString(
        locale === "tr" ? "tr-TR" : "en-US",
        dateFormats[locale]
      );
    } catch (error) {
      console.error("Date formatting error:", error);
      return date;
    }
  }, [locale]);
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      auth: {
        user: {
          id: auth.user.id,
          name: auth.user.name,
          email: auth.user.email,
          roles: auth.user.roles
        }
      },
      header: /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200", children: t("ticket.details") }) }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: `${t("ticket.ticket")} #${ticket.id}` }),
        /* @__PURE__ */ jsx("div", { className: "py-6", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsx("div", { className: "mb-8 rounded-2xl bg-white p-8 shadow-sm dark:bg-gray-800", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-between gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsx("div", { className: "rounded-xl bg-indigo-50 p-3 dark:bg-indigo-900/30", children: /* @__PURE__ */ jsx(FaTicketAlt, { className: "h-6 w-6 text-indigo-600 dark:text-indigo-400" }) }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold text-gray-900 dark:text-gray-100", children: ticket.subject }),
                /* @__PURE__ */ jsxs("div", { className: "mt-1 flex items-center gap-2 text-sm text-gray-500", children: [
                  /* @__PURE__ */ jsxs("span", { className: "font-medium", children: [
                    "#",
                    ticket.id
                  ] }),
                  /* @__PURE__ */ jsx("span", { children: "•" }),
                  /* @__PURE__ */ jsx("span", { children: formatDate(ticket.created_at) })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsx(PriorityBadge, { priority: ticket.priority }),
              /* @__PURE__ */ jsx(
                StatusSelect,
                {
                  currentStatus: ticket.status,
                  statuses,
                  onChange: handleStatusChange,
                  isLoading: isStatusUpdating,
                  t,
                  ticketId: ticket.id
                }
              )
            ] })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-6 lg:grid-cols-4", children: [
            /* @__PURE__ */ jsx("div", { className: "space-y-6 lg:col-span-3", children: /* @__PURE__ */ jsxs("div", { className: "overflow-hidden rounded-xl bg-white shadow-sm dark:bg-gray-800", children: [
              /* @__PURE__ */ jsx("div", { className: "divide-y divide-gray-100 dark:divide-gray-700", children: /* @__PURE__ */ jsxs("div", { className: "space-y-4 p-6", children: [
                /* @__PURE__ */ jsx(
                  MessageBubble,
                  {
                    isAdmin: false,
                    message: ticket.message,
                    user: ticket.user,
                    date: ticket.created_at,
                    attachments: ticket.attachments,
                    onPreviewImage: setPreviewImage,
                    onQuote: () => handleQuote(ticket.message),
                    t,
                    formatDate
                  }
                ),
                ticket.replies.map((reply) => /* @__PURE__ */ jsx(
                  MessageBubble,
                  {
                    isAdmin: reply.user.id === auth.user.id,
                    message: reply.message,
                    user: reply.user,
                    date: reply.created_at,
                    attachments: reply.attachments,
                    quote: reply.quote,
                    onPreviewImage: setPreviewImage,
                    onQuote: () => handleQuote(reply.message),
                    t,
                    formatDate
                  },
                  reply.id
                ))
              ] }) }),
              /* @__PURE__ */ jsx("div", { className: "border-t p-6 dark:border-gray-700", children: !isReplying ? /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => setIsReplying(true),
                  className: "w-full rounded-xl border-2 border-dashed border-gray-200 px-8 py-6 text-gray-500 transition-colors hover:border-gray-300 hover:text-gray-700 dark:border-gray-700 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-300",
                  children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-2", children: [
                    /* @__PURE__ */ jsx(FaReply, { className: "h-4 w-4" }),
                    /* @__PURE__ */ jsx("span", { children: t("ticket.clickToReply") })
                  ] })
                }
              ) : /* @__PURE__ */ jsxs(
                "form",
                {
                  onSubmit: handleSubmit,
                  className: "space-y-6",
                  children: [
                    data.quote && /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50", children: [
                      /* @__PURE__ */ jsxs("div", { className: "mb-2 flex items-center gap-2", children: [
                        /* @__PURE__ */ jsx(FaQuoteRight, { className: "h-4 w-4 text-gray-400" }),
                        /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-500", children: t("ticket.quote") })
                      ] }),
                      /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-600 dark:text-gray-300", children: data.quote })
                    ] }),
                    /* @__PURE__ */ jsx(
                      "textarea",
                      {
                        value: data.message,
                        onChange: (e) => setData(
                          "message",
                          e.target.value
                        ),
                        className: "w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100",
                        rows: 6,
                        placeholder: t(
                          "ticket.writeReply"
                        )
                      }
                    ),
                    /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "file",
                            ref: fileInputRef,
                            onChange: handleFileChange,
                            multiple: true,
                            className: "hidden",
                            accept: "image/*,.pdf,.doc,.docx,.xls,.xlsx"
                          }
                        ),
                        /* @__PURE__ */ jsxs(
                          "button",
                          {
                            type: "button",
                            onClick: () => {
                              var _a;
                              return (_a = fileInputRef.current) == null ? void 0 : _a.click();
                            },
                            className: "flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300",
                            children: [
                              /* @__PURE__ */ jsx(FaPaperclip, { className: "h-4 w-4" }),
                              t(
                                "ticket.attachFiles"
                              )
                            ]
                          }
                        )
                      ] }),
                      data.attachments.length > 0 && /* @__PURE__ */ jsx("div", { className: "space-y-2", children: data.attachments.map(
                        (file, index) => /* @__PURE__ */ jsxs(
                          "div",
                          {
                            className: "flex items-center justify-between rounded-lg bg-gray-50 p-2 dark:bg-gray-800",
                            children: [
                              /* @__PURE__ */ jsx("span", { className: "truncate text-sm text-gray-600 dark:text-gray-400", children: file.name }),
                              /* @__PURE__ */ jsx(
                                "button",
                                {
                                  type: "button",
                                  onClick: () => removeAttachment(
                                    index
                                  ),
                                  className: "text-red-500 hover:text-red-700",
                                  children: /* @__PURE__ */ jsx(FaTimes, { className: "h-4 w-4" })
                                }
                              )
                            ]
                          },
                          index
                        )
                      ) })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-3", children: [
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => {
                            setIsReplying(false);
                            reset();
                          },
                          className: "px-4 py-2 text-sm text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100",
                          children: t("common.cancel")
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          type: "submit",
                          disabled: processing || !data.message.trim(),
                          className: "rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50",
                          children: processing ? t("common.sending") : t("common.send")
                        }
                      )
                    ] })
                  ]
                }
              ) })
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-white p-6 shadow-sm dark:bg-gray-800", children: [
                /* @__PURE__ */ jsxs("h2", { className: "mb-6 flex items-center gap-2 text-lg font-medium text-gray-900 dark:text-gray-100", children: [
                  /* @__PURE__ */ jsx(FaUser, { className: "h-5 w-5 text-gray-400" }),
                  t("ticket.userInfo")
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                    /* @__PURE__ */ jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700", children: /* @__PURE__ */ jsx("span", { className: "text-lg font-medium text-gray-600 dark:text-gray-300", children: ticket.user.name.charAt(0).toUpperCase() }) }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-gray-900 dark:text-gray-100", children: ticket.user.name }),
                      /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500 dark:text-gray-400", children: ticket.user.email })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "border-t border-gray-200 pt-4 dark:border-gray-700", children: /* @__PURE__ */ jsxs("dl", { className: "space-y-3", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
                      /* @__PURE__ */ jsx("dt", { className: "text-sm text-gray-500 dark:text-gray-400", children: t("ticket.createdAt") }),
                      /* @__PURE__ */ jsx("dd", { className: "text-sm text-gray-900 dark:text-gray-100", children: formatDate(
                        ticket.created_at
                      ) })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
                      /* @__PURE__ */ jsx("dt", { className: "text-sm text-gray-500 dark:text-gray-400", children: t("ticket.lastReply") }),
                      /* @__PURE__ */ jsx("dd", { className: "text-sm text-gray-900 dark:text-gray-100", children: formatDate(
                        ticket.last_reply_at
                      ) })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
                      /* @__PURE__ */ jsx("dt", { className: "text-sm text-gray-500 dark:text-gray-400", children: t("ticket.category") }),
                      /* @__PURE__ */ jsx("dd", { className: "text-sm text-gray-900 dark:text-gray-100", children: t(
                        `ticket.category.${ticket.category}`
                      ) })
                    ] })
                  ] }) })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-white p-6 shadow-sm dark:bg-gray-800", children: [
                /* @__PURE__ */ jsxs("h2", { className: "mb-6 flex items-center gap-2 text-lg font-medium text-gray-900 dark:text-gray-100", children: [
                  /* @__PURE__ */ jsx(FaHistory, { className: "h-5 w-5 text-gray-400" }),
                  t("ticket.history")
                ] }),
                /* @__PURE__ */ jsx(
                  TicketHistoryPanel,
                  {
                    history: ticket.history
                  }
                )
              ] })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(
          PreviewModal,
          {
            isOpen: !!previewImage,
            imageUrl: previewImage,
            onClose: () => setPreviewImage(null)
          }
        )
      ]
    }
  );
}
const AttachmentItem = ({ attachment, onPreview }) => {
  const isImage = attachment.type.startsWith("image/");
  const fileSize = formatFileSize(attachment.size);
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 rounded-lg border border-gray-100 bg-white p-2.5 shadow-sm transition-colors hover:border-indigo-200 dark:border-gray-700/50 dark:bg-gray-800/50 dark:hover:border-indigo-700/50", children: [
    /* @__PURE__ */ jsx("div", { className: "rounded-lg bg-gray-50 p-2 dark:bg-gray-800", children: isImage ? /* @__PURE__ */ jsx(FaImage, { className: "h-4 w-4 text-indigo-500" }) : /* @__PURE__ */ jsx(FaFile, { className: "h-4 w-4 text-gray-400" }) }),
    /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
      /* @__PURE__ */ jsx("p", { className: "truncate text-sm font-medium text-gray-900 dark:text-gray-100", children: attachment.name }),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: fileSize })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
      isImage && /* @__PURE__ */ jsx(
        "button",
        {
          onClick: onPreview,
          className: "rounded-lg p-1.5 text-gray-500 hover:bg-gray-50 hover:text-indigo-600 dark:hover:bg-gray-800",
          children: /* @__PURE__ */ jsx(FaEye, { className: "h-4 w-4" })
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: attachment.url,
          download: true,
          className: "rounded-lg p-1.5 text-gray-500 hover:bg-gray-50 hover:text-indigo-600 dark:hover:bg-gray-800",
          children: /* @__PURE__ */ jsx(FaDownload, { className: "h-4 w-4" })
        }
      )
    ] })
  ] });
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
export {
  Show as default
};
