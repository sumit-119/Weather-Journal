/* Global Variables */
const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather?zip='
const API_KEY = '087ffe7933cf77cd028a47baf8de0a83';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// Click handler for the generate Button
const clickHandler = async () => {
    let zip = document.getElementById('zip').value;
    let feeling = document.getElementById('feelings').value;
    let url = `${BASE_URL}${zip}&appid=${API_KEY}&units=metric`;
    let data = await getWeatherEntry(url);
    let temp = data.main.temp;
    await postEntry('/entry', {
        temp: temp,
        feeling: feeling,
        date: newDate
    });
    getEntry('/entry')
}

// For posting last entry 
const postEntry = async (url = '', data = {}) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await res.json();
        return newData
    } catch (err) {
        console.log("err", err);
    }
}

//For Fetching data from OpenWeatherApi
const getWeatherEntry = async (url) => {
    const res = await fetch(url)
    try {
        const data = await res.json();
        return data;
    } catch (err) {
        console.log("err", err);
    }
}

//For Fetching last Entry From App 
const getEntry = async (url) => {
    const req = await fetch(url);
    try {
        const allData = await req.json()
        document.getElementById('temp').innerHTML = 'Temp : ' + Math.round(allData.temp) + 'ºC';
        document.getElementById('content').innerHTML = 'Feeling : ' + allData.feeling;
        document.getElementById("date").innerHTML = 'Date : ' + allData.date;
    } catch (err) {
        console.log("err", err);
    }
}

document.getElementById('generate').addEventListener('click', clickHandler);