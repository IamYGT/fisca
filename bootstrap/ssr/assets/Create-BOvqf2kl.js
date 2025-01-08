import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useCallback, useEffect } from "react";
import { useForm, Head } from "@inertiajs/react";
import { u as useTranslation } from "./TranslationContext-BjzEj_91.js";
import { FaSpinner, FaUserPlus, FaEyeSlash, FaEye, FaCheckCircle, FaTimesCircle, FaKey, FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { motion } from "framer-motion";
import { A as Authenticated } from "./AuthenticatedLayout-B41ZkwdL.js";
import { I as InputError } from "./InputError-roYfmLKp.js";
import { toast } from "react-toastify";
import "./ApplicationLogo-B9pIlq8y.js";
import "react-icons/md";
import "@tippyjs/react";
function CreateUser({ auth, languages, secili_dil }) {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
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
    return strength;
  }, []);
  useEffect(() => {
    setPasswordStrength(checkPasswordStrength(data.password));
    setPasswordsMatch(data.password === data.password_confirmation);
  }, [data.password, data.password_confirmation, checkPasswordStrength]);
  const submit = (e) => {
    e.preventDefault();
    if (passwordsMatch && isValidEmail && passwordStrength >= 2) {
      post(route("management.admin.users.store"), {
        onSuccess: () => {
          toast.success(t("users.createSuccess"));
        },
        onError: () => {
          toast.error(t("users.createError"));
        }
      });
    }
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
              className: "h-2 w-1/5 mr-1 rounded-full",
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
  const renderInput = ({ name, icon, type, placeholder, showPasswordToggle = false }) => /* @__PURE__ */ jsxs(
    motion.div,
    {
      whileFocus: "focus",
      animate: "blur",
      className: "mb-4",
      children: [
        /* @__PURE__ */ jsx("label", { htmlFor: name, className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: t(`users.${name}`) }),
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
              className: `block w-full pl-10 pr-${showPasswordToggle ? "10" : "3"} py-2 sm:text-sm rounded-md
                        focus:ring-blue-500 focus:border-blue-500
                        dark:focus:ring-blue-400 dark:focus:border-blue-400
                        dark:bg-gray-700 dark:text-white bg-white text-gray-900
                        border-gray-300 dark:border-gray-600 transition duration-200
                        ${name === "password_confirmation" && !passwordsMatch && data.password_confirmation ? "border-red-500" : ""}`,
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
              className: "text-gray-400 hover:text-gray-500 focus:outline-none",
              children: (name === "password" ? showPassword : showConfirmPassword) ? /* @__PURE__ */ jsx(FaEyeSlash, { className: "h-5 w-5" }) : /* @__PURE__ */ jsx(FaEye, { className: "h-5 w-5" })
            }
          ) }),
          name === "email" && /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 right-0 pr-3 flex items-center", children: isValidEmail ? /* @__PURE__ */ jsx(FaCheckCircle, { className: "h-5 w-5 text-green-500" }) : data.email && /* @__PURE__ */ jsx(FaTimesCircle, { className: "h-5 w-5 text-red-500" }) })
        ] }),
        /* @__PURE__ */ jsx(InputError, { message: errors[name], className: "mt-2" }),
        name === "password" && data.password && renderPasswordStrengthBar(),
        name === "password_confirmation" && !passwordsMatch && data.password_confirmation && /* @__PURE__ */ jsx("p", { className: "text-xs mt-1 text-red-500", children: t("users.passwordsDontMatch") })
      ]
    }
  );
  const togglePasswordVisibility = (field) => {
    {
      setShowPassword(!showPassword);
    }
  };
  const generatePassword = () => {
    const length = 8;
    const charset = {
      numbers: "0123456789",
      lowercase: "abcdefghijklmnopqrstuvwxyz",
      uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    };
    let password = "";
    password += charset.uppercase.charAt(Math.floor(Math.random() * charset.uppercase.length));
    password += charset.numbers.charAt(Math.floor(Math.random() * charset.numbers.length));
    for (let i = password.length; i < length; i++) {
      password += charset.lowercase.charAt(Math.floor(Math.random() * charset.lowercase.length));
    }
    password = password.split("").sort(() => Math.random() - 0.5).join("");
    setData((prevData) => ({
      ...prevData,
      password,
      password_confirmation: password
    }));
    setPasswordStrength(checkPasswordStrength(password));
    setPasswordsMatch(true);
    toast.success(t("users.passwordGenerated"), {
      position: "top-right",
      autoClose: 2e3
    });
  };
  const renderPasswordField = () => /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
    /* @__PURE__ */ jsx("label", { htmlFor: "password", className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: t("users.password") }),
    /* @__PURE__ */ jsxs("div", { className: "relative mt-1 flex", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: showPassword ? "text" : "password",
            name: "password",
            id: "password",
            value: data.password,
            onChange: (e) => {
              setData("password", e.target.value);
              setPasswordStrength(checkPasswordStrength(e.target.value));
            },
            className: "block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 sm:text-sm pr-10"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => togglePasswordVisibility(),
            type: "button",
            className: "absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500",
            children: showPassword ? /* @__PURE__ */ jsx(FaEyeSlash, { className: "h-5 w-5" }) : /* @__PURE__ */ jsx(FaEye, { className: "h-5 w-5" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(
        motion.button,
        {
          whileHover: { scale: 1.05 },
          whileTap: { scale: 0.95 },
          onClick: generatePassword,
          className: "ml-2 inline-flex items-center rounded-md border border-transparent bg-indigo-100 px-3 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-900 dark:text-indigo-200 dark:hover:bg-indigo-800",
          children: [
            /* @__PURE__ */ jsx(FaKey, { className: "mr-2 h-4 w-4" }),
            t("users.generatePassword")
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx(InputError, { message: errors.password, className: "mt-2" }),
    data.password && renderPasswordStrengthBar()
  ] });
  return /* @__PURE__ */ jsxs(Authenticated, { auth, header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight", children: t("users.createNew") }), children: [
    /* @__PURE__ */ jsx(Head, { title: t("users.createNew") }),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
        className: "py-12",
        children: /* @__PURE__ */ jsx("div", { className: "max-w-2xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-gray-800 shadow-2xl rounded-3xl overflow-hidden backdrop-filter backdrop-blur-lg bg-opacity-30 dark:bg-opacity-30 border border-gray-200 dark:border-gray-700", children: /* @__PURE__ */ jsxs("div", { className: "p-8", children: [
          /* @__PURE__ */ jsx(
            motion.h2,
            {
              initial: { opacity: 0, y: -20 },
              animate: { opacity: 1, y: 0 },
              className: "text-4xl font-extrabold text-gray-900 dark:text-white mb-8 text-center",
              children: t("users.createNew")
            }
          ),
          /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-6", children: [
            renderInput({
              name: "name",
              icon: /* @__PURE__ */ jsx(FaUser, { className: "h-5 w-5 text-gray-400" }),
              type: "text",
              placeholder: "name"
            }),
            renderInput({
              name: "email",
              icon: /* @__PURE__ */ jsx(FaEnvelope, { className: "h-5 w-5 text-gray-400" }),
              type: "email",
              placeholder: "email"
            }),
            renderPasswordField(),
            renderInput({
              name: "password_confirmation",
              icon: /* @__PURE__ */ jsx(FaLock, { className: "h-5 w-5 text-gray-400" }),
              type: "password",
              placeholder: "confirmPassword",
              showPasswordToggle: true
            }),
            /* @__PURE__ */ jsxs(
              motion.button,
              {
                variants: buttonVariants,
                initial: "idle",
                whileHover: "hover",
                whileTap: "tap",
                type: "submit",
                disabled: processing || !isValidEmail || passwordStrength < 2 || !passwordsMatch,
                className: `
                                        w-full flex justify-center items-center py-3 px-4
                                        text-sm font-medium text-white rounded-lg
                                        transition-all duration-200 ease-in-out
                                        ${processing || !isValidEmail || passwordStrength < 2 || !passwordsMatch ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg"}
                                    `,
                children: [
                  processing ? /* @__PURE__ */ jsx(FaSpinner, { className: "h-5 w-5 mr-3 animate-spin" }) : /* @__PURE__ */ jsx(FaUserPlus, { className: "h-5 w-5 mr-3" }),
                  t("users.create")
                ]
              }
            )
          ] })
        ] }) }) })
      }
    )
  ] });
}
export {
  CreateUser as default
};
