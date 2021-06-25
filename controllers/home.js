const ShortURL = require('../models/url');

exports.getHome = async(req,res,next) => {
  res.render("index", { title: "Short Links" });
}

exports.redirectToURL = async(req,res,next)=>{
  try {
    const url = await ShortURL.findOne({ urlCode: req.params.code });

    if (url) {
      url.clicks++;
      await url.save();
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json("No url found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Server error");
  }
}