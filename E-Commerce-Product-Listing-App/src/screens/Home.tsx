import { View, Text, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { Product } from "../types/Product";
import { fetchAllProducts } from "../data/apiData";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchAllProducts().then(setProducts);
  }, []);

  return (
    <View>
      <View>
        <Text>Home</Text>
      </View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text>{item.title}</Text>}
      />
    </View>
  );
}
