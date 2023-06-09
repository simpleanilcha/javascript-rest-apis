// Bring in the express server and create application
const express = require('express')
const app = express()
const pieRepo = require('./repos/pieRepo')
let errorHelper = require('./helpers/errorHelpers')
let cors = require('cors')

// Use the express Router object
const router = express.Router()

// Configure middleware to support JSON data parsing in request object
app.use(express.json())

// Configure CORS
app.use(cors())

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

// Create GET/search?id=n&name=str to search for pies by 'id and/or 'name'
router.get('/search', function (req, res, next) {
  const searchObject = {
    'id': req.query.id,
    'name': req.query.name
  }

  pieRepo.search(searchObject, function (data) {
    res.status(200).json({
      'status': 200,
      'statusText': 'OK',
      'message': '',
      'data': data
    })
  }, function (Err) {
    next(arr)
  })
})

// Create GET/id to return a list of all pies
router.get('/:id', function (req, res, next) {
  pieRepo.getById(req.params.id, function (data) {
    if (data) {
      res.status(200).json({
        'status': 200,
        'statusText': 'OK',
        'message': 'Single pie retrieved.',
        'data': data
      })
    } else {
      res.status(404).json({
        'status': 404,
        'statusText': 'Not Found',
        'message': 'The pie ' + req.params.id + ' could not be found',
        'error': {
          'code': 'NOT_FOUND',
          'message': 'The pie ' + req.params.id + ' could not be found.'
        }
      })
    }
  }, function (err) {
    next(err)
  })

})

// POST
router.post('/', function (req, res, next) {
  pieRepo.insert(req.body, function (data) {
    res.status(201).json({
      'status': 201,
      'statusText': 'Created',
      'message': 'New Pie Added.',
      'data': data
    })
  }, function (err) {
    next(err)
  })
})

// PUT
router.put('/:id', function (req, res, next) {
  pieRepo.getById(req.params.id, function (data) {
    if (data) {
      // Attempt to update the data
      pieRepo.update(req.body, req.params.id, function (data) {
        res.status(200).json({
          'status': 200,
          'statusText': 'OK',
          'message': "Pie '" + req.params.id + "' updated.",
          'data': data
        })
      })
    } else {
      res.status(404).json({
        'status': 404,
        'statusText': 'Not Found',
        'message': "The pie '" + req.params.id + "' could not be found.",
        'error': {
          'code': 'NOT_FOUND',
          'message': "The pie '" + req.params.id + "' could not be found."
        }
      })
    }
  }, function (err) {
    next(err)
  })
})

// DELETE
router.delete('/:id', function (req, res, next) {
  pieRepo.getById(req.params.id, function (data) {
    if (data) {
      // Attempt to delete the data
      pieRepo.delete(req.params.id, function (data) {
        res.status(200).json({
          'status': 200,
          'statusText': 'OK',
          'message': "The pie '" + req.params.id + "' is deleted.",
          'data': "Pie '" + req.params.id + "' deleted."
        })
      })
    } else {
      res.status(404).json({
        'status': 404,
        'statusText': 'Not Found',
        'message': "The pie '" + req.params.id + "' could not be found.",
        'error': {
          'code': 'NOT_FOUND',
          'message': "The pie '" + req.params.id + "' could not be found."
        }
      })
    }
  }, function (err) {
    next(err)
  })
})

// PATCH
router.patch('/:id', function (req, res, next) {
  pieRepo.getById(req.params.id, function (data) {
    if (data) {
      // Attempt to update the data
      pieRepo.update(req.body, req.params.id, function (data) {
        res.status(200).json({
          'status': 200,
          'statusText': 'OK',
          'message': "Pie '" + req.params.id + "' patched.",
          'data': data
        })
      })
    } else {
      res.status(404).json({
        'status': 404,
        'statusText': 'Not Found',
        'message': "Pie '" + req.params.id + "' could not be found.",
        'error': {
          'code': 'NOT_FOUND',
          'message': "Pie '" + req.params.id + "' could not be found."
        }
      })
    }
  })
})

// Configure router so all routes are prefixed with /api/v1
app.use('/api/', router)

// Configure exception logger to console
app.use(errorHelper.logErrorsToConsole)
// Configure exception logger to file
app.use(errorHelper.logErrorsToFile)
// Configure client error handler
app.use(errorHelper.clientErrorHander)
// Configure catch-all exception middleware last
app.use(errorHelper.errorHandler)

// function errorBuilder(err) {
//   return {
//     'status': 500,
//     'statusText': 'Internal Server Error',
//     'message': err.message,
//     'error': {
//       'errno': err.errno,
//       'call': err.syscall,
//       'code': 'INTERNAL_SERVER_ERROR',
//       'message': err.message
//     }
//   }
// }

// // Configure exception logger
// app.use(function (err, req, res, next) {
//   console.log(errorBuilder(err))
//   next(arr)
// })

// // Configure exception middleware last
// app.use(function (err, req, res, next) {
//   res.status(500).json(errorBuilder(err))
// })

// Create server to listen on port 5000
const server = app.listen(5000, function () {
  console.log('Node server is running on http://localhost:5000..')
})