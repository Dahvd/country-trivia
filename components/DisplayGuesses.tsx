import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, } from 'react-native';
import { Text, View, useThemeColor } from './Themed';

type DisplayGuessesProps = {
  listOfGuesses: any[];
};

export function DisplayGuesses({ listOfGuesses }: DisplayGuessesProps) {
  const textColor = useThemeColor({}, 'text');

  return (
      <SafeAreaView style={styles.container}>
        <View>
          <FlatList
            data={listOfGuesses}
            renderItem={({ item, index }) => (
              <View key={item.correctCountry.name.common} style={styles.itemContainer}>
                {/* Country Section */}
                <View style={styles.countrySection}>
                  <Text style={styles.countryName}>{item.correctCountry.name.common}</Text>
                  <Text style={styles.countryFlag}>{item.correctCountry.flag}</Text>
                </View>

                {/* Guess Section */}
                <View style={styles.guessSection}>
                  <Text style={styles.guessLabel}>Your Guess:</Text>
                  <Text style={styles.guessName}>{item.guess.name.common}</Text>
                </View>

                {/* Correct/Incorrect Result Section */}
                <View style={[styles.resultSection, item.correct ? styles.correct : styles.incorrect]}>
                  <Text style={styles.resultText}>{item.correct ? 'Correct' : 'Incorrect'}</Text>
                </View>

                <View style={styles.separator} />
              </View>
            )}
          />
        </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f7f7f7', // Light background
  },
  itemContainer: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // For Android shadow
  },
  countrySection: {
    alignItems: 'center',
    marginBottom: 15,
  },
  countryName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  countryFlag: {
    fontSize: 50,
    marginBottom: 10,
  },
  guessSection: {
    alignItems: 'center',
    marginBottom: 15,
  },
  guessLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 5,
  },
  guessName: {
    fontSize: 22,
    color: '#333',
    marginBottom: 5,
  },
  guessFlag: {
    fontSize: 50,
    marginBottom: 10,
  },
  resultSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  correct: {
    backgroundColor: 'green',
  },
  incorrect: {
    backgroundColor: 'red',
  },
  resultIcon: {
    marginRight: 10,
  },
  resultText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginTop: 15,
  },
});
