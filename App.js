
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: []
        }
    }

componentDidMount () {

  return fetch('https://eats-easy-spring.herokuapp.com/api/restaurants')
      .then (response => response.json())
      .then(responseJson => {
          this.setState({
            dataSource: responseJson
    
          })

    })
      .catch((error) => {
        console.log(error)
      });
}

    render() {
 
            let restaurants = this.state.dataSource.map((val, key) => {
                return <View key={key} style={styles.item}><Text>{val.restaurantName}</Text></View>
            });
            return (
                <View style={styles.container}>
                    
                    {restaurants}
                </View>
            );

    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        flex: 1,
        alignSelf: 'stretch',
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    }
});



/* 
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: []
        }
    }

componentDidMount () {

  return fetch('https://facebook.github.io/react-native/movies.json')
      .then (response => response.json())
      .then(responseJson => {
          this.setState({
            dataSource: responseJson.movies
    
          })

    })
      .catch((error) => {
        console.log(error)
      });
}

    render() {
 
            let movies = this.state.dataSource.map((val, key) => {
                return <View key={key} style={styles.item}><Text>{val.title}</Text></View>
            });
            return (
                <View style={styles.container}>
                    
                    {movies}
                </View>
            );

    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        flex: 1,
        alignSelf: 'stretch',
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    }
}); */