import { View, StyleSheet, TextInput } from "react-native";

interface SearchBarProps {
  value: string;
  onChangeText?: (text: string) => void;
}

export default function SearchBar({ value, onChangeText }: SearchBarProps) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={"Search"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 16,
  },
  input: {
    height: 40,
    fontSize: 14,
  },
});
