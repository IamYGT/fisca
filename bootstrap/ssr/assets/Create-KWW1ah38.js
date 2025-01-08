import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { u as useTranslation } from "./TranslationContext-BjzEj_91.js";
import { A as Authenticated } from "./AuthenticatedLayout-Bdcvct4s.js";
import { f as formatFileSize } from "./ticket_format-Cs4F_5rM.js";
import { useForm, Head } from "@inertiajs/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaUpload, FaTicketAlt, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import "./ApplicationLogo-B9pIlq8y.js";
import "react-icons/md";
import "@tippyjs/react";
function Create({ auth, subject, message, priority = "medium", category = "general" }) {
  const { t } = useTranslation();
  const [dragActive, setDragActive] = useState(false);
  const { data, setData, post, processing, errors, reset } = useForm({
    subject: subject || "",
    message: message || "",
    priority,
    category,
    attachments: []
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("subject", data.subject);
    formData.append("message", data.message);
    formData.append("priority", data.priority);
    formData.append("category", data.category);
    data.attachments.forEach((file, index) => {
      formData.append(`attachments[${index}]`, file);
    });
    post(route("tickets.store"), {
      data: formData,
      forceFormData: true,
      onSuccess: () => {
        reset();
        toast.success(t("tickets.created"));
      },
      onError: () => {
        toast.error(t("common.error"));
      }
    });
  };
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };
  const handleFiles = (files) => {
    const validFiles = files.filter((file) => {
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
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      auth: { user: { ...auth.user, roles: auth.user.roles || [] } },
      header: /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200", children: t("tickets.createNew") }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: t("tickets.createNew") }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-4xl sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            className: "overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg",
            children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "p-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
                /* @__PURE__ */ jsx(
                  "label",
                  {
                    htmlFor: "subject",
                    className: "mb-2 block text-sm font-medium text-gray-900 dark:text-gray-100",
                    children: t("tickets.subject")
                  }
                ),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    id: "subject",
                    value: data.subject,
                    onChange: (e) => setData("subject", e.target.value),
                    className: "w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-indigo-500",
                    required: true
                  }
                ),
                errors.subject && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.subject })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
                /* @__PURE__ */ jsx(
                  "label",
                  {
                    htmlFor: "priority",
                    className: "mb-2 block text-sm font-medium text-gray-900 dark:text-gray-100",
                    children: t("tickets.priority")
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "select",
                  {
                    id: "priority",
                    value: data.priority,
                    onChange: (e) => setData("priority", e.target.value),
                    className: "w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-indigo-500",
                    children: [
                      /* @__PURE__ */ jsx("option", { value: "low", children: t("tickets.priority.low") }),
                      /* @__PURE__ */ jsx("option", { value: "medium", children: t("tickets.priority.medium") }),
                      /* @__PURE__ */ jsx("option", { value: "high", children: t("tickets.priority.high") })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
                /* @__PURE__ */ jsx(
                  "label",
                  {
                    htmlFor: "category",
                    className: "mb-2 block text-sm font-medium text-gray-900 dark:text-gray-100",
                    children: t("tickets.category")
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "select",
                  {
                    id: "category",
                    value: data.category,
                    onChange: (e) => setData("category", e.target.value),
                    className: "w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-indigo-500",
                    children: [
                      /* @__PURE__ */ jsx("option", { value: "general", children: t("tickets.category.general") }),
                      /* @__PURE__ */ jsx("option", { value: "technical", children: t("tickets.category.technical") }),
                      /* @__PURE__ */ jsx("option", { value: "billing", children: t("tickets.category.billing") }),
                      /* @__PURE__ */ jsx("option", { value: "other", children: t("tickets.category.other") })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
                /* @__PURE__ */ jsx(
                  "label",
                  {
                    htmlFor: "message",
                    className: "mb-2 block text-sm font-medium text-gray-900 dark:text-gray-100",
                    children: t("tickets.message")
                  }
                ),
                /* @__PURE__ */ jsx(
                  "textarea",
                  {
                    id: "message",
                    value: data.message,
                    onChange: (e) => setData("message", e.target.value),
                    rows: 6,
                    className: "w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-indigo-500",
                    required: true
                  }
                ),
                errors.message && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.message })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
                /* @__PURE__ */ jsx("label", { className: "mb-2 block text-sm font-medium text-gray-900 dark:text-gray-100", children: t("tickets.attachments") }),
                /* @__PURE__ */ jsxs(
                  "div",
                  {
                    onDragEnter: handleDrag,
                    onDragLeave: handleDrag,
                    onDragOver: handleDrag,
                    onDrop: handleDrop,
                    className: `relative flex min-h-[100px] cursor-pointer items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors ${dragActive ? "border-indigo-500 bg-indigo-50 dark:border-indigo-400 dark:bg-indigo-900/20" : "border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500"}`,
                    children: [
                      /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                        /* @__PURE__ */ jsx(FaUpload, { className: "mx-auto mb-2 h-8 w-8 text-gray-400" }),
                        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 dark:text-gray-400", children: t("tickets.dropFiles") }),
                        /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-gray-500 dark:text-gray-500", children: t("tickets.maxFileSize") })
                      ] }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "file",
                          multiple: true,
                          onChange: (e) => handleFiles(
                            Array.from(
                              e.target.files || []
                            )
                          ),
                          className: "absolute inset-0 cursor-pointer opacity-0",
                          accept: "image/*,.pdf,.doc,.docx"
                        }
                      )
                    ]
                  }
                ),
                data.attachments.length > 0 && /* @__PURE__ */ jsx("div", { className: "mt-4 space-y-2", children: data.attachments.map((file, index) => /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: "flex items-center justify-between rounded-lg bg-gray-50 p-2 dark:bg-gray-700",
                    children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                        /* @__PURE__ */ jsx(FaTicketAlt, { className: "mr-2 h-4 w-4 text-gray-400" }),
                        /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-600 dark:text-gray-300", children: file.name }),
                        /* @__PURE__ */ jsxs("span", { className: "ml-2 text-xs text-gray-500", children: [
                          "(",
                          formatFileSize(
                            file.size
                          ),
                          ")"
                        ] })
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
              /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx(
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
                    /* @__PURE__ */ jsx(FaTicketAlt, { className: "mr-2 h-4 w-4" }),
                    t("tickets.submit")
                  ] })
                }
              ) })
            ] })
          }
        ) }) })
      ]
    }
  );
}
export {
  Create as default
};
