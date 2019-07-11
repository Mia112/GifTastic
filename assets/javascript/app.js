var shows = [
    "Suits", "Scandal", "Black Mirror", "Queen Sugar", "Gray's Anatomy",
    "The Wire", "The Office", "The Big Bang Theory", "The Amazing Race", "The Daily Show",
    "Sex and the City", "RealTime With Bill Maher", "The Fresh Prince of Bel-Air",
    "House of Cards", "Property Brothers"
];
var numberOfGIFs = 12;
var cutOffRating = "PG-13";

function renderButtons() {
    for (var i = 0; i < shows.length; i++) {
        var newButton = $("<button>");
        newButton.addClass("btn");
        newButton.addClass("show-button");
        newButton.text(shows[i]);
        $("#button-container").append(newButton);
    }
    $(".show-button").unbind("click");

    $(".show-button").on("click", function () {
        $(".gif-image").unbind("click");
        $("#gif-container").empty();
        populateGIFContainer($(this).text());
    });

}

function addButton(show) {
    if (shows.indexOf(show) === -1) {
        shows.push(show);
        $("#button-container").empty();
        renderButtons();
    }
}

function populateGIFContainer(show) {
    $.ajax({
        url: "https://api.giphy.com/v1/gifs/search?q=" + show +
            "&api_key=61TKqzUDPHfv40Bqr6iEsqqBCfa360mt&rating=" + cutOffRating + "&limit=" + numberOfGIFs,
        method: "GET"
    }).then(function (response) {
        response.data.forEach(function (element) {
            newDiv = $("<div>");
            newDiv.addClass("individual-gif-container");
            newDiv.append("<p>Rating: " + element.rating.toUpperCase() + "</p>");
            var newImage = $("<img src = '" + element.images.fixed_height_still.url + "'>");
            newImage.addClass("gif-image");
            newImage.attr("state", "still");
            newImage.attr("still-data", element.images.fixed_height_still.url);
            newImage.attr("animated-data", element.images.fixed_height.url);
            newDiv.append(newImage);
            $("#gif-container").append(newDiv);
        });


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

$(document).ready(function () {
    renderButtons();
    $("#submit").on("click", function () {
        event.preventDefault();
        addButton($("#show-name").val().trim());
        $("#show-name").val("");
    });
});