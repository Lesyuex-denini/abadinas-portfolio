"use client";

interface FloralStickerProps {
  type?: "rose" | "daisy" | "pansy" | "butterfly" | "ribbon" | "star" | "leaf";
  size?: number;
  className?: string;
}

export default function FloralSticker({
  type = "rose",
  size = 80,
  className = "",
}: FloralStickerProps) {
  const shared = {
    width: size,
    height: size,
  };

  switch (type) {
    case "daisy":
      return (
        <svg
          viewBox="0 0 80 80"
          className={className}
          style={shared}
          fill="none"
        >
          {[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((a) => (
            <ellipse
              key={a}
              cx="40"
              cy="22"
              rx="5"
              ry="15"
              fill="#FFFaf5"
              opacity="0.92"
              transform={`rotate(${a} 40 40)`}
            />
          ))}
          <circle cx="40" cy="40" r="11" fill="#f5d67a" />
          <circle cx="40" cy="40" r="7" fill="#e8be50" />
        </svg>
      );

    case "pansy":
      return (
        <svg
          viewBox="0 0 80 80"
          className={className}
          style={shared}
          fill="none"
        >
          <ellipse
            cx="40"
            cy="20"
            rx="14"
            ry="18"
            fill="#b97d7b"
            opacity="0.75"
          />
          <ellipse
            cx="40"
            cy="20"
            rx="14"
            ry="18"
            fill="#928e5e"
            opacity="0.6"
            transform="rotate(72 40 40)"
          />
          <ellipse
            cx="40"
            cy="20"
            rx="14"
            ry="18"
            fill="#ecc4c3"
            opacity="0.7"
            transform="rotate(144 40 40)"
          />
          <ellipse
            cx="40"
            cy="20"
            rx="14"
            ry="18"
            fill="#ecc4c3"
            opacity="0.7"
            transform="rotate(216 40 40)"
          />
          <ellipse
            cx="40"
            cy="20"
            rx="14"
            ry="18"
            fill="#b97d7b"
            opacity="0.75"
            transform="rotate(288 40 40)"
          />
          <circle cx="40" cy="40" r="6" fill="#fffaf5" />
          <circle cx="40" cy="40" r="3" fill="#575527" opacity="0.5" />
        </svg>
      );

    case "butterfly":
      return (
        <svg
          viewBox="0 0 80 60"
          className={className}
          style={{
            width: size * 1.2,
            height: size * 0.9,
          }}
          fill="none"
        >
          <ellipse cx="20" cy="22" rx="18" ry="20" fill="#ecc4c3" />
          <ellipse cx="60" cy="22" rx="18" ry="20" fill="#ecc4c3" />
          <ellipse
            cx="22"
            cy="38"
            rx="12"
            ry="10"
            fill="#b97d7b"
            opacity="0.7"
          />
          <ellipse
            cx="58"
            cy="38"
            rx="12"
            ry="10"
            fill="#b97d7b"
            opacity="0.7"
          />
        </svg>
      );

    case "ribbon":
      return (
        <svg
          viewBox="0 0 60 80"
          className={className}
          style={{
            width: size * 0.8,
            height: size,
          }}
          fill="none"
        >
          <path
            d="M30 30 C10 20, 5 5, 15 3 C25 1, 30 18, 30 25 C30 18, 35 1, 45 3 C55 5, 50 20, 30 30Z"
            fill="#ecc4c3"
          />
          <circle cx="30" cy="30" r="4" fill="#b97d7b" />
          <path
            d="M28 34 L22 70 M32 34 L38 70"
            stroke="#ecc4c3"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      );

    case "star":
      return (
        <svg
          viewBox="0 0 60 60"
          className={className}
          style={{
            width: size * 0.7,
            height: size * 0.7,
          }}
          fill="none"
        >
          <polygon
            points="30,4 36,22 54,22 40,34 45,52 30,41 15,52 20,34 6,22 24,22"
            fill="#ecc4c3"
          />
        </svg>
      );

    case "leaf":
      return (
        <svg
          viewBox="0 0 60 80"
          className={className}
          style={{
            width: size * 0.7,
            height: size,
          }}
          fill="none"
        >
          <path
            d="M30 70 C30 70, 5 50, 8 25 C10 10, 25 5, 30 5 C35 5, 50 10, 52 25 C55 50, 30 70, 30 70Z"
            fill="#928e5e"
            opacity="0.55"
          />
        </svg>
      );

    default:
      return (
        <svg
          viewBox="0 0 80 80"
          className={className}
          style={shared}
          fill="none"
        >
          <circle cx="40" cy="40" r="12" fill="#ecc4c3" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
            <ellipse
              key={a}
              cx="40"
              cy="22"
              rx="9"
              ry="13"
              fill="#ecc4c3"
              opacity="0.7"
              transform={`rotate(${a} 40 40)`}
            />
          ))}
          <circle cx="40" cy="40" r="7" fill="#fffaf5" />
        </svg>
      );
  }
}
