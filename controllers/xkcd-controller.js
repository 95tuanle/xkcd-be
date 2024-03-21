'use strict';
const {getLatestComic, getRandomComic, getComicByNumber, increaseViewCount} = require("../services/xkcd-service");
const z = require('zod');

exports.handleGetLatestComic = async (req, res) => {
  try {
    const comic = await getLatestComic();
    comic.view_count = await increaseViewCount(comic.num)
    return res.json(comic);
  } catch (error) {
    console.error('Error fetching JSON:', error);
    res.status(500).json({error: 'Failed to fetch JSON data'});
  }
}

exports.handleGetRandomComic = async (req, res) => {
  try {
    const comic = await getRandomComic();
    comic.view_count = await increaseViewCount(comic.num)
    return res.json(comic);
  } catch (error) {
    console.error('Error fetching JSON:', error);
    res.status(500).json({error: 'Failed to fetch JSON data'});
  }
}

exports.handleGetComicByNumber = [async (req, res, next) => {
  try {
    const {num} = await getLatestComic();
    const comicNumberSchema = z.object({
      id: z.number().gte(1).lte(num),
    });
    const parsed = comicNumberSchema.safeParse({
      id: Number(req.params.id)
    })
    if (!parsed.success) {
      return res.status(400).json({error: parsed.error.flatten().fieldErrors});
    }
    next();
  } catch (error) {
    console.error('Error fetching JSON:', error);
    res.status(500).json({error: 'Failed to fetch JSON data'});
  }
}, async (req, res) => {
  try {
    const {id} = req.params;
    const comic = await getComicByNumber(id);
    comic.view_count = await increaseViewCount(comic.num)
    return res.json(comic);
  } catch (error) {
    console.error('Error fetching JSON:', error);
    res.status(500).json({error: 'Failed to fetch JSON data'});
  }
}]