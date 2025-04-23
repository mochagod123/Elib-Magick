function gui_test_func() {
    alert("ボタンが押されました。")
}

function show_gui_test() {
    showToast("タイトルです");
    setTimeout(() => {
        showToast("複数表示です")
      }, 2000);
    var button1 = button_1_add("ボタン", gui_test_func);
    var button2 = button_2_add("ボタン2", gui_test_func);
    window_add("タイトルです", `
<p id="gui_test"></p>
`)
    document.getElementById("gui_test").appendChild(button1);
    document.getElementById("gui_test").appendChild(button2);
}