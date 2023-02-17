// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { GithubAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC4aX1CZYUE723qmXFptKsYspP90oCZigo',
  authDomain: 'hackafor.firebaseapp.com',
  databaseURL:
    'https://hackafor-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'hackafor',
  storageBucket: 'hackafor.appspot.com',
  messagingSenderId: '445922027453',
  appId: '1:445922027453:web:cd816198a5dd928121d4d4'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const provider = new GithubAuthProvider()
export const db = getFirestore(app)
export const auth = getAuth(app)
export const database = getDatabase(app)
export default app
