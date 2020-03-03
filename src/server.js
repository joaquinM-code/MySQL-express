const express = require('express');
const routes = require('./routes')

const app = express();
app.use(express.json());

app.use(routes);
app.use(express.static('public'));


const port = process.env.PORT || 3000;
app.listen(port , ()=>{
    console.log('Listening on port ' + port)
})


