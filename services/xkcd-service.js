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