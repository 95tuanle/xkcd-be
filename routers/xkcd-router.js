'use strict';
const {Router} = require('express');
const {handleGetLatestComic, handleGetRandomComic, handleGetComicByNumber} = require("../controllers/xkcd-controller");
const router = Router();

router.get('/random', handleGetRandomComic);

router.get('/latest', handleGetLatestComic);

router.get('/num/:id', handleGetComicByNumber);

module.exports = router;