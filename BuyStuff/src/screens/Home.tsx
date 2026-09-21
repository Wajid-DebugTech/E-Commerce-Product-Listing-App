import { View, FlatList, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { Product } from "../types/Product";
import { fetchAllProducts, fetchCategories } from "../data/apiData";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import ProductCard from "../components/ProductCard";
import Header from "../components/Header";
import CategoryChip from "../components/CategoryChip";
import SearchBar from "../components/SearchBar";
import { useCart } from "../context/CartContext";
import Notification from "../components/Notification";

// the header handles a lot of navigation but this is needed here so that tapping a product brings you to its details page
type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function Home() {
  const navigation = useNavigation<HomeNavigationProp>();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const categoryChipMargin = 50; // leaves a margin of space for the category chips to live in so that they don't overlap with the products listing
  const [searchVisible, setSearchVisible] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { addItem } = useCart();

  useEffect(() => {
    fetchAllProducts().then(setProducts);
    fetchCategories().then(setCategories);
  }, []);

  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      selectedCategory === "All" || p.category === selectedCategory;
    const matchesSearch = p.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <View style={{ flex: 1 }}>
      {/*Header component*/}
      <Header
        leftIcon="search"
        onLeftPress={() => setSearchVisible(!searchVisible)}
      />

      {/*Product listing*/}
      <View style={{ paddingHorizontal: 10, flex: 1 }}>
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onPress={() =>
                navigation.navigate("ProductDetails", { productId: item.id })
              }
              onAddToCart={() => {
                addItem(item, 1);
                setNotificationMessage('Added to Cart: ' + item.title);
                setNotificationVisible(true);
              }}
            />
          )}
          contentContainerStyle={{ paddingTop: categoryChipMargin }}
        />

        {/*Category chips are a horizontal-scrolling list directly below the header*/}
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

          {/*Search bar component, hovers above other page contents while it is visible*/}
          {searchVisible && (
            <View style={{ position: "absolute", top: 56, left: 0, right: 0 }}>
              <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
            </View>
          )}
        </View>
      </View>

      <Notification
        message={notificationMessage}
        visible={notificationVisible}
        onHide={() => setNotificationVisible(false)}
      />
    </View>
  );
}
