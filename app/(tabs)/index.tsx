import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { Text, useThemeColor, View } from '@/components/Themed';
import { useEffect, useState } from 'react';
import { useFetchRandomizedCountries } from '@/hooks/useFetchRandomizedCountries';
import { getRandomCountryGuesses } from '@/helpers/CountryHelperFunctions';
import { Country } from '@/types/global';
import { NumberSelection } from '@/components/NumberSelection';
import { DisplayResults } from '@/components/DisplayResults';
import { CustomPressable } from '@/components/CustomPressable';

export default function FlagGuesser() {
  const {countries, loading, error} = useFetchRandomizedCountries();
  const [countryIndex, setCountryIndex] = useState<number>(0);
  
  const [numberToGuess, setNumberToGuess] = useState<number>(1);
  const [numberGuessing, setNumberGuessing] = useState<number>(1);
  const [randomCountries, setRandomCountries] = useState<Country[]>([]);
  const [allGuesses, setAllGuesses] = useState<any>([]);
  const [gameState, setGameState] = useState('picking');
  const textColor = useThemeColor({}, 'text');

  const handleOptionSelect = (selected: Country) => {
    if (selected.name.common === countries[countryIndex].name.common) {
        setAllGuesses(
          [...allGuesses, 
          {
            correct: true,
            guess: selected, 
            correctCountry: countries[countryIndex], 
          }
        ])
    } else {
      setAllGuesses(
        [...allGuesses, 
        {
          correct: false, 
          guess: selected, 
          correctCountry: countries[countryIndex],
        }
      ])

    }
    let newCountryIndex = countryIndex + 1;
    setCountryIndex(newCountryIndex);
    if (numberGuessing === numberToGuess) {
      setGameState('displayResults');
    }
    setNumberGuessing(numberGuessing => numberGuessing + 1);
  };

  useEffect(() => {
    if (gameState === 'guessing') {
      let temp = getRandomCountryGuesses(countries, countryIndex);
      setRandomCountries(temp);
    }
    if (gameState === 'picking') {
      setAllGuesses([]);
      setNumberGuessing(1);
    }
  }, [gameState, countryIndex]);

  switch (gameState) {
    case 'loading':
      return(
        <View style={styles.container}>
          <Text>Loading ...</Text>
          <ActivityIndicator size="large" />
      </View>
      )
    case 'picking':
      return (
        <View style={styles.container}>
          <NumberSelection 
            maxValue={countries.length} 
            numberToGuess={numberToGuess} 
            setNumberToGuess={setNumberToGuess} 
            setGameState={setGameState} />
        </View>
      );

    case 'guessing':
      return(
        <View style={styles.container}>
          <View>
            <Text style={styles.flag}>{countries[countryIndex].flag}</Text>
            <View>
              <Text style={styles.title}>Guess the country:</Text>
              <View style={styles.optionsContainer}>
                {randomCountries.length > 0 ? (
                  <FlatList 
                    data={randomCountries} 
                    renderItem={({item}) => (
                      <CustomPressable
                        key={item.name.common}
                        style={[styles.optionButton, { borderColor: textColor }]}
                        onPress={() => handleOptionSelect(item)}>
                        <Text style={styles.optionText}>{item.name.common}</Text>
                      </CustomPressable>
                    )}
                  />)
                  : 
                  (<Text>No options available</Text>)
                }
              </View>
            </View>
          </View>
        </View>
      );
    case 'displayResults': 
      return (
        <View style={styles.container}>
          <DisplayResults listOfGuesses={allGuesses} setGameState={setGameState} />
        </View>
      );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flag: {
    fontSize: 300,
  },
  optionsContainer: {
    width: '100%',
    padding: 10,
  },
  optionButton: {
    paddingVertical: 12,
    marginVertical: 8,
    borderRadius: 5,
    alignItems: 'center',
    borderWidth: 1,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
  },
  number: {
    fontSize: 18,
    marginVertical: 10,
    color: '#333',
  },
  slider: {
    width: 300,
    height: 40,
  },
});
