import React from 'react';
import Express from 'express';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import Pages from './routes/Page';
import Layout from './routes/components/Layout';

const app = Express();

function requestHandler(request, response) {
  const context = {};

  const html = renderToString(
    <StaticRouter location={request.url} context={context}>
      <Pages />
    </StaticRouter>,
    );

  response.setHeader('Content-Type', 'text/html');

  if (context.url) {
    response.writeHead(301, {
      Location: context.url,
    });
    response.end();
  }

  response.write(
    renderToStaticMarkup(
      <Layout
        title="Ejemplo Node React"
        ip="http://192.168.4.34:3001/"
        content={html}
      />
    ),
  );
  response.end();
}

app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.all('*', (req, res) => {
  requestHandler(req, res);
});


app.listen(3000, () => {
  console.log('El server inicio en el puerto 3000');
});
