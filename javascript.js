function createWindow(){
	var div = document.createElement("div");
	div.style = "position: fixed; top: 0; left: 0; z-index: 100; padding: 5px; background-color: #333333; border-radius: 5px;";
	div.dataset.x = 0;
	div.dataset.y = 0;
	div.dataset.xoff = 0;
	div.dataset.yoff = 0;
	div.addEventListener("mousedown",function(event){pick(event,this)});
	window.addEventListener("mouseup",function(event){release(event)});

		var windowDiv = document.createElement("div");
		windowDiv.innerHTML = createIframe("https://www.youtube.com/embed/8_qL0Cjmvmk?modestbranding=1");

		var toolBar = document.createElement("div");
		toolBar.style = 'display: grid; grid-template-columns: 1fr auto auto auto; grid-template-rows: auto auto; grid-template-areas: "linkInput watchButton embedButton close";';

			var linkInput = document.createElement("input");
			linkInput.type = "text";
			linkInput.width = "100%";
			linkInput.style = "grid-area: linkInput; border: 1px solid #eeeeee; border-radius: 2px;";

			var watchButton = document.createElement("button");
			watchButton.style = "grid-area: watchButton; border: 1px solid #aaaaaa; border-radius: 2px; background-color: #333333; color: #aaaaaa;";
			watchButton.innerHTML = "▶";
			watchButton.onclick = function(){openlink(this.parentElement.parentElement)};

			var embedButton = document.createElement("button");
			embedButton.style = "grid-area: embedButton; border: 1px solid #aaaaaa; border-radius: 2px; background-color: #333333; color: #aaaaaa;";
			embedButton.innerHTML = "☐";
			embedButton.onclick = function(){embed(this.parentElement.parentElement)};

		toolBar.appendChild(linkInput);
		toolBar.appendChild(watchButton);
		toolBar.appendChild(embedButton);
		
	div.appendChild(toolBar);
	div.appendChild(windowDiv);
	document.body.appendChild(div);
}

var selected;
function pick(event,div) {
	selected = div;
	div.dataset.xoff = event.x-parseInt(div.dataset.x);
	div.dataset.yoff = event.y-parseInt(div.dataset.y);
	window.addEventListener("mousemove",drag);
}
function drag(event) {
	selected.dataset.x = event.x-parseInt(selected.dataset.xoff);
	selected.dataset.y = event.y-parseInt(selected.dataset.yoff);
	selected.style.left = selected.dataset.x+"px";
	selected.style.top = selected.dataset.y+"px";
}
function release() {
	window.removeEventListener("mousemove",drag);
}

function openlink(div) {
	var link = div.childNodes[0].childNodes[0].value;
	div.childNodes[1].innerHTML = createIframe(link);
}
function embed(div,width,height) {
	var link = div.childNodes[0].childNodes[0].value;
	var code = link.slice(32,link.length);
	div.childNodes[1].innerHTML = createIframe("https://www.youtube.com/embed/"+code+"?modestbranding=1",width,height);
}
function createIframe(link,width,height) {
	if(link.slice(0,8)=="https://"||link.slice(0,7)=="http://") {}	else	{
		link = "https://"+link;
	}
	return '<iframe width="'+width+'" height="'+height+'" src="'+link+'" frameborder="0" allowfullscreen></iframe>';
}

createWindow();
