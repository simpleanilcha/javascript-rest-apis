// Bring in the express server and create application
const express = require('express')
const app = express()

// Use the express Router object
const router = express.Router()
const pies = [
  { 'id': 1, 'name': 'Apple' },
  { 'id': 2, 'name': 'Cherry' },
  { 'id': 3, 'name': 'Peach' },
]

// Create GET to return a list of all pies
router.get('/', function (req, res, next) {
  // res.status(200).send(pies)
  res.status(200).json({
    'status': 200,
    'statusText': 'OK',
    'message': 'All pies retrieved.',
    'data': pies
  })
})

// Configure router so all routes are prefixed with /api/v1
app.use('/api/', router)

// Create server to listen on port 5000
const server = app.listen(5000, function () {
  console.log('Node server is running on http://localhost:5000..')
})