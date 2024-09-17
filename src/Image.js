import React from "react";

export default ({ url }) => {
  return (
    <img style={{ height: "200px", objectFit: "cover" }} src={url} alt="" />
  );
};
