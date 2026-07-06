// components/ProductReviews.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { reviews } from "@/data/reviews";
import { formatNumber, formatPrice } from "@/lib/products";

function relativeDate(dateStr) {
  const [y, m, d] = dateStr.split("/").map(Number);
  const then = new Date(y, m - 1, d);
  const now = new Date();
  const diffDays = Math.floor((now - then) / (1000 * 60 * 60 * 24));
  if (diffDays < 1) return "امروز";
  if (diffDays < 7) return `${diffDays} روز پیش`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} هفته پیش`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} ماه پیش`;
  return dateStr;
}

export default function ProductReviews({ isLoggedIn = false }) {
  const router = useRouter();
  const [sortBy, setSortBy] = useState("newest");
  const [expanded, setExpanded] = useState(false);
  const [userVotes, setUserVotes] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("reviewVotes");
      return stored ? JSON.parse(stored) : {};
    }
    return {};
  });

  const totalReviews = reviews.length;
  const averageRating =
    reviews.map((review) => review.rating).reduce((acc, cur) => acc + cur, 0) /
    reviews.length;
  const ratingBreakdown = reviews.reduce(
    (acc, review) => {
      acc[review.rating] = (acc[review.rating] || 0) + 1;
      return acc;
    },
    { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("reviewVotes");
      if (stored) setUserVotes(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("reviewVotes", JSON.stringify(userVotes));
    }
  }, [userVotes]);

  function handleVote(reviewId, type) {
    setUserVotes((prev) => {
      const currentVote = prev[reviewId];
      if (currentVote === type) {
        const newVotes = { ...prev };
        delete newVotes[reviewId];
        return newVotes;
      }
      return { ...prev, [reviewId]: type };
    });
  }

  function handleWriteReview() {
    if (!isLoggedIn) {
      router.push("/auth/login");
    } else {
      alert("باز کردن فرم ثبت نظر");
    }
  }

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === "newest") return new Date(b.date) - new Date(a.date);
    if (sortBy === "helpful")
      return b.likes - b.dislikes - (a.likes - a.dislikes);
    if (sortBy === "highest") return b.rating - a.rating;
    if (sortBy === "lowest") return a.rating - b.rating;
    return 0;
  });

  const displayedReviews = expanded ? sortedReviews : sortedReviews.slice(0, 3);

  return (
    <section className="mt-16 border-t border-[#f0e0d0] pt-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h2 className="text-2xl md:text-3xl font-light text-neutral-700 mb-2">
            نظرات کاربران
          </h2>
          <p className="text-sm text-neutral-400 font-light">
            {formatNumber(totalReviews)} نظر ثبت شده
          </p>
        </div>
        <button
          onClick={handleWriteReview}
          className="px-6 py-3 bg-[#e8c4a8] text-white rounded-xl hover:bg-[#d4a98a] transition-colors duration-300 text-sm font-medium cursor-pointer w-fit"
        >
          ثبت نظر جدید
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-[#fdf6f0] rounded-2xl p-6 md:p-8 sticky top-24">
            <div className="text-center mb-6">
              <span className="text-5xl font-light text-neutral-800">
                {formatNumber(averageRating)}
              </span>
              <span className="text-2xl text-neutral-400 font-light">/۵</span>
              <div className="flex justify-center items-center gap-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(averageRating) ? "text-[#e8c4a8]" : "text-neutral-200"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            <div className="space-y-2.5">
              {Object.keys(ratingBreakdown)
                .reverse()
                .map((star) => (
                  <div key={star} className="flex items-center gap-3">
                    <span className="text-xs text-neutral-500 w-4 text-right">
                      {star}
                    </span>
                    <svg
                      className="w-3.5 h-3.5 text-[#e8c4a8] shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <div className="flex-1 h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#e8c4a8] rounded-full transition-all duration-500"
                        style={{
                          width: `${(ratingBreakdown[star] / totalReviews) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-xs text-neutral-400 w-8 text-left">
                      {ratingBreakdown[star]}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="text-sm text-neutral-500 font-light">
              مرتب‌سازی:
            </span>
            {[
              { key: "newest", label: "جدیدترین" },
              { key: "helpful", label: "مفیدترین" },
              { key: "highest", label: "بالاترین امتیاز" },
            ].map((opt) => (
              <button
                key={opt.key}
                onClick={() => setSortBy(opt.key)}
                className={`text-sm px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  sortBy === opt.key
                    ? "bg-[#fdf6f0] text-neutral-800"
                    : "text-neutral-400 hover:text-neutral-600 hover:bg-[#fdf6f0]/50"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {displayedReviews.map((review) => {
            const currentVote = userVotes[review.id];
            const likeCount = review.likes + (currentVote === "like" ? 1 : 0);
            const dislikeCount =
              review.dislikes + (currentVote === "dislike" ? 1 : 0);

            return (
              <div
                key={review.id}
                className="bg-[#fdf6f0] rounded-2xl p-6 md:p-8 hover:shadow-lg hover:shadow-[#e8d5c4]/10 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden bg-[#e8d5c4] shrink-0">
                    <svg
                      className="absolute inset-0 w-full h-full text-neutral-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v1.2c0 .66.54 1.2 1.2 1.2h16.8c.66 0 1.2-.54 1.2-1.2v-1.2c0-3.2-6.4-4.8-9.6-4.8z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h4 className="text-sm font-medium text-neutral-700">
                        {review.name}
                      </h4>
                      <span className="text-xs text-neutral-300">•</span>
                      <span className="text-xs text-neutral-400 font-light">
                        {relativeDate(review.date)}
                      </span>
                    </div>
                    <div className="flex items-center gap-0.5 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-3.5 h-3.5 ${i < review.rating ? "text-[#e8c4a8]" : "text-neutral-200"}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-sm text-neutral-500 font-light leading-relaxed">
                      {review.comment}
                    </p>

                    <div className="flex items-center gap-4 mt-4 pt-3 border-t border-neutral-100">
                      <button
                        onClick={() => handleVote(review.id, "like")}
                        className={`flex items-center gap-1.5 text-xs transition-colors cursor-pointer ${
                          currentVote === "like"
                            ? "text-emerald-500"
                            : currentVote === "dislike"
                              ? "text-neutral-300 hover:text-neutral-500"
                              : "text-neutral-400 hover:text-neutral-600"
                        }`}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                          />
                        </svg>
                        <span>مفید بود ({likeCount})</span>
                      </button>
                      <button
                        onClick={() => handleVote(review.id, "dislike")}
                        className={`flex items-center gap-1.5 text-xs transition-colors cursor-pointer ${
                          currentVote === "dislike"
                            ? "text-rose-400"
                            : currentVote === "like"
                              ? "text-neutral-300 hover:text-neutral-500"
                              : "text-neutral-400 hover:text-neutral-600"
                        }`}
                      >
                        <svg
                          className="w-4 h-4 rotate-180"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                          />
                        </svg>
                        <span>مفید نبود ({dislikeCount})</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {reviews.length > 3 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="w-full py-3 text-sm text-neutral-500 hover:text-neutral-700 border border-neutral-200 hover:border-[#e8c4a8] rounded-xl transition-all duration-300 cursor-pointer"
            >
              {expanded ? "بستن نظرات" : `مشاهده همه ${reviews.length} نظر`}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
