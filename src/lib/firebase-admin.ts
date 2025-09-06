
import * as admin from 'firebase-admin';

// This is a server-side only file.
// Do not import this file on the client.
// This file is currently not in use but is kept for potential future use with Firestore.

let adminDb: admin.firestore.Firestore;

if (!admin.apps.length) {
    try {
        const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
        
        if (!serviceAccountString) {
            // No service account key, so we don't initialize.
            // This is not an error, as the admin SDK might not be needed.
            console.log("Firebase Admin SDK not initialized: FIREBASE_SERVICE_ACCOUNT_KEY is not set.");
        } else {
             // Correctly parse the multi-line private key
            const serviceAccount = JSON.parse(serviceAccountString);
            
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
                databaseURL: `https://${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseio.com`,
                projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
            });
            console.log("Firebase Admin SDK initialized successfully.");
            adminDb = admin.firestore();
        }

    } catch (error: any) {
        console.error("Failed to initialize Firebase Admin SDK:", error.message);
    }
} else {
    adminDb = admin.firestore();
}


export { adminDb };
