-:how to use:-

*pko.js:- /* <script>
  const pkosu = "YOUR_APPS_SCRIPT_WEB_APP_URL";
  const pkotitle = "Protected Page";   // optional
  const pkoinput = "Enter secret key"; // optional
  const pkobutton = "Unlock";          // optional
  const pkoerror = "Wrong key";        // optional
</script>
<script src="https://armasoftlogics.github.io/js/pko.js"></script> 

code.gs:--  // Code.gs
function doPost(e) {
  // ---- GET PASSKEY FROM REQUEST ----
  var key = e.parameter.key;

  // ---- DEFINE THE SECRET PASSKEY ----
  var SECRET_PASSKEY = "YourSecretKeyHere"; // Change this to your secure passkey

  // ---- VERIFY PASSKEY ----
  var success = (key === SECRET_PASSKEY);

  // ---- RETURN JSON RESPONSE ----
  return ContentService
    .createTextOutput(JSON.stringify({ success: success }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Optional: Enable GET for testing if needed
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ success: false }))
    .setMimeType(ContentService.MimeType.JSON);
}


*/
