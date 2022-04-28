var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.dev');

var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
	noInfo: true,
	publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

// app.use(express.static(paths.client('images')))
// app.use(express.static('static'))

var proxy = require('proxy-middleware');
var url = require('url');
// app.use('/images', proxy(url.parse('../WS/images')));
// app.use('/img', proxy(url.parse('../WS/img')));
app.use('/images', proxy(url.parse('http://z2/projs/kisla/X-react-starter/dev/WS/images')));

app.get('*', function (req, res) {
	res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

var server = app.listen(8000, '127.0.0.1', function (err) {
	if (err) {
		console.log(err);
		return;
	}
	var host = server.address().address
	var port = server.address().port
	console.log('Listening at http://%s:%s', host, port);
});
