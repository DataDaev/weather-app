import Lottie from "lottie-react";
import cloudy from "./assets/part-cloudy-animation.json";
import rainstorm from "./assets/rain-storm-animation.json";
import mist from "./assets/mist-animation.json";
import lightrain from "./assets/light-rain-animation.json";
import sunny from "./assets/sun-animation.json";

export default function WeatherAnimation({ weatherType }) {
  let animationRender;

  switch (weatherType) {
    case "Clouds":
      animationRender = <Lottie animationData={cloudy} />;
      break;
    case "Rain":
      animationRender = <Lottie animationData={lightrain} />;
      break;
    case "Mist":
      animationRender = <Lottie animationData={mist} />;
      break;

    default:
      animationRender = <Lottie animationData={sunny} />;
  }

  return <div>{animationRender}</div>;
}
