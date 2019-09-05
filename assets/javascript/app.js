var topics = ["Cowboys","Patriots","Eagles","Raiders","Packers","Steelers","Bears","49ers","Giants","Browns","Vikings",
"Chiefs","Colts","Broncos","Texans","Bills","Saints","Redskins","Dolphins","Jets","Cardinals","Lions","Ravens","Rams",
"Panthers","Chargers","Falcons","Buccaneers","Titans","Bengals","Jaguars"];
var numberOfGIFs = 10;
var rating = "PG";
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
        $("#gif-container").removeClass("border");
		populateGIFContainer($(this).text());
	});
}

function addButton(team){
	if(topics.indexOf(team) === -1) {
		topics.push(team);
		$("#button-container").empty();
		renderButtons();
	}
}

function populateGIFContainer(team){
    $.ajax({
		url: "https://api.giphy.com/v1/gifs/trending" + team + 
		"&api_key=x4RAXJ2cuswENQg7324QwDTP48qj4SqA" + rating + "&limit=" + numberOfGIFs,
		method: "GET"
    }).then(function(response){
		response.data.forEach(function(element){
			newDiv = $("<div>");
			newDiv.addClass("individual-gif-container");
			newDiv.append("<p>rating: " + element.rating.toUpperCase() + "</p>");
			var newImage = $("<img src = '" + element.images.fixed_height_still.url + "'>");
			newImage.addClass("gif-image");
			newImage.attr("state", "still");
			newImage.attr("still-data", element.images.fixed_height_still.url);
			newImage.attr("animated-data", element.images.fixed_height.url);
			newDiv.append(newImage);
			$("#gif-container").append(newDiv);
		});

		$("#gif-container").addClass("border");
		$(".gif-image").unbind("click");
		$(".gif-image").on("click", function(){
			if($(this).attr("state") === "still") {
				$(this).attr("state", "animated");
				$(this).attr("src", $(this).attr("animated-data"));
			}
			else {
				$(this).attr("state", "still");
				$(this).attr("src", $(this).attr("still-data"));
			}
		});
	});
}

$(document).ready(function(){
	renderButtons();
	$("#submit").on("click", function(){
		event.preventDefault();
		addButton($("#team").val());
		$("#team").val("");
	});
});