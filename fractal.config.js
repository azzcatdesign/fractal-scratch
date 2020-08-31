'use strict';

/*
* Require the path module
*/
const path = require('path');

/* Create a new Fractal instance and export it for use elsewhere if required */
const fractal = module.exports = require('@frctl/fractal').create();

/* Set up Handlebars */
const hbs = require('@frctl/handlebars')({
  helpers: {
      eq: function(valueone, valuetwo) {
        return valueone == valuetwo;
      }
  }
  /* other configuration options here */
});

fractal.components.engine(hbs);

/* Set the title of the project */
fractal.set('project.title', 'Scratch Component Library');

/* Tell Fractal where the components will live */
fractal.components.set('path', __dirname + '/src/components');

/* Tell Fractal where the documentation pages will live */
fractal.docs.set('path', __dirname + '/src/docs');

/* Tell Fractal where static assets will live */
fractal.web.set('static.path', __dirname + '/public');

/* Tell Fractal the directory within which any static HTML exports of the web UI should be generated. */
fractal.web.set('builder.dest', __dirname + '/build');

/* Little bit of styling for Fractal views. */
fractal.components.set('default.collator', function(markup, item) {
  return `<div style="margin-bottom:20px;">\n${markup}\n</div>\n`
});
