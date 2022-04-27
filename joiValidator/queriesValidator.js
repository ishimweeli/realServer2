import joi from 'joi';

const queriesValidate = joi.object({

    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net','fr'] } }),
    message: joi.string().required().min(3)
});

export default queriesValidate;