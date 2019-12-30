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

            $('#wellSection').empty();
            for (var i = 0; i < numArticles; i++) {
                console.log(NYTData.response.docs[i].headline.main);
                console.log(NYTData.response.docs[i].section_name);
                console.log(NYTData.response.docs[i].pub_date);
                console.log(NYTData.response.docs[i].web_url);
                console.log(NYTData.response.docs[i].byline.original);

                // star dumping into html
                var wellSection = $('<div>');
                wellSection.addClass("well");
                wellSection.attr('id', 'articleWell-' + i);
                $('#wellSection').append(wellSection);

                // check if things exist 
                if(NYTData.response.docs[i].headline !="null"){
                    console.log(NYTData.response.docs[i].headline.main );
                    $("#articleWell-" + i).append("<h3>" + NYTData.response.docs[i].headline.main + "</h3>");
                }
                
                // check for byline
                if(NYTData.response.docs[i].headline.byline && NYTData.response.docs[i].byline.hasOwnProperty("original")){
                    console.log(NYTData.response.docs[i].byline.original);
                    $("#articleWell-" + i).append("<h5>" + NYTData.response.docs[i].byline.original + "</h5>");


                }

                // attrach content to the appropriate well
                $("#articleWell-" + i).append("<h5>" + NYTData.response.docs[i].section_name + "</h5>");
                $("#articleWell-" + i).append("<h5>" + NYTData.response.docs[i].pub_date + "</h5>");
                $("#articleWell-" + i).append("<a href=" + NYTData.response.docs[i].web_url + ">" + NYTData.response.docs[i].web_url + "</a>");










            }

            // logging into console
            console.log(NYTData)
            console.log(queryUrl)
            console.log(numArticles)

        })

}


// MAIN PROCESSES
// ======================================
$('#searchBtn').on('click', function () {

    // Get search term
    queryTerm = $('#search').val().trim();

    // add in the search term 
    var newURl = queryUrlBase + "&q=" + queryTerm

    // Get the number of records 
    numResults = $("#numRecords").val();

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
    runQuery(numResults, newURl);

    return false

})



// 1. Retrive user input and convert into variables
// 2. Use these variables to run on AJAX calls to the New York Times.
// 3. breakdown nyt object into useable fields.
// 4. dynamically generate html content.
// 5. dealing with "edge cases" aka bugs. 