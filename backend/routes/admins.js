import express from 'express';
import admin from 'firebase-admin';
import { handleErrorResponse } from '../utility/statusCode.js';
import { getStatusMessageByEndpointAndCode } from '../utility/statusCode.js';
import { validateUpcomingPickupFields } from '../utility/validation.js';
import { getDistanceFromLatLng } from '../utility/getDistanceFromLatLng.js';
import { upcoming_pickup_col } from '../services/collection_name.js';
import { customer_col } from '../services/collection_name.js';

const router = express.Router();

// Create an upcoming pickup
router.post('/upcoming_pickup/add', async (req, res) => {
    const validation = validateUpcomingPickupFields(req.body);
    if (!validation.isValid) {
        return handleErrorResponse(res, 'upcoming_pickup', '4000', validation.error);
    }

    const { date, time, google_location_coordinates } = req.body;

    try {
        const created_at = admin.firestore.FieldValue.serverTimestamp();
        const pickupData = { date, time, google_location_coordinates, created_at, updated_at: null };

        const newPickupRef = upcoming_pickup_col.doc();
        await newPickupRef.set(pickupData);

        const { message, code, event } = getStatusMessageByEndpointAndCode('upcoming_pickup', '1000');
        return res.status(201).json({
            status: true,
            message,
            code,
            event,
            data: { pickup_id: newPickupRef.id },
            error: null,
        });
    } catch (error) {
        return handleErrorResponse(res, 'upcoming_pickup', '5001', error.message);
    }
});

// Get all upcoming pickups
router.get('/upcoming_pickup', async (req, res) => {
    const { page = 1, limit = 10, lat, lng } = req.query; // Include location for filtering
    const offset = (page - 1) * limit;
    let pickups = [];
    let lastVisible = null;

    try {
        const query = upcoming_pickup_col
            .orderBy('date')
            .where('google_location_coordinates', '>=', {
                lat: parseFloat(lat) - 0.1,
                lng: parseFloat(lng) - 0.1,
            })
            .where('google_location_coordinates', '<=', {
                lat: parseFloat(lat) + 0.1,
                lng: parseFloat(lng) + 0.1,
            })
            .limit(limit);

        if (offset > 0 && lastVisible) {
            const snapshot = await query.startAfter(lastVisible).get();
            pickups = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            lastVisible = snapshot.docs[snapshot.docs.length - 1];
        } else {
            const snapshot = await query.get();
            pickups = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            lastVisible = snapshot.docs[snapshot.docs.length - 1];
        }

        const { message, code, event } = getStatusMessageByEndpointAndCode('upcoming_pickup', '1001');
        return res.status(200).json({
            status: true,
            message,
            code,
            event,
            data: {
                pickups,
                pagination: {
                    page: parseInt(page, 10),
                    limit: parseInt(limit, 10),
                    nextPage: lastVisible ? parseInt(page, 10) + 1 : null,
                },
            },
            error: null,
        });
    } catch (error) {
        return handleErrorResponse(res, 'upcoming_pickup', '5002', error.message);
    }
});

// Query upcoming pickups near a location
router.get('/upcoming_pickup/nearby', async (req, res) => {
    const { lat, lng, radius = 5 } = req.query; // radius in kilometers

    if (!lat || !lng) {
        return handleErrorResponse(res, 'upcoming_pickup', '4003');
    }

    try {
        const nearbyCustomersSnapshot = await customer_col
            .where('google_location_coordinates', '!=', null)
            .get();

        const nearbyCustomers = nearbyCustomersSnapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .filter(customer => {
                const distance = getDistanceFromLatLng(
                    parseFloat(lat),
                    parseFloat(lng),
                    customer.google_location_coordinates.lat,
                    customer.google_location_coordinates.lng
                );
                return distance <= radius;
            });

        const { message, code, event } = getStatusMessageByEndpointAndCode('upcoming_pickup', '1001');
        return res.status(200).json({
            status: true,
            message,
            code,
            event,
            data: { nearby_customers: nearbyCustomers },
            error: null,
        });
    } catch (error) {
        return handleErrorResponse(res, 'upcoming_pickup', '5003', error.message);
    }
});

// Update an upcoming pickup
router.put('/upcoming_pickup/:pickup_id', async (req, res) => {
    const { pickup_id } = req.params;
    const { date, time, google_location_coordinates } = req.body;

    try {
        const updated_at = admin.firestore.FieldValue.serverTimestamp();
        const updatedData = { ...(date && { date }), ...(time && { time }), ...(google_location_coordinates && { google_location_coordinates }), updated_at };

        const pickupDoc = await upcoming_pickup_col.doc(pickup_id).get();
        if (!pickupDoc.exists) {
            return handleErrorResponse(res, 'upcoming_pickup', '4002');
        }

        await upcoming_pickup_col.doc(pickup_id).update(updatedData);

        const { message, code, event } = getStatusMessageByEndpointAndCode('upcoming_pickup', '1002');
        return res.status(200).json({
            status: true,
            message,
            code,
            event,
            data: { pickup_id },
            error: null,
        });
    } catch (error) {
        return handleErrorResponse(res, 'upcoming_pickup', '5004', error.message);
    }
});

// Delete an upcoming pickup
router.delete('/upcoming_pickup/:pickup_id', async (req, res) => {
    const { pickup_id } = req.params;

    try {
        const pickupDoc = await upcoming_pickup_col.doc(pickup_id).get();
        if (!pickupDoc.exists) {
            return handleErrorResponse(res, 'upcoming_pickup', '4002');
        }

        await upcoming_pickup_col.doc(pickup_id).delete();

        const { message, code, event } = getStatusMessageByEndpointAndCode('upcoming_pickup', '1003');
        return res.status(200).json({
            status: true,
            message,
            code,
            event,
            data: { pickup_id },
            error: null,
        });
    } catch (error) {
        return handleErrorResponse(res, 'upcoming_pickup', '5005', error.message);
    }
});

export default router;
