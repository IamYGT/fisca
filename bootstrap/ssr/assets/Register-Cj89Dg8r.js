import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useCallback, useEffect } from "react";
import { useForm, router, Head } from "@inertiajs/react";
import { u as useTranslation } from "./TranslationContext-BjzEj_91.js";
import { FaSpinner, FaCheckCircle, FaUserPlus, FaEyeSlash, FaEye, FaTimesCircle, FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { G as Guest } from "./GuestLayout-B9k0PQV6.js";
import { I as InputError } from "./InputError-roYfmLKp.js";
import { toast } from "react-toastify";
import "./ApplicationLogo-B9pIlq8y.js";
import "react-icons/md";
function Register({ languages, secili_dil }) {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
  });
  const validateEmail = useCallback((email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }, []);
  useEffect(() => {
    setIsValidEmail(validateEmail(data.email));
  }, [data.email, validateEmail]);
  const checkPasswordStrength = useCallback((password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]+/)) strength++;
    if (password.match(/[A-Z]+/)) strength++;
    if (password.match(/[0-9]+/)) strength++;
    if (password.match(/[$@#&!]+/)) strength++;
    return strength;
  }, []);
  useEffect(() => {
    setPasswordStrength(checkPasswordStrength(data.password));
    setPasswordsMatch(data.password === data.password_confirmation);
  }, [data.password, data.password_confirmation, checkPasswordStrength]);
  useEffect(() => {
    if (registrationSuccess) {
      const timer = setTimeout(() => {
        router.visit(route("dashboard"));
      }, 2e3);
      return () => clearTimeout(timer);
    }
  }, [registrationSuccess]);
  const submit = (e) => {
    e.preventDefault();
    if (passwordsMatch && isValidEmail && passwordStrength >= 3) {
      post(route("kayit_oldu"), {
        preserveState: true,
        preserveScroll: true,
        onSuccess: () => {
        },
        onError: (errors2) => {
          toast.error(t("register.errorMessage"), {
            position: "top-right",
            autoClose: 5e3,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
          });
        }
      });
    }
  };
  const inputVariants = {
    focus: { scale: 1.02, boxShadow: "0px 0px 8px rgba(59, 130, 246, 0.5)", transition: { duration: 0.2 } },
    blur: { scale: 1, boxShadow: "none", transition: { duration: 0.2 } },
    tap: { scale: 0.98, transition: { duration: 0.1 } }
  };
  const buttonVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };
  const renderPasswordStrengthBar = () => {
    const strengthColors = ["#EF4444", "#F59E0B", "#EAB308", "#84CC16", "#22C55E"];
    const strengthTexts = [
      t("register.passwordVeryWeak"),
      t("register.passwordWeak"),
      t("register.passwordMedium"),
      t("register.passwordStrong"),
      t("register.passwordVeryStrong")
    ];
    return /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -10 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3 },
        className: "mt-2",
        children: [
          /* @__PURE__ */ jsx("div", { className: "flex mb-1", children: [0, 1, 2, 3, 4].map((level) => /* @__PURE__ */ jsx(
            motion.div,
            {
              className: `h-2 w-1/5 mr-1 rounded-full`,
              initial: { scaleX: 0 },
              animate: {
                scaleX: passwordStrength > level ? 1 : 0,
                backgroundColor: strengthColors[Math.min(passwordStrength - 1, 4)]
              },
              transition: { duration: 0.2, delay: level * 0.05 }
            },
            level
          )) }),
          /* @__PURE__ */ jsx(
            motion.p,
            {
              className: "text-xs mt-1",
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { duration: 0.3 },
              style: { color: strengthColors[Math.min(passwordStrength - 1, 4)] },
              children: strengthTexts[Math.min(passwordStrength - 1, 4)]
            }
          )
        ]
      }
    );
  };
  const renderInput = (name, icon, type, placeholder, showPasswordToggle = false) => /* @__PURE__ */ jsxs(
    motion.div,
    {
      variants: inputVariants,
      initial: "blur",
      whileFocus: "focus",
      whileTap: "tap",
      animate: "blur",
      className: "mb-4",
      children: [
        /* @__PURE__ */ jsx("label", { htmlFor: name, className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: t(`register.${name}`) }),
        /* @__PURE__ */ jsxs("div", { className: "relative rounded-md shadow-sm", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: icon }),
          /* @__PURE__ */ jsx(
            "input",
            {
              id: name,
              type: showPasswordToggle ? name === "password" ? showPassword ? "text" : "password" : showConfirmPassword ? "text" : "password" : type,
              name,
              value: data[name],
              onChange: (e) => {
                setData(name, e.target.value);
                if (name === "password") {
                  setPasswordStrength(checkPasswordStrength(e.target.value));
                }
              },
              className: `block w-full pl-10 pr-${showPasswordToggle ? "10" : "3"} py-2 sm:text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 dark:bg-gray-700 dark:text-white bg-white text-gray-900 border-gray-300 dark:border-gray-600 transition duration-200 ${name === "password_confirmation" && !passwordsMatch && data.password_confirmation ? "border-red-500 dark:border-red-700" : ""}`,
              placeholder: t(`register.${placeholder}`),
              required: true
            }
          ),
          showPasswordToggle && /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 right-0 pr-3 flex items-center", children: /* @__PURE__ */ jsx(
            motion.button,
            {
              whileHover: { scale: 1.1 },
              whileTap: { scale: 0.9 },
              type: "button",
              onClick: () => name === "password" ? setShowPassword(!showPassword) : setShowConfirmPassword(!showConfirmPassword),
              className: "text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500 dark:text-gray-300 dark:hover:text-gray-200 dark:focus:text-gray-200",
              children: (name === "password" ? showPassword : showConfirmPassword) ? /* @__PURE__ */ jsx(FaEyeSlash, { className: "h-5 w-5" }) : /* @__PURE__ */ jsx(FaEye, { className: "h-5 w-5" })
            }
          ) }),
          name === "email" && /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 right-0 pr-3 flex items-center", children: isValidEmail ? /* @__PURE__ */ jsx(FaCheckCircle, { className: "h-5 w-5 text-green-500" }) : data.email && /* @__PURE__ */ jsx(FaTimesCircle, { className: "h-5 w-5 text-red-500" }) })
        ] }),
        /* @__PURE__ */ jsx(InputError, { message: errors[name], className: "mt-2" }),
        name === "password" && data.password && renderPasswordStrengthBar(),
        name === "password_confirmation" && !passwordsMatch && data.password_confirmation && /* @__PURE__ */ jsx("p", { className: "text-xs mt-1 text-red-500", children: t("register.passwordsDontMatch") })
      ]
    }
  );
  return /* @__PURE__ */ jsxs(Guest, { languages, secili_dil, children: [
    /* @__PURE__ */ jsx(Head, { title: t("register.title") }),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
        className: "w-full max-w-md mx-auto",
        children: /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 shadow-2xl rounded-3xl overflow-hidden backdrop-filter backdrop-blur-lg bg-opacity-30 dark:bg-opacity-30 border border-gray-200 dark:border-gray-700 border-opacity-20", children: [
          /* @__PURE__ */ jsxs("div", { className: "border-b border-gray-200 dark:border-gray-700 border-opacity-20 p-8 sm:p-10", children: [
            /* @__PURE__ */ jsx(AnimatePresence, { children: /* @__PURE__ */ jsx(
              motion.h2,
              {
                initial: { opacity: 0, y: -20 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: 20 },
                transition: { duration: 0.5 },
                className: "text-4xl font-extrabold text-gray-900 dark:text-white mb-8 text-center",
                children: t("register.addNewUser")
              },
              "welcome-text"
            ) }),
            /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-6", children: [
              renderInput("name", /* @__PURE__ */ jsx(FaUser, { className: "h-5 w-5 text-gray-400 dark:text-gray-500", "aria-hidden": "true" }), "text", "namePlaceholder"),
              renderInput("email", /* @__PURE__ */ jsx(FaEnvelope, { className: "h-5 w-5 text-gray-400 dark:text-gray-500", "aria-hidden": "true" }), "email", "emailPlaceholder"),
              renderInput("password", /* @__PURE__ */ jsx(FaLock, { className: "h-5 w-5 text-gray-400 dark:text-gray-500", "aria-hidden": "true" }), "password", "passwordPlaceholder", true),
              renderInput("password_confirmation", /* @__PURE__ */ jsx(FaLock, { className: "h-5 w-5 text-gray-400 dark:text-gray-500", "aria-hidden": "true" }), "password", "confirmPasswordPlaceholder", true),
              /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(
                motion.button,
                {
                  variants: buttonVariants,
                  initial: "idle",
                  whileHover: "hover",
                  whileTap: "tap",
                  type: "submit",
                  disabled: processing || !isValidEmail || passwordStrength < 3 || !passwordsMatch || registrationSuccess,
                  className: `
                                        w-full flex justify-center items-center py-3 px-4 
                                        text-sm font-medium 
                                        text-white
                                        rounded-lg
                                        transition-all duration-200 ease-in-out
                                        ${registrationSuccess ? "bg-green-500 hover:bg-green-600" : processing || !isValidEmail || passwordStrength < 3 || !passwordsMatch ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg"}
                                    `,
                  children: [
                    processing ? /* @__PURE__ */ jsx(FaSpinner, { className: "h-5 w-5 mr-3 animate-spin" }) : registrationSuccess ? /* @__PURE__ */ jsx(FaCheckCircle, { className: "h-5 w-5 mr-3" }) : /* @__PURE__ */ jsx(FaUserPlus, { className: "h-5 w-5 mr-3" }),
                    registrationSuccess ? t("register.successRedirecting") : t("register.register")
                  ]
                }
              ) })
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.4, duration: 0.5 },
              className: "px-4 py-6 bg-light-background dark:bg-dark-surface sm:px-10",
              children: /* @__PURE__ */ jsxs("p", { className: "text-sm leading-6 text-light-text-secondary dark:text-dark-text-secondary", children: [
                t("register.termsAgreement"),
                " ",
                /* @__PURE__ */ jsx("a", { href: "#", className: "font-medium text-light-primary hover:text-light-accent dark:text-dark-primary dark:hover:text-dark-accent", children: t("register.termsOfService") }),
                " ",
                t("register.and"),
                " ",
                /* @__PURE__ */ jsx("a", { href: "#", className: "font-medium text-light-primary hover:text-light-accent dark:text-dark-primary dark:hover:text-dark-accent", children: t("register.privacyPolicy") }),
                "."
              ] })
            }
          )
        ] })
      }
    )
  ] });
}
export {
  Register as default
};
