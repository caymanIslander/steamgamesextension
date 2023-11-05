// Form submit işlemi
document.getElementById("steamForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const apiKey = document.getElementById("api_key").value;
  const steamId = document.getElementById("steam_id").value;
  const url = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${apiKey}&steamid=${steamId}&format=json`;

  fetch(url)
      .then(response => response.json())
      .then(data => {
          // API yanıtını işleme
          const resultDiv = document.getElementById("result");
          resultDiv.innerHTML = JSON.stringify(data, null, 2);
      })
      .catch(error => {
          console.error("Error: ", error);
      });
});