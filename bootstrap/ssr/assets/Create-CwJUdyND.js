import { jsxs, jsx } from "react/jsx-runtime";
import { WithdrawalMethodSelector } from "./WithdrawalMethodSelector-CCJBgPmu.js";
import { u as useTranslation } from "./TranslationContext-BjzEj_91.js";
import { A as Authenticated } from "./AuthenticatedLayout-Bdcvct4s.js";
import { Head } from "@inertiajs/react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import "react-icons/fa6";
import "./CryptoWithdrawalForm-CFP7Cz7p.js";
import "react-icons/fa";
import "react-icons/si";
import "react-toastify";
import "./WithdrawalForm-pXJg6iIY.js";
import "./ApplicationLogo-B9pIlq8y.js";
import "react-icons/md";
import "@tippyjs/react";
function WithdrawalRequest({
  auth,
  exchangeRate,
  savedIbans,
  banks
}) {
  const { t } = useTranslation();
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleProcessingChange = (status) => {
    setIsLoading(status);
  };
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      auth: { user: { ...auth.user, roles: auth.user.roles || [] } },
      header: /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200", children: t("withdrawal.request.title") }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: t("withdrawal.request.title") }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-4xl sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx(
          WithdrawalMethodSelector,
          {
            exchangeRate,
            savedIbans,
            banks,
            onAmountChange: setAmount,
            onProcessingChange: handleProcessingChange
          }
        ) }) }),
        /* @__PURE__ */ jsx(AnimatePresence, { children: isLoading && /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm",
            children: /* @__PURE__ */ jsx(
              motion.div,
              {
                initial: { scale: 0.9 },
                animate: { scale: 1 },
                exit: { scale: 0.9 },
                className: "rounded-xl bg-white p-6 shadow-xl dark:bg-gray-800",
                children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
                  /* @__PURE__ */ jsx("div", { className: "mb-4 h-12 w-12 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" }),
                  /* @__PURE__ */ jsx("p", { className: "text-lg font-medium text-gray-900 dark:text-gray-100", children: t("withdrawal.processing") })
                ] })
              }
            )
          }
        ) })
      ]
    }
  );
}
export {
  WithdrawalRequest as default
};
