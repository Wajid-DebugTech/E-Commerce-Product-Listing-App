import { View, Text } from "react-native";
import Header from "../components/Header";

export default function ProductDetails() {
  return (
    <View>
      <Header onLeftPress={() => navigation.navigate("Home")} />
    </View>
  );
}
