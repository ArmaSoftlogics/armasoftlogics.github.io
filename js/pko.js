window.addEventListener('load', function() {
  (function() {
    // ---- CONFIG ----
    if (typeof pkosu === "undefined" || !pkosu) {
      throw new Error("Please, define pkosu on the page before including pko.js");
    }
    const SCRIPT_URL = pkosu;

    // ---- CHECK IF OVERLAY ALREADY EXISTS ----
    if (document.getElementById('pko')) return; // Exit if overlay exists

    // ---- CREATE OVERLAY ----
    const pko = document.createElement("div");
    pko.id = "pko";
    pko.style.cssText = `
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: #000000; /* Solid, fully opaque black */
      display: flex; justify-content: center; align-items: center;
      z-index: 9999; transition: opacity 0.5s ease; opacity: 1;
    `;

    const box = document.createElement("div");
    box.style.cssText = `
      background: #ffffff; padding: 25px; border-radius: 15px; text-align: center;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3); max-width: 400px; width: 80%;
      border: 1px solid rgba(0, 0, 0, 0.1); opacity: 1;
    `;

    const title = document.createElement("h2");
    title.innerText = typeof pkotitle !== "undefined" ? pkotitle : "Enter PassKey!";
    title.style.cssText = `
      color: #333333; font-family: 'Arial', sans-serif; font-size: 24px;
      margin-bottom: 20px; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    `;

    const input = document.createElement("input");
    input.type = "password";
    input.placeholder = typeof pkoinput !== "undefined" ? pkoinput : "Enter passkey";
    input.style.cssText = `
      padding: 12px; width: 100%; max-width: 250px; margin-bottom: 15px;
      border: 2px solid #555; border-radius: 8px; background: #f9f9f9;
      color: #333; font-size: 16px; transition: border-color 0.3s ease, box-shadow 0.3s ease;
      outline: none;
    `;
    input.addEventListener("focus", () => {
      input.style.borderColor = "#1e90ff";
      input.style.boxShadow = "0 0 8px rgba(30, 144, 255, 0.5)";
    });
    input.addEventListener("blur", () => {
      input.style.borderColor = "#555";
      input.style.boxShadow = "none";
    });

    const button = document.createElement("button");
    button.innerText = typeof pkobutton !== "undefined" ? pkobutton : "Submit";
    button.style.cssText = `
      padding: 12px 24px; border: none; border-radius: 8px; cursor: pointer;
      background: linear-gradient(45deg, #1e90ff, #00b7eb); color: #ffffff;
      font-size: 16px; font-weight: bold; transition: transform 0.2s ease, box-shadow 0.2s ease;
    `;
    button.addEventListener("mouseover", () => {
      if (!button.disabled) {
        button.style.transform = "scale(1.05)";
        button.style.boxShadow = "0 4px 12px rgba(0, 183, 235, 0.4)";
      }
    });
    button.addEventListener("mouseout", () => {
      button.style.transform = "scale(1)";
      button.style.boxShadow = "none";
    });

    const pkoe = document.createElement("p");
    pkoe.id = "pkoe";
    pkoe.style.cssText = `
      color: #ff4d4d; display: none; margin-top: 15px; font-size: 14px;
      animation: shake 0.3s ease;
    `;
    pkoe.innerText = typeof pkoerror !== "undefined" ? pkoerror : "Incorrect passkey.";

    // ---- ADD SHAKE ANIMATION KEYFRAMES ----
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20%, 60% { transform: translateX(-5px); }
        40%, 80% { transform: translateX(5px); }
      }
    `;
    document.head.appendChild(styleSheet);

    box.appendChild(title);
    box.appendChild(input);
    box.appendChild(document.createElement("br"));
    box.appendChild(button);
    box.appendChild(pkoe);

    pko.appendChild(box);
    document.body.appendChild(pko);

    input.focus();

    // ---- FUNCTION TO VERIFY PASSKEY ----
    function pkoc() {
      const key = input.value.trim();
      if (!key) {
        pkoe.innerText = "Please, enter a passkey.";
        pkoe.style.display = "block";
        input.focus();
        return;
      }

      button.innerText = "Verifying...";
      input.disabled = true;
      button.disabled = true;
      button.style.opacity = "0.7"; // Subtle disabled visual
      button.style.cursor = "not-allowed";

      fetch(SCRIPT_URL, {
        method: "POST",
        body: new URLSearchParams({ key: key })
      })
      .then(res => {
        if (!res.ok) {
          throw new Error("Network response was not ok.");
        }
        return res.json();
      })
      .then(data => {
        if (data.success) {
          pko.style.opacity = "0";
          setTimeout(() => pko.style.display = "none", 500);
        } else {
          pkoe.innerText = data.message || (typeof pkoerror !== "undefined" ? pkoerror : "Incorrect passkey.");
          pkoe.style.display = "block";
          input.select();
        }
      })
      .catch(() => {
        pkoe.innerText = typeof pkoerror !== "undefined" ? pkoerror : "Failed to verify passkey.";
        pkoe.style.display = "block";
        input.select();
      })
      .finally(() => {
        button.innerText = typeof pkobutton !== "undefined" ? pkobutton : "Submit";
        input.disabled = false;
        button.disabled = false;
        button.style.opacity = "1";
        button.style.cursor = "pointer";
      });
    }

    // ---- EVENTS ----
    button.addEventListener("click", pkoc);
    input.addEventListener("keydown", function(e) {
      if (e.key === "Enter") pkoc();
    });
  })();
});
