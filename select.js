import React, { Component, useState ,useEffect, useLayoutEffect} from "react";
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
// import Clipboard from '@react-native-community/clipboard';
import { useRoute } from '@react-navigation/native';


export default function Select({ navigation,navigator }) {

  // const copy = async () => {
  //   await   navigator.clipboard.writeText(createSession.room_id);
  //   alert('Text copied');
  // }
  const user = authentication.currentUser;

  var [room_ID,setRoom_ID] = useState('');
  const route = useRoute();

function createSession (SessionType_p){


  let room_id = shortid.generate();
  // Alert.alert(
  //   "انسخي الرمز",
  //     room_id,
  //   [
  //     {
  //       text: "إالغاء",
  //       onPress: () => console.log("Cancel Pressed"),
       
  //     },
  //     { text: "نسخ", onPress: () => console.log("Cancel Pressed")
  //     //  Clipboard.setString(room_id) 
  //     }
  //   ]
  // );
 

const GamesRef = doc(db, "Game",room_id);
const VoteRef = collection(GamesRef,"Votes")
setDoc(GamesRef, {
    ActivePlayer: [], currentPosition:"00", GameStatus: 'waiting',
    NOD: 3,
  Player:[user.email],scores:0 , RoomID:room_id, SessionType:SessionType_p}
  );
  setDoc(doc(GamesRef,"Votes","Rooms"),{
      Room1: [],
      Room2: [],
      Room3: [],
      Room4: [],
      
  })
  setDoc(doc(GamesRef,"Votes","Explorer"),{
    Player1: [],
    Player2: [],
    Player3: [],
    Player4: [],
    Player5: [],
    
})
setDoc(doc(GamesRef,"Votes","Answer"),{
    Choice1: [],
    Choice2: [],
    Choice3: [],
    Choice4: [],
    Choice5: [],
    
})
  
  return room_id;
}


const [Players, setPlayers] = useState([]);

  
useEffect(
  () =>
    onSnapshot(collection(db, "Game"), (snapshot) =>
    setPlayers(snapshot.docs.map((doc) => ({ ...doc.data() })))
    ),
    
  []
);




   function joinRandomRoom(){

    
  // const Update= (value, merge,DocToBeUpdated)=>{
        
  //   const Ref = doc(db, "Game",room_ID);
    
  //   if(DocToBeUpdated=='None'){
  //       setDoc(Ref,value,{merge:merge})
  //       .then(() => {
  //         alert("Document Updated")
  //       })
  //       .catch((error) => {
  //         alert(error.message)
  //       })}
  
  
  //       else if(DocToBeUpdated=='Room'){
  //             const myDoc = doc(Ref,"Votes","Rooms");
  //             setDoc(myDoc,value,{merge:merge})
  //           .then(() => {
  //             alert("Document Updated")
  //           })
  //           .catch((error) => {
  //             alert(error.message)
  //           })
  //       }
  
  //       else if(DocToBeUpdated=="Explorer"){
  //         const myDoc = doc(Ref,"Votes","Explorer");
  //         setDoc(myDoc,value,{merge:merge})
  //       .then(() => {
  //         alert("Document Updated")
  //       })
  //       .catch((error) => {
  //         alert(error.message)
  //       })
  //   }
  
  //   else if(DocToBeUpdated=="Answer"){
  //     const myDoc = doc(Ref,"Votes","Answer");
  //     setDoc(myDoc,value,{merge:merge})
  //   .then(() => {
  //     alert("Document Updated")
  //   })
  //   .catch((error) => {
  //     alert(error.message)
  //   })
  // }
  
  // }


    var numOfPlayers
    
    var gameStatus
    
    var playersList

    var gameType

    
    Players.map((data) => (
    
      numOfPlayers=data.Player.length,
    
      gameStatus=data.GameStatus,
    
      playersList = data.Player,

      gameType=data.SessionType
    
     
      //d(data.Player.length)
     
    
       ))
       
       for (let s of Players) {
      
   
    //  Alert.alert(s.numOfPlayers)
    //  Alert.alert(s.gameStatus)
    //  Alert.alert(s.gameType)
       
       if(s.numOfPlayers < 5 & s.gameStatus == 'public' &  s.gameType == 'waiting'){
      
        Alert.alert('existent')
        // navigation.navigate('WaitingPublic', {roomID: room_ID} ) 
        // , Update({
       
        //   "Player":arrayUnion(user.email)
      
        // },true,'None')
       
      
      }
    
       else{
    
        // createSession('public');
        // navigation.navigate('WaitingPublic', {roomID: room_ID} ) 
        // , Update({
    
        //   "Player":arrayUnion(user.email)
     
        // },true,'None')
        Alert.alert('created')
      
    }
  
       }
  
     }
     
    
    
  return (
    <View style={{ flex: 1, flexDirection: "row", backgroundColor: "#FFFFFF" }}>
      <View>
        <Text style={styles.text1}>إبدأ اللعب الآن!</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.button1}>
          <Button
            title="الدخول لغرفه عشوائيه "
            onPress={() => {
             
              joinRandomRoom();
            }}
            color="#FFFFFF"
          />
        </View>
        <View style={styles.button2}>
       
        <Button
            title="انشاء غرفه خاصه"
            onPress={() => {
              let roomid = createSession('private');
              navigation.navigate("WaitingRoom",{roomID: roomid });
             
            }}
            color="#FFFFFF"
            
          />
        </View>
        <View style={styles.button3}>
        <Button
            title="الدخول لغرفه خاصه "
            onPress={() => {
              navigation.navigate("Top");
             
            }}
            color="#FFFFFF"
          />

        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:'#F2F2F2',
    left:214,
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
    left: 120,
    fontSize: 22,
    lineHeight: 41,
    fontWeight: "bold",
    letterSpacing: -0.3,
    color: "#4C5785",
    fontStyle: "normal",
    flex: 1,
  },
  button3: {
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
    top: 600,
    backgroundColor: "#6F97B1",
    borderRadius: 100,

  },
});
 
 