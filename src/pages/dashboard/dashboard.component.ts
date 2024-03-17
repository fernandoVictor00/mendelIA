import { Component, OnInit } from '@angular/core';
import { metadata } from '../../consts/previsoes';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  filteredData: any;
  itemWithHighestProbability: any;
  isUpload: string = '';
  urlImage: string = '';
  dna: string = '';
  name: string = '';
  analysisResult: any;

  constructor(
    public activatedRoute: ActivatedRoute,
    private apiService: ApiService
  ) {
    this.isUpload = this.activatedRoute.snapshot.queryParams['isUpload'];
    this.urlImage = this.activatedRoute.snapshot.queryParams['urlImage'];
    this.dna = this.activatedRoute.snapshot.queryParams['dna'];
    this.name = this.activatedRoute.snapshot.queryParams['name'];
  }

  async ngOnInit() {
    if (this.isUpload == 'false') {
    this.analysisResult = await this.apiService.getAnalysisResult({
        url: this.urlImage,
      });
    } else {
      this.analysisResult = await this.apiService.getAnalysisResult({
        sequence: this.dna,
      });
    }

    this.filteredData = this.filterData(this.analysisResult);

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
      {
        highestValue: -Infinity,
        itemWithHighestProbability: this.filteredData[0],
      }
    );

    return itemWithHighestProbability;
  }

  filterData(data: any) {
    return metadata.map(
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
