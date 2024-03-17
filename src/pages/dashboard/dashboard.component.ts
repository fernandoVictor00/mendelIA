import { Component, OnInit } from '@angular/core';
import { ResultData } from '../../interfaces/result-data.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  data = [
    {
      previsoes: 'Agua marinha',
      probabilidades: 0.4,
      cor: '#2E86C1',
    },
    {
      previsoes: 'Caracteristica 2',
      probabilidades: 0.3,
      cor: '#DC7633',
    },
    {
      previsoes: 'Caracteristica 3',
      probabilidades: 0.9,
      cor: '#CCD1D1',
    },
    {
      previsoes: 'Caracteristica 4',
      probabilidades: 0.1,
      cor: '#E74C3C',
    },
    {
      previsoes: 'Caracteristica 5',
      probabilidades: 0.6,
      cor: '#F1C40F',
    },
  ];

  itemWithHighestProbability: ResultData = {} as ResultData;
  filteredData: ResultData[] = [] as ResultData[];

  constructor() {}

  ngOnInit() {
    this.itemWithHighestProbability = this.getHighProbability();

    this.filteredData = this.data.filter(
      (item) => item !== this.itemWithHighestProbability
    );
  }

  getHighProbability() {
    const { itemWithHighestProbability } = this.data.reduce(
      (acc, curr) => {
        const probability = curr.probabilidades;
        if (probability > acc.highestValue) {
          acc.highestValue = probability;
          acc.itemWithHighestProbability = curr;
        }
        return acc;
      },
      { highestValue: -Infinity, itemWithHighestProbability: this.data[0] }
    );

    return itemWithHighestProbability;
  }
}
