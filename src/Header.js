import Lottie from "lottie-react";
import animationData from "./assets/sun-animation.json";

export default function Header() {
  return (
    <header>
      <Lottie className="logo" animationData={animationData} />
      <h1 className="title">Weather</h1>
    </header>
  );
}
