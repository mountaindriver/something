var location_id = [
    '3000035823', //Rome, Italy
    '3000035827', //Paris, France
    '3000035821', //Berlin, Germany
    // '3000035952', //Stockholm, Sweden
]

var jscard = $('#jscard');

const covid = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '625324e95fmshe61bc7d687315bfp1b7c44jsn389593968b9d',
        'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
    }
};

const pricelineAPI = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '4e7b3c0123msh0144d25301a5901p1a8438jsn56901a713f95',
        'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com'
    }
};

for (var i = 0; i < location_id.length; i++) {

    fetch('https://priceline-com-provider.p.rapidapi.com/v1/hotels/search?sort_order=HDR&location_id=' + location_id[i] + '&date_checkout=2022-11-16&date_checkin=2022-11-15&star_rating_ids=3.0%2C3.5%2C4.0%2C4.5%2C5.0&rooms_number=1&amenities_ids=FINTRNT%2CFBRKFST', pricelineAPI)
        .then(response => response.json())
        .then(priceline => {
            fetch('https://covid-193.p.rapidapi.com/statistics', covid)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    console.log(priceline)

                    var countryEl = data.response.find(({
                        country
                    }) => country === priceline.cityInfo.countryName);

                    console.log(countryEl.deaths.new);
                    console.log(priceline.hotels[1].ratesSummary.minPrice);
                    console.log(priceline.hotels[1].name);
                    console.log(priceline.hotels[1].overallGuestRating);

                    var price = priceline.hotels[1].ratesSummary.minPrice;

                    var deathCount = countryEl.deaths.new;

                    var card = 
                    $(`
                    <div class="tile is-child">
                        <article class="tile is-child notification is-success">
                            <div class="content">
                                <p class="title">${priceline.cityInfo.countryName}</p>
                                <p class="subtitle">Starting Hotel rates per Night: ${price} </p>
                                <p class="subtitle">Covid Death: ${deathCount}</p>
                            </div>
                        </article>
                    </div>`)
                    jscard.append(card);
                    

                })
                .catch(err => console.error(err));
        })
        .catch(err => console.error(err));
}