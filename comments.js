// Create web server whi express and node.js to handle comments

// Import express module
const express = require('express');
// Import body-parser module
const bodyParser = require('body-parser');
// Import fs module
const fs = require('fs');
// Import path module
const path = require('path');

// Create express app
const app = express();
// Set port
const port = 3000;

// Use body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Get comments
app.get('/comments', (req, res) => {
  fs.readFile('comments.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading comments.json');
    } else {
      res.send(data);
    }
  });
});

// Post comments
app.post('/comments', (req, res) => {
  fs.readFile('comments.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading comments.json');
    } else {
      const comments = JSON.parse(data);
      const newComment = {
        id: comments.length + 1, // Auto increment id
        name: req.body.name,
        comment: req.body.comment
      };
      comments.push(newComment);
      fs.writeFile('comments.json', JSON.stringify(comments), (err) => {
        if (err) {
          res.status(500).send('Error writing comments.json');
        } else {
          res.send(newComment);
        }
      });
    }
  }
)});
