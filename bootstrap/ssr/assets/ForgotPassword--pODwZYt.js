import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { useForm, Head } from "@inertiajs/react";
import { u as useTranslation } from "./TranslationContext-BjzEj_91.js";
import { FaEnvelope, FaSpinner } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { G as Guest } from "./GuestLayout-BIZwPjUB.js";
import { I as InputError } from "./InputError-roYfmLKp.js";
import "./ApplicationLogo-Cm2He-vj.js";
import "react-icons/md";
function ForgotPassword({ status, languages, secili_dil }) {
  const { t } = useTranslation();
  const [isValidEmail, setIsValidEmail] = useState(false);
  const { data, setData, post, processing, errors } = useForm({
    email: ""
  });
  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  const submit = (e) => {
    e.preventDefault();
    post(route("password.email"));
  };
  const inputVariants = {
    focus: { scale: 1.02, boxShadow: '0px 0px 8px theme("colors.light.primary")', transition: { duration: 0.2 } },
    blur: { scale: 1, boxShadow: "none", transition: { duration: 0.2 } },
    tap: { scale: 0.98, transition: { duration: 0.1 } }
  };
  const buttonVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };
  return /* @__PURE__ */ jsxs(Guest, { languages, secili_dil, children: [
    /* @__PURE__ */ jsx(Head, { title: t("forgotPassword.title") }),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
        className: "w-full max-w-md mx-auto",
        children: /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-gray-800 shadow-2xl rounded-3xl overflow-hidden backdrop-filter backdrop-blur-lg bg-opacity-30 dark:bg-opacity-30 border border-gray-200 dark:border-gray-700 border-opacity-20", children: /* @__PURE__ */ jsxs("div", { className: "p-8 sm:p-10", children: [
          /* @__PURE__ */ jsx(AnimatePresence, { children: /* @__PURE__ */ jsx(
            motion.h2,
            {
              initial: { opacity: 0, y: -20 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: 20 },
              transition: { duration: 0.5 },
              className: "text-3xl font-extrabold text-gray-900 dark:text-white mb-6 text-center",
              children: t("forgotPassword.title")
            },
            "forgot-password-text"
          ) }),
          /* @__PURE__ */ jsx("div", { className: "mb-4 text-sm text-gray-600 dark:text-gray-400", children: t("forgotPassword.description") }),
          status && /* @__PURE__ */ jsx("div", { className: "mb-4 text-sm font-medium text-green-600 dark:text-green-400", children: t("forgotPassword.linkSent") }),
          /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-6", children: [
            /* @__PURE__ */ jsxs(
              motion.div,
              {
                variants: inputVariants,
                initial: "blur",
                whileFocus: "focus",
                whileTap: "tap",
                animate: "blur",
                children: [
                  /* @__PURE__ */ jsx("label", { htmlFor: "email", className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: t("forgotPassword.email") }),
                  /* @__PURE__ */ jsxs("div", { className: "relative rounded-md shadow-sm", children: [
                    /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: /* @__PURE__ */ jsx(FaEnvelope, { className: "h-5 w-5 text-gray-400 dark:text-gray-500", "aria-hidden": "true" }) }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        id: "email",
                        type: "email",
                        name: "email",
                        value: data.email,
                        onChange: (e) => {
                          setData("email", e.target.value);
                          setIsValidEmail(validateEmail(e.target.value));
                        },
                        className: "block w-full pl-10 pr-3 py-2 sm:text-sm rounded-md focus:ring-light-primary focus:border-light-primary dark:focus:ring-dark-primary dark:focus:border-dark-primary dark:bg-dark-surface dark:text-dark-text bg-light-surface text-light-text bg-opacity-50 dark:bg-opacity-50 border border-transparent transition duration-200",
                        placeholder: t("forgotPassword.emailPlaceholder"),
                        required: true
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2" })
                ]
              }
            ),
            /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(
              motion.button,
              {
                variants: buttonVariants,
                initial: "idle",
                whileHover: "hover",
                whileTap: "tap",
                type: "submit",
                disabled: processing || !isValidEmail,
                className: `
                                        w-full flex justify-center items-center py-3 px-4 
                                        text-sm font-medium 
                                        text-white
                                        rounded-lg
                                        transition-all duration-200 ease-in-out
                                        ${processing || !isValidEmail ? "bg-gray-400 cursor-not-allowed" : "bg-light-primary hover:bg-blue-400 hover:shadow-lg"}
                                    `,
                children: [
                  processing ? /* @__PURE__ */ jsx(FaSpinner, { className: "h-5 w-5 mr-3 animate-spin" }) : /* @__PURE__ */ jsx(FaEnvelope, { className: "h-5 w-5 mr-3" }),
                  t("forgotPassword.sendResetLink")
                ]
              }
            ) })
          ] })
        ] }) })
      }
    )
  ] });
}
export {
  ForgotPassword as default
};
