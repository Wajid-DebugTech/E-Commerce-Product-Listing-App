import { View, FlatList, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { Product } from "../types/Product";
import { fetchAllProducts } from "../data/apiData";
import ProductCard from "../components/ProductCard";
import Header from "../components/Header";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchAllProducts().then(setProducts);
  }, []);

  return (
    <View style={{flex: 1}}>
      <Header />
      <View style={{paddingHorizontal: 10, flex: 1}}>
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          renderItem={({ item }) => <ProductCard product={item} />}
        />
      </View>
    </View>
  );
}
