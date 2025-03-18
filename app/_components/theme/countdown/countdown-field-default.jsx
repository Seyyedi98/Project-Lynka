import React from "react";
import ShiftingCountdown from "../../common/countdown";

const CountdownFieldDefault = (props) => {
  const { countdownDate } = props;

  return <ShiftingCountdown countdownDate={countdownDate} />;
};

export default CountdownFieldDefault;
