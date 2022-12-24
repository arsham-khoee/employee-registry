import { config } from 'dotenv'
import path from 'path'

config({
    path: path.resolve(__dirname, '.env')
});

module.exports = {
    HOST : process.env.HOST || 'localhost',
    PORT : process.env.PORT || 3000
}