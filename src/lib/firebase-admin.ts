
import * as admin from 'firebase-admin';

// This is a server-side only file.
// Do not import this file on the client.

let adminDb: admin.firestore.Firestore;

if (!admin.apps.length) {
    try {
        const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
            ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
            : null;
        
        if (serviceAccount) {
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
                databaseURL: `https://${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseio.com`,
                projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
            });
            adminDb = admin.firestore();
        } else {
            console.warn("Firebase Admin SDK service account not available. Some features will be disabled.");
            // Create a mock Firestore instance to avoid crashes during build or in environments without credentials.
            adminDb = {
                collection: () => ({
                    doc: () => ({
                        set: () => Promise.resolve(),
                    }),
                }),
            } as unknown as admin.firestore.Firestore;
        }
    } catch (error) {
        console.error("Failed to initialize Firebase Admin SDK:", error);
         // Ensure adminDb is a mock if initialization fails for any reason.
        adminDb = {
            collection: () => ({
                doc: () => ({
                    set: () => Promise.resolve(),
                }),
            }),
        } as unknown as admin.firestore.Firestore;
    }
} else {
    adminDb = admin.firestore();
}


export { adminDb };
