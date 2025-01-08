import { jsxs, jsx } from "react/jsx-runtime";
import { u as useTranslation } from "./TranslationContext-BjzEj_91.js";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaBuildingColumns, FaWallet } from "react-icons/fa6";
import { CryptoWithdrawalForm } from "./CryptoWithdrawalForm-CFP7Cz7p.js";
import { WithdrawalForm } from "./WithdrawalForm-pXJg6iIY.js";
import "@inertiajs/react";
import "react-icons/fa";
import "react-icons/si";
import "react-toastify";
const WithdrawalMethodSelector = ({
  exchangeRate,
  savedIbans,
  banks,
  onAmountChange,
  onProcessingChange
}) => {
  const { t } = useTranslation();
  const [selectedMethod, setSelectedMethod] = useState("bank");
  const methods = [
    {
      id: "bank",
      name: t("withdrawal.methods.bank"),
      icon: FaBuildingColumns,
      description: t("withdrawal.methods.bankDescription")
    },
    {
      id: "crypto",
      name: t("withdrawal.methods.crypto"),
      icon: FaWallet,
      description: t("withdrawal.methods.cryptoDescription")
    }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2", children: methods.map((method) => /* @__PURE__ */ jsx(
      motion.div,
      {
        whileHover: { scale: 1.02 },
        whileTap: { scale: 0.98 },
        onClick: () => setSelectedMethod(method.id),
        className: `cursor-pointer rounded-xl border-2 p-4 transition-colors ${selectedMethod === method.id ? "border-indigo-500 bg-indigo-50 dark:border-indigo-400 dark:bg-indigo-900/20" : "border-gray-200 hover:border-indigo-200 dark:border-gray-700 dark:hover:border-indigo-700"}`,
        children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: `rounded-lg p-3 ${selectedMethod === method.id ? "bg-indigo-500 text-white" : "bg-gray-100 text-gray-500 dark:bg-gray-800"}`,
              children: /* @__PURE__ */ jsx(method.icon, { className: "h-6 w-6" })
            }
          ),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "font-medium text-gray-900 dark:text-gray-100", children: method.name }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: method.description })
          ] })
        ] })
      },
      method.id
    )) }),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
        children: selectedMethod === "bank" ? /* @__PURE__ */ jsx(
          WithdrawalForm,
          {
            exchangeRate,
            savedIbans,
            banks,
            onAmountChange,
            onProcessingChange
          }
        ) : /* @__PURE__ */ jsx(
          CryptoWithdrawalForm,
          {
            exchangeRate,
            onAmountChange,
            onProcessingChange
          }
        )
      },
      selectedMethod
    )
  ] });
};
export {
  WithdrawalMethodSelector
};
