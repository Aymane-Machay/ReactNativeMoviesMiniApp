import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Dimensions } from 'react-native';
import axios from 'axios';

const API_KEY = '152f41397d36a9af171b938124f0281c';
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get(API_URL)
      .then(response => {
        setMovies(response.data.results);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const renderMovie = (movie) => {
    return (
      <View key={movie.id} style={styles.movie}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}` }}
          style={styles.poster}
        />
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.rating}>{movie.vote_average}/10</Text>
      </View>
    );
  };

  const numColumns = 6;
  const screenWidth = Dimensions.get('window').width;
  const itemWidth = screenWidth / numColumns;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.movieContainer}>
        {movies.map(movie => renderMovie(movie))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
  },
  movieContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  movie: {
    width: Dimensions.get('window').width / 6,
    alignItems: 'center',
    marginBottom: 10,
  },
  poster: {
    width: Dimensions.get('window').width / 6 - 10,
    height: Dimensions.get('window').width / 4,
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  rating: {
    fontSize: 14,
    color: 'white',
  },
});

export default MovieList;