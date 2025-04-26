function sendMessageToTabByUrl(url, message, callback) {
  chrome.tabs.query({ url: url }, function (tabs) {
    if (tabs && tabs.length > 0) {
      chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
        if (chrome.runtime.lastError) {
          console.error("メッセージ送信エラー:", chrome.runtime.lastError);
        } else if (response) {
          console.log("content scriptからの応答:", response);
          if (callback) callback(response);
        }
      });
    } else {
      console.log(`URL "${url}" に一致するタブが見つかりませんでした。`);
    }
  });
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "GadgetsPageStartd") {
    sendMessageToTabByUrl(
      "https://ela.education.ne.jp/students/lookinback",
      { message: "getLocalGadgets", key: "gajet" },
      function (responseFromContent) {
        chrome.runtime.sendMessage({
          message: "getLocalGadgetsReply",
          value: responseFromContent?.value ?? null,
        });
      }
    );

    sendResponse({ farewell: "OK" });
    return true;
  } else if (request.message === "SetgetsPageStartd") {
    sendMessageToTabByUrl(
      "https://ela.education.ne.jp/students/lookinback",
      { message: "setLocalGadgets", key: "gajet", value: request.value },
      function (responseFromContent) {
        chrome.runtime.sendMessage({
          message: "getLocalGadgetsReply",
          value: responseFromContent?.value ?? null,
        });
      }
    );

    sendResponse({ farewell: "OK" });
    return true;
  }

  return false;
});