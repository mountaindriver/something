var con = $(".contianer")

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'aad7079f52msh020b1a143d31134p166daejsn76fc4309bafa',
        'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com'
    }
};

fetch('https://priceline-com-provider.p.rapidapi.com/v1/hotels/search?sort_order=HDR&location_id=3000035821&date_checkout=2022-11-16&date_checkin=2022-11-15&star_rating_ids=3.0%2C3.5%2C4.0%2C4.5%2C5.0&rooms_number=1&amenities_ids=FINTRNT%2CFBRKFST', options)
    .then(response => response.json())
    .then(priceline => {
        fetch('https://covid-193.p.rapidapi.com/statistics', settings)
            .then(response => response.json())
            .then(response => {
                    console.log(response)
                    console.log(priceline)
                    const finalarr = priceline.map(function (x) {
                        console.log(response.response.find(
                            ({
                                country
                            }) => country === 'Germany'));
                    })
                    return {
                        priceline: x
                    }
                }

            )


            .catch(err => console.error(err));
    })
    .catch(err => console.error(err));


const settings = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '625324e95fmshe61bc7d687315bfp1b7c44jsn389593968b9d',
        'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
    }
};