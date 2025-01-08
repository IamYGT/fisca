import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { u as useTranslation } from "./TranslationContext-BjzEj_91.js";
import { A as Authenticated } from "./AuthenticatedLayout-CA30F8TA.js";
import { useForm, Head, Link } from "@inertiajs/react";
import { useState } from "react";
import { FaArrowLeft, FaMoneyBillWave, FaCreditCard, FaCopy, FaBitcoin, FaNetworkWired, FaFileAlt, FaTimes, FaSpinner, FaSave, FaExclamationTriangle } from "react-icons/fa";
import { toast } from "react-toastify";
import "./ApplicationLogo-B9pIlq8y.js";
import "react-icons/md";
import "framer-motion";
import "@tippyjs/react";
function Edit({ auth, transaction, statuses }) {
  var _a;
  const { t } = useTranslation();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const { data, setData, put, processing, errors } = useForm({
    status: transaction.status,
    notes: transaction.notes || "",
    processed_at: transaction.processed_at,
    crypto_txid: transaction.crypto_txid
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (needsConfirmation()) {
      setIsConfirmOpen(true);
      return;
    }
    submitForm();
  };
  const submitForm = () => {
    if (data.status === "completed" && !data.processed_at) {
      setData("processed_at", (/* @__PURE__ */ new Date()).toISOString());
    }
    put(route("admin.transactions.update", transaction.id), {
      onSuccess: () => {
        toast.success(t("transaction.statusUpdated"));
      },
      onError: () => {
        toast.error(t("common.error"));
      }
    });
  };
  const needsConfirmation = () => {
    return (data.status === "cancelled" || data.status === "rejected") && transaction.status === "pending";
  };
  const handleStatusChange = (value) => {
    setData("status", value);
  };
  const renderCryptoFields = () => {
    if (transaction.type !== "crypto_withdrawal") return null;
    return /* @__PURE__ */ jsx("div", { className: "space-y-4 mt-4", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { className: "mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300", children: t("transaction.cryptoTxid") }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          value: data.crypto_txid || "",
          onChange: (e) => setData("crypto_txid", e.target.value),
          className: "focus:border-primary-500 focus:ring-primary-500 w-full rounded-lg border-gray-300 shadow-sm dark:border-gray-600 dark:bg-gray-700/50",
          placeholder: t("transaction.cryptoTxidPlaceholder")
        }
      )
    ] }) });
  };
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      auth,
      header: /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxs("h2", { className: "flex items-center text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200", children: [
        /* @__PURE__ */ jsx("span", { className: "mr-2", children: t("transaction.edit") }),
        /* @__PURE__ */ jsx("span", { className: "rounded-full bg-gray-100 px-3 py-1 text-sm dark:bg-gray-700", children: transaction.reference_id })
      ] }) }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: `${t("transaction.edit")} - ${transaction.reference_id}` }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-6 flex items-center justify-between rounded-xl bg-white p-4 shadow-sm dark:bg-gray-800", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
              /* @__PURE__ */ jsxs(
                Link,
                {
                  href: route("admin.transactions.show", transaction.id),
                  className: "flex items-center rounded-lg bg-gray-100 px-3 py-2 text-gray-600 transition-all duration-200 hover:text-gray-900 hover:shadow-md dark:bg-gray-700 dark:text-gray-400 dark:hover:text-gray-200",
                  children: [
                    /* @__PURE__ */ jsx(FaArrowLeft, { className: "mr-2 h-4 w-4" }),
                    t("common.back")
                  ]
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-900 dark:text-gray-100", children: t("transaction.edit") }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: t("transaction.editDescription") })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex items-center space-x-3", children: /* @__PURE__ */ jsxs("span", { className: "rounded-lg bg-gray-100 px-4 py-2 text-sm text-gray-600 dark:bg-gray-700 dark:text-gray-300", children: [
              "ID: ",
              transaction.reference_id
            ] }) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800", children: /* @__PURE__ */ jsx("div", { className: "p-8", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-12 lg:grid-cols-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "mb-6 flex items-center justify-between", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-gray-900 dark:text-gray-100", children: t("transaction.details") }),
                /* @__PURE__ */ jsx("span", { className: `inline-flex items-center rounded-lg px-3 py-1.5 text-sm font-medium ${getTypeColor(transaction.type)}`, children: t(`transaction.${transaction.type}`) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6 rounded-xl bg-gray-50 p-6 dark:bg-gray-700/30", children: [
                /* @__PURE__ */ jsx(
                  DetailItem,
                  {
                    label: t("transaction.user"),
                    value: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
                      /* @__PURE__ */ jsx("div", { className: "bg-primary-100 dark:bg-primary-900/50 flex h-10 w-10 items-center justify-center rounded-full", children: /* @__PURE__ */ jsx("span", { className: "text-primary-700 dark:text-primary-300 font-medium", children: transaction.user.name.charAt(0).toUpperCase() }) }),
                      /* @__PURE__ */ jsxs("div", { children: [
                        /* @__PURE__ */ jsx("div", { className: "font-medium text-gray-900 dark:text-gray-100", children: transaction.user.name }),
                        /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500 dark:text-gray-400", children: transaction.user.email })
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
                        /* @__PURE__ */ jsx(
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
                ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsx(
                    DetailItem,
                    {
                      icon: /* @__PURE__ */ jsx(FaBitcoin, {}),
                      label: t("transaction.cryptoAddress"),
                      value: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
                        /* @__PURE__ */ jsx("span", { className: "font-mono text-gray-900 dark:text-gray-100", children: transaction.crypto_address }),
                        /* @__PURE__ */ jsx(
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
                  )
                ] }),
                /* @__PURE__ */ jsx(
                  DetailItem,
                  {
                    icon: /* @__PURE__ */ jsx(FaFileAlt, {}),
                    label: t("transaction.referenceId"),
                    value: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
                      /* @__PURE__ */ jsx("span", { className: "font-mono text-gray-900 dark:text-gray-100", children: transaction.reference_id }),
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          onClick: () => {
                            navigator.clipboard.writeText(transaction.reference_id);
                            toast.success(t("common.copied"));
                          },
                          className: "p-1 text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-300",
                          children: /* @__PURE__ */ jsx(FaCopy, { className: "h-4 w-4" })
                        }
                      )
                    ] })
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs(
              "form",
              {
                onSubmit: handleSubmit,
                className: "rounded-xl bg-gray-50 p-8 dark:bg-gray-700/30",
                children: [
                  /* @__PURE__ */ jsx("h3", { className: "mb-6 text-xl font-bold text-gray-900 dark:text-gray-100", children: t("transaction.updateStatus") }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("label", { className: "mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300", children: t("transaction.status") }),
                      /* @__PURE__ */ jsx(
                        "select",
                        {
                          value: data.status,
                          onChange: (e) => handleStatusChange(e.target.value),
                          className: "focus:border-primary-500 focus:ring-primary-500 w-full rounded-lg border-gray-300 shadow-sm dark:border-gray-600 dark:bg-gray-700/50",
                          children: statuses.map((status) => /* @__PURE__ */ jsx("option", { value: status, children: t(`status.${status}`) }, status))
                        }
                      ),
                      errors.status && /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-red-600 dark:text-red-400", children: errors.status })
                    ] }),
                    renderCryptoFields(),
                    /* @__PURE__ */ jsx("div", { className: "space-y-4", children: /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("label", { className: "mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300", children: t("transaction.notes") }),
                      /* @__PURE__ */ jsx(
                        "textarea",
                        {
                          value: data.notes,
                          onChange: (e) => setData("notes", e.target.value),
                          rows: 4,
                          className: "focus:border-primary-500 focus:ring-primary-500 w-full rounded-lg border-gray-300 shadow-sm dark:border-gray-600 dark:bg-gray-700/50",
                          placeholder: t("transaction.notesPlaceholder")
                        }
                      ),
                      errors.notes && /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-red-600 dark:text-red-400", children: errors.notes })
                    ] }) }),
                    /* @__PURE__ */ jsxs("div", { className: "flex justify-end space-x-4 pt-4", children: [
                      /* @__PURE__ */ jsxs(
                        Link,
                        {
                          href: route("admin.transactions.show", transaction.id),
                          className: "group inline-flex items-center rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 hover:text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white",
                          children: [
                            /* @__PURE__ */ jsx(FaTimes, { className: "mr-2 h-4 w-4 transition-transform group-hover:scale-110" }),
                            t("common.cancel")
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxs(
                        "button",
                        {
                          type: "submit",
                          disabled: processing,
                          className: "group inline-flex items-center rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-primary-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50",
                          children: [
                            processing ? /* @__PURE__ */ jsx(FaSpinner, { className: "mr-2 h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsx(FaSave, { className: "mr-2 h-4 w-4 transition-transform group-hover:scale-110" }),
                            t("common.save")
                          ]
                        }
                      )
                    ] })
                  ] })
                ]
              }
            )
          ] }) }) })
        ] }) }),
        isConfirmOpen && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm", children: /* @__PURE__ */ jsxs("div", { className: "mx-4 w-full max-w-md rounded-xl bg-white p-8 shadow-xl dark:bg-gray-800", children: [
          /* @__PURE__ */ jsx("h3", { className: "mb-4 text-xl font-bold text-gray-900 dark:text-gray-100", children: t("transaction.confirmCancel") }),
          /* @__PURE__ */ jsx("p", { className: "mb-8 text-gray-600 dark:text-gray-400", children: t("transaction.confirmCancelMessage") }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-end space-x-4", children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => setIsConfirmOpen(false),
                className: "group inline-flex items-center rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 hover:text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white",
                children: [
                  /* @__PURE__ */ jsx(FaTimes, { className: "mr-2 h-4 w-4 transition-transform group-hover:scale-110" }),
                  t("common.no")
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => {
                  setIsConfirmOpen(false);
                  submitForm();
                },
                className: "group inline-flex items-center rounded-lg bg-red-500 px-5 py-2.5 text-sm font-medium text-white shadow-md transition-all duration-200 hover:bg-red-600 hover:shadow-lg dark:bg-red-600 dark:hover:bg-red-700",
                children: [
                  /* @__PURE__ */ jsx(FaExclamationTriangle, { className: "mr-2 h-4 w-4 transition-transform group-hover:scale-110" }),
                  t("common.yes")
                ]
              }
            )
          ] })
        ] }) })
      ]
    }
  );
}
const DetailItem = ({ icon, label, value }) => /* @__PURE__ */ jsxs("div", { children: [
  /* @__PURE__ */ jsxs("dt", { className: "flex items-center text-sm font-medium text-gray-500 dark:text-gray-400", children: [
    icon && /* @__PURE__ */ jsx("span", { className: "mr-2 flex h-5 w-5 items-center justify-center", children: icon }),
    label
  ] }),
  /* @__PURE__ */ jsx("dd", { className: "mt-1 text-sm", children: value })
] });
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
export {
  Edit as default
};
