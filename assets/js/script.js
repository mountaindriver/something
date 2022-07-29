// City, State locations
var location_id = [
    '3000035823', //Rome, Italy
    '3000035827', //Paris, France
    '3000035821', //Berlin, Germany
]

// Used to genereate the cards
var jscard = $('#jscard');

// Covid API Key
const covid = {
    method: 'GET',
    headers: { 
        'X-RapidAPI-Key': '041eb7fb54mshccc90758b881c87p1ac166jsn097b4b95e812',
        'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
    }
};

// Priceline API Key
const pricelineAPI = {
    method: 'GET',
    headers: { 
        'X-RapidAPI-Key': '625324e95fmshe61bc7d687315bfp1b7c44jsn389593968b9d',
        'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com'
    }
};

// Loops through the Priceline API and the Covid API to retreve data
for (var i = 0; i < location_id.length; i++) {

    // Priceline API fetch
    fetch('https://priceline-com-provider.p.rapidapi.com/v1/hotels/search?sort_order=HDR&location_id=' + location_id[i] + '&date_checkout=2022-11-16&date_checkin=2022-11-15&star_rating_ids=3.0%2C3.5%2C4.0%2C4.5%2C5.0&rooms_number=1&amenities_ids=FINTRNT%2CFBRKFST', pricelineAPI)
        .then(response => response.json())
        .then(priceline => {
            // Covid API fetch
            fetch('https://covid-193.p.rapidapi.com/statistics', covid)
                .then(response => response.json())
                .then(data => {
                    console.log(data) //Delete
                    console.log(priceline) //Delete

                    // Gets the country name using Priceline cityInfo, countryName and passes the country information to the Covid API to retreve the Covid data for that country
                    var countryEl = data.response.find(({
                        country
                    }) => country === priceline.cityInfo.countryName);

                    console.log(countryEl.deaths.new);  //Delete
                    console.log(priceline.hotels[1].ratesSummary.minPrice); //Delete
                    console.log(priceline.hotels[1].name); //Delete
                    console.log(priceline.hotels[1].overallGuestRating); //Delete

                    // Price, deathCount, Rates, guestRating, and currCovid variables from the API's
                    var price = priceline.hotels[1].ratesSummary.minPrice;
                    var rates = priceline.hotels[1].ratesSummary.minPrice;
                    var guestRating = priceline.hotels[1].overallGuestRating;
                    var deathCount = countryEl.deaths.new;
                    // var currCovid = countryEl; //Current covid stat for that country, needs the path from the covid api

                    // Card houses the information pulled from the two API's and genereated in the HTML file
                    // Need to update variable names and create var for cityinfo, country name and add variables to HTML card if we want to use them
                    var card = 
                    $(`
                    <div class="travel-feature-card-details">
                        <div class="card">
                        <div class="small-12 medium-9 columns travel-feature-card-content">
                            <div class="row">
                            <div class="small-8 medium-10 columns">
                                <h6 class="travel-feature-card-title">${priceline.cityInfo.countryName}</h6>
                                <p>The rooms and suites have free WiFi and flat-screen TVs. Upgrades include outdoor decks with the
                                gorgeous Manhattan views, 24-hour room service, and cocktail bars.</p>
                            <h6>Starting Hotel rates per Night: $${price}</h6>
                            <p class="travel-feature-card-price-subtext">Covid Death: ${deathCount}</p>
                        </div>
                    </div>`)

                    
                    jscard.append(card);
                    
                })
                // Catches any errors from the Covid API
                .catch(err => console.error(err));
        })
        // Catches any errors from the Priceline API
        .catch(err => console.error(err));
}