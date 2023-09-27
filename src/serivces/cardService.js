import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export async function getAllCards() {
  const wordsCollectionRef = collection(db, 'words');
  const querySnapshot = await getDocs(wordsCollectionRef);
  return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
}