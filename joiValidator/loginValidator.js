import joi from 'joi';

const loginValidate = joi.object({

   
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net','fr'] } }),
    password: joi.string().required().min(8)
});

export default loginValidate;