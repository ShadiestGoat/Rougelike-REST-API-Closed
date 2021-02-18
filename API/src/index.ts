import mongo from "mongoose"
import express from 'express'
import {Application, Response, Request} from 'express'
import { IndexRouter as ApiRouter } from './routes/IndexRouter';
import { newUser } from "./routes/user/handler"
import { Connection } from "mongoose"
import { mod } from "./models/user"
import { resolve } from "path";

const app:Application = express()
const PORT = require('./config/config.json').port || 2145;


const config = require('./config/config.json')

const MongoDBendPoint = "mongodb://" + config.db.Username + ":" + config.db.Password + "@" + config.db.IP + ":27017/" + config.db.DB + "?readPreference=primary&appname=PP%20API%20Local&ssl=false?authSource=" + config.db.DB

mongo.connect(MongoDBendPoint, {useNewUrlParser: true, useUnifiedTopology:true, useFindAndModify:true, useCreateIndex: true})
const db:Connection = mongo.connection

app.use('/api', ApiRouter)

app.use(express.static(resolve(__dirname + '/..') + '/public'));

app.get('/docs', (req, res) => {
    res.sendFile(resolve(__dirname + '/..') + '/public/index.html')
})


app.post('/newUser', async (req:Request, res:Response) => {
    if (!req.headers.name) {res.send({error: "No name given"}); return}
    try {
        const User = await newUser(req.headers.name.toString())
        await new mod(User).save()
        res.send(User)
        return
    } catch (err) {
        res.send({error: err.toString()})
        return
    }
})


app.listen(PORT, () => 
    console.log(`App is listening on port ${PORT}.`)
)


