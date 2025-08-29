
import * as admin from 'firebase-admin';

// This is a server-side only file.
// Do not import this file on the client.

if (!admin.apps.length) {
    const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
        ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
        : null;

    if (serviceAccount) {
         admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: `https://${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseio.com`,
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        });
    } else {
        console.warn("Firebase Admin SDK not initialized. Missing service account key.");
    }
}

const adminDb = admin.firestore();

export { adminDb };
