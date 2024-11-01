import { useEffect, useState } from "react";
import { EventBus } from "./EventBus";

export default function useScore() {
  const [score, setScore] = useState(0);

  useEffect(() => {
    const handleScoreUpdate = (data: { name: string; value: number }) => {
      if (data.name === "finalScore") {
        setScore(data.value);
      }
    };
    EventBus.on("finalScore", handleScoreUpdate);
    return () => {
      EventBus.off("finalScore", handleScoreUpdate);
    };
  }, []);
  return score;
}
