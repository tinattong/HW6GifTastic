$(document).ready(function(){
  $("button").on("click", function() {
      // Grabbing and storing the data-animal property value from the button
      var animal = $(this).attr("data-animal");
      // Constructing a queryURL using the animal name
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=x6MnzNeNpqUSG0cSkMjfiZJlcCxHuTZ9";

      // Performing an AJAX request with the queryURL
      $.ajax({
          url: queryURL,
          method: "GET"
        })
        // After data comes back from the request
        .done(function(response) {
          console.log(queryURL);
          console.log(response);
          // storing the data from the AJAX request in the results variable
          var results = response.data;
          // Looping through each result item
          for (var i = 0; i < results.length; i++) {
            // Creating and storing a div tag
            var animalDiv = $("<div>");
            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + results[i].rating);
            // Creating and storing an image tag
            var animalImage = $("<img>");
            // Setting the src attribute of the image to a property pulled off the result item
            animalImage.attr("src", results[i].images.fixed_height.url);
            // Appending the paragraph and image tag to the animalDiv
            animalImage.attr('data-still', results[i].images.fixed_height_still.url)

            animalImage.attr('data-animate', results[i].images.fixed_height.url)

            .attr('data-state', 'animate');

            animalImage.attr('class', 'anImg');

            animalDiv.append(p);
            animalDiv.append(animalImage);
            // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
            $("#gifs-appear-here").prepend(animalDiv);
            }

            $('.anImg').on('click', function() {
            
                    var state = $(this).attr('data-state'); 
                    console.log(this);

                    if (state == 'still') {
                    
                    $(this).attr('src', $(this).data('animate'));
                    
                    $(this).attr('data-state', 'animate');

                    } else {
                            
                    $(this).attr('src', $(this).data('still'));
                    
                    $(this).attr('data-state', 'still');
                    }      
                });
            });

            $("#gif-input").val("");
            return false;
          });
    });  

