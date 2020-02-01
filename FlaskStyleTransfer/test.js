function myFunction(){

    let result = document.querySelector('img');
    let content = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuyhDNz_ucGzC60IA5a6_mM4pKPYUHYL7sDKid5C-Jkyo0B6Ia&s";
    let style = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzhnYvffH6b9n4JUIUQBbXJOqrhIYWe0fyOGCyynzAaz2uxdoIbA&s";

    // Creating a XHR object
    let xhr = new XMLHttpRequest();
    let url = "http://127.0.0.1:5000/postmethod";

    // open a connection
    xhr.open("POST", url, true);
    xhr.responseType = "blob";

    // Set the request header i.e. which type of content you are sending
    xhr.setRequestHeader("Content-Type", "application/json");

    // Create a state change callback
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {

            // Print received data from server
            let resultImg = this.response;
            result.src = URL.createObjectURL(resultImg)

        }
    };

    // Converting JSON data to string
    var data = JSON.stringify({ "content": content, "style": style });

    // Sending data with the request
    xhr.send(data);

}
