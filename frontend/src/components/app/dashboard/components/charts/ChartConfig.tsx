import * as React from "react";

export interface ChartConfig {
  [key: string]: {
    label: string;
    color?: string;
  };
}

interface ChartContainerProps {
  config: ChartConfig;
  children: React.ReactNode;
  className?: string;
}

export function ChartContainer({
  config,
  children,
  className,
}: Readonly<ChartContainerProps>) {
  return (
    <div className={className} style={getChartColors(config)}>
      {children}
    </div>
  );
}

function getChartColors(config: ChartConfig) {
  const style: Record<string, string> = {};

  Object.entries(config).forEach(([key, value]) => {
    if (value.color) {
      style[`--color-${key}`] = value.color;
    }
  });

  return style;
}

export interface ChartTooltipContentProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    payload: {
      [key: string]: any;
    };
  }>;
  label?: string;
  config?: ChartConfig;
  hideLabel?: boolean;
}

export function ChartTooltipContent({
  active,
  payload,
  label,
  config,
  hideLabel = false,
}: Readonly<ChartTooltipContentProps>) {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      {!hideLabel && label && (
        <p className="mb-1 text-sm font-medium">{label}</p>
      )}
      <div className="flex flex-col gap-0.5">
        {payload.map((item, index) => {
          const configKey = item.name?.toLowerCase();
          const configLabel = config?.[configKey]?.label ?? item.name;
          const color = config?.[configKey]?.color ?? "var(--chart-1)";

          return (
            <div key={index} className="flex items-center gap-2">
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span className="text-xs text-muted-foreground">
                {configLabel}:
              </span>
              <span className="text-xs font-medium">
                {typeof item.value === "number"
                  ? item.value.toLocaleString()
                  : item.value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
