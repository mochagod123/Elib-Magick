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
    var ans = localStorage.getItem("ans");
    var tf = "無効";
    if (ans == "1") {
      tf = "手動で表示"
    } else if (ans == "2") {
      tf = "自動で表示"
    }
    document.getElementById("kotae_setting_now").textContent = `現在の設定: ${tf}`
}

function show_kotaesetting() {
  var ans = localStorage.getItem("ans");
  var tf = "無効";
  if (ans == "1") {
    tf = "手動で表示"
  } else if (ans == "2") {
    tf = "自動で表示"
  }
  window_add(`答え表示`, `
<p id="kotae_setting_now">現在の設定: ${tf}</p><br>
<p id="gui_button"></p>
`);
var set = button_1_add("無効化", set_kotae_set, '0');
document.getElementById("gui_button").appendChild(set);
var set_l = button_1_add("手動で表示", set_kotae_set, '1');
document.getElementById("gui_button").appendChild(set_l);
var set_2 = button_1_add("自動に表示", set_kotae_set, '2');
document.getElementById("gui_button").appendChild(set_2);
}

show_kotaesetting();