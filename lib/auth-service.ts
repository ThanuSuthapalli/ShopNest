// Firebase Authentication Service
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut as firebaseSignOut,
    onAuthStateChanged,
    User as FirebaseUser,
    UserCredential,
} from 'firebase/auth'
import { auth } from './firebase'

export type { FirebaseUser }

// Sign up with email and password
export async function signUp(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(auth, email, password)
}

// Sign in with email and password
export async function signIn(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(auth, email, password)
}

// Sign out
export async function signOut(): Promise<void> {
    return firebaseSignOut(auth)
}

// Listen to auth state changes
export function onAuthChange(callback: (user: FirebaseUser | null) => void): () => void {
    return onAuthStateChanged(auth, callback)
}

// Get current user
export function getCurrentUser(): FirebaseUser | null {
    return auth.currentUser
}
