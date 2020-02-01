// Inform the background page that
// this tab should have a page-action.
chrome.runtime.sendMessage({
  from: "content",
  subject: "showPageAction"
});

// Listen for messages from the popup.
chrome.runtime.onMessage.addListener((msg, sender, response) => {
//chrome.runtime.onMessage.addListener((sender, msg, response) => {
  // First, validate the message's structure.

  console.log("DOM content");

  if (msg.from === "popup" && msg.subject === "DOMInfo") {
    // Collect the necessary data.
    // (For your specific requirements `document.querySelectorAll(...)`
    //  should be equivalent to jquery's `$(...)`.)

    var domInfo = {
      total: document.querySelectorAll("*").length,
      inputs: document.querySelectorAll("input").length,
      buttons: document.querySelectorAll("button").length
    };

    // Directly respond to the sender (popup),
    // through the specified callback.
    response(domInfo);
  }

  else if (msg.from === "popup" && msg.subject === "apply") {    
    console.log("apply_content");
    let imgs = document.querySelectorAll("img");

    for (imgElt of imgs) {
      let file = "images/kitten.jpg";
      let url = chrome.runtime.getURL(file);
      imgElt.src = url;
    }

    var imgInfo = {
      done: true
    }
    response(imgInfo);
  }


  else if (msg.from === "popup" && msg.subject === "submit") {
    let file = msg.file;
    console.log(file.src, file.alt);
  }

  // doesn't work :c
  return Promise.resolve("Dummy response to keep the console quiet");


});
