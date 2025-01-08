import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { u as useTranslation } from "./TranslationContext-BjzEj_91.js";
import { A as Authenticated } from "./AuthenticatedLayout-B41ZkwdL.js";
import { p as parseAmount } from "./format-DHO-As0T.js";
import { Head, Link, router } from "@inertiajs/react";
import { motion } from "framer-motion";
import { useState, useEffect, Fragment as Fragment$1 } from "react";
import { toast } from "react-toastify";
import { FaMoneyBillWave, FaClock, FaCheckCircle, FaSearch, FaDownload, FaInfoCircle, FaDollarSign, FaEye, FaBan, FaTimesCircle, FaMoneyBill, FaBitcoin } from "react-icons/fa";
import { Transition, Dialog } from "@headlessui/react";
import "./ApplicationLogo-B9pIlq8y.js";
import "react-icons/md";
import "@tippyjs/react";
const CancelModal = ({
  isOpen,
  closeModal,
  onConfirm,
  transactionId
}) => {
  const { t } = useTranslation();
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") closeModal();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, closeModal]);
  return /* @__PURE__ */ jsx(Transition, { appear: true, show: isOpen, as: Fragment$1, children: /* @__PURE__ */ jsxs(Dialog, { as: "div", className: "relative z-[60]", onClose: closeModal, children: [
    /* @__PURE__ */ jsx(
      Transition.Child,
      {
        as: Fragment$1,
        enter: "ease-out duration-300",
        enterFrom: "opacity-0",
        enterTo: "opacity-100",
        leave: "ease-in duration-200",
        leaveFrom: "opacity-100",
        leaveTo: "opacity-0",
        children: /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black/25 backdrop-blur-sm" })
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "fixed inset-0 overflow-y-auto", children: /* @__PURE__ */ jsx("div", { className: "flex min-h-full items-center justify-center p-4 text-center", children: /* @__PURE__ */ jsx(
      Transition.Child,
      {
        as: Fragment$1,
        enter: "ease-out duration-300",
        enterFrom: "opacity-0 scale-95",
        enterTo: "opacity-100 scale-100",
        leave: "ease-in duration-200",
        leaveFrom: "opacity-100 scale-100",
        leaveTo: "opacity-0 scale-95",
        children: /* @__PURE__ */ jsxs(Dialog.Panel, { className: "w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-gray-800", children: [
          /* @__PURE__ */ jsxs(
            Dialog.Title,
            {
              as: "h3",
              className: "flex items-center space-x-2 text-lg font-medium leading-6 text-gray-900 dark:text-gray-100",
              children: [
                /* @__PURE__ */ jsx(FaBan, { className: "h-5 w-5 text-red-500" }),
                /* @__PURE__ */ jsx("span", { children: t("transaction.cancelTitle") })
              ]
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "mt-2", children: /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: t("transaction.cancelConfirmMessage", { id: transactionId }) }) }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 flex space-x-3", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                className: "inline-flex justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2",
                onClick: onConfirm,
                children: t("common.confirm")
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                className: "inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600",
                onClick: closeModal,
                children: t("common.cancel")
              }
            )
          ] })
        ] })
      }
    ) }) })
  ] }) });
};
const TransactionCard = ({
  transaction
}) => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300";
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300";
      case "cancelled":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300";
    }
  };
  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return /* @__PURE__ */ jsx(FaCheckCircle, { className: "h-5 w-5" });
      case "pending":
      case "waiting":
        return /* @__PURE__ */ jsx(FaClock, { className: "h-5 w-5" });
      case "rejected":
        return /* @__PURE__ */ jsx(FaTimesCircle, { className: "h-5 w-5" });
      default:
        return /* @__PURE__ */ jsx(FaInfoCircle, { className: "h-5 w-5" });
    }
  };
  const getTypeIcon = (type, transaction2) => {
    if (type === "bank_withdrawal") {
      return /* @__PURE__ */ jsx(FaMoneyBill, { className: "h-5 w-5 text-blue-500" });
    }
    if (type === "crypto_withdrawal") {
      return /* @__PURE__ */ jsx(FaBitcoin, { className: "h-5 w-5 text-orange-500" });
    }
    return /* @__PURE__ */ jsx(FaMoneyBillWave, { className: "h-5 w-5 text-gray-500" });
  };
  const handleCancel = () => {
    router.post(route("transactions.cancel", { transaction: transaction.id }), {}, {
      onSuccess: () => {
        setIsModalOpen(false);
        window.location.reload();
      },
      onError: () => {
        setIsModalOpen(false);
        toast.error(t("transaction.cancelError"), {
          theme: document.documentElement.classList.contains("dark") ? "dark" : "light",
          position: "top-right",
          autoClose: 5e3,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          style: { zIndex: 50 }
        });
      }
    });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        className: "overflow-hidden rounded-xl bg-white shadow-sm transition-colors duration-200 hover:shadow-md dark:bg-gray-800",
        children: /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
              /* @__PURE__ */ jsx("div", { className: "rounded-full bg-gray-100 p-3 dark:bg-gray-700", children: getTypeIcon(transaction.type) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900 dark:text-gray-100", children: t(`transaction.type.${transaction.type}`) }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: new Date(transaction.created_at).toLocaleDateString("tr-TR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit"
                }) })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "text-right", children: /* @__PURE__ */ jsxs("div", { className: "text-lg font-bold text-gray-900 dark:text-gray-100", children: [
              /* @__PURE__ */ jsx(FaDollarSign, { className: "mr-1 inline h-4 w-4" }),
              parseAmount(transaction.amount_usd).toFixed(2)
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
              /* @__PURE__ */ jsxs(
                "span",
                {
                  className: `inline-flex items-center space-x-1 rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(transaction.status)}`,
                  children: [
                    getStatusIcon(transaction.status),
                    /* @__PURE__ */ jsx("span", { children: t(`status.${transaction.status}`) })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs("span", { className: "text-sm text-gray-500 dark:text-gray-400", children: [
                "#",
                transaction.reference_id
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
              /* @__PURE__ */ jsxs(
                Link,
                {
                  href: route("transactions.show", transaction.id),
                  className: "inline-flex items-center space-x-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-200 hover:shadow-sm dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600",
                  children: [
                    /* @__PURE__ */ jsx(FaEye, { className: "h-4 w-4" }),
                    /* @__PURE__ */ jsx("span", { children: t("common.details") })
                  ]
                }
              ),
              ["pending", "waiting"].includes(transaction.status) && /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => setIsModalOpen(true),
                  className: "inline-flex items-center space-x-2 rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-red-600 hover:shadow-sm dark:bg-red-600 dark:text-white dark:hover:bg-red-700",
                  children: [
                    /* @__PURE__ */ jsx(FaBan, { className: "h-4 w-4" }),
                    /* @__PURE__ */ jsx("span", { children: t("common.cancel") })
                  ]
                }
              )
            ] })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsx(
      CancelModal,
      {
        isOpen: isModalOpen,
        closeModal: () => setIsModalOpen(false),
        onConfirm: handleCancel,
        transactionId: transaction.reference_id
      }
    )
  ] });
};
function TransactionHistory({
  auth,
  transactions,
  stats
}) {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const filteredTransactions = transactions.data.filter((transaction) => {
    const matchesSearch = transaction.reference_id.toLowerCase().includes(searchTerm.toLowerCase()) || transaction.amount_usd.toString().includes(searchTerm);
    const matchesFilter = filterType === "all" || transaction.status === filterType || transaction.type === filterType;
    return matchesSearch && matchesFilter;
  });
  const exportToCSV = () => {
    const headers = [
      t("transaction.date"),
      t("transaction.type"),
      t("transaction.amountUSD"),
      t("transaction.status"),
      t("transaction.referenceId")
    ];
    const csvContent = [
      headers.join(","),
      ...filteredTransactions.map(
        (tx) => [
          new Date(tx.created_at).toLocaleDateString(),
          t(`transaction.type.${tx.type}`),
          tx.amount_usd,
          t(`status.${tx.status}`),
          tx.reference_id
        ].join(",")
      )
    ].join("\n");
    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;"
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `transactions_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.csv`;
    link.click();
    toast.success(t("transaction.exported"));
  };
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      auth: { user: { ...auth.user, roles: auth.user.roles || [] } },
      header: /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200", children: t("transaction.history") }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: t("transaction.history") }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3", children: [
            /* @__PURE__ */ jsx(
              motion.div,
              {
                whileHover: { scale: 1.02 },
                className: "rounded-xl bg-gradient-to-br from-green-50 to-green-100 p-6 dark:from-green-900/30 dark:to-green-800/30",
                children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-green-600 dark:text-green-400", children: t("transaction.totalAmountUSD") }),
                    /* @__PURE__ */ jsxs("p", { className: "mt-2 text-3xl font-bold text-green-700 dark:text-green-300", children: [
                      "$",
                      parseAmount(stats.total_amount_usd).toFixed(2)
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx(FaMoneyBillWave, { className: "h-12 w-12 text-green-500/50" })
                ] })
              }
            ),
            /* @__PURE__ */ jsx(
              motion.div,
              {
                whileHover: { scale: 1.02 },
                className: "rounded-xl bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 dark:from-yellow-900/30 dark:to-yellow-800/30",
                children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-yellow-600 dark:text-yellow-400", children: t("transaction.pendingCount") }),
                    /* @__PURE__ */ jsx("p", { className: "mt-2 text-3xl font-bold text-yellow-700 dark:text-yellow-300", children: stats.pending_count })
                  ] }),
                  /* @__PURE__ */ jsx(FaClock, { className: "h-12 w-12 text-yellow-500/50" })
                ] })
              }
            ),
            /* @__PURE__ */ jsx(
              motion.div,
              {
                whileHover: { scale: 1.02 },
                className: "rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 p-6 dark:from-purple-900/30 dark:to-purple-800/30",
                children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-purple-600 dark:text-purple-400", children: t("transaction.completedCount") }),
                    /* @__PURE__ */ jsx("p", { className: "mt-2 text-3xl font-bold text-purple-700 dark:text-purple-300", children: stats.completed_count })
                  ] }),
                  /* @__PURE__ */ jsx(FaCheckCircle, { className: "h-12 w-12 text-purple-500/50" })
                ] })
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-6 flex flex-col gap-4 rounded-xl bg-white p-4 shadow-sm dark:bg-gray-800 sm:flex-row sm:items-center sm:justify-between", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-1 items-center space-x-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "relative flex-1", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    value: searchTerm,
                    onChange: (e) => setSearchTerm(e.target.value),
                    placeholder: t(
                      "transaction.searchPlaceholder"
                    ),
                    className: "w-full rounded-lg border-gray-300 pl-10 pr-4 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700"
                  }
                ),
                /* @__PURE__ */ jsx(FaSearch, { className: "absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" })
              ] }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  value: filterType,
                  onChange: (e) => setFilterType(e.target.value),
                  className: "rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700",
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "all", children: t("common.all") }),
                    /* @__PURE__ */ jsxs("optgroup", { label: t("transaction.statusGroup"), children: [
                      /* @__PURE__ */ jsx("option", { value: "pending", children: t("status.pending") }),
                      /* @__PURE__ */ jsx("option", { value: "cancelled", children: t("status.cancelled") }),
                      /* @__PURE__ */ jsx("option", { value: "completed", children: t("status.completed") }),
                      /* @__PURE__ */ jsx("option", { value: "rejected", children: t("status.rejected") })
                    ] }),
                    /* @__PURE__ */ jsxs("optgroup", { label: t("transaction.accountGroup"), children: [
                      /* @__PURE__ */ jsx("option", { value: "crypto_withdrawal", children: t("transaction.type.crypto") }),
                      /* @__PURE__ */ jsx("option", { value: "bank_withdrawal", children: t("transaction.type.bank") })
                    ] })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: exportToCSV,
                className: "inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700",
                children: [
                  /* @__PURE__ */ jsx(FaDownload, { className: "mr-2 h-4 w-4" }),
                  t("common.export")
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "space-y-4", children: filteredTransactions.length > 0 ? filteredTransactions.map((transaction) => /* @__PURE__ */ jsx(
            TransactionCard,
            {
              transaction
            },
            transaction.id
          )) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center rounded-xl bg-white py-12 text-center dark:bg-gray-800", children: [
            /* @__PURE__ */ jsx(FaInfoCircle, { className: "mb-4 h-12 w-12 text-gray-400" }),
            /* @__PURE__ */ jsx("h3", { className: "mb-2 text-lg font-medium text-gray-900 dark:text-gray-100", children: t("transaction.noResults") }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-500 dark:text-gray-400", children: t("transaction.tryDifferentSearch") })
          ] }) })
        ] }) })
      ]
    }
  );
}
export {
  TransactionHistory as default
};
