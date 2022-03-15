
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, AppRegistry, Alert } from 'react-native';
import {MaterialCommunityIcons as Icon} from 'react-native-vector-icons';
import React, { useState ,useEffect ,useLayoutEffect} from 'react';
import { db } from './Firebase/firebase';
import { authentication } from './Firebase/firebase';
import { collection, doc, setDoc ,onSnapshot,query,querySnapshot,where,arrayUnion,getDoc, addDoc} from "firebase/firestore"; 
import shortid from 'shortid'
import Board from './board';
// import GameSession from './gametest';

export default function Game ( {route,navigation,Component }) {
  let board = Board();

// ------------------------update
 const [Gamesession, setGamesession] = useState([]);

 function Update (value, merge,DocToBeUpdated){
   const Ref = doc(db, "Game",roomID);
   
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
 
 //-----------------------------end update

  const user = authentication.currentUser;
  // const { roomID } = route.params;
   const roomID = 'nZNuWob2U'

  const GamesRef = doc(db, "Game",roomID);
  // function room_ID (){ 
  //   let room_id = shortid.generate();
  // return room_id;
  // }
  // let roomid =room_ID();


   //---------W


//const VoteRef = collection(GamesRef,"Votes")
// setDoc(GamesRef, {
//     ActivePlayer: ['','','','',''], currentPosition:"00", GameStatus: "waiting",
//     NOD: 3, VoteAnswer: [0,0,0,0],
//     VoteExplorer: [0,0,0,0,0] , VoteRoom: [0,0,0,0],
//   Player:['','','','',''],scores:0 , RoomID:roomid,SessionType:''}
//   );
//   setDoc(doc(GamesRef,"Votes","Rooms"),{
//       Room1: [],
//       Room2: [],
//       Room3: [],
//       Room4: [],
      
//   })
//   setDoc(doc(GamesRef,"Votes","Explorer"),{
//     Player1: [],
//     Player2: [],
//     Player3: [],
//     Player4: [],
//     Player5: [],
    
// })
// setDoc(doc(GamesRef,"Votes","Answer"),{
//     Choice1: [],
//     Choice2: [],
//     Choice3: [],
//     Choice4: [],
//     Choice5: [],
    
// })
  
  

 
//-----------R


function validateRoomVote(value){

  Update({"Room1":arrayRemove(user.email)},true,'Room');
  Update({"Room2":arrayRemove(user.email)},true,'Room');
  Update({"Room3":arrayRemove(user.email)},true,'Room');
  Update({"Room4":arrayRemove(user.email)},true,'Room');
  
  if(value=="Room1")
    {
      Update({
        "Room1":arrayUnion(user.email)
      },true,'Room')
    }
  else if(value=="Room2")
    {
      Update({
        "Room2":arrayUnion(user.email)
      },true,'Room')
    }
    else if(value=="Room3")
    {
      Update({
        "Room3":arrayUnion(user.email)
      },true,'Room')
    }
    else if(value=="Room4")
    {
      Update({
        "Room4":arrayUnion(user.email)
      },true,'Room')
    }
}


function validateAnswerVote(value){
  

    Update({"Choice1":arrayRemove(user.email)},true,'Answer');
    Update({"Choice2":arrayRemove(user.email)},true,'Answer');
    Update({"Choice3":arrayRemove(user.email)},true,'Answer');
    Update({"Choice4":arrayRemove(user.email)},true,'Answer');
    
    if(value=="Choice1")
      {
        Update({
          "Choice1":arrayUnion(user.email)
        },true,'Answer')
      }
    else if(value=="Choice2")
      {
        Update({
          "Choice2":arrayUnion(user.email)
        },true,'Answer')
      }
      else if(value=="Choice3")
      {
        Update({
          "Choice3":arrayUnion(user.email)
        },true,'Answer')
      }
      else if(value=="Choice4")
      {
        Update({
          "Choice4":arrayUnion(user.email)
        },true,'Answer')
      }
  
}



//Votes 
function validateExplorerVote(value){
    

  Update({"Player1":arrayRemove(user.email)},true,'Explorer');
  Update({"Player2":arrayRemove(user.email)},true,'Explorer');
  Update({"Player3":arrayRemove(user.email)},true,'Explorer');
  Update({"Player4":arrayRemove(user.email)},true,'Explorer');
  Update({"Player5":arrayRemove(user.email)},true,'Explorer');
  if(value=="Player1")
    {
      Update({
        "Player1":arrayUnion(user.email)
      },true,'Explorer')
    }
  else if(value=="Player2")
    {
      Update({
        "Player2":arrayUnion(user.email)
      },true,'Explorer')
    }
    else if(value=="Player3")
    {
      Update({
        "Player3":arrayUnion(user.email)
      },true,'Explorer')
    }
    else if(value=="Player4")
    {
      Update({
        "Player4":arrayUnion(user.email)
      },true,'Explorer')
    }
    else if(value=="Player5")
    {
      Update({
        "Player5":arrayUnion(user.email)
      },true,'Explorer')
    }
}


const [Player, setPlayer] = useState([]);



useLayoutEffect(() => {
 const collectionRef = collection(db,'Game',roomID,'Votes');
 //const collectionRef = doc(db,'Game',roomID);
 const q = query(collectionRef, where('Room2', 'array-contains',user.email)
 );
 
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    
     setPlayer(
         querySnapshot.docs.map(doc => ({
           Room2:doc.data().Room2,
     }))
     );
    
  }
  );
  return () => unsubscribe
},
[]);

// useLayoutEffect(() => {
//  const collectionRef = collection(db,'Game');
//  const q = query(collectionRef, where('RoomID', '==',roomID));
//  const unsubscribe = onSnapshot(q, (querySnapshot) => {
//      setPlayer(
//          querySnapshot.docs.map(doc => ({
//            currentPosition:doc.data().currentPosition,
//      }))
//      );
//   });
//   return () => unsubscribe
// },
// []);


//      const [Player, setPlayer] = useState([]);
//    useLayoutEffect(() => {
//     const collectionRef = collection(db,'Game');
//     const q = query(collectionRef, where('RoomID', '==',roomID));
//     const unsubscribe = onSnapshot(q, (querySnapshot) => {
         
//         setPlayer(
//             querySnapshot.docs.map(doc => ({
           
//               scores:doc.data().scores,

//         }))
//         );
//      });
//      return () => unsubscribe
// }, 
// []);

// const validateVote = () => {

// const docRef = doc(db,'Game',roomID,'Votes','Rooms');
// const docSnap =  getDoc(docRef);

// if (docSnap.exists()) {
//   console.log("Document data:", docSnap.data());
// } else {
//   // doc.data() will be undefined in this case
//   console.log("No such document!");
// }
// if (data.Room2){

// }
// }

function Update (value, merge,DocToBeUpdated){
  const Ref = doc(db, "Game",roomID);
  
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


// useEffect(
//   () =>
//     onSnapshot(doc(db,'Game',roomID,'Votes','Rooms'), where('Room2', 'array-contains','h'),(snapshot) =>
//       setGamesession(snapshot.docs.map((doc) => ({ ...doc.data()})))
//     ),
    
//   []
// );
       

let count=0;



  var currentPosition=[0,0];
  var currentPlayer=1;
  var gameState=
  [
    ['C','F','P','F','S','S'],
    ['F','S','F','F','S','S'],
    ['P','F','F','P','F','S'],
    ['F','S','F','F','S','S'],
    ['S','F','P','F','S','S'],
    ['S','S','F','S','S','D']
  ]



const initializaGame =() => {
gameState=
  [
    ['C','F','P','F','S','S'],
    ['F','S','F','F','S','S'],
    ['P','F','F','P','F','S'],
    ['F','S','F','F','S','S'],
    ['S','F','P','F','S','S'],
    ['S','S','F','S','S','D']
  ]
  currentPosition=[0,0]
 currentPlayer=1;

}
 const createBoard =() => {
  var Rows= [1,-1];
  var Cols=[6,-6];
  var currentRow=0;
  var currentCols=0;
  var gameBoard=[
    [1,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0]
];

    while (currentRow!=5 & currentCols!=5){
      var randomRow = Rows[Math.floor(Math.random() * Rows.length)];
      var randomCols= Cols[Math.floor(Math.random() * Cols.length)];
      currentRow+=randomRow;
      currentCols+=randomRow;
      gameBoard[currentRow][currentCols]=1}

      

}


const getWinner = (row,col) => {
  if (gameState[row][col]=='F'){
    Alert.alert("Be careful!! \n A pessimist is nearby! ");
  }
  else if (gameState[row][col]=='P'){
    Alert.alert("Oops!\n You Entered a pessimist Room :("); 
    initializaGame();
  }
  


}

const onTilePress = (row,col) =>{

//   const docRef =  setDoc(doc(db, 'Game','kkkkk'), {
//     Player: [],
//    RoomID: '',
//  ActivePlayer:[],
//   GameStatus:'waiting',
//      NOD:4,
//   currentPosition:'01',
//   });
  // const ref = doc(db, 'Game').withConverter(GameSession.gameSessionConverter);
  //  setDoc(ref, new GameSession("1234",'fa', [],'waiting',4,'01'));

  if ((currentPosition[0]==row  & (currentPosition[1]+ 1==col | currentPosition[1]-1==col) ) | ((currentPosition[0]+ 1==row | currentPosition[0]-1==row) & currentPosition[1]==col )){
    if (currentPosition[0]- 1==row & currentPosition[1] == col){Update({
        "Room1":arrayUnion(user.email)
      },true,'Room');

      }
    if(currentPosition[0]==row  & currentPosition[1]+ 1==col){Update({
        "Room2":arrayUnion(user.email)
      },true,'Room')}
    if(currentPosition[0]+ 1==row & currentPosition[1] == col){Update({
        "Room3":arrayUnion(user.email)
      },true,'Room')}
    if(currentPosition[0]==row  & currentPosition[1]- 1==col){Update({
        "Room4":arrayUnion(user.email)
      },true,'Room')}
    
    if (gameState[row][col]=='P'){
      Alert.alert("Oops!\n You Entered a pessimist Room :("); 
      initializaGame();
    }
    else if (gameState[row][col]=='D'){
      Alert.alert("You Won !!"); 
      initializaGame();
    }
    else if (gameState[row][col]=='F'){
        Alert.alert("Be careful!! \n A pessimist is nearby! ");
      }
      
      var arr = gameState.slice();
      var CP = [row,col];
      arr[currentPosition[0]][currentPosition[1]];
      arr[row][col] = 'C';
      gameState=arr;
      currentPosition=CP;
      Update({
        "currentPosition":currentPosition[0]+''+currentPosition[1]
      },true,'None')
      Update({
        "currentPosition":currentPosition[0].toString+currentPosition[1].toString
      },true,'No')
      renderIcon(row,col);
    
}

const VoteForRoom = (row,col) =>{}

}
const renderIcon=(row,col) => {
  
  var value = gameState[row][col];
  switch(value){
    case 'F': return<Icon name="triangle" style={styles.tileF}/>;
    case 'S': return <Icon name="circle-outline" style={styles.tileO}/>;
    case'P': return <Icon name="close" style={styles.tileX}/>;
    case 'C':return <Icon name="anchor" style={styles.tileC}/>;
    default: return <View/>;

  }
}



//return class extends React.Component {

 // render() {

 //              <Text style={styles.mytext}>  أهلاً بك {data.scores} </Text>

  return (
    <View style={styles.container}>
     
     {Player.map((data) => (

<View key={data.id} >

  <Text style={styles.mytext}>  أهلاً بك {data.Room2} </Text>

</View>

))}
  
              <View style={{flexDirection: "row"}}>
      <TouchableOpacity onPress={()=> onTilePress(0,0)
      }  style={styles.tile}>
          
          {renderIcon(0,0)//Update({"Player":arrayUnion(user.email)},true,'No') مكانها كان بدال اون تايل بريس
          }
          </TouchableOpacity>
        <TouchableOpacity onPress={()=> onTilePress(0,1)} style={styles.tile} >
        {renderIcon(0,1)}
        
          </TouchableOpacity>
        <TouchableOpacity onPress={()=> onTilePress(0,2)} style={styles.tile}>
        {renderIcon(0,2)}
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> onTilePress(0,3)} style={styles.tile}>
          {renderIcon(0,3)}
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> onTilePress(0,4)} style={styles.tile}>
        {renderIcon(0,4)}
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> onTilePress(0,5)} style={styles.tile}>
        {renderIcon(0,5)}
          </TouchableOpacity>
      </View>
      <View style={{flexDirection: "row"}}>
      <TouchableOpacity onPress={()=> onTilePress(1,0)} style={styles.tile}>
      {renderIcon(1,0)}
          </TouchableOpacity>
        <TouchableOpacity onPress={()=> onTilePress(1,1)} style={styles.tile} >
        {renderIcon(1,1)}
          </TouchableOpacity>
        <TouchableOpacity onPress={()=> onTilePress(1,2)} style={styles.tile}>
        {renderIcon(1,2)}
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> onTilePress(1,3)} style={styles.tile}>
        {renderIcon(1,3)}
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> onTilePress(1,4)} style={styles.tile}>
        {renderIcon(1,4)}
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> onTilePress(1,5)} style={styles.tile}>
        {renderIcon(1,5)}
          </TouchableOpacity>
      </View>
      <View style={{flexDirection: "row"}}>
      <TouchableOpacity onPress={()=> onTilePress(2,0)} style={styles.tile}>
          {renderIcon(2,0)}
          </TouchableOpacity>
        <TouchableOpacity onPress={()=> onTilePress(2,1)} style={styles.tile} >
        {renderIcon(2,1)}
          </TouchableOpacity>
        <TouchableOpacity onPress={()=> onTilePress(2,2)} style={styles.tile}>
        {renderIcon(2,2)}
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> onTilePress(2,3)} style={styles.tile}>
        {renderIcon(2,3)}
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> onTilePress(2,4)} style={styles.tile}>
        {renderIcon(2,4)}
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> onTilePress(2,5)} style={styles.tile}>
        {renderIcon(2,5)}
          </TouchableOpacity>
      </View>
      <View style={{flexDirection: "row"}}>
      <TouchableOpacity onPress={()=> onTilePress(3,0)} style={styles.tile}>
          {renderIcon(3,0)}
          </TouchableOpacity>
        <TouchableOpacity onPress={()=> onTilePress(3,1)} style={styles.tile} >
        {renderIcon(3,1)}
          </TouchableOpacity>
        <TouchableOpacity onPress={()=> onTilePress(3,2)} style={styles.tile}>
        {renderIcon(3,2)}
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> onTilePress(3,3)} style={styles.tile}>
        {renderIcon(3,3)}
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> onTilePress(3,4)} style={styles.tile}>
        {renderIcon(3,4)}
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> onTilePress(3,5)} style={styles.tile}>
        {renderIcon(3,5)}
          </TouchableOpacity>
      </View>
      <View style={{flexDirection: "row"}}>
      <TouchableOpacity onPress={()=> onTilePress(4,0)} style={styles.tile}>
          {renderIcon(4,0)}
          </TouchableOpacity>
        <TouchableOpacity onPress={()=> onTilePress(4,1)} style={styles.tile} >
        {renderIcon(4,1)}
          </TouchableOpacity>
        <TouchableOpacity onPress={()=> onTilePress(4,2)} style={styles.tile}>
        {renderIcon(4,2)}
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> onTilePress(4,3)} style={styles.tile}>
        {renderIcon(4,3)}
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> onTilePress(4,4)} style={styles.tile}>
        {renderIcon(4,4)}
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> onTilePress(4,5)} style={styles.tile}>
        {renderIcon(4,5)}
          </TouchableOpacity>
      </View>
      <View style={{flexDirection: "row"}}>
      <TouchableOpacity onPress={()=> onTilePress(5,0)} style={styles.tile}>
          {renderIcon(5,0)}
          </TouchableOpacity>
        <TouchableOpacity onPress={()=> onTilePress(5,1)} style={styles.tile} >
        {renderIcon(5,1)}
          </TouchableOpacity>
        <TouchableOpacity onPress={()=> onTilePress(5,2)} style={styles.tile}>
        {renderIcon(5,2)}
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> onTilePress(5,3)} style={styles.tile}>
        {renderIcon(5,3)}
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> onTilePress(5,4)} style={styles.tile}>
        {renderIcon(5,4)}
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> onTilePress(5,5)} style={styles.tile}>
        {renderIcon(5,5)}
          </TouchableOpacity>
      </View>

    </View>
  
  );
 //}
 //}
 
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    bottom:60,
  },
  tile:{
    borderWidth: 10,
    width:50,
    height:50,
    alignItems: 'center',
    justifyContent: 'center',

  },
  tileX:{
    color:"red",
    fontSize:30,

  },
  tileO:{
    color:"green",
    fontSize:30,

  },
  tileF:{
    color:"grey",
    fontSize:30,

  },
  tileC:{
    color:"blue",
    fontSize:30,

  }
});