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
      menu.style.animation = "gradientMove 5s ease infinite";

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