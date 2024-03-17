import { Component, Input, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { ResultData } from '../../interfaces/result-data.interface';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements AfterViewInit {
  chart: any;

  @Input()
  data: ResultData = {} as ResultData;

  @Input()
  isMainChart: boolean = false;

  constructor() { }

  ngAfterViewInit() {
    if (this.data) {
      const canvas = document.getElementById(this.data.previsoes) as HTMLCanvasElement;
      this.chart = new Chart(canvas, {
        type: 'doughnut',
        data: {
          datasets: [
            {
              label: 'Percentage',
              data: [(this.data.probabilidades * 100), 100-(this.data.probabilidades * 100)],
              backgroundColor: [this.data.cor, '#ffffff'] ,
              borderWidth: 1,
            },
          ],
        },
        options: {
          plugins: {
            tooltip: {
              enabled: false
            }
          },
        },
      });
    }
  }
}
