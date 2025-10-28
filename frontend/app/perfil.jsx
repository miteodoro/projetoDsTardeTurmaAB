import { useState } from "react"
import { Text, View, ScrollView, TouchableOpacity, Image, Alert } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import * as ImagePicker from "expo-image-picker"

export default function Index() {
  const [image, setImage] = useState(null)

  // Função para escolher imagem
  const pickImage = async () => {
    // Solicita permissão
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (permissionResult.status !== "granted") {
      Alert.alert("Permissão negada", "Precisamos de acesso à sua galeria para escolher uma foto.")
      return
    }

    // Abre a galeria
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })

    // Define imagem se o usuário escolheu
    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }

  return (
    <LinearGradient colors={["#8000D5", "#F910A3", "#FFBB00"]} style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        {/* Header com botão voltar */}
        <View style={{ paddingTop: 50, paddingHorizontal: 20, paddingBottom: 20 }}>
          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: "rgba(255,255,255,0.2)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontSize: 18 }}>←</Text>
          </TouchableOpacity>
        </View>

        {/* Seção do perfil */}
        <View style={{ alignItems: "center", paddingHorizontal: 20 }}>
          {/* Foto do perfil */}
          <View
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              backgroundColor: "#4A5568",
              marginBottom: 10,
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            {image ? (
              <Image source={{ uri: image }} style={{ width: "100%", height: "100%" }} />
            ) : (
              <Text style={{ color: "white", fontSize: 16 }}>👤</Text>
            )}
          </View>

          {/* Botão para adicionar foto */}
          <TouchableOpacity
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              paddingHorizontal: 20,
              paddingVertical: 8,
              borderRadius: 20,
              marginBottom: 20,
            }}
            onPress={pickImage}
          >
            <Text style={{ color: "white", fontSize: 14, fontWeight: "500" }}>
              Adicionar foto de perfil
            </Text>
          </TouchableOpacity>

          {/* Nome do usuário */}
          <Text
            style={{
              color: "white",
              fontSize: 24,
              fontWeight: "bold",
              marginBottom: 8,
            }}
          >
            Fulano D`Town
          </Text>

          {/* Estatísticas */}
          <Text
            style={{
              color: "white",
              fontSize: 16,
              marginBottom: 20,
            }}
          >
            23 seguidores • 4 seguindo
          </Text>

          {/* Botão Seguir */}
          <TouchableOpacity
            style={{
              backgroundColor: "rgba(139, 69, 19, 0.8)",
              paddingHorizontal: 40,
              paddingVertical: 12,
              borderRadius: 25,
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              FulanoDTown "nick do spotify"
            </Text>
          </TouchableOpacity>

          {/* Info do usuário */}
          <Text
            style={{
              color: "white",
              fontSize: 14,
              marginBottom: 20,
            }}
          >
            yrCapsaicin 🎵 naousoiphone
          </Text>
        </View>

        {/* Bio */}
        <View
          style={{
            marginHorizontal: 20,
            backgroundColor: "rgba(139, 69, 19, 0.6)",
            borderRadius: 20,
            padding: 20,
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 16,
              lineHeight: 24,
            }}
          >
            eeeer amo ouçar musga{"\n"}amo tumati tamem
          </Text>
        </View>

        {/* Tags de gêneros */}
        <View style={{ paddingHorizontal: 20, marginBottom: 30 }}>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {["Rock", "Metal industrial", "Forró", "Glam Rock"].map((genero) => (
              <TouchableOpacity
                key={genero}
                style={{
                  backgroundColor: "rgba(255, 182, 193, 0.8)",
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: 20,
                  marginBottom: 10,
                  width: "48%",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 14,
                    textAlign: "center",
                    fontWeight: "500",
                  }}
                >
                  {genero}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Artistas mais ouvidos */}
        <View style={{ paddingHorizontal: 20, paddingBottom: 40 }}>
          <Text
            style={{
              color: "white",
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 20,
            }}
          >
            Artistas mais ouvidos
          </Text>

          {[
            { nome: "Jackson do Pandeiro", emoji: "🎵" },
            { nome: "Nirvana", emoji: "🎸" },
            { nome: "Marilyn Manson", emoji: "🎤" },
          ].map((artista) => (
            <TouchableOpacity
              key={artista.nome}
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "rgba(255, 182, 193, 0.6)",
                borderRadius: 15,
                padding: 15,
                marginBottom: 10,
              }}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: "#4A5568",
                  marginRight: 15,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "white", fontSize: 12 }}>{artista.emoji}</Text>
              </View>
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                  fontWeight: "500",
                }}
              >
                {artista.nome}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  )
}
