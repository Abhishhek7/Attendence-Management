import { useState } from "react";
import { Calendar, Users, CalendarDays, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const holidays = [
  { date: "2025-03-10", name: "Holi" },
  { date: "2025-04-14", name: "Good Friday" },
  { date: "2025-05-01", name: "Labor Day" },
  { date: "2025-08-15", name: "Independence Day" },
  { date: "2025-10-02", name: "Gandhi Jayanti" },
  { date: "2025-12-25", name: "Christmas" },
];

const stats = [
  { title: "Total Holidays", value: 15, icon: CalendarDays, color: "bg-blue-500" },
  { title: "Leaves Taken", value: 5, icon: Users, color: "bg-green-500" },
  { title: "Upcoming Holidays", value: 6, icon: CheckCircle, color: "bg-yellow-500" },
];

const Holiday = () => {
  const [selectedDate, setSelectedDate] = useState("");

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <motion.h1
        className="text-2xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Holiday Dashboard
      </motion.h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className={`p-4 ${stat.color} text-white rounded-lg shadow flex items-center gap-4`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <stat.icon className="w-10 h-10" />
            <div>
              <h3 className="text-lg">{stat.title}</h3>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Calendar Section */}
      <motion.div
        className="bg-white p-6 rounded-lg shadow-lg mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Calendar className="w-6 h-6 text-blue-500" /> Holiday Calendar
        </h2>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 31 }, (_, i) => {
            const day = (i + 1).toString().padStart(2, "0");
            const fullDate = `2025-03-${day}`;
            const isHoliday = holidays.some((h) => h.date === fullDate);
            const isSelected = selectedDate === fullDate;
            return (
              <motion.div
                key={i}
                className={`p-3 rounded-lg text-center cursor-pointer ${
                  isSelected ? "bg-green-500 text-white font-bold" : isHoliday ? "bg-red-500 text-white" : "bg-gray-200"
                }`}
                onClick={() => setSelectedDate(fullDate)}
                whileHover={{ scale: 1.1 }}
              >
                {day}
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Upcoming Holidays */}
      <motion.div
        className="bg-white p-6 rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl font-semibold mb-4">Upcoming Holidays</h2>
        <ul>
          {holidays.slice(0, 5).map((holiday, index) => (
            <motion.li
              key={index}
              className="p-2 border-b border-gray-300 last:border-none cursor-pointer hover:text-blue-500 transition"
              whileHover={{ x: 10 }}
              onClick={() => setSelectedDate(holiday.date)}
            >
              <span className="font-bold">{holiday.date}:</span> {holiday.name}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Selected Holiday Details */}
      {selectedDate && (
        <motion.div
          className="mt-6 p-6 bg-green-100 border border-green-500 text-green-900 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-lg font-semibold">
            Selected Holiday: {holidays.find((h) => h.date === selectedDate)?.name || "No Holiday"}
          </h3>
        </motion.div>
      )}
    </div>
  );
};

export default Holiday;
