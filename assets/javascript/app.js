// 
var topics = ["Cowboys", "Patriots", "Eagles","Raiders","Packers","Steelers","Bears","49ers","Giants","Browns","Vikings",
"Chiefs","Colts","Broncos","Texans","Bills","Saints","Redskins","Dolphins","Jets","Cardinals","Lions","Ravens","Rams",
"Panthers","Chargers","Falcons","Buccaneers","Titans","Bengals","Jaguars",];
var numberOfGifs = 10;
var rating = "R";

// Making a button class for each team
function renderButtons(){
    for(var i = 0; i < topics.length; i++) {
        var newButton = $("<button>");
        newButton.addClass("btn");
        newButton.addClass("team-button");
        newButton.text(topics[i]);
        $("#button-container").append(newButton);
    }
    $(".team-button").unbind("click");

    $(".team-button").on("click", function(){
        $(".gif-image").unbind("click");
        $("#gif-container").empty();
        $("#gif-container").removeClass("dotted-border");
        populateGifContainer($(this).text());
    });
}

function addButton(team){
    if(topics.indexOf(show) === -1) {
        topics.push(team);
        $("#button-container").empty();
        renderButtons();
    }
}

function populateGifContainer(team){
    $.ajax({
        url: "https://api.giphy.com/v1/gifs/trending?q=" + team + 
		"&api_key=pFLSY7AVO8LvIlTXo2D6O57AmthA4v61&rating=" + cutOffRating + "&limit=" + numberOfGIFs,
		method: "GET"
    }).then(function(response){
        response.data.forEach(function(element){
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

        $("#gif-container").addClass("dotted-border");
        $(".gif-image").unbind("click");
        $(".gif-image").on("click", function(){
            if($(this).attr("state") === "still") {
                $(this).attr("state", "animated");
                $(this).attr("src", $(this).attr("animated-data"));
            }
            else {
                $(this).attr("state", "still");
                $(this).attr("src", $(this).attr("still-data"))
            }

        });
    });
}

$(document).ready(function() {
    renderButtons();
    $("#submit").on("click", function(){
        event.preventDefault();
        addButton($("#team").val().trim());
        $("#team").val("");
    });
});



