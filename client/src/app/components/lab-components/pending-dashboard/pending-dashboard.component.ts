import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  Inject,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSidenav } from '@angular/material/sidenav';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { DialogApprovalComponent } from '../dialog-approval/dialog-approval.component';
import { OrderService } from 'src/app/services/orders/order.service';
import { Order } from './../../../interfaces/order.interface';
import { ImageInterface } from 'src/app/interfaces/image.interface';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-pending-dashboard',
  templateUrl: './pending-dashboard.component.html',
  styleUrls: ['./pending-dashboard.component.css'],
})
export class PendingDashboardComponent implements AfterViewInit, OnInit {
  orders: any[] = [];
  name: string = '';
  opened: boolean = true;
  displayedColumns: string[] = [
    'order_id',
    'createDate',
    'dispatchDate',
    'orderStatus',
    'instruction',
    'button',
  ];
  dataSource: MatTableDataSource<Order> = new MatTableDataSource(this.orders);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private orderService: OrderService,
    private loading: LoaderService
  ) {
    this.loading.setLoadingMsg('');
    this.loading.setLoading(true);
  }

  openDialog(order: Order): void {
    const dialogRef = this.dialog.open(DialogApprovalComponent, {
      data: order,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit() {
    const orders = this.orderService
      .getOrdersbyStatus('pending')
      .subscribe((response) => {
        // console.log(response);
        this.orders = response;
        this.dataSource = new MatTableDataSource(this.orders);
        this.paginator.length = this.orders.length;
        this.dataSource.paginator = this.paginator;
        this.loading.setLoading(false);
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  sortData(sort: Sort) {
    const data = this.orders.slice();
    if (!sort.active || sort.direction === '') {
      this.orders = data;
      return;
    }
    this.orders = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'order_id':
          return this.compare(a.order_id, b.order_id, isAsc);
        case 'createDate':
          return this.compare(a.createdAt, b.createdAt, isAsc);
        case 'dispatchDate':
          return this.compare(a.createdAt, b.createdAt, isAsc);
        case 'orderStatus':
          return this.compare(a.orderStatus!, b.orderStatus!, isAsc);
        default:
          return 0;
      }
    });
    this.dataSource = new MatTableDataSource(this.orders);
    this.dataSource.paginator = this.paginator;
  }
  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
  handlePageEvent(e: PageEvent) {
    this.dataSource.paginator = this.paginator;
  }
}
