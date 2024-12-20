import { Text, useThemeColor, View } from "./Themed";
import { StyleSheet } from "react-native";
import { CustomPressable } from "./CustomPressable";

type NumberSelectionProps = {
  maxValue: number;
  numberToGuess: number;
  setNumberToGuess: (value: number) => void;
  setGameState: (str: "loading" | "picking" | "guessing" | "displayResults") => void;
};

export function NumberSelection({
  maxValue,
  setNumberToGuess,
  setGameState,
}: NumberSelectionProps) {
  const textColor = useThemeColor({}, "text");

  // Preset options
  const presets = [5, 10, 15, 20, 25];

  const handlePresetSelect = (value: number) => {
    if (value <= maxValue) {
      setNumberToGuess(value);  // Set the selected number
      setGameState("guessing");  // Automatically go to the guessing state
    }
  };

  return (
    <View style={styles.container}>
      {/* Welcome Message */}
      <Text style={styles.bigGlobe}>🌍</Text>
      <Text style={[styles.welcomeText, { color: textColor }]}>
        Welcome to Country Trivia!
      </Text>
      <Text style={styles.flavorText}>
        Ready to test your knowledge? Guess how many flags you can identify from around the world!
      </Text>

      {/* Instructions */}
      <Text style={styles.instructionText}>
        Choose the number of flags you'd like to guess, and let's get started!
      </Text>

      {/* Preset Number Selection */}
      <View style={styles.presetsContainer}>
        {presets.map((preset) => (
          <CustomPressable
            key={preset}
            style={[styles.presetButton, { borderColor: textColor }]}
            onPress={() => handlePresetSelect(preset)}
          >
            <Text style={[styles.buttonText, { color: textColor }]}>{preset}</Text>
          </CustomPressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  bigGlobe: {
    fontSize: 200,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  flavorText: {
    fontSize: 18,
    color: "#555",
    marginBottom: 20,
    textAlign: "center",
  },
  instructionText: {
    fontSize: 16,
    color: "#777",
    marginBottom: 30,
    textAlign: "center",
  },
  presetsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: 20,
  },
  presetButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});
