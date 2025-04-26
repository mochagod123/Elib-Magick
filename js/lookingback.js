var medal_panel = document.getElementsByClassName("report_mothly c3 gadget-medal_counter v2025")[0]
// 学習日数メダル
var study_day_medal = medal_panel.getElementsByTagName("li")[0];
// 学習回数メダル
var study_count_medal = medal_panel.getElementsByTagName("li")[1];
// 満点回数メダル
var study_manten_medal = medal_panel.getElementsByTagName("li")[2];
// 植物
var gaget_image = document.getElementsByClassName("gadget-growimage")[0];

function set_gajetsetting() {
  const textBox = document.getElementById("gajeturl");
  localStorage.setItem('gajet', textBox.value);
  document.getElementsByClassName("gadget-growimage")[0].getElementsByTagName("img")[0].remove();
  textBox.value = localStorage.getItem("gajet");
  gaget_image.innerHTML = "<img src=" + localStorage.getItem("gajet") + "></img>"
}

function set_gajet_set(int) {
  const textBox = document.getElementById("gajeturl");
  localStorage.setItem('gajet', `https://ela.education.ne.jp/images/grows/grows_2025/gr0${int}.png`);
  document.getElementsByClassName("gadget-growimage")[0].getElementsByTagName("img")[0].remove();
  textBox.value = localStorage.getItem("gajet");
  gaget_image.innerHTML = "<img src=" + localStorage.getItem("gajet") + "></img>"
}

function copyElementWithStyles(original) {
  const copy = original.cloneNode(true);
  applyComputedStyles(original, copy);
  return copy;
}

function applyComputedStyles(source, target) {
  const sourceStyle = getComputedStyle(source);
  for (let prop of sourceStyle) {
      target.style[prop] = sourceStyle.getPropertyValue(prop);
  }

  for (let i = 0; i < source.children.length; i++) {
      applyComputedStyles(source.children[i], target.children[i]);
  }
}

function edit_length(type, count) {
  if (type == 0) {
      study_day_medal.style.setProperty("--length", count)
      try {
        let medal_panel_preview = document.getElementsByClassName("contentsContainer")[0].getElementsByClassName("c2")[0].getElementsByTagName("ul")[0].getElementsByTagName("li")[0]
        let copied = copyElementWithStyles(medal_panel_preview);
        copied.getElementsByClassName("label")[0].remove()
        copied.style.setProperty("--length", count)
        document.getElementById("medal_preview").innerHTML = '';
        document.getElementById("medal_preview").appendChild(copied);
      } catch (e) {

      }
  } else if (type == 1) {
      study_count_medal.style.setProperty("--length", count)
      try {
        let medal_panel_preview = document.getElementsByClassName("contentsContainer")[0].getElementsByClassName("c2")[0].getElementsByTagName("ul")[0].getElementsByTagName("li")[1]
        let copied = copyElementWithStyles(medal_panel_preview);
        copied.getElementsByClassName("label")[0].remove()
        copied.style.setProperty("--length", count)
        document.getElementById("medal_preview").innerHTML = '';
        document.getElementById("medal_preview").appendChild(copied);
      } catch (e) {

      }
  } else if (type == 2) {
      study_manten_medal.style.setProperty("--length", count)
      try {
        let medal_panel_preview = document.getElementsByClassName("contentsContainer")[0].getElementsByClassName("c2")[0].getElementsByTagName("ul")[0].getElementsByTagName("li")[2]
        let copied = copyElementWithStyles(medal_panel_preview);
        copied.getElementsByClassName("label")[0].remove()
        copied.style.setProperty("--length", count)
        document.getElementById("medal_preview").innerHTML = '';
        document.getElementById("medal_preview").appendChild(copied);
      } catch (e) {

      }
  }
}

function edit_medal(type, count) {
    if (type == 0) {
        study_day_medal.className = `counter-unit medal-0${count}`
        try {
          let medal_panel_preview = document.getElementsByClassName("contentsContainer")[0].getElementsByClassName("c2")[0].getElementsByTagName("ul")[0].getElementsByTagName("li")[0]
          let copied = copyElementWithStyles(medal_panel_preview);
          copied.getElementsByClassName("label")[0].remove()
          copied.className = `counter-unit medal-0${count}`
          document.getElementById("medal_preview").innerHTML = '';
          document.getElementById("medal_preview").appendChild(copied);
        } catch (e) {
          
        }
        
    } else if (type == 1) {
        study_count_medal.className = `counter-unit medal-0${count}`
        try {
          let medal_panel_preview = document.getElementsByClassName("contentsContainer")[0].getElementsByClassName("c2")[0].getElementsByTagName("ul")[0].getElementsByTagName("li")[1]
          let copied = copyElementWithStyles(medal_panel_preview);
          copied.getElementsByClassName("label")[0].remove()
          copied.className = `counter-unit medal-0${count}`
          document.getElementById("medal_preview").innerHTML = '';
          document.getElementById("medal_preview").appendChild(copied);
        } catch {

        }
        
    } else if (type == 2) {
        study_manten_medal.className = `counter-unit medal-0${count}`
        try {
          let medal_panel_preview = document.getElementsByClassName("contentsContainer")[0].getElementsByClassName("c2")[0].getElementsByTagName("ul")[0].getElementsByTagName("li")[2]
          let copied = copyElementWithStyles(medal_panel_preview);
          copied.getElementsByClassName("label")[0].remove()
          copied.className = `counter-unit medal-0${count}`
          document.getElementById("medal_preview").innerHTML = '';
          document.getElementById("medal_preview").appendChild(copied);
        } catch (e) {

        }
    }
}

edit_medal(0, localStorage.getItem("stydy_day"));
edit_medal(1, localStorage.getItem("stydy_count"));
edit_medal(2, localStorage.getItem("study_manten"));

edit_length(0, localStorage.getItem("stydy_day_length"));
edit_length(1, localStorage.getItem("stydy_count_length"));
edit_length(2, localStorage.getItem("study_manten_length"));

function set_medal(type) {
    var med = document.getElementById("medal_edit");
    if (type == 0) {
        localStorage.setItem("stydy_day", med.value);
    } else if (type == 1) {
        localStorage.setItem("stydy_count", med.value);
    } else if (type == 2) {
        localStorage.setItem("study_manten", med.value);
    }
    edit_medal(type, med.value);
}

function set_length(type) {
  var med = document.getElementById("length_edit");
  if (type == 0) {
      localStorage.setItem("stydy_day_length", med.value);
  } else if (type == 1) {
      localStorage.setItem("stydy_count_length", med.value);
  } else if (type == 2) {
      localStorage.setItem("study_manten_length", med.value);
  }
  edit_length(type, med.value);
}

if (study_day_medal) {
    study_day_medal.addEventListener("click", () => {
        let counter_war = document.getElementsByClassName("contentsContainer")[0].getElementsByClassName("c2")[0].getElementsByTagName("ul")[0].getElementsByTagName("li")[0]
        window_add("学習日数メダル編集", `
メダル数: <input type="range" id="medal_edit" name="medal_edit" min="0" max="3" value="${localStorage.getItem("stydy_day")}" /><br>
長さ: <input type="text" id="length_edit" name="length_edit" value="${localStorage.getItem("stydy_day_length")}" /><br>
<p id="gui_button"></p>
<div id="medal_preview"></div>
`);
        var set = button_1_add("メダル設定", set_medal, 0);
        document.getElementById("gui_button").appendChild(set);
        var set_l = button_1_add("メーター設定", set_length, 0);
        document.getElementById("gui_button").appendChild(set_l);
        let copied_0 = copyElementWithStyles(counter_war);
        copied_0.getElementsByClassName("label")[0].remove()
        document.getElementById("medal_preview").appendChild(copied_0)
    });
}

if (study_count_medal) {
    study_count_medal.addEventListener("click", () => {
        let counter_war = document.getElementsByClassName("contentsContainer")[0].getElementsByClassName("c2")[0].getElementsByTagName("ul")[0].getElementsByTagName("li")[1]
        window_add("学習回数メダル編集", `
メダル数: <input type="range" id="medal_edit" name="medal_edit" min="0" max="3" value="${localStorage.getItem("stydy_count")}" /><br>
長さ: <input type="text" id="length_edit" name="length_edit" value="${localStorage.getItem("stydy_count_length")}"/><br>
<p id="gui_button"></p>
<div id="medal_preview"></div>
`);
    var set = button_1_add("メダル設定", set_medal, 1);
    document.getElementById("gui_button").appendChild(set);
    var set_l = button_1_add("メーター設定", set_length, 1);
    document.getElementById("gui_button").appendChild(set_l);
    let copied_1 = copyElementWithStyles(counter_war);
    copied_1.getElementsByClassName("label")[0].remove()
    document.getElementById("medal_preview").appendChild(copied_1)
    });
}

if (study_manten_medal) {
    study_manten_medal.addEventListener("click", () => {
        let counter_war = document.getElementsByClassName("contentsContainer")[0].getElementsByClassName("c2")[0].getElementsByTagName("ul")[0].getElementsByTagName("li")[2]
        window_add("満点回数メダル編集", `
メダル数: <input type="range" id="medal_edit" name="medal_edit" min="0" max="3" value="${localStorage.getItem("study_manten")}" /><br>
長さ: <input type="text" id="length_edit" name="length_edit" value="${localStorage.getItem("study_manten_length")}"/><br>
<p id="gui_button"></p>
<div id="medal_preview"></div>
`);
        var set = button_1_add("メダル設定", set_medal, 2);
        document.getElementById("gui_button").appendChild(set);
        var set_l = button_1_add("メーター設定", set_length, 2);
        document.getElementById("gui_button").appendChild(set_l);
        let copied_2 = copyElementWithStyles(counter_war);
        copied_2.getElementsByClassName("label")[0].remove()
        document.getElementById("medal_preview").appendChild(copied_2)
    });
}

var ELIBMAGICK_GADGETS_EDIT_URL = null;

window.addEventListener("message", (event) => {
  if (event.source !== window) return;
  if (event.data?.type === "ELIBMAGICK_GADGETS_EDIT_URL") {
    ELIBMAGICK_GADGETS_EDIT_URL = event.data.url;
    console.log("受け取ったURL:", ELIBMAGICK_GADGETS_EDIT_URL);
  }
});

if (gaget_image) {
  gaget_image.addEventListener("click", () => {
    window_add("植物の画像編集", `
画像URL: <input type="text" id="gajeturl" value="${localStorage.getItem("gajet")}"><br>
<p id="gui_button"></p>
<p>現在の植物:<br><img src='${localStorage.getItem("gajet")}' width="150" height="180"></p><br>
<p id="gui_button2"></p>
`); 
var set = button_1_add("設定", set_gajetsetting);
document.getElementById("gui_button").appendChild(set);
var set_max = button_1_add("最大化", set_gajet_set, '33');
document.getElementById("gui_button").appendChild(set_max);
var set_min = button_1_add("最小化", set_gajet_set, '01');
document.getElementById("gui_button").appendChild(set_min);
var set_min = button_1_add("詳細", window.open, ELIBMAGICK_GADGETS_EDIT_URL);
document.getElementById("gui_button2").appendChild(set_min);
  });
}