import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import QuantitySelector from "../components/QuantitySelector";
import Header from "../components/Header";
import { CartItem } from "../types/CartItem";

export default function Cart() {
  const { items, removeItem, updateQuantity } = useCart();
  const [checkedOut, setCheckedOut] = useState(false);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const renderItem = ({ item }: { item: CartItem }) => (
    <View style={styles.row}>
      <Image
        source={{ uri: item.image }}
        style={styles.rowImage}
        resizeMode="contain"
      />
      <View style={styles.rowDetails}>
        <Text style={styles.rowTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.rowPrice}>${item.price.toFixed(2)} each</Text>
        <QuantitySelector
          quantity={item.quantity}
          onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
          onDecrease={() =>
            updateQuantity(item.id, Math.max(1, item.quantity - 1))
          }
        />
      </View>
      <TouchableOpacity onPress={() => removeItem(item.id)}>
        <Text style={styles.remove}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  if (checkedOut) {
    return (
      <View style={{ flex: 1 }}>
        <Header />
        <View style={styles.centered}>
          <Text style={styles.successText}>Order placed successfully! {"\n \n"}Thank you for buying stuff from BuyStuff</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Header />

      {items.length === 0 ? (
        <View style={styles.centered}>
          <Text>Your cart is empty.</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
          />
          <View style={styles.footer}>
            <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={() => setCheckedOut(true)}
            >
              <Text style={styles.checkoutText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
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
  list: {
    padding: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  rowImage: {
    width: 60,
    height: 60,
  },
  rowDetails: {
    flex: 1,
    marginLeft: 12,
  },
  rowTitle: {
    fontSize: 14,
    fontWeight: "600",
  },
  rowPrice: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
    marginBottom: 6,
  },
  remove: {
    color: "#f00",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 12,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  total: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },
  checkoutButton: {
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: "#111",
    alignItems: "center",
  },
  checkoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  successText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111",
    textAlign: "center"
  },
});
