import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import { Text, useThemeColor } from './Themed';
import { GuessingProgressBar } from './PercentageBar';
import { FlagAnswerDisplayCard } from './FlagAnswerDisplayCard';
import { CustomPressable } from './CustomPressable';

type DisplayResultsProps = {
  listOfGuesses: any[];
  setGameState: (str: string) => void,
};

export function DisplayResults({ listOfGuesses, setGameState }: DisplayResultsProps) {
  const textColor = useThemeColor({}, 'text');
  const [guessingData, setGuessingData] = useState({corect: 0, total: 0})
  const [guessedCorrect, setGuessedCorrect] = useState(0);
  // const []

  useEffect(() => {
    let totCorrect = listOfGuesses.filter(item => item.correct === true);
    setGuessedCorrect(totCorrect.length);
  }, [guessingData])

  return (
    <SafeAreaView style={styles.displayContainer}>
      <View style={styles.row}>
        <Text style={styles.resultText}>Results</Text>
        <Text style={styles.resultText}>{`${Math.round((guessedCorrect / listOfGuesses.length) * 100)}%`}</Text>
      </View>
      <GuessingProgressBar correctGuesses={guessedCorrect} totalGuesses={listOfGuesses.length} />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={listOfGuesses}
        renderItem={({ item, index }) => (
          <FlagAnswerDisplayCard item={item}/>
        )}
      />
      <CustomPressable
        style={[styles.guessAgainButton, { borderColor: textColor }]}
        onPress={() => setGameState('picking')}
        >
        <Text style={styles.guessAgainText}>Guess More Flags</Text>
      </CustomPressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  displayContainer: {
    width: '90%',
    height: '100%'
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  guessAgainButton: {
    paddingVertical: 12,
    marginVertical: 8,
    borderRadius: 5,
    alignItems: 'center',
    borderWidth: 1,
  },
  guessAgainText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
