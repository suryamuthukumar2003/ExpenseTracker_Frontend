import React from "react";

export default function Image({ path, size = 200 }) {
  return <img src={path} style={{ height: `${size}px`, width: `${size}px` }} />;
}
