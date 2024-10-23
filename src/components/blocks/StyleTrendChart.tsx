"use client";

import React from "react";

// charts
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function StyleTrendChart({trendData}: {trendData: any}) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={trendData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="casual" stroke="#8884d8" activeDot={{r: 8}} />
        <Line type="monotone" dataKey="formal" stroke="#82ca9d" />
        <Line type="monotone" dataKey="sporty" stroke="#ffc658" />
      </LineChart>
    </ResponsiveContainer>
  );
}
