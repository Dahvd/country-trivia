import { Country } from "@/types/global";

//function to shuffle an array based on Fisher-Yates Shuffle:
export function shuffle(array: any[]): void {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

export function getRandomCountryGuesses(countryData: Country[], countryIndex: number) {
  let countriesToBeGuessed = [countryData[countryIndex]];  // Start with the current country index

  // Remove the current index from the pool of available indices
  let shortenedCountryList = countryData.filter(item => item.name.common !== countryData[countryIndex].name.common);

  // Select 3 additional random countries (ensuring no duplicates)
  while (countriesToBeGuessed.length < 4) {
      const randomIndex = Math.floor(Math.random() * shortenedCountryList.length);
      const selectedCountry = shortenedCountryList[randomIndex];
      countriesToBeGuessed.push(selectedCountry);
      shortenedCountryList.splice(randomIndex, 1);
  }

  shuffle(countriesToBeGuessed);
  return countriesToBeGuessed;
}