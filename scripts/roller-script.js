async function rollDice() {
    const sides = document.getElementById('sides').value;
    const count = document.getElementById('count').value;
    const modifier = document.getElementById('modifier').value;
    const advantage = document.getElementById('advantage').checked;
    const url = `https://diceforge.p.rapidapi.com/roll?sides=${sides}&count=${count}&modifier=${modifier}&advantage=${advantage}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'b20897ea6fmsh9e5f8e392a6c93cp1a4c57jsn99e7030caea4',
            'X-RapidAPI-Host': 'diceforge.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}