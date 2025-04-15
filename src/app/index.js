import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import TimerCard from "../components/TimerCard";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from "expo-router";
import { useContext } from "react";
import { TimeContext } from "../context/TimerContext";

export default function Page() {
  const { timers } = useContext(TimeContext);
  return (
    <View style={styles.container}>

      <FlatList data={timers} renderItem={({ item }) => (
        <Link href={`/edit/${item.id}`}>
          <TimerCard id={item.id} title={item.title}
            totalSeconds={item.totalSeconds} />
        </Link>
      )} contentContainerStyle={{
        gap: 20,
        padding: 20,
        paddingBottom: 100
      }} showsVerticalScrollIndicator={false} />

      <Link href={"/add"} asChild>
        <Pressable style={styles.button}>
          <Ionicons name="add" size={24} color="#fff" />
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    backgroundColor: 'royalblue',
    padding: 10,
    borderRadius: 50,
    position: 'absolute',
    bottom: 20,
    right: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
});
