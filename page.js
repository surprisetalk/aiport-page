
var _ = require('underscore');
var pile = require('../aiport-pile/pile.js');
var scrap = require('../aiport-scrap/scrap.js');

// TODO: error handling

var pageleter = query => pagelet_data =>
    scrap( pagelet_data.scrap )( "options" in pagelet_data ? pagelet_data.options : {}, pageletser( "pagelets" in pagelet_data ? pagelet_data.pagelets : [] ) )( query );

var pageletser = pagelets_data => query =>
    Promise.all( pagelets_data.map( pageleter( query ) ) )
        .then( htmls => htmls.join('') );

var pager = query => page_data =>
    pageletser( "pagelets" in page_data ? page_data.pagelets : [] )( query );

var scooper = scoop_page =>
    scoop_page.length
	? _.first( scoop_page )
	: Promise.reject( { code: 404, msg: "page not found" } );

module.exports = ( params, query ) => 
    pile('page')
        .fetch( { route: params.join('/') } )
        .then( scooper )
        .then( pager( query ) );
