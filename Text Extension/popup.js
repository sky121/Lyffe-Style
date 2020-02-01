// Update the relevant fields with the new data.
window.addEventListener("DOMContentLoaded", () => {
  // ...query for the active tab...
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true
    },
    tabs => {
      // ...and send a request for the DOM info...
      chrome.tabs.sendMessage(tabs[0].id, {
        from: "popup",
        subject: "DOMInfo"
      });
    }
  );

  var input_files = document.getElementById("files");
  function select(event) {
    var file = event.target.files[0];
    if (file.type.match("image.*")) {
      var reader = new FileReader();
      //reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
      document.getElementById("submit_image").innerHTML =
        '<button type = "button"' +
        'id = "button_submit">Submit</button>' +
        '<img src = "' +
        window.URL.createObjectURL(file) +
        '" alt = "object file" id = "chosen_file">';
    }
  }
  input_files.addEventListener("change", select);
});
