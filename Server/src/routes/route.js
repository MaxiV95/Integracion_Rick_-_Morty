const getCharById = require('../controllers/getCharById')
const { postUser, login } = require('../controllers/login')
const { postFav, getFavs, deleteFav } = require('../controllers/favorites')

const router = require('express').Router();

router.get('/character/:id', getCharById)

router.post('/fav', postFav)
router.get('/fav', getFavs)
router.delete('/fav/:id', deleteFav)

router.post('/login', postUser)
router.get('/login', login)

module.exports = router

//router.post('/fav', (req, res) => postFav(req, res) );