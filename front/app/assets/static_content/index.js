// Require MANUALLY the content that should make it to the bundle without
// hashing its name, for things like favico or robots
// require('file?name=[name].[ext]!./favicon.ico');
// require('file?name=[name].[ext]!./robots.txt');
import '!style-loader!css-loader!bootstrap/dist/css/bootstrap-theme.min.css';
import '!style-loader!css-loader!bootstrap/dist/css/bootstrap.min.css';
import '!style-loader!css-loader!assets/fonts/font-awesome-4.7.0/css/font-awesome.min.css';
