export function validateUserFields(fields) {
    const requiredFields = {
        customer_id: 'string',
        first_name: 'string',
        last_name: 'string',
    };

    for (const [field, type] of Object.entries(requiredFields)) {
        if (!fields[field]) {
            return { isValid: false, field, error: `Field ${field} is required` };
        }
        if (typeof fields[field] !== type) {
            return { isValid: false, field, error: `Field ${field} must be of type ${type}` };
        }
    }

    return { isValid: true, field: null };
}

export function validatePickupFields(fields) {
    const requiredFields = {
        customer_id: 'string',
        address: 'string',
        duration_for_pickup: 'string',
        bin_size: 'string',
        number_of_bag: 'number',
        google_location_coordinates: 'object',
        amount: 'number',
    };

    for (const [field, type] of Object.entries(requiredFields)) {
        if (!fields[field]) {
            return { isValid: false, field, error: `Field ${field} is required` };
        }
        if (typeof fields[field] !== type) {
            return { isValid: false, field, error: `Field ${field} must be of type ${type}` };
        }

        // validation for google_location_coordinates (lat and lng)
        if (field === 'google_location_coordinates') {
            const { lat, lng } = fields[field];
            if (typeof lat !== 'number' || typeof lng !== 'number') {
                return { isValid: false, field, error: 'google_location_coordinates must contain valid lat and lng as numbers' };
            }
        }

        if (field === 'number_of_bag' && fields[field] <= 0) {
            return { isValid: false, field, error: 'number_of_bag must be greater than 0' };
        }

        if (field === 'amount' && fields[field] <= 0) {
            return { isValid: false, field, error: 'amount must be greater than 0' };
        }
    }

    return { isValid: true, field: null };
}

export function validateUpcomingPickupFields(fields) {
    const requiredFields = {
        date: 'string',
        time: 'string',
        google_location_coordinates: 'object',
        'google_location_coordinates.lat': 'number',
        'google_location_coordinates.lng': 'number',
    };

    for (const [field, type] of Object.entries(requiredFields)) {
        const keys = field.split('.');
        const value = keys.reduce((acc, key) => acc?.[key], fields);

        if (value === undefined || value === null) {
            return { isValid: false, field, error: `Field ${field} is required` };
        }

        if (typeof value !== type) {
            return { isValid: false, field, error: `Field ${field} must be of type ${type}` };
        }
    }

    return { isValid: true, field: null };
}
