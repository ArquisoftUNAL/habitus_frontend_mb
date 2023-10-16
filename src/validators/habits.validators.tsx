import Joi from 'joi';

export const habitSchema = Joi.object().keys({
    name: Joi.string().required().min(1),
    description: Joi.string().required().min(1),
    goal: Joi.number().required().min(0),
    isYn: Joi.boolean().required(),
    units: Joi.string().required().min(1),
    frequency: Joi.string().valid(...['daily', 'daily2', 'weekly', 'weekly2', 'monthly', 'yearly']).required(),
    category: Joi.string().required().min(1),
    color: Joi.string().required().length(6),
    isFavorite: Joi.boolean().required(),
});