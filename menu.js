function set_gajetsetting() {
    const textBox = document.getElementById("gajeturl");
    localStorage.setItem('gajet', textBox.value);
    window.location.reload();
}

function set_gajet_set(int) {
    localStorage.setItem('gajet', `https://ela.education.ne.jp/images/grows/grows_2025/gr0${int}.png`);
    window.location.reload();
}

function set_kotae_set(int) {
    localStorage.setItem('ans', `${int}`);
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

        button.setting-button {
          width: 120px;
          height: 120px;
          background: linear-gradient(#ffffff, #f5f5f5);
          border-radius: 24px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          padding: 0;
        }

        button.setting-button:hover {
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
          transform: translateY(-2px);
        }

        .setting-button .icon {
          font-size: 32px;
          color: #00a0e9;
        }

        .setting-button .label {
          font-size: 14px;
          color: #333;
          text-align: center;
          margin-top: 6px;
          line-height: 1.1;
        }

        .setting-button .label small {
          display: block;
          font-size: 10px;
          color: #888;
          margin-bottom: -2px;
        }

        .button-container {
          display: flex;
          flex-wrap: wrap;
          gap: 24px;
          max-width: calc(120px * 4 + 24px * 3);
          justify-content: center;
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
	    menu.style.zIndex = "10030";
      menu.style.resize = "both";
      menu.style.overflow = "auto";
      menu.style.top = `${100 + menuId * 30}px`;
      menu.style.left = `${100 + menuId * 30}px`;
      menu.style.opacity = "0.9"

      menu.style.background = "linear-gradient(-45deg, #1a1a2e, #16213e, #0f3460, #1a1a2e)";
      menu.style.backgroundSize = "600% 600%";
      menu.style.animation = "gradientMove 10s ease infinite";

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

function show_gajetsetting() {
    window_add("植物の画像編集", `
画像URL: <input type="text" id="gajeturl" value="${localStorage.getItem("gajet")}"><br>
<button onclick="set_gajetsetting()" style='color: white'>設定</button>
<button onclick="set_gajet_set(33)" style='color: white'>最大化</button>
<button onclick="set_gajet_set('01')" style='color: white'>最小化</button><br><br>
<p>現在の植物:<br><img src='${localStorage.getItem("gajet")}' width="130" height="180"></p>
`);
}

function set_name() {
  localStorage.setItem('name', `${document.getElementById("name").value}`);
  localStorage.setItem('school', `${document.getElementById("school").value}`);
  var gisou = document.getElementById('gisou');
  if (gisou.checked == true) {
    localStorage.setItem('gisou', `1`);
  } else {
    localStorage.setItem('gisou', `0`);
  }
  window.location.reload();
}

function string_to_checked() {
  if (localStorage.getItem("gisou") == "0") {
    return "";
  } else {
    return "checked";
  }
}

function show_profile_setting() {
  window_add("プロフィール編集", `
名前: <input type="text" id="name" value="${localStorage.getItem("name")}"><br>
学校名: <input type="text" id="school" value="${localStorage.getItem("school")}"><br>
偽装するか？: <input type="checkbox" id="gisou" ${string_to_checked()}><br>
<button onclick="set_name()" style='color: white'>設定</button>
`);
}

function show_kotaesetting() {
  var ans = localStorage.getItem("ans");
  var tf = "無効";
  if (ans == "1") {
    tf = "手動で表示"
  } else if (ans == "2") {
    tf = "自動で表示"
  }
  window_add(`答え表示 (${tf})`, `
<button onclick="set_kotae_set('0')" style='color: white'>無効化</button>
<button onclick="set_kotae_set('1')" style='color: white'>手動で表示</button>
<button onclick="set_kotae_set('2')" style='color: white'>自動に表示</button>
`);
}

function show_imagelist() {
  var text = "";
  Array.from(document.images).forEach(element => text += `<img src="${element.src}" width="130" height="130">`);
  window_add("画像一覧", text);
}

function eval_func() {
  eval(document.getElementById('eval').value);
}

function save_code() {
  try {
    localStorage.setItem('code', document.getElementById('eval').value);
  } catch (e) {
    alert(`セーブに失敗しました。\nエラーコード:\n${e}`);
  }
}

function show_codes() {
  window_add("コード編集", `
<textarea id="eval" rows="10">${localStorage.getItem("code")}</textarea><br><button onclick='save_code()' style='color: white'>保存</button><br><button onclick='eval_func()' style='color: white'>実行してみる</button>
`);
}

window_add("設定", `
  <div class="button-container">
    <button onclick="show_gajetsetting()" class="setting-button">
      <div class="icon">🪴</div>
      <div class="label">植物の画像の変更</div>
    </button>
    <button onclick="show_profile_setting()" class="setting-button">
      <div class="icon">😀</div>
      <div class="label">プロフィール編集</div>
    </button>
    <button onclick="show_kotaesetting()" class="setting-button">
      <div class="icon">💯</div>
      <div class="label">答え表示の設定</div>
    </button>
    <button onclick="show_imagelist()" class="setting-button">
      <div class="icon">📷</div>
      <div class="label">画像一覧の取得</div>
    </button>
    <button onclick="show_codes()" class="setting-button">
      <div class="icon">💻</div>
      <div class="label">外部コード編集</div>
    </button>
    <button onclick="window.location.reload()" class="setting-button">
      <div class="icon">🌀</div>
      <div class="label">サイト再読み込み</div>
    </button>
  </div>
`);