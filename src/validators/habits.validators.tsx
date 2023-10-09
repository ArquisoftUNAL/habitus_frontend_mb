import Joi from 'joi';

export const habitSchema = Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    category: Joi.string().required(),
    frequency_type: Joi.string().required(),
    goal: Joi.number().required(),
});

