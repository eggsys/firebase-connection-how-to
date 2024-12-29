console.debug("start");

import * as admin from "firebase-admin";
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();


// Import the service account key JSON file contents
import serviceAccount from '../egg-firebase-adminsdk.json'; // Update with your actual path
// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount), // Type assertion
  databaseURL: process.env.FIREBASE_URL, // Replace with your database URL
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
const db = admin.database();
const ref = db.ref('order');

ref.once('value', (snapshot) => {
  console.log(snapshot.val());
});

ref.once('value', (snapshot) => {
  snapshot.forEach((childSnapshot) => {
    const orderId = childSnapshot.key;
    const orderData = childSnapshot.val();
    console.log(`Order ID: ${orderId}`);
    console.log(orderData); // Log the entire order data
  });
});

ref.on('value', (snapshot) => {
    console.log('Order data changed:');
    snapshot.forEach((childSnapshot) => {
      const orderId = childSnapshot.key;
      const orderData = childSnapshot.val();
      console.log(`Order ID: ${orderId}`);
      console.log(orderData);
    });
  }, (error) => {
    console.error('Error reading order data:', error);
  });
