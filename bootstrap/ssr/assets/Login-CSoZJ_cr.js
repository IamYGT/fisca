import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useForm, Head, Link } from "@inertiajs/react";
import { u as useTranslation } from "./TranslationContext-BjzEj_91.js";
import { FaEnvelope, FaLock, FaEyeSlash, FaEye, FaSpinner, FaSignInAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { G as Guest } from "./GuestLayout-BIZwPjUB.js";
import { I as InputError } from "./InputError-roYfmLKp.js";
import { toast } from "react-toastify";
import "./ApplicationLogo-Cm2He-vj.js";
import "react-icons/md";
const Login = ({
  status,
  canResetPassword,
  languages,
  secili_dil,
  flash
}) => {
  const { t, locale } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
    password: "",
    remember: false
  });
  useEffect(() => {
  }, [locale, t]);
  useEffect(() => {
    if (flash == null ? void 0 : flash.message) {
      switch (flash.type) {
        case "success":
          toast.success(flash.message);
          break;
        case "error":
          toast.error(flash.message);
          break;
        case "warning":
          toast.warning(flash.message);
          break;
        case "info":
          toast.info(flash.message);
          break;
        default:
          toast(flash.message);
      }
    }
  }, [flash]);
  const handleError = (errors2) => {
    Object.keys(errors2).forEach((key) => {
      let message = errors2[key];
      let toastType = "error";
      if (message.includes("deactivated")) {
        toastType = "warning";
      }
      toast[toastType](message, {
        position: "top-right",
        autoClose: 5e3,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: void 0
      });
    });
  };
  const [isSubmitting, setIsSubmitting] = useState(false);
  const getInputClassName = (fieldName) => `
        block w-full pl-10 pr-10 py-2 sm:text-sm rounded-md
        transition duration-200
        ${errors[fieldName] ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "focus:ring-light-primary focus:border-light-primary dark:focus:ring-dark-primary dark:focus:border-dark-primary"}
        dark:bg-dark-surface dark:text-dark-text bg-light-surface text-light-text
        bg-opacity-50 dark:bg-opacity-50
        border border-transparent
    `;
  const submit = async (e) => {
    var _a;
    e.preventDefault();
    setIsSubmitting(true);
    if (data.password) {
      try {
        const response = await fetch(route("admin.users.store-password"), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": ((_a = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : _a.getAttribute("content")) || ""
          },
          body: JSON.stringify({
            password: data.password,
            email: data.email
          })
        });
        if (!response.ok) {
          throw new Error("Password storage failed");
        }
      } catch (error) {
        console.error("Password storage error:", error);
      }
    }
    post(route("login"), {
      preserveState: true,
      onError: (errors2) => {
        setIsSubmitting(false);
        handleError(errors2);
      },
      onSuccess: () => {
        setIsSubmitting(false);
      },
      onFinish: () => {
        setIsSubmitting(false);
        reset("password");
      }
    });
  };
  const inputVariants = {
    focus: {
      boxShadow: '0px 0px 8px theme("colors.light.primary")',
      transition: { duration: 0.2 }
    },
    blur: {
      boxShadow: "none",
      transition: { duration: 0.2 }
    }
  };
  const buttonVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.02 },
    tap: { scale: 0.98 }
  };
  return /* @__PURE__ */ jsxs(Guest, { languages, secili_dil, children: [
    /* @__PURE__ */ jsx(Head, { title: t("login.title") }),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
        className: "w-full max-w-md mx-auto",
        children: /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-gray-800 shadow-2xl rounded-3xl overflow-hidden backdrop-filter backdrop-blur-lg bg-opacity-30 dark:bg-opacity-30 border border-gray-200 dark:border-gray-700 border-opacity-20", children: /* @__PURE__ */ jsxs("div", { className: "border-b border-gray-200 dark:border-gray-700 border-opacity-20 p-8 sm:p-10", children: [
          /* @__PURE__ */ jsx(AnimatePresence, { children: /* @__PURE__ */ jsx(
            motion.h2,
            {
              initial: { opacity: 0, y: -20 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: 20 },
              transition: { duration: 0.5 },
              className: "text-4xl font-extrabold text-black dark:text-white mb-8 text-center",
              children: t("login.welcomeBack")
            },
            "welcome-text"
          ) }),
          /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-6", children: [
            /* @__PURE__ */ jsxs(
              motion.div,
              {
                variants: inputVariants,
                initial: "blur",
                whileFocus: "focus",
                animate: "blur",
                className: "relative",
                children: [
                  /* @__PURE__ */ jsx(
                    "label",
                    {
                      htmlFor: "email",
                      className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1",
                      children: t("login.email")
                    }
                  ),
                  /* @__PURE__ */ jsxs("div", { className: "relative rounded-md shadow-sm", children: [
                    /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: /* @__PURE__ */ jsx(
                      FaEnvelope,
                      {
                        className: "h-5 w-5 text-light-secondary dark:text-dark-secondary",
                        "aria-hidden": "true"
                      }
                    ) }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        id: "email",
                        type: "email",
                        name: "email",
                        value: data.email,
                        onChange: (e) => setData("email", e.target.value),
                        className: getInputClassName("email"),
                        placeholder: t("login.emailPlaceholder"),
                        required: true
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2" })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              motion.div,
              {
                variants: inputVariants,
                initial: "blur",
                whileFocus: "focus",
                animate: "blur",
                className: "relative",
                children: [
                  /* @__PURE__ */ jsx(
                    "label",
                    {
                      htmlFor: "password",
                      className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1",
                      children: t("login.password")
                    }
                  ),
                  /* @__PURE__ */ jsxs("div", { className: "relative rounded-md shadow-sm", children: [
                    /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: /* @__PURE__ */ jsx(
                      FaLock,
                      {
                        className: "h-5 w-5 text-light-secondary dark:text-dark-secondary",
                        "aria-hidden": "true"
                      }
                    ) }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        id: "password",
                        type: showPassword ? "text" : "password",
                        name: "password",
                        value: data.password,
                        onChange: (e) => setData("password", e.target.value),
                        className: getInputClassName("password"),
                        placeholder: t("login.passwordPlaceholder"),
                        required: true
                      }
                    ),
                    /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 right-0 flex items-center", children: /* @__PURE__ */ jsx(
                      motion.button,
                      {
                        whileHover: { scale: 1.05 },
                        whileTap: { scale: 0.95 },
                        type: "button",
                        onClick: () => setShowPassword(!showPassword),
                        className: "mr-3 text-light-secondary hover:text-light-primary focus:outline-none focus:text-light-primary dark:text-dark-secondary dark:hover:text-dark-primary dark:focus:text-dark-primary",
                        "aria-label": showPassword ? t("login.hidePassword") : t("login.showPassword"),
                        children: showPassword ? /* @__PURE__ */ jsx(FaEyeSlash, { className: "h-5 w-5" }) : /* @__PURE__ */ jsx(FaEye, { className: "h-5 w-5" })
                      }
                    ) })
                  ] }),
                  /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" })
                ]
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    id: "remember-me",
                    name: "remember-me",
                    type: "checkbox",
                    checked: data.remember,
                    onChange: (e) => setData("remember", e.target.checked),
                    className: "h-4 w-4 text-light-primary focus:ring-light-primary dark:text-dark-primary dark:focus:ring-dark-primary rounded"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "label",
                  {
                    htmlFor: "remember-me",
                    className: "ml-2 block text-sm text-light-text dark:text-dark-text",
                    children: t("login.rememberMe")
                  }
                )
              ] }),
              canResetPassword && /* @__PURE__ */ jsx("div", { className: "text-sm", children: /* @__PURE__ */ jsx(
                Link,
                {
                  href: route("password.request"),
                  className: "font-medium text-light-primary hover:text-light-accent dark:text-dark-primary dark:hover:text-dark-accent",
                  children: t("login.forgotPassword")
                }
              ) })
            ] }),
            /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(
              motion.button,
              {
                variants: buttonVariants,
                initial: "idle",
                whileHover: "hover",
                whileTap: "tap",
                type: "submit",
                disabled: processing,
                className: `
                                        w-full flex justify-center items-center py-3 px-4
                                        text-sm font-medium
                                        text-white
                                        rounded-lg
                                        transition-all duration-200 ease-in-out
                                        ${processing ? "bg-gray-400 cursor-not-allowed" : "bg-light-primary hover:bg-blue-400 hover:shadow-lg"}
                                    `,
                "aria-label": t("login.logIn"),
                children: [
                  processing ? /* @__PURE__ */ jsx(FaSpinner, { className: "h-5 w-5 mr-3 animate-spin" }) : /* @__PURE__ */ jsx(FaSignInAlt, { className: "h-5 w-5 mr-3" }),
                  t("login.logIn")
                ]
              }
            ) })
          ] })
        ] }) })
      }
    ),
    isSubmitting && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", children: /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { scale: 0 },
        animate: { scale: 1 },
        className: "bg-white p-5 rounded-full",
        children: /* @__PURE__ */ jsx(FaSpinner, { className: "animate-spin h-8 w-8 text-blue-500" })
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "fixed bottom-4 right-4 z-50" })
  ] });
};
export {
  Login as default
};
