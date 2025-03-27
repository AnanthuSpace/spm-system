import React from "react";
import { motion } from "framer-motion";

const stats = [
  { label: "Active Jobs", value: 50000, color: "bg-blue-100 text-blue-600" },
  { label: "Companies", value: 10000, color: "bg-green-100 text-green-600" },
  { label: "Job Seekers", value: 1000000, color: "bg-purple-100 text-purple-600" },
];

// Counter Animation
const Counter = ({ value }) => {
  return (
    <motion.h3
      className="text-4xl font-extrabold"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      {value.toLocaleString()}+
    </motion.h3>
  );
};

const StatsSection = () => {
  return (
    <div className="flex flex-wrap justify-center gap-50 py-12 bg-gray-50">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          className={`p-6 w-60 h-32 flex flex-col items-center justify-center rounded-lg shadow-lg ${stat.color}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
        >
          <Counter value={stat.value} />
          <p className="text-lg font-semibold text-gray-700">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsSection;
