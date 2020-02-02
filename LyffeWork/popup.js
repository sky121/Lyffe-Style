// Update the relevant fields with the new data.
window.addEventListener("DOMContentLoaded", () => {
  // ...query for the active tab...



  chrome.tabs.query(
    {
      active: true,
      currentWindow: true
    },
    tabs => {
      chrome.tabs.sendMessage(tabs[0].id, {
        from: "popup",
        subject: "DOMInfo"
      });
    }
  );

  // var input_files = document.getElementById("files");
  // function select(event) {
  //   var file = event.target.files[0];
  //   if (file.type.match("image.*")) {
  //     var url = window.URL.createObjectURL(file);
  //     document.getElementById("submit_image").innerHTML =
  //       '<img src = "' + url + '" alt = "object file" id = "chosen_file" ' +
  //       'height = "64" width = auto>';
  //       chrome.tabs.query(
  //         {
  //           active: true,
  //           currentWindow: true
  //         },
  //         tabs => {
  //           chrome.tabs.sendMessage(tabs[0].id, {
  //             from: "popup",
  //             subject: "Source",
  //             src: url
  //           });
  //         }
  //       );
  //     // chrome.storage.sync.set({"data" : url}, function() {
  //     //     console.log('Value is set to ' + url);
  //     // }
  //     // );
  //   }
  // }
  // input_files.addEventListener("change", select);
});

window.onload = function() {
  document.getElementById("btn").onclick = function () {
    var d = document.getElementById("name").value;
    document.getElementById("submit_image").innerHTML =
      '<img src = "' + d + '" alt = "object file" id = "chosen_file" ' +
      'height = "64" width = auto>';
      chrome.tabs.query(
        {
          active: true,
          currentWindow: true
        },
        tabs => {
          chrome.tabs.sendMessage(tabs[0].id, {
            from: "popup",
            subject: "Source",
            src: d
          });
        }
      );
    // chrome.storage.sync.set({"data" : d}, function() {
    //   console.log('Value is set to ' + d);
    // }
    // );
  }
}

chrome.runtime.onMessage.addListener((msg, sender, response) => {
  if(msg.from == "content"){
    document.getElementById("submit_image").innerHTML =
      '<img src = "' + msg.src + '" alt = "object file" id = "chosen_file" ' +
      'height = "128" width = auto>';
  }
});
