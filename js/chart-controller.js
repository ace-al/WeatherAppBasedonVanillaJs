window.chartColors = {
  red: "rgb(255, 99, 132)",
  orange: "rgb(255, 159, 64)",
  yellow: "rgb(255, 205, 86)",
  green: "rgb(75, 192, 192)",
  blue: "rgb(54, 162, 235)",
  purple: "rgb(153, 102, 255)",
  grey: "rgb(231,233,237)"
};

function generateGraph(labels, data1, data2) {
  var presets = window.chartColors;

  var data = {
    labels: labels,
    datasets: [
      {
        borderColor: presets.blue,
        data: data1,
        label: "Min Temp",
        fill: "-1"
      },
      {
        borderColor: presets.orange,
        data: data2,
        label: "Max Temp",
        fill: "-1"
      }
    ]
  };

  var options = {
    maintainAspectRatio: true,
    spanGaps: false,
    legend: {
      display: true
    },
    elements: {
      line: {
        tension: 0.000001
      }
    },
    layout: {
      padding: {
        left: 50,
        right: 50,
        top: 50,
        bottom: 50
      }
    },
    scales: {
      xAxes: [
        {
          display: true,
          gridLines: {
            display: false
          }
        }
      ],
      yAxes: [
        {
          display: true,
          stacked: true,
          gridLines: {
            display: false
          }
        }
      ]
    },
    plugins: {
      filler: {
        propagate: false
      },
      "samples-filler-analyser": {
        target: "chart-analyser"
      }
    }
  };

  var chart = new Chart("myChart", {
    type: "line",
    data: data,
    options: options
  });
  chart.options.elements.line.tension = 0.4;
  chart.update();
}
