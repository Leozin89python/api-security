import express  from 'express'
import log      from 'morgan'
import Cryptr   from "cryptr"
import mongoose from 'mongoose'
import sequence from 'mongoose-sequence'
const AutoIncrement    = sequence(mongoose)


const port    = 8007
const db      = 'mongodb://localhost:27017/appv1'
const app     = express()
const Schema  = mongoose.Schema


/** initial configs */
const secure = new Cryptr('aes256')

app.use(log('dev'))
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))

app.listen(port,(req,res)=>{
    console.log(`online into port:${port}`)
})


/** database connection, config, initial data test*/
mongoose.connect(db)

const database = mongoose.connection

database.on('error', console.error.bind(console, "Erro de conexão."))

database.once('open',()=>{
    console.log(`conexão estabelecida!`)

    let client = new Schema({
        id:Number,
        name:{
            type:String,
            required:true,
            index:{
                unique: true
            }
        },
        password:{
            type:String,
            required:true
        }
    }) 


    let User  = mongoose.model('users',client)

    let name = 'Juana'
    let password = '1234'
    let passSec = secure.encrypt(password)
    password = passSec

    let userTest = new User({
        name, 
        password
    }) 

    userTest.save(function(err, user){
        if(err) return console.error('erro ao salvar usuário!' + err)
        
        console.log('usuário salvo com sucesso!')
    })

})


/** endpoints */
app.get('/',(req,res)=>{

})

app.post('/',(req,res)=>{

})

app.put('/:id',(req,res)=>{

})

app.delete('/:id',(req,res)=>{

})
