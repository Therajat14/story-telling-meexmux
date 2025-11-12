import Hero from "./components/Hero";
import Problem from "./components/Problem";
import Spark from "./components/Spark";
import Experience from "./components/Experience";
import AI from "./components/AI";
import Emotion from "./components/Emotion";
import RealStories from "./components/RealStories";
import Invitation from "./components/Invitation";
import DiscoveryChapter from "./components/DiscoveryChapter";
import JourneyContinue from "./components/JourneyContinue";
import YourTurnChapter from "./components/chapters/YourTurnChapter";
import PlannedPartyChapter from "./components/chapters/PlannedPartyChapter";
import DiscoveryToPartyChapter from "./components/chapters/DiscoveryToPartyChapter";

function App() {
  return (
    <div
      className="bg-gradient-to-b from-peach-50 via-lavender-50 to-sage-50"
      style={{
        transition: "background-color 2.5s ease-in-out",
      }}
    >
      <Hero />
      <Problem />
      {/* <Spark /> */}
      <Experience />
      <AI />
      {/* <Emotion /> */}
      <RealStories />

      <DiscoveryToPartyChapter darkMode={true} />
      <JourneyContinue />

      <YourTurnChapter darkMode={true} />
      {/* {   <Invitation />} */}
    </div>
  );
}

export default App;
