$(document).foundation();

// City, State locations
var location_id = [
    '3000035823', //Rome, Italy
    '3000035827', //Paris, France
    '3000035821', //Berlin, Germany
]

// Used to genereate the cards
var jscard = $('#jscard');
var previousHistory = $('#previous-history');

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

                    // Gets the country name using Priceline cityInfo, countryName and passes the country information to the Covid API to retreve the Covid data for that country
                    var countryName = priceline.cityInfo.countryName;
                    var countryEl = data.response.find(({
                        country
                    }) => country === countryName);

                    // Price, guestRating, deathCount, and cases variables from the API's
                    var price = priceline.hotels[1].ratesSummary.minPrice;
                    var guestRating = priceline.hotels[1].overallGuestRating;
                    var deathCount = countryEl.deaths.new;
                    var cases = countryEl.cases.active;
                    
                    var card =
                        $(`
                        <ul  class="pricing-table text-center trendingCards">
                            <li class="title">${countryName}</li>
                            <li class="price">Hotels starting at: $${price}/night</li>
                            <li class="description">The rooms and suites have free WiFi and flat-screen TVs. Upgrades include outdoor decks with the
                                gorgeous Manhattan views, 24-hour room service, and cocktail bars.</li>
                            <li class="bullet-item">Covid Deaths: ${deathCount}</li>
                            <li class="bullet-item">Active Covid cases: ${cases}</li>
                            <li class="bullet-item">Avg rating: ${guestRating}</li>
                            <li class="cta-button"><a class="button button-custom" href="#">Book Now</a></li>
                        </ul>
                    `)
                    
                    jscard.append(card);
                    
                })
                // Catches any errors from the Covid API
                .catch(err => console.error(err));
        })
        // Catches any errors from the Priceline API
        .catch(err => console.error(err));
}

// Adds placeholder into the form inputs for check in and check out
var checkInEl = $('#checkIn');
var checkOutEl = $('#checkOut');

var oneWeek = moment().add(7, "days").calendar();
var twoWeek = moment().add(14, 'days').calendar();

checkInEl.attr('placeholder', oneWeek);
checkOutEl.attr('placeholder', twoWeek);

// Currently this adds a previous history card when the submit button is pressed 
$('#search-btn').on('click', function (event) {
    event.preventDefault();
    var destination = $('#destination').val();
    var origin = $('#origin').val();
    var checkIn = $('#checkIn').val();
    var checkOut = $('#checkOut').val();

    var historyCard =
        $(`
        <ul class="previous-history text-center trendingCards column small-12 large-4">
            <li class="title">Destination: ${destination}</li>
            <li class="price">Origin: ${origin}</li>
            <li class="bullet-item">Check In: ${checkIn}</li>
            <li class="bullet-item">Check Out: ${checkOut}</li>
        </ul>
    `)

    previousHistory.append(historyCard);

});