import React from "react";

const BB8 = () => {
  return (
    <span
      style={{
        position: "relative",
        animation: "flix 3s ease-in infinite alternate",
      }}
    >
      <span
        style={{
          content: '""',
          display: "block",
          fontSize: "0",
          width: "48px",
          height: "48px",
          backgroundColor: "#fff",
          backgroundImage:
            "radial-gradient(circle 12px at 22px 22px, #ff3d00 100%, transparent 0)," +
            "radial-gradient(circle 10px at 6px 40px, #ff3d00 100%, transparent 0)," +
            "radial-gradient(circle 14px at 31px -6px, #ff3d00 100%, transparent 0)," +
            "radial-gradient(circle 5px at 40px 30px, #ff3d00 100%, transparent 0)",
          borderRadius: "50%",
          animation: "rotate 1s linear infinite",
        }}
      ></span>
      <span
        style={{
          content: '""',
          position: "absolute",
          top: "0%",
          transform: "translate(-50%, -100%)",
          left: "50%",
          width: "24px",
          height: "12px",
          background: "#fff",
          borderRadius: "50px 50px 0 0",
        }}
      ></span>
      <style>
        {`
          @keyframes flix {
            0%, 60% {
              transform: rotate(-10deg);
            }
            100%, 30%, 80% {
              transform: rotate(5deg);
            }
          }
          @keyframes rotate {
            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </span>
  );
};

export default BB8;
