function init(){
	setTimeout("refresh()",0);
	setInterval("rerfresh()",300000);
}

var first = true;

function refresh(){
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'php/rss_caller.php?feed=http://xml.corriereobjects.it/rss/homepage.xml', true);
	xhr.onreadystatechange = function(){
		if(this.readyState = 4){
			if(this.status = 200){
				$('#waiter').fadeOut('fast');
				$('#newsHolder').html(parseRSS(this.responseXML));
			}
			else{
				if(first){
					first = false; 
					$('#error').fadeIn('fast');
				}
				else{				
				$('#waiter').fadeOut('fast');
			}
		}
}