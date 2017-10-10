var express = require('express')
var novels = require('./novels')

var router = express.Router()

const routeHandler = (req, res, routeName, callback) => {
  const postdata = req.query
  if (Object.keys(postdata).length < 1) {
    res.redirect(routeName)
  } else {
    //Allow anyone to access the data, can be set to specific domain
    res.setHeader('Access-Control-Allow-Origin', '*')
    try {
      return callback(postdata, res)
    } catch (err) {
      res.send({ error: err })
    }
  }
}

router.get('/', (req, res) =>
  routeHandler(req, res, '/series.html', novels.seriesTitleFilterByDownload)
)

router.get('/category', (req, res) =>
  routeHandler(
    req,
    res,
    '/category.html',
    novels.seriesCategoryFilterByDownload
  )
)

router.get('/genre', (req, res) =>
  routeHandler(req, res, '/genre.html', novels.seriesGenreFilterByDownload)
)

router.get('/time', (req, res) =>
  routeHandler(req, res, '/time.html', novels.lastUpdatesTimeByDownload)
)

router.get('/page', (req, res) =>
  routeHandler(req, res, '/page.html', novels.pageDownload)
)

module.exports = router
