import { StyleSheet, View } from "react-native";
import { Text } from "./Themed";
import { FontAwesome } from "@expo/vector-icons";
import { Country } from "@/types/global";

type ItemObjectType = {
  correct: boolean,
  correctCountry: Country,
  guess: Country,
}

type FlagAnswerDisplayCardProps = {
  item: ItemObjectType,
}

export function FlagAnswerDisplayCard({item}: FlagAnswerDisplayCardProps) {

  return (
    <View key={item.correctCountry.name.common} style={[styles.itemContainer, item.correct ? styles.correct : styles.incorrect]}>
      <View style={styles.row}>
        <View style={styles.row}>
          <Text style={styles.countryFlag}>{item.correctCountry.flag} </Text>
          <Text style={styles.countryName}>{item.correctCountry.name.common}</Text>
        </View>
        <View style={styles.end}>
          <FontAwesome color={item.correct ? 'green' : 'red'} name={item.correct ? 'check-circle' : 'times-circle-o'} size={24}/>
        </View>
      </View>

      {/* Guess Section */}
      {!item.correct && <View style={styles.guessContainer}>
        <Text style={styles.guess}>Your Guess: </Text>
        <Text style={styles.guess}>{item.guess.name.common}</Text>
      </View>}
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  end: {
    justifyContent: 'flex-end',
  },
  itemContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 15,
    borderRadius: 10,
    width: '100%',
    borderWidth: 2,
    backgroundColor: '#fafafa',
  },
  countryName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  countryFlag: {
    fontSize: 50,
  },
  guessContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 5,
    left: 10,
  },
  guess: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  correct: {
    borderColor: 'green',
  },
  incorrect: {
    borderColor: 'red',
  },
});