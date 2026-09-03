import OrderDetailsClient from "@/components/dashboard/orders/OrderDetailsClient";

const order = {
  id: 1001,

  status: "processing",

  createdAt: "۱۴۰۵/۰۶/۰۸",

  customer: {
    name: "علی رضایی",
    phone: "۰۹۱۲۱۲۳۴۵۶۷",
    email: "ali@example.com",
  },

  address: {
    province: "اصفهان",
    city: "اصفهان",
    postalCode: "۸۱۳۴۵۶۷۸۹۰",
    address: "اصفهان، خیابان چهارباغ بالا، کوچه نمونه، پلاک ۱۲",
  },

  items: [
    {
      id: 1,
      name: "شلوار جین مردانه",
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d",
      color: "آبی",
      size: "L",
      price: 1250000,
      quantity: 1,
    },

    {
      id: 2,
      name: "پیراهن تابستانی",
      image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273",
      color: "سفید",
      size: "M",
      price: 600000,
      quantity: 2,
    },
  ],

  shipping: 50000,

  discount: 100000,
};

export default function OrderDetailsPage() {
  return <OrderDetailsClient order={order} />;
}
