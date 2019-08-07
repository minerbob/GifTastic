$(document).ready(function () {
// inital values
  var topics = [];
  topics.push("cats");
  topics.push("dogs");
  topics.push("turtles");
  displayButton(topics);

  // Displays clickable button
  function displayButton(arr) {
    $("#buttonHolder").empty();
    for (var i = 0; i < arr.length; i++) {
      var b = $("<button>")
      $(b).text(arr[i]);
      $(b).addClass("data-animal");
      $(b).addClass("btn btn-outline-primary");
      $(b).attr("data-animal", arr[i]);
      $("#buttonHolder").append(b).append(" ");
    }
    buttonListener();

  }

  function buttonListener() {
    $(".data-animal").on("click", function () {
      console.log("I Ran");
      var animal = $(this).attr("data-animal");
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function (response) {

        console.log(response);

        var results = response.data;

        for (var i = 0; i < results.length; i++) {
          var animalDiv = $("<div>");
          var p = $("<p>");
          p.text("Rated: " + results[i].rating);
          var animalImage = $("<img>");
          animalImage.attr("src", results[i].images.fixed_height.url);
          animalDiv.append(p);
          animalDiv.append(animalImage);
          $("#gifs-appear-here").prepend(animalDiv).prepend(" ");

        }

      });
    });
  }

  $(".newButton").on("click", function () {
    if ($("#animalname").val()) {
      topics.push($("#animalname").val());
      displayButton(topics);
    }

  });
})