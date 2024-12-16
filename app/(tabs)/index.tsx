import { ActivityIndicator, FlatList, Pressable, StyleSheet } from 'react-native';
import { Text, useThemeColor, View } from '@/components/Themed';
import { useEffect, useState } from 'react';
import Slider from '@react-native-community/slider';
import { useFetchRandomizedCountries } from '@/hooks/useFetchRandomizedCountries';
import { getRandomCountryGuesses } from '@/helpers/CountryHelperFunctions';
import { Country } from '@/types/global';
import { NumberSelection } from '@/components/NumberSelection';
import { DisplayGuesses } from '@/components/DisplayGuesses';

export default function FlagGuesser() {
  const {countries, loading, error} = useFetchRandomizedCountries();
  const [countryIndex, setCountryIndex] = useState<number>(0);
  
  const [numberToGuess, setNumberToGuess] = useState<number>(1);
  const [numberGuessing, setNumberGuessing] = useState<number>(0);
  const [readyToGuess, setReadyToGuess] = useState<boolean>(false);
  const [randomCountries, setRandomCountries] = useState<Country[]>([]);
  const [allGuesses, setAllGuesses] = useState<any>([]);
  const textColor = useThemeColor({}, 'text');

  useEffect(() => { 
    if (numberToGuess !== 0) {
      let temp = getRandomCountryGuesses(countries, countryIndex);
      console.log('rand countries: ', temp)
      setRandomCountries(temp);
    }
  }, [countryIndex, numberToGuess]);

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
    setNumberGuessing(newCountryIndex);
  };

  useEffect(() => {
    if(numberGuessing === numberToGuess && readyToGuess) {
      setReadyToGuess(false);
    }
  }, [numberGuessing, readyToGuess])




  return (
    <View style={styles.container}>
      {!readyToGuess && allGuesses.length === 0 ? 
      <NumberSelection maxValue={countries.length} numberToGuess={numberToGuess} setNumberToGuess={setNumberToGuess} setReadyToGuess={setReadyToGuess} />
      :
      allGuesses.length === numberToGuess ? <DisplayGuesses listOfGuesses={allGuesses} />
      :
      (<View>
        {loading ? (
          <View>
            <Text>Loading ...</Text>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <View>
            <Text style={styles.flag}>{countries[countryIndex].flag}</Text>
            <View>
              <Text style={styles.title}>Guess the country:</Text>
              <View style={styles.optionsContainer}>
                {randomCountries.length > 0 ? (
                  <FlatList 
                    data={randomCountries} 
                    renderItem={({item}) => (
                      <Pressable
                        key={item.name.common}
                        style={[styles.optionButton, { borderColor: textColor }]}
                        onPress={() => handleOptionSelect(item)}>
                        <Text style={styles.optionText}>{item.name.common}</Text>
                      </Pressable>
                    )}
                  />)
                  : 
                  (<Text>No options available</Text>)
                }
              </View>
            </View>
          </View>
        )}
      </View>
    )}
    </View>
  );
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
