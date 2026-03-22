
import React from "react";

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: AvatarSize;
  isOnline?: boolean;
  className?: string;
  onClick?: () => void;
}

const sizeMap: Record<AvatarSize, { img: string; dot: string }> = {
  xs: { img: "w-6 h-6",   dot: "w-1.5 h-1.5" },
  sm: { img: "w-8 h-8",   dot: "w-2 h-2" },
  md: { img: "w-10 h-10", dot: "w-2.5 h-2.5" },
  lg: { img: "w-14 h-14", dot: "w-3 h-3" },
  xl: { img: "w-20 h-20", dot: "w-3.5 h-3.5" },
};

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = "User avatar",
  size = "md",
  isOnline,
  className = "",
  onClick,
}) => {
  const { img, dot } = sizeMap[size];

  return (
    <div
      className={`relative inline-block shrink-0 ${onClick ? "cursor-pointer" : ""} ${className}`}
      onClick={onClick}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className={`${img} rounded-full object-cover ring-2 ring-white`}
        />
      ) : (
        <div className={`${img} rounded-full bg-blue-100 flex items-center justify-center ring-2 ring-white`}>
          <span className="text-blue-600 font-semibold text-xs">
            {alt?.charAt(0).toUpperCase()}
          </span>
        </div>
      )}
      {isOnline !== undefined && (
        <span
          className={`absolute bottom-0 right-0 ${dot} rounded-full border-2 border-white ${
            isOnline ? "bg-green-400" : "bg-gray-300"
          }`}
        />
      )}
    </div>
  );
};

export default Avatar;