// Function to create a candlestick chart
function createCandlestickChart(selector, data, height, titleText) {
  return new ApexCharts(document.querySelector(selector), {
    series: [{
      name: "candle",
      type: "candlestick",
      data: data
    }],
    chart: {
      height: height,
      type: "line"
    },
    title: {
      text: titleText,
      align: "left"
    },
    stroke: {
      width: [3, 1]
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
            '<div>Open: <span class="value">' + o + "</span></div>" +
            '<div>High: <span class="value">' + h + "</span></div>" +
            '<div>Low: <span class="value">' + l + "</span></div>" +
            '<div>Close: <span class="value">' + c + "</span></div>" +
            "</div>"
          );
        },
      ],
    },
    xaxis: {
      type: "datetime"
    },
  });
}

// Function to fetch and update chart data
function updateChartData(chart, url) {
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(dataArray => {
      // Update series data
      chart.updateSeries([{ data: dataArray }]);
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });
}

// Initial chart setup and data fetch
document.addEventListener("DOMContentLoaded", function() {
  const chartOptions1 = {
    data: [
      { x: new Date(1538778600000), y: [70500, 69401, 69350, 70400] },
      { x: new Date(1538780400000), y: [70200, 70500, 70200, 70100] }
    ],
    height: 800,
    title: "BTCUSD"
  };

  const chart1 = createCandlestickChart("#chart", chartOptions1.data, chartOptions1.height, chartOptions1.title);
  chart1.render();

  // Fetch data initially and at intervals
  updateChartData(chart1, "http://localhost:5000/data");
  setInterval(() => {
    updateChartData(chart1, "http://localhost:5000/data");
  }, 60000);
});

