// Create web server for comments

// Import modules
const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

// Create web server
const app = express();

// Set port
const port = 3000;

// Set static directory
app.use(express.static(path.join(__dirname, 'public')));

// Set body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set comments file
const commentsFile = path.join(__dirname, 'comments.json');

// Set comments
let comments = [];

// Check if comments file exists
if (fs.existsSync(commentsFile)) {
  // Read comments from file
  comments = JSON.parse(fs.readFileSync(commentsFile));
} else {
  // Create comments file
  fs.writeFileSync(commentsFile, '[]');
}

// Create route for comments
app.get('/comments', (req, res) => {
  // Send comments
  res.send(comments);
});

// Create route for adding comments
app.post('/comments', (req, res) => {
  // Create comment
  const comment = {
    id: comments.length + 1,
    name: req.body.name,
    comment: req.body.comment,
  };
  // Add comment to comments
  comments.push(comment);
  // Write comments to file
  fs.writeFileSync(commentsFile, JSON.stringify(comments));
  // Send comment
  res.send(comment);
});

// Create route for deleting comments
app.delete('/comments/:id', (req, res) => {
  // Delete comment
  comments = comments.filter((comment) => comment.id !== Number(req.params.id));
  // Write comments to file
  fs.writeFileSync(commentsFile, JSON.stringify(comments));
  // Send comment
  res.send({});
});

// Start web server
app.listen(port, () => console.log(`Server listening on port ${port}`));
