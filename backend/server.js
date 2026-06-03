const express = require('express');
const cors = require('cors');
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Configure AWS
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const s3 = new AWS.S3();

// Configure multer to upload to S3
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME,
    key: function (req, file, cb) {
      cb(null, 'uploads/' + Date.now() + '-' + file.originalname);
    }
  })
});

let todos = [
  { id: 1, text: 'Learn DevOps', done: false, image: null },
  { id: 2, text: 'Deploy my first app', done: false, image: null }
];

// Get all todos
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

// Add todo with optional image
app.post('/api/todos', upload.single('image'), (req, res) => {
  const todo = {
    id: Date.now(),
    text: req.body.text,
    done: false,
    image: req.file ? req.file.location : null
  };
  todos.push(todo);
  res.json(todo);
});

app.listen(3001, () => console.log('Backend running on port 3001'));