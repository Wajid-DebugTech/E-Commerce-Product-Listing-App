import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";

type HeaderNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface HeaderProps {
  leftIcon?: keyof typeof Ionicons.glyphMap;
  onLeftPress?: () => void;
  onCartPress?: () => void;
}

export default function Header({
  leftIcon = "home",
  onLeftPress,
  onCartPress,
}: HeaderProps) {
  const navigation = useNavigation<HeaderNavigationProp>();

  // nullish coalesce to allow overrides via HeaderProps while keeping a default action for the buttons
  const handleLeftPress = onLeftPress ?? (() => navigation.popToTop());
  const handleCartPress = onCartPress ?? (() => navigation.navigate("Cart"));

  return (
    <View
      style={{
        backgroundColor: "#eee",
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        paddingTop: useSafeAreaInsets().top + 10,
        paddingBottom: 10,
        flexDirection: "row",
        paddingHorizontal: 20,
      }}
    >
      <TouchableOpacity style={styles.button} onPress={handleLeftPress}>
        <Ionicons name={leftIcon} size={36} color="#fff" />
      </TouchableOpacity>

      <View style={{ flex: 1 }}>
        <Text style={styles.title}>BuyStuff</Text>
        <Text style={styles.subtitle}>Buy Good Stuff from BuyStuff</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleCartPress}>
        <Ionicons name="cart" size={36} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 36,
    color: "#000",
    textAlign: "center",
    fontWeight: "800",
    marginTop: 0,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    fontWeight: "600",
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: "#8a4bff",
    alignItems: "center",
    justifyContent: "center",
  },
});
