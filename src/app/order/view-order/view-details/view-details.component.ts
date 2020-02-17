import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.scss']
})
export class ViewDetailsComponent implements OnInit {

  constructor( public dialogbox: MatDialogRef<ViewDetailsComponent>, @Inject(MAT_DIALOG_DATA) public data: any ) { }

  ngOnInit() {
  }

  onClose() {
    this.dialogbox.close();
  }

}
