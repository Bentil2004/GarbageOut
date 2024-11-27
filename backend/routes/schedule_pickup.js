import express from 'express';
import admin from 'firebase-admin';
import { handleErrorResponse } from '../utility/statusCode.js';
import { getStatusMessageByEndpointAndCode } from '../utility/statusCode.js';
import { validatePickupFields } from '../utility/validation.js';
import { schedule_pickup_col } from '../services/collection_name.js';

const router = express.Router();

// Create schedule pickup
router.post('/add', async (req, res) => {
    const validation = validatePickupFields(req.body);
    if (!validation.isValid) {
        return handleErrorResponse(res, 'schedule_pickup', '4000');
    }

    const { customer_id, address, duration_for_pickup, bin_size, number_of_bag, google_location_coordinates, amount } = req.body;

    try {
        const created_at = admin.firestore.FieldValue.serverTimestamp();
        const pickupData = { 
            customer_id, 
            address, 
            duration_for_pickup, 
            bin_size, 
            number_of_bag, 
            google_location_coordinates, 
            amount, 
            created_at, 
            updated_at: null 
        };

        const docRef = schedule_pickup_col.doc();
        await docRef.set(pickupData);

        const { message, code, event } = getStatusMessageByEndpointAndCode('schedule_pickup', '1000');
        return res.status(201).json({
            status: true,
            message,
            code,
            event,
            data: { id: docRef.id },
            error: null,
        });
    } catch (error) {
        return handleErrorResponse(res, 'schedule_pickup', '5001', error.message);
    }
});

// Get all schedule pickups
router.get('/', async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    let pickups = [];
    let lastVisible = null;

    try {
        const query = schedule_pickup_col.orderBy('created_at').limit(limit);

        if (offset > 0 && lastVisible) {
            const snapshot = await query.startAfter(lastVisible).get();
            pickups = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            lastVisible = snapshot.docs[snapshot.docs.length - 1];
        } else {
            const snapshot = await query.get();
            pickups = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            lastVisible = snapshot.docs[snapshot.docs.length - 1];
        }

        const { message, code, event } = getStatusMessageByEndpointAndCode('schedule_pickup', '1001');
        return res.status(200).json({
            status: true,
            message,
            code,
            event,
            data: {
                pickups,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    nextPage: lastVisible ? page + 1 : null,
                },
            },
            error: null,
        });
    } catch (error) {
        return handleErrorResponse(res, 'schedule_pickup', '5002', error.message);
    }
});

// Get a single schedule pickup
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const pickupSnapshot = await schedule_pickup_col.doc(id).get();
        if (!pickupSnapshot.exists) {
            return handleErrorResponse(res, 'schedule_pickup', '4002');
        }

        const pickupData = pickupSnapshot.data();
        const { message, code, event } = getStatusMessageByEndpointAndCode('schedule_pickup', '1001');
        return res.status(200).json({
            status: true,
            message,
            code,
            event,
            data: pickupData,
            error: null,
        });
    } catch (error) {
        return handleErrorResponse(res, 'schedule_pickup', '5002', error.message);
    }
});

// Update a schedule pickup
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { address, duration_for_pickup, bin_size, number_of_bag, google_location_coordinates, amount } = req.body;

    try {
        const updated_at = admin.firestore.FieldValue.serverTimestamp();
        const updatedData = { 
            ...(address && { address }), 
            ...(duration_for_pickup && { duration_for_pickup }), 
            ...(bin_size && { bin_size }), 
            ...(number_of_bag && { number_of_bag }), 
            ...(google_location_coordinates && { google_location_coordinates }), 
            ...(amount && { amount }), 
            updated_at 
        };

        const pickupDoc = await schedule_pickup_col.doc(id).get();
        if (!pickupDoc.exists) {
            return handleErrorResponse(res, 'schedule_pickup', '4002');
        }

        await schedule_pickup_col.doc(id).update(updatedData);

        const { message, code, event } = getStatusMessageByEndpointAndCode('schedule_pickup', '1002');
        return res.status(200).json({
            status: true,
            message,
            code,
            event,
            data: { id },
            error: null,
        });
    } catch (error) {
        return handleErrorResponse(res, 'schedule_pickup', '5003', error.message);
    }
});

// Delete a schedule pickup
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const pickupDoc = await schedule_pickup_col.doc(id).get();
        if (!pickupDoc.exists) {
            return handleErrorResponse(res, 'schedule_pickup', '4002');
        }

        await schedule_pickup_col.doc(id).delete();

        const { message, code, event } = getStatusMessageByEndpointAndCode('schedule_pickup', '1003');
        return res.status(200).json({
            status: true,
            message,
            code,
            event,
            data: { id },
            error: null,
        });
    } catch (error) {
        return handleErrorResponse(res, 'schedule_pickup', '5004', error.message);
    }
});

export default router;
