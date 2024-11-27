import db from './firebase.js';

export const customer_col = db.collection('customers');
export const schedule_pickup_col = db.collection('schedule_pickups');
export const upcoming_pickup_col = db.collection('upcoming_pickups');