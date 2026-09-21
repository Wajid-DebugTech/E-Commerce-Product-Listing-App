import { Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Product } from "../types/Product";

interface ProductCardProps {
  product: Product;
  onPress?: () => void;
  onAddToCart?: () => void;
}

export default function ProductCard({
  product,
  onPress,
  onAddToCart,
}: ProductCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        source={{ uri: product.image }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title} numberOfLines={2}>
        {product.title}
      </Text>
      <Text style={styles.category}>{product.category}</Text>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      <Text style={styles.rating}>
        ★ {product.rating.rate} ({product.rating.count})
      </Text>
      <TouchableOpacity style={styles.button} onPress={onAddToCart}>
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  image: {
    width: "100%",
    height: 120,
  },
  title: {
    fontSize: 14,
    color: "#000",
    fontWeight: "600",
    marginTop: 8,
  },
  category: {
    fontSize: 12,
    color: "#555",
    marginTop: 2,
  },
  price: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
    marginTop: 4,
  },
  rating: {
    fontSize: 12,
    color: "#333",
    marginTop: 2,
  },
  button: {
    marginTop: 8,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: "#8a4bff",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
});
