import React from "react";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface QuarterChartProps {
  data: {
    quarter: number;
    userCount: number;
    ratio: number;
  }[];
}

const QuarterChartComponent: React.FC<QuarterChartProps> = ({ data }) => {
  return (
    <ComposedChart
      width={500}
      height={400}
      data={data}
      margin={{
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
      }}
    >
      <CartesianGrid stroke="#f5f5f5" />
      <XAxis dataKey="quarter" scale="band" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="userCount" barSize={20} fill="#413ea0" />
      <Line type="monotone" dataKey="ratio" stroke="#ff7300" />
    </ComposedChart>
  );
};
export default QuarterChartComponent;
