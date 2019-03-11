import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ngx-pagination',
  templateUrl: './ngx-pagination.component.html',
  styleUrls: ['./ngx-pagination.component.css']
})
export class NgxPaginationComponent implements OnInit {

  @Input() totalItems: number;
  @Input() currentPage: number;
  @Output() pageEvent = new EventEmitter<any>();

  public totalPages: number;
  private limit: number = 10;

  constructor() { }

  ngOnInit() {
    this.calculatePagination();
  }

  private calculatePagination() {
    this.totalItems = this.totalItems < 1 ? 1 : this.totalItems;
    this.totalPages = Math.ceil(this.totalItems / 10);
  }

  public paginate(i) {
    let paginate = { limit: this.limit, page: i + 1 };
    this.pageEvent.emit(paginate);
  }

  public previous() {
    let paginate = { limit: this.limit, page: this.currentPage - 1 };
    this.pageEvent.emit(paginate);
  }

  public next() {
    let paginate = { limit: this.limit, page: this.currentPage + 1 };
    this.pageEvent.emit(paginate);
  }

  get pages(): Array<number> {
    return new Array(this.totalPages);
  }

}
