'use strict';

function injectScriptFile(filePath) {
	const script = document.createElement("script");
	script.src = chrome.runtime.getURL(filePath);
	script.onload = function () {
	  this.remove();
	};
	(document.head || document.documentElement).appendChild(script);
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
	injectScriptFile("js/lookingback.js")
}

function inject_gui() {
	injectScriptFile("js/gui/toast.js");
	injectScriptFile("js/gui/window.js");
	injectScriptFile("js/gui/guitest.js");

	injectScriptFile("js/gui/button.js")
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

function main() {
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

	const jsInitCheckTimer = setInterval(jsLoaded, 100);
  
	function jsLoaded() {
	  	if (document.readyState !== "complete") return;
	  	clearInterval(jsInitCheckTimer);

		inject_gui();

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
		} else {
			replace_name();
		}
	}
  }  
function keypress_ivent(e) {

}
window.addEventListener('keydown', keypress_ivent);
window.addEventListener("load", main, false);

window.addEventListener('DOMContentLoaded', () => {
	Array.from(document.getElementsByTagName("link")).forEach(element => {
		if (element.href.includes('reset.css')) {
		  element.remove()
		  const sc = document.createElement("link");
		  sc.rel = 'stylesheet';
		  sc.type = 'text/css';
		  sc.href = chrome.runtime.getURL("css/reset.css");
		  document.head.appendChild(sc);
		  return;
		}
	  });

	Array.from(document.getElementsByTagName("link")).forEach(element => {
		if (element.href.includes('base.css')) {
		  element.remove()
		  const sc = document.createElement("link");
		  sc.rel = 'stylesheet';
		  sc.type = 'text/css';
		  sc.href = chrome.runtime.getURL("css/base.css");
		  document.head.appendChild(sc);
		  return;
		}
	  });
});
  