import React from "react";

const SpinnerBar = () => {
  return (
    <div className="">
      <style>{`
.loader-bar {
  display: block;
  --height-of-loader-bar: 2px;
  --loader-bar-color: #0071e2;
  width: 65px;
  height: var(--height-of-loader-bar);
  border-radius: 15px;
  background-color: rgba(0,0,0,0.2);
  position: relative;
}

.loader-bar::before {
  content: "";
  position: absolute;
  background: var(--loader-bar-color);
  top: 0;
  left: 0;
  width: 0%;
  height: 100%;
  border-radius: 15px;
  animation: moving 1s ease-in-out infinite;
  ;
}

@keyframes moving {
  50% {
    width: 100%;
  }

  100% {
    width: 0;
    right: 0;
    left: unset;
  }
}
`}</style>

      <div className="loader-bar"></div>
    </div>
  );
};

export default SpinnerBar;
