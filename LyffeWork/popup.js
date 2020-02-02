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
      chrome.storage.sync.set({"data" :   
        "https://upload.wikimedia.org/wikipedia/en/thumb/1/1c/Pablo_Picasso%2C_1910%2C_Girl_with_a_Mandolin_%28Fanny_Tellier%29%2C_oil_on_canvas%2C_100.3_x_73.6_cm%2C_Museum_of_Modern_Art_New_York..jpg/555px-Pablo_Picasso%2C_1910%2C_Girl_with_a_Mandolin_%28Fanny_Tellier%29%2C_oil_on_canvas%2C_100.3_x_73.6_cm%2C_Museum_of_Modern_Art_New_York..jpg"},
        function() {
        console.log('Value is set to default');
      }
      );

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
      var url = window.URL.createObjectURL(file);
      document.getElementById("submit_image").innerHTML =
        '<img src = "' + url + '" alt = "object file" id = "chosen_file"' +
        'height = "64" width = auto>';
      chrome.storage.sync.set({"data" : url}, function() {
          console.log('Value is set to ' + url);
      }
      );
    }
  }
  input_files.addEventListener("change", select);
});

window.onload = function() {
  document.getElementById("btn").onclick = function () {
    var d = document.getElementById("name").value;
    document.getElementById("submit_image").innerHTML = 
      '<img src = "' + d + '" alt = object file" id = "chosen_file"' +
      'height = "64" width = auto>';
    chrome.storage.sync.set({"data" : d}, function() {
      console.log('Value is set to ' + d);
    }
    );
  }
}
