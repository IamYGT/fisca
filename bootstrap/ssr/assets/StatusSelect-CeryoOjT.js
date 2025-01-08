import { jsxs, jsx } from "react/jsx-runtime";
import { Menu } from "@headlessui/react";
import { router } from "@inertiajs/react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaSpinner, FaCircle } from "react-icons/fa";
import { toast } from "react-toastify";
function StatusSelect({
  currentStatus,
  statuses,
  onChange,
  isLoading = false,
  t,
  ticketId
}) {
  const [isStatusUpdating, setIsStatusUpdating] = useState(false);
  const getStatusColor = (status) => {
    switch (status) {
      case "open":
        return "text-blue-500";
      case "answered":
        return "text-green-500";
      case "closed":
        return "text-gray-500";
      default:
        return "text-gray-500";
    }
  };
  const handleStatusChange = async (newStatus) => {
    setIsStatusUpdating(true);
    const formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("status", newStatus);
    try {
      await router.post(
        route("admin.tickets.update-status", ticketId),
        {
          _method: "PUT",
          status: newStatus
        },
        {
          preserveScroll: true,
          onSuccess: () => {
            onChange(newStatus);
            toast.success(t("ticket.statusUpdated"));
          },
          onError: () => {
            toast.error(t("common.error"));
          },
          onFinish: () => {
            setIsStatusUpdating(false);
          }
        }
      );
    } catch (error) {
      console.error("Status update error:", error);
      toast.error(t("common.error"));
      setIsStatusUpdating(false);
    }
  };
  return /* @__PURE__ */ jsxs(Menu, { as: "div", className: "relative", children: [
    /* @__PURE__ */ jsxs(
      Menu.Button,
      {
        className: "flex items-center gap-2 rounded-xl border-2 border-gray-200 bg-white px-4 py-2 text-sm font-medium transition-colors hover:border-gray-300 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600",
        disabled: isLoading || isStatusUpdating,
        children: [
          isLoading || isStatusUpdating ? /* @__PURE__ */ jsx(FaSpinner, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsx(
            FaCircle,
            {
              className: `h-2 w-2 ${getStatusColor(currentStatus)}`
            }
          ),
          /* @__PURE__ */ jsx("span", { children: t(`ticket.status.${currentStatus}`) }),
          /* @__PURE__ */ jsx(
            "svg",
            {
              className: "ml-1 h-4 w-4",
              fill: "none",
              stroke: "currentColor",
              viewBox: "0 0 24 24",
              children: /* @__PURE__ */ jsx(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M19 9l-7 7-7-7"
                }
              )
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsx(AnimatePresence, { children: /* @__PURE__ */ jsx(
      Menu.Items,
      {
        as: motion.div,
        initial: { opacity: 0, y: -10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 },
        className: "absolute right-0 z-50 mt-2 w-48 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800",
        children: /* @__PURE__ */ jsx("div", { className: "py-1", children: statuses.map((status) => /* @__PURE__ */ jsx(Menu.Item, { children: ({ active }) => /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => handleStatusChange(status),
            disabled: isLoading || isStatusUpdating || status === currentStatus,
            className: `${active ? "bg-gray-100 dark:bg-gray-700" : ""} ${currentStatus === status ? "bg-gray-50 dark:bg-gray-700" : ""} ${isLoading || isStatusUpdating ? "cursor-not-allowed opacity-50" : ""} flex w-full items-center gap-2 px-4 py-2 text-sm`,
            children: [
              /* @__PURE__ */ jsx(
                FaCircle,
                {
                  className: `h-2 w-2 ${getStatusColor(
                    status
                  )}`
                }
              ),
              t(`ticket.status.${status}`)
            ]
          }
        ) }, status)) })
      }
    ) })
  ] });
}
export {
  StatusSelect as default
};
