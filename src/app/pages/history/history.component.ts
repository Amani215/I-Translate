import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  storageItems: string[] = [];

  constructor() { }

  ngOnInit(): void {
    let key: number = 1;
    let value = localStorage.getItem(key.toString());
    while(value != null){
      this.storageItems.push(value);
      key++;
      value = localStorage.getItem(key.toString());
    }
  }

  clearStorage(){
    localStorage.clear();
    this.storageItems = [];
  }
}
