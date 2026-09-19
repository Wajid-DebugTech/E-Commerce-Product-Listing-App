import { View, FlatList, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { Product } from "../types/Product";
import { fetchAllProducts } from "../data/apiData";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchAllProducts().then(setProducts);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => <ProductCard product={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
  },
});
