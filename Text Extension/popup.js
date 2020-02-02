// Update the relevant fields with the new data.
window.addEventListener("DOMContentLoaded", () => {
  // ...query for the active tab...

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
  var style_image = document.getElementById("chosen_file");
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true
    },
    tabs => {
      // ...and send a request for the DOM info...
      chrome.tabs.sendMessage(tabs[0].id, {
        from: "popup",
        subject: "DOMInfo",
        file:
          style_image == null
            ? "https://upload.wikimedia.org/wikipedia/en/thumb/1/1c/Pablo_Picasso%2C_1910%2C_Girl_with_a_Mandolin_%28Fanny_Tellier%29%2C_oil_on_canvas%2C_100.3_x_73.6_cm%2C_Museum_of_Modern_Art_New_York..jpg/555px-Pablo_Picasso%2C_1910%2C_Girl_with_a_Mandolin_%28Fanny_Tellier%29%2C_oil_on_canvas%2C_100.3_x_73.6_cm%2C_Museum_of_Modern_Art_New_York..jpg"
            : style_image.src
      });
    }
  );
});
