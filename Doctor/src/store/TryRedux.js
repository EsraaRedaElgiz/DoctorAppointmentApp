import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

function TryRedux(props) {
  const state = useSelector(state => state);
  return (
    <View style={styles.container}>
      <Text style={styles.counterText}>Counter : {state.counter} </Text>
      <View style={styles.btnView}>
        <Button title="Increase +" />
        <Button title="Decrease -" />
      </View>
      <Button title="Hide | Show Counter" style={styles.hideShowBtn} />
    </View>
  );
}
function Button(props) {
  const {title, style} = props;
  return (
    <TouchableOpacity style={[styles.buttun, style]}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  counterText: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
    marginVertical: 20,
  },
  btnView: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  buttun: {
    width: 100,
    height: 45,
    backgroundColor: '#c9c',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
    marginRight: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  hideShowBtn: {
    width: 200,
  },
});

export default TryRedux;
