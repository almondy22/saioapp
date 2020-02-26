import React from "react";
import Chart from "chart.js";
import "../App.css";

class LineGraph extends React.Component {
  constructor(props) {
    super(props);
    const myChart = {};
    this.x2 = this.x2.bind(this);
  }

  x2(x1, id) {
    const data = this.props.data[`${id}`];
    console.log(data);
    const k1 = data.k1;
    const k2 = data.k2;
    const value = data.value;
    let func = (value - k1 * x1) / k2;
    console.log(func);
    return func;
  }

  chartRef = React.createRef();

  componentDidMount() {
    const myChartRef = this.chartRef.current.getContext("2d");
    console.log(this.props);
    this.myChart = new Chart(myChartRef, {
      type: "line",
      data: {
        //Bring in data
        labels: [],
        datasets: [
          {
            label: "Sales",
            data: [86, 67, 91, 100]
          },
          {
            label: "X2(X1)(1)", //Метка
            data: [], //Данные
            borderColor: "blue", //Цвет
            borderWidth: 2, //Толщина линии
            fill: true, //Не заполнять под графиком
            radius: 1
          }
        ]
      },
      options: {
        responsive: false, //Вписывать в размер canvas
        scales: {
          xAxes: [
            {
              display: true,
              ticks: { min: 100 }
              // max: 50
            }
          ],
          yAxes: [
            {
              display: true,
              ticks: { max: 200 }
              // max: 60
            }
          ]
        }
      }
    });

    //  Заполняем данными
    // for (let x1 = 0; x1 <= 10; x1 += 2) {
      //     myChart.data.labels.push("" + x1.toFixed(2));
      // this.myChart.data.datasets[1].data.push(this.x2(x1, 1));
      //     // myChart.data.datasets[1].data.push(x2_2(x1, 1).toFixed(2));
      //     // myChart.data.datasets[2].data.push(x2_3(x1).toFixed(2));
    // }

    this.myChart.update();
  }

  componentDidUpdate() {
    for (let x1 = 0; x1 <= 10; x1 += 2) {
      this.myChart.data.labels.push("" + x1.toFixed(2));
      this.myChart.data.datasets[1].data.push(this.x2(x1, 1));
    }
    // this.x2(2, 1);
  }

  render() {
    return (
      <div className="graphContainer">
        <canvas id="myChart" ref={this.chartRef} />
      </div>
    );
  }
}

export default LineGraph;
