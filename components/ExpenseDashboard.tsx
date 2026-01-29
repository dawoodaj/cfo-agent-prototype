"use client";

import * as React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

type ExpenseDatum = {
  name: "Travel" | "Meals" | "Software";
  value: number;
  color: string;
};

const DEFAULT_DATA: ExpenseDatum[] = [
  { name: "Travel", value: 4200, color: "#7C3AED" }, // purple-600
  { name: "Meals", value: 1850, color: "#A78BFA" }, // purple-400
  { name: "Software", value: 2600, color: "#DDD6FE" }, // purple-200
];

function formatCurrency(amount: number) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount);
}

type ExpenseTooltipProps = {
  total: number;
  active?: boolean;
  payload?: Array<{ payload: ExpenseDatum }>;
};

function ExpenseTooltip({ active, payload, total }: ExpenseTooltipProps) {
  if (!active || !payload?.length) return null;
  const item = payload[0]?.payload;
  if (!item) return null;
  const pct = total > 0 ? Math.round((item.value / total) * 100) : 0;
  return (
    <div className="rounded-lg border border-purple-100 bg-white px-3 py-2 text-xs shadow-sm">
      <div className="flex items-center gap-2">
        <span
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: item.color }}
        />
        <span className="font-medium text-zinc-900">{item.name}</span>
      </div>
      <div className="mt-1 text-zinc-600">
        {formatCurrency(item.value)} · {pct}%
      </div>
    </div>
  );
}

export function ExpenseDashboard({ data }: { data?: ExpenseDatum[] }) {
  const chartData = data ?? DEFAULT_DATA;
  const total = chartData.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="relative h-[260px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={72}
              outerRadius={100}
              paddingAngle={2}
              stroke="rgba(0,0,0,0)"
            >
              {chartData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<ExpenseTooltip total={total} />} />
          </PieChart>
        </ResponsiveContainer>

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-xs font-medium text-zinc-600">Total expenses</p>
          <p className="text-2xl font-semibold tracking-tight text-zinc-950">
            {formatCurrency(total)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2">
        {chartData.map((d) => {
          const pct = total > 0 ? Math.round((d.value / total) * 100) : 0;
          return (
            <div
              key={d.name}
              className="flex items-center justify-between gap-3 rounded-lg border border-purple-100 px-3 py-2"
            >
              <div className="flex min-w-0 items-center gap-2">
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: d.color }}
                />
                <span className="truncate text-sm font-medium text-zinc-900">
                  {d.name}
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-semibold text-zinc-950">
                  {formatCurrency(d.value)}
                </span>
                <span className="text-xs text-zinc-600">{pct}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
