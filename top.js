
import React,{Component, useState,useLayoutEffect, useEffect} from 'react';
import {
    View,
    StyleSheet,
    Text, 
    Button,
    Image,
    TextInput,
    Alert,
    AppRegistry,
  } from "react-native"; 
  import { useRoute } from '@react-navigation/native';
  import { collection, doc, setDoc ,onSnapshot,query,querySnapshot,where,arrayUnion,getDoc, addDoc} from "firebase/firestore"; 
  import { db } from './Firebase/firebase';
  import { authentication } from './Firebase/firebase';

export default function Top({ navigation }) {
  const user = authentication.currentUser;

  const [room_ID,setRoom_ID] = useState('');
    const route = useRoute();

  const Update= (value, merge,DocToBeUpdated)=>{
        
    const Ref = doc(db, "Game",room_ID);
    
    if(DocToBeUpdated=='None'){
        setDoc(Ref,value,{merge:merge})
        .then(() => {
          alert("Document Updated")
        })
        .catch((error) => {
          alert(error.message)
        })}
  
  
        else if(DocToBeUpdated=='Room'){
              const myDoc = doc(Ref,"Votes","Rooms");
              setDoc(myDoc,value,{merge:merge})
            .then(() => {
              alert("Document Updated")
            })
            .catch((error) => {
              alert(error.message)
            })
        }
  
        else if(DocToBeUpdated=="Explorer"){
          const myDoc = doc(Ref,"Votes","Explorer");
          setDoc(myDoc,value,{merge:merge})
        .then(() => {
          alert("Document Updated")
        })
        .catch((error) => {
          alert(error.message)
        })
    }
  
    else if(DocToBeUpdated=="Answer"){
      const myDoc = doc(Ref,"Votes","Answer");
      setDoc(myDoc,value,{merge:merge})
    .then(() => {
      alert("Document Updated")
    })
    .catch((error) => {
      alert(error.message)
    })
  }
  
  }


const [Players, setPlayers] = useState([]);
  
  useEffect(() => {
    const collectionRef = collection(db,'Game');
    const q = query(collectionRef, where('RoomID', '==',room_ID));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        setPlayers(
            querySnapshot.docs.map(doc => ({
               Player:doc.data().Player,
               GameStatus:doc.data().GameStatus,
        }))
        );
     });
     return () => unsubscribe
   },
   []);


function validateEntry(){

var numOfPlayers

var gameStatus

var playersList

Players.map((data) => (

  numOfPlayers=data.Player.length,

  gameStatus=data.GameStatus,

  playersList = data.Player



  //d(data.Player.length)
 

   ))
   if(numOfPlayers >= 5 & !(playersList.includes(user.email))){

    Alert.alert('الغرفة ممتلئة ')

  }

 else{

   if(gameStatus == "Started"){

    // navigation.navigate('game', {roomID: room_ID} )

    Alert.alert('l');

   }

   else{

    navigation.navigate('WaitingRoom', {roomID: room_ID} ) 
    // , Update({

    //   "Player":arrayUnion(user.email)

    // },true,'None')

Alert.alert('k');
   }

}



 }
 


 return (
   <View  style={styles.container}>
 
     <TextInput style={styles.container1} value={ room_ID} onChangeText= {(text) => setRoom_ID(text) } /> 
    
<Button title={"press"} onPress={()=>   validateEntry() } />
    </View>
 );
}
const styles = StyleSheet.create({
    container : {
        flex            : 1,  
        alignItems      : "center",
        justifyContent  : "center",
    },
    container1:{
        borderRadius:3,
        borderColor:'red',
        borderWidth:3,
        width:80,
    }
});