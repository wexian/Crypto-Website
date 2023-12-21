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

fetch("https://api.coincap.io/v2/assets/")
  .then((response) => response.json())
  .then((result) => {
    // Check if result.data is an array
    if (Array.isArray(result.data)) {
      result.data.forEach((coin) => {
        const roundedChangePercent = parseFloat(coin.changePercent24Hr).toFixed(
          2
        );
        document.querySelector("#tableArea").innerHTML += `
          <tr>
            <td>${coin.symbol} ${coin.id}</td>
            <td>${USDollar.format(coin.priceUsd)}</td>
            <td>${roundedChangePercent}</td>
            <td>$${formatLargeNumber(coin.volumeUsd24Hr)}</td>
            <td>$${formatLargeNumber(coin.marketCapUsd)}</td>
          </tr>
        `;
      });
    } else {
      console.error("Data not in the expected format");
    }
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

//Highlighted coins
fetch("https://api.coincap.io/v2/assets/")
  .then((response) => response.json())
  .then((result) => {
    // Check if result.data is an array
    if (Array.isArray(result.data) && result.data.length > 0) {
      const firstCoin = result.data[0];
      const roundedChangePercent = parseFloat(
        firstCoin.changePercent24Hr
      ).toFixed(2);

      //   Format soon so that it will show the top 3 highest price
      document.querySelector("#highlighted-coin").innerHTML += `
        <tr>
          <td>${result.data[0].symbol} ${result.data[0].id}</td>
          <td>${USDollar.format(result.data[0].priceUsd)}</td>
          <td>${roundedChangePercent}</td>
        <tr>
        <tr>
        <td>${result.data[0].symbol} ${result.data[0].id}</td>
        <td>${USDollar.format(result.data[0].priceUsd)}</td>
        <td>${roundedChangePercent}</td>
        <tr>
        <tr>
        <td>${result.data[0].symbol} ${result.data[0].id}</td>
        <td>${USDollar.format(result.data[0].priceUsd)}</td>
        <td>${roundedChangePercent}</td>
        <tr>
      
      `;
    } else {
      console.error("Data not in the expected format or empty array");
    }
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
