import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

interface CategoryChipProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

export default function CategoryChip({
  label,
  selected,
  onPress,
}: CategoryChipProps) {
  return (
    <TouchableOpacity
      style={[styles.chip, selected && styles.chipSelected]}
      onPress={onPress}
    >
      <Text style={selected ? styles.textSelected : styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#eee",
    marginRight: 8,
  },
  chipSelected: {
    backgroundColor: "#8a4bff",
  },
  text: {
    color: "#333",
    fontWeight: "600",
  },
  textSelected: {
    color: "#fff",
    fontWeight: "600",
  },
});
