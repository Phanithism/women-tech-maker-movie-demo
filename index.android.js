/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView
} from 'react-native';

import axios from 'axios';

export default class movieDemo extends Component {

  constructor() {
    super();
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: this.ds.cloneWithRows([]),
    };
  }

  componentWillMount () {
    axios.get('https://yts.ag/api/v2/list_movies.json').then(response => {
      console.log(response.data.data.movies);
      this.setState({dataSource: this.ds.cloneWithRows(response.data.data.movies)})
    })

  }

  render() {
    return (
      <ListView
        enableEmptySections={false}
        dataSource={this.state.dataSource}
        renderRow={(rowData) => <Text>Title: {rowData.title} - Rating: {rowData.rating}</Text>}
      />
    );
  }
}

AppRegistry.registerComponent('movieDemo', () => movieDemo);
