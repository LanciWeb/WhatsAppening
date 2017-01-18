$(function(){ //JQUERY DOCUMENT READY


$(document).ajaxError(function(event, jqxhr,settings, thrownError){
	if(primoAccesso)errorBox.fadeIn('fast');
	waiterBox.fadeOut('fast');
});

//COSTRUTTORE OGGETTI FEED RSS
function Feed(name, url, format, topic='generic'){
	this.name = name;
	this.url = url;
	this.format = format;
}

//GENEREAZIONE FEED RSS
var feedCorriere = new Feed('Corriere della Sera', 'http://xml.corriereobjects.it/rss/homepage.xml','xml');
var feedRepubblica = new Feed('La Repubblica', 'http://www.repubblica.it/rss/homepage/rss2.0.xml','xml');
var feedANSA = new Feed('ANSA', 'http://www.ansa.it/sito/notizie/topnews/topnews_rss.xml', 'xml');

//ALL'AVVIO 

var preferito = (localStorage.preferito) ? JSON.parse(localStorage.preferito) : feedCorriere;
switch(preferito.name){
	case 'Corriere della Sera':
	$('#CdS').parent().addClass('active');
	break;
	case 'La Repubblica':
	$('#Rep').parent().addClass('active');
	break;
	case 'ANSA':
	$('#ANSA').parent().addClass('active');
	break;
}
var waiterBox = $("#waiter");
var errorBox = $("#errorBox");
var waiterModal = $("#waiterModal");
var primoAccesso = true;
refresh(preferito);
setInterval(function(){refresh(preferito)}, 60000);

function refresh(fonte){
 var feed = 'feed=' + fonte.url;
 if (!primoAccesso) waiterModal.hide().fadeIn('fast');
 $.get('php/rss_caller.php', feed, function(data, status){})
 .done(function(data, status){
	$('#newsHolder .logoFonte').remove();
	$('#newsHolder article').remove();
	display(data, fonte);
	primoAccesso = false;
 })
 .always(function(){
	 if (primoAccesso) waiterBox.show().fadeOut('fast');
	 if(!primoAccesso) waiterModal.show().fadeOut('fast');
 })
 ;}

function display(data, fonte){
	var xmlDoc = $.parseXML(data);
	var xml = $(data);
	var result;
	parsingXML(fonte, xml);
	}


function parsingXML(fonte, xml){
	//creazione titolo e logo
		var $logoFonte = xml.find('image>url').text();
		var $linkLogo = xml.find('image>link').text();
		var $figure = $('<figure></figure>').addClass('logoFonte');
		var $aLogo = $('<a></a>').attr('href', $linkLogo).attr('target', '_blank');
		var $imgLogo = $('<img />').attr('src', $logoFonte).attr('alt',fonte.name).attr('title',fonte.name);
		var $hr = $('<hr/>');
		$aLogo.append($imgLogo);
		result = $figure.append($aLogo).append($hr);
		primoAccesso == true ? waiterBox.fadeOut('fast') : waiterModal.fadeOut('fast');
		$("#newsHolder").append(result);
		//creazione articoli
		xml.find('item').each(function(){
			var $article = $('<article></article>');
			if(fonte.name === 'La Repubblica') $article.addClass('rep');
			var $articleTitle = $(this).find('title').text();
			var $h2 = $('<h2></h2>').addClass('articleTitle').text($articleTitle);
			var $articleContent = $(this).find('description').text();
			var $link = $(this).find('link').text();
			var $address = $('<address></address>').addClass('address');
			var $a = $('<a></a>').text('leggi tutto >>').attr('href',$link).addClass();
			var $pubdate = $('<time></time>').text(formattaData($(this).find('pubDate').text()));
			$address.append($pubdate).append($a);
			$article.append($h2).append($articleContent).append($address);
			$("#newsHolder").append($article).fadeIn('slow');
		});
}


function formattaData(dataStringa){
	var giorni = ['Domenica','Lun','Mar','Mer','Gio','Ven','Sab'];
	var mesi = ['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre'];
	var dataConvertita = new Date(dataStringa);
	
	var giorno = giorni[dataConvertita.getDay()];
	var giornoNum =dataConvertita.getDate();
	var mese = mesi[dataConvertita.getMonth()];
	var anno = dataConvertita.getFullYear();
	var ora = dataConvertita.getHours();
	var minuti = dataConvertita.getMinutes();
	var secondi = dataConvertita.getSeconds();
	var dataIta = giorno+' '+giornoNum+' '+mese+' '+anno+' ('+ora+':'+minuti+':'+secondi+')  ';
	
	return dataIta;
}

//Cambio fonte
$('nav ul li').on('click', function(e){
	$('nav ul li').removeClass('active');
	var scelta = e.target.id;
	switch(scelta){
		case 'CdS':
		$('#CdS').parent().addClass('active');
		localStorage.preferito = JSON.stringify(feedCorriere);
		refresh(feedCorriere);
		break;
		case 'Rep':
		$('#Rep').parent().addClass('active');
		localStorage.preferito = JSON.stringify(feedRepubblica);
		refresh(feedRepubblica);
		break;	
		case 'ANSA':
		$('#ANSA').parent().addClass('active');
		localStorage.preferito = JSON.stringify(feedANSA);
		refresh(feedANSA);
		break;
	}
})

});//fine 