let flightData = {
  Depart: "Depart",
  Arrive: "Arrive",
  Stops: "Stops",
  Duration: "Duration",
  Price: "Price",
};

describe("United Airlines", function () {
  it("Fill the search criteria", function () {
    fill("JFK");
  });

  it("Fill the search criteria and click Find flights", function () {
    fillAndFind("EWR");
  });

  it("Sort the flights by Economy ", function () {
    fillAndFind("EWR");
    getData();
  });

  it("Write & print json ", function () {
    writeJSON();
  });

  after((browser) => browser.end());
});

function fill(origin) {
  browser
    .navigateTo("https://www.united.com")
    .waitForElementVisible("body")
    .assert.visible("label[for=oneway]")
    .click("label[for=oneway]")
    .assert.visible("input[id=bookFlightOriginInput]")
    .setValue("input[id=bookFlightOriginInput]", "")
    .setValue("input[id=bookFlightOriginInput]", origin)
    .click('li[id="autocomplete-item-0"]')
    .assert.visible("input[id=bookFlightDestinationInput]")
    .setValue("input[id=bookFlightDestinationInput]", "")
    .setValue("input[id=bookFlightDestinationInput]", "MIA - All Airports")
    .click('li[id="autocomplete-item-0"]')
    .assert.visible("input[id=DepartDate]")
    .setValue("input[id=DepartDate]", "")
    .setValue("input[id=DepartDate]", "19 feb")
    .assert.visible("button[id=cabinType]")
    .click("button[id=cabinType]")
    .setValue("button[id=cabinType]", "0");
}

function find() {
  browser.click("button[type=submit]").assert.titleContains("United Airlines");
}
function fillAndFind(origin) {
  fill(origin);
  find();
}

function sort() {
  browser
    .click(
      'button[class="atm-c-btn app-components-Shopping-ResultSortFilter-styles__openButton--2RXrZ open"]'
    )
    .click(
      'select[class="atm-c-select atm-c-select-field__control"]  option[value=ECO-BASIC]'
    )
    .click(
      'button[class="atm-c-btn app-components-Shopping-ResultSortFilter-styles__applyButton--3p2GS atm-c-btn--primary"]'
    );
}

function getData() {
  browser
    .getText(
      "#flightResults-content > div.app-components-Shopping-ResultGrid-styles__flightsContainer--3sApV > div:nth-child(1) > div > div:nth-child(1) > div.app-components-Shopping-FlightBaseCard-styles__flightBaseCardContainer--3unlI > div > div.app-components-Shopping-FlightInfoBlock-styles__flightInfo--Y-TzG > div.app-components-Shopping-FlightInfoBlock-styles__airport--1VYmb.app-components-Shopping-FlightInfoBlock-styles__departAirport--1V3Dd > div > span.app-components-AriaMessage-styles__visuallyHidden--2RXE0",
      function (result) {
        flightData.Depart = result.value;
      }
    )
    .getText(
      "#flightResults-content > div.app-components-Shopping-ResultGrid-styles__flightsContainer--3sApV > div:nth-child(1) > div > div:nth-child(1) > div.app-components-Shopping-FlightBaseCard-styles__flightBaseCardContainer--3unlI > div > div.app-components-Shopping-FlightInfoBlock-styles__flightInfo--Y-TzG > div.app-components-Shopping-FlightInfoBlock-styles__airport--1VYmb.app-components-Shopping-FlightInfoBlock-styles__arrivalAirport--2976a > div > span.app-components-AriaMessage-styles__visuallyHidden--2RXE0",
      function (result) {
        flightData.Arrive = result.value;
      }
    )
    .getText(
      "#flightResults-content > div.app-components-Shopping-ResultGrid-styles__flightsContainer--3sApV > div:nth-child(1) > div > div:nth-child(1) > div.app-components-Shopping-FlightBaseCard-styles__flightBaseCardContainer--3unlI > div > div.app-components-Shopping-FlightInfoBlock-styles__flightInfo--Y-TzG > div.app-components-Shopping-FlightInfoBlock-styles__dividerLine--2s5M8.app-components-Shopping-FlightInfoBlock-styles__duration--WbJ0f > div > div > span:nth-child(1)",
      function (result) {
        flightData.Duration = result.value;
      }
    )
    .getText(
      "#flightResults-content > div.app-components-Shopping-ResultGrid-styles__flightsContainer--3sApV > div:nth-child(1) > div > div:nth-child(1) > div.app-components-Shopping-FlightBaseCard-styles__flightBaseCardContainer--3unlI > div > div.app-components-Shopping-FlightBaseCard-styles__flightBaseCardContainer__header--2Ysas > div.app-components-Shopping-FlightBaseCard-styles__flightHeaderRight--25F4-",
      function (result) {
        flightData.Stops = result.value;
      }
    );
}

function writeJSON() {
  let dataString = JSON.stringify(flightData);
  let fs = require("fs");
  fs.writeFile("data.json", dataString, (err) => {
    if (err) {
      console.log(err);
    }
  });

  console.log(dataString);
}
