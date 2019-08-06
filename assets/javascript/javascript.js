$(document).ready(function () {

  function displayButton(arr) {
    $(".data-animal").off();
    for (var i = 0; i < arr.length; i++) {
      var b = $("<button>")
      $(b).text(arr[i]);
      $(b).addClass("data-animal");
      $(b).attr("data-animal", arr[i]);
      $("#buttonHolder").append(b).append(" ");
    }
    buttonListener();

  }

  var topics = [];
  topics.push("cats");
  topics.push("dogs");
  topics.push("turtles");
  displayButton(topics);



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
          p.text = results[i].rating;
          var animalImage = $("<img>");
          animalImage.attr("src", results[i].images.fixed_height.url);
          animalDiv.append(p);
          animalDiv.append(animalImage);
          $("#gifs-appear-here").prepend(animalDiv);

        }

      });
    });
  }






  $(".newButton").on("click", function () {
    if ($("#animalname").val()) {
      var b = $("<button>")
      $(b).text($("#animalname").val());
      $(b).addClass("data-animal");
      $(b).attr("data-animal", $("#animalname").val());
      $("#buttonHolder").append(b).append(" ");
      $(".data-animal").off();
      buttonListener();
    }



  });
})