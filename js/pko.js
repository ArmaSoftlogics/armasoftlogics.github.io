window.addEventListener('load', function() {
  (function() {
    // ---- CONFIG ----
    if (typeof pkosu === "undefined" || !pkosu) {
      throw new Error("Please define pkosu on the page before including pko.js");
    }
    const SCRIPT_URL = pkosu;

    // ---- CHECK IF OVERLAY ALREADY EXISTS ----
    if (document.getElementById('pko')) return; // exit if overlay exists

    // ---- CREATE OVERLAY ----
    const pko = document.createElement("div");
    pko.id = "pko";
    pko.style.cssText = `
      position: fixed; top:0; left:0; width:100%; height:100%;
      background:#000; display:flex; justify-content:center; align-items:center;
      z-index:9999; transition: opacity 0.5s ease; opacity:1;
    `;

    const box = document.createElement("div");
    box.style.cssText = `
      background:#fff; padding:20px 30px; border-radius:8px; text-align:center;
      box-shadow: 0 0 10px rgba(0,0,0,0.5);
    `;

    const title = document.createElement("h2");
    title.innerText = typeof pkotitle !== "undefined" ? pkotitle : "Enter Passkey";

    const input = document.createElement("input");
    input.type = "password";
    input.placeholder = typeof pkoinput !== "undefined" ? pkoinput : "Enter passkey";
    input.style.cssText = "padding:8px; width:200px; margin-bottom:10px;";

    const button = document.createElement("button");
    button.innerText = typeof pkobutton !== "undefined" ? pkobutton : "Submit";
    button.style.cssText = "padding:8px 16px; cursor:pointer;";

    const pkoe = document.createElement("p");
    pkoe.id = "pkoe";
    pkoe.style.cssText = "color:red; display:none; margin-top:10px;";
    pkoe.innerText = typeof pkoerror !== "undefined" ? pkoerror : "Incorrect passkey";

    box.appendChild(title);
    box.appendChild(input);
    box.appendChild(document.createElement("br"));
    box.appendChild(button);
    box.appendChild(pkoe);

    pko.appendChild(box);
    document.body.appendChild(pko);

    // ---- PREVENT BODY SCROLL ----
    document.body.style.overflow = "hidden";
    pko.addEventListener("transitionend", () => {
      if (pko.style.display === "none") {
        document.body.style.overflow = "";
      }
    });

    input.focus();

    // ---- FUNCTION TO VERIFY PASSKEY ----
    function pkoc() {
      const key = input.value.trim();
      if (!key) {
        pkoe.innerText = "Please enter a passkey";
        pkoe.style.display = "block";
        input.focus();
        return;
      }

      button.innerText = "Verifying";

      fetch(SCRIPT_URL, {
        method: "POST",
        body: new URLSearchParams({ key: key })
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          pko.style.opacity = "0";
          setTimeout(() => pko.style.display = "none", 500);
        } else {
          pkoe.innerText = data.message || (typeof pkoerror !== "undefined" ? pkoerror : "Incorrect passkey");
          pkoe.style.display = "block";
          input.select();
        }
      })
      .catch(() => {
        pkoe.innerText = typeof pkoerror !== "undefined" ? pkoerror : "Incorrect passkey";
        pkoe.style.display = "block";
        input.select();
      })
      .finally(() => {
        button.innerText = typeof pkobutton !== "undefined" ? pkobutton : "Submit";
      });
    }

    // ---- EVENTS ----
    button.addEventListener("click", pkoc);
    input.addEventListener("keydown", function(e) {
      if (e.key === "Enter") pkoc();
    });

  })();
});
