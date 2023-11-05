const axios = require('axios');
const fs = require('fs');

const apiKey = '';
const steamId = ''; // Replace with the Steam ID you want to fetch game info for

const getLastPurchasedGames = async (apiKey, steamId) => {
  try {
    const response = await axios.get(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${apiKey}&steamid=${steamId}&format=json&include_appinfo=1&include_played_free_games=1`);
    
    if (response.data.response && response.data.response.games.length > 0) {
      const games = response.data.response.games;
      
      // Sort games by purchase date (assuming they are ordered by playtime_forever)
      games.sort((a, b) => b.playtime_forever - a.playtime_forever);
      
      const lastPurchasedGames = games.slice(0, 10000); // 10000 games will be listed
      
      // You can now work with the 'lastPurchasedGames' array as needed
      // For example, you can send this data to a database or another API.
      /*
      console.log('Last 10 Purchased Games:');
      lastPurchasedGames.forEach((game, index) => {
        console.log(`Game ${index + 1}:`);
        console.log(`App ID: ${game.appid}`);
        console.log(`Game Name: ${game.name}`);
        console.log('--------------------------------');
      });
      */
      const gameInfo = lastPurchasedGames.map((game) => ({
        appid: game.appid,
        name: game.name,
      }));
      const jsonGameData = JSON.stringify(gameInfo, null, 2);

      fs.writeFileSync('purchasedGames.json', jsonGameData);
    } else {
      console.log('No owned games found');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

getLastPurchasedGames(apiKey, steamId);
