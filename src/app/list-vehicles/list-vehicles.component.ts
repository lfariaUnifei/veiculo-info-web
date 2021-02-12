import { Component, OnInit } from '@angular/core';
import {VehicleService} from "../../shared/services/vehicle.service";
import {VehicleModel} from "../../shared/models/vehicle/vehicle.model";

@Component({
  selector: 'app-list-vehicles',
  templateUrl: './list-vehicles.component.html',
  styleUrls: ['./list-vehicles.component.scss']
})
export class ListVehiclesComponent implements OnInit {
  displayedColumns = [
    'placa',
    'chassi',
    'renavam',
    'modelo',
    'marca',
    'ano',
  ];

  data: VehicleModel[] = [];
  totalCount = 0;

  constructor(public vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.vehicleService.list().subscribe((resp) => {
      this.totalCount = resp.totalCount;
      this.data = resp.data;
      console.log(this.data);
    })
  }

}
