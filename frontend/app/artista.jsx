import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function ArtistaScreen() {
  return (
    <LinearGradient colors={['#8000d5', '#f910a3', '#fddf00']} style={styles.gradient}>
      <ScrollView style={styles.container}>
        
        {/* Header com imagem e nome */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="arrow-back" size={26} color="#fff" />
          </TouchableOpacity>
          
          <Image
            source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/5/54/Green_Day_2020.jpg" }}
            style={styles.image}
          />
          <Text style={styles.artistName}>GREEN DAY</Text>
        </View>

        {/* Botões de ação */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.followButton}>
            <Text style={styles.followText}>Seguir</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionsButton}>
            <Ionicons name="ellipsis-horizontal" size={22} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.shuffleButton}>
            <Ionicons name="shuffle" size={22} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.playButton}>
            <Ionicons name="play" size={28} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Lista de músicas */}
        <View style={styles.listContainer}>
          <Text style={styles.sectionTitle}>Popular</Text>

          {["Musica 1", "Musica 2", "Musica 3", "Musica 4", "Musica 5", "Musica 6", "Musica 7"].map((musica, index) => (
            <View key={index} style={styles.musicItem}>
              <View style={styles.musicImage} />
              <Text style={styles.musicName}>{musica}</Text>
            </View>
          ))}
        </View>

        {/* Botão discografia */}
        <TouchableOpacity style={styles.discografiaButton}>
          <Text style={styles.discografiaText}>Ver discografia</Text>
        </TouchableOpacity>

      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 16,
    zIndex: 10,
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 10,
  },
  artistName: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 16,
  },
  followButton: {
    backgroundColor: "#b54dff",
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 10,
  },
  followText: {
    color: "#fff",
    fontWeight: "600",
  },
  optionsButton: {
    marginHorizontal: 8,
  },
  shuffleButton: {
    marginHorizontal: 8,
  },
  playButton: {
    backgroundColor: "#ff007f",
    borderRadius: 50,
    padding: 12,
    marginLeft: 10,
  },
  listContainer: {
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 15,
    marginHorizontal: 16,
    padding: 10,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  musicItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  musicImage: {
    width: 40,
    height: 40,
    backgroundColor: "#ccc",
    borderRadius: 6,
    marginRight: 10,
  },
  musicName: {
    color: "#fff",
    fontSize: 16,
  },
  discografiaButton: {
    backgroundColor: "#fddf00",
    paddingVertical: 10,
    borderRadius: 20,
    margin: 20,
    alignItems: "center",
  },
  discografiaText: {
    color: "#000",
    fontWeight: "bold",
  },
});
    