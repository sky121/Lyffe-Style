// Update the relevant fields with the new data.
window.addEventListener("DOMContentLoaded", () => {
  // ...query for the active tab...

  var input_files = document.getElementById("files");
  function select(event) {
    console.log('sel_file');
    var file = event.target.files[0];
    if (file.type.match("image.*")) {
      document.getElementById("submit_image").innerHTML =
        '<img src = "' +
        window.URL.createObjectURL(file) +
        '" alt = "object file" id = "chosen_file">';
    }
    stylish({
      from: "popup",
      subject: "DOMInfo",
      file: document.getElementById("chosen_file") ? 
            document.getElementById("chosen_file").src :
            "https://upload.wikimedia.org/wikipedia/en/thumb/1/1c/Pablo_Picasso%2C_1910%2C_Girl_with_a_Mandolin_%28Fanny_Tellier%29%2C_oil_on_canvas%2C_100.3_x_73.6_cm%2C_Museum_of_Modern_Art_New_York..jpg/555px-Pablo_Picasso%2C_1910%2C_Girl_with_a_Mandolin_%28Fanny_Tellier%29%2C_oil_on_canvas%2C_100.3_x_73.6_cm%2C_Museum_of_Modern_Art_New_York..jpg"
    });
  }
  input_files.addEventListener("change", select);
  




  chrome.tabs.query(
    {
      active: true,
      currentWindow: true
    },
    tabs => {
      // ...and send a request for the DOM info...
      console.log('setup');
      chrome.tabs.sendMessage(tabs[0].id, {
        from: "popup",
        subject: "DOMInfo",
        file: document.getElementById("chosen_file") ? 
              document.getElementById("chosen_file").src :
              "https://upload.wikimedia.org/wikipedia/en/thumb/1/1c/Pablo_Picasso%2C_1910%2C_Girl_with_a_Mandolin_%28Fanny_Tellier%29%2C_oil_on_canvas%2C_100.3_x_73.6_cm%2C_Museum_of_Modern_Art_New_York..jpg/555px-Pablo_Picasso%2C_1910%2C_Girl_with_a_Mandolin_%28Fanny_Tellier%29%2C_oil_on_canvas%2C_100.3_x_73.6_cm%2C_Museum_of_Modern_Art_New_York..jpg"
        }
      );
    }
  );

});

// DOMAttrModified
// DOMSubtreeModified
// window.addEventListener("DOMSubtreeModified", () => {
//   chrome.tabs.query(
//     {
//       active: true,
//       currentWindow: true
//     },
//     tabs => {
//       console.log('next');
//       // ...and send a request for the DOM info...
//       chrome.tabs.sendMessage(tabs[0].id, {
//         from: "popup",
//         subject: "DOMInfo",
//         file: document.getElementById("chosen_file").src
//       });
//     }
//   );

// });






// var style =
//   "https://upload.wikimedia.org/wikipedia/en/thumb/1/1c/Pablo_Picasso%2C_1910%2C_Girl_with_a_Mandolin_%28Fanny_Tellier%29%2C_oil_on_canvas%2C_100.3_x_73.6_cm%2C_Museum_of_Modern_Art_New_York..jpg/555px-Pablo_Picasso%2C_1910%2C_Girl_with_a_Mandolin_%28Fanny_Tellier%29%2C_oil_on_canvas%2C_100.3_x_73.6_cm%2C_Museum_of_Modern_Art_New_York..jpg";

// chrome.runtime.sendMessage({
//   from: "content",
//   subject: "showPageAction"
// });
// Listen for messages from the popup.
// chrome.runtime.onMessage.addListener((msg, sender, response) => {
  // First, validate the message's structure.

function stylish (msg) {
  if (msg.from === "popup" && msg.subject === "DOMInfo") {
    // Collect the necessary data.
    // (For your specific requirements `document.querySelectorAll(...)`
    //  should be equivalent to jquery's `$(...)`.)
    style = msg.file;
    console.log(style);
    let imgs = document.querySelectorAll("img");
    //for (imgElt of imgs[0:2]) {
    setTimeout(myFunction(imgs[0], style), 50);
    //}
  }
}

function myFunction(image, style) {
  // Creating a XHR object
  let xhr = new XMLHttpRequest();
  let url = "http://127.0.0.1:5000/postmethod";

  // open a connection
  xhr.open("POST", url, true);
  xhr.responseType = "blob";

  // Set the request header i.e. which type of content you are sending
  xhr.setRequestHeader("Content-Type", "application/json");

  // Create a state change callback
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // Print received data from server
      let resultImg = this.response;
      let url = URL.createObjectURL(resultImg);
      image.src = url;
    }
  };

  // Converting JSON data to string
  var data = JSON.stringify({ content: image.src, style: style });

  // Sending data with the request
  xhr.send(data);

  return url;
}
