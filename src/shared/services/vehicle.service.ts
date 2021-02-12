import {Injectable} from "@angular/core";
import {CreateVehicle, UpdateVehicle, VehicleModel} from "../models/vehicle/vehicle.model";
import {HttpClient} from "@angular/common/http";
import { ResourceList } from "../models/resource-list";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private readonly url = environment.apiUrl + '/vehicle';

  constructor(private http: HttpClient) { }

  create(data: CreateVehicle): Observable<VehicleModel> {
    return this.http.post<VehicleModel>(this.url, data);
  }

  list(max = 10, offset = 0): Observable<ResourceList<VehicleModel>> {
    return this.http.get(this.url, {
      params: {
        max: max.toString(),
        offset: offset.toString(),
      }
    }).pipe(
      map((item: any) => ({
        data: item.vehicles,
        totalCount: item.totalCoumt
      }))
    );
  }

  get(id: string): Observable<VehicleModel> {
    return this.http.get<VehicleModel>(`${this.url}/${id}`);
  }

  update(id: string, data: UpdateVehicle): Observable<void> {
    return this.http.put<void>(`${this.url}/${id}`, data);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
