

// event listener for all button elements
$("button").on("click", function() {
    // "this" keyword refers to the button that was clicked
    var animal = $(this).attr("data-animal");

    // URL to search Giphy for the animal button that was clicked.
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    animal + "api_key=SDGwxtRf1A6xMC2lDSGFdc5Z6npokhMP";

    // AJax GET request
    $.ajax({
        url: queryURL,
        method: "GET"
    })

    //Data comes back from API
    .then(function(response) {
        var results = response.data;
        console.log(response);

    // looping the results
    for (var i = 0; i < results.length; i++) {
        // checking for photos rating.  posting appropriate gifs
        if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
            //making div for gif
            var divGif = $("<div>");

            // storing result ratings
            var rating = results[i].rating;

            //making a <p> tag with results rating
            var p = $("<p>").text("Rating: " + rating);

            // making an img tag
            var animalImage = $("<img>");

            animalImage.attr("src", results[i].images.fixed_height.url);

            divGif.append(p);
            divGif.append(animalImage);

            $("gifAppear").prepend(divGif);
            
        }
    }
    });
});