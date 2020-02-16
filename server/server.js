const express = require('express');
const app = express();
const port = 3000;
const questions = require('./routes/questionRoutes');
const answers = require('./routes/answerRoutes');
const cors = require('cors');

app.use(cors());
app.use('/qa/:product_id', questions);
app.use('/qa/question', questions);
app.use('/qa/:question_id/answers', answers);
app.use('/qa/answer', answers);

app.listen(port, () => { console.log(`The sever is running on port ${port}`)});


/* 
Still need to add code to support parameters that are possible in client side queries
In an HTTP GET request, parameters are sent as a query string:

http://example.com/page?parameter=value&also=another

In an HTTP POST or PUT request, the parameters are not sent along with the URI, but in the request body. Parameters noted for each route below follow this standard.
*/