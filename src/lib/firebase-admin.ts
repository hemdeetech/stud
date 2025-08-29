
import * as admin from 'firebase-admin';

// This is a server-side only file.
// Do not import this file on the client.

let adminDb: admin.firestore.Firestore;

if (!admin.apps.length) {
    try {
        const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
        
        if (!serviceAccountString) {
            throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set.');
        }

        const serviceAccount = JSON.parse(serviceAccountString);

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: `https://${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseio.com`,
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        });
        console.log("Firebase Admin SDK initialized successfully.");
        adminDb = admin.firestore();
    } catch (error) {
        console.error("Failed to initialize Firebase Admin SDK:", error);
        // Create a mock Firestore instance to avoid crashes during build or in environments without credentials.
        adminDb = {
            collection: (collectionName: string) => {
                console.error(`Firestore not initialized. Cannot access collection: ${collectionName}`);
                return {
                    doc: () => ({
                        set: () => {
                           console.error("Firestore not initialized. Cannot set document.");
                           return Promise.resolve();
                        },
                    }),
                };
            },
        } as unknown as admin.firestore.Firestore;
    }
} else {
    adminDb = admin.firestore();
}


export { adminDb };
