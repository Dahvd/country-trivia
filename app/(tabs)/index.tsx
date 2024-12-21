import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { Text, useThemeColor, View } from '@/components/Themed';
import { useFetchRandomizedCountries } from '@/hooks/useFetchRandomizedCountries';
import { NumberSelection } from '@/components/NumberSelection';
import { DisplayResults } from '@/components/DisplayResults';
import { CustomPressable } from '@/components/CustomPressable';
import { useFlagGuesserLogic } from '../../hooks/useFlagGuesserLogic';
import { GuessingFlags } from '@/components/GuessingFlags';

export default function FlagGuesser() {
  const { countries, loading, error } = useFetchRandomizedCountries();

  const {
    gameState,
    countryIndex,
    numberGuessing,
    randomCountries,
    numberToGuess,
    allGuesses,
    setGameState,
    setNumberToGuess,
    handleOptionSelect,
  } = useFlagGuesserLogic(countries);

  const guessingProps = {
    countries,
    numberGuessing,
    numberToGuess,
    countryIndex,
    randomCountries,
    handleOptionSelect,
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  switch (gameState) {
    case 'picking':
      return (
        <View style={styles.container}>
          <NumberSelection
            maxValue={countries.length}
            numberToGuess={numberToGuess}
            setNumberToGuess={setNumberToGuess}
            setGameState={setGameState}
          />
        </View>
      );

    case 'guessing':
      return (
        <View style={styles.container}>
          <GuessingFlags {...guessingProps} />
        </View>
      );

    case 'displayResults':
      return (
        <View style={styles.container}>
          <DisplayResults listOfGuesses={allGuesses} setGameState={setGameState} />
        </View>
      );

    default:
      return null;
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
  howMany: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 17,
    alignSelf: 'center',
  },
});
