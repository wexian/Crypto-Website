// Utilities
// currency format for US Dollar
let USDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

// Format currency e.g B, M, K
function formatLargeNumber(number) {
  if (isNaN(number)) {
    return "Invalid number";
  }

  if (number < 1e3) {
    return number.toString();
  } else if (number < 1e6) {
    return (number / 1e3).toFixed(2) + "K";
  } else if (number < 1e9) {
    return (number / 1e6).toFixed(2) + "M";
  } else {
    return (number / 1e9).toFixed(2) + "B";
  }
}

let apiArray;

//Top tokens, Highlighted, top gainer, and top volume coins
fetch("https://api.coincap.io/v2/assets/")
  .then((response) => response.json())
  .then((result) => {
    apiArray = result;
    // Check if result.data is an array
    if (Array.isArray(result.data)) {
      // Top Tokens
      result.data.forEach((coin) => {
        document.querySelector("#tableArea").innerHTML += `
          <tr>
            <td><span class="fw-bold">${coin.symbol}</span> <span class="text-secondary">${coin.id}</span></td>
            <td class="text-start">${USDollar.format(coin.priceUsd)}</td>
            <td class="text-center">${parseFloat(coin.changePercent24Hr).toFixed(2)}</td>
            <td class="text-center">$${formatLargeNumber(coin.volumeUsd24Hr)}</td>
            <td class="text-center">$${formatLargeNumber(coin.marketCapUsd)}</td>
          </tr>
        `;
      });
    } else {
      console.error("Data not in the expected format");
    }

    if (Array.isArray(result.data) && result.data.length > 0) {
      //   Show the top 3 highest crypto price
      let highlight = apiArray.data
        .sort((a, b) => parseFloat(b.priceUsd) - parseFloat(a.priceUsd))
        .slice(0, 3);

      highlight.forEach((element) => {
        document.querySelector("#highlighted-coin").innerHTML += `
            <tr>
              <td class="text-center fw-bold">${element.symbol}</td>
              <td class="text-center">${USDollar.format(element.priceUsd)}</td>
              <td class="text-center">${parseFloat(element.changePercent24Hr).toFixed(2)}</td>
            </tr>
          `;
      });

      //   Show the top gainer
      let gainer = apiArray.data
        .sort(
          (a, b) =>
            parseFloat(b.changePercent24Hr) - parseFloat(a.changePercent24Hr)
        )
        .slice(0, 3);

      gainer.forEach((element) => {
        document.querySelector("#topgain-coin").innerHTML += `
          <tr>
            <td class="text-center fw-bold">${element.symbol}</td>
            <td class="text-center">${USDollar.format(element.priceUsd)}</td>
            <td class="text-center">${parseFloat(element.changePercent24Hr).toFixed(2)}</td>
          </tr>
        `;
      });

      //   Show the top 3 volume
      let volume = apiArray.data
        .sort((a, b) => parseFloat(b.vwap24Hr) - parseFloat(a.vwap24Hr))
        .slice(0, 3);

      volume.forEach((element) => {
        document.querySelector("#topvol-coin").innerHTML += `
        <tr>
          <td class="text-center fw-bold">${element.symbol}</td>
          <td class="text-center">${USDollar.format(element.priceUsd)}</td>
          <td class="text-center">${parseFloat(element.changePercent24Hr).toFixed(2)}</td>
        </tr>
      `;
      });
    } else {
      console.error("Data not in the expected format or empty array");
    }
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
