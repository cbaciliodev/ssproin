import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bullet',
  templateUrl: './bullet.component.html',
  styleUrls: ['./bullet.component.css']
})
export class BulletComponent implements OnInit {

  @Input() borderColor = '#00AA00';
  @Input() bgColor = '#00AA00';


  constructor() { }

  ngOnInit() {
  }

}
