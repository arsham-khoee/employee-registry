import bodyParser from 'body-parser'
import express, { request } from 'express'

export const app = express()
app.use(bodyParser.json())