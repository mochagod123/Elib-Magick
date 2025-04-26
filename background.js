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