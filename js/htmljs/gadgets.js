function deSVG(selector, removeInlineCss) {
    removeInlineCss = removeInlineCss || false;

    var images,
        imagesLength,
        sortImages = {},

        // load svg file
        loadSvg = function (imgURL, replaceImages) {
            // set up the AJAX request
            var xhr = new XMLHttpRequest();
            xhr.open('GET', imgURL, true);

            xhr.onload = function() {
                var xml,
                    svg,
                    paths,
                    replaceImagesLength;

                // get the response in XML format
                xml = xhr.responseXML;
                replaceImagesLength = replaceImages.length;

                // bail if no XML
                if (!xml) {
                    return;
                }

                // this will be the <svg />
                svg = xml.documentElement;

                // get all the SVG paths
                paths = svg.querySelectorAll('path');

                if (removeInlineCss) {
                    // if `removeInlineCss` is true then remove the style attributes from the SVG paths
                    for (var i = 0; i < paths.length; i++) {
                        paths[i].removeAttribute('style');
                    }
                }
                svg.removeAttribute('xmlns:a');

                while(replaceImagesLength--) {
                    replaceImgWithSvg(replaceImages[replaceImagesLength], svg.cloneNode(true));
                }
            };

            xhr.send();
        },

        // replace the original <img /> with the new <svg />
        replaceImgWithSvg = function (img, svg) {
            var imgID = img.id,
                imgClasses = img.getAttribute('class');

            if (imgID) {
                // re-assign the ID attribute from the <img />
                svg.id = imgID;
            }

            if (imgClasses) {
                // re-assign the class attribute from the <img />
                svg.setAttribute('class', imgClasses + ' replaced-svg');
            }

            img.parentNode.replaceChild(svg, img);
        };



    // grab all the elements from the document matching the passed in selector
    images = document.querySelectorAll(selector);
    imagesLength = images.length;

    // sort images array by image url
    while (imagesLength--) {
        var _img = images[imagesLength],
          _imgURL;

        if (_img.getAttribute('data-src')) {
          _imgURL = _img.getAttribute('data-src')
        } else {
          _imgURL = _img.getAttribute('src')
        }

        if (sortImages[_imgURL]) {
            sortImages[_imgURL].push(_img);
        } else {
            sortImages[_imgURL] = [_img];
        }
    }

    // loops over the matched urls
    for (var key in sortImages) {
        if (sortImages.hasOwnProperty(key)) {
            loadSvg(key, sortImages[key]);
        }
    }
}

deSVG('.svg-inline-true', true);

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log("Received message from service worker:", request);
    if (request.message === "getLocalGadgetsReply") {
        var gad = document.getElementsByClassName("gadget-growimage button nor")[0];
        gad.innerHTML = "<img src=" + request.value + ">"
        document.getElementById("gajeturl").value = request.value;
        console.log("取得したガジェット情報:", request.value);
    } else if (request.message === "setLocalGadgetsReply") {
        var gad = document.getElementsByClassName("gadget-growimage button nor")[0];
        gad.innerHTML = "<img src=" + request.value + ">"
        document.getElementById("gajeturl").value = request.value;
        console.log("取得したガジェット情報:", request.value);
    }
  });
  
  chrome.runtime.sendMessage({ message: "GadgetsPageStartd" }, function (response) {
    if (response) {
      console.log("service workerからの応答:", response.farewell);
    } else {
      console.log("応答はありません。");
    }
  });

document.getElementById('max').addEventListener('click', function() {
    chrome.runtime.sendMessage({ message: "SetgetsPageStartd", value: "https://ela.education.ne.jp/images/grows/grows_2025/gr033.png" }, function (response) {
        if (response) {
          console.log("service workerからの応答:", response.farewell);
        } else {
          console.log("応答はありません。");
        }
      });
});

document.getElementById('min').addEventListener('click', function() {
    chrome.runtime.sendMessage({ message: "SetgetsPageStartd", value: "https://ela.education.ne.jp/images/grows/grows_2025/gr001.png" }, function (response) {
        if (response) {
          console.log("service workerからの応答:", response.farewell);
        } else {
          console.log("応答はありません。");
        }
      });
});

document.getElementById('set').addEventListener('click', function() {
    chrome.runtime.sendMessage({ message: "SetgetsPageStartd", value: document.getElementById("gajeturl").value }, function (response) {
        if (response) {
          console.log("service workerからの応答:", response.farewell);
        } else {
          console.log("応答はありません。");
        }
      });
});