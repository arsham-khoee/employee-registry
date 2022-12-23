import passwordValidator from 'password-validator'

const schema = new passwordValidator()

schema
    .is().min(8)                                          // Minimum length 8
    .is().max(100)                                        // Maximum length 100
    // .has().uppercase()                                 // Must have uppercase letters
    // .has().lowercase()                                 // Must have lowercase letters
    .has().digits()                                       // Must have digits
    .has().not().spaces()                                 // Should not have spaces
    // .is().not().oneOf(['Passw0rd', 'Password123']);    // Blacklist these values

const validatePassword = (password) => {

    if(!schema.validate(password)){
        throw new Error('Password must be 8 characters or longer including digits without containing any spaces.')
    }

    return password
}

export { validatePassword as default }