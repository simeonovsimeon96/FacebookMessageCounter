var curr = "";
var children = document.getElementById('js_5');
var elem = document.createElement("span");
elem.setAttribute("id", "message_count_container");
elem.innerHTML = "";
children.appendChild(elem);

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function loadData(url) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      updateResult(this.responseText);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

function updateResult(source){
	var start_string = 'require("InitialJSLoader").handleServerJS(';
	var start = source.indexOf(start_string);
	var end = source.indexOf(',"iw");}');
	var new_html = source.substr(start+start_string.length,end-start-start_string.length);
	source = new_html;
	var vanityX = window.location.href.replace("https://www.messenger.com/t/","");
	var jobj = JSON.parse(source);
	var final_jobj = -1;
	for ( i = 0; i < jobj.require.length; i++)
	{
		var sess = jobj.require[i];
		if (sess[3] != undefined)
		{
			if (sess[3][1] != undefined)
			{
				if (sess[3][1].mercuryPayload != undefined)
				{
					final_jobj = sess[3][1].mercuryPayload;
					break;
				}
				else 
					continue;
			}
			else 
				continue;
		}
		else 
			continue;
	}
	var threadobj = final_jobj.threads; 
	var participantsobj = final_jobj.participants; 
	var id = "";
	for ( i = 0; i < participantsobj.length; i++)
	{
		if (participantsobj[i].vanity == vanityX)
		{
			id = participantsobj[i].fbid;
			break;
		}
		else if (participantsobj[i].fbid == vanityX)
		{
			id = participantsobj[i].fbid;
			break;
		}
		else
			continue;
	}
	if (id == "")
		id = vanityX;
	var message_count = "Nothing found";
	for ( i = 0; i < threadobj.length; i++)
	{
		if (threadobj[i].thread_fbid == id)
		{
			message_count = threadobj[i].message_count;
			break;
		}
		else if (threadobj[i].thread_fbid == vanityX)
		{
			message_count = threadobj[i].message_count;
			break;
		}
		else
			continue;
	}
	message_count = numberWithCommas(message_count);
	document.getElementById("message_count_container").innerHTML = " ("+message_count+")";
}  

var time = setInterval(function() {
        while( window.location.href != curr)
		{
			document.getElementById("message_count_container").innerHTML = " ("+"Loading..."+")";
			loadData(window.location.href);
			curr = window.location.href;
		}
}, 10);
