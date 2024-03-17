import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  requestForm;
  constructor(
    private _fb: FormBuilder,
  ) {
    this.requestForm = this._fb.group({
      dna: [''],
      uploadFile: []
    });
  }

  ngOnInit() {
  }

  createRequest(){
    console.log(this.requestForm.value);
  }

}
