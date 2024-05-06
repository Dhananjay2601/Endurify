//createContext is a method provided by React's Context API that facilitates a way to pass data through the component tree without having to pass props down manually at every level.
import { createContext, useState } from "react";

// Create a context for managing challenges
export const ChallengesContext = createContext({
  challenges: [], // Initial value for challenges
  addChallenge: () => {}, // Function to add a challenge
  updateChallengeStatus: () => {}, // Function to update challenge status
});

export default function ChallengesContextProvider({ children }) {
  const [challenges, setChallenges] = useState([]);

  function addChallenge(challenge) {
    // Generate a random id for the new challenge and set its status to 'active'
    setChallenges((prevChallenges) => [
      { ...challenge, id: Math.random().toString(), status: "active" },
      ...prevChallenges,
    ]);
  }

  function deleteChallenge(challengeId) {
    setChallenges((prevChallenges) =>
      prevChallenges.filter((challenge) => challenge.id !== challengeId)
    );
  }

  function updateChallengeStatus(challengeId, newStatus) {
    setChallenges((prevChallenges) =>
      prevChallenges.map((challenge) => {
        if (challenge.id === challengeId) {
          return { ...challenge, status: newStatus };
        }
        return challenge;
      })
    );
  }
  // Create an object containing the challenges and the functions to manage them
  const challengesContext = {
    challenges,
    addChallenge,
    deleteChallenge,
    updateChallengeStatus,
  };

  // Provide the challengesContext value to its children via ChallengesContext.Provider
  return (
    <ChallengesContext.Provider value={challengesContext}>
      {children}
    </ChallengesContext.Provider>
  );
}
