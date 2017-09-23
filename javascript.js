function createWindow(){
	var div = document.createElement("div");
	div.style = "position: fixed; top: 0; left: 0; z-index: 100; padding: 5px; background-color: #333333; border-radius: 5px;";
	div.dataset.x = 0;
	div.dataset.y = 0;
	div.dataset.xoff = 0;
	div.dataset.yoff = 0;
	div.dataset.width = 250;
	div.dataset.height = 250;
	div.style.width = div.dataset.width+"px"
	div.style.height = div.dataset.height+"px"
	div.addEventListener("mousedown",function(event){pick(event,this)});
	window.addEventListener("mouseup",function(event){release(event)});

		var windowDiv = document.createElement("div");
		windowDiv.style = 'display: grid; grid-template-columns: 1fr auto auto auto; grid-template-rows: auto auto; grid-template-areas: "linkInput watchButton embedButton closeButton" "iframe iframe iframe iframe";';

			var linkInput = document.createElement("input");
			linkInput.id = "linkInput";
			linkInput.type = "text";
			linkInput.width = "100%";
			linkInput.style = "grid-area: linkInput; border: 1px solid #eeeeee; border-radius: 2px;";

			var watchButton = document.createElement("button");
			watchButton.style = "grid-area: watchButton; border: 1px solid #aaaaaa; border-radius: 2px; background-color: #333333; color: #aaaaaa;";
			watchButton.innerHTML = "▶";
			watchButton.onclick = function(){openlink(document.getElementById("linkInput").value)};

			var embedButton = document.createElement("button");
			embedButton.style = "grid-area: embedButton; border: 1px solid #aaaaaa; border-radius: 2px; background-color: #333333; color: #aaaaaa;";
			embedButton.innerHTML = "☐";
			embedButton.onclick = function(){openlink(embed(document.getElementById("linkInput").value))};

			var closeButton = document.createElement("button");
			closeButton.style = "grid-area: closeButton; border: 1px solid #aaaaaa; border-radius: 2px; background-color: #333333; color: #aaaaaa;";
			closeButton.innerHTML = "X";
			closeButton.onclick = function(){this.parentElement.parentElement.parentElement.removeChild(this.parentElement.parentElement);};

			var iframeDiv = document.createElement("div");
			iframeDiv.id = "iframeDiv";
			iframeDiv.style = "grid-area: iframe;";

		windowDiv.appendChild(linkInput);
		windowDiv.appendChild(watchButton);
		windowDiv.appendChild(embedButton);
		windowDiv.appendChild(closeButton);
		windowDiv.appendChild(iframeDiv);
		
	div.appendChild(windowDiv);
	document.body.appendChild(div);

	selected = div;
	openlink("https://www.youtube.com/embed/8_qL0Cjmvmk?modestbranding=1");
}

var selected;
function pick(event,div) {
	selected = div;
	div.dataset.xoff = event.x-parseInt(div.dataset.x);
	div.dataset.yoff = event.y-parseInt(div.dataset.y);
	if(true) {
		window.addEventListener("mousemove",drag);
	}
}
function drag(event) {
	selected.dataset.x = event.x-parseInt(selected.dataset.xoff);
	selected.dataset.y = event.y-parseInt(selected.dataset.yoff);
	selected.style.left = selected.dataset.x+"px";
	selected.style.top = selected.dataset.y+"px";
}
function resize(event) {
	selected.dataset.width = event.x-selected.dataset.x;
	selected.dataset.height = event.y-selected.dataset.y;
	selected.style.width = selected.dataset.width+"px"
	selected.style.height = selected.dataset.height+"px"
}
function release() {
	window.removeEventListener("mousemove",drag);
}

function openlink(link) {
	document.getElementById("iframeDiv").innerHTML = createIframe(link);
}
function embed(link) {
	var code = link.slice(32,link.length);
	return "https://www.youtube.com/embed/"+code+"?modestbranding=1";
}
function createIframe(link) {
	width = parseInt(selected.dataset.width);
	height = parseInt(selected.dataset.height)-20;
	if(link.slice(0,8)=="https://"||link.slice(0,7)=="http://") {}	else	{
		link = "https://"+link;
	}
	return '<iframe width="'+width+'" height="'+height+'" src="'+link+'" frameborder="0" allowfullscreen></iframe>';
}

createWindow();
