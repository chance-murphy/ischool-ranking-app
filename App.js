import React from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import { SchoolList } from './iSchoolData'


export default class App extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <SchoolList/>
      </SafeAreaView>
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
});
