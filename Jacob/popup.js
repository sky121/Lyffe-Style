// Update the relevant fields with the new data.
const setDOMInfo = info => {
  document.getElementById("total").textContent = info.total;
  document.getElementById("inputs").textContent = info.inputs;
  document.getElementById("buttons").textContent = info.buttons;
};

const setApply = info => {
  console.log('apply');
};

const setSubmit = info => {
  console.log('submit');
};

window.addEventListener("DOMContentLoaded", () => {
  // ...query for the active tab...
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true
    },
    tabs => {
      // ...and send a request for the DOM info...
      chrome.tabs.sendMessage(
        tabs[0].id,
        { from: "popup", subject: "DOMInfo" },
        // ...also specifying a callback to be called
        //    from the receiving end (content script).
        setDOMInfo
      );
    }
  );



  const apply_button = document.getElementById('button_apply');

  // apply_button.addEventListener("click", () => {         // ) needed at end before ;
  apply_button.onclick = applyButton;
    
  function applyButton() {
    chrome.tabs.query(
      { active: true, currentWindow: true },
      tabs => {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { from: "popup", subject: "apply"},
           // callback here, do something with the file:
           setApply
        );
      } 
    );
  };



  var input_files = document.getElementById('files');

  function select (event) {
      var file = event.target.files[0];
      if (file.type.match("image.*")) {
        var reader = new FileReader();
        //reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
        document.getElementById("submit_image").innerHTML = '<button type = "button"' +
            'id = "button_submit">Submit</button>' + 
            '<img src = "' + window.URL.createObjectURL(file) +
            '" alt = "object file" id = "chosen_file">';
      }
  }

  input_files.addEventListener("change", select);

  var submit_file = document.getElementById("button_submit");
  submit_file.onclick = submit;
  function submit() {
    chrome.tabs.query(
      { active: true, currentWindow: true },
      tabs => {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { from: "popup", subject: "submit", 
            file : document.getElementById("chosen_file")},
           // callback here, do something with the file:
           setSubmit
        );
      } 
    );
  };

});
