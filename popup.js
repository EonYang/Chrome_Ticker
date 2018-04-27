// https://api.bitfinex.com/v1/pubticker/btcusd
let url = 'https://api.bitfinex.com/v1/pubticker/';
let favors = {
    "btc": {
        "name": "BTC",
        "symble": "btcusd"
    }
};
//$( document ).ready(()=>{
//		// call some function
//		for (let prop in favors){
//				console.log(prop);
//				loadTicker(favors[prop]);
//		}
//});

var loadTicker = (coin) => {
    let tickerUrl = url + coin.symble;
    console.log(tickerUrl);
    $.ajax({
        url: tickerUrl,
        success: (result) => {
            console.log(result);
            addTickerDom(coin.name, result);
        }
    });
};

var addTickerDom = (name, data) => {
    let mid = `${name} : ${data.mid}`;
    console.log(mid);
    $('<p></p>').text(mid).appendTo($('#main'));
};
for (let prop in favors) {
    console.log(prop);
    loadTicker(favors[prop]);
}
