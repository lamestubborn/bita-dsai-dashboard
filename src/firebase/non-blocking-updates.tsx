
'use client';
    
import {
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  CollectionReference,
  DocumentReference,
  SetOptions,
  doc,
  Firestore,
} from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import {FirestorePermissionError} from '@/firebase/errors';

/**
 * Initiates a setDoc operation for a document reference.
 * Does NOT await the write operation internally.
 */
export function setDocumentNonBlocking(docRef: DocumentReference, data: any, options: SetOptions) {
  setDoc(docRef, data, options).catch(error => {
    errorEmitter.emit(
      'permission-error',
      new FirestorePermissionError({
        path: docRef.path,
        operation: 'write', // or 'create'/'update' based on options
        requestResourceData: data,
      })
    )
  })
  // Execution continues immediately
}


/**
 * Initiates an addDoc operation for a collection reference.
 * Does NOT await the write operation internally.
 * Returns the Promise for the new doc ref, but typically not awaited by caller.
 */
export function addDocumentNonBlocking(colRef: CollectionReference, data: any) {
  const promise = addDoc(colRef, data)
    .catch(error => {
      errorEmitter.emit(
        'permission-error',
        new FirestorePermissionError({
          path: colRef.path,
          operation: 'create',
          requestResourceData: data,
        })
      )
    });
  return promise;
}


/**
 * Initiates an updateDoc operation for a document reference.
 * Does NOT await the write operation internally.
 */
export function updateDocumentNonBlocking(docRef: DocumentReference, data: any) {
  updateDoc(docRef, data)
    .catch(error => {
      errorEmitter.emit(
        'permission-error',
        new FirestorePermissionError({
          path: docRef.path,
          operation: 'update',
          requestResourceData: data,
        })
      )
    });
}

/**
 * Updates a user's session data, creating the document if it doesn't exist.
 * This is useful for tracking completion status or other user-specific session info.
 */
export function updateUserSession(firestore: Firestore, userId: string, sessionId: string, data: { completed?: boolean; reminderSet?: boolean }) {
  const userSessionRef = doc(firestore, 'users', userId, 'user_sessions', sessionId);
  const payload = {
    userId,
    sessionId,
    ...data
  };
  
  // Use setDoc with merge:true to create or update the document non-blockingly
  setDoc(userSessionRef, payload, { merge: true })
    .catch(error => {
      errorEmitter.emit(
        'permission-error',
        new FirestorePermissionError({
          path: userSessionRef.path,
          operation: 'write',
          requestResourceData: payload,
        })
      )
    });
}

/**
 * Updates a user's quiz completion data, creating the document if it doesn't exist.
 */
export function updateUserQuiz(firestore: Firestore, userId: string, quizId: string, data: { completed?: boolean }) {
  const userQuizRef = doc(firestore, 'users', userId, 'user_quizzes', quizId);
  const payload = {
    userId,
    quizId,
    ...data
  };

  // Use setDoc with merge:true to create or update the document non-blockingly
  setDoc(userQuizRef, payload, { merge: true })
    .catch(error => {
      errorEmitter.emit(
        'permission-error',
        new FirestorePermissionError({
          path: userQuizRef.path,
          operation: 'write',
          requestResourceData: payload,
        })
      )
    });
}


/**
 * Initiates a deleteDoc operation for a document reference.
 * Does NOT await the write operation internally.
 */
export function deleteDocumentNonBlocking(docRef: DocumentReference) {
  deleteDoc(docRef)
    .catch(error => {
      errorEmitter.emit(
        'permission-error',
        new FirestorePermissionError({
          path: docRef.path,
          operation: 'delete',
        })
      )
    });
}
