import { Component } from '@angular/core';
// @ts-ignore
import * as Papa from 'papaparse';

export interface Response {
  sku: string;
  product: string;
  price: number;
  quantity: number;
  id: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tiger-csv';
  data: Response[] = [];
  public fileToUpload: File;
  
  public displayedColumns: string[] = [
    'index', 'sku', 'product', 'price', 'quantity'
  ];


  attachFileToUpload(data: any) {
      this.fileToUpload = data.target.files[0];
     Papa.parse(this.fileToUpload , {
      download: true,
      header: false,
      complete: (results: any) => {
        results.data.shift();
        results.data.forEach((row: any) => {
          if(row[0]) {
            this.data.push({
              sku: row[0],
              product: row[1],
              price: row[2],
              quantity: row[3],
              id: row[4]
            })
          }
         
        })
      }
     });
     console.log(this.data);
  }

  exportCSV() {
    let csv = Papa.unparse({
     fields: this.displayedColumns,
     data: this.data
     });
     var blob = new Blob([csv]);
     var a = window.document.createElement('a');
     a.href = window.URL.createObjectURL(blob);
     a.download = 'newData.csv';
     document.body.appendChild(a);
     a.click();
     document.body.removeChild(a);
   }
   
}
