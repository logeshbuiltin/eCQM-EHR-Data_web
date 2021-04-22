import { Injectable } from "@angular/core";
import { debounceTime, map } from 'rxjs/operators';
import { environment } from "src/environments/environment";
import { HttpCustomService } from "../service/httpCustomService";


@Injectable()  
export class patientService {

    public apiEndPoint: string =  environment.apiHomeUrl;

    constructor(
        public httpService: HttpCustomService,
    ){}

    searchItem(itemName: any) {
        var patientList = this.httpService.get(this.apiEndPoint+"/api/getPatientBySearch/"+itemName).pipe(
            debounceTime(500),  // WAIT FOR 500 MILISECONDS ATER EACH KEY STROKE.
            map((res: any) =>{
                return (
                    res.length != 0 ? res as any[] : []
                );
            }
        ));

        return patientList;  
    }  
    
}
