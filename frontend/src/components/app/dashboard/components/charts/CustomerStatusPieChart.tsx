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
import { getStatusColor, chartColors } from "./ChartTheme";

interface CustomerStatusPieChartProps {
  data: Array<{ name: string; count: number }>;
}

export function CustomerStatusPieChart({
  data,
}: Readonly<CustomerStatusPieChartProps>) {
  const totalCustomers = React.useMemo(() => {
    return data.reduce((acc, curr) => acc + curr.count, 0);
  }, [data]);

  // Create a chart config using our status colors
  const chartConfig = data.reduce((config, item) => {
    const statusName = item.name.toLowerCase();

    config[statusName] = {
      label: item.name,
      color: getStatusColor(statusName),
    };

    return config;
  }, {} as ChartConfig);

  return (
    <ChartContainer config={chartConfig} className="h-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Tooltip content={<ChartTooltipContent config={chartConfig} />} />
          <Pie
            data={data}
            dataKey="count"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={2}
            strokeWidth={2}
            stroke={chartColors.background}
          >
            {data.map((entry) => (
              <Cell
                key={entry.name}
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
                        {totalCustomers.toLocaleString()}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy ?? 0) + 20}
                        className="fill-muted-foreground text-xs"
                      >
                        Customers
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
