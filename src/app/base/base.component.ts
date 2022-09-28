import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';


export class BaseComponent {
  constructor(private spinner: NgxSpinnerService) {

  }

  showSpinner(spinnerTypeName: SpinnerType) {
    this.spinner.show(spinnerTypeName)
    setTimeout(() => this.hideSpinner(spinnerTypeName),2000);
  }
  hideSpinner(spinnerTypeName:SpinnerType){
    this.spinner.hide(spinnerTypeName);
  }
}

export enum SpinnerType {
  BallScalePulse = "s1",
  BallTrianglePath = "s2",
  BallSpinFadeRotating = "s3"
}


