import { View, FlatList, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { Product } from "../types/Product";
import { fetchAllProducts, fetchCategories } from "../data/apiData";
import ProductCard from "../components/ProductCard";
import Header from "../components/Header";
import CategoryChip from "../components/CategoryChip";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const categoryChipMargin = 50; // leaves a margin of space for the category chips to live in, and also so that they don't overlap with the products listing

  useEffect(() => {
    fetchAllProducts().then(setProducts);
    fetchCategories().then(setCategories);
  }, []);

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <View style={{ paddingHorizontal: 10, flex: 1 }}>
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          renderItem={({ item }) => <ProductCard product={item} />}
          contentContainerStyle={{ paddingTop: categoryChipMargin }}
        />

        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: "#fff",
            borderBottomWidth: 1,
            borderBottomColor: "#eee",
            height: categoryChipMargin,
          }}
        >
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 10,
              alignItems: "center",
            }}
          >
            <CategoryChip
              label="All"
              selected={selectedCategory === "All"}
              onPress={() => setSelectedCategory("All")}
            />
            {categories.map((category) => (
              <CategoryChip
                key={category}
                label={category}
                selected={selectedCategory === category}
                onPress={() => setSelectedCategory(category)}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}
