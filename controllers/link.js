const ShortURL = require("../models/url");
const { nanoid } = require("nanoid");
const validUrl = require("valid-url");
const qr = require("qrcode");

exports.genrateShortUrl = async (req, res, next) => {
  const { longUrl } = req.body;
  const baseUrl = process.env.BASE_URL;

  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json("Invalid base url");
  }

  const linkCode = nanoid(9);

  if (validUrl.isUri(longUrl)) {
    try {
      let urlData = await ShortURL.findOne({ longUrl });

      if (urlData) {
        const { urlCode } = urlData;
        res.redirect(`/link/${urlCode}`);
      } else {
        const shortUrl = baseUrl + "/" + linkCode;

        url = new ShortURL({
          longUrl,
          urlCode: linkCode,
          shortUrl,
          date: new Date(),
        });

        await url.save();
        res.redirect(`/link/${linkCode}`);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json("Server error");
    }
  } else {
    res.status(401).json("Invalid Url");
  }
};

exports.getShortUrl = async (req, res, next) => {
  const code = req.params.code;
  const data = await ShortURL.findOne({ urlCode: code });
  const { shortUrl, longUrl } = data;
  if (data && shortUrl) {
    qr.toDataURL(shortUrl, (err, src) => {
      res.render("link", {
        title: "Short Links",
        shortUrl,
        longUrl,
        qrUrl: src,
      });
    });
  }
};
