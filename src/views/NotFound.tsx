import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center px-4 h-full">
      <div className="relative">
        <div className="absolute -top-8 left-1/2 -translate-x-1/2">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <circle
              cx="40"
              cy="40"
              r="38"
              stroke="#3B82F6"
              strokeWidth="4"
              fill="#EFF6FF"
            />
            <text
              x="50%"
              y="54%"
              textAnchor="middle"
              fill="#3B82F6"
              fontSize="36"
              fontWeight="bold"
              dy=".3em"
            >
              404
            </text>
          </svg>
        </div>
        <div className="bg-white rounded-xl shadow-xl pt-20 pb-10 px-8 max-w-md mx-auto">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-700 mb-2">
            Səhifə tapılmadı
          </h1>
          <p className="text-base sm:text-lg text-gray-600 mb-6">
            Üzr istəyirik, axtardığınız səhifə mövcud deyil və ya silinib.
            <br />
            <span className="text-blue-400">Kod: 404</span>
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold rounded-lg shadow hover:from-blue-700 hover:to-blue-500 transition-all duration-200"
          >
            Əsas səhifəyə qayıt
          </Link>
        </div>
      </div>
      <div className="mt-10 opacity-60">
        <svg width="120" height="24" viewBox="0 0 120 24" fill="none">
          <ellipse
            cx="60"
            cy="12"
            rx="60"
            ry="12"
            fill="#3B82F6"
            fillOpacity="0.08"
          />
        </svg>
      </div>
    </div>
  );
};

export default NotFound;
