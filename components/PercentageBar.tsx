import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type GuessingProgressBarProps = {
  correctGuesses: number,
  totalGuesses: number,
}

export const GuessingProgressBar = ({ correctGuesses, totalGuesses }: GuessingProgressBarProps) => {
  // Calculate the percentage of correct guesses
  const percentage = (correctGuesses / totalGuesses) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.progressBarContainer}>
        <View
          style={[
            styles.progressBar,
            { width: `${percentage}%` }, // Adjust width based on the percentage
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  progressBarContainer: {
    width: '100%',
    height: 10,
    backgroundColor: 'red',
    marginBottom: 10,
    borderRadius: 10,
  },
  progressBar: {
    borderRadius: 10,
    height: '100%',
    backgroundColor: 'green', // Green for the progress bar
  },
  percentageText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
