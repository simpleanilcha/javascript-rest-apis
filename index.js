// Bring in the express server and create application
const express = require('express')
const app = express()

// Use the express Router object
const router = express.Router()

// Create GET to return a list of all pies
router.get('/', function (req, res, next) {
  res.send('Orange')
})

// Configure router so all routes are prefixed with /api/v1
app.use('/api/', router)

// Create server to listen on port 5000
const server = app.listen(5000, function () {
  console.log('Node server is running on http://localhost:5000..')
})