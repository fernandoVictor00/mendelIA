import { Component, OnInit } from '@angular/core';
import { ResultData } from '../../interfaces/result-data.interface';
import { metadata } from '../../consts/previsoes';

const data = {
  previsao: {
    '0': 2,
  },
  p_agua_marinha: {
    '0': 0.0,
  },
  p_intestino_bovino: {
    '0': 0.6593360233,
  },
  p_leite_bovino: {
    '0': 0.3206639767,
  },
  p_rumen_bovino: {
    '0': 0.02,
  },
  p_solo: {
    '0': 0.0,
  },
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
 
  filteredData: any;
  itemWithHighestProbability: any;

  constructor() {}

  ngOnInit() {
    this.filteredData = this.filterData(data);

    this.itemWithHighestProbability = this.getHighProbability();

    this.filteredData = this.filteredData.filter(
      (item: any) => item !== this.itemWithHighestProbability
    );
  }

  getHighProbability() {
    const { itemWithHighestProbability } = this.filteredData.reduce(
      (acc: any, curr: any) => {
        const probability = curr.value;
        if (probability > acc.highestValue) {
          acc.highestValue = probability;
          acc.itemWithHighestProbability = curr;
        }
        return acc;
      },
      { highestValue: -Infinity, itemWithHighestProbability: this.filteredData[0] }
    );

    return itemWithHighestProbability;
  }

  filterData(data: any) {
    return  metadata.map(
      ({
        key,
        label,
        color,
      }: {
        key: string;
        label: string;
        color: string;
      }) => ({
        name: key,
        label: label,
        value: data[key]['0'],
        color: color,
      })
    );
  }
}
