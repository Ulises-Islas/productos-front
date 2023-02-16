import { Component, OnInit } from '@angular/core';
import { Historical } from '../interfaces/historial.interface';
import { HistorialService } from '../services/historial.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.sass']
})
export class HistorialComponent implements OnInit {
  
  historial: Historical[] = [];

  ngOnInit(): void {
    this.service.findHistorical().subscribe(res => {
      this.historial = res;
    });
  }

  constructor(private service: HistorialService) {}

}
