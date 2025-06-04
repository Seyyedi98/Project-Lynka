import BB8 from "../common/spinners/bb8-spinner";
import NormalSpinner from "../common/spinners/normal-spinner";
import PinWheelSpinner from "../common/spinners/pin-wheel-spinner";
import SpinnerBar from "../common/spinners/spinner-bar";
import SpinnerBook from "../common/spinners/spinner-book";
import SpinnerColor from "../common/spinners/spinner-color";
import SpinnerCrossLine from "../common/spinners/spinner-crossline";
import SpinnerGaming from "../common/spinners/spinner-gaming";
import SpinnerHeart from "../common/spinners/spinner-heart";
import SpinnerLine1 from "../common/spinners/spinner-line1";
import SpinnerRunningSquare from "../common/spinners/spinner-running-square";
import PencilSpinner from "../elements_theme/card/card-field-pen";

export const LoadingController = {
  basic: NormalSpinner,
  normal: PinWheelSpinner,
  bb8: BB8,
  runningSquare: SpinnerRunningSquare,
  book: SpinnerBook,
  pen: PencilSpinner,
  line1: SpinnerLine1,
  cross: SpinnerCrossLine,
  bar: SpinnerBar,
  gaming: SpinnerGaming,
  heart: SpinnerHeart,
  color: SpinnerColor,
};
