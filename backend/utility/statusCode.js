export const statusMessages = {
    customer: {
        '1000': { message: 'Customer added successfully', code: '1000', event: 'customer.added' },
        '1001': { message: 'Customer retrieved successfully', code: '1001', event: 'customer.retrieved' },
        '1002': { message: 'Customer updated successfully', code: '1001', event: 'customer.updated' },
        '1003': { message: 'Customer deleted successfully', code: '1001', event: 'customer.deleted' },
        '4000': { message: 'Invalid field provided', code: '4000', event: 'customer.field_validation_error' },
        '4001': { message: 'Customer exist', code: '4001', event: 'customer.customer_exist' },
        '4002': { message: 'No customer(s) found.', code: '4002', event: 'customer.not_found' },
        '5000': { message: 'Error adding customer', code: '5000', event: 'customer.adding_failed' },
        '5001': { message: 'Error adding customer', code: '5001', event: 'customer.adding_failed' },
        '5002': { message: 'Error retrieving customer', code: '5002', event: 'customer.retrieving_failed' },
        '5003': { message: 'Error updating customer', code: '5003', event: 'customer.updating_failed' },
        '5004': { message: 'Error deleting customer', code: '5004', event: 'customer.deleting_failed' },
    },

    schedule_pickup: {
        '1000': { message: 'Schedule pickup added successfully', code: '1000', event: 'schedule_pickup.added' },
        '1001': { message: 'Schedule pickup retrieved successfully', code: '1001', event: 'schedule_pickup.retrieved' },
        '1002': { message: 'Schedule pickup updated successfully', code: '1001', event: 'schedule_pickup.updated' },
        '1003': { message: 'Schedule pickup deleted successfully', code: '1001', event: 'schedule_pickup.deleted' },
        '4000': { message: 'Invalid field provided', code: '4000', event: 'schedule_pickup.field_validation_error' },
        '4001': { message: 'Schedule pickup exist', code: '4001', event: 'schedule_pickup.customer_exist' },
        '4002': { message: 'No schedule pickup(s) found.', code: '4002', event: 'schedule_pickup.not_found' },
        '5000': { message: 'Error adding schedule pickup', code: '5000', event: 'schedule_pickup.adding_failed' },
        '5001': { message: 'Error adding schedule pickup', code: '5001', event: 'schedule_pickup.adding_failed' },
        '5002': { message: 'Error retrieving schedule pickup', code: '5002', event: 'schedule_pickup.retrieving_failed' },
        '5003': { message: 'Error updating schedule pickup', code: '5003', event: 'schedule_pickup.updating_failed' },
        '5004': { message: 'Error deleting schedule pickup', code: '5004', event: 'schedule_pickup.deleting_failed' },
    },

    auth_middleware: {
        '4001': { message: 'Authorization token is required', code: '4001', event: 'auth_middleware.token_required' },
        '4002': { message: 'Invalid token', code: '4002', event: 'auth_middleware.invalid_token' },
    },
};

export function getStatusMessageByEndpointAndCode(endpoint, code) {
    const endpointMessages = statusMessages[endpoint];
    return endpointMessages ? endpointMessages[code] || null : null;
}

export function handleErrorResponse(res, endpoint, code, customMessage = null) {
    const statusMessage = getStatusMessageByEndpointAndCode(endpoint, code);
    if (statusMessage) {
        return res.status(400).json({
            status: false,
            message: customMessage || statusMessage.message,
            code: statusMessage.code,
            event: statusMessage.event,
            data: null,
            error: customMessage || statusMessage.message,
        });
    }
    return res.status(500).json({
        status: false,
        message: customMessage || 'Unknown error',
        code: '9999',
        event: 'UNKNOWN_ERROR',
        data: null,
        error: customMessage || 'Unknown error',
    });
}