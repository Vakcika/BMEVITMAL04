import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
  Label,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
} from "./ChartConfig";
import * as React from "react";
import { chartColors } from "./ChartTheme";

interface CompanyBalancePieChartProps {
  data: Record<string, number>;
}

export function CompanyBalancePieChart({
  data,
}: Readonly<CompanyBalancePieChartProps>) {
  const pieData = Object.entries(data).map(([currency, amount]) => ({
    name: currency,
    value: amount,
  }));

  const totalBalance = React.useMemo(() => {
    return pieData.reduce((acc, curr) => acc + curr.value, 0);
  }, [pieData]);

  // Create a chart config using our custom color palette
  const chartConfig = pieData.reduce((config, item, index) => {
    // Cycle through the primary and accent color arrays
    const allColors = [
      ...chartColors.primary,
      ...chartColors.accent,
      ...chartColors.secondary,
    ];

    config[item.name.toLowerCase()] = {
      label: item.name,
      color: allColors[index % allColors.length],
    };

    return config;
  }, {} as ChartConfig);

  return (
    <ChartContainer config={chartConfig} className="h-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Tooltip content={<ChartTooltipContent config={chartConfig} />} />
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={2}
            strokeWidth={2}
            stroke={chartColors.background}
          >
            {pieData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={chartConfig[entry.name.toLowerCase()]?.color}
              />
            ))}
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-lg font-bold"
                      >
                        {totalBalance.toLocaleString()}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 20}
                        className="fill-muted-foreground text-xs"
                      >
                        Total
                      </tspan>
                    </text>
                  );
                }
                return null;
              }}
            />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
