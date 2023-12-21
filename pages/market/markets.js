let USDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

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
            <td>${coin.volumeUsd24Hr}<td>
            <td>${coin.marketCapUsd}</td>
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

      document.querySelector("#highlighted-coin").innerHTML += `
        <tr>
          <td>${result.data[0].symbol} ${result.data[0].id}</td>
          <td>${result.data[0].priceUsd}</td>
          <td>${roundedChangePercent}</td>
        <tr>
        <tr>
        <td>${result.data[0].symbol} ${result.data[0].id}</td>
        <td>${result.data[0].priceUsd}</td>
        <td>${roundedChangePercent}</td>
        <tr>
        <tr>
        <td>${result.data[0].symbol} ${result.data[0].id}</td>
        <td>${result.data[0].priceUsd}</td>
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
