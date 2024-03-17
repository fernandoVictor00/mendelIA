import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FileUploadService } from '../../services/oracle/oracle.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isLoading = false;
  requestForm;
  oracleService: FileUploadService;
  selectedFile: File = null!;
  selectedFileName: string = '';

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
      this.isLoading = true;
      this.oracleService.uploadFileFirebase(this.selectedFile).then((url) => {
        this.isLoading = false;
        this.selectedFileName = 'Selecione o arquivo';
        this.selectedFile = null!;
        console.log('URL do arquivo:', url);
      });
    }
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const file = target.files[0];
      const fileExtension = file.name.split('.').pop();
      if (fileExtension !== 'gz') {
        alert('Por favor, selecione um arquivo .gz');
      } else {
        this.selectedFile = file;
        this.selectedFileName = file.name;
      }
    }
  }
}
