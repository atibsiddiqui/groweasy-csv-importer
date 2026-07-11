"use client";

interface DashboardCardsProps {
  totalRows: number;
  mappedFields: number;
  confidence: Record<string, number>;
}

export default function DashboardCards({
  totalRows,
  mappedFields,
  confidence,
}: DashboardCardsProps) {
  const averageConfidence = Math.round(
    Object.values(confidence).reduce((a, b) => a + b, 0) /
      Object.values(confidence).length
  );

  const cards = [
    {
      title: "Total Records",
      value: totalRows,
      color: "text-blue-400",
      icon: "📄",
    },
    {
      title: "Mapped Fields",
      value: mappedFields,
      color: "text-green-400",
      icon: "✅",
    },
    {
      title: "AI Confidence",
      value: `${averageConfidence}%`,
      color: "text-yellow-400",
      icon: "🤖",
    },
  ];

  return (
    <div className="mt-10 grid gap-6 md:grid-cols-3">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-lg transition hover:-translate-y-1 hover:border-blue-500"
        >
          <div className="text-4xl">{card.icon}</div>

          <h3 className="mt-4 text-lg font-semibold text-slate-300">
            {card.title}
          </h3>

          <p className={`mt-2 text-4xl font-bold ${card.color}`}>
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}