import Joi from 'joi';

export const loginSchema = Joi.object().keys({
    email: Joi.string().email({ tlds: { allow: false } }).required().label('Email'),
    // password: Joi.string().pattern(
    //     new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$')
    // ).required().label('Password'),
    password: Joi.string().min(7).required().label('Password'),
});

export const registerSchema = Joi.object().keys({
    email: Joi.string().email({ tlds: { allow: false } }).required().label('Email'),
    password: Joi.string().min(6).required().label('Password'),
    birthDay: Joi.date().optional().label('BirthDay'),
    name: Joi.string().required().label('Name'),
});