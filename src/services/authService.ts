import { auth, firestore } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, updateDoc } from "firebase/firestore";

export const registerUser = async (email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  const userDocRef = doc(firestore, "users", user.uid);
  await setDoc(userDocRef, {
    email: user.email,
    displayName: user.displayName || "",
    firstName: "",
    lastName: "",
    age: "",
  });

  return user;
};

export const loginUser = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  return user;
};

export const updateUserProfile = async (
  displayName: string,
  firstName: string,
  lastName: string,
  age: string
) => {
  if (!auth.currentUser) return;

  await updateProfile(auth.currentUser, { displayName });


  const userDocRef = doc(firestore, "users", auth.currentUser.uid);
  await updateDoc(userDocRef, {
    displayName,
    firstName,
    lastName,
    age,
  });
};
