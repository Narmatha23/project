const Validator = require('validator');
const isEmpty = require('./is-empty');


const validateAdminLoginInput = (data) => {
    let errors = {}
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    

    if (Validator.isEmpty(data.email)) {
        errors.email = 'Registration Number field is required';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };

}


module.exports = validateAdminLoginInput 