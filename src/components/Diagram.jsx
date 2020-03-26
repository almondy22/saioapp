import React from "react";
import Chart from "chart.js";
import { fieldDetect } from "../logic/fieldDetect"
import "../App.css";

class LineGraph extends React.Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
  }

  detectSign() {
    let sign = false;
    Object.keys(this.props.state).forEach((key) => {
      let element = this.props.state[`${key}`];
      if (element.sign === '>=') sign = true;   //имеется ограничения вида >=
    });
    return sign;
  }

  getLabels() {
    let lbls = [];
    Object.keys(this.props.data).forEach((key) => {
      lbls.push(Math.max(...this.props.data[`${key}`].labels)); //Ищу максимальный элемент в каждом массиве labels для определения координаты х
    });                                                         // до которой рисуется график и считается у
    let lblsID;
    let sign = this.detectSign();

    if (sign) {
      let lblsMAX = Math.max(...lbls);
      lblsID = lbls.indexOf(lblsMAX) + 1;
    } else {
      let lblsMIN = Math.min(...lbls);    //Нахожу минимальный из всех максимальных элементов
      lblsID = lbls.indexOf(lblsMIN) + 1;   //Получаю индекс этого элемента
    }    
    this.myChart.data.labels = this.props.data[`${lblsID}`].labels;   //Заношу нужный массив labels в график
  }
  deleteOddLines() {
    let selectValue = this.props.state.selectValue;
    let numOfLines = this.myChart.data.datasets.length;
    if (selectValue < numOfLines) {
      let dif = numOfLines - selectValue;
      for (let i = 0; i < dif; i++) {
        let id = this.myChart.data.datasets.length;
        this.myChart.data.datasets.pop();
        this.props.deleteHandler(id);
      }
    }
  }
  checkState() {
    let emptyKoef = false;
    Object.keys(this.props.state).forEach((key) => {
      let element = this.props.state[`${key}`];
      if (element.k1 === '' || element.k2 === '' || element.value === '') emptyKoef = true;  
      // if (element.k1 === '0' && element.k2 === '0' && element.value !== '0') emptyKoef = true;
    });
    return emptyKoef;
  }

  componentDidMount() {
    const myChartRef = this.chartRef.current.getContext("2d");
    this.myChart = new Chart(myChartRef, {
      type: "line",
      data: {
        labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        datasets: []
      },
      options: {
        responsive: false, //Вписывать в размер canvas
        animation: false,
        scales: {
          xAxes: [
            {
              display: true,
              ticks: { beginAtZero: true }            
            }
          ],
          yAxes: [
            {
              display: true,
              ticks: { beginAtZero: true }
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
    this.getLabels();
    fieldDetect(this.props.state, this.myChart.data.labels);
    this.myChart.update();
  }

  componentDidUpdate() {
    Object.keys(this.props.data).forEach((key) => {
      if (typeof(+(key)) == 'number') {
        key = +key;
        if (this.myChart.data.datasets[`${key-1}`]) {
          this.myChart.data.datasets[`${key-1}`].data = this.props.data[`${key}`].data.data;
        } else {
          this.myChart.data.datasets[`${key-1}`] = this.props.data[`${key}`].data;
        };
        if (+(this.props.state[`${key}`].k2) === 0) {
          this.myChart.data.datasets[`${key-1}`].steppedLine = true;
        } else this.myChart.data.datasets[`${key-1}`].steppedLine = false;
      }
    });
    let emptyKoef = this.checkState();
    if (!emptyKoef) {
      this.deleteOddLines();
      this.getLabels();
      fieldDetect(this.props.state, this.myChart.data.labels);
    } 
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
