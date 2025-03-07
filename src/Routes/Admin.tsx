import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Menu, Users, CalendarCheck, Settings } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const attendanceData = [
  { id: 1, name: "Ramesh Khan", date: "2025-03-04", status: "Present" },
  { id: 2, name: "Junior Yadav", date: "2025-03-04", status: "Absent" },
  { id: 3, name: "Michael Patel", date: "2025-03-04", status: "Present" },
];

const chartData = [
  { date: "Mon", present: 30, absent: 5 },
  { date: "Tue", present: 28, absent: 7 },
  { date: "Wed", present: 32, absent: 3 },
  { date: "Thu", present: 29, absent: 6 },
  { date: "Fri", present: 31, absent: 4 },
];

const Admin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedPage, setSelectedPage] = useState("dashboard"); // Default page

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -200 }}
        animate={{ x: sidebarOpen ? 0 : -200 }}
        transition={{ duration: 0.3 }}
        className={`bg-gray-900 text-white w-64 p-5 fixed h-full ${sidebarOpen ? "block" : "hidden md:block"}`}
      >
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <ul>
          <li className="flex items-center mb-4 cursor-pointer hover:text-gray-300"
              onClick={() => setSelectedPage("users")}>
            <Users className="mr-2" /> Users
          </li>
          <li className="flex items-center mb-4 cursor-pointer hover:text-gray-300"
              onClick={() => setSelectedPage("attendance")}>
            <CalendarCheck className="mr-2" /> Attendance
          </li>
          <li className="flex items-center mb-4 cursor-pointer hover:text-gray-300"
              onClick={() => setSelectedPage("settings")}>
            <Settings className="mr-2" /> Settings
          </li>
        </ul>
      </motion.div>

      {/* Main Content */}
      <div className={`flex-1 p-6 transition-all ${sidebarOpen ? "pl-64" : "pl-16"}`}>
        {/* Navbar */}
        <div className="flex justify-between items-center mb-6">
          <Button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 mr-4">
            <Menu />
          </Button>
          <h1 className="text-2xl font-bold capitalize">{selectedPage}</h1>
        </div>

        {/* Content Switching */}
        {selectedPage === "dashboard" && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card className="p-4">
                <CardContent>
                  <h3 className="text-lg font-semibold">Total Employees</h3>
                  <p className="text-2xl font-bold">50</p>
                </CardContent>
              </Card>
              <Card className="p-4">
                <CardContent>
                  <h3 className="text-lg font-semibold">Present Today</h3>
                  <p className="text-2xl font-bold">45</p>
                </CardContent>
              </Card>
              <Card className="p-4">
                <CardContent>
                  <h3 className="text-lg font-semibold">Absent Today</h3>
                  <p className="text-2xl font-bold">5</p>
                </CardContent>
              </Card>
            </div>

            {/* Attendance Overview Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardContent>
                  <h3 className="text-lg font-semibold">Daily Attendance</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={chartData}>
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="present" stroke="#4CAF50" strokeWidth={3} />
                      <Line type="monotone" dataKey="absent" stroke="#F44336" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <h3 className="text-lg font-semibold">Attendance Summary</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={chartData}>
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="present" fill="#4CAF50" />
                      <Bar dataKey="absent" fill="#F44336" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </>
        )}

        {/* Users Page */}
        {selectedPage === "users" && (
          <div className="bg-white p-6 shadow rounded-lg">
            <h2 className="text-xl font-semibold mb-4">User Management</h2>
            <p>Here you can manage users (add, edit, delete).</p>
          </div>
        )}

        {/* Attendance Page */}
        {selectedPage === "attendance" && (
          <div className="bg-white p-6 shadow rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Attendance Records</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendanceData.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>{record.id}</TableCell>
                    <TableCell>{record.name}</TableCell>
                    <TableCell>{record.date}</TableCell>
                    <TableCell>{record.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Settings Page */}
        {selectedPage === "settings" && (
          <div className="bg-white p-6 shadow rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Settings</h2>
            <p>Here you can update admin settings.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
