$(document).ready(function() {
  // Declaring Initial Array of Topics which is a list of Super Heroes
  var topics = [
    "San Francisco 49ers",
    "Kansas City Chiefs",
    "New England Patriots",
    "Dallas Cowboys",
    "Green Bay Packers",
    "Philadelphia Eagles",
    "Seattle Seahawks",
    "Pittsburgh Steelers",
    "Las Vegas Raiders"
  ];

  /// ALL FUNCTIONS

  //Function to display info on the topics by calling an API and retrieving the info
  function displayInfo() {
    $("#team-view").empty();
    var topic = $(this).attr("data-name");
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      topic +
      "&api_key=gO69tn1Qwb1dMmTpAwcc4Pb7GNWN1n5j&limit=10";

    // AJAX call to GET information
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      // If no information on topics is found, the alert the user
      if (response.pagination.total_count == 0) {
        alert("Sorry, there are no Gifs for this topic");
        var itemindex = topics.indexOf(topic);
        // otherwise display button
        if (itemindex > -1) {
          topics.splice(itemindex, 1);
          renderButtons();
        }
      }

      // Save response from API call (JSON) to a variable results
      var results = response.data;
      for (var j = 0; j < results.length; j++) {
        // Create new Div
        var newTopicDiv = $("<div class='team-name'>");
        // Save responses from API into variables and add to DOM
        // GIF Rating
        var pRating = $("<p>").text(
          "Rating: " + results[j].rating.toUpperCase()
        );
        // GIF Title
        var pTitle = $("<p>").text("Title: " + results[j].title.toUpperCase());
        // GIF URL
        var gifURL = results[j].images.fixed_height_still.url;
        var gif = $("<img>");
        gif.attr("src", gifURL);
        gif.attr("data-still", results[j].images.fixed_height_still.url);
        gif.attr("data-animate", results[j].images.fixed_height.url);
        gif.attr("data-state", "still");
        gif.addClass("animate-gif");
        // Appending info
        newTopicDiv.append(pRating);
        newTopicDiv.append(pTitle);
        newTopicDiv.append(gif);
        // Putting the saved info to new div
        $("#team-view").prepend(newTopicDiv);
      }
    });
  }

  // Function for displaying buttons
  function renderButtons() {
    // Deletes the movies prior to adding new movies
    $(".buttons-view").empty();
    // Loops through the array of topics to create buttons for all topics
    for (var i = 0; i < topics.length; i++) {
      var createButtons = $("<button>");
      createButtons.addClass("topic btn btn-info");
      createButtons.attr("data-name", topics[i]);
      createButtons.text(topics[i]);
      $(".buttons-view").append(createButtons);
    }
  }

  // Function to remove buttons
  function removeButton() {
    $("#team-view").empty();
    var topic = $(this).attr("data-name");
    var itemindex = topics.indexOf(topic);
    if (itemindex > -1) {
      topics.splice(itemindex, 1);
      renderButtons();
    }
  }

  // Function to play or still Gif images
  function playGif() {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  }

  ///EVENT LISTENERS aka CLICK EVENTS
  // Click on the submit button to add a new team button
  $("#add-team").on("click", function(event) {
    event.preventDefault();
    // capture input from the form
    var team = $("#team-input")
      .val()
      .trim();
    // check if topic exsits already
    if (
      topics
        .toString()
        .toLowerCase()
        .indexOf(team.toLowerCase()) != -1
    ) {
      alert("Topic already exists");
    } else {
      topics.push(team);
      renderButtons();
    }
  });

  // Click on team button to display Gifs and other info from API
  $(document).on("click", ".topic", displayInfo);
  // Click on the Gif image to animate or make it still
  $(document).on("click", ".animate-gif", playGif);
  // Double-click on any team button to remove it from the array. Tried this for the first time.
  $(document).on("dblclick", ".topic", removeButton);

  // Calling the renderButtons function to display the intial buttons
  renderButtons();
}); //PAGE CLOSING BRACKET
