// 【Firebase ver.8の書き方（講座の内容）】
// import firebase from 'firebase/app'
// import 'firebase/firestore'
// import firebaseConfig from './config'
// firebase.initializeApp(firebaseConfig);
// export const db = firebase.firestore();


// 【Firebase ver.9の書き方】
// 参考：https://firebase.google.com/docs/firestore/quickstart?hl=ja#web-version-9_1
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import firebaseConfig from './config'

initializeApp(firebaseConfig);
export const db = getFirestore();