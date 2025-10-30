import React, { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');
const SQUARE_WIDTH = width * 0.8;
const SQUARE_HEIGHT = height * 0.6;

const profiles = [
  { id: 1, name: 'Perfil 1' },
  { id: 2, name: 'Perfil 2' },
  { id: 3, name: 'Perfil 3' },
  { id: 4, name: 'Perfil 4' },
];

export default function TinderSwipeSquare() {
  const roteador = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const position = useRef(new Animated.ValueXY()).current;

  // Estados de exibição dos popups
  const [showHeart, setShowHeart] = useState(false);
  const [showX, setShowX] = useState(false);

  const heartAnim = useRef(new Animated.Value(0)).current;
  const xAnim = useRef(new Animated.Value(0)).current;

  function uploadMusic() {
    roteador.push('/uploadMusic');
  }

  function perfil() {
    roteador.push('/perfil');
  }

  // Função para mostrar o pop-up de coração ❤️
  const showHeartPopup = () => {
    setShowHeart(true);
    heartAnim.setValue(0);
    Animated.sequence([
      Animated.spring(heartAnim, { toValue: 1, useNativeDriver: true }),
      Animated.timing(heartAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
    ]).start(() => setShowHeart(false));
  };

  // Função para mostrar o pop-up de X ❌
  const showXPopup = () => {
    setShowX(true);
    xAnim.setValue(0);
    Animated.sequence([
      Animated.spring(xAnim, { toValue: 1, useNativeDriver: true }),
      Animated.timing(xAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
    ]).start(() => setShowX(false));
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,

      onPanResponderMove: (evt, gestureState) => {
        position.setValue({ x: gestureState.dx, y: gestureState.dy });
      },

      onPanResponderRelease: (evt, gesture) => {
        if (gesture.dx > 120) {
          showHeartPopup(); // ❤️ aparece ao dar like
          Animated.timing(position, {
            toValue: { x: width * 1.5, y: gesture.dy },
            duration: 250,
            useNativeDriver: false,
          }).start(() => {
            nextCard();
          });
        } else if (gesture.dx < -120) {
          showXPopup(); // ❌ aparece ao dar dislike
          Animated.timing(position, {
            toValue: { x: -width * 1.5, y: gesture.dy },
            duration: 250,
            useNativeDriver: false,
          }).start(() => {
            nextCard();
          });
        } else {
          // Voltar ao centro
          Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  const nextCard = () => {
    position.setValue({ x: 0, y: 0 });
    setCurrentIndex((prev) => (prev + 1) % profiles.length);
  };

  const rotate = position.x.interpolate({
    inputRange: [-width / 2, 0, width / 2],
    outputRange: ['-15deg', '0deg', '15deg'],
  });

  const animatedStyle = {
    transform: [...position.getTranslateTransform(), { rotate }],
    marginHorizontal: 20,
  };

  return (
    <View style={styles.container}>
      {currentIndex < profiles.length && (
        <Animated.View style={[styles.card, animatedStyle]} {...panResponder.panHandlers}>
          <Text style={styles.profileName}>{profiles[currentIndex].name}</Text>
          <Text style={styles.instruction}>Arraste para curtir ou rejeitar</Text>
        </Animated.View>
      )}

      {currentIndex >= profiles.length && <Text style={styles.finished}>Não há mais perfis</Text>}

      {/* ❤️ Pop-up de Like */}
      {showHeart && (
        <Animated.View
          style={[
            styles.popup,
            {
              opacity: heartAnim,
              transform: [{ scale: heartAnim }],
            },
          ]}
        >
          <Text style={styles.heart}>❤️</Text>
        </Animated.View>
      )}

      {/* ❌ Pop-up de Dislike */}
      {showX && (
        <Animated.View
          style={[
            styles.popup,
            {
              opacity: xAnim,
              transform: [{ scale: xAnim }],
            },
          ]}
        >
          <Text style={styles.cross}>❌</Text>
        </Animated.View>
      )}

      <TouchableOpacity style={styles.button} onPress={uploadMusic}>
        <Text style={styles.buttonText}>🎵 Enviar sua música</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={perfil}>
        <Text style={styles.buttonText}>👤 Ir para o seu perfil</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: SQUARE_WIDTH,
    height: SQUARE_HEIGHT,
    backgroundColor: '#f8f8f8',
    borderRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  instruction: {
    fontSize: 16,
    color: '#888',
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    width: '70%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'negrito',
  },
  finished: {
    fontSize: 22,
    color: '#999',
  },
  popup: {
    position: 'absolute',
    top: '40%',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10,
  },
  heart: {
    fontSize: 80,
    color: 'red',
  },
  cross: {
    fontSize: 80,
    color: 'red',
  },
});
