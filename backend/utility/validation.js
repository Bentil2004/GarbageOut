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
