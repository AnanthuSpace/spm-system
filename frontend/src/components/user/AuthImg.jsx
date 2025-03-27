import React, { memo } from "react";

const AuthImg = ({ src = "/signup.jpg", alt = "Auth" }) => {
  return (
    <div className="hidden md:flex w-1/2 h-full">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default memo(AuthImg);
