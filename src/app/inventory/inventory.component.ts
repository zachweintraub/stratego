import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  @Input() color: string;
  constructor() { }

  ngOnInit() {
  }

}
