import { jsx, jsxs } from "react/jsx-runtime";
import { u as useTranslation } from "./TranslationContext-BjzEj_91.js";
import { A as Authenticated } from "./AuthenticatedLayout-B41ZkwdL.js";
import { UserIcon, KeyIcon, TrashIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { Head } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { toast } from "react-toastify";
import DeleteUserForm from "./DeleteUserForm-DyQ28nrs.js";
import UpdatePasswordForm from "./UpdatePasswordForm-tQG2vBQt.js";
import UpdateProfileInformation from "./UpdateProfileInformationForm-CEOnQvfq.js";
import "./ApplicationLogo-B9pIlq8y.js";
import "react-icons/md";
import "@tippyjs/react";
import "./SecondaryButton-Jyhki9mO.js";
import "./InputError-roYfmLKp.js";
import "./TextInput-CN3Z7KIl.js";
import "./Modal-Cm4dKujS.js";
import "@headlessui/react";
import "./PrimaryButton-DDF1xnxF.js";
import "@heroicons/react/24/solid";
import "./PasswordSetupForm-Dpwp5UV6.js";
import "./EmailVerificationNotice-rLtczur6.js";
function ErrorFallback({
  error,
  resetErrorBoundary
}) {
  const { t } = useTranslation();
  useEffect(() => {
    toast.error(t("error_loading_profile"));
  }, [error, t]);
  return /* @__PURE__ */ jsxs("div", { role: "alert", className: "border-l-4 border-red-400 bg-red-50 p-4", children: [
    /* @__PURE__ */ jsxs("p", { className: "text-red-700", children: [
      t("error_occurred"),
      ":"
    ] }),
    /* @__PURE__ */ jsx("pre", { className: "text-sm text-red-500", children: error.message }),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: resetErrorBoundary,
        className: "mt-2 rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700",
        children: t("try_again")
      }
    )
  ] });
}
function Edit({
  auth,
  mustVerifyEmail = false,
  status,
  socialLogin = false,
  hasPassword = false
}) {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("profile");
  useEffect(() => {
    setIsLoading(false);
  }, []);
  if (!(auth == null ? void 0 : auth.user)) {
    window.location.href = route("login");
    return null;
  }
  if (isLoading) {
    return /* @__PURE__ */ jsx("div", { className: "p-4", children: "Loading..." });
  }
  const handleError = (error) => {
    console.error("Profile page error:", error);
    toast.error(t("error_loading_profile"));
  };
  const sections = [
    {
      id: "profile",
      title: t("profile_information"),
      icon: UserIcon,
      component: UpdateProfileInformation,
      props: {
        mustVerifyEmail,
        status,
        className: "max-w-xl",
        socialLogin,
        hasPassword
      }
    },
    {
      id: "password",
      title: t("update_password"),
      icon: KeyIcon,
      component: UpdatePasswordForm,
      props: {
        className: "max-w-xl",
        socialLogin
      }
    },
    {
      id: "delete",
      title: t("delete_account"),
      icon: TrashIcon,
      component: DeleteUserForm,
      props: {
        className: "max-w-xl"
      }
    }
  ];
  return /* @__PURE__ */ jsx(
    ErrorBoundary,
    {
      FallbackComponent: ErrorFallback,
      onError: handleError,
      onReset: () => window.location.reload(),
      children: /* @__PURE__ */ jsxs(
        Authenticated,
        {
          auth,
          header: /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200", children: t("profile") }),
          children: [
            /* @__PURE__ */ jsx(Head, { title: t("profile") }),
            /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-3xl space-y-4 sm:px-6 lg:px-8", children: sections.map((section) => /* @__PURE__ */ jsxs(
              motion.div,
              {
                className: "overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg",
                initial: false,
                children: [
                  /* @__PURE__ */ jsxs(
                    "button",
                    {
                      onClick: () => setActiveSection(
                        activeSection === section.id ? "" : section.id
                      ),
                      className: "flex w-full items-center justify-between p-6 text-left",
                      children: [
                        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
                          /* @__PURE__ */ jsx(section.icon, { className: "h-6 w-6 text-gray-500" }),
                          /* @__PURE__ */ jsx("span", { className: "text-lg font-medium text-gray-900 dark:text-gray-100", children: section.title })
                        ] }),
                        /* @__PURE__ */ jsx(
                          ChevronDownIcon,
                          {
                            className: `h-5 w-5 text-gray-500 transition-transform duration-200 ${activeSection === section.id ? "rotate-180 transform" : ""}`
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsx(AnimatePresence, { initial: false, children: activeSection === section.id && /* @__PURE__ */ jsx(
                    motion.div,
                    {
                      initial: "collapsed",
                      animate: "open",
                      exit: "collapsed",
                      variants: {
                        open: {
                          opacity: 1,
                          height: "auto"
                        },
                        collapsed: {
                          opacity: 0,
                          height: 0
                        }
                      },
                      transition: {
                        duration: 0.3,
                        ease: "easeInOut"
                      },
                      children: /* @__PURE__ */ jsx("div", { className: "border-t px-6 pb-6 dark:border-gray-700", children: /* @__PURE__ */ jsx(
                        section.component,
                        {
                          ...section.props
                        }
                      ) })
                    }
                  ) })
                ]
              },
              section.id
            )) }) })
          ]
        }
      )
    }
  );
}
export {
  Edit as default
};
