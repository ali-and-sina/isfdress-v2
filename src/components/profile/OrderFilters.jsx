"use client";

const filters = [
  {
    value: "all",
    label: "همه",
  },
  {
    value: "processing",
    label: "جاری",
  },
  {
    value: "delivered",
    label: "تحویل شده",
  },
  {
    value: "cancelled",
    label: "لغو شده",
  },
];

export default function OrderFilters({ activeFilter, onFilterChange }) {
  return (
    <div className="mb-6 flex gap-2 overflow-x-auto border-b border-neutral-200">
      {filters.map((filter) => (
        <button
          key={filter.value}
          type="button"
          onClick={() => onFilterChange(filter.value)}
          className={`whitespace-nowrap border-b-2 px-3 pb-3 text-sm cursor-pointer ${
            activeFilter === filter.value
              ? "border-orange-500 text-orange-600"
              : "border-transparent text-neutral-500"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
