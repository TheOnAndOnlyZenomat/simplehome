// Get current time and format
function getTime() {
    let date = new Date(),
        min = date.getMinutes(),
        sec = date.getSeconds(),
        hour = date.getHours();

    return "" +
        (hour < 10 ? ("0" + hour) : hour) + ":" +
        (min < 10 ? ("0" + min) : min) + ":" +
        (sec < 10 ? ("0" + sec) : sec);
}

window.onload = () => {
    let xhr = new XMLHttpRequest();
    // Request to open weather map
    xhr.open('GET', 'https://api.openweathermap.org/data/2.5/weather?id=6548737&units=metric&appid=7cb14a9da764c572f3176cbbbbdb5832');
    xhr.onload = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let json = JSON.parse(xhr.responseText);
                console.log(json);
                document.getElementById("temp").innerHTML = json.main.temp.toFixed(0) + " C";
                document.getElementById("weather-description").innerHTML = json.weather[0].description;
            } else {
                console.log('error msg: ' + xhr.status);
            }
        }
    }
    xhr.send();
    // Set up the clock
    document.getElementById("clock").innerHTML = getTime();
    // Set clock interval to tick clock
    setInterval( () => {
        document.getElementById("clock").innerHTML = getTime();
    },100);
}

document.addEventListener("keydown", event => {
    if (event.keyCode == 32) {          // Spacebar code to open search
        document.getElementById('search').style.display = 'flex';
        document.getElementById('search-field').focus();
        document.getElementById('rss1').style.display = 'none';
    } else if (event.keyCode == 27) {   // Esc to close search
        document.getElementById('search-field').value = '';
        document.getElementById('search-field').blur();
        document.getElementById('search').style.display = 'none';
document.getElementById('rss1').style.display = '';
    }
});

function rss() {
    // Note: some RSS feeds can't be loaded in the browser due to CORS security.
    // To get around this, you can use a proxy.
    const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"
    let parser = new RSSParser();
    parser.parseURL(CORS_PROXY + 'https://feed.rssunify.com/5f077702aa298/rss.xml', function(err, feed) {
    if (err) throw err;
    const title = feed.title
    let content = []
    feed.items.forEach(function(entry) {
        content.push('<a class=rss_title href="' + entry.link +'">' + entry.title + '</a>' + '<p class=rss_text>'+ entry.content + '</p>' + '<p class=rss_time>'+ entry.isoDate + '</p>')
    })
    content.toString();
    document.getElementById('rss_title').innerHTML = title;
    document.getElementById('rss_content').innerHTML = content.join("\n");
    })
    // refresh every 30min
    setTimeout(rss,30000);
}
rss();

document.addEventListener("keydown", event => {
    if (event.keyCode == 32) {          // Spacebar code to open search
        document.getElementById('search').style.display = 'flex';
        document.getElementById('search-field').focus();
        document.getElementById('rss1').style.display = 'none';
    } else if (event.keyCode == 27) {   // Esc to close search
        document.getElementById('search-field').value = '';
        document.getElementById('search-field').blur();
        document.getElementById('search').style.display = 'none';
document.getElementById('rss1').style.display = '';
    }
});

function showrss() {
    x = document.getElementById("rss1")
    if (x.style.display === "none") {
        x.style.display = "block";
    }
    else {
        x.style.display = "none";
    }
}