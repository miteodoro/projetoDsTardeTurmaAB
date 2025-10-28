import React, { useMemo } from "react";
import { Text, TouchableOpacity, TextInput, View, StyleSheet, Image, useWindowDimensions } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { RFValue as rf } from "react-native-responsive-fontsize";

export default function Index() {
  const roteador = useRouter();
  const { width } = useWindowDimensions();

  function cadastro() {
    roteador.push('/cadastrar');
  }
  function entrar() {
    roteador.push('/Swipes');
  }

  const dynamicStyles = useMemo(
    () => ({
      logo: { width: 180, height: 180, resizeMode: 'contain' },
    }),
    [width]
  );

  return (
    <LinearGradient
      colors={['#fedea6','#fc7ea7', '#7466e6']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {/* Bloco superior com a logo e os textos */}
      <View style={styles.header}>
        <Image
          style={[styles.logo, dynamicStyles.logo]}
          source={require('../assets/Logo.png')}
          accessibilityLabel="Logo do aplicativo"
        />
        <Text style={styles.title}>Descubra Música Local</Text>
        <Text style={styles.subtitle}>Conecte-se com artistas da sua região</Text>
      </View>

      {/* Formulário e botões */}
      <View style={styles.formContainer}>
        <View style={styles.form}>
          <View style={styles.inputBlock}>
            <Text style={styles.label}>E-mail</Text>
            <TextInput
              style={styles.input}
              placeholder="email@exemplo.com"
              placeholderTextColor="#aaa"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputBlock}>
            <Text style={styles.label}>Senha</Text>
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              secureTextEntry={true}
              placeholderTextColor="#aaa"
            />
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={entrar}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={cadastro}>
          <Text style={styles.footer}>
            Não tem uma conta?{' '}
            <Text style={styles.footerLink}>Cadastre-se</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginTop: 50,
  },
  logo: {
    marginBottom: 20,
  },
  formContainer: {
    width: '100%',
  },
  form: {
    marginBottom: 20,
  },
  inputBlock: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 6,
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#000',
    paddingHorizontal: 14,
    fontSize: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#444',
    textAlign: 'center',
    marginTop: 6,
  },
  footer: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
  },
  footerLink: {
    color: '#000',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
