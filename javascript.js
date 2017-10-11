function createWindow(){
	var div = document.createElement("div");
	div.style = "position: fixed; top: 0; left: 0; z-index: 10000000; padding: 5px; background-color: #333333; border-radius: 5px;";
	div.dataset.x = 0;
	div.dataset.y = 0;
	div.dataset.xoff = 0;
	div.dataset.yoff = 0;
	div.dataset.width = 250;
	div.dataset.height = 250;
	div.style.width = div.dataset.width+"px"
	div.style.height = div.dataset.height+"px"
	div.addEventListener("mousedown",function(event){windowPick(event,this)});
	window.addEventListener("mouseup",function(event){windowRelease(event)});

		var windowDiv = document.createElement("div");
		windowDiv.style = 'display: grid; grid-template-columns: 1fr auto auto auto; grid-template-rows: auto auto; grid-template-areas: "linkInput watchButton embedButton closeButton" "iframe iframe iframe iframe";';

			var linkInput = document.createElement("input");
			linkInput.className = "linkInput";
			linkInput.type = "text";
			linkInput.width = "100%";
			linkInput.style = "grid-area: linkInput; border: 1px solid #eeeeee; border-radius: 2px;";

			var watchButton = document.createElement("button");
			watchButton.style = "grid-area: watchButton; border: 1px solid #aaaaaa; border-radius: 2px; background-color: #333333; color: #aaaaaa;";
			watchButton.innerHTML = "▶";
			watchButton.onclick = function(){iframeOpenLink(getWindowLink())};

			var embedButton = document.createElement("button");
			embedButton.style = "grid-area: embedButton; border: 1px solid #aaaaaa; border-radius: 2px; background-color: #333333; color: #aaaaaa;";
			embedButton.innerHTML = "☐";
			embedButton.onclick = function(){iframeOpenLink(embed(getWindowLink()))};

			var closeButton = document.createElement("button");
			closeButton.style = "grid-area: closeButton; border: 1px solid #aaaaaa; border-radius: 2px; background-color: #333333; color: #aaaaaa;";
			closeButton.innerHTML = "X";
			closeButton.onclick = function(){this.parentElement.parentElement.parentElement.removeChild(this.parentElement.parentElement);};

			var iframeDiv = document.createElement("div");
			iframeDiv.className = "iframeDiv";
			iframeDiv.style = "grid-area: iframe;";

		windowDiv.appendChild(linkInput);
		windowDiv.appendChild(watchButton);
		windowDiv.appendChild(embedButton);
		windowDiv.appendChild(closeButton);
		windowDiv.appendChild(iframeDiv);
		
	div.appendChild(windowDiv);
	document.body.appendChild(div);

	selected = div;
	iframeReset();
}

var selected;
var move = true;
function getWindowLink() {
	return selected.getElementsByClassName("linkInput")[0].value;
}
function windowPick(event,div) {
	selected = div;
	div.dataset.xoff = event.x-parseInt(div.dataset.x);
	div.dataset.yoff = event.y-parseInt(div.dataset.y);
	if(move) {
		window.addEventListener("mousemove",windowDrag);
	}	else	{
		window.addEventListener("mousemove",windowResize);
	}
}
function windowDrag(event) {
	selected.dataset.x = event.x-parseInt(selected.dataset.xoff);
	selected.dataset.y = event.y-parseInt(selected.dataset.yoff);
	selected.style.left = selected.dataset.x+"px";
	selected.style.top = selected.dataset.y+"px";
}
function windowResize(event) {
	selected.dataset.width = event.x-selected.dataset.x;
	selected.dataset.height = event.y-selected.dataset.y;
	selected.style.width = selected.dataset.width+"px"
	selected.style.height = selected.dataset.height+"px"
}
function windowRelease() {
	if(move) {
		window.removeEventListener("mousemove",windowDrag);
	}	else	{
		window.removeEventListener("mousemove",windowResize);
		iframeResize()
	}
}

function iframeReset() {
	selected.getElementsByClassName("iframeDiv")[0].innerHTML = '<iframe frameborder="0" allowfullscreen></iframe>';
	iframeResize();
	iframeOpenLink("https://www.youtube.com/embed/8_qL0Cjmvmk?modestbranding=1");
}
function iframeResize() {
	width = parseInt(selected.dataset.width);
	height = parseInt(selected.dataset.height)-20;
	var iframe = selected.getElementsByClassName("iframeDiv")[0].childNodes[0];
	iframe.width = width;
	iframe.height = height;
}
function iframeOpenLink(link) {
	var protocol = "";
	if(link.slice(0,8)==="https://") {
		protocol = "https://";
		link = link.slice(8,link.length);
	}	else if(link.slice(0,7)==="http://")	{
		protocol = "http://";
		link = link.slice(7,link.length);
	}	else	{
		protocol = "https://";
	}
	selected.getElementsByClassName("iframeDiv")[0].childNodes[0].src = protocol+link;
}

function embed(link) {
	var code = link.slice(32,link.length);
	return "https://www.youtube.com/embed/"+code+"?modestbranding=1";
}

createWindow();
