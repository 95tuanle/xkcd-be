'use strict';
const XKCD = require('../models/xkcd.model');
const domain = 'https://xkcd.com';
const jsonPath = '/info.0.json';

exports.getLatestComic = async () => {
  const response = await fetch(`${domain}${jsonPath}`)
  if (response.headers.get('content-type').includes('application/json')) {
    return await response.json();
  } else {
    throw new Error('Received non-JSON response');
  }
}

exports.getComicByNumber = async (id) => {
  const response = await fetch(`${domain}/${id}${jsonPath}`)
  if (response.headers.get('content-type').includes('application/json')) {
    return await response.json();
  } else {
    throw new Error('Received non-JSON response');
  }
}

exports.getRandomComic = async () => {
  const {num} = await this.getLatestComic();
  return await this.getComicByNumber(Math.floor(Math.random() * num) + 1);
}


exports.increaseViewCount = async (num) => {
  try {
    const {viewCount} = await XKCD.findOneAndUpdate({num: num}, {$inc: {viewCount: 1}}, {
      new: true, upsert: true, setDefaultsOnInsert: true
    }).exec();
    return viewCount;
  } catch (error) {
    throw new Error('Failed to increase view count');
  }
}