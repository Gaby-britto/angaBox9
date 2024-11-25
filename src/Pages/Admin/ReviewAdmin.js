import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View, ScrollView, ActivityIndicator} from 'react-native';
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';

import CardReviewAdmin from '../../Componentes/Cards/CardReviewAdmin';
import axios from 'axios';
import FooterAdmin from '../../Componentes/Footer/FooterAdmin';
import { useRoute } from '@react-navigation/native';

export default function ReviewAdmin() {
  const route = useRoute();
  const { id } = route.params || {};
  const [movie, setMovie] = useState(null);
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
  });

  
  const listMovies = async () => {
    try {
      const response = await axios.get(`http://10.92.198.21:8080/api/movie/${id}`);
      setMovie(response.data.movieFound);
    } catch (error) {
      console.error("Erro ao buscar o filme:", error);
    }
  };

  useEffect(() => {
    listMovies();
  }, [id]);

  useEffect(() => {
    if (movie) {
      console.log("obj", movie);
      console.log("objeto", movie.title);
    }
  }, [movie]);

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#9400D3" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
      {movie && (
          <>
            <Image
              style={styles.imageHeader}
              source={require("../../Assets/Images/header.png")}
            />
            <Image style={styles.image} source={{ uri: movie.img }} />
            <Text style={styles.title}>
              {movie?.title || "Titulo indisponível"}
            </Text>
            <Text style={styles.question}>
              {movie?.description || "Descrição indisponível"}
            </Text>
          </>
        )}
        <CardReviewAdmin/>
      </ScrollView>
      <FooterAdmin />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 80,
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  imageHeader: {
    position: 'absolute',
    width: '100%',
    height: 200,
  },
  image: {
    width: 200,
    marginLeft: 10,
    height: 250,
    borderRadius: 10,
    marginBottom: 20,
    resizeMode: 'cover',
    marginTop: 100,
  },
  title: {
    marginLeft: 10,
    fontSize: 32,
    color: 'black',
    marginBottom: 10,
    fontFamily: 'Montserrat_700Bold',
  },
  question: {
    textAlign: 'justify',
    padding: 15,
    color: 'gray',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
    fontFamily: 'Montserrat_400Regular',
  },
  containerButton: {
    alignItems: 'center',
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 10,
    marginBottom: 10,
    color: '#9400D3',
    fontFamily: 'Montserrat_700Bold',
  },
  divider: {
    marginLeft: 10,
    flex: 1,
    height: 1.5,
    width: 385,
    backgroundColor: '#9400D3',
    marginVertical: 10,
  },
  reviewText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
    fontFamily: 'Montserrat_400Regular',
    marginBottom: 10,
  },
  
});
