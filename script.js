// let bitcoin = document.getElementById("bitcoin-img-id");
let crypto = document.getElementsByClassName("crypto");
let marketPrice = document.getElementsByClassName("market-price");
let changePercentage = document.getElementsByClassName("change-percentage");
let apiArray;

// Utilities
// Format the price above to USD using the locale, style, and currency.
let USDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

async function fetchCurrency() {
  try {
    let res = await fetch(
      `https://v6.exchangerate-api.com/v6/900611a1da1301c96e0fea1a/pair/USD/PHP`
    );
    if (!res.ok) throw new Error("Could not fetch currency exchange");
    let data = await res.json();
    // updatedPhpCurrency = data.conversion_rate;
  } catch (err) {
    console.log(err.message + "ERRROROROROROROOR");
  }
}

async function fetchCrypto() {
  try {
    await fetchCurrency();
    // isLoading = true;
    // isLoading ? (spinner.style.display = "inline-block") : "none";
    let res = await fetch(`https://api.coincap.io/v2/assets`);
    if (!res.ok) throw new Error("Could not fetch data");
    let data = await res.json();
    console.log(data);
    apiArray = data;

    // sortFilter();
    // sortSelector.addEventListener("change", sortFilter);
    // isLoading = false;
    // isLoading === false ? (spinner.style.display = "none") : "inline-block";
  } catch (err) {
    console.log(err.message + "ERRORRRRRR");
  }
}

async function renderAll() {
  await fetchCrypto();

  //   Displaying the images, name, price, and symbol for the top 5 cryptocoins
  let cryptoArray = Array.from(crypto);
  let marketPriceArray = Array.from(marketPrice);
  let changePercentageArray = Array.from(changePercentage);
  let cryptoIndex = 0;
  let priceUsdIndex = 0;
  let changePercentageIndex = 0;

  cryptoArray.forEach((element) => {
    element.innerHTML = `
    <img
        id="bitcoin-img-id"
        src="https://assets.coincap.io/assets/icons/${apiArray.data[
          cryptoIndex
        ].symbol.toLowerCase()}@2x.png"
        class="img-fluid me-2 py-auto"
        style="width: 35px"
    /> ${apiArray.data[cryptoIndex].name}
    <span class="text-secondary fs-5">${
      apiArray.data[cryptoIndex].symbol
    }</span>`;
    cryptoIndex++;
  });

  marketPriceArray.forEach((element) => {
    element.innerHTML = `${USDollar.format(
      apiArray.data[priceUsdIndex].priceUsd
    )}`;
    priceUsdIndex++;
  });

  changePercentageArray.forEach((element) => {
    element.classList.add(
      `${
        parseFloat(apiArray.data[changePercentageIndex].changePercent24Hr) > 0
          ? "text-success"
          : "text-danger"
      }`
    );
    element.innerHTML = `${parseFloat(
      apiArray.data[changePercentageIndex].changePercent24Hr
    ).toFixed(2)}%`;
    changePercentageIndex++;
  });
}

renderAll();
