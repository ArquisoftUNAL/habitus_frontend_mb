// Validate a given joi schema against a given object

import Joi from 'joi';

export const validate = (schema: Joi.Schema, object: any) => {
    const { error } = schema.validate(object);
    if (error) {
        const errors: any = {};
        for (let item of error.details) {
            errors[item.path[0]] = item.message;
        }

        // Build error string
        let errorString = '';
        for (let key in errors) {
            errorString += `${key} : ${errors[key]}\n`;
        }
        return errorString;
    }
    return null;
}