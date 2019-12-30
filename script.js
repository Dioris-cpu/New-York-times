// SET UP VARIABLES
// ====================================

// search Parameters
var auKeys = "JbQzxZHOZsMiANBcfzGZDsXNyl9Z57cw";
var queryTerm = "";
var numResults = 0;
var startYear = 0;
var endYear = 0;

// url base
var queryUrlBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?" + "api-key=" + auKeys;

// variable to track the number of articles 
var articleCounter


// FUNCTIONS
// =====================================
function runQuery(numArticles, queryUrl) {
    $.ajax({ url: queryUrl, method: "GET" })
        .done(function (NYTData) {
            console.log(NYTData)
            console.log(queryUrl)

        })

}


// MAIN PROCESSES
// ======================================
$('#searchBtn').on('click', function () {

    queryTerm = $('#search').val().trim();
    console.log(queryTerm)

    // add in the search term 
    var newURl = queryUrlBase + "&q=" + queryTerm
    console.log(newURl);

    // Get the number of records 

    // Get the start year and end year

    startYear = $('#startYear').val().trim();
    endYear = $('#endYear').val().trim();

    // add the date information to the URL

    if (parseInt(startYear)) {

        startYear = startYear + "0101";

        newURl = newURl + "&begin_date=" + startYear;

        if (parseInt(endYear)) {

            endYear = endYear + "0101";

            newURl = newURl + "&end_date=" + endYear;

        }

    }


    console.log(newURl)







    // send ajax call the newly assembled URL
    runQuery(10, newURl);

    return false

})



// 1. Retrive user input and convert into variables
// 2. Use these variables to run on AJAX calls to the New York Times.
// 3. breakdown nyt object into useable fields.
// 4. dynamically generate html content.
// 5. dealing with "edge cases" aka bugs. 