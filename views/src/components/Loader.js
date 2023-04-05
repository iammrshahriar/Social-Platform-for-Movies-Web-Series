import React from "react";

const Loader = (props) => {
  const { count } = props;

  return (
    <>
      {[...Array(count)].map((_, index) => (
        <div
          key={index}
          className="movie bg-slate-800 rounded h-72 animate-pulse col-span-1"
        ></div>
      ))}
    </>
  );
};

export default Loader;
