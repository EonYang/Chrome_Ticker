chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log('msg got');
        addTickerToDom(request.message.tickers);
		addTimeAgo(request.message.timePassed);
        setTimeout(clearTickerDom, 2000);
    }
);

var addTimeAgo = (time) => {
	$('<p></p>').text(`Last refresh: ${time}' ago.`).appendTo($(".myTicker"));
};



var addTickerToDom = (tickers) => {
    console.log(tickers);
    let div = $('<div></div>');
    div.addClass('myTicker');
    for (i = 0; i < tickers.length; i++) {
        if (tickers[i] != undefined) {
            let mid = `${tickers[i].name} : ${tickers[i].mid}`;
            console.log(mid);
            $('<p></p>').text(mid).appendTo(div);
        }
    }
    div.prependTo($('body'));
};

var clearTickerDom = () => {
    $('.myTicker').remove();
};
