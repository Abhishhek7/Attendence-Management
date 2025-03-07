  import { useState } from "react";
  import { Card, CardContent } from "../components/ui/card";
  import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
  import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
  import { Users, Briefcase, CalendarCheck, Activity } from "lucide-react";

  const employees = [
    { id: 1, name: "Ramesh Khan", department: "Engineering", role: "Software Engineer", status: "Active" },
    { id: 2, name: "Junior Yadav", department: "HR", role: "HR Manager", status: "On Leave" },
    { id: 3, name: "Michael Patel", department: "Finance", role: "Accountant", status: "Active" },
  ];

  const attendanceChartData = [
    { month: "Jan", present: 20, absent: 5 },  
    { month: "Feb", present: 22, absent: 3 },
    { month: "Mar", present: 19, absent: 6 },
    { month: "Apr", present: 21, absent: 4 },
  ];

  const performanceData = [
    { month: "Jan", performance: 80 },
    { month: "Feb", performance: 85 },
    { month: "Mar", performance: 78 },
    { month: "Apr", performance: 82 },
  ];

  const Employee = () => {
    const [selectedEmployee, setSelectedEmployee] = useState(employees[0]);

    return (
      <div className="p-6 bg-gray-100 min-h-screen">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Employee Dashboard</h1>
        </div>

        {/* Employee Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card className="p-4 flex items-center gap-4">
            <Users className="text-blue-500 w-10 h-10" />
            <CardContent>
              <h3 className="text-lg font-semibold">Total Employees</h3>
              <p className="text-2xl font-bold">50</p>
            </CardContent>
          </Card>

          <Card className="p-4 flex items-center gap-4">
            <Briefcase className="text-green-500 w-10 h-10" />
            <CardContent>
              <h3 className="text-lg font-semibold">Departments</h3>
              <p className="text-2xl font-bold">5</p>
            </CardContent>
          </Card>

          <Card className="p-4 flex items-center gap-4">
            <CalendarCheck className="text-purple-500 w-10 h-10" />
            <CardContent>
              <h3 className="text-lg font-semibold">On Leave</h3>
              <p className="text-2xl font-bold">3</p>
            </CardContent>
          </Card>

          <Card className="p-4 flex items-center gap-4">
            <Activity className="text-red-500 w-10 h-10" />
            <CardContent>
              <h3 className="text-lg font-semibold">Performance Avg</h3>
              <p className="text-2xl font-bold">82%</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardContent>
              <h3 className="text-lg font-semibold">Attendance Overview</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={attendanceChartData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="present" fill="#4CAF50" />
                  <Bar dataKey="absent" fill="#F44336" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <h3 className="text-lg font-semibold">Performance Trend</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={performanceData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="performance" stroke="#3B82F6" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Employee Table */}
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Employee Details</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((emp) => (
                <TableRow
                  key={emp.id}
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => setSelectedEmployee(emp)}
                >
                  <TableCell>{emp.id}</TableCell>
                  <TableCell>{emp.name}</TableCell>
                  <TableCell>{emp.department}</TableCell>
                  <TableCell>{emp.role}</TableCell>
                  <TableCell
                    className={`${
                      emp.status === "Active" ? "text-green-600" : "text-red-500"
                    } font-semibold`}
                  >
                    {emp.status}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Employee Profile */}
        {selectedEmployee && (
          <div className="bg-white p-6 shadow rounded-lg mt-6">
            <h2 className="text-xl font-semibold mb-4">Employee Profile</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-lg">
                  <span className="font-semibold">Name:</span> {selectedEmployee.name}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">Department:</span> {selectedEmployee.department}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">Role:</span> {selectedEmployee.role}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">Status:</span> {selectedEmployee.status}
                </p>
              </div>
              <div>
                <p className="text-lg">
                  <span className="font-semibold">Performance:</span> 82%
                </p>
                <p className="text-lg">
                  <span className="font-semibold">Attendance Rate:</span> 90%
                </p>
                <p className="text-lg">
                  <span className="font-semibold">Projects Assigned:</span> 5
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  export default Employee;
