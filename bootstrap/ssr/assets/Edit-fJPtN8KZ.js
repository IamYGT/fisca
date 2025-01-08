import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useCallback, useEffect } from "react";
import { useForm, Head, router } from "@inertiajs/react";
import { u as useTranslation } from "./TranslationContext-BjzEj_91.js";
import { FaUser, FaEnvelope, FaCheckCircle, FaTimesCircle, FaSpinner, FaUserEdit } from "react-icons/fa";
import { motion } from "framer-motion";
import { A as Authenticated } from "./AuthenticatedLayout-B41ZkwdL.js";
import { I as InputError } from "./InputError-roYfmLKp.js";
import { toast } from "react-toastify";
import "./ApplicationLogo-B9pIlq8y.js";
import "react-icons/md";
import "@tippyjs/react";
function EditUser({ auth, user, languages, secili_dil, availableRoles }) {
  var _a;
  const { t } = useTranslation();
  const [isValidEmail, setIsValidEmail] = useState(true);
  const { data, setData, put, processing, errors } = useForm({
    name: user.name,
    email: user.email,
    role: ((_a = user.roles[0]) == null ? void 0 : _a.id) || "",
    is_active: user.is_active
  });
  const validateEmail = useCallback((email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }, []);
  useEffect(() => {
    setIsValidEmail(validateEmail(data.email));
  }, [data.email, validateEmail]);
  const submit = (e) => {
    e.preventDefault();
    if (isValidEmail) {
      put(route("management.admin.users.update", user.id), {
        onSuccess: () => {
          toast.success(t("users.updateSuccess"));
          router.visit(route("management.admin.users.index"));
        },
        onError: () => {
          toast.error(t("users.updateError"));
        }
      });
    }
  };
  const inputVariants = {
    focus: { scale: 1.02, transition: { duration: 0.2 } },
    blur: { scale: 1, transition: { duration: 0.2 } }
  };
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      auth,
      header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight", children: t("users.editUser") }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: t("users.editUser") }),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5 },
            className: "py-12",
            children: /* @__PURE__ */ jsx("div", { className: "max-w-2xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg", children: /* @__PURE__ */ jsxs("div", { className: "p-8", children: [
              /* @__PURE__ */ jsx(
                motion.h2,
                {
                  initial: { opacity: 0, y: -20 },
                  animate: { opacity: 1, y: 0 },
                  className: "text-3xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100",
                  children: t("users.editUser")
                }
              ),
              /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-6", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { htmlFor: "name", className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: t("users.name") }),
                  /* @__PURE__ */ jsxs(
                    motion.div,
                    {
                      variants: inputVariants,
                      whileFocus: "focus",
                      className: "mt-1 relative rounded-md shadow-sm",
                      children: [
                        /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: /* @__PURE__ */ jsx(FaUser, { className: "h-5 w-5 text-gray-400" }) }),
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "text",
                            id: "name",
                            name: "name",
                            value: data.name,
                            onChange: (e) => setData("name", e.target.value),
                            className: "block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white",
                            required: true
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsx(InputError, { message: errors.name, className: "mt-2" })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { htmlFor: "email", className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: t("users.email") }),
                  /* @__PURE__ */ jsxs(
                    motion.div,
                    {
                      variants: inputVariants,
                      whileFocus: "focus",
                      className: "mt-1 relative rounded-md shadow-sm",
                      children: [
                        /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: /* @__PURE__ */ jsx(FaEnvelope, { className: "h-5 w-5 text-gray-400" }) }),
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "email",
                            id: "email",
                            name: "email",
                            value: data.email,
                            onChange: (e) => setData("email", e.target.value),
                            className: "block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white",
                            required: true
                          }
                        ),
                        /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 right-0 pr-3 flex items-center", children: isValidEmail ? /* @__PURE__ */ jsx(FaCheckCircle, { className: "h-5 w-5 text-green-500" }) : data.email && /* @__PURE__ */ jsx(FaTimesCircle, { className: "h-5 w-5 text-red-500" }) })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2" })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3", children: t("users.role") }),
                  /* @__PURE__ */ jsx("div", { className: "space-y-2", children: availableRoles.map((role) => /* @__PURE__ */ jsxs("label", { className: "inline-flex items-center mr-6", children: [
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "radio",
                        name: "role",
                        value: role.id,
                        checked: data.role === role.id,
                        onChange: (e) => setData("role", Number(e.target.value)),
                        className: "form-radio h-4 w-4 text-blue-600 dark:text-blue-400 focus:ring-blue-500"
                      }
                    ),
                    /* @__PURE__ */ jsx("span", { className: "ml-2 text-gray-700 dark:text-gray-300", children: role.name.charAt(0).toUpperCase() + role.name.slice(1) })
                  ] }, role.id)) }),
                  /* @__PURE__ */ jsx(InputError, { message: errors.role, className: "mt-2" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-900 dark:text-gray-100", children: t("users.accountStatus") }),
                      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-500 dark:text-gray-400", children: t("users.accountStatusDescription") })
                    ] }),
                    /* @__PURE__ */ jsx("div", { className: "flex items-center space-x-3", children: /* @__PURE__ */ jsxs("label", { className: "flex items-center cursor-pointer", children: [
                      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "checkbox",
                            checked: data.is_active,
                            onChange: (e) => {
                              setData("is_active", e.target.checked);
                            },
                            className: "sr-only"
                          }
                        ),
                        /* @__PURE__ */ jsx("div", { className: `
                                                        w-14 h-7 rounded-full transition-colors duration-300 ease-in-out
                                                        ${data.is_active ? "bg-green-500" : "bg-gray-400"}
                                                        shadow-inner
                                                    `, children: /* @__PURE__ */ jsx("div", { className: `
                                                            absolute left-0.5 top-0.5
                                                            bg-white w-6 h-6 rounded-full
                                                            shadow-lg transform transition-transform duration-300 ease-in-out
                                                            flex items-center justify-center
                                                            ${data.is_active ? "translate-x-7" : "translate-x-0"}
                                                        `, children: data.is_active ? /* @__PURE__ */ jsx(FaCheckCircle, { className: "h-4 w-4 text-green-500" }) : /* @__PURE__ */ jsx(FaTimesCircle, { className: "h-4 w-4 text-gray-400" }) }) })
                      ] }),
                      /* @__PURE__ */ jsx("span", { className: `
                                                    ml-3 font-medium text-sm
                                                    ${data.is_active ? "text-green-600 dark:text-green-400" : "text-gray-500 dark:text-gray-400"}
                                                `, children: data.is_active ? t("users.statusActive") : t("users.statusInactive") })
                    ] }) })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "mt-2", children: /* @__PURE__ */ jsx("div", { className: `
                                            text-sm rounded-md p-2
                                            ${data.is_active ? "text-green-700 bg-green-50 dark:bg-green-900/20 dark:text-green-400" : "text-red-700 bg-red-50 dark:bg-red-900/20 dark:text-red-400"}
                                        `, children: data.is_active ? t("users.activeAccountMessage") : t("users.inactiveAccountMessage") }) })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex justify-end space-x-4", children: [
                  /* @__PURE__ */ jsx(
                    motion.button,
                    {
                      whileHover: { scale: 1.02 },
                      whileTap: { scale: 0.98 },
                      type: "button",
                      onClick: () => router.visit(route("management.admin.users.index")),
                      className: "inline-flex items-center px-4 py-2 border border-gray-300 rounded-md font-semibold text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500",
                      children: t("common.cancel")
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    motion.button,
                    {
                      whileHover: { scale: 1.02 },
                      whileTap: { scale: 0.98 },
                      type: "submit",
                      disabled: processing || !isValidEmail,
                      className: `
                                            inline-flex items-center px-4 py-2 border border-transparent rounded-md font-semibold text-sm text-white
                                            ${processing || !isValidEmail ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"}
                                        `,
                      children: [
                        processing ? /* @__PURE__ */ jsx(FaSpinner, { className: "animate-spin h-5 w-5 mr-2" }) : /* @__PURE__ */ jsx(FaUserEdit, { className: "h-5 w-5 mr-2" }),
                        t("users.update")
                      ]
                    }
                  )
                ] })
              ] })
            ] }) }) })
          }
        )
      ]
    }
  );
}
export {
  EditUser as default
};
