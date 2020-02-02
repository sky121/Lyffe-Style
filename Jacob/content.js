

// chrome.runtime.sendMessage({
//   from: "content",
//   subject: "showPageAction"
// });

// Listen for messages from the popup.
chrome.runtime.onMessage.addListener(function(msg, sender, response) {
  // First, validate the message's structure.
  if (msg.from === "popup" && msg.subject === "DOMInfo") {
    var style = msg.file;
    // Collect the necessary data.
    // (For your specific requirements `document.querySelectorAll(...)`
    //  should be equivalent to jquery's `$(...)`.)
    console.log(style);
    let imgs = document.querySelectorAll("img");
    //for (imgElt of imgs[0:2]) {
    setTimeout(myFunction(imgs[0], style), 50);
    //}
  }
});

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
