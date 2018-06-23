/* [javascript/Ajax Samples]
 * Summary: script for "photo gallery"
 * LastModified: 2009-04-22
 */

/*----------------------------------------------------------------------------
 Photo News Content
----------------------------------------------------------------------------*/
function photoGallery() {
	function $(id) {
		return document.getElementById(id);
	}
	var crIndex = 0;
	var c = {
		classL: "endL",
		classR: "endR",
		classOn: "on"
	};
	var entry = {
		date: $("entry-date"),
		title: $("entry-title"),
		pct: $("entry-pct"),
		img: new Image(),
		morelink: $("morelink"),
		links: $("entry-links")
	};
	entry.morelink.innerHTML = "&raquo; More";
	
	entry.links.style.display = "none";
	var permalinks = entry.links.getElementsByTagName("a");
	var zoomlinks = $("thumbs").getElementsByTagName("a");

	var wrap = $("entry-container");
	wrap.className = c.classL; // 預設為左邊
	
	function changeEntry() {
		entry.img.src = zoomlinks[crIndex].href;
		entry.img.alt = permalinks[crIndex].innerHTML;
		entry.date.innerHTML = zoomlinks[crIndex].getElementsByTagName("img")[0].alt;
		entry.title.innerHTML = permalinks[crIndex].innerHTML;
		entry.pct.appendChild(entry.img);
		entry.morelink.href = permalinks[crIndex].href;
		
		if (permalinks.length == 1) wrap.className = c.classR + " " + c.classL;
		else if (crIndex == permalinks.length - 1) wrap.className = c.classR;
		else if (crIndex == 0) wrap.className = c.classL;
		else wrap.className = "";
		
		for(var i = 0, l = permalinks.length; i < l; i ++) {
			if(i == crIndex) {
				zoomlinks[crIndex].className = c.classOn;
			} else {
				zoomlinks[i].className = "";
			}
		}
	}

	var preloads = [];
	for(var i = 0, l = permalinks.length; i < l; i ++) {
		// 預載處理
		preloads[i] = new Image();
		preloads[i].src = zoomlinks[i].href;
		
		// 為了將索引編號傳遞至之後 zoomlinks[i] 的 onclick 事件處理中
		zoomlinks[i].index = i;
		
		// 按下縮圖連結時的處理
		zoomlinks[i].onclick = function() {
			crIndex = this.index;
			changeEntry();
			return false;
		};
	}
	
	$("pctnav-prev").onclick = function() {
		if (crIndex == 0) return false;
		crIndex --;
		changeEntry();
		return false;
	};
	$("pctnav-next").onclick = function() {
		if (crIndex == permalinks.length - 1) return false;
		crIndex ++;
		changeEntry();
		return false;
	};
	
	changeEntry(); // 項目顯示起始化
}

/*----------------------------------------------------------------------------
onload event function
----------------------------------------------------------------------------*/
if(window.addEventListener) window.addEventListener("load", photoGallery, false);
else if(window.attachEvent) window.attachEvent("onload", photoGallery);


