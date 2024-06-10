function getData() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:3000/data", true);
  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      // Request was successful
      //console.log(xhr.responseText);
      dataArray = JSON.parse(xhr.responseText);
      console.log(dataArray);
    } else {
      // Request failed
      console.error("Request failed with status:", xhr.status);
    }
  };
  xhr.onerror = function () {
    console.error("Request failed");
  };

  xhr.send();
}

setInterval(getData, 10000);

var options = {
  series: [
    {
      name: "candle",
      type: "candlestick",
      data: [
        {
          x: new Date(1538778600000),
          y: [70500, 69401, 69350, 70400],
        },
        {
          x: new Date(1538780400000),
          y: [70200, 70500, 70200, 70100],
        },
      ],
    },
  ],
  chart: {
    height: 350,
    type: "line",
  },
  title: {
    text: "BTCUSD",
    align: "left",
  },
  stroke: {
    width: [3, 1],
  },
  tooltip: {
    shared: true,
    custom: [
      function ({ seriesIndex, dataPointIndex, w }) {
        return w.globals.series[seriesIndex][dataPointIndex];
      },
      function ({ seriesIndex, dataPointIndex, w }) {
        var o = w.globals.seriesCandleO[seriesIndex][dataPointIndex];
        var h = w.globals.seriesCandleH[seriesIndex][dataPointIndex];
        var l = w.globals.seriesCandleL[seriesIndex][dataPointIndex];
        var c = w.globals.seriesCandleC[seriesIndex][dataPointIndex];
        return (
          '<div class="apexcharts-tooltip-candlestick">' +
          '<div>Open: <span class="value">' +
          o +
          "</span></div>" +
          '<div>High: <span class="value">' +
          h +
          "</span></div>" +
          '<div>Low: <span class="value">' +
          l +
          "</span></div>" +
          '<div>Close: <span class="value">' +
          c +
          "</span></div>" +
          "</div>"
        );
      },
    ],
  },
  xaxis: {
    type: "datetime",
  },
};

var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();

var options2 = {
  series: [
    {
      name: "candle",
      type: "candlestick",
      data: [
        {
          x: new Date(1538778600000),
          y: [70500, 69401, 69350, 70400],
        },
        {
          x: new Date(1538780400000),
          y: [70200, 70500, 70200, 70100],
        },
      ],
    },
  ],
  chart: {
    height: 350,
    type: "line",
  },
  title: {
    text: "BTCUSD",
    align: "left",
  },
  stroke: {
    width: [3, 1],
  },
  tooltip: {
    shared: true,
    custom: [
      function ({ seriesIndex, dataPointIndex, w }) {
        return w.globals.series[seriesIndex][dataPointIndex];
      },
      function ({ seriesIndex, dataPointIndex, w }) {
        var o = w.globals.seriesCandleO[seriesIndex][dataPointIndex];
        var h = w.globals.seriesCandleH[seriesIndex][dataPointIndex];
        var l = w.globals.seriesCandleL[seriesIndex][dataPointIndex];
        var c = w.globals.seriesCandleC[seriesIndex][dataPointIndex];
        return (
          '<div class="apexcharts-tooltip-candlestick">' +
          '<div>Open: <span class="value">' +
          o +
          "</span></div>" +
          '<div>High: <span class="value">' +
          h +
          "</span></div>" +
          '<div>Low: <span class="value">' +
          l +
          "</span></div>" +
          '<div>Close: <span class="value">' +
          c +
          "</span></div>" +
          "</div>"
        );
      },
    ],
  },
  xaxis: {
    type: "datetime",
  },
};

var chart2 = new ApexCharts(document.querySelector("#chart2"), options2);
chart2.render();

var options3 = {
  series: [
    {
      name: "line",
      type: "line",
      data: [
        {
          x: new Date(1538778600000),
          y: 6604,
        },
        {
          x: new Date(1538782200000),
          y: 6602,
        },
        {
          x: new Date(1538814600000),
          y: 6607,
        },
        {
          x: new Date(1538884800000),
          y: 6620,
        },
      ],
    },
    {
      name: "candle",
      type: "candlestick",
      data: [
        {
          x: new Date(1538778600000),
          y: [6629.81, 6650.5, 6623.04, 6633.33],
        },
        {
          x: new Date(1538780400000),
          y: [6632.01, 6643.59, 6620, 6630.11],
        },
      ],
    },
  ],
  chart: {
    height: 350,
    type: "line",
  },
  title: {
    text: "CandleStick Chart",
    align: "left",
  },
  stroke: {
    width: [3, 1],
  },
  tooltip: {
    shared: true,
    custom: [
      function ({ seriesIndex, dataPointIndex, w }) {
        return w.globals.series[seriesIndex][dataPointIndex];
      },
      function ({ seriesIndex, dataPointIndex, w }) {
        var o = w.globals.seriesCandleO[seriesIndex][dataPointIndex];
        var h = w.globals.seriesCandleH[seriesIndex][dataPointIndex];
        var l = w.globals.seriesCandleL[seriesIndex][dataPointIndex];
        var c = w.globals.seriesCandleC[seriesIndex][dataPointIndex];
        return (
          '<div class="apexcharts-tooltip-candlestick">' +
          '<div>Open: <span class="value">' +
          o +
          "</span></div>" +
          '<div>High: <span class="value">' +
          h +
          "</span></div>" +
          '<div>Low: <span class="value">' +
          l +
          "</span></div>" +
          '<div>Close: <span class="value">' +
          c +
          "</span></div>" +
          "</div>"
        );
      },
    ],
  },
  xaxis: {
    type: "datetime",
  },
};

var chart3 = new ApexCharts(document.querySelector("#chart3"), options3);
chart3.render();

var options4 = {
  series: [
    {
      name: "line",
      type: "line",
      data: [
        {
          x: new Date(1538778600000),
          y: 6604,
        },
        {
          x: new Date(1538782200000),
          y: 6602,
        },
        {
          x: new Date(1538814600000),
          y: 6607,
        },
        {
          x: new Date(1538884800000),
          y: 6620,
        },
      ],
    },
    {
      name: "candle",
      type: "candlestick",
      data: [
        {
          x: new Date(1538778600000),
          y: [6629.81, 6650.5, 6623.04, 6633.33],
        },
        {
          x: new Date(1538780400000),
          y: [6632.01, 6643.59, 6620, 6630.11],
        },
      ],
    },
  ],
  chart: {
    height: 350,
    type: "line",
  },
  title: {
    text: "CandleStick Chart",
    align: "left",
  },
  stroke: {
    width: [3, 1],
  },
  tooltip: {
    shared: true,
    custom: [
      function ({ seriesIndex, dataPointIndex, w }) {
        return w.globals.series[seriesIndex][dataPointIndex];
      },
      function ({ seriesIndex, dataPointIndex, w }) {
        var o = w.globals.seriesCandleO[seriesIndex][dataPointIndex];
        var h = w.globals.seriesCandleH[seriesIndex][dataPointIndex];
        var l = w.globals.seriesCandleL[seriesIndex][dataPointIndex];
        var c = w.globals.seriesCandleC[seriesIndex][dataPointIndex];
        return (
          '<div class="apexcharts-tooltip-candlestick">' +
          '<div>Open: <span class="value">' +
          o +
          "</span></div>" +
          '<div>High: <span class="value">' +
          h +
          "</span></div>" +
          '<div>Low: <span class="value">' +
          l +
          "</span></div>" +
          '<div>Close: <span class="value">' +
          c +
          "</span></div>" +
          "</div>"
        );
      },
    ],
  },
  xaxis: {
    type: "datetime",
  },
};

var chart4 = new ApexCharts(document.querySelector("#chart4"), options4);
chart4.render();
