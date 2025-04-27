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

if (localStorage.getItem("backg") != `linear-gradient(to bottom, var(--cs-key-03), var(--cs-basic-04) 40%, var(--cs-basic-02))`) {
    var gad = document.getElementsByClassName("gadget-growimage button nor")[0];
    gad.innerHTML = "<img src=" + localStorage.getItem("backg").replace("url('", "").replace("')", "") + ">"
    document.getElementById("backurl").value = localStorage.getItem("backg");
}

document.getElementById('set').addEventListener('click', function() {
    localStorage.setItem('backg', `url('${document.getElementById("backurl").value}')`);
    var gad = document.getElementsByClassName("gadget-growimage button nor")[0];
    gad.innerHTML = "<img src=" + document.getElementById("backurl").value + ">"
    document.getElementById("backurl").value = localStorage.getItem("backg");
});

document.getElementById('reset').addEventListener('click', function() {
    localStorage.setItem('backg', `linear-gradient(to bottom, var(--cs-key-03), var(--cs-basic-04) 40%, var(--cs-basic-02))`);
    var gad = document.getElementsByClassName("gadget-growimage button nor")[0];
    gad.innerHTML = "<img src=" + "https://ela.education.ne.jp/images/grows/grows_2025/gr001.png" + ">"
    document.getElementById("backurl").value = "";
});

window.addEventListener("message", (event) => {
    if (event.source !== window) return;
    if (event.data.type === "ADDVariable") {
      window[event.data.variablename] = event.data.value;
      console.log("変数追加:", event.data.variablename, event.data.value);
    }
  });  

document.getElementById('cssedit').addEventListener('click', function() {
    window.open(
        window.csseditorurl,
        'newWindow',
        'width=400,height=300,left=100,top=100'
      );
});