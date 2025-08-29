
import * as admin from 'firebase-admin';

// This is a server-side only file.
// Do not import this file on the client.

let adminDb: admin.firestore.Firestore;

try {
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
        } else if (process.env.NODE_ENV !== 'production') {
            console.warn("Firebase Admin SDK not initialized. Missing or invalid service account key in development.");
        }
    }
    adminDb = admin.firestore();
} catch (error) {
    console.error("Failed to initialize Firebase Admin SDK:", error);
    // In a production build environment where credentials might be missing,
    // we prevent a crash by providing a mock or no-op implementation.
    if (process.env.NODE_ENV === 'production' && !admin.apps.length) {
        console.log("Creating a mock Firestore instance for build process.");
        adminDb = {
            collection: () => ({
                doc: () => ({
                    set: () => Promise.resolve(),
                }),
            }),
        } as unknown as admin.firestore.Firestore;
    } else {
         // Re-throw the error if not in a production build or if it's another kind of error
        throw error;
    }
}


export { adminDb };
