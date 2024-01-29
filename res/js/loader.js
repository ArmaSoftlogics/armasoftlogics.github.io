const overlay = document.getElementsByClassName("loaderOverlay")[0];

const imgLoader = document.getElementsByClassName("loader")[0];


if (imgLoader && imgLoader.tagName.toLowerCase() === 'img') {
  
   if (imgLoader && (!imgLoader.hasAttribute("src") || imgLoader.getAttribute("src").trim() === "")) {
        imgLoader.src = "https://armasoftlogics.github.io/res/loading.png";
                        } 
        


if (imgLoader) {
             imgLoader.onerror = function() {
             imgLoader.src = "https://armasoftlogics.github.io/res/loading.png";
                }
            }
            
            
  if (imgLoader && (!imgLoader.hasAttribute("alt") || imgLoader.getAttribute("alt").trim() === "")) {
        imgLoader.alt = "Loading...";
                     }

  
} else {
    
    if (imgLoader) {
      
        imgLoader.classList.remove("loader");
        imgLoader.classList.add("divLoader");
                    }
  
       }

  
 
 window.addEventListener("load", function() {
          if (overlay) { setTimeout(function (){ overlay.style.display = "none"; window.scrollTo({ top: 0 });}, 2000); } }); 
  