let latestTickers = [];

let url = 'https://api.bitfinex.com/v1/pubticker/';

let favors = {
    "btc": {
        "index": 1,
        "name": "BTC",
        "symble": "btcusd"
    },
    "ltc": {
        "index": 2,
        "name": "LTC",
        "symble": "ltcusd"
    },
    "eth": {
        "index": 3,
        "name": "ETH",
        "symble": "ethusd"
    }
};

chrome.commands.onCommand.addListener(function(command) {
    if (command === "save") {
        sendMsgToContent(latestTickers);
    }
});


var sendMsgToContent = (passed_message) => {

    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
                message: passed_message
            },
            function(response) { /* Ignore any response. */ }
        );
    });
};

var refreshAllTickers = () => {
    for (let prop in favors) {
        console.log(prop);
        loadTicker(favors[prop]);
    }
};

var loadTicker = (coin) => {
    let tickerUrl = url + coin.symble;
    console.log(tickerUrl);
    $.ajax({
        url: tickerUrl,
        success: (result) => {
            console.log(result);
            latestTickers[coin.index] = {
                "symble": coin.symble,
                "name": coin.name,
                "mid": result.mid
            };
            console.log(latestTickers);
        },
        error: (error) => console.log(error)
    });
};

refreshAllTickers();
setInterval(() => refreshAllTickers(), 300000);
