import ReactLenis from "lenis/react";
import MeetMuxStory from "./components/MeetMuxStory/index";

function App() {

  return (

    <ReactLenis
      root
      options={{
        lerp: 100,
        duration: 2,
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        smoothTouch: false,
        touchMultiplier: 2
      }}
    >
      <MeetMuxStory />
    </ReactLenis >
  );
}

export default App;

