$(function(){ //JQUERY DOCUMENT READY

//feed object constructor; topic opzionale
function Feed(name, url, format, topic='generic'){
	this.name = name;
	this.url = url;
	this.format = format;
}
//generazione feed
var feedCorriere = new Feed('Corriere della Sera', 'http://xml.corriereobjects.it/rss/homepage.xml','xml');

var primoAccesso = true;
refresh();
// setInterval(function(){refresh()}, 3000);

function refresh(){
 var feed = 'feed=' + feedCorriere.url;
 $.get('php/rss_caller.php', feed, function(data){
	display(data);
	primoAccesso = false;
 });
}

function display(data){
	var xmlDoc = $.parseXML(data);
	var xml = $(data);
	result = xml.text();
	$("#newsHolder").html(result);
}

});//fine 