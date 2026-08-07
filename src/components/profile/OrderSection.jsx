"use client";

import { useState } from "react";

import OrderFilters from "./OrderFilters";
import OrdersList from "./OrdersList";

export default function OrdersSection() {
  const [activeFilter, setActiveFilter] = useState("all");

  const orders = [];

  const filteredOrders =
    activeFilter === "all"
      ? orders
      : orders.filter((order) => order.status === activeFilter);

  return (
    <section>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-900">سفارش‌های من</h1>

        <p className="mt-2 text-sm text-neutral-500">
          مشاهده و پیگیری سفارش‌های شما
        </p>
      </div>

      <OrderFilters
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      <OrdersList orders={filteredOrders} />
    </section>
  );
}
