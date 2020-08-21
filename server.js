const express = require('express');
const app = express();
const path = require('path');
const axios = require('axios');

// app.use('/dist',express.static(path.join(__dirname,'dist')))
// app.use(express.json())



// app.get('/',(req,res,next)=>{
//     res.sendFile(path.join(__dirname,'index.html'));
// });

// app.listen(3001,()=>console.log('Listening on port 3001'));


const PORT = process.env.PORT || 3000;
const PUBLIC_PATH = path.join(__dirname, './public');
const DIST_PATH = path.join(__dirname, './dist');
app.use(express.json());

app.use(express.static(DIST_PATH));
app.use(express.static(PUBLIC_PATH));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(PUBLIC_PATH, './index.html'));
// });

app.listen(3001,()=>console.log('Listening on port 3001'));