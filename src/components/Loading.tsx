import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center bg-#171717-50 mt-20">
      <div
        className="w-10 h-10 border-4  border-blue-500 border-t-transparent rounded-full animate-spin"
        aria-label="Loading spinner"
      ></div>
      <p className="ml-4 text-blue-500 text-sm font-medium">Loading...</p>
    </div>
  );
};

export default Loading;
