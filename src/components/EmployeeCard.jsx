import React from "react";
import { motion } from "framer-motion";

const formatDate = (value) => {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString(undefined, {
    month: "short",
    year: "numeric",
  });
};

const EmployeeCard = ({ employee }) => {
  const getStatusBadge = (status) => {
    const statusConfig = {
      current: { bg: "bg-green-100", text: "text-green-800", label: "Current" },
      past: { bg: "bg-blue-100", text: "text-blue-800", label: "Past" },
    };
    return statusConfig[status] || statusConfig.current;
  };

  const statusStyle = getStatusBadge(employee.status);
  const joined = formatDate(employee.joinDate);
  const left = formatDate(employee.leaveDate);
  const timelineText =
    employee.status === "current"
      ? `Currently working since ${joined}`
      : left === "—"
      ? `Worked from ${joined}`
      : `Worked from ${joined} to ${left}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
    >
      <div className="relative">
        <div className="w-full h-64 overflow-hidden">
          <img
            src={employee.photo}
            alt={employee.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
        <div
          className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${statusStyle.bg} ${statusStyle.text}`}
        >
          {statusStyle.label}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {employee.name}
        </h3>

        <p className="text-blue-600 font-semibold text-lg mb-2">
          {employee.designation}
        </p>
        <p className="text-gray-600 text-sm mb-3">{timelineText}</p>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <span className="flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Tenure: {employee.tenure || "—"}
          </span>
        </div>

        {employee.description && (
          <p className="text-gray-600 text-sm leading-relaxed">
            {employee.description}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default EmployeeCard;
