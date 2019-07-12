//create an array of strings and save it in the variable topics
var topics = [
    "Suits", "Scandal", "Black Mirror", "Queen Sugar", "Gray's Anatomy",
    "The Wire", "The Office", "The Big Bang Theory", "The Amazing Race", "The Daily Show",
    "Sex and the City", "RealTime With Bill Maher", "The Fresh Prince of Bel-Air",
    "House of Cards", "Property Brothers"
];
//create a limit variable and set it equal to the number of gifs to display 
var numberOfGIFs = 12;
//create a ratings variable and set it to desired rating
var cutOffRating = "PG-13";

//get the button to display on the page
function renderButtons() {
    for (var i = 0; i < topics.length; i++) {
        //create the shows buttons
        var newButton = $("<button>");
        //add a classes to it the show button
        newButton.addClass("btn");
        newButton.addClass("show-button");
        //get the text value of each show in the array to display ton the buttons
        newButton.text(topics[i]);
        //display the buttons in the button container section of the page
        $("#button-container").append(newButton);
    }
        $(".show-button").unbind("click");

    $(".show-button").on("click", function () {
        $(".gif-image").unbind("click");
        $("#gif-container").empty();
        populateGIFContainer($(this).text());
    });

}
//cle
function addButton(show) {
    if (topics.indexOf(show) === -1) {
        topics.push(show);
        $("#button-container").empty();
        renderButtons();
    }
}
//access the giphy api and get our data
function populateGIFContainer(show) {
    $.ajax({
        url: "https://api.giphy.com/v1/gifs/search?q=" + show +
            "&api_key=61TKqzUDPHfv40Bqr6iEsqqBCfa360mt&rating=" + cutOffRating + "&limit=" + numberOfGIFs,
        method: "GET"
    }).then(function (response) {
        response.data.forEach(function (element) {
            //create a div for each gif received from the database
            newDiv = $("<div>");
            newDiv.addClass("individual-gif-container");
            //display the rating of each gif 
            newDiv.append("<p>Rating: " + element.rating.toUpperCase() + "</p>");
            
            var newImage = $("<img src = '" + element.images.fixed_height_still.url + "'>");
            newImage.addClass("gif-image");
            newImage.attr("state", "still");
            newImage.attr("still-data", element.images.fixed_height_still.url);
            newImage.attr("animated-data", element.images.fixed_height.url);
            newDiv.append(newImage);
            $("#gif-container").append(newDiv);
        });
        //if the image is still, it should animate when clicked and vice versa
        $(".gif-image").unbind("click");
        $(".gif-image").on("click", function () {
            if ($(this).attr("state") === "still") {
                $(this).attr("state", "animated");
                $(this).attr("src", $(this).attr("animated-data"));
            } else {
                $(this).attr("state", "still");
                $(this).attr("src", $(this).attr("still-data"));
            }
        });
    });
}
//when the submit but is clicked reset the form 
        $(document).ready(function () {
        renderButtons();
        $("#submit").on("click", function () {
        event.preventDefault();

        addButton($("#show-name").val().trim());
        $("#show-name").val("");
        });
    });