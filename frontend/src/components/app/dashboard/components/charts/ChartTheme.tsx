export const chartColors = {
  // Primary color palette for most charts
  primary: [
    "var(--color-p300)", // Main primary - vibrant purple/blue
    "var(--color-p100)", // Lighter primary
    "var(--color-p700)", // Darker primary
    "var(--color-p50)", // Very light primary
  ],
  // Secondary palette for complementary data
  secondary: [
    "var(--color-s300)", // Main secondary
    "var(--color-s100)", // Lighter secondary
    "var(--color-s500)", // Darker secondary
  ],
  // Accent colors for additional data points
  accent: [
    "var(--color-b300)", // Blue accent
    "var(--color-b100)", // Lighter blue
  ],
  // Status colors (directly mapped from your getStatusColor function)
  status: {
    outreached: "var(--color-b300)", // Blue
    "meeting scheduled": "var(--color-p300)", // Purple
    "offer sent": "var(--color-n300)", // Gray
    "in progress": "var(--color-s300)", // Secondary
    "loyal customer": "#4ade80", // Green (keeping consistent with your status colors)
    failed: "var(--color-w300)", // Warning/Red
    default: "var(--color-n100)", // Neutral
  } as Record<string, string>,
  // For financial charts (income/expense)
  financial: {
    income: "var(--color-p300)", // Income in primary color
    expense: "var(--color-w300)", // Expense in warning color
    neutral: "var(--color-n300)", // Neutral for reference lines
  },
  // Background and muted colors
  background: "hsl(var(--background))",
  muted: "var(--color-n30)",
  border: "var(--color-n40)",
  text: "var(--color-n800)",
  textMuted: "var(--color-n100)",
};

// Helper function to get color for status
export function getStatusColor(status: string): string {
  const normalizedStatus = status?.toLowerCase() || "default";
  return chartColors.status[normalizedStatus] ?? chartColors.status.default;
}

// Helper function to create consistent gradients for area charts
export function createGradient(color: string, id: string) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor={color} stopOpacity={0.3} />
      <stop offset="95%" stopColor={color} stopOpacity={0} />
    </linearGradient>
  );
}
