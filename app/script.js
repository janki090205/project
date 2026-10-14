async function getWeather(){

    const city =
    document.getElementById("city").value;

    const result =
    document.getElementById("weatherResult");

    if(city.trim()===""){

        alert("Please enter city name");

        return;
    }

    result.innerHTML=
    '<div class="loading">Loading Weather...</div>';

    try{

        const response =
        await fetch(
        `https://wttr.in/${city}?format=j1`
        );

        if(!response.ok){
            throw new Error();
        }

        const data =
        await response.json();

        const weather =
        data.current_condition[0];

        const dateTime =
        new Date().toLocaleString();

        result.innerHTML = `

        <div class="weather-card">

            <h2>📍 ${city}</h2>

            <p>${dateTime}</p>

            <div class="temp">
                ${weather.temp_C}°C
            </div>

            <div class="condition">
                ${weather.weatherDesc[0].value}
            </div>

            <div class="weather-details">

                <div class="detail-box">
                    🌡 Feels Like
                    <h3>${weather.FeelsLikeC}°C</h3>
                </div>

                <div class="detail-box">
                    💧 Humidity
                    <h3>${weather.humidity}%</h3>
                </div>

                <div class="detail-box">
                    🌬 Wind
                    <h3>${weather.windspeedKmph} km/h</h3>
                </div>

                <div class="detail-box">
                    ☁ Cloud Cover
                    <h3>${weather.cloudcover}%</h3>
                </div>

            </div>

        </div>
        `;
    }

    catch(error){

        result.innerHTML = `
        <div class="error">
            ❌ Unable to fetch weather data.
            Please check city name.
        </div>
        `;
    }
}
window.onload = () => {
    document.getElementById("city").value = "Delhi";
    getWeather();
};

document.getElementById("city")
.addEventListener("keypress", function(event){

    if(event.key === "Enter"){
        getWeather();
    }

});