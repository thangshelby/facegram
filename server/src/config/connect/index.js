import mongoose from "mongoose";
import { Account } from "../models/index.js";
import bcrypt from "bcrypt";
const db = {
  connect() {
    try {
      mongoose.connect("mongodb://127.0.0.1:27017/facegram");
      console.log("Connect successfully");
    } catch (error) {
      console.log("Cannot connect");
    }
  },
};
// db.connect()

// const userList = [
//   ["Barack Obama", "obamaman", "obama@example.com"],

//     ["Oprah Winfrey", "oprahqueen", "oprah@example.com"],

//     ["Elon Musk", "muskmaster", "musk@example.com"],

//     ["Taylor Swift", "swiftie", "taylor@example.com"],

//     ["Cristiano Ronaldo", "ronaldogoal", "ronaldo@example.com"],

//     ["Beyoncé Knowles", "beyoncequeen", "beyonce@example.com"],

//     ["Dwayne Johnson", "therock", "rock@example.com"],

//     ["Emma Watson", "emmawatsonfan", "emma@example.com"],

//     ["Lionel Messi", "messigoal", "messi@example.com"],

//     ["Rihanna Fenty", "rihannadiva", "rihanna@example.com"],

//     ["Angelina Jolie", "angelinafan", "angelina@example.com"],

//     ["Virat Kohli", "kohlismasher", "kohli@example.com"],

//     ["Leonardo DiCaprio", "leofanatic, leo@example.com"],

//     ["Serena Williams", "serenaking", "serena@example.com"],

//     ["Adele Adkins", "adelemusic", "adele@example.com"],

//     ["Usain Bolt", "boltflash", "bolt@example.com"],

//     ["Kim Kardashian", "kimkqueen", "kim@example.com"],

//     ["Stephen Curry", "currymaster", "curry@example.com"],

//     ["Priyanka Chopra", "priyankadiva", "priyanka@example.com"],

//     ["Tom Hanks", "hanksfan", "hanks@example.com"],
// ];

// createNewAccount(userList[0])
// async function createNewAccount (user) {
//   try {
//     // const hashedPassword= bcrypt.hash('1',12)
//     const newAccount = new Account({
//       name: user[0],
//       userName: user[1],
//       email: user[2],
//       password: '1',
//       imgAvatar: "",
//       posts: [],
//       followers: [],
//       followings: [],
//     });

//     await newAccount.save()
    
//   } catch (error) {
//     console.log('Error:',error)
//   }
// };

// for( let i=0;i<userList.length;i++){
//   createNewAccount(userList[i])
// }

// console.log('Success')



export default db
