'use strict';

function injectScriptFile(filePath) {
	const script = document.createElement("script");
	script.src = chrome.runtime.getURL(filePath);
	script.onload = function () {
	  this.remove();
	};
	(document.head || document.documentElement).appendChild(script);
}

function injectHTMLFile(filePath) {
	const xhr = new XMLHttpRequest();
	xhr.open('GET', chrome.runtime.getURL(filePath), true);
	xhr.onreadystatechange = function() {
	  if (xhr.readyState === 4 && xhr.status === 200) {
		document.documentElement.innerHTML = xhr.responseText;
	  }
	};
	xhr.send();
	
}

function window_add(title, reason) {
    let menuId = 0;

    if (!document.getElementById("gradient-style")) {
		const style = document.createElement("style");
		style.id = "gradient-style";
		style.textContent = `
		  @keyframes gradientMove {
			0% { background-position: 0% 50%; }
			50% { background-position: 100% 50%; }
			100% { background-position: 0% 50%; }
		  }
		`;
		document.head.appendChild(style);
	  }

      const menu = document.createElement("div");

      menu.style.width = "500px";
      menu.style.padding = "15px";
      menu.style.background = "#333";
      menu.style.color = "white";
      menu.style.borderRadius = "8px";
      menu.style.position = "absolute";
      menu.style.cursor = "grab";
      menu.style.userSelect = "none";
	  menu.style.zIndex = "10030"
      menu.style.resize = "both";
      menu.style.overflow = "auto";
      menu.style.top = `${100 + menuId * 30}px`;
      menu.style.left = `${100 + menuId * 30}px`;
	  menu.style.opacity = "0.9"

      menu.style.background = "linear-gradient(-45deg, #1a1a2e, #16213e, #0f3460, #1a1a2e)";
      menu.style.backgroundSize = "600% 600%";
      menu.style.animation = "gradientMove 5s ease infinite";

      menu.innerHTML = `
        <h1>${title}<button style="
            position: absolute;
            top: 5px;
            right: 5px;
            background: transparent;
            color: white;
            border: none;
            font-size: 18px;
            cursor: pointer;
          " title="閉じる">❌</button></h1>
        <p>${reason}</p>
      `;

      document.body.appendChild(menu);
      const closeButton = menu.querySelector("button");
      closeButton.addEventListener("click", () => {
        menu.remove();
      });

      makeDraggable(menu);
      menuId++;

    function makeDraggable(el) {
      let isDragging = false;
      let offsetX = 0;
      let offsetY = 0;

      el.addEventListener("mousedown", (e) => {
		if (e.target.tagName === "BUTTON" || e.offsetX > el.clientWidth - 16 && e.offsetY > el.clientHeight - 16) return;
		
        isDragging = true;
        offsetX = e.clientX - el.offsetLeft;
        offsetY = e.clientY - el.offsetTop;
      });

      document.addEventListener("mousemove", (e) => {
        if (isDragging) {
          el.style.left = `${e.clientX - offsetX}px`;
          el.style.top = `${e.clientY - offsetY}px`;
        }
      });

      document.addEventListener("mouseup", () => {
        isDragging = false;
      });
    }
}

function replace_name() {
	injectScriptFile("js/main.js");
}

function replace_drilljs() {
	// injectScriptFile("drill.js")
	return;
}

function replace_homejs() {
	injectScriptFile("js/home.js");
}

function replace_lookjs() {
	const gadgets_html = chrome.runtime.getURL("html/gadgets.html");

	const script = document.createElement("script");
	script.src = chrome.runtime.getURL("js/lookingback.js");
	script.onload = function () {
		window.postMessage(
			{
			  type: "ELIBMAGICK_GADGETS_EDIT_URL",
			  url: gadgets_html
			},
			"*"
		  );
		this.remove();
	};
	(document.head || document.documentElement).appendChild(script);
}

function inject_gui() {
	injectScriptFile("js/gui/toast.js");
	injectScriptFile("js/gui/marquee.js");
	injectScriptFile("js/gui/window.js");
	injectScriptFile("js/gui/guitest.js");

	injectScriptFile("js/gui/button.js");
}

function add_buttons_home(id, button_name, emoji, jump) {
	var hack_menu = document.getElementsByTagName("menu")[0];

	const button = document.createElement("button");
	button.className = "icon-button conf nor";
	button.id = `header-${id}`;
	button.type = "button";
	
	const labelDiv = document.createElement("div");
	labelDiv.className = "button-label";
	labelDiv.innerHTML = `<ruby>${button_name}</ruby>`;
	button.appendChild(labelDiv);
	
	const iconWrap = document.createElement("div");
	iconWrap.className = "icon-wrap";
	
	const iconSpan = document.createElement("span");
	iconSpan.textContent = emoji;
	iconWrap.appendChild(iconSpan);
	
	button.appendChild(iconWrap);
	
	hack_menu.appendChild(button);

	const hackmenu = document.querySelector(`#header-${id}`);

	if (hackmenu) {
		hackmenu.addEventListener("click", () => {
			window.location.href = chrome.runtime.getURL(jump)
		});
	}
}

function replace_backg() {
	try {
		if (localStorage.getItem("backg") == `linear-gradient(to bottom, var(--cs-key-03), var(--cs-basic-04) 40%, var(--cs-basic-02))`) {
			return;
		}
		document.body.style.setProperty("background-size", "100%")
		document.body.style.setProperty("background-repeat", "repeat")
		document.body.style.setProperty("background-image", localStorage.getItem("backg"))
	} catch {
		return;
	}
}

function privacy_inject() {
	
}  

function set_def_setting() {
	if (localStorage.getItem("gajet") === null) {
		localStorage.setItem("gajet", "https://ela.education.ne.jp/images/grows/grows_2025/gr001.png");
	};

	if (localStorage.getItem("ans") === null) {
		localStorage.setItem("ans", "1");
	};

	if (localStorage.getItem("name") === null) {
		localStorage.setItem("name", `匿名`);
	};

	if (localStorage.getItem("school") === null) {
		localStorage.setItem("school", `秘密`);
	};

	if (localStorage.getItem("gisou") === null) {
		localStorage.setItem("gisou", `0`);
	};

	if (localStorage.getItem("stydy_day") === null) {
		localStorage.setItem("stydy_day", `0`);
	};

	if (localStorage.getItem("stydy_count") === null) {
		localStorage.setItem("stydy_count", `0`);
	};

	if (localStorage.getItem("study_manten") === null) {
		localStorage.setItem("study_manten", `0`);
	};

	if (localStorage.getItem("stydy_day_length") === null) {
		localStorage.setItem("stydy_day_length", `0`);
	};

	if (localStorage.getItem("stydy_count_length") === null) {
		localStorage.setItem("stydy_count_length", `0`);
	};

	if (localStorage.getItem("study_manten_length") === null) {
		localStorage.setItem("study_manten_length", `0`);
	};

	if (localStorage.getItem("backg") === null) {
		localStorage.setItem("backg", `linear-gradient(to bottom, var(--cs-key-03), var(--cs-basic-04) 40%, var(--cs-basic-02))`);
	};
}

function main() {
	set_def_setting();

	const jsInitCheckTimer = setInterval(jsLoaded, 100);
  
	function jsLoaded() {
	  	if (document.readyState !== "complete") return;
	  	clearInterval(jsInitCheckTimer);

		inject_gui();

		privacy_inject();

		replace_backg();

	  	if (window.location.href === "https://ela.education.ne.jp/students/home") {
			replace_homejs();

			var hack_menu = document.getElementsByTagName("menu")[0];

			const button = document.createElement("button");
			button.className = "icon-button conf nor";
			button.id = "header-hack";
			button.type = "button";
			
			const labelDiv = document.createElement("div");
			labelDiv.className = "button-label";
			labelDiv.innerHTML = "<ruby>答え表示設定</ruby>";
			button.appendChild(labelDiv);
			
			const iconWrap = document.createElement("div");
			iconWrap.className = "icon-wrap";
			
			const iconSpan = document.createElement("span");
			iconSpan.textContent = "🔧";
			iconWrap.appendChild(iconSpan);
			
			button.appendChild(iconWrap);
			
			hack_menu.appendChild(button);
	
			const hackmenu = document.querySelector("#header-hack");

			add_buttons_home("callcenter0", "お問い合わせ", "☎️", "html/support.html");

			if (hackmenu) {
				hackmenu.addEventListener("click", () => {
					injectScriptFile("js/menu.js");
				});
			}

			if (window.location.href == "https://ela.education.ne.jp/students/home")
			{
				var a = document.getElementsByClassName("gadget-growimage button nor")[0];
		
				a.innerHTML = "<img src=" + localStorage.getItem("gajet") + ">"
			}

			replace_name();
		}
		else if (window.location.href == "https://ela.education.ne.jp/students/lookinback") {
			var hack_menu = document.getElementsByTagName("menu")[0];

			const button = document.createElement("button");
			button.className = "icon-button conf nor";
			button.id = "header-hack";
			button.type = "button";
			
			const labelDiv = document.createElement("div");
			labelDiv.className = "button-label";
			labelDiv.innerHTML = "<ruby>答え表示設定</ruby>";
			button.appendChild(labelDiv);
			
			const iconWrap = document.createElement("div");
			iconWrap.className = "icon-wrap";
			
			const iconSpan = document.createElement("span");
			iconSpan.textContent = "🔧";
			iconWrap.appendChild(iconSpan);
			
			button.appendChild(iconWrap);
			
			hack_menu.appendChild(button);
	
			const hackmenu = document.querySelector("#header-hack");

			if (hackmenu) {
				hackmenu.addEventListener("click", () => {
					injectScriptFile("js/menu.js");
				});
			}

			var a = document.getElementsByClassName("gadget-growimage")[0];

			document.getElementsByClassName("gadget-growimage")[0].getElementsByTagName("img")[0].remove();
			
			a.innerHTML = "<img src=" + localStorage.getItem("gajet") + "></img>"

			replace_name();
			replace_lookjs();
		} else if (window.location.href.includes('https://ela.education.ne.jp/students/questions/question')) {
			try {
				replace_name();
				replace_drilljs();

				if (localStorage.getItem("ans") == "1") {
					var span = document.getElementsByClassName(" gadget-title-drill")[0];
					span.insertAdjacentHTML('beforeend', '<button id="kot' + '" onclick="drill.drawCorrectAnswer()" />答え</button>');
					var a = document.getElementsByClassName("copyright")[0];
					a.innerHTML = `<a href='javascript:alert(drill.href.api_token)'>Tokenを見る</a>`
				} else if (localStorage.getItem("ans") == "2") {
					injectScriptFile("js/anser.js");
				}

				var hack_menu = document.getElementsByTagName("menu")[0];

				const button = document.createElement("button");
				button.className = "icon-button conf nor";
				button.id = "header-hack";
				button.type = "button";
				
				const labelDiv = document.createElement("div");
				labelDiv.className = "button-label";
				labelDiv.innerHTML = "<ruby>答え表示設定</ruby>";
				button.appendChild(labelDiv);
				
				const iconWrap = document.createElement("div");
				iconWrap.className = "icon-wrap";
				
				const iconSpan = document.createElement("span");
				iconSpan.textContent = "🔧";
				iconWrap.appendChild(iconSpan);
				
				button.appendChild(iconWrap);
				
				hack_menu.appendChild(button);
		
				const hackmenu = document.querySelector("#header-hack");
	
				if (hackmenu) {
					hackmenu.addEventListener("click", () => {
						injectScriptFile("js/menu.js");
					});
				}
			} catch(e) {
				return;
			}
		} else if (window.location.href.includes('https://ela.education.ne.jp/students/gadedit')) {
			injectHTMLFile("html/makepage/gadgets.html");
			injectScriptFile("js/htmljs/gadgets.js");
		} else if (window.location.href.includes('https://ela.education.ne.jp/students/theme_editor')) {
			injectHTMLFile("html/makepage/theme.html");
			const script = document.createElement("script");
			script.src = chrome.runtime.getURL("js/htmljs/theme.js");
			script.onload = function () {
			  this.remove();
			  window.postMessage({ type: "ADDVariable", variablename: "csseditorurl", value: chrome.runtime.getURL("html/csseditor.html") }, "*");
			};
			(document.head || document.documentElement).appendChild(script);
		} else {
			replace_name();
		}
	}
  }  
function keypress_ivent(e) {

}
window.addEventListener('keydown', keypress_ivent);
window.addEventListener("load", main, false);

const replaceCss = (oldFileName, newFilePath) => {
	  const links = Array.from(document.getElementsByTagName('link'));
	  for (const link of links) {
		if (link.href.includes(oldFileName)) {
		  link.remove();
		  const newLink = document.createElement('link');
		  newLink.rel = 'stylesheet';
		  newLink.type = 'text/css';
		  newLink.href = chrome.runtime.getURL(newFilePath);
		  document.head.appendChild(newLink);
		  break;
		}
	  }
	};
  
replaceCss('student-common.css', 'css/student-common.css');


chrome.storage.local.get("css", function (value) {
	if (value.css == undefined) {} else if (value.css == "") {} else {
		const newstyle = document.createElement('style');
		newstyle.textContent = value.css
		document.head.appendChild(newstyle)
	}
})

// document.body.style.setProperty("background-size", "100%")
// document.body.style.setProperty("background-repeat", "repeat")
// document.body.style.setProperty("background-image", "url('https://cimg.kgl-systems.io/camion/files/24037/thumbnail_dQPt.png?x=1280')")