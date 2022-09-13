const PORT = 8000
const express = require("express")
const {MongoClient} = require('mongodb')
const { v4:uuidv4 } = require('uuid')
const uri = "mongodb+srv://sulei:1234@bookdate.hpeyz5g.mongodb.net/?retryWrites=true&w=majority"

const app = express()
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
app.use(express.json());
app.use(cors());
mongoose.connect(uri);
const BookModel = require("./models/BookList");


app.get('/', (req,res)=> {
  res.json("Hello to my app")
})

// Sign up to the Database
app.post('/signup', async (req, res) => {
  const client = new MongoClient(uri)
  const {email, password} = req.body

  const generatedUserId = uuidv4()
  const hashedPassword = await bcrypt.hash(password, 10)

  try {
      await client.connect()
      const database = client.db('test')
      const users = database.collection('users')

      const existingUser = await users.findOne({email})

      if (existingUser) {
          return res.status(409).send('User already exists. Please login')
      }

      const sanitizedEmail = email.toLowerCase()

      const data = {
          user_id: generatedUserId,
          email: sanitizedEmail,
          hashed_password: hashedPassword
      }

      const insertedUser = await users.insertOne(data)

      const token = jwt.sign(insertedUser, sanitizedEmail, {
          expiresIn: 60 * 24
      })
      res.status(201).json({token, userId: generatedUserId})

  } catch (err) {
      console.log(err)
  } finally {
      await client.close()
  }
})

// Log in to the Database
app.post('/login', async (req, res) => {
  const client = new MongoClient(uri)
  const {email, password} = req.body

  try {
      await client.connect()
      const database = client.db('test')
      const users = database.collection('users')

      const user = await users.findOne({email})

      const correctPassword = await bcrypt.compare(password, user.hashed_password)

      if (user && correctPassword) {
          const token = jwt.sign(user, email, {
              expiresIn: 60 * 24
          })
          res.status(201).json({token, userId: user.user_id})
      }

      res.status(400).json('Invalid Credentials')

  } catch (err) {
      console.log(err)
  } finally {
      await client.close()
  }
})
app.get('/users', async (req,res)=>{
  const client = new MongoClient(uri)

  try{
    await client.connect()
    const database = client.db('test')
    const users = database.collection('users')

    const returnedUsers = await users.find().toArray()
    res.send(returnedUsers)
  }finally{
    await client.close()
  }
})


app.get("/getBooks", (req, res) => {
  BookModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.listen(PORT, () => console.log("Running on PORT " + PORT))