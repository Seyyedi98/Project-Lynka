const PencilSpinner = () => {
  return (
    <div className="pencil-container">
      <style jsx>{`
        .pencil-container {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          margin-left: 20%;
          margin-top: 20%;
        }

        .pencil {
          display: block;
          width: 133.34px;
          height: 133.34px;
        }

        .pencil__body1,
        .pencil__body2,
        .pencil__body3,
        .pencil__eraser,
        .pencil__eraser-skew,
        .pencil__point,
        .pencil__rotate,
        .pencil__stroke {
          animation-duration: 3s;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        .pencil__body1,
        .pencil__body2,
        .pencil__body3 {
          transform: rotate(-90deg);
        }

        .pencil__body1 {
          animation-name: pencilBody1;
        }

        .pencil__body2 {
          animation-name: pencilBody2;
        }

        .pencil__body3 {
          animation-name: pencilBody3;
        }

        .pencil__eraser {
          animation-name: pencilEraser;
          transform: rotate(-90deg) translate(32.66px, 0);
        }

        .pencil__eraser-skew {
          animation-name: pencilEraserSkew;
          animation-timing-function: ease-in-out;
        }

        .pencil__point {
          animation-name: pencilPoint;
          transform: rotate(-90deg) translate(32.66px, -20px);
        }

        .pencil__rotate {
          animation-name: pencilRotate;
        }

        .pencil__stroke {
          animation-name: pencilStroke;
          transform: translate(66.66px, 66.66px) rotate(-113deg);
        }

        /* Animations */
        @keyframes pencilBody1 {
          from,
          to {
            stroke-dashoffset: 234.58;
            transform: rotate(-90deg);
          }

          50% {
            stroke-dashoffset: 100.54;
            transform: rotate(-225deg);
          }
        }

        @keyframes pencilBody2 {
          from,
          to {
            stroke-dashoffset: 271.22;
            transform: rotate(-90deg);
          }

          50% {
            stroke-dashoffset: 116.24;
            transform: rotate(-225deg);
          }
        }

        @keyframes pencilBody3 {
          from,
          to {
            stroke-dashoffset: 197.92;
            transform: rotate(-90deg);
          }

          50% {
            stroke-dashoffset: 84.82;
            transform: rotate(-225deg);
          }
        }

        @keyframes pencilEraser {
          from,
          to {
            transform: rotate(-45deg) translate(32.66px, 0);
          }

          50% {
            transform: rotate(0deg) translate(32.66px, 0);
          }
        }

        @keyframes pencilEraserSkew {
          from,
          32.5%,
          67.5%,
          to {
            transform: skewX(0);
          }

          35%,
          65% {
            transform: skewX(-4deg);
          }

          37.5%,
          62.5% {
            transform: skewX(8deg);
          }

          40%,
          45%,
          50%,
          55%,
          60% {
            transform: skewX(-15deg);
          }

          42.5%,
          47.5%,
          52.5%,
          57.5% {
            transform: skewX(15deg);
          }
        }

        @keyframes pencilPoint {
          from,
          to {
            transform: rotate(-90deg) translate(32.66px, -20px);
          }

          50% {
            transform: rotate(-225deg) translate(32.66px, -20px);
          }
        }

        @keyframes pencilRotate {
          from {
            transform: translate(66.66px, 66.66px) rotate(0);
          }

          to {
            transform: translate(66.66px, 66.66px) rotate(720deg);
          }
        }

        @keyframes pencilStroke {
          from {
            stroke-dashoffset: 293.22;
            transform: translate(66.66px, 66.66px) rotate(-113deg);
          }

          50% {
            stroke-dashoffset: 109.96;
            transform: translate(66.66px, 66.66px) rotate(-113deg);
          }

          75%,
          to {
            stroke-dashoffset: 293.22;
            transform: translate(66.66px, 66.66px) rotate(112deg);
          }
        }
      `}</style>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="133.34px"
        width="133.34px"
        viewBox="0 0 200 200"
        className="pencil"
      >
        <defs>
          <clipPath id="pencil-eraser">
            <rect height="20" width="20" ry="3.34" rx="3.34"></rect>
          </clipPath>
        </defs>
        <circle
          transform="rotate(-113,100,100)"
          strokeLinecap="round"
          strokeDashoffset="293.22"
          strokeDasharray="293.22 293.22"
          strokeWidth="1.34"
          stroke="currentColor"
          fill="none"
          r="46.66"
          className="pencil__stroke"
        ></circle>
        <g transform="translate(66.66,66.66)" className="pencil__rotate">
          <g fill="none">
            <circle
              transform="rotate(-90)"
              strokeDashoffset="268.08"
              strokeDasharray="268.08 268.08"
              strokeWidth="20"
              stroke="hsl(223,90%,50%)"
              r="42.66"
              className="pencil__body1"
            ></circle>
            <circle
              transform="rotate(-90)"
              strokeDashoffset="309.98"
              strokeDasharray="309.98 309.98"
              strokeWidth="6.66"
              stroke="hsl(223,90%,60%)"
              r="49.34"
              className="pencil__body2"
            ></circle>
            <circle
              transform="rotate(-90)"
              strokeDashoffset="226.2"
              strokeDasharray="226.2 226.2"
              strokeWidth="6.66"
              stroke="hsl(223,90%,40%)"
              r="36"
              className="pencil__body3"
            ></circle>
          </g>
          <g
            transform="rotate(-90) translate(32.66,0)"
            className="pencil__eraser"
          >
            <g className="pencil__eraser-skew">
              <rect
                height="20"
                width="20"
                ry="3.34"
                rx="3.34"
                fill="hsl(223,90%,70%)"
              ></rect>
              <rect
                clipPath="url(#pencil-eraser)"
                height="20"
                width="3.34"
                fill="hsl(223,90%,60%)"
              ></rect>
              <rect height="13.34" width="20" fill="hsl(223,10%,90%)"></rect>
              <rect height="13.34" width="10" fill="hsl(223,10%,70%)"></rect>
              <rect height="13.34" width="3.34" fill="hsl(223,10%,80%)"></rect>
              <rect
                height="1.34"
                width="20"
                y="4"
                fill="hsla(223,10%,10%,0.2)"
              ></rect>
              <rect
                height="1.34"
                width="20"
                y="8.66"
                fill="hsla(223,10%,10%,0.2)"
              ></rect>
            </g>
          </g>
          <g
            transform="rotate(-90) translate(32.66,-20)"
            className="pencil__point"
          >
            <polygon points="10 0,20 20,0 20" fill="hsl(33,90%,70%)"></polygon>
            <polygon points="10 0,4 20,0 20" fill="hsl(33,90%,50%)"></polygon>
            <polygon
              points="10 0,13.34 6.66,6.66 6.66"
              fill="hsl(223,10%,10%)"
            ></polygon>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default PencilSpinner;
