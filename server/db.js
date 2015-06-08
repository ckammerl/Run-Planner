var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// connect to mongo database named runplanner
mongoose.connect('mongodb://localhost/runplanner');

var db = mongoose.connection;

db.on('error', function() {
  console.error('database connection error');
})
db.once('open', function() {
  console.log('Mongodb connected');
})

// weather schema
var clothesSchema = new mongoose.Schema({
  gender: String,
  temp30: {
    top: String,
    bottom: String
  },
  temp40: {
    top: String,
    bottom: String
  },
  temp50: {
    top: String,
    bottom: String
  },
  temp60: {
    top: String,
    bottom: String
  },
  temp70: {
    top: String,
    bottom: String
  },
  temp80: {
    top: String,
    bottom: String
  }
});

var Clothes = mongoose.model('clothes', clothesSchema);

// insert men's clothes data into the mongo database
var mensClothes = new Clothes({
  gender: 'male',
  temp30: {
    top: 'http://static.parastorage.com/media/13160d_e13d83e048dd42818572725427fe5952.png_256',
    bottom: 'http://i00.i.aliimg.com/wsphoto/v0/32315814164_1/2015-New-Joggers-font-b-Pants-b-font-Sport-Men-font-b-Pants-b-font-Casual.jpg'
  },
  temp40: {
    top: 'http://www.sweatvac.com/filebin/images/pzoom/tee-long-sleeve/Sweatvac-Race-Tee-Unisex-Long-Sleeve-White.jpg',
    bottom: 'http://www.dickssportinggoods.com/graphics/product_images/pDSP1-17716865v750.jpg'
  },
  temp50: {
    top: 'http://site.topdogshirts.com/images/ss/790gold.jpg',
    bottom: 'http://www.dickssportinggoods.com/graphics/product_images/pDSP1-17716865v750.jpg'
  },
  temp60: {
    top: 'http://site.topdogshirts.com/images/ss/790gold.jpg',
    bottom: 'http://www.dickssportinggoods.com/graphics/product_images/pDSP1-17716865v750.jpg'
  }
});
mensClothes.save(function(err, clothes) {
  if (err) return console.error(err);
});

// insert women's clothes data into the mongo database
var womensClothes = new Clothes({
  gender: 'female',
  temp30: {
    top: 'http://images.citysports.com/f/726/28361/24h/www.citysports.com/assets/product_images/229762_md.jpg',
    bottom: 'http://www.dickssportinggoods.com/graphics/product_images/pDSP1-14576525dt.jpg'
  },
  temp40: {
    top: "http://nextadventure.net/images/detailed/7/White-Sierra-Marsh-Long-Sleeve-Tee-Shirt-Women's.jpg",
    bottom: 'http://www.dickssportinggoods.com/graphics/product_images/pDSP1-14576525dt.jpg'
  },
  temp50: {
    top: 'http://www.dickssportinggoods.com/graphics/product_images/pDSP1-17820366p275w.jpg',
    bottom: 'http://www.dickssportinggoods.com/graphics/product_images/pDSP1-10597172p275w.jpg'
  },
  temp60: {
    top: 'http://www.dickssportinggoods.com/graphics/product_images/pDSP1-17820366p275w.jpg',
    bottom: 'http://www.dickssportinggoods.com/graphics/product_images/pDSP1-10597172p275w.jpg'
  }
});
womensClothes.save(function(err, clothes) {
  if (err) return console.error(err);
});


// exports the Clothes schema for use in the server
module.exports = Clothes;