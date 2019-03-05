
// Initial array of dog breeds
var items = ["Australian Shepherd", "Chihuahua", "Poodle", "St Bernard", "Mastiff"];
var searchTerm = '';
// displayButtonInfo function re-renders the HTML to display the appropriate content
function displayButtonInfo() {
    $("#item-view").empty();
    // not sure what this line of code is for so I'm hiding it until it becomes useful


    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&limit=10&rating=g&api_key=E4GmjIzr95bf7cgs50n05QPKhxsZ1ZZh";

    // Creating an AJAX call for the specific dog breed button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var itemDiv = $("<div class='item'>");

        var giphy = response.data;

        for (var i = 0; i < giphy.length; i++) {
            var dataStill = (giphy[i].images.fixed_width_still.url);
            var dataGif = (giphy[i].images.fixed_width.url);
            var img = $("<img>");
            img.attr("data-state", "still");
            img.attr("data-still", dataStill);
            img.attr("data-animate", dataGif);
            img.attr("class", "gifs");
            img.attr("src", dataStill);
            itemDiv.append(img);
            $("#item-view").prepend(itemDiv);
        };

        $(".gifs").on("click", function () {
            var state = $(this).attr("data-state");
            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            };

        });

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
// $(document).on("click", ".items-btn", displayButtonInfo);
$(document).on("click", ".items-btn", function() {
    searchTerm = $(this).attr("data-name");
    displayButtonInfo();
});


// Calling the renderButtons function to display the intial buttons
renderButtons();
