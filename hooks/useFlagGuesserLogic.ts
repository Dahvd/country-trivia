import { useState, useEffect } from 'react';
import { getRandomCountryGuesses } from '@/helpers/CountryHelperFunctions';
import { Country } from '@/types/global';

type GuessObjectType = {
  correct: boolean;
  guess: Country;
  correctCountry: Country;
}
export const useFlagGuesserLogic = (countries: Country[]) => {
  const [countryIndex, setCountryIndex] = useState(0);
  const [numberToGuess, setNumberToGuess] = useState(1);
  const [numberGuessing, setNumberGuessing] = useState(1);
  const [randomCountries, setRandomCountries] = useState<Country[]>([]);
  const [allGuesses, setAllGuesses] = useState<GuessObjectType[]>([]);
  const [gameState, setGameState] = useState<'picking' | 'guessing' | 'displayResults' | 'loading'>('picking');

  useEffect(() => {
    if (gameState === 'guessing') {
      const temp = getRandomCountryGuesses(countries, countryIndex);
      setRandomCountries(temp);
    }
    if (gameState === 'picking') {
      setAllGuesses([]);
      setNumberGuessing(1);
    }
  }, [gameState, countryIndex]);

  const handleOptionSelect = (selected: Country) => {
    const isCorrect = selected.name.common === countries[countryIndex].name.common;
    setAllGuesses((prev) => [
      ...prev,
      {
        correct: isCorrect,
        guess: selected,
        correctCountry: countries[countryIndex],
      },
    ]);
    
    setCountryIndex((prevIndex) => prevIndex + 1);
    
    if (numberGuessing === numberToGuess) {
      setGameState('displayResults');
    } else {
      setNumberGuessing((prevGuessing) => prevGuessing + 1);
    }
  };

  return {
    gameState,
    countryIndex,
    numberGuessing,
    randomCountries,
    numberToGuess,
    allGuesses,
    setGameState,
    setNumberToGuess,
    handleOptionSelect,
  };
};
