import { initializeApp } from 'firebase/app';
import { getFunctions } from 'firebase/functions';
import { 
  connectAuthEmulator, 
  getAuth, 
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithCustomToken, 
  signOut,
} from 'firebase/auth';

const firebaseConfig = {
   apiKey: "AIzaSyBYHouiAoaFNpPWTka_MpyLzx1QK59aPzc",
   authDomain: process.env.AUTHDOMAIN,
   projectId: process.env.PROJECTID,
   storageBucket: process.env.STORAGEBUCKET,
   messagingSenderId: process.env.MESSAGINGSENDERID,
   appId: process.env.APPID,
   measurementId: process.env.MEASUREMENTID
 };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export { 
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithCustomToken,
  signOut,
  getFunctions
}

export default app;