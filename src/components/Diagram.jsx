import React from "react";
import Chart from "chart.js";
import "../App.css";

class LineGraph extends React.Component {
  constructor(props) {
    super(props);
    const myChart = {};
  }

  chartRef = React.createRef();

  componentDidMount() {
    const myChartRef = this.chartRef.current.getContext("2d");
    this.myChart = new Chart(myChartRef, {
      type: "line",
      data: {
        //Bring in data
        labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        datasets: [
          // {
          //   label: "Sales",
          //   data: [86, 67, 91, 100]
          // }          
        ]
      },
      options: {
        responsive: false, //Вписывать в размер canvas
        animation: false,
        scales: {
          xAxes: [
            {
              display: true,
              // ticks: { min: 100 }
              // max: 50
            }
          ],
          yAxes: [
            {
              display: true,
              // ticks: { max: 200 }
              // max: 60
            }
          ]
        }
      }
    });

    Object.keys(this.props.data).forEach((key) => {
      if (typeof(+(key)) == 'number') {
        key = +key;
        this.myChart.data.datasets.push(this.props.data[`${key}`].data);
      }      
    });
    
    // this.myChart.data.datasets[0] = (this.props.data["1"].data);
    // this.myChart.data.labels = this.props.data["1"].labels;

    let lbls = [];
    Object.keys(this.props.data).forEach((key) => {
      lbls.push(Math.max(...this.props.data[`${key}`].labels));
    });
    let lblsMIN = Math.min(...lbls);
    let lblsID = lbls.indexOf(lblsMIN) + 1;

    this.myChart.data.labels = this.props.data[`${lblsID}`].labels;

    this.myChart.update();
    console.log(this.myChart.data.datasets);
  }

  componentDidUpdate() {
    // this.myChart.data.datasets[0] = (this.props.data["1"].data);

    Object.keys(this.props.data).forEach((key) => {
      if (typeof(+(key)) == 'number') {
        key = +key;

        if (this.myChart.data.datasets[`${key-1}`]) {
          this.myChart.data.datasets[`${key-1}`].data = this.props.data[`${key}`].data.data;
        } else {
          this.myChart.data.datasets[`${key-1}`] = this.props.data[`${key}`].data;
        }
        
      }      
    });

    this.myChart.update();
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
