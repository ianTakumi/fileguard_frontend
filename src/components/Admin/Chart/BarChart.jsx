import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const SubscriptionRevenueChart = () => {
  // Data with revenue in PHP for each subscription plan
  const data = [
    { month: "January", free: 0, pro: 32000, business: 54000 },
    { month: "February", free: 0, pro: 35000, business: 66000 },
    { month: "March", free: 0, pro: 38000, business: 75000 },
    { month: "April", free: 0, pro: 42000, business: 84000 },
    { month: "May", free: 0, pro: 45000, business: 96000 },
    { month: "June", free: 0, pro: 50000, business: 105000 },
    { month: "July", free: 0, pro: 48000, business: 114000 },
    { month: "August", free: 0, pro: 52000, business: 120000 },
    { month: "September", free: 0, pro: 55000, business: 126000 },
    { month: "October", free: 0, pro: 58000, business: 135000 },
    { month: "November", free: 0, pro: 62000, business: 144000 },
    { month: "December", free: 0, pro: 65000, business: 150000 },
  ];

  // Custom tooltip with PHP currency format
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const total = payload.reduce((sum, entry) => sum + (entry.value || 0), 0);

      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: "white",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <p
            className="label"
            style={{ margin: "0 0 5px 0", fontWeight: "bold" }}
          >{`${label}`}</p>
          {payload.map((entry, index) => (
            <p
              key={index}
              style={{
                margin: "2px 0",
                color: entry.color,
                fontSize: "14px",
              }}
            >
              {`${entry.name}: ₱${entry.value?.toLocaleString() || 0}`}
            </p>
          ))}
          <p
            style={{
              margin: "5px 0 0 0",
              fontWeight: "bold",
              borderTop: "1px solid #eee",
              paddingTop: "5px",
            }}
          >
            {`Total: ₱${total.toLocaleString()}`}
          </p>
        </div>
      );
    }
    return null;
  };

  // Format Y-axis ticks to show PHP currency
  const formatYAxis = (value) => `₱${value.toLocaleString()}`;

  return (
    <div className="chart-container" style={{ width: "100%", height: "400px" }}>
      <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
        Subscription Revenue (January - December)
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            angle={-45}
            textAnchor="end"
            height={80}
            interval={0}
            fontSize={12}
          />
          <YAxis
            tickFormatter={formatYAxis}
            label={{
              value: "Revenue (PHP)",
              angle: -90,
              position: "insideLeft",
              offset: -10,
              style: { textAnchor: "middle" },
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar
            dataKey="free"
            name="Free Plan"
            fill="#8884d8"
            radius={[2, 2, 0, 0]}
          />
          <Bar
            dataKey="pro"
            name="Pro Plan"
            fill="#82ca9d"
            radius={[2, 2, 0, 0]}
          />
          <Bar
            dataKey="business"
            name="Business Plan"
            fill="#ffc658"
            radius={[2, 2, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SubscriptionRevenueChart;
