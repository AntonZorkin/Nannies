import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth'
import { auth } from '../firebase'

export const register = async (email: string, password: string, displayName: string) => {
  await createUserWithEmailAndPassword(auth, email, password)
  await updateProfile(auth.currentUser!, { displayName: displayName })
  return auth.currentUser
}

export const login = async (email: string, password: string) => {
  await signInWithEmailAndPassword(auth, email, password)
  return auth.currentUser
}

export const logout = () => {
  return signOut(auth)
}

export const subscribeToAuth = (callback: any) => {
  return onAuthStateChanged(auth, callback)
}
