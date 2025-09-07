import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { URL } from '../BASE_URL';

const API_BASE_URL = URL; // Replace with your backend URL

export default function ManageScreen() {

  const [dataList, setDataList] = useState([]);
  const [inputText, setInputText] = useState('');
  const [responseMsg, setResponseMsg] = useState('');
  const responseTimeout = useRef(null);

  useEffect(() => {

      fetchData();
    // cleanup on unmount or when manage closes
    return () => {
      if (responseTimeout.current) clearTimeout(responseTimeout.current);
    };
  },[]);

  const showResponse = (msg) => {
    setResponseMsg(msg);
    responseTimeout.current = setTimeout(() => setResponseMsg(''), 3000);
  };

  const fetchData = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/manage/`);
      setDataList(res.data.message); // get 10 items
    } catch (err) {
      Alert.alert('Error', 'Failed to fetch data', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/youtube/${id}/`);
      showResponse('Deleted successfully');
      // refresh list
      fetchData();
    } catch (err) {
      Alert.alert('Error', 'Failed to delete');
    }
  };

  const handleSubmit = async () => {
    if (!inputText.trim()) return Alert.alert('Error', 'Please enter text');
    try {
      const res = await axios.post(`${API_BASE_URL}/youtube/`, { yt_id: inputText });
      showResponse(res.data.message || 'Submitted successfully');
      setInputText('');
      fetchData();
    } catch (err) {
        
      console.log("err", err)  
      Alert.alert('Forbidden', "Unable to reach server ensure 'IP' is correctly configure or Size is already reached");

    }
  };

  return (
    <View style={styles.container}>

        <>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Type here"
              value={inputText}
              onChangeText={setInputText}
            />
            <Button title="Submit" onPress={handleSubmit} />
          </View>

          {responseMsg ? <Text style={styles.responseMsg}>{responseMsg}</Text> : null}

          <FlatList
            data={dataList}
            keyExtractor={(item) => item[0]}
            renderItem={({ item }) => (
              <View style={styles.listItem}>
                <Text style={styles.itemText}>{item[1]}</Text>
                <TouchableOpacity onPress={() => handleDelete(item[0])} style={styles.deleteButton}>
                  <Text style={styles.deleteText}>🗑️</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1 },
  manageButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 12,
  },
  manageButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  inputContainer: { flexDirection: 'row', marginBottom: 12, alignItems: 'center' },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    marginRight: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  responseMsg: {
    textAlign: 'center',
    color: 'green',
    marginBottom: 12,
    fontWeight: '600',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#ddd',
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  itemText: { fontSize: 16 },
  deleteButton: { padding: 8 },
  deleteText: { fontSize: 18, color: 'red' },
});
