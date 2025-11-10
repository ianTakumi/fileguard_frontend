import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const CustomPieChart = ({ fileTypes = {} }) => {
  // Convert fileTypes object to array format for Recharts
  const processFileData = () => {
    if (
      fileTypes &&
      typeof fileTypes === "object" &&
      Object.keys(fileTypes).length > 0
    ) {
      return Object.entries(fileTypes).map(([name, value]) => ({
        name: name.toUpperCase(), // Convert to uppercase for better display
        value: value,
        count: value,
      }));
    }
    return [];
  };

  const data = processFileData();

  // Colors for the pie chart segments
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884D8",
    "#82CA9D",
  ];

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-300 rounded shadow-lg">
          <p className="font-semibold">{`${payload[0].name}`}</p>
          <p className="text-blue-600">{`Files: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  // Custom label formatter
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    if (percent < 0.1) return null; // Don't show label for very small segments

    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="flex justify-center items-center">
      <div className="p-4 rounded-lg w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Top Uploaded File Types
        </h2>

        {data.length === 0 ? (
          <div className="h-64 flex items-center justify-center text-gray-500">
            No file data available
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                layout="vertical"
                verticalAlign="middle"
                align="right"
                formatter={(value, entry) => (
                  <span style={{ color: entry.color, fontSize: "12px" }}>
                    {value}: {entry.payload.count} files
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        )}

        <div className="mt-4 text-center text-sm text-gray-600">
          Total File Types: {data.length}
        </div>
      </div>
    </div>
  );
};

export default CustomPieChart;
