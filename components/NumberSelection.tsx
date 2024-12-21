import Slider from "@react-native-community/slider";
import { Text, useThemeColor, View } from "./Themed";
import { StyleSheet } from "react-native";
import { CustomPressable } from "./CustomPressable";

type NumberSelectionProps = {
  maxValue: number,
  numberToGuess: number,
  setNumberToGuess: (value: number) => void,
  setGameState: (str: "loading" | "picking" | "guessing" | "displayResults") => void,
}
export function NumberSelection ({maxValue, numberToGuess, setNumberToGuess, setGameState}: NumberSelectionProps) {
  const textColor = useThemeColor({}, 'text');

  return(
    <View>
      <Text style={styles.title}>How many flags would you like to guess?</Text>
      <Text style={styles.number}>Selected Number: {numberToGuess}</Text>
    
      <Slider
        style={styles.slider}
        minimumValue={1} // Minimum value of the slider
        maximumValue={maxValue} // Maximum value of the slider
        step={1} // Step between values (optional)
        value={numberToGuess} // Current value of the slider
        onValueChange={value => setNumberToGuess(value)} // Update state when value changes
        thumbTintColor={textColor} // Color of the thumb
        minimumTrackTintColor="#1E90FF" // Color of the track on the left of the thumb
        maximumTrackTintColor="#d3d3d3" // Color of the track on the right of the thumb
      />
      <CustomPressable
        style={[styles.optionButton, { borderColor: textColor }]}
        onPress={() => setGameState('guessing')}>
        <Text style={styles.optionText}>Start Guessing</Text>
      </CustomPressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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