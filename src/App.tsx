import Hero from "./components/Hero";
import Problem from "./components/Problem";
import Spacer from "./components/Spacer";
import Spark from "./components/Spark";
import Experience from "./components/Experience";
import AI from "./components/AI";
import Emotion from "./components/Emotion";
import RealStories from "./components/RealStories";
import Invitation from "./components/Invitation";

function App() {
  return (
    <div
      className="bg-gradient-to-b from-peach-50 via-lavender-50 to-sage-50"
      style={{
        transition: "background-color 1.5s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <Hero />

      <Problem />
      <Spark />
      <Experience />
      <AI />
      <Emotion />
      <RealStories />
      <Invitation />
    </div>
  );
}

export default App;
