import { View, Text, StyleSheet } from "react-native";
import { useEffect } from "react";

interface NotificationProps {
  message: string;
  visible: boolean;
  onHide: () => void;
}

export default function Notification({
  message,
  visible,
  onHide,
}: NotificationProps) {
  useEffect(() => {
    if (!visible) return;

    const timer = setTimeout(onHide, 7000);

    return () => clearTimeout(timer);
  }, [visible, message, onHide]);

  if (!visible) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 40,
    left: 20,
    right: 20,
    backgroundColor: "#111",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});
