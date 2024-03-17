import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { FileUploadService } from '../../services/oracle/oracle.service';
import { Router } from '@angular/router';

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

  constructor(
    private _fb: FormBuilder,
    oracleService: FileUploadService,
    private router: Router
  ) {
    this.oracleService = oracleService;
    this.requestForm = this._fb.group({
      dna: ['', [Validators.minLength(5), this.dnaValidator]],
      nome: ['', Validators.required],
      uploadFile: [],
    });
  }

  ngOnInit() {}

  async createRequest() {
    if (!this.requestForm.value.nome) {
      alert('A sua amostra precisa de um nome');
      return;
    }
    if (this.selectedFile) {
      this.isLoading = true;
      this.oracleService.uploadFileFirebase(this.selectedFile).then((url) => {
        this.isLoading = false;
        this.selectedFileName = 'Selecione o arquivo';
        this.selectedFile = null!;
        const name = this.requestForm.value.nome
          ? this.requestForm.value.nome
          : '';
        this.showDashboard(true, url, '', name);
      });
    } else if (this.requestForm.value.dna) {
      const name = this.requestForm.value.nome
        ? this.requestForm.value.nome
        : '';
      const dna = this.requestForm.value.dna ? this.requestForm.value.dna : '';
      this.showDashboard(true, '', dna, name);
    }
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const file = target.files[0];
      const fileExtension = file.name.split('.').pop();
      if (fileExtension !== 'fastq') {
        alert('Por favor, selecione um arquivo .fastq');
      } else {
        this.selectedFile = file;
        this.selectedFileName = file.name;
      }
    }
  }

  showDashboard(
    isUpload: boolean = false,
    urlImage: string = '',
    dna: string = '',
    name: string = ''
  ) {
    let url = 'http://localhost:4200/dashboard';
    url += `?isUpload=${isUpload}&urlImage=${encodeURIComponent(
      urlImage
    )}&dna=${encodeURIComponent(dna)}&name=${encodeURIComponent(name)}`;
    window.open(url, '_blank');
  }

  dnaValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const value = control.value
      ? control.value.toUpperCase().replace(/[^ACGT]/g, '')
      : '';
    if (value !== control.value) {
      control.setValue(value);
    }
    return null;
  }
}
