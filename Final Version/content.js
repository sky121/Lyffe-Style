var style =
  "https://upload.wikimedia.org/wikipedia/en/thumb/1/1c/Pablo_Picasso%2C_1910%2C_Girl_with_a_Mandolin_%28Fanny_Tellier%29%2C_oil_on_canvas%2C_100.3_x_73.6_cm%2C_Museum_of_Modern_Art_New_York..jpg/555px-Pablo_Picasso%2C_1910%2C_Girl_with_a_Mandolin_%28Fanny_Tellier%29%2C_oil_on_canvas%2C_100.3_x_73.6_cm%2C_Museum_of_Modern_Art_New_York..jpg";

chrome.runtime.sendMessage({
  from: "content",
  subject: "showPageAction"
});
// Listen for messages from the popup.
chrome.runtime.onMessage.addListener((msg, sender, response) => {
  // First, validate the message's structure.
  if (msg.from === "popup" && msg.subject === "DOMInfo") {
    // Collect the necessary data.
    // (For your specific requirements `document.querySelectorAll(...)`
    //  should be equivalent to jquery's `$(...)`.)
    let imgs = document.querySelectorAll("img");
    var combine = (image, src) => () =>
      image.src == src ? myFunction(image, window.style) : "";
    for (img of imgs) {
      if (img.src.slice(0, 4) !== "blob") {
        img.addEventListener(
          "mouseover",
          combine(img, (" " + img.src).slice(1))
        );
      }
    }
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
      setTimeout(() => 0, 50);
    }
  };

  // Converting JSON data to string
  var data = JSON.stringify({ content: image.src, style: style });

  image.src = chrome.extension.getURL("images/ChangeLyffe.png");
  setTimeout(() => 0, 50);
  // Sending data with the request
  xhr.send(data);

  return url;
}
