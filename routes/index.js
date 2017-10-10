var express = require('express')

var router = express.Router()

/* GET HTML home page. */
router.get('/', (req, res) => res.render('index'))

router.get('/series', (req, res) => res.render('series'))

router.get('/category', (req, res) => res.render('category'))

router.get('/time', (req, res) => res.render('time'))

router.get('/genre', (req, res) => res.render('genre'))

router.get('/page', (req, res) => res.render('page'))

router.get('/reader', (req, res) => res.render('webindex'))

module.exports = router
