import { Component, OnInit } from '@angular/core';
import { ResultData } from '../../interfaces/result-data.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  data = [
    {
      previsoes: 'Água Marinha',
      probabilidades: 0.4,
      cor: '#008fbb',
    },
    {
      previsoes: 'Solo',
      probabilidades: 0.3,
      cor: '#00ad7f',
    },
    {
      previsoes: 'Leite Bovino',
      probabilidades: 0.9,
      cor: '#ef2d38',
    },
    {
      previsoes: 'Intestino Bovino',
      probabilidades: 0.1,
      cor: '#575750',
    },
    {
      previsoes: 'Rúmen Bovino',
      probabilidades: 0.6,
      cor: '#002d42',
    },
  ];
  isUpload: boolean = false;
  urlImage: string = '';
  dna: string = '';
  name: string = '';

  itemWithHighestProbability: ResultData = {} as ResultData;
  filteredData: ResultData[] = [] as ResultData[];

  constructor(public activatedRoute: ActivatedRoute) {
    this.isUpload = this.activatedRoute.snapshot.queryParams['isUpload'];
    this.urlImage = this.activatedRoute.snapshot.queryParams['urlImage'];
    this.dna = this.activatedRoute.snapshot.queryParams['dna'];
    this.name = this.activatedRoute.snapshot.queryParams['name'];
  }

  ngOnInit() {
    if(this.isUpload) {
      console.log('chamar passando url da imagem: ', this.urlImage);
    }else{
      console.log('chamar passando dna: ', this.dna);
    }

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
