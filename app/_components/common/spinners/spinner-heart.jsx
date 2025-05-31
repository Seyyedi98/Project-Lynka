import React from "react";

const SpinnerHeart = () => {
  return (
    <div className="">
      <style>{`
.loader-container {
  transform: translate(-50%, -50%);
}

.loader-container .preloader {
  animation: rotate 2.3s cubic-bezier(0.75, 0, 0.5, 1) infinite;
}

@keyframes rotate {
  50% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(720deg);
  }
}

.preloader span {
  --c: #3f9bf2;
  position: absolute;
  display: block;
  height: 21.33px;
  width: 21.33px;
  background: var(--c);
  border: 0.33px solid var(--c);
  border-radius: 100%;
}

.preloader span:nth-child(1) {
  transform: translate(-9.33px, -9.33px);
  animation: shape_1 2.3s cubic-bezier(0.75, 0, 0.5, 1) infinite;
}

@keyframes shape_1 {
  60% {
    transform: scale(0.4);
  }
}

.preloader span:nth-child(2) {
  transform: translate(9.33px, -9.33px);
  animation: shape_2 2.3s cubic-bezier(0.75, 0, 0.5, 1) infinite;
}

@keyframes shape_2 {
  40% {
    transform: scale(0.4);
  }
}

.preloader span:nth-child(3) {
  position: relative;
  border-radius: 0px;
  transform: scale(0.98) rotate(-45deg);
  animation: shape_3 2.3s cubic-bezier(0.75, 0, 0.5, 1) infinite;
}

@keyframes shape_3 {
  50% {
    border-radius: 100%;
    transform: scale(0.5) rotate(-45deg);
  }
  100% {
    transform: scale(0.98) rotate(-45deg);
  }
}

.hear-loader-shadow {
  position: relative;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: block;
  height: 5.33px;
  width: 21.33px;
  border-radius: 50%;
  background-color: #d9d9d9;
  border: 0.33px solid #d9d9d9;
  animation: hear-loader-shadow 2.3s cubic-bezier(0.75, 0, 0.5, 1) infinite;
}

@keyframes hear-loader-shadow {
  50% {
    transform: translateX(-50%) scale(0.5);
    border-color: #f2f2f2;
  }
}
`}</style>

      <div className="loader-container">
        <div className="preloader">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="hear-loader-shadow"></div>
      </div>
    </div>
  );
};

export default SpinnerHeart;
