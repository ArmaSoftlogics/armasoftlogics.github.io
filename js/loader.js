const overlay = document.getElementsByClassName("loaderOverlay")[0];

const imgLoader = document.getElementsByClassName("loader")[0];


if (imgLoader && imgLoader.tagName.toLowerCase() === 'img') {


  if (imgLoader && (!imgLoader.hasAttribute("alt") || imgLoader.getAttribute("alt").trim() === "")) {
        imgLoader.alt = "Loading...";
                     }
  
   if (imgLoader && (!imgLoader.hasAttribute("src") || imgLoader.getAttribute("src").trim() === "")) {
        imgLoader.style.height = "40px"; 
        imgLoader.style.width = "40px";
        imgLoader.src = "https://armasoftlogics.github.io/files/images/loading.png"; 
                        } 
        

if (imgLoader) {
             imgLoader.onerror = function() {
             imgLoader.style.height = "40px"; 
             imgLoader.style.width = "40px";
             imgLoader.src = "https://armasoftlogics.github.io/files/images/loading.png";
             imgLoader.alt = "Loading...";
                }
            }

} else {
    
    if (imgLoader) {
      
        imgLoader.classList.remove("loader");
        imgLoader.classList.add("divLoader");
                    }
  
       }

  
 
 window.addEventListener("load", function() {
          if (overlay) { setTimeout(function (){ overlay.style.display = "none";   document.body.style.overflow = 'auto';   window.scrollTo({ top: 0 });}, 2000); } }); 
  
