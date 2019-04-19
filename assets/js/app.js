var topics = ["dog", "cat", "rabbit", "hamster", "goldfish", "bird", "turtle", "chicken", 
            "frog", "salamander", "crab", "chinchilla", "alligator", "snake", "falcon", 
            "eagle", "crocodile", "cow", "horse", "lion", "panther", "dolphin", "jaguar"];

var results;
var animal;
var queryURL;

function displayButtons() {   
    for (var i = 0; i < topics.length; i++) {
        animal = topics[i]; 
        createButton(animal);
    }
}

function createButton(animal) {
  var button = $("<button>");
  button.addClass("btn btn-lg btn-info mr-1 py-1 animal-btn");
  button.attr("data-animal", animal);
  $("#buttons").append(button.text(animal));
}


function runQuery(queryURL) {

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
      
      results = response.data;

      
      for (var i = 0; i < results.length; i++) {
          var col = $("<div class='col-12 col-md-6 col-lg-3' ></div>");
          var animalDiv = $("<div class='card mb-2 shadow p-0 border-0' style='height:350px;'></div>");
          var animalImage = $("<img >").addClass("gif m-0");
          var cardBody = $("<div class='card-body py-0 align-text-bottom'></div>");
          var title = results[i].title; 
          var cardTitle = $("<div class='card-header text-normal bg-white text-uppercase'></div>").text(title);
          var rating = results[i].rating;
          var rate = $("<div class='card-footer h6 bg-white text-muted small mb-0'></div>").text("Rating: " + rating );
  
          animalImage.addClass("img-fluid");
          var still_image = results[i].images.fixed_height_still.url;
          animalImage.attr("src", still_image);
          
          var animate_image = results[i].images.fixed_height.url;
          animalImage.attr("data-animate", animate_image);

          animalImage.attr("data-still", still_image);
          animalImage.attr("data-state", "still");   

          animalDiv.append(animalImage);
          animalDiv.append(cardBody);
          animalDiv.append(cardTitle);     
          animalDiv.append(rate);
          
          col.append(animalDiv);
                       
          $("#gifs-appear-here").prepend(col);
      }

  });

}
 
$(document).ready(function(){
   
      displayButtons();
   

    $("button").on("click", ".animal-btn", function() {

        // $("#gifs-appear-here").html("");

        animal = $(this).attr("data-animal");

        queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=4rNY8cQF4MKQel6lt8AVuDA97iMExb2n&limit=12";

        runQuery(queryURL);
  
    });

    $("#add-animal").on("click", function(e) {
      e.preventDefault();
      
      animal = $("input").val().trim();
      topics.push(animal);
      createButton(animal);  
      $("#animalInput").val("");
    });

     
});

  

  $(document.body).on("click", ".gif", function(){

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

      $(document.body).on("click", ".animal-btn", function(){

            animal = $(this).attr("data-animal");

            queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=4rNY8cQF4MKQel6lt8AVuDA97iMExb2n&limit=12";

            runQuery(queryURL);
         
      });
  

  