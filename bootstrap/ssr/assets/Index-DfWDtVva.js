import { jsxs, jsx } from "react/jsx-runtime";
import { M as Modal } from "./Modal-Cm4dKujS.js";
import { u as useTranslation } from "./TranslationContext-BjzEj_91.js";
import { A as Authenticated } from "./AuthenticatedLayout-C-BHxDfp.js";
import { Head, Link, router } from "@inertiajs/react";
import Tippy from "@tippyjs/react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaUserPlus, FaKey, FaEdit, FaTrash, FaEye, FaCopy, FaEnvelope, FaTicketAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import "@headlessui/react";
import "./ApplicationLogo-Cm2He-vj.js";
import "react-icons/md";
function Index({ auth, users }) {
  const { t } = useTranslation();
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const showUserDetails = params.get("showUserDetails");
    const tempPassword = params.get("tempPassword");
    if (showUserDetails && tempPassword) {
      const user = users.find((u) => u.id === parseInt(showUserDetails));
      if (user) {
        setSelectedUser({
          ...user,
          current_password: tempPassword
        });
        setShowUserModal(true);
      }
    }
  }, [users]);
  const handleDelete = (userId) => {
    if (confirm(t("users.confirmDelete"))) {
      router.delete(route("admin.users.destroy", userId), {
        onSuccess: () => {
          toast.success(t("users.deleteSuccess"));
        }
      });
    }
  };
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success(t("common.copied"));
  };
  const sendEmail = (userId) => {
    router.post(
      route("admin.users.send-credentials", userId),
      {},
      {
        onSuccess: () => toast.success(t("users.emailSent")),
        onError: () => toast.error(t("users.emailError"))
      }
    );
  };
  const createSupportTicket = (userId) => {
    router.post(
      route("admin.tickets.create-for-user", userId),
      {
        subject: "Kullanıcı Bilgileri",
        message: `Kullanıcı bilgileri talep edildi.
Kullanıcı: ${selectedUser == null ? void 0 : selectedUser.name}
E-posta: ${selectedUser == null ? void 0 : selectedUser.email}`
      },
      {
        onSuccess: () => toast.success(t("tickets.created")),
        onError: () => toast.error(t("tickets.error"))
      }
    );
  };
  const sendCredentials = (userId) => {
    router.post(route("admin.users.send-credentials", userId), {}, {
      onSuccess: () => {
        toast.success(t("users.credentialsSent"));
        setShowUserModal(false);
        router.reload();
      },
      onError: () => {
        toast.error(t("users.credentialsError"));
      }
    });
  };
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      auth: {
        user: {
          id: auth.user.id,
          name: auth.user.name,
          email: auth.user.email,
          roles: auth.user.roles
        }
      },
      header: /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200", children: t("users.title") }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: t("users.title") }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg", children: /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
          /* @__PURE__ */ jsx("div", { className: "mb-6 flex justify-end", children: /* @__PURE__ */ jsxs(
            Link,
            {
              href: route("admin.users.create"),
              className: "inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-blue-900",
              children: [
                /* @__PURE__ */ jsx(FaUserPlus, { className: "mr-2" }),
                t("users.addNew")
              ]
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200 dark:divide-gray-700", children: [
            /* @__PURE__ */ jsx("thead", { className: "bg-gray-50 dark:bg-gray-700", children: /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx(
                "th",
                {
                  scope: "col",
                  className: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300",
                  children: t("users.name")
                }
              ),
              /* @__PURE__ */ jsx(
                "th",
                {
                  scope: "col",
                  className: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300",
                  children: t("users.email")
                }
              ),
              /* @__PURE__ */ jsx(
                "th",
                {
                  scope: "col",
                  className: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300",
                  children: t("users.role")
                }
              ),
              /* @__PURE__ */ jsx(
                "th",
                {
                  scope: "col",
                  className: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300",
                  children: t("users.createdAt")
                }
              ),
              /* @__PURE__ */ jsx(
                "th",
                {
                  scope: "col",
                  className: "relative px-6 py-3",
                  children: /* @__PURE__ */ jsx("span", { className: "sr-only", children: t("users.actions") })
                }
              )
            ] }) }),
            /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800", children: users.map((user) => {
              var _a, _b;
              return /* @__PURE__ */ jsxs(
                motion.tr,
                {
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  whileHover: {
                    backgroundColor: "rgba(0,0,0,0.05)"
                  },
                  className: "transition-colors duration-150 hover:bg-gray-50 dark:hover:bg-gray-700",
                  children: [
                    /* @__PURE__ */ jsx("td", { className: "whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100", children: user.name }),
                    /* @__PURE__ */ jsx("td", { className: "whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-300", children: user.email }),
                    /* @__PURE__ */ jsx("td", { className: "whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-300", children: ((_a = user.roles[0]) == null ? void 0 : _a.name.charAt(0).toUpperCase()) + ((_b = user.roles[0]) == null ? void 0 : _b.name.slice(
                      1
                    )) || t("users.noRole") }),
                    /* @__PURE__ */ jsx("td", { className: "whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-300", children: new Date(
                      user.created_at
                    ).toLocaleDateString() }),
                    /* @__PURE__ */ jsx("td", { className: "whitespace-nowrap px-6 py-4 text-right text-sm font-medium", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-end space-x-3", children: [
                      /* @__PURE__ */ jsx(
                        Tippy,
                        {
                          content: t(
                            "users.resetPassword"
                          ),
                          children: /* @__PURE__ */ jsx(
                            Link,
                            {
                              href: route(
                                "admin.users.reset-password-form",
                                {
                                  user: user.id
                                }
                              ),
                              className: "text-yellow-600 transition-colors duration-150 hover:text-yellow-900 dark:text-yellow-400 dark:hover:text-yellow-300",
                              preserveScroll: true,
                              children: /* @__PURE__ */ jsx(FaKey, { className: "h-5 w-5" })
                            }
                          )
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        Tippy,
                        {
                          content: t(
                            "users.edit"
                          ),
                          children: /* @__PURE__ */ jsx(
                            Link,
                            {
                              href: route(
                                "admin.users.edit",
                                user.id
                              ),
                              className: "text-indigo-600 transition-colors duration-150 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300",
                              children: /* @__PURE__ */ jsx(FaEdit, { className: "h-5 w-5" })
                            }
                          )
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        Tippy,
                        {
                          content: t(
                            "users.delete"
                          ),
                          children: /* @__PURE__ */ jsx(
                            "button",
                            {
                              onClick: () => handleDelete(
                                user.id
                              ),
                              className: "text-red-600 transition-colors duration-150 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300",
                              children: /* @__PURE__ */ jsx(FaTrash, { className: "h-5 w-5" })
                            }
                          )
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        Tippy,
                        {
                          content: t(
                            "users.viewDetails"
                          ),
                          children: /* @__PURE__ */ jsx(
                            "button",
                            {
                              onClick: () => {
                                setSelectedUser(
                                  {
                                    ...user,
                                    current_password: user.current_password
                                  }
                                );
                                setShowUserModal(
                                  true
                                );
                              },
                              className: "text-blue-600 transition-colors duration-150 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300",
                              children: /* @__PURE__ */ jsx(FaEye, { className: "h-5 w-5" })
                            }
                          )
                        }
                      )
                    ] }) })
                  ]
                },
                user.id
              );
            }) })
          ] }) })
        ] }) }) }) }),
        showUserModal && selectedUser && /* @__PURE__ */ jsx(
          Modal,
          {
            show: showUserModal,
            onClose: () => setShowUserModal(false),
            children: /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
              /* @__PURE__ */ jsx("h3", { className: "mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100", children: t("users.userDetails") }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                /* @__PURE__ */ jsx("div", { className: "rounded-lg bg-gray-50 p-4 dark:bg-gray-700/50", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm font-medium text-gray-500 dark:text-gray-400", children: t("users.name") }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between rounded-md bg-white p-2 dark:bg-gray-800", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-gray-900 dark:text-gray-100", children: selectedUser.name }),
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          onClick: () => copyToClipboard(
                            selectedUser.name
                          ),
                          className: "ml-2 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700",
                          children: /* @__PURE__ */ jsx(FaCopy, { className: "h-4 w-4" })
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm font-medium text-gray-500 dark:text-gray-400", children: t("users.email") }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between rounded-md bg-white p-2 dark:bg-gray-800", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-gray-900 dark:text-gray-100", children: selectedUser.email }),
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          onClick: () => copyToClipboard(
                            selectedUser.email
                          ),
                          className: "ml-2 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700",
                          children: /* @__PURE__ */ jsx(FaCopy, { className: "h-4 w-4" })
                        }
                      )
                    ] })
                  ] })
                ] }) }),
                /* @__PURE__ */ jsx("div", { className: "rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-900/50 dark:bg-yellow-900/20", children: /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                    /* @__PURE__ */ jsx("label", { className: "text-sm font-medium text-yellow-800 dark:text-yellow-200", children: t("users.currentPassword") }),
                    !selectedUser.has_encrypted_password && /* @__PURE__ */ jsx("span", { className: "text-xs text-yellow-600 dark:text-yellow-400", children: t("users.noStoredPassword") })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between rounded-md bg-white p-2 dark:bg-gray-800", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-gray-900 dark:text-gray-100 font-mono", children: selectedUser.current_password || t("users.notAvailable") }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
                      selectedUser.current_password && /* @__PURE__ */ jsx(
                        "button",
                        {
                          onClick: () => selectedUser.current_password && copyToClipboard(selectedUser.current_password),
                          className: "ml-2 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700",
                          title: t("common.copy"),
                          children: /* @__PURE__ */ jsx(FaCopy, { className: "h-4 w-4" })
                        }
                      ),
                      !selectedUser.current_password && selectedUser.id && /* @__PURE__ */ jsx(
                        "button",
                        {
                          onClick: () => sendCredentials(selectedUser.id),
                          className: "ml-2 rounded-full p-1 text-yellow-400 hover:bg-yellow-100 hover:text-yellow-600 dark:hover:bg-yellow-700",
                          title: t("users.generateNewPassword"),
                          children: /* @__PURE__ */ jsx(FaKey, { className: "h-4 w-4" })
                        }
                      )
                    ] })
                  ] }),
                  selectedUser.password_updated_at && /* @__PURE__ */ jsxs("p", { className: "mt-1 text-xs text-yellow-600 dark:text-yellow-400", children: [
                    t("users.lastUpdated"),
                    ":",
                    " ",
                    new Date(selectedUser.password_updated_at).toLocaleString()
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "mt-2 text-xs text-yellow-600 dark:text-yellow-400", children: /* @__PURE__ */ jsx("p", { children: t("users.passwordNote") }) })
                ] }) }),
                /* @__PURE__ */ jsxs("div", { className: "flex justify-end space-x-3", children: [
                  /* @__PURE__ */ jsxs(
                    motion.button,
                    {
                      whileHover: { scale: 1.02 },
                      whileTap: { scale: 0.98 },
                      onClick: () => sendEmail(selectedUser.id),
                      className: "inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                      children: [
                        /* @__PURE__ */ jsx(FaEnvelope, { className: "mr-2 h-4 w-4" }),
                        t("users.sendEmail")
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    motion.button,
                    {
                      whileHover: { scale: 1.02 },
                      whileTap: { scale: 0.98 },
                      onClick: () => createSupportTicket(selectedUser.id),
                      className: "inline-flex items-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2",
                      children: [
                        /* @__PURE__ */ jsx(FaTicketAlt, { className: "mr-2 h-4 w-4" }),
                        t("users.createTicket")
                      ]
                    }
                  )
                ] })
              ] })
            ] })
          }
        )
      ]
    }
  );
}
export {
  Index as default
};
