// all env variables
require('dotenv').config()

export const envVariables = {
 db_string : process.env.MEDZONE_DB_CONN_STRING,
 jwt_secret : process.env.JWT_AUTH_TOKEN_SECRET,
 senderEmail  : process.env.NODEMAILER_EMAIL,
 senderPassword : process.env.NODEMAILER_PASSWORD,
 base_origin : 'http://localhost:3000'
}