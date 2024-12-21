import { FlatList, SafeAreaView, StyleSheet } from "react-native"
import { View, Text, useThemeColor } from "./Themed"
import { CustomPressable } from "./CustomPressable"
import { Country } from '@/types/global';

type FlagGuessingComponentProps = {
  numberGuessing: number;
  numberToGuess: number;
  countries: Country[];
  countryIndex: number;
  randomCountries: Country[];
  handleOptionSelect: (item: Country) => void;
}

export const GuessingFlags = ({
  numberGuessing,
  numberToGuess,
  countries,
  countryIndex,
  randomCountries,
  handleOptionSelect
}: FlagGuessingComponentProps) => {
  const textColor = useThemeColor({}, 'text');
  
  return (
    <SafeAreaView>
      <Text style={styles.howMany}>
        {numberGuessing} of {numberToGuess}
      </Text>
      <Text style={styles.flag}>{countries[countryIndex].flag}</Text>
      <View>
        <Text style={styles.title}>Guess the country:</Text>
        <View style={styles.optionsContainer}>
          {randomCountries.length > 0 ? (
            <FlatList
              data={randomCountries}
              renderItem={({ item }) => (
                <CustomPressable
                  key={item.name.common}
                  style={[styles.optionButton, { borderColor: textColor }]}
                  onPress={() => handleOptionSelect(item)}
                >
                  <Text style={styles.optionText}>{item.name.common}</Text>
                </CustomPressable>
              )}
            />
          ) : (
            <Text>No options available</Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  )
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