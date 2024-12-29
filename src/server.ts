console.debug("start");

import * as admin from "firebase-admin";
import { applicationDefault, initializeApp } from "firebase-admin/app";
import * as dotenv from 'dotenv';

dotenv.config();

initializeApp({
  credential: applicationDefault(),  // firebase will use env GOOGLE_APPLICATION_CREDENTIALS to find the file from the path
  databaseURL: process.env.FIREBASE_URL, 
});

const db = admin.database();
const ref = db.ref('order');

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