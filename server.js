import express from 'express'
import mailer from './index.js'
import bodyParser from 'body-parser'
const app = express()
const port = 3111
import path from 'path'
const __dirname = path.resolve()
const sendMail = mailer
const browser = `http://localhost:${port}`

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/', function (req, res) {
    let body = req.body
    console.log(`  get #### ${JSON.stringify(body)}`);
    res.send(`redirected here for some reason shrugs`)
})

app.post('/', function (req, res,err) {
    let subject = req.body.inputSubject
    let text = req.body.inputText
    if (subject && text) {
        sendMail(subject, text)
        console.log(`Request has been sent`);
        res.send(`Email has been sent`)
    } else {
        if (!subject) {

        console.log(`Missing subject`);
        } else if (!text) {
            console.log(`Missing text`);
        } else {
            console.log(`Missing subject and text`);
        }
        res.redirect('/')
    }
})

app.post('/send-mail', function (req, res, err) {
    let body = req.body
    console.log(`send-mail post #### ${body}`);
    // if (body === {"name": "dee"}) {
    //     console.log(`Request has been sent`);
    // } else {
    //     //res.redirect('/')
    //     console.log(`This was a post error ${body}`);
    // }
})

app.get('/send-mail', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'), (err) => {
        if (err) {
            console.log(`Error ${err}`);
        } else {
            console.log(`File loaded successfully`);
        }
    })
})

app.listen(port, (err) => {
    if (err) {
        console.error(err)
    } else {
        console.log(`Listening on port ${port}
        click here --> ${browser} to navigate to browser
        `);
    }
    }
)


