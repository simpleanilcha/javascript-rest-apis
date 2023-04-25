// Bring in the express server and create application
const express = require('express')
const app = express()

const pieRepo = require('./repos/pieRepo')

// Use the express Router object
const router = express.Router()
// const pies = pieRepo.get()

// Create GET to return a list of all pies
router.get('/', function (req, res, next) {
  // res.status(200).send(pies)

  // res.status(200).json({
  //   'status': 200,
  //   'statusText': 'OK',
  //   'message': 'All pies retrieved.',
  //   'data': pies
  // })

  pieRepo.get(function (data) {
    res.status(200).json({
      'status': 200,
      'statusText': 'OK',
      'message': 'All pies retrieved.',
      'data': data
    })
  }, function (err) {
    next(err)
  })

})

// Configure router so all routes are prefixed with /api/v1
app.use('/api/', router)

// Create server to listen on port 5000
const server = app.listen(5000, function () {
  console.log('Node server is running on http://localhost:5000..')
})