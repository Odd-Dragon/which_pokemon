async function rollDice() {
    const url = 'https://diceforge.p.rapidapi.com/roll?sides=6&count=1&modifier=5&advantage=true';
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