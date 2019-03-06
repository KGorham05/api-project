

// ### Bonus Goals

// 2. Allow users to request additional gifs to be added to the page.
//    * Each request should ADD 10 gifs to the page, NOT overwrite the existing gifs.



// 4. Include a 1-click download button for each gif, this should work across device types.

// 5. Integrate this search with additional APIs such as OMDB, or Bands in Town. Be creative and build something you are proud to showcase in your portfolio

// 6. Allow users to add their favorite gifs to a `favorites` section.
//    * This should persist even when they select or add a new topic.
//    * If you are looking for a major challenge, look into making this section persist even when the page is reloaded(via localStorage or cookies)
// ### Create a README.md

// Add a `README.md` to your repository describing the project. Here are some resources for creating your `README.md`. Here are some resources to help you along the way:

// * [About READMEs](https://help.github.com/articles/about-readmes/)

// * [Mastering Markdown](https://guides.github.com/features/mastering-markdown/)
// .


// Initial array of dog breeds...
var items = ["Australian Shepherd", "Chihuahua", "Poodle", "St Bernard", "Mastiff"];
var searchTerm = '';
// displayButtonInfo function re-renders the HTML to display the appropriate content
function displayButtonInfo() {
    $("#item-view").empty();
    // not sure what this line of code is for so I'm hiding it until it becomes useful


    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&limit=10&rating=pg&api_key=E4GmjIzr95bf7cgs50n05QPKhxsZ1ZZh";

   
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var giphy = response.data;

        for (var i = 0; i < giphy.length; i++) {
            var dataStill = giphy[i].images.fixed_height_still.url;
            var dataGif = giphy[i].images.fixed_height.url;
            var img = $("<img>");
            img.attr("data-state", "still");
            img.attr("data-still", dataStill);
            img.attr("data-animate", dataGif);
            img.attr("id", giphy[i].id);
            img.attr("class", "gifs card-img-top");
            img.attr("src", dataStill);
            var cardDiv = $("<div>");
            cardDiv.attr("class", "card float-left border border-primary");
            cardDiv.attr("style", "width: 18rem;");
            var cardBody = $("<div>");
            cardBody.attr("class", "card-body");
            var h = $("<h5>");
            h.attr("class", "card-title");
            h.text(giphy[i].title);
            var p = $("<p>");
            p.attr("class", "card-text");
            p.text("Rating: " + giphy[i].rating);
            var saveBtn = $("<button>");
            saveBtn.attr("class", "btn btn-outline-primary add-to-favorites ");
            saveBtn.attr("id", giphy[i].id);
            saveBtn.text("Add to Favorites");
            cardBody.append(h);
            cardBody.append(p);
            cardBody.append(saveBtn);
            cardDiv.append(img);
            cardDiv.append(cardBody);
            $("#item-view").prepend(cardDiv);
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

function renderButtons() {
    $("#buttons-view").empty();
    for (var i = 0; i < items.length; i++) {
        var btn = $("<button>");
        btn.addClass("items-btn btn btn-info");
        btn.attr("data-name", items[i]);
        btn.text(items[i]);
        $("#buttons-view").append(btn);
    }
};


// click event listener for add to favorites btn 
$(document).on("click", ".add-to-favorites", function() {
    console.log("add to favorites function running");
    console.log($(this));

});
// Click event listener for new searches
$("#add-item-btn").on("click", function (event) {
    event.preventDefault();
    var item = $("#new-input").val().trim();
    items.push(item);
    renderButtons();
});

// Adding a click event listener to all elements with a class of "items-btn"

$(document).on("click", ".items-btn", function() {
    searchTerm = $(this).attr("data-name");
    displayButtonInfo();
});


// Calling the renderButtons function to display the intial buttons
renderButtons();
