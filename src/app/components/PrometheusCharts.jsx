"use client";

import { useEffect, useState } from "react";
import PrometheusHelper from "@/lib/PrometheusHelper";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const prom = new PrometheusHelper();

export default function PrometheusCharts() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const end = Math.floor(Date.now() / 1000);
      const start = end - 3600; // last 1 hour
      const res = await prom.rangeQuery("node_cpu_seconds_total", start, end, "60s");

      if (res.result.length > 0) {
        const values = res.result[0].values.map(([timestamp, value]) => ({
          time: new Date(timestamp * 1000).toLocaleTimeString(),
          value: parseFloat(value),
        }));
        setData(values);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-lg font-bold mb-4">CPU Usage (from Prometheus)</h2>
      <LineChart width={600} height={300} data={data}>
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#3b82f6" />
      </LineChart>
    </div>
  );
}
