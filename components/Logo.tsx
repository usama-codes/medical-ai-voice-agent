import React from "react";

interface LogoProps {
  className?: string;
  textSize?: "sm" | "md" | "lg" | "xl";
}

const Logo: React.FC<LogoProps> = ({ className = "", textSize = "md" }) => {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-base md:text-xl",
    lg: "text-xl md:text-2xl",
    xl: "text-2xl md:text-3xl",
  };

  const iconSizes = {
    sm: "w-6 h-6",
    md: "w-7 h-7 md:w-8 md:h-8",
    lg: "w-8 h-8 md:w-10 md:h-10",
    xl: "w-10 h-10 md:w-12 md:h-12",
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Medical Shield Icon */}
      <div className={`${iconSizes[textSize]} flex-shrink-0`}>
        <svg
          viewBox="0 0 512 512"
          fill="currentColor"
          className="w-full h-full text-primary transition-colors"
          aria-hidden="true"
        >
          <path d="M256 48c-55.8 0-112.2 25.6-162.2 65.2-12.8 10.1-20.8 25.6-20.8 42.4V256c0 88.4 35.2 168.8 92.8 227.2 28.8 29.2 60.8 44.8 90.2 44.8s61.4-15.6 90.2-44.8C403.8 424.8 439 344.4 439 256V155.6c0-16.8-8-32.3-20.8-42.4C368.2 73.6 311.8 48 256 48zm0 48c45.2 0 90.8 20.8 132.8 53.6 8 6.2 12.2 15.6 12.2 25.6V256c0 74.4-29.6 142.4-78.4 192-24.4 24.8-50.4 36-66.6 36s-42.2-11.2-66.6-36C140.6 398.4 111 330.4 111 256V175.2c0-10 4.2-19.4 12.2-25.6C165.2 116.8 210.8 96 256 96z" />
          <path d="M256 128c-38.4 0-77.6 17.6-112.8 45.6-7.2 5.6-11.2 14.4-11.2 23.2V256c0 64 25.6 122.4 67.2 164.8 20.8 21.2 43.2 31.2 56.8 31.2s36-10 56.8-31.2C354.4 378.4 380 320 380 256V196.8c0-8.8-4-17.6-11.2-23.2C333.6 145.6 294.4 128 256 128z" />
          {/* Medical Cross */}
          <path
            d="M288 192h-64v-32c0-8.8-7.2-16-16-16s-16 7.2-16 16v32h-32c-8.8 0-16 7.2-16 16s7.2 16 16 16h32v64h-32c-8.8 0-16 7.2-16 16s7.2 16 16 16h32v32c0 8.8 7.2 16 16 16s16-7.2 16-16v-32h64c8.8 0 16-7.2 16-16s-7.2-16-16-16h-64v-64h64c8.8 0 16-7.2 16-16s-7.2-16-16-16z"
            className="fill-primary-foreground"
          />
        </svg>
      </div>

      {/* MediAssist Text */}
      <div className="flex flex-col">
        <h1
          className={`font-bold text-foreground leading-tight transition-colors ${sizeClasses[textSize]}`}
        >
          <span className="text-primary">Medi</span>
          <span>Assist</span>
        </h1>
        {textSize === "lg" || textSize === "xl" ? (
          <span className="text-xs text-muted-foreground -mt-1">
            AI Medical Assistant
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default Logo;
