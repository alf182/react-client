import React, { PropTypes } from 'react';

function Layout(props) {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <title>{props.title}</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, minimun-scale=1.0 "
        />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"/>
        <link 
          rel="stylesheet" 
          href={`${props.ip}select.css`}
        />
        <link
          rel="stylesheet"
          href={`${props.ip}styles.css`}
        />
      </head>
      <body>
        <div
          id="render-target"
          dangerouslySetInnerHTML={{
            __html: props.content,
          }}
        />
        <script src={`${props.ip}app.js`}/>
      </body>
    </html>
  );
}

Layout.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
};

export default Layout;
