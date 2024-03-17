import { Component, Input, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  chart: any = []

  @Input()
  title: string = "";

  @Input()
  value: string | number = "";

  constructor() { }

  ngOnInit() {

    const x = 80;

    this.chart = new Chart('canvas', {
      type: 'doughnut',
      data: {
        datasets: [
          {
            label: 'Percentage',
            data: [x, 100-x],
            backgroundColor: [
              '#000000',
              '#ffffff'
            ],
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
