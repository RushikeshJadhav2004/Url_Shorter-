// controllers/url.js
const Url = require('../model/Url.js');
const shortid = require('shortid');

const shortenUrl = async (req, res) => {
  const { longUrl } = req.body;

  if (!longUrl) {
    return res.status(400).send('No URL provided');
  }

  const shortcode = shortid.generate();

  try {
    const newUrl = new Url({ longUrl, shortcode });
    await newUrl.save();

    const shortUrl = `${req.protocol}://${req.get('host')}/${shortcode}`;
    res.render('index.ejs', { shortUrl });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

const redirectToOriginal = async (req, res) => {
  const { shortCode } = req.params;

  try {
    const urlDoc = await Url.findOne({ shortcode: shortCode });
    if (urlDoc) {
      res.redirect(urlDoc.longUrl);
    } else {
      res.status(404).send('URL not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  shortenUrl,
  redirectToOriginal
};
