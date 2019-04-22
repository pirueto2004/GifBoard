//Create array for the animals of my choice
var topics = ["dog", "cat", "rabbit", "hamster", "goldfish", "bird", "turtle", "chicken", 
            "frog", "salamander", "crab", "chinchilla", "alligator", "snake", "falcon", 
            "eagle", "crocodile", "cow", "horse", "lion", "panther", "dolphin", "jaguar"];

//GLOBAL VARIABLES
//------------------------
var favorites =[];
var favCounter = 0;
var favButton;
var animalDivs = [];

var results;
var animal;
var queryURL;
var id;
var title;
var rating;
var col;
var animalDiv;
var animalImage;
var cardBody;
var cardTitle;
var cardFooter;
var imageSrc;
var cardPos;

//FUNCTIONS
//------------------------
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

function createFavButton() {
  favButton = $("<button>");
  favButton.addClass("btn btn-lg btn-outline-primary mr-1 py-1 favorite-btn");
  favButton.text("Favorites");
  $("#fav-button").append(favButton);
}

// //Returns the id of the element with class "gif"
// function getId(el) {
//   var id = el.find(".gif").attr("id");
//   return id;
// }

function buildNewCard(imageSrc, title, rating) {
  // //Create column for the card
  // var col = $("<div class='col-12 col-md-6 col-lg-4 py-2' ></div>");

   //Build card with fixed height of 350px
  var  cardDiv = $("<div class='card mb-2 shadow p-0 border-0 text-center' style='height:350px;'></div>");
 
   //Add image to card
   cardImage = $("<img>").addClass("card-img-top gif m-0");

   cardImage.attr("src", imageSrc);

   cardDiv.append(cardImage);

   //Card body wrapper
   cardBody = $("<div class='card-body py-0 align-text-bottom'></div>");

   cardDiv.append(cardBody);
   
   //Title 
   cardTitle = $("<h6 class='card-title bg-white text-capitalize'></h6>").text(title);

   cardDiv.append(cardTitle);
   
  
   //Card footer with 3 columns 
   cardFooter = $("<div class='card-footer bg-white text-muted small mb-0'></div>");
   var rowFooter = $("<div class='row'></div>");
   var col1 = $("<div class='col-md-6'></div>");
   var col2 = $("<div class='col-md-3'></div>");
 
   //First column for the Rating
   var footerText = $("<p class='text-muted'></p>").text("Rating: " + rating);
   col1.append(footerText);
   rowFooter.append(col1);
 
   //Second column for the favorite icon
   
   var a1 = $("<a>");
   a1.attr("href", "#");
  //  a1.attr("id", "heart");
   a1.addClass("fav-btn");
   var fav = $('<i class="far fa-heart"></i>');
   a1.append(fav);
   col2.append(a1);
   rowFooter.append(col2);
 
 
   //Third column for the share icon
   var col3 = $("<div class='col-md-3'></div>");
   var a2 = $("<a>");
   a2.attr("href", "#");
   a2.addClass("share-btn");
  //  a2.attr("id", "share");
   var share = $('<i class="far fa-share-square" ></i>');
   a2.append(share);
   col3.append(a2);
   rowFooter.append(col3);
   
   //Appending the row with the three columns to the footer
   cardFooter.append(rowFooter);

   cardDiv.append(rowFooter);

   return cardDiv;
 
}

function buildCard(i, title, rating, still_image, animate_image) {
  
  cardPos = i;
  //Create column for the card
  col = $("<div class='col-12 col-md-6 col-lg-4 py-2' ></div>");
  //Build card with fixed height of 350px
  animalDiv = $("<div class='card mb-2 shadow p-0 border-0 text-center' style='height:350px;'></div>");
  //Add image to card
  animalImage = $("<img>").addClass("card-img-top gif m-0");
  //Card body wrapper
  cardBody = $("<div class='card-body py-0 align-text-bottom'></div>");
  
  //Title 
  cardTitle = $("<h6 class='card-title bg-white text-capitalize'></h6>").text(title);
  
  //Card footer with 3 columns 
  cardFooter = $("<div class='card-footer bg-white text-muted small mb-0'></div>");
  var rowFooter = $("<div class='row'></div>");
  var col1 = $("<div class='col-md-6'></div>");
  

  //First column for the Rating
  var footerText = $("<p class='text-muted'></p>").text("Rating: " + rating );
  col1.append(footerText);
  rowFooter.append(col1);

  //Second column for the favorite icon
  var col2 = $("<div class='col-md-3'></div>");
  var a1 = $("<a>");
  a1.attr("href", "#");
  // a1.attr("id", "heart");
  a1.addClass("fav-btn");
  var fav = $('<i class="far fa-heart"></i>');
  a1.attr("pos", i);
  a1.append(fav);
  col2.append(a1);
  rowFooter.append(col2);


  //Third column for the share icon
  var col3 = $("<div class='col-md-3'></div>");
  var a2 = $("<a>");
  a2.attr("href", "#");
  // a2.attr("id", "share");
  a2.addClass("share-btn");
  var share = $('<i class="far fa-share-square" ></i>');
  a2.append(share);
  col3.append(a2);
  rowFooter.append(col3);
  
  //Appending the row with the three columns to the footer
  cardFooter.append(rowFooter);

  //Adding classes and attributes to the image
  animalImage.addClass("img-fluid");
  animalImage.addClass("normal");
  animalImage.attr("id", "item-"+ i );
  animalImage.attr("data-name", title); 
  animalImage.attr("data-rating", rating);      
  animalImage.attr("src", still_image);
  animalImage.attr("data-animate", animate_image);
  animalImage.attr("data-still", still_image);
  animalImage.attr("data-state", "still");   

  //Building the card element by appending the image on top, then the card-body, card-title, and the card-footer
  // animalDiv.append(animalImage);
  // animalDiv.append(cardBody);
  // animalDiv.append(cardTitle);     
  // animalDiv.append(cardFooter);
     animalDiv.attr("pos", cardPos);
  // //Pushing each card element to the array of animalDivs
  // animalDivs.push(animalDiv);
  
  // //Appending the card to the column
  // col.append(animalDiv);
  
  // //Adding the column before the existing ones
  // $("#gifs-appear-here").prepend(col);
}

function runQuery(queryURL) {

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
      
      results = response.data;

      
      for (var i = 0; i < results.length; i++) {
          
          //Title and Rating for each item of results
          var title = results[i].title; 
          var rating = results[i].rating;

          //Still and animate images for the GIF
          var still_image = results[i].images.fixed_height_still.url;
          var animate_image = results[i].images.fixed_height.url;

          buildCard(i, title, rating, still_image, animate_image);

          //Building the card element by appending the image on top, then the card-body, card-title, and the card-footer
          animalDiv.append(animalImage);
          animalDiv.append(cardBody);
          animalDiv.append(cardTitle);     
          animalDiv.append(cardFooter);
          
          //Pushing each card element to the array of animalDivs
          animalDivs.push(animalDiv);
          
          //Appending the card to the column
          col.append(animalDiv);
          
          //Adding the column before the existing ones
          $("#gifs-appear-here").prepend(col);
      }

  });

}

//
$(document).ready(function(){
   
      displayButtons();
      // console.log(animalDivs);
      createFavButton();

      $("#h2").removeClass("d-block").hide();

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

    $("#fav-button").on("click", function(){
      $("#h2").css("display", "block");
      for (var i = 0; i < favorites.length; i++){
        //Create column for the card
      col = $("<div class='col-12 col-md-6 col-lg-4 py-2 text-center' ></div>"); 
      col.append(favorites[i]); 
      $("#fav-gifs").prepend(col); 
      }
      // var card = buildNewCard(imageSrc, title, rating);  
      
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

  $(document.body).on("click", ".fav-btn", function(){
    var this_Btn = $(this);
    //Get position of current element
    var pos = this_Btn.attr("pos");
    console.log(pos);
    if (this_Btn.hasClass("active") && this_Btn.hasClass("favorite")) { 
      this_Btn.removeClass("active favorite");
      this_Btn.addClass("normal");
      this_Btn.html('<i class="far fa-heart"></i>');
        favCounter--;
            if (favCounter < 1) {
              favButton.text("Favorites");
            }
            else {
              favButton.html('Favorites <span class="badge badge-secondary">'+ favCounter + '</span>');
            } 
      }
      else {      
        favCounter++;
        this_Btn.removeClass("normal");
        this_Btn.addClass("active favorite");
        this_Btn.html('<i class="fas fa-heart"></i>');
        favButton.html('Favorites <span class="badge badge-secondary">'+ favCounter + '</span>');  
        // Get the id of the current animal image
        var id = $(animalDivs[pos][0]).find("img").attr("id");
        imageSrc = $(animalDivs[pos][0]).find("img").attr("src");  
        title = $(animalDivs[pos][0]).find("img").attr("data-name");
        rating = $(animalDivs[pos][0]).find("img").attr("data-rating");
        var card = buildNewCard(imageSrc, title, rating);
        favorites.push(card);
        console.log(favorites);
      }  
    
  });

  
      
      
  