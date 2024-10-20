const pages = {};

function timeSince(date) {
    const now = Date.now();

    let secondsSince = Math.floor((now) - new Date(date).getTime() / 1000);

    const seconds = secondsSince % 60;
    secondsSince = Math.floor(seconds);
    const minutes = secondsSince% 60;
    secondsSince = Math.floor(minutes);
    const hours = secondsSince%24;
    secondsSince = Math.floor(hours);
    const days = secondsSince%30;

    return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;

}

function formatPages(results, perPage, pageLimit) {

    let temp = 0, resultarr, temparr = []; 
    
    for (let result of results) { 
        
        temp++;
        temparr = [];

        temparr.push(result); 
        if (temp === perPage) {
            temp = 0;
            resultarr.push(temparr);
        }
        if (resultarr.length === pageLimit) break;

    }

}