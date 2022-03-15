import React, { Component, useState ,useEffect,useLayoutEffect} from "react";
import {
  View,
  StyleSheet,
  Text, 
  Button,
  Image,
  Alert,
} from "react-native";
import { db } from './Firebase/firebase';
import { authentication } from './Firebase/firebase';
import { collection, doc, setDoc ,onSnapshot,query,querySnapshot,where,arrayUnion,getDoc, addDoc} from "firebase/firestore"; 
import shortid from 'shortid'
import { useRoute } from '@react-navigation/native';


export default function WaitingRoom({ navigation,navigator,route }) {
     const { roomID } = route.params;
//     var [roomCode, setroomCode]=useState([]);
//     setroomCode=roomID;
//   const route2 = useRoute();


  const [Players, setPlayers] = useState([]);

  useLayoutEffect(() => {
 const collectionRef = collection(db,'Game');
 const q = query(collectionRef, where('RoomID', '==',roomID));
 const unsubscribe = onSnapshot(q, (querySnapshot) => {
     setPlayers(
         querySnapshot.docs.map(doc => ({
            Player:doc.data().Player,
     }))
     );
  });
  return () => unsubscribe
},
[]);

  return (
    <View style={{ flex: 1, flexDirection: 'column',top:190, left:30,}}>
    
    {Players.map((data) => (
      <View  key={data.id}>
      <Text >{data.Player.length}</Text>
      
      </View>
       ))}
      
      <View >
    
      
      </View>
     <Text>شاركي الرمز : {roomID} </Text>
      <Button title={'إبدا اللعبة ' } onPress={()=>  navigation.navigate('game', {roomID: 'ItjunPByu'})} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:'#F2F2F2',
    padding:90,
    top:90,
    bottom:90,
  },
  button1: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    fontSize: 14,
    lineHeight: 26,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: -0.3,
    position: "absolute",
    width: 224,
    height: 58,
    top: 411,
    left:-120,
    right:-90,    
    borderRadius: 100,
    alignSelf: "center",
    position: "absolute",
    alignContent: "center",
    backgroundColor: "#6F97B1",
  },
  button2: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    fontSize: 14,
    lineHeight: 26,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: -0.3,
    position: "absolute",
    width: 224,
    height: 58,
    top: 500,
    left:-120,
    right:-90,
    borderRadius: 100,
    alignSelf: "center",
    position: "absolute",
    alignContent: "center",
    backgroundColor: "#AFD1CB",
  },
  text1: {
    position: "absolute",
    top: 280,
    textAlign: "center",
    alignSelf: "center",
    left: 140,
    fontSize: 22,
    lineHeight: 41,
    fontWeight: "bold",
    letterSpacing: -0.3,
    color: "#4C5785",
    fontStyle: "normal",
    flex: 1,
  },
  
});
 

