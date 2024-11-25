import express from 'express';
import admin from 'firebase-admin';
import handleErrorResponse from '../utility/statusCode.js';
import { getStatusMessageByEndpointAndCode } from '../utility/statusCode.js';
import db from '../services/firebase.js'; 
import { validateCustomerFields } from '../utility/validation.js';
import { customer_col } from '../services/collection_name.js';


const router = express.Router();

// Create customer
router.post('/add', async (req, res) => {
    const validation = validateCustomerFields(req.body);
    if (!validation.isValid) {
        return handleErrorResponse(res, 'customer', '4000', validation.error);
    }

    const { first_name, last_name, customer_id } = req.body;

    try {
        const created_at = admin.firestore.FieldValue.serverTimestamp();
        const customerData = { customer_id, first_name, last_name, created_at, updated_at: null };

        const existingCustomer = await customer_col.doc(customer_id).get();
        if (existingCustomer.exists) {
            return handleErrorResponse(res, 'customer', '4001', 'Customer already exists');
        }

        await customer_col.doc(customer_id).set(customerData);

        const { message, code, event } = getStatusMessageByEndpointAndCode('customer', '1000');
        return res.status(201).json({
            status: true,
            message,
            code,
            event,
            data: { customer_id },
            error: null,
        });
    } catch (error) {
        return handleErrorResponse(res, 'customer', '5001', error.message);
    }
});

// Get all customers
router.get('/', async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    let customers = [];
    let lastVisible = null;

    try {
        const customerQuery = customer_col.orderBy('created_at').limit(limit);

        if (offset > 0 && lastVisible) {
            const snapshot = await customerQuery.startAfter(lastVisible).get();
            customers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            lastVisible = snapshot.docs[snapshot.docs.length - 1];
        } else {
            const snapshot = await customerQuery.get();
            customers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            lastVisible = snapshot.docs[snapshot.docs.length - 1];
        }

        const { message, code, event } = getStatusMessageByEndpointAndCode('customer', '1001');
        return res.status(200).json({
            status: true,
            message,
            code,
            event,
            data: {
                customers,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    nextPage: lastVisible ? page + 1 : null,
                },
            },
            error: null,
        });
    } catch (error) {
        return handleErrorResponse(res, 'customer', '5002', error.message);
    }
});

// Get a single customer
router.get('/:customer_id', async (req, res) => {
    const customer_id = getCustomerIdFromRequest(req);

    try {
        const customerSnapshot = await customer_col.doc(customer_id).get();
        if (!customerSnapshot.exists) {
            return handleErrorResponse(res, 'customer', '4002', 'Customer not found');
        }

        const customerData = customerSnapshot.data();
        const { message, code, event } = getStatusMessageByEndpointAndCode('customer', '1001');
        return res.status(200).json({
            status: true,
            message,
            code,
            event,
            data: customerData,
            error: null,
        });
    } catch (error) {
        return handleErrorResponse(res, 'customer', '5002', error.message);
    }
});

// Update a customer
router.put('/:customer_id', async (req, res) => {
    const customer_id = getCustomerIdFromRequest(req);
    const { first_name, last_name } = req.body;

    try {
        const updated_at = admin.firestore.FieldValue.serverTimestamp();
        const updatedData = { ...(first_name && { first_name }), ...(last_name && { last_name }), updated_at };

        const customerDoc = await customer_col.doc(customer_id).get();
        if (!customerDoc.exists) {
            return handleErrorResponse(res, 'customer', '4002', 'Customer not found');
        }

        await customer_col.doc(customer_id).update(updatedData);

        const { message, code, event } = getStatusMessageByEndpointAndCode('customer', '1002');
        return res.status(200).json({
            status: true,
            message,
            code,
            event,
            data: { customer_id },
            error: null,
        });
    } catch (error) {
        return handleErrorResponse(res, 'customer', '5003', error.message);
    }
});

// Delete a customer
router.delete('/:customer_id', async (req, res) => {
    const customer_id = getCustomerIdFromRequest(req);

    try {
        const customerDoc = await customer_col.doc(customer_id).get();
        if (!customerDoc.exists) {
            return handleErrorResponse(res, 'customer', '4002', 'Customer not found');
        }

        const deleted_at = admin.firestore.FieldValue.serverTimestamp();
        await customer_col.doc(customer_id).update({ is_deleted: true, deleted_at });

        const { message, code, event } = getStatusMessageByEndpointAndCode('customer', '1003');
        return res.status(200).json({
            status: true,
            message,
            code,
            event,
            data: { customer_id },
            error: null,
        });
    } catch (error) {
        return handleErrorResponse(res, 'customer', '5004', error.message);
    }
});

export default router;
