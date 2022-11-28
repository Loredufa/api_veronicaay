const express = require ('express');

const bodyParser = require('body-parser');
const cors = require('cors');
//const axios = require('axios');
const {getAlbum} = require('./google_photos');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
   

const PORT = 3050;

const app = express()
app.use(bodyParser.json());
app.use(cors())


// app.use(function(req, res, next) {
//     const origin = req.headers.origin;
//     if(origin){
//          res.setHeader('Access-Control-Allow-Origin', origin);
//     }
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

  
  app.get('/', (req, res) => {
    res.send('wellcome to my api')
});

  app.get('/:id', async function(request, response) {
    try {
      const results = await getAlbum(request.params.id)
      response.json(results);
      console.log('Google')
    }
    catch(e) {
      response.status(500) 
    }
  });


//connection
app.listen(PORT, () => 
console.log(`Servidor corriendo en el puerto ${PORT}`));