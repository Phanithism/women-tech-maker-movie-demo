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
  ListView,
  Image
} from 'react-native';

import axios from 'axios';
import StarRating from 'react-native-star-rating';

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

  _renderMovie (item) {
    return (
      <View style={{flex: 1, flexDirection: 'row', borderWidth: 0.2, borderBottomColor: 'gray'}}>
        <View style={{flex: 0.3, padding: 2}}>
          <Image source={{uri: item.medium_cover_image}} style={{width: 100, height: 150, borderRadius: 2}}/>
        </View>
        <View style={{flex: 0.7, flexDirection: 'column', paddingRight: 5}}>
          <View style={{flex: 0.3}}>
            <Text style={{fontSize: 14, fontWeight: 'bold'}}> {item.title_long} - {item.mpa_rating}</Text>
          </View>
          <View style={{flex: 0.5}}>
            <Text numberOfLines={5}> {item.description_full} </Text>
          </View>
          <View style={{paddingRight: 120}}>
            <StarRating starSize={25} disabled={true} rating={item.rating} starColor={'#D4AF37'}/>
          </View>
        </View>
      </View>
    )
  }

  render() {
    return (
      <ListView
        enableEmptySections={true}
        dataSource={this.state.dataSource}
        renderRow={(rowData) => this._renderMovie(rowData)}
      />
    );
  }
}

AppRegistry.registerComponent('movieDemo', () => movieDemo);
