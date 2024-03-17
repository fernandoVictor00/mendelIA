import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FileUploadService } from '../../services/oracle/oracle.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  requestForm;
  oracleService: FileUploadService;
  selectedFile: File = null!;

  constructor(private _fb: FormBuilder, oracleService: FileUploadService) {
    this.oracleService = oracleService;
    this.requestForm = this._fb.group({
      dna: [''],
      uploadFile: [],
    });
  }

  ngOnInit() {}

  async createRequest() {
    if (this.selectedFile) {
      this.oracleService
        .uploadImage(this.selectedFile)
        .then((url) => {
          console.log('URL da imagem:', url);
        });
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
}
