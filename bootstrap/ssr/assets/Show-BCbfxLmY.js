import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { u as useTranslation } from "./TranslationContext-BjzEj_91.js";
import { A as Authenticated } from "./AuthenticatedLayout-C-BHxDfp.js";
import { Head, Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import { FaArrowLeft, FaEdit, FaUser, FaMoneyBillWave, FaCreditCard, FaCopy, FaFileAlt, FaCalendar, FaHistory, FaStickyNote, FaBitcoin, FaNetworkWired, FaHashtag, FaInfoCircle, FaTimesCircle, FaClock, FaCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import "react";
import "./ApplicationLogo-Cm2He-vj.js";
import "react-icons/md";
import "@tippyjs/react";
function Show({ auth, transaction }) {
  const { t } = useTranslation();
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  const parseHistory = () => {
    try {
      if (!transaction.history) return [];
      const history = JSON.parse(transaction.history);
      return Array.isArray(history) ? history : [];
    } catch {
      return [];
    }
  };
  const renderHistoryMessage = (item) => {
    if (item.messageKey) {
      let message = t(item.messageKey);
      if (item.params) {
        Object.entries(item.params).forEach(([key, value]) => {
          message = message.replace(`:${key}`, value);
        });
      }
      return message;
    }
    return item.note || "";
  };
  const renderHistory = () => {
    const history = parseHistory();
    if (history.length === 0) {
      return /* @__PURE__ */ jsx("div", { className: "text-center py-4 text-gray-500 dark:text-gray-400", children: t("transaction.noHistory") });
    }
    return history.map((item, index) => /* @__PURE__ */ jsxs("div", { className: "relative flex items-start pl-8", children: [
      /* @__PURE__ */ jsx("div", { className: `absolute left-0 flex h-8 w-8 items-center justify-center rounded-full
                    ${item.type === "status_change" ? "bg-blue-100 dark:bg-blue-900/20" : item.status === "pending" ? "bg-yellow-100 dark:bg-yellow-900/20" : "bg-gray-100 dark:bg-gray-700/50"}`, children: /* @__PURE__ */ jsx(FaHistory, { className: "h-4 w-4 text-gray-600 dark:text-gray-400" }) }),
      /* @__PURE__ */ jsxs("div", { className: "ml-4 flex-1 rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800", children: [
        /* @__PURE__ */ jsx("p", { className: "font-medium text-gray-900 dark:text-gray-100", children: renderHistoryMessage(item) }),
        /* @__PURE__ */ jsx("div", { className: "mt-2 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400", children: /* @__PURE__ */ jsx("span", { children: new Date(item.timestamp || item.date || "").toLocaleDateString("tr-TR", {
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        }) }) })
      ] })
    ] }, index));
  };
  const renderCryptoDetails = () => {
    var _a;
    if (transaction.type !== "crypto_withdrawal") return null;
    return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsx(
        DetailItem,
        {
          icon: /* @__PURE__ */ jsx(FaBitcoin, {}),
          label: t("transaction.cryptoAddress"),
          value: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsx("span", { className: "font-mono text-gray-900 dark:text-gray-100", children: transaction.crypto_address }),
            transaction.crypto_address && /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => {
                  navigator.clipboard.writeText(transaction.crypto_address);
                  toast.success(t("common.copied"));
                },
                className: "p-1 text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-300",
                children: /* @__PURE__ */ jsx(FaCopy, { className: "h-4 w-4" })
              }
            )
          ] })
        }
      ),
      /* @__PURE__ */ jsx(
        DetailItem,
        {
          icon: /* @__PURE__ */ jsx(FaNetworkWired, {}),
          label: t("transaction.cryptoNetwork"),
          value: (_a = transaction.crypto_network) == null ? void 0 : _a.toUpperCase()
        }
      ),
      transaction.crypto_fee && /* @__PURE__ */ jsx(
        DetailItem,
        {
          icon: /* @__PURE__ */ jsx(FaMoneyBillWave, {}),
          label: t("transaction.cryptoFee"),
          value: `${transaction.crypto_fee} USDT`
        }
      ),
      transaction.crypto_txid && /* @__PURE__ */ jsx(
        DetailItem,
        {
          icon: /* @__PURE__ */ jsx(FaHashtag, {}),
          label: t("transaction.cryptoTxid"),
          value: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsx("span", { className: "font-mono text-gray-900 dark:text-gray-100", children: transaction.crypto_txid }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => {
                  navigator.clipboard.writeText(transaction.crypto_txid);
                  toast.success(t("common.copied"));
                },
                className: "p-1 text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-300",
                children: /* @__PURE__ */ jsx(FaCopy, { className: "h-4 w-4" })
              }
            )
          ] })
        }
      )
    ] });
  };
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      auth: {
        user: {
          ...auth.user,
          roles: auth.user.roles || []
        }
      },
      children: [
        /* @__PURE__ */ jsx(Head, { title: `${t("transaction.details")} - ${transaction.reference_id}` }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: "hidden",
            animate: "visible",
            variants: containerVariants,
            className: "space-y-6",
            children: [
              /* @__PURE__ */ jsx(motion.div, { variants: cardVariants, className: "rounded-xl bg-white p-4 shadow-sm dark:bg-gray-800", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
                  /* @__PURE__ */ jsxs(
                    Link,
                    {
                      href: route("admin.transactions.index"),
                      className: "flex items-center rounded-lg bg-gray-100 px-3 py-2 text-gray-600 transition-all duration-200 hover:text-gray-900 hover:shadow-md dark:bg-gray-700 dark:text-gray-400 dark:hover:text-gray-200",
                      children: [
                        /* @__PURE__ */ jsx(FaArrowLeft, { className: "mr-2 h-4 w-4" }),
                        t("common.back")
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900 dark:text-gray-100", children: t("transaction.details") }),
                    /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: t("transaction.viewDescription") })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs(
                  Link,
                  {
                    href: route("admin.transactions.edit", transaction.id),
                    className: "group inline-flex items-center rounded-lg bg-primary-600 px-4 py-2.5 font-medium text-white shadow-sm transition-all duration-200 hover:bg-primary-700 hover:shadow-md",
                    children: [
                      /* @__PURE__ */ jsx(FaEdit, { className: "mr-2 h-4 w-4 transition-transform group-hover:scale-110" }),
                      t("common.edit")
                    ]
                  }
                )
              ] }) }),
              /* @__PURE__ */ jsxs(motion.div, { variants: cardVariants, className: "overflow-hidden rounded-xl bg-white shadow-sm dark:bg-gray-800", children: [
                /* @__PURE__ */ jsx("div", { className: `px-8 py-4 ${getStatusColor(transaction.status)} border-b border-gray-100 bg-opacity-10 dark:border-gray-700 dark:bg-opacity-20`, children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
                    getStatusIcon(transaction.status),
                    /* @__PURE__ */ jsx("span", { className: "font-medium", children: t(`status.${transaction.status}`) })
                  ] }),
                  /* @__PURE__ */ jsx("span", { className: `rounded-lg px-4 py-1.5 text-sm font-medium ${getTypeColor(transaction.type)}`, children: t(`transaction.type.${transaction.type}`) })
                ] }) }),
                /* @__PURE__ */ jsx("div", { className: "p-8", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-12 lg:grid-cols-2", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
                    /* @__PURE__ */ jsxs("div", { className: "rounded-xl bg-gray-50 p-6 dark:bg-gray-700/30", children: [
                      /* @__PURE__ */ jsxs("h3", { className: "mb-4 flex items-center text-lg font-semibold text-gray-900 dark:text-gray-100", children: [
                        /* @__PURE__ */ jsx(FaUser, { className: "mr-2 h-5 w-5 text-gray-500" }),
                        t("transaction.userDetails")
                      ] }),
                      /* @__PURE__ */ jsx("div", { className: "space-y-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
                        /* @__PURE__ */ jsx("div", { className: "bg-primary-100 dark:bg-primary-900/50 flex h-12 w-12 items-center justify-center rounded-full", children: /* @__PURE__ */ jsx("span", { className: "text-primary-700 dark:text-primary-300 text-lg font-medium", children: transaction.user.name.charAt(0).toUpperCase() }) }),
                        /* @__PURE__ */ jsxs("div", { children: [
                          /* @__PURE__ */ jsx("div", { className: "font-medium text-gray-900 dark:text-gray-100", children: transaction.user.name }),
                          /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500 dark:text-gray-400", children: transaction.user.email })
                        ] })
                      ] }) })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "rounded-xl bg-gray-50 p-6 dark:bg-gray-700/30", children: [
                      /* @__PURE__ */ jsxs("h3", { className: "mb-4 flex items-center text-lg font-semibold text-gray-900 dark:text-gray-100", children: [
                        /* @__PURE__ */ jsx(FaMoneyBillWave, { className: "mr-2 h-5 w-5 text-gray-500" }),
                        t("transaction.paymentDetails")
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                        transaction.type === "bank_withdrawal" && (transaction.customer_name || transaction.customer_surname) && /* @__PURE__ */ jsx(
                          DetailItem,
                          {
                            icon: /* @__PURE__ */ jsx(FaUser, {}),
                            label: t("withdrawal.accountHolder"),
                            value: /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                              /* @__PURE__ */ jsxs("div", { className: "font-medium text-gray-900 dark:text-gray-100", children: [
                                transaction.customer_name,
                                " ",
                                transaction.customer_surname
                              ] }),
                              transaction.customer_meta_id && /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-500", children: [
                                t("withdrawal.customerMetaId"),
                                ": ",
                                transaction.customer_meta_id
                              ] })
                            ] })
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          DetailItem,
                          {
                            icon: /* @__PURE__ */ jsx(FaMoneyBillWave, {}),
                            label: t("transaction.amount"),
                            value: /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                              /* @__PURE__ */ jsx("span", { className: "text-lg font-bold text-gray-900 dark:text-gray-100", children: new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "USD"
                              }).format(parseFloat(transaction.amount_usd)) }),
                              /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500", children: new Intl.NumberFormat("tr-TR", {
                                style: "currency",
                                currency: "TRY"
                              }).format(parseFloat(transaction.amount)) }),
                              transaction.exchange_rate && /* @__PURE__ */ jsxs("div", { className: "text-xs text-gray-400", children: [
                                t("transaction.exchangeRate"),
                                ": ",
                                Number(transaction.exchange_rate).toFixed(4)
                              ] })
                            ] })
                          }
                        ),
                        transaction.type === "bank_withdrawal" ? /* @__PURE__ */ jsxs(Fragment, { children: [
                          /* @__PURE__ */ jsx(
                            DetailItem,
                            {
                              icon: /* @__PURE__ */ jsx(FaCreditCard, {}),
                              label: t("transaction.bankAccount"),
                              value: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
                                /* @__PURE__ */ jsx("span", { className: "font-mono text-gray-900 dark:text-gray-100", children: transaction.bank_account }),
                                transaction.bank_account && /* @__PURE__ */ jsx(
                                  "button",
                                  {
                                    onClick: () => {
                                      navigator.clipboard.writeText(transaction.bank_account);
                                      toast.success(t("common.copied"));
                                    },
                                    className: "p-1 text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-300",
                                    children: /* @__PURE__ */ jsx(FaCopy, { className: "h-4 w-4" })
                                  }
                                )
                              ] })
                            }
                          ),
                          transaction.bank_id && /* @__PURE__ */ jsx(
                            DetailItem,
                            {
                              icon: /* @__PURE__ */ jsx(FaCreditCard, {}),
                              label: t("transaction.bank"),
                              value: transaction.bank_id
                            }
                          )
                        ] }) : renderCryptoDetails(),
                        /* @__PURE__ */ jsx(
                          DetailItem,
                          {
                            icon: /* @__PURE__ */ jsx(FaFileAlt, {}),
                            label: t("transaction.referenceId"),
                            value: transaction.reference_id
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          DetailItem,
                          {
                            icon: /* @__PURE__ */ jsx(FaCalendar, {}),
                            label: t("transaction.date"),
                            value: new Date(transaction.created_at).toLocaleDateString("tr-TR", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit"
                            })
                          }
                        ),
                        transaction.processed_at && /* @__PURE__ */ jsx(
                          DetailItem,
                          {
                            icon: /* @__PURE__ */ jsx(FaCalendar, {}),
                            label: t("transaction.processedAt"),
                            value: new Date(transaction.processed_at).toLocaleDateString("tr-TR", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit"
                            })
                          }
                        )
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
                    /* @__PURE__ */ jsxs(motion.div, { variants: cardVariants, className: "rounded-xl bg-gray-50 p-6 dark:bg-gray-700/30", children: [
                      /* @__PURE__ */ jsxs("h3", { className: "mb-4 flex items-center text-lg font-semibold text-gray-900 dark:text-gray-100", children: [
                        /* @__PURE__ */ jsx(FaHistory, { className: "mr-2 h-5 w-5 text-gray-500" }),
                        t("transaction.history")
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                        /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-4 top-6 w-0.5 bg-gray-200 dark:bg-gray-600" }),
                        /* @__PURE__ */ jsx("div", { className: "space-y-6", children: renderHistory() })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs(motion.div, { variants: cardVariants, className: "rounded-xl bg-gray-50 p-6 dark:bg-gray-700/30", children: [
                      /* @__PURE__ */ jsxs("h3", { className: "mb-4 flex items-center text-lg font-semibold text-gray-900 dark:text-gray-100", children: [
                        /* @__PURE__ */ jsx(FaStickyNote, { className: "mr-2 h-5 w-5 text-gray-500" }),
                        t("transaction.notes")
                      ] }),
                      transaction.notes ? /* @__PURE__ */ jsxs("div", { className: "rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800", children: [
                        /* @__PURE__ */ jsx("p", { className: "whitespace-pre-wrap text-gray-600 dark:text-gray-300", children: transaction.notes }),
                        /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400", children: [
                          /* @__PURE__ */ jsx(FaCalendar, { className: "mr-2 h-4 w-4" }),
                          t("transaction.lastUpdated"),
                          ":",
                          " ",
                          new Date(transaction.updated_at).toLocaleDateString("tr-TR", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit"
                          })
                        ] })
                      ] }) : /* @__PURE__ */ jsxs("div", { className: "rounded-lg bg-white p-4 text-center shadow-sm dark:bg-gray-800", children: [
                        /* @__PURE__ */ jsx("p", { className: "italic text-gray-500 dark:text-gray-400", children: t("transaction.noNotes") }),
                        /* @__PURE__ */ jsxs(
                          Link,
                          {
                            href: route("admin.transactions.edit", transaction.id),
                            className: "text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 mt-4 inline-flex items-center text-sm",
                            children: [
                              /* @__PURE__ */ jsx(FaEdit, { className: "mr-1 h-4 w-4" }),
                              t("transaction.addNote")
                            ]
                          }
                        )
                      ] })
                    ] })
                  ] })
                ] }) })
              ] })
            ]
          }
        ) }) })
      ]
    }
  );
}
const DetailItem = ({
  icon,
  label,
  value
}) => /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
  /* @__PURE__ */ jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 dark:bg-gray-600 dark:text-gray-400", children: icon }),
  /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500 dark:text-gray-400", children: label }),
    /* @__PURE__ */ jsx("div", { className: "text-gray-900 dark:text-gray-100", children: value })
  ] })
] });
const getStatusColor = (status) => {
  switch (status) {
    case "completed":
      return "bg-green-500 text-green-700 dark:text-green-300";
    case "pending":
      return "bg-yellow-500 text-yellow-700 dark:text-yellow-300";
    case "cancelled":
      return "bg-gray-500 text-gray-700 dark:text-gray-300";
    case "rejected":
      return "bg-red-500 text-red-700 dark:text-red-300";
    default:
      return "bg-gray-500 text-gray-700 dark:text-gray-300";
  }
};
const getTypeColor = (type) => {
  switch (type) {
    case "bank_withdrawal":
      return "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300";
    case "crypto_withdrawal":
      return "bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300";
    default:
      return "bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-300";
  }
};
const getStatusIcon = (status) => {
  switch (status) {
    case "completed":
      return /* @__PURE__ */ jsx(FaCheckCircle, { className: "h-5 w-5 text-green-500" });
    case "pending":
      return /* @__PURE__ */ jsx(FaClock, { className: "h-5 w-5 text-yellow-500" });
    case "cancelled":
      return /* @__PURE__ */ jsx(FaTimesCircle, { className: "h-5 w-5 text-gray-500" });
    case "rejected":
      return /* @__PURE__ */ jsx(FaTimesCircle, { className: "h-5 w-5 text-red-500" });
    default:
      return /* @__PURE__ */ jsx(FaInfoCircle, { className: "h-5 w-5 text-gray-500" });
  }
};
export {
  Show as default
};
