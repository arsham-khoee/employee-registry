import jwt from 'jsonwebtoken'

const generateToken = (userId) => {
    return jwt.sign({ userId }, 'kYK2FZr$B8ytGy^G5T@+', { expiresIn: '7 days' })
}

export { generateToken as default }