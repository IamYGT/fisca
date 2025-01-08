import { jsxs, jsx } from "react/jsx-runtime";
import { I as InputError } from "./InputError-roYfmLKp.js";
import { u as useTranslation } from "./TranslationContext-BjzEj_91.js";
import { A as Authenticated } from "./AuthenticatedLayout-B41ZkwdL.js";
import { useForm, Head, router } from "@inertiajs/react";
import { motion } from "framer-motion";
import { useState, useCallback, useEffect } from "react";
import { FaRandom, FaCopy, FaLock, FaEyeSlash, FaEye, FaSpinner, FaKey } from "react-icons/fa";
import { toast } from "react-toastify";
import "./ApplicationLogo-B9pIlq8y.js";
import "react-icons/md";
import "@tippyjs/react";
function ResetPassword({ auth, user }) {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const { data, setData, post, processing, errors } = useForm({
    password: "",
    password_confirmation: ""
  });
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
  const generatePassword = () => {
    const length = 16;
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`\"'\\";
    const punctuation = ",.!?;:";
    let password = "";
    password += lowercase.charAt(
      Math.floor(Math.random() * lowercase.length)
    );
    password += uppercase.charAt(
      Math.floor(Math.random() * uppercase.length)
    );
    password += numbers.charAt(Math.floor(Math.random() * numbers.length));
    password += symbols.charAt(Math.floor(Math.random() * symbols.length));
    password += punctuation.charAt(
      Math.floor(Math.random() * punctuation.length)
    );
    const allChars = lowercase + uppercase + numbers + symbols + punctuation;
    for (let i = password.length; i < length; i++) {
      password += allChars.charAt(
        Math.floor(Math.random() * allChars.length)
      );
    }
    password = password.split("").sort(() => Math.random() - 0.5).join("");
    setData((prevData) => ({
      ...prevData,
      password,
      password_confirmation: password
    }));
    setShowPassword(true);
    setShowConfirmPassword(true);
  };
  const copyPassword = () => {
    navigator.clipboard.writeText(data.password);
    toast.success(t("common.copied"));
  };
  const submit = (e) => {
    e.preventDefault();
    post(route("management.admin.users.reset-password", user.id), {
      onSuccess: () => {
        toast.success(t("users.passwordResetSuccess"));
        router.visit(route("management.admin.users.index"));
      },
      onError: () => {
        toast.error(t("users.passwordResetError"));
      }
    });
  };
  const inputVariants = {
    focus: { scale: 1.02, transition: { duration: 0.2 } },
    blur: { scale: 1, transition: { duration: 0.2 } }
  };
  const renderPasswordStrengthBar = () => {
    const strengthColors = [
      "#EF4444",
      "#F59E0B",
      "#EAB308",
      "#84CC16",
      "#22C55E"
    ];
    const strengthTexts = [
      t("register.passwordVeryWeak"),
      t("register.passwordWeak"),
      t("register.passwordMedium"),
      t("register.passwordStrong"),
      t("register.passwordVeryStrong")
    ];
    return /* @__PURE__ */ jsxs("div", { className: "mt-2", children: [
      /* @__PURE__ */ jsx("div", { className: "mb-1 flex", children: [0, 1, 2, 3, 4].map((level) => /* @__PURE__ */ jsx(
        motion.div,
        {
          className: "mr-1 h-2 w-1/5 rounded-full",
          style: {
            backgroundColor: level < passwordStrength ? strengthColors[Math.min(passwordStrength - 1, 4)] : "#E5E7EB",
            transform: `scaleX(${level < passwordStrength ? 1 : 0.5})`
          }
        },
        level
      )) }),
      passwordStrength > 0 && /* @__PURE__ */ jsx(
        "p",
        {
          className: "mt-1 text-xs",
          style: {
            color: strengthColors[Math.min(passwordStrength - 1, 4)]
          },
          children: strengthTexts[Math.min(passwordStrength - 1, 4)]
        }
      )
    ] });
  };
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      auth,
      header: /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200", children: t("users.resetPasswordFor").replace("{name}", user.name) }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: t("users.resetPassword") }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-2xl sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "overflow-hidden bg-white shadow-xl dark:bg-gray-800 sm:rounded-lg", children: /* @__PURE__ */ jsx("div", { className: "p-8", children: /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsx(
                "label",
                {
                  htmlFor: "password",
                  className: "block text-sm font-medium text-gray-700 dark:text-gray-300",
                  children: t("users.newPassword")
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "flex space-x-2", children: [
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: generatePassword,
                    className: "inline-flex items-center rounded bg-green-600 px-3 py-1 text-xs font-medium text-white hover:bg-green-700",
                    children: [
                      /* @__PURE__ */ jsx(FaRandom, { className: "mr-1" }),
                      t("users.generatePassword")
                    ]
                  }
                ),
                data.password && /* @__PURE__ */ jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: copyPassword,
                    className: "inline-flex items-center rounded bg-blue-600 px-3 py-1 text-xs font-medium text-white hover:bg-blue-700",
                    children: [
                      /* @__PURE__ */ jsx(FaCopy, { className: "mr-1" }),
                      t("common.copy")
                    ]
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs(
              motion.div,
              {
                variants: inputVariants,
                whileFocus: "focus",
                className: "relative mt-1 rounded-md shadow-sm",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3", children: /* @__PURE__ */ jsx(FaLock, { className: "h-5 w-5 text-gray-400" }) }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: showPassword ? "text" : "password",
                      id: "password",
                      name: "password",
                      value: data.password,
                      onChange: (e) => setData(
                        "password",
                        e.target.value
                      ),
                      className: `block w-full rounded-md border border-gray-300 py-2 pl-10 pr-10 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white ${data.password ? "font-mono" : ""}`,
                      required: true
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setShowPassword(!showPassword),
                      className: "absolute inset-y-0 right-0 flex items-center pr-3",
                      children: showPassword ? /* @__PURE__ */ jsx(FaEyeSlash, { className: "h-5 w-5 text-gray-400" }) : /* @__PURE__ */ jsx(FaEye, { className: "h-5 w-5 text-gray-400" })
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              InputError,
              {
                message: errors.password,
                className: "mt-2"
              }
            ),
            data.password && renderPasswordStrengthBar()
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(
              "label",
              {
                htmlFor: "password_confirmation",
                className: "block text-sm font-medium text-gray-700 dark:text-gray-300",
                children: t("users.confirmNewPassword")
              }
            ),
            /* @__PURE__ */ jsxs(
              motion.div,
              {
                variants: inputVariants,
                whileFocus: "focus",
                className: "relative mt-1 rounded-md shadow-sm",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3", children: /* @__PURE__ */ jsx(FaLock, { className: "h-5 w-5 text-gray-400" }) }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: showConfirmPassword ? "text" : "password",
                      id: "password_confirmation",
                      name: "password_confirmation",
                      value: data.password_confirmation,
                      onChange: (e) => setData(
                        "password_confirmation",
                        e.target.value
                      ),
                      className: "block w-full rounded-md border border-gray-300 py-2 pl-10 pr-10 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white",
                      required: true
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setShowConfirmPassword(
                        !showConfirmPassword
                      ),
                      className: "absolute inset-y-0 right-0 flex items-center pr-3",
                      children: showConfirmPassword ? /* @__PURE__ */ jsx(FaEyeSlash, { className: "h-5 w-5 text-gray-400" }) : /* @__PURE__ */ jsx(FaEye, { className: "h-5 w-5 text-gray-400" })
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              InputError,
              {
                message: errors.password_confirmation,
                className: "mt-2"
              }
            ),
            !passwordsMatch && data.password_confirmation && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-600", children: t("users.passwordsDontMatch") })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-end space-x-4", children: [
            /* @__PURE__ */ jsx(
              motion.button,
              {
                whileHover: { scale: 1.02 },
                whileTap: { scale: 0.98 },
                type: "button",
                onClick: () => router.visit(route("management.admin.users.index")),
                className: "inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
                children: t("common.cancel")
              }
            ),
            /* @__PURE__ */ jsxs(
              motion.button,
              {
                whileHover: { scale: 1.02 },
                whileTap: { scale: 0.98 },
                type: "submit",
                disabled: processing || !passwordsMatch || passwordStrength < 3,
                className: `inline-flex items-center rounded-md border border-transparent px-4 py-2 text-sm font-semibold text-white ${processing || !passwordsMatch || passwordStrength < 3 ? "cursor-not-allowed bg-gray-400" : "bg-blue-600 hover:bg-blue-700"} `,
                children: [
                  processing ? /* @__PURE__ */ jsx(FaSpinner, { className: "mr-2 h-5 w-5 animate-spin" }) : /* @__PURE__ */ jsx(FaKey, { className: "mr-2 h-5 w-5" }),
                  t("users.resetPassword")
                ]
              }
            )
          ] })
        ] }) }) }) }) })
      ]
    }
  );
}
export {
  ResetPassword as default
};
