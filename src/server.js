
import path from 'path';
import { Server } from 'http';
import Express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from './routes';
import request from 'request';
import NotFoundPage from './components/NotFoundPage';

const app = new Express();
const server = new Server(app);

const API_PATH = "http://wp8m3he1wt.s3-website-ap-southeast-2.amazonaws.com/api/products/";

app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.set('views', path.join(__dirname, 'static'));

app.use(Express.static(path.join(__dirname, 'static')));

app.get('/api/products/:id', function(req, res) {
    let params = req.params;

    if (!params) {
        params = {id: 1};
    }

    request(API_PATH + params.id, loaded);

    function loaded(error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(body);
        } else {
            res.send('error');
        }
    }
});

app.get('*', (req, res) => {
  match(
        { routes, location: req.url },
        (error, redirectLocation, renderProps) => {
            if (error) {
                res.status(500).send(error.message)
            } else if (redirectLocation) {
                res.redirect(302, redirectLocation.pathname + redirectLocation.search)
            } else if (renderProps) {
                res.status(200).send(renderToString(<RouterContext {...renderProps} />))
            } else {
                res.status(404).send('Not found')
            }
        }
  );
});

// start the server
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';
server.listen(port, err => {
    if (err) {
        return console.error(err);
    }
    console.info(`Server running on http://localhost:${port} [${env}]`);
});