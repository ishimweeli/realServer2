import joi from 'joi';

const userValidate = joi.object({

    // username: joi.string().required(),
    first_name: joi.string().required().uppercase(),
    last_name: joi.string().required().uppercase(),
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net','fr'] } }),
    password: joi.string().required().min(8)
});

export default userValidate;