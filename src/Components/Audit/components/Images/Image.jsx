import React from "react";

const Image = ({ src, alt, title = "image" }) => {
  return <img src={src} alt={alt} title={title} />;
};

export default Image;
