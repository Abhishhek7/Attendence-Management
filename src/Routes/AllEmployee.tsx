import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Users, Briefcase } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from "recharts";
import React from "react";

// Define types for Employee Data
interface Employee {
  id: number;
  name: string;
  department: string;
  retention: number;
  nps: number;
  turnover: number;
}

// Employee Data
const employees: Employee[] = [
  { id: 1, name: "Ramesh Khan", department: "Engineering", retention: 85, nps: 72, turnover: 10 },
  { id: 2, name: "Junior Yadav", department: "HR", retention: 78, nps: 60, turnover: 15 },
  { id: 3, name: "Michael Patel", department: "Finance", retention: 90, nps: 80, turnover: 5 },
];

// Employee Distribution by Gender & Experience
const genderExperienceData = [
  { name: "Male", value: 60 },
  { name: "Female", value: 35 },
  { name: "Others", value: 5 },
];

// Employee Distribution by Age Group
const ageGroupData = [
  { name: "20-30", employees: 40 },
  { name: "30-40", employees: 35 },
  { name: "40-50", employees: 15 },
  { name: "50+", employees: 10 },
];

// Colors for Pie Chart
const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const AllEmployee = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee>(employees[0]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">All Employee Dashboard</h1>

      {/* Departments & Employees Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <StatCard title="Total Departments" value="5" icon={<Briefcase className="text-green-500 w-10 h-10" />} />
        <StatCard title="Total Employees" value="50" icon={<Users className="text-blue-500 w-10 h-10" />} />
      </div>

      {/* Circular Gauge Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <CircularGauge title="Employee Retention" value={selectedEmployee.retention} color="#4CAF50" meterColor="#C8E6C9" />
        <CircularGauge title="Net Promoter Score" value={selectedEmployee.nps} color="#3B82F6" meterColor="#BBDEFB" />
        <CircularGauge title="Employee Turnover" value={selectedEmployee.turnover} color="#FF9800" meterColor="#FFE0B2" />
      </div>

      {/* Graphs Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Employee Distribution by Gender & Experience */}
        <Card>
          <CardContent>
            <h3 className="text-lg font-semibold mb-4">Employee Distribution by Gender & Experience</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={genderExperienceData} cx="50%" cy="50%" outerRadius={80} dataKey="value">
                  {genderExperienceData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Employee Distribution by Age Group */}
        <Card>
          <CardContent>
            <h3 className="text-lg font-semibold mb-4">Employee Distribution by Age Group</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={ageGroupData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="employees" fill="#4CAF50" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Employee Table */}
      <div className="bg-white p-4 shadow rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Employee Details</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Department</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id} className="hover:bg-gray-100 cursor-pointer" onClick={() => setSelectedEmployee(emp)}>
                <td className="border p-2 text-center">{emp.id}</td>
                <td className="border p-2">{emp.name}</td>
                <td className="border p-2">{emp.department}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Define Props Type for StatCard
interface StatCardProps {
  title: string;
  value: string;
  icon: JSX.Element;
}

// Stat Card Component
const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => (
  <Card className="p-4 flex items-center gap-4">
    {icon}
    <CardContent>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </CardContent>
  </Card>
);

// Define Props Type for CircularGauge
interface CircularGaugeProps {
  title: string;
  value: number;
  color: string;
  meterColor: string;
}

// Circular Gauge Component
const CircularGauge: React.FC<CircularGaugeProps> = ({ title, value, color, meterColor }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 40;
    const startAngle = -Math.PI / 2;
    const endAngle = startAngle + (value / 100) * 2 * Math.PI;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Meter Scale
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = meterColor;
    ctx.lineWidth = 10;
    ctx.stroke();

    // Progress Arc
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.strokeStyle = color;
    ctx.lineWidth = 10;
    ctx.lineCap = "round";
    ctx.stroke();

    // Percentage Text in the Center
    ctx.font = "bold 16px Arial";
    ctx.fillStyle = "#333";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`${value}%`, centerX, centerY);
  }, [value]);

  return (
    <div className="p-4 bg-white shadow rounded-lg flex flex-col items-center">
      <canvas ref={canvasRef} width={100} height={100} />
      <p className="mt-2 text-lg font-semibold">{title}</p>
    </div>
  );
};

export default AllEmployee;
