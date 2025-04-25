function showMarquee(text) {
    var marquee = document.createElement("div");
    marquee.className = "gadget-marquee";
    marquee.style.setProperty("--scroll_time", "30s");
    var ul = document.createElement("ul");
    ul.className = "marquee-list";
    var li = document.createElement("li");
    li.className = "marquee-item";
    li.innerHTML = text;
    ul.appendChild(li);
    marquee.appendChild(ul);

    document.body.prepend(marquee);

    setTimeout(() => {
        marquee.style.opacity = "0";
        marquee.style.transform = "translateY(-20px)";
        setTimeout(() => marquee.remove(), 500);
    }, 30000);
}