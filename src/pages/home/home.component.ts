import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl  } from '@angular/forms';
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

  constructor(private _fb: FormBuilder, oracleService: FileUploadService) {
    this.oracleService = oracleService;
    this.requestForm = this._fb.group({
      dna: ['', [Validators.required, this.dnaValidator]],
      uploadFile: []
    });
  }

  ngOnInit() {}

  async createRequest() {
    if (this.selectedFile) {
      this.isLoading = true;
      this.oracleService
        .uploadImage(this.selectedFile)
        .then((url) => {
          this.isLoading = false;
          console.log('URL da imagem:', url);
        });
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  dnaValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const value = control.value ? control.value.toUpperCase().replace(/[^ACGTN]/g, '') : '';
    if (value !== control.value) {
      control.setValue(value);
    }
    return null;
  }
}
