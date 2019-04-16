var topics = ["dog", "cat", "rabbit", "hamster", "goldfish", "bird", "turtle", "chicken", 
            "frog", "salamander", "crab", "chinchilla", "alligator", "snake", "falcon", 
            "eagle", "crocodile", "cow", "horse", "lion", "panther", "dolphin", "jaguar"];

function createButtons() {
    // var btnGroup = $("<div class='btn-group btn-group-lg mr-2' role='group'>");
    for (var i = 0; i < topics.length; i++) {
        var animal = topics[i];            
        var button = $("<button class='btn btn-lg btn-info mr-1 py-1' data-animal=" + animal + ">" + animal + "</button>");
        // btnGroup.append(button);   
        $("#buttons").append(button);
    }
}

// Generic function for capturing the movie name from the data-attribute
function imageState() {
  var imageState = $(this).attr("data-state");
  return imageState;
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
                var col = $("<div class='col-12 col-md-6 col-lg-3'>");
                var animalDiv = $("<div class='card mb-2 shadow' style='height:280px;'>");
                var cardBody = $("<div class='card-body'>");

                var rating = results[i].rating;
                var title = results[i].title;
                var p1 = $("<p>").text("Rating: " + rating);

                // var cardTitle = $("<h6 class='card-text'>");
                //     cardTitle.text("Title: " + title);

                var animalImage = $("<img>").addClass("gif");
                animalImage.addClass("img-fluid");

                var still_image = results[i].images.fixed_height_still.url;
                animalImage.attr("src", still_image);
                
                var animate_image = results[i].images.fixed_height.url;
                animalImage.attr("data-animate", animate_image);

                animalImage.attr("data-still", still_image);
                animalImage.attr("data-state", "still");           
                
                animalDiv.append(animalImage);
                animalDiv.append(cardBody);
                // animalDiv.append(cardTitle);
                animalDiv.append(p1);

                col.append(animalDiv);
                             
                $("#gifs-appear-here").prepend(col);
            }
    
        });
    });

    $(document).on("click", ".gif", function(){

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

    // $(".gif").on("click", function(){
    //   alert("you clicked me");
        // var state = $(this).attr("data-state");
        // var state = $(this).attr("data-state");
        
        //   if (state === "still") {
        //     $(this).attr("src", $(this).attr("data-animate"));
        //     $(this).attr("data-state", "animate");
        //   }
        //   else {
        //     $(this).attr("src", $(this).attr("data-still"));
        //     $(this).attr("data-state", "still");
        //   }
    // });
});