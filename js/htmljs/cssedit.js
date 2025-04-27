function save_css() {
    chrome.storage.local.set({"css": document.getElementById("cssedit").value})
}

function get_css() {
    chrome.storage.local.get("css", function (value) {
        if (value.css == undefined) {
            return;
        } else if (value.css == "") {
            return;
        }
        document.getElementById("cssedit").value = value.css;
    });
}

get_css();

document.getElementById('save').addEventListener('click', function() {
    save_css();
});