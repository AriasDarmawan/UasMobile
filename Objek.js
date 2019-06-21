import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements'
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import Header from './Header';

export default class Objek extends Component {
  constructor(props) {
    super(props)
    prefik_url = ' ';
    
    this.state = {
      atk: [],
    };
  }
  componentDidMount() {
    const id = this.props.navigation.state.params.id
    axios.get(`https://ariasdarmawan.000webhostapp.com/atk/getAtk.php?id_kategori=` + id)
      .then(res => {
        const atk = res.data;
        console.log(atk);
        this.setState({ atk });
      })
  }

  keyExtractor = (item, index) => index.toString()
  renderItem = ({ item }) => (
    <ListItem
      title={item.nama_atk}
      leftAvatar={{ source: { uri: prefik_url + item.url_gambar } }}
      onPress={
        () => {
          this.props.navigation.navigate('Detail', { id: item.id_atk, title: item.harga })
        }
      }
    />
  )
  render() {
    const title = this.props.navigation.getParam('title', 'NO-TITLE');

    return (
      <View style={styles.container} >
        <Header judul={"DAFTAR ATK"} />
        <FlatList
          keyExtractor={this.keyExtractor}
          data={this.state.atk}
          renderItem={this.renderItem}
        />
        <ActionButton buttonColor="red">
          <ActionButton.Item buttonColor='#9b59b6' title="Tambah Daftar ATK" onPress={() => this.props.navigation.navigate('AddCategory')}>
            <Icon name="md-create" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box4: {     
    flex:0.220,    
    backgroundColor: "#DC143C",     
    alignItems: 'center',
    justifyContent: 'center'  
},   
text3:{     
    fontSize:20,     
    color:'black', 
    alignItems: 'center',
    justifyContent: 'center'
  }, 
actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});
