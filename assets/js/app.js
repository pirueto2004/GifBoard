var topics = ["dog", "cat", "rabbit", "hamster", "goldfish", "bird", "turtle", "chicken", 
            "frog", "salamander", "crab", "chinchilla", "alligator", "snake", "falcon", 
            "eagle", "crocodile", "cow", "horse", "lion", "panther", "dolphin", "jaguar"];

function createButtons() {
    for (var i = 0; i < topics.length; i++) {
        var animal = topics[i];
        var button = $("<button class='btn btn-lg btn-info' data-animal=" + animal + ">" + animal + "</button>");
        $("#buttons").append(button);
    }
}
$(document).ready(function(){
    createButtons();

    $("button").on("click", function() {
        var thisAnimal = $(this).attr("data-animal");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + thisAnimal + "&api_key=4rNY8cQF4MKQel6lt8AVuDA97iMExb2n&limit=12";
  
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
            
            var results = response.data;
            console.log(results);
            for (var i = 0; i < results.length; i++) {
    
                var animalDiv = $("<div>");
                var rating = results[i].rating;
                var title = results[i].title;
                var p1 = $("<p>").text("Rating: " + rating);
                var p2 = $("<p>").text("Title: " + title);
                var animalImage = $("<img>").addClass(".gif");
    
                animalImage.attr("src", results[i].images.fixed_height.url);
                animalDiv.append(p1);
                animalDiv.append(p2);
                animalDiv.append(animalImage);

                var col = $("<div class='col-sm-3'>")
                col.append(animalDiv);
                $("#gifs-appear-here").prepend(col);
            }
    
        });
    });

    $(".gif").on('click', function(){

        var state = $(this).attr("data-state");
    
          if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          }
          else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
    });
});