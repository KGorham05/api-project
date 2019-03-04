
// Initial array of dog breeds
var items = ["Australian Shepherd", "Chihuahua", "Poodle", "St Bernard", "Mastiff"];

// displayButtonInfo function re-renders the HTML to display the appropriate content
function displayButtonInfo() {

    // not sure what this line of code is for so I'm hiding it until it becomes useful
    //   var dogBreeds = $(this).attr("data-name");

    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + items[0] + "&limit=10&rating=g&api_key=E4GmjIzr95bf7cgs50n05QPKhxsZ1ZZh";

    // Creating an AJAX call for the specific dog breed button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var thumb = response.data[0].images.fixed_width_still
        



    });

};

// Function for displaying items data
function renderButtons() {

    // Deleting the items prior to adding new items
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of items
    for (var i = 0; i < items.length; i++) {

        // Then dynamicaly generating buttons for each items in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var btn = $("<button>");
        // Adding a class of items-btn to our button
        btn.addClass("items-btn");
        // Adding a data-attribute
        btn.attr("data-name", items[i]);
        // Providing the initial button text
        btn.text(items[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(btn);
    }
}

// This function handles events where a items button is clicked
$("#add-item-btn").on("click", function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var item = $("#new-input").val().trim();

    // Adding items from the textbox to our array
    items.push(item);

    // Calling renderButtons which handles the processing of our items array
    renderButtons();
});

// Adding a click event listener to all elements with a class of "items-btn"
$(document).on("click", "#new-input", displayButtonInfo);
displayButtonInfo();
// Calling the renderButtons function to display the intial buttons
renderButtons();
