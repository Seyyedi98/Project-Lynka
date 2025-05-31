import React from "react";

const SpinnerGaming = () => {
  return (
    <div className="">
      <style>{`
.loader-gaming {
  --path: #2f3545;
  --dot: #5628ee;
  --duration: 3s;
  width: 22px;
  height: 22px;
  position: relative;
}

.loader-gaming:before {
  content: "";
  width: 3px;
  height: 3px;
  border-radius: 50%;
  position: absolute;
  display: block;
  background: var(--dot);
  top: 18.5px;
  left: 9.5px;
  transform: translate(-9px, -9px);
  animation: dotRect var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86)
    infinite;
}

.loader-gaming svg {
  display: block;
  width: 100%;
  height: 100%;
}

.loader-gaming svg rect,
.loader-gaming svg polygon,
.loader-gaming svg circle {
  fill: none;
  stroke: var(--path);
  stroke-width: 5px;
  stroke-linejoin: round;
  stroke-linecap: round;
}

.loader-gaming svg polygon {
  stroke-dasharray: 72.5 38 72.5 38;
  stroke-dashoffset: 0;
  animation: pathTriangle var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86)
    infinite;
}

.loader-gaming svg rect {
  stroke-dasharray: 96 32 96 32;
  stroke-dashoffset: 0;
  animation: pathRect 3s cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
}

.loader-gaming svg circle {
  stroke-dasharray: 75 25 75 25;
  stroke-dashoffset: 37.5;
  animation: pathCircle var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86)
    infinite;
}

.loader-gaming.triangle {
  width: 24px;
}

.loader-gaming.triangle:before {
  left: 10.5px;
  transform: translate(-5px, -9px);
  animation: dotTriangle var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86)
    infinite;
}

@keyframes pathTriangle {
  33% {
    stroke-dashoffset: 37;
  }

  66% {
    stroke-dashoffset: 73.5;
  }

  100% {
    stroke-dashoffset: 110.5;
  }
}

@keyframes dotTriangle {
  33% {
    transform: translate(0, 0);
  }

  66% {
    transform: translate(5px, -9px);
  }

  100% {
    transform: translate(-5px, -9px);
  }
}

@keyframes pathRect {
  25% {
    stroke-dashoffset: 32;
  }

  50% {
    stroke-dashoffset: 64;
  }

  75% {
    stroke-dashoffset: 96;
  }

  100% {
    stroke-dashoffset: 128;
  }
}

@keyframes dotRect {
  25% {
    transform: translate(0, 0);
  }

  50% {
    transform: translate(9px, -9px);
  }

  75% {
    transform: translate(0, -18px);
  }

  100% {
    transform: translate(-9px, -9px);
  }
}

@keyframes pathCircle {
  25% {
    stroke-dashoffset: 62.5;
  }

  50% {
    stroke-dashoffset: 87.5;
  }

  75% {
    stroke-dashoffset: 112.5;
  }

  100% {
    stroke-dashoffset: 137.5;
  }
}

.loader-gaming {
  display: inline-block;
  margin: 0 8px;
}

`}</style>

      <div className="loader-gaming">
        <svg viewBox="0 0 80 80">
          <circle r="32" cy="40" cx="40" id="test"></circle>
        </svg>
      </div>

      <div className="loader-gaming triangle">
        <svg viewBox="0 0 86 80">
          <polygon points="43 8 79 72 7 72"></polygon>
        </svg>
      </div>

      <div className="loader-gaming">
        <svg viewBox="0 0 80 80">
          <rect height="64" width="64" y="8" x="8"></rect>
        </svg>
      </div>
    </div>
  );
};

export default SpinnerGaming;
