// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getDatabase } from 'firebase/database'
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check'
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
const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider(import.meta.env.VITE_APP_CHECK_KEY),
  isTokenAutoRefreshEnabled: true
})
export const GithubProvider = new GithubAuthProvider()
export const GoogleProvider = new GoogleAuthProvider()
export const auth = getAuth(app)
export const storage = getStorage(app)
export const database = getDatabase(app)
export default app
