import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useEffect, useState } from "react";
import { useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigation";
import { Product } from "../types/Product";
import { fetchProductById } from "../data/apiData";
import Header from "../components/Header";
import QuantitySelector from "../components/QuantitySelector";

type ProductDetailsRouteProp = RouteProp<RootStackParamList, "ProductDetails">;

export default function ProductDetails() {
  const route = useRoute<ProductDetailsRouteProp>();
  const { productId } = route.params;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setLoading(true);
    setError(false);
    fetchProductById(productId)
      .then((data) => setProduct(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [productId]);

  return (
    <View style={{ flex: 1 }}>
      <Header />

      {loading && (
        <View style={styles.centered}>
          <ActivityIndicator size="large" />
        </View>
      )}

      {!loading && (error || !product) && (
        <View style={styles.centered}>
          <Text>Something went wrong with loading this product.</Text>
        </View>
      )}

      {!loading && product && (
        <ScrollView contentContainerStyle={styles.content}>
          <Image
            source={{ uri: product.image }}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.category}>{product.category}</Text>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          <Text style={styles.rating}>
            ⭐ {product.rating.rate} ({product.rating.count})
          </Text>
          <Text style={styles.description}>{product.description}</Text>

          <QuantitySelector
            quantity={quantity}
            onIncrease={() => setQuantity((q) => q + 1)}
            onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
          />

          <TouchableOpacity style={styles.addButton} onPress={() => {}}>
            <Text style={styles.addButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    padding: 16,
  },
  image: {
    width: "100%",
    height: 280,
  },
  title: {
    fontSize: 22,
    color: "#000",
    fontWeight: "700",
    marginTop: 16,
  },
  category: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  price: {
    fontSize: 20,
    color: "#000",
    fontWeight: "700",
    marginTop: 8,
  },
  rating: {
    fontSize: 14,
    color: "#333",
    marginTop: 4,
  },
  description: {
    fontSize: 14,
    color: "#222",
    marginTop: 10,
    lineHeight: 20,
  },
  addButton: {
    marginTop: 10,
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: "#111",
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
