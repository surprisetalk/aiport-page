
var _ = require('underscore');
var pile_page = require('../aiport-pile-page/page.js');

// TODO: find defined error page, else pass the error on to the server to use default 404 page
// var errorer = ( scoop_page ) =>
// scoop_page.length ? _.first( scoop_page ) : error;
// var errorerer = () =>
// errorer( pile_page.fetch( {} ) );

var publisher = scoop_page =>
    scoop_page.length
	? _.first( scoop_page )
	: Promise.reject( { code: 404, msg: "page not found" } );

module.exports = ( params, query ) => 
    publisher( pile_page.fetch( { path: params.join('/') } ) );
