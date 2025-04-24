var original_name = "";
var original_school_name = "";

function get_original_data() {
  try {
    original_name = document.getElementsByClassName("name")[0].getElementsByTagName("dd")[0].textContent;
    original_school_name = document.getElementsByClassName("section")[0].getElementsByTagName("dd")[0].textContent;
  } catch (e) {
    return
  }

}

get_original_data();

function replace_name() {
	try {
		if (localStorage.getItem("gisou") == "0") {
			return;
		}
		var name = document.getElementsByClassName("name")
		if (name == null) {
			return;
		}
    Array.from(document.getElementsByClassName("name")).forEach(el => {
      el.innerHTML = `<dd>${localStorage.getItem("name")}</dd>`;
    });
	} catch {
		return;
	}
}

function replace_school() {
	try {
		if (localStorage.getItem("gisou") == "0") {
			return;
		}
		var name = document.getElementsByClassName("section")[0]
		if (name == null) {
			return;
		}
    Array.from(document.getElementsByClassName("section")).forEach(el => {
      el.innerHTML = `<dd>${localStorage.getItem("school")}</dd>`;
    })
	} catch {
		return;
	}
}


var colord_flag = false;

function set_name() {
    if (colord_flag) {
      if (!document.getElementById('name').value.endsWith('</span>')) {
        document.getElementById('name').value += `</span>`
      }
    }
    localStorage.setItem('name', `${document.getElementById("name").value}`);
    localStorage.setItem('school', `${document.getElementById("school").value}`);
    var gisou = document.getElementById('gisou');
    if (gisou.checked == true) {
        localStorage.setItem('gisou', `1`);
    } else {
        localStorage.setItem('gisou', `0`);
        window.location.reload()
    }
    replace_name();
    replace_school();
    
}

replace_name();
replace_school();

var name_ = document.getElementsByClassName("login-name")[0]

function string_to_checked() {
    if (localStorage.getItem("gisou") == "0") {
      return "";
    } else {
      return "checked";
    }
}

function inner_keyboard_text(id, text) {
  document.getElementById(id).value += text
}

function inner_keyboard_image(id, url) {
  document.getElementById(id).value += `<img src="${url}">`
}

function get_color_pick_value(id) {
  return document.getElementById(id).value
}

function inner_keyboard_color(id) {
  if (!colord_flag) {
    colord_flag = true;
  } else {
    if (!document.getElementById(id).value.endsWith('</span>')) {
      document.getElementById(id).value += `</span>`
    }
  }
  document.getElementById(id).value += `<span style="color: ${get_color_pick_value(`color_pick`)};">`
}

function inner_keyboard_backcolor(id) {
  if (!colord_flag) {
    colord_flag = true;
  } else {
    if (!document.getElementById(id).value.endsWith('</span>')) {
      document.getElementById(id).value += `</span>`
    }
  }
  document.getElementById(id).value = `<span style="background-color: ${get_color_pick_value(`color_pick`)}">${document.getElementById(id).value}</span>`
}

function reset_input(id) {
  document.getElementById(id).value = '';
  colord_flag = false;
}

function color_keyboard(id) {
  window_add("カラーキーボード", `
<input type="color" id="color_pick" name="color_pick" value="#f6b73c" />
<button onclick="inner_keyboard_color('${id}')" style='color: white'>文字色設定</button>
<button onclick="inner_keyboard_backcolor('${id}')" style='color: white'>背景設定</button><br>
`)
}

function keyboard_page(id, page) {
  if (page == 0) {
    window_add("特殊キーボード (1)", `
      <button onclick="inner_keyboard_text('${id}', '<br>')" style='color: white'>⤵️</button>
      <button onclick="inner_keyboard_text('${id}', '<h1>')" style='color: white'>↕️➡️</button>
      <button onclick="inner_keyboard_text('${id}', '</h1>')" style='color: white'>↕️🔚</button>
      <button onclick="color_keyboard('${id}')" style='color: white'>🎨</button>
      <button onclick="reset_input('${id}')" style='color: white'>🗑️</button><br>
    `)
  } else if (page == 1) {
    window_add("特殊キーボード (2)", `
      <button onclick="inner_keyboard_image('${id}', 'https://ela.education.ne.jp/images/contents/c0001.gif')" style='color: white'><img src="https://ela.education.ne.jp/images/contents/c0001.gif"></button>
      <button onclick="inner_keyboard_image('${id}', 'https://ela.education.ne.jp/images/contents/c0002.gif')" style='color: white'><img src="https://ela.education.ne.jp/images/contents/c0002.gif"></button>
      <button onclick="inner_keyboard_image('${id}', 'https://ela.education.ne.jp/images/contents/c0003.gif')" style='color: white'><img src="https://ela.education.ne.jp/images/contents/c0003.gif"></button>
      <button onclick="inner_keyboard_image('${id}', 'https://ela.education.ne.jp/images/contents/c0004.gif')" style='color: white'><img src="https://ela.education.ne.jp/images/contents/c0004.gif"></button>
      <button onclick="inner_keyboard_image('${id}', 'https://ela.education.ne.jp/images/contents/c0005.gif')" style='color: white'><img src="https://ela.education.ne.jp/images/contents/c0005.gif"></button>
      <button onclick="inner_keyboard_image('${id}', 'https://ela.education.ne.jp/images/contents/c0006.gif')" style='color: white'><img src="https://ela.education.ne.jp/images/contents/c0006.gif"></button>
      <button onclick="inner_keyboard_image('${id}', 'https://ela.education.ne.jp/images/contents/c0007.gif')" style='color: white'><img src="https://ela.education.ne.jp/images/contents/c0007.gif"></button>
      <button onclick="inner_keyboard_image('${id}', 'https://ela.education.ne.jp/images/contents/c0008.gif')" style='color: white'><img src="https://ela.education.ne.jp/images/contents/c0008.gif"></button>
      <button onclick="inner_keyboard_image('${id}', 'https://ela.education.ne.jp/images/contents/c0009.gif')" style='color: white'><img src="https://ela.education.ne.jp/images/contents/c0009.gif"></button>
      <button onclick="inner_keyboard_image('${id}', 'https://ela.education.ne.jp/images/contents/c0010.gif')" style='color: white'><img src="https://ela.education.ne.jp/images/contents/c0010.gif"></button>
      <button onclick="inner_keyboard_image('${id}', 'https://ela.education.ne.jp/images/contents/c0011.gif')" style='color: white'><img src="https://ela.education.ne.jp/images/contents/c0011.gif"></button>
      <button onclick="inner_keyboard_image('${id}', 'https://ela.education.ne.jp/images/contents/c0012.gif')" style='color: white'><img src="https://ela.education.ne.jp/images/contents/c0012.gif"></button>
      <button onclick="inner_keyboard_image('${id}', 'https://ela.education.ne.jp/images/contents/c0013.gif')" style='color: white'><img src="https://ela.education.ne.jp/images/contents/c0013.gif"></button>
      <button onclick="inner_keyboard_image('${id}', 'https://ela.education.ne.jp/images/contents/c0014.gif')" style='color: white'><img src="https://ela.education.ne.jp/images/contents/c0014.gif"></button>
      <button onclick="inner_keyboard_image('${id}', 'https://ela.education.ne.jp/images/contents/c0015.gif')" style='color: white'><img src="https://ela.education.ne.jp/images/contents/c0015.gif"></button>
      <button onclick="inner_keyboard_image('${id}', 'https://ela.education.ne.jp/images/contents/c0016.gif')" style='color: white'><img src="https://ela.education.ne.jp/images/contents/c0016.gif"></button>
      <button onclick="inner_keyboard_image('${id}', 'https://ela.education.ne.jp/images/contents/c0017.gif')" style='color: white'><img src="https://ela.education.ne.jp/images/contents/c0017.gif"></button>
      <button onclick="inner_keyboard_image('${id}', 'https://ela.education.ne.jp/images/contents/c0018.gif')" style='color: white'><img src="https://ela.education.ne.jp/images/contents/c0018.gif"></button>
      <button onclick="inner_keyboard_image('${id}', 'https://ela.education.ne.jp/images/contents/c0019.gif')" style='color: white'><img src="https://ela.education.ne.jp/images/contents/c0019.gif"></button>
      <button onclick="inner_keyboard_image('${id}', 'https://ela.education.ne.jp/images/contents/c0020.gif')" style='color: white'><img src="https://ela.education.ne.jp/images/contents/c0020.gif"></button>
      <button onclick="inner_keyboard_image('${id}', 'https://ela.education.ne.jp/images/contents/c0021.gif')" style='color: white'><img src="https://ela.education.ne.jp/images/contents/c0021.gif"></button>
      <button onclick="inner_keyboard_image('${id}', 'https://ela.education.ne.jp/images/contents/c0022.gif')" style='color: white'><img src="https://ela.education.ne.jp/images/contents/c0022.gif"></button>
      <button onclick="inner_keyboard_image('${id}', 'https://ela.education.ne.jp/images/contents/c0023.gif')" style='color: white'><img src="https://ela.education.ne.jp/images/contents/c0023.gif"></button>
      <button onclick="inner_keyboard_image('${id}', 'https://ela.education.ne.jp/images/contents/c0024.gif')" style='color: white'><img src="https://ela.education.ne.jp/images/contents/c0024.gif"></button>
      <button onclick="inner_keyboard_image('${id}', 'https://ela.education.ne.jp/images/contents/c0025.gif')" style='color: white'><img src="https://ela.education.ne.jp/images/contents/c0025.gif"></button>
      <button onclick="inner_keyboard_image('${id}', 'https://ela.education.ne.jp/images/contents/c0026.gif')" style='color: white'><img src="https://ela.education.ne.jp/images/contents/c0026.gif"></button>
      <button onclick="inner_keyboard_image('${id}', 'https://ela.education.ne.jp/images/contents/c0027.gif')" style='color: white'><img src="https://ela.education.ne.jp/images/contents/c0027.gif"></button>
      <button onclick="inner_keyboard_image('${id}', 'https://ela.education.ne.jp/images/contents/c0028.gif')" style='color: white'><img src="https://ela.education.ne.jp/images/contents/c0028.gif"></button>
      <button onclick="inner_keyboard_image('${id}', 'https://ela.education.ne.jp/images/contents/c0101.gif')" style='color: white'><img src="https://ela.education.ne.jp/images/contents/c0101.gif"></button>
      <button onclick="inner_keyboard_image('${id}', 'https://ela.education.ne.jp/images/contents/c0102.gif')" style='color: white'><img src="https://ela.education.ne.jp/images/contents/c0102.gif"></button>
      <button onclick="inner_keyboard_image('${id}', 'https://ela.education.ne.jp/images/contents/c0103.gif')" style='color: white'><img src="https://ela.education.ne.jp/images/contents/c0103.gif"></button>
      <button onclick="inner_keyboard_image('${id}', 'https://ela.education.ne.jp/images/contents/c0104.gif')" style='color: white'><img src="https://ela.education.ne.jp/images/contents/c0104.gif"></button>
      <button onclick="inner_keyboard_image('${id}', 'https://ela.education.ne.jp/images/contents/c0105.gif')" style='color: white'><img src="https://ela.education.ne.jp/images/contents/c0105.gif"></button>
      <button onclick="inner_keyboard_image('${id}', 'https://ela.education.ne.jp/images/contents/c0106.gif')" style='color: white'><img src="https://ela.education.ne.jp/images/contents/c0106.gif"></button>
      <button onclick="inner_keyboard_image('${id}', 'https://ela.education.ne.jp/images/contents/c0107.gif')" style='color: white'><img src="https://ela.education.ne.jp/images/contents/c0107.gif"></button>
      <button onclick="inner_keyboard_image('${id}', 'https://ela.education.ne.jp/images/contents/c0108.gif')" style='color: white'><img src="https://ela.education.ne.jp/images/contents/c0108.gif"></button>
      <button onclick="inner_keyboard_image('${id}', 'https://ela.education.ne.jp/images/contents/c0109.gif')" style='color: white'><img src="https://ela.education.ne.jp/images/contents/c0109.gif"></button>
      <button onclick="inner_keyboard_image('${id}', 'https://ela.education.ne.jp/images/contents/c0110.gif')" style='color: white'><img src="https://ela.education.ne.jp/images/contents/c0110.gif"></button>
      <button onclick="inner_keyboard_image('${id}', 'https://ela.education.ne.jp/images/contents/c0111.gif')" style='color: white'><img src="https://ela.education.ne.jp/images/contents/c0111.gif"></button>
      <button onclick="inner_keyboard_image('${id}', 'https://ela.education.ne.jp/images/contents/c0116.gif')" style='color: white'><img src="https://ela.education.ne.jp/images/contents/c0116.gif"></button>
      <button onclick="inner_keyboard_image('${id}', 'https://ela.education.ne.jp/images/contents/c0117.gif')" style='color: white'><img src="https://ela.education.ne.jp/images/contents/c0117.gif"></button>
      <button onclick="inner_keyboard_image('${id}', 'https://ela.education.ne.jp/images/contents/c0118.gif')" style='color: white'><img src="https://ela.education.ne.jp/images/contents/c0118.gif"></button>
    `)
  }
}

function keyboard(id) {
  window_add("特殊キーボード", `
ページを選択してください。<br>
<p id="gui_button_key"></p>
`);
var b_1 = button_1_add("改行や文字の大きさ、色", keyboard_page, id, 0);
document.getElementById("gui_button_key").appendChild(b_1);
var b_2 = button_1_add("ライブラリ画像", keyboard_page, id, 1);
document.getElementById("gui_button_key").appendChild(b_2);
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

if (name_) {
    name_.addEventListener("click", () => {
        let clone_profile = document.getElementsByClassName("login-name")[0];
        window_add("プロフィール編集", `
名前: <input type="text" id="name" value='${localStorage.getItem("name")}'><button onclick="keyboard('name')" style='color: white'>⌨️</button><br>
学校名: <input type="text" id="school" value="${localStorage.getItem("school")}"><br>
偽装するか？: <input type="checkbox" id="gisou" ${string_to_checked()}><br>
<p id="gui_button"></p>
<br>プレビュー<br>
<div id="profile_preview"></div>
        `);
        var set = button_1_add("設定", set_name);
        document.getElementById("gui_button").appendChild(set);
        const copied = copyElementWithStyles(clone_profile);
        copied.style.background = 'linear-gradient(to bottom, #ffa200, #ffd517)';
        document.getElementById("profile_preview").appendChild(copied)
    });
}

function show_imagelist() {
  var text = "";
  Array.from(document.images).forEach(element => text += `<img src="${element.src}" width="130" height="130">`);
  window_add("画像一覧", text);
}