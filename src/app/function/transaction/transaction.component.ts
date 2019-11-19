import { OnInit, OnDestroy, Component } from '@angular/core';
import { Transaction } from 'src/app/transaction.model';
import { Subscription } from 'rxjs';
import { profileService } from 'src/app/profile.service';
import { map } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material';

@Component({
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
// tslint:disable-next-line: class-name
export class transactionComponent implements OnInit, OnDestroy {
  transac: Transaction[] = [];
  getAcc: string;
  private postsSub: Subscription;
  displayedColumns: string[] = ['typeT', 'amount', 'accountts', 'Account', 'datetime'];
  dataSource = this.transac;
  listData: MatTableDataSource<any>;

  constructor(public profile: profileService) {}
  ngOnInit() {
    this.getAcc = localStorage.getItem('account');
    this.profile.getTransaction(this.getAcc);
    console.log('acc');
    this.postsSub = this.profile.getPostUpdateListener()
    .subscribe((transac: Transaction[]) => {
      this.transac = transac;
      this.dataSource = this.transac;

    });
  }
//   ngOnInit() {
//     this.getAcc = localStorage.getItem('account');
//     this.profile.getTransaction(this.getAcc).subscribe(
//       list => {
//         let array = list.map(item => {
//           return {
//             ...item.payload.val()
//           };

//         });
//         this.listData = new MatTableDataSource(array);
//       });
//   }

//   // tslint:disable-next-line: member-ordering

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

}

// import {Component} from '@angular/core';

// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];

// /**
//  * @title Basic use of `<table mat-table>`
//  */
// @Component({
//   styleUrls: ['transaction.component.css'],
//   templateUrl: 'transaction.component.html',
// })
// // tslint:disable-next-line: component-class-suffix
// export class TableBasicExample {
//   displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
//   dataSource = ELEMENT_DATA;
// }
