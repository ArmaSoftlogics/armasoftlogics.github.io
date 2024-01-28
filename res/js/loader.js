const imgLoader = document.getElementsByClassName("loader")[0];

if (imgLoader && (!imgLoader.hasAttribute("src") || imgLoader.getAttribute("src").trim() === "")) {
        imgLoader.src = "https://armasoftlogics.github.io/res/loading.png";
        imgLoader.classList.remove("loader");
        imgLoader.classList.add("loaderError");}


if (imgLoader) {
             imgLoader.onerror = function() {
             imgLoader.src = "https://armasoftlogics.github.io/res/loading.png";
             imgLoader.classList.remove("loader");
             imgLoader.classList.add("loaderError");
                }
            }
  
 
 window.addEventListener("load", function() {
           setTimeout(function (){ document.getElementsByClassName("loaderOverlay")[0].style.display = "none"; window.scrollTo({ top: 0 });}, 2000); }); 
           
           



/*
 🤟 You are free to use this Loader 🤟 
  
 👍 How to add in your website => 
  
 👍 (1/2) Copy & paste: 
 
 <link rel="stylesheet" href="https://armasoftlogics.github.io/res/css/loader.css"> 
    
   Paste in head tag just before any other stylesheet(css) link in head & also before the style tag starts.
   
 👍 (2/2) Copy & paste: 
 
 <div class="loaderOverlay">
  <img class="loader" alt="Loading..." src="logo.png" >
  </div>
  <script src="https://armasoftlogics.github.io/res/js/loader.js"></script> 
 
   Paste in body tag at the starting of the body tag. 
   
   
 
 👍 Here is an example website: 


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Website Name</title>
❤️ <link rel="stylesheet" href="https://armasoftlogics.github.io/res/css/loader.css"> ❤️

  <link rel="stylesheet" href="style.css">
  
<style>
  
</style>
   
</head>
<body> 
❤️ <div class="loaderOverlay">
  <img class="loader" alt="Loading..." src="logo.png" >
  </div>
  <script src="https://armasoftlogics.github.io/res/js/loader.js"></script> ❤️ 
  
 
 
  #Rest of your code#
  

</body>
</html>
  
  
  
  👍 Replace "logo.png" with your actual logo path/url. 
  
  👍 Try to avoid using class="loaderOverlay" & class="loader" & class="loaderError" & @keyframes rotate in your other elements. 
 
  👍 This loader will work even if you do typo in src in img tag/element. 
  
  👍 Giving credits is not compulsory. 

  */
