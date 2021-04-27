import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';
import { HttpCustomService } from '../service/httpCustomService';
import { patientService } from './patientService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [patientService]
})
export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChild('picker') picker: any;
  @ViewChild('picker2') picker2: any;
  @ViewChild('picker3') picker3: any;
  @ViewChild('picker4') picker4: any;
  @ViewChild('picker5') picker5: any;
  @ViewChild('picker6') picker6: any;
  @ViewChild('picker7') picker7: any;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  dataSourceLab = new MatTableDataSource<any>();
  dataSourceVaccine = new MatTableDataSource<any>();
  dataSourceScreen = new MatTableDataSource<any>();
  dataSourceVital = new MatTableDataSource<any>();

  dataSourceEncounter = new MatTableDataSource<any>();
  dataSourceDiag = new MatTableDataSource<any>();

  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');

  patientSearch: any;

  //Field name
  pName: string = "";
  pAge: any;
  pGender: any;
  pMrno: string = "";

  //lab field name
  labValue: any = "";
  labDiaType: any = "";
  labRemarks: any  = "";

  //vaccine field name
  vaccineName: any = "";
  pVaccine: any = "";
  vaccineRemarks: any = "";

  //screen fields
  screenName: any = "";
  screenValue: any = "";
  screenRemarks: any = ""

  //vitals
  temperature: any = "";
  heightFeet: any = "";
  heightInch: any = ""
  respiration: any = "";
  pulseOximetry: any = "";
  weight: any = "";
  systolic: any = "";
  diastolic: any = "";
  painScore: any = "";
  fetalHeartRate: any = "";
  vitalRemarks: any = "";

  //encounter
  encReason: any  = "";
  encDate: any = new Date();
  encDoctor: any = "";

  //diagnosis
  diagName: any = "";
  diagValue: any = "";
  diagRemarks: any = "";
  dEntryDate: Date = new Date();

  //spinner
  resourcesLoaded: boolean = false;

  valueType: any = "";

  encDataList: any[] = [];

  patientDetails: any[] = [];

  public apiEndPoint: string =  environment.apiHomeUrl;

  displayedColumns: string[] = ['labName', 'labValue', 'creationDate', 'labRemarks'];
  displayedColumns2: string[] = ['vaccineName', 'pVaccine', 'creationDate', 'remarks'];
  displayedColumns3: string[] = ['screenName', 'screenValue', 'creationDate', 'screenRemarks'];
  displayedColumns4: string[] = ['vitalName', 'vitalValue', 'creationDate', 'vitalRemarks'];

  displayedColumnsEnc: string[] = ["encReason", "encDate", "encDoctor"];

  displayedColumnsDiag: string[] = ["diagName", "diagDate", "creationDate","diagRemarks"];

  genderList: any[] = [
    {value: "male", view: "Male"},
    {value: "female", view: "Female"},
    {value: "other", view: "Other"}
  ];

  encounterList: any[] = [
    {value: "1st  Clinic Visit", view: "1st  Clinic Visit"},
    {value: "Follow Up Visit", view: "Follow Up Visit"},
    {value: "ED Visit", view: "ED Visit"}
  ];

  diagnosis: any[] = [
    {value: "Type 2 Diabetes Mellitus  - E11.9", view: "Type 2 Diabetes Mellitus  - E11.9"},
    {value: "Essential (primary) hypertension -  I10", view: "Essential (primary) hypertension -  I10"},
    {value: "Haemorrhagic Stroke - I61.9", view: "Haemorrhagic Stroke - I61.9"},
    {value: "Acute Ischemic Stroke - I63", view: "Acute Ischemic Stroke - I63"}
  ];

  labList: any[] = [
    {value: "HbA1c", view: "HbA1c", type: "%"},
    {value: "RBS", view: "RBS", type: "mmol/L"},
    {value: "PPBS", view: "PPBS", type: "mmol/L"},
    {value: "FBS", view: "FBS", type: "mmol/L"},
    {value: "Fecal occult blood test (FOBT)", view: "Fecal occult blood test (FOBT)", type: ""},
    {value: "FIT-DNA", view: "FIT-DNA", type: ""}
  ];

  vaccineList: any[] = [
    {value: "Influenza", view: "Influenza Vaccination"},
    {value: "Pneumococcal", view: "Pneumococcal Vaccination"},
  ];

  screenList: any[] = [
    {value: "Breast Cancer Screening", view: "Breast Cancer Screening"},
    {value: "Colorectal Cancer Screening", view: "Colorectal Cancer Screening"},
    {value: "Falls: Risk Assessment", view: "Falls: Risk Assessment"},
    {value: "Falls: Plan of Care", view: "Falls: Plan of Care"},
    {value: "Venous Thromboembolism Prophylaxis", view: "Venous Thromboembolism Prophylaxis"},
  ];

  conditionInput: any[] = [
    {value: "yes", view: "Yes"},
    {value: "no", view: "No"}
  ];

  painScoreList: any[] = [
    {value: "0", view: "0"},
    {value: "2", view: "2"},
    {value: "4", view: "4"},
    {value: "6", view: "6"},
    {value: "8", view: "8"},
    {value: "10", view: "10"},
  ];

  doctorList: any[] = [
    {value: "doc1", view: "Dr. Suzanne Holroyd"},
    {value: "doc2", view: "Dr. Stacey E. Mills"},
    {value: "doc3", view: "Dr. Paula M. Fracasso"},
    {value: "doc4", view: "Dr. Bruce Bateman"},
    {value: "doc5", view: "Dr. Stacey E. Mills"},
    {value: "doc6", view: "Dr. David R. Jones"},
    {value: "doc7", view: "Dr. George A. Beller"},
    {value: "doc7", view: "Dr. Mark D. Okusa"},
  ];

  patientName: string = "";
  patientMrn: string = "";
  patientId: any = "";

  vCreationDate: any = new Date();
  sCreationDate: any = new Date();
  lCreationDate: any = new Date();
  viCreationDate: any = new Date();
  dCreationDate: any = new Date();

  formPatient = this.formBuilder.group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
    pName: new FormControl({ Value: this.pName }),
    pAge: new FormControl({  }),
    pGender: new FormControl({ }),
    pMrno: new FormControl({ Value: this.pMrno }),
  });

  formEncounter = this.formBuilder.group({
    encReason: new FormControl({ Value: this.encReason }),
    encDate: new FormControl({ Value: this.encDate }),
    encDoctor: new FormControl({ Value: this.encDoctor }),
  });

  formLab = this.formBuilder.group({
    labValue: new FormControl({ Value: this.labValue }),
    labDiaType: new FormControl({  }),
    labRemarks: new FormControl({  }),
    lCreationDate: new FormControl({  }),
  });

  formVaccine = this.formBuilder.group({
    vaccineName: new FormControl({  }),
    pVaccine: new FormControl({  }),
    vaccineRemarks: new FormControl({  }),
    vCreationDate: new FormControl({  }),
  });

  formDiag = this.formBuilder.group({
    diagName: new FormControl({  }),
    //diagValue: new FormControl({  }),
    diagRemarks: new FormControl({  }),
    dCreationDate: new FormControl({  }),
    dEntryDate: new FormControl({  }),
  });

  formScreening = this.formBuilder.group({
    screenName: new FormControl({  }),
    screenValue: new FormControl({  }),
    sCreationDate: new FormControl({  }),
    screenRemarks: new FormControl({  }),
  });

  formVital = this.formBuilder.group({
    temperature: new FormControl({  }),
    heightFeet: new FormControl({  }),
    heightInch: new FormControl({  }),
    respiration: new FormControl({  }),
    pulseOximetry: new FormControl({  }),
    weight: new FormControl({  }),
    systolic: new FormControl({  }),
    diastolic: new FormControl({  }),
    painScore: new FormControl({  }),
    fetalHeartRate: new FormControl({  }),
    viCreationDate: new FormControl({  }),
    vitalRemarks: new FormControl({  })
  });

  constructor(
    public formBuilder: FormBuilder,
    public httpService: HttpCustomService,
    public snackBar: MatSnackBar,
    private searchService: patientService,
    //private spinnerService: Ng4LoadingSpinnerService
  ) { }

  ngAfterViewInit(): void {
    this.dataSourceLab.paginator = this.paginator;
    this.dataSourceVaccine.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.clearPatientData();
  }

  tabClick(tabEvent: any) {
    if(tabEvent.index == 0) {

    } else if (tabEvent.index == 1) {
      this.dataSourceVital.data = [];
      this.getVitalList();
    } else if (tabEvent.index == 2) {
      this.dataSourceDiag.data = [];
      this.getDiagList();
    } else if (tabEvent.index == 3) {
      this.dataSourceLab.data = [];
      this.getLabList();
    } else if (tabEvent.index == 4) {
      this.dataSourceVaccine.data = [];
      this.getVaccineList();
    } else if (tabEvent.index == 5) {
      this.dataSourceVital.data = [];
      this.getVitalList();
    }
  }

  getVitalList() {
    if(this.patientId == "") {
      this.snackBar.open("Warning", "Select patient to view complete list.", {duration: 2000});
    } else {
      this.httpService.get(this.apiEndPoint+"/api/getallVitalsById/"+this.patientId).subscribe((res: any) =>{
        if(res.length > 0) {
          this.updateVitalTable(res);
        } else {
          this.snackBar.open("Warning", "No list found for the patient.", {duration: 3000});
        }
      }, error =>{
        this.snackBar.open("Error", "Something went wrong.", {duration: 3000});
      });
    }
  }

  updateVitalTable(res: any) {
    let vitalList: any[] = this.dataSourceVital.data;
    res.forEach((element: any) => {
    let screenData = {
      creationDate: new Date(element.createdDate),
      vitalName: element.vitalName,
      vitalValue: element.bpMeasure?  element.bpMeasure: element. vitalValue,
      vitalRemarks: element.remarks
    };
    vitalList.push(screenData);
  });
  this.dataSourceVital = new MatTableDataSource<any>(vitalList);
  }

  getScreeningList() {
    if(this.patientId == "") {
      this.snackBar.open("Warning", "Select patient to view complete list.", {duration: 2000});
    } else {
      this.httpService.get(this.apiEndPoint+"/api/getallScreenById/"+this.patientId).subscribe((res: any) =>{
        if(res.length > 0) {
          this.updateScreenTable(res);
        } else {
          this.snackBar.open("Warning", "No list found for the patient.", {duration: 3000});
        }
      }, error =>{
        this.snackBar.open("Error", "Something went wrong.", {duration: 3000});
      });
    }
  }

  updateScreenTable(res: any) {
    let screenList: any[] = this.dataSourceScreen.data;
    res.forEach((element: any) => {
    let screenData = {
      creationDate: new Date(element.creationDate)? new Date(element.creationDate): new Date(element.createdDate),
      patientMrn: element.pMrno,
      screenName: element.screenName,
      riskAssess: element.riskAssess,
      Mammogram: element.mammogram,
      fCPDocu: element.fullCarePlanDocu
    };
    screenList.push(screenData);
  });
  this.dataSourceScreen = new MatTableDataSource<any>(screenList);
  }

  getVaccineList() {
    if(this.patientId == "") {
      this.snackBar.open("Warning", "Select patient to view complete list.", {duration: 2000});
    } else {
      this.httpService.get(this.apiEndPoint+"/api/getallVaccineById/"+this.patientId).subscribe((res: any) =>{
        if(res.length > 0) {
          this.updateVaccineTable(res);
        } else {
          this.snackBar.open("Warning", "No list found for the patient.", {duration: 3000});
        }
      }, error =>{
        this.snackBar.open("Error", "Something went wrong.", {duration: 3000});
      });
    }
  }

  updateVaccineTable(res: any) {
    let vaccineList: any[] = this.dataSourceVaccine.data;
    res.forEach((element: any) => {
    let VaccineData = {
      creationDate: new Date(element.creationDate)? new Date(element.creationDate): new Date(element.createdDate),
      patientMrn: element.pMrno,
      vaccineName: element.vaccineName,
      pVaccine: element.vaccineValue,
      remarks: element.remarks
    };
    vaccineList.push(VaccineData);
  });
  this.dataSourceVaccine = new MatTableDataSource<any>(vaccineList);
  }

  getLabList() {
    if(this.patientId == "") {
      this.snackBar.open("Warning", "Select patient to view complete list.", {duration: 2000});
    } else {
      this.httpService.get(this.apiEndPoint+"/api/getallByType/"+this.patientId+"/"+"Lab").subscribe((res: any) =>{
        if(res.length > 0) {
          this.updateLabTable(res);
        } else {
          this.snackBar.open("Warning", "No list found for the patient.", {duration: 3000});
        }
      }, error =>{
        this.snackBar.open("Error", "Something went wrong.", {duration: 3000});
      });
    }
  }

  updateLabTable(res: any) {
    let labList: any[] = this.dataSourceLab.data;
    res.forEach((element: any) => {
      let labData = {
        creationDate: new Date(element.createdDate),
        patientMrn: element.pMrno,
        labValue: element.dEntryDate? element.dEntryDate: element.diagValue,
        labName: element.diagName,
        labRemarks: element.remarks
      };
      labList.push(labData);
    });
    this.dataSourceLab = new MatTableDataSource<any>(labList);
  }

  getDiagList() {
    if(this.patientId == "") {
      this.snackBar.open("Warning", "Select patient to view complete list.", {duration: 2000});
    } else {
      this.httpService.get(this.apiEndPoint+"/api/getallByType/"+this.patientId+"/"+"Diag").subscribe((res: any) =>{
        if(res.length > 0) {
          this.updateDiagTable(res);
        } else {
          this.snackBar.open("Warning", "No list found for the patient.", {duration: 3000});
        }
      }, error =>{
        this.snackBar.open("Error", "Something went wrong.", {duration: 3000});
      });
    }
  }

  updateDiagTable(res: any) {
    let diagList: any[] = this.dataSourceDiag.data;
    res.forEach((element: any) => {
      let diagData = {
        creationDate: new Date(element.createdDate),
        patientMrn: element.pMrno,
        diagName: element.diagName,
        diagDate: new Date(element.diagValue),
        diagRemarks: element.remarks
      };
      diagList.push(diagData);
    });
    this.dataSourceDiag = new MatTableDataSource<any>(diagList);
  }

  clearPatientData() {
    this.pName = "";
    this.pMrno = "";
    this.pAge = "";
    this.pGender = null;
  }

  searchText(event: any) {
    if (event.length && event.length > 2) {
      this.searchService.searchItem(event).subscribe(
        data => {
          data.forEach(element => {
            element['patientData'] = "Name: "+element.patientName +" | MRN: "+ element.pMrno;
          });
          this.patientDetails = data as any[];
          //console.log(data[0].BookName);
      })
    }
  }

  selectPatient(event: any) {
    let selectedPatient = this.patientDetails.find(p => p.patientData == event.option.value);
    if(selectedPatient) {
      this.patientId = selectedPatient.patientId;
      this.patientMrn = selectedPatient.pMrno;
      this.patientName = selectedPatient.patientName;
    }
  }

  selectLabType(event: any) {
    let selectedLab = this.labList.find(p => p.value == event.value);
    if(selectedLab) {
      this.valueType = selectedLab.type;
    }
  }

  calculateBMI() {
    if((this.heightFeet || this.heightInch) && this.weight) {
      let convertedHeight = (this.heightFeet*12)+this.heightInch;
      let bmi=(((this.weight/2.2046)/Math.pow(convertedHeight,2))*703),globalBMI=bmi;
      this.fetalHeartRate = bmi.toFixed(2);
    }
  }

  addEncounterDetails() {
    let payload = {
      encReason: this.encReason,
      encDate: this.encDate,
      encDoctor: this.encDoctor
    };
    this.encDataList.push(payload);
    this.dataSourceEncounter = new MatTableDataSource<any>(this.encDataList);
  }

  addPatientData() {
    if(this.formPatient.invalid) {
      this.snackBar.open("Warning", "Enter all the required fields.", {duration: 3000});
    } else {
      const epochToday = (new Date).getTime();
      let payload = {
        "patientName": this.pName,
        "pMrno": this.pMrno,
        "pGender": this.pGender,
        "pAge": this.pAge,
        "createdDate": epochToday,
        "pStatus": "active"
      };
      this.resourcesLoaded = true;
      //this.spinnerService.show();
      //setTimeout(()=>this.spinnerService.hide(),5000)
      this.httpService.post(this.apiEndPoint+"/api/addPatient", payload).subscribe((res: any) =>{
        this.resourcesLoaded = false;
        //this.spinnerService.hide();
        if(res.patientId) {
          this.snackBar.open("Success", "Patient has been added to DataBase.", {duration: 3000});
          this.patientId = res.patientId;
          this.patientMrn = this.pMrno;
          this.patientName = this.pName;
          this.clearPatientData();
        } else {
          this.snackBar.open("Error", "Can not add patient to DataBase.", {duration: 3000});
        }
      }, error =>{
        //this.spinnerService.hide();
        this.snackBar.open("Error", "Can not add patient to DataBase.", {duration: 3000});
      });
    }
  }

  addLabData() {
    if(this.formLab.invalid) {
      this.snackBar.open("Warning", "Enter all the required fields.", {duration: 3000});
    } else {
      if(this.patientId == "") {
        this.snackBar.open("Error", "Select patient before submit.", {duration: 3000});
      } else {
        let payloadList: any[] = [];
        const epochToday = (new Date(this.lCreationDate)).getTime();
        let payload = this.getDiagPayload(epochToday, this.labValue, this.labDiaType, this.labRemarks, "Lab");
        payloadList.push(payload);
        this.updateLabTable(payloadList);
        this.httpService.post(this.apiEndPoint+"/api/addLab/"+this.patientId, payloadList).subscribe((res: any) =>{
          if(res.status == true) {
            this.snackBar.open("Success", "Data has been added successfully.", {duration: 3000});
            //this.updateLabTable(payloadList);
            //this.getLabList();
          } else {
            this.snackBar.open("Error", "Can not add patient to DataBase.", {duration: 3000});
          }
        }, error =>{
          this.snackBar.open("Error", "Can not add patient to DataBase.", {duration: 3000});
        });
      }
    }
  }

  addDiagData() {
    if(this.formLab.invalid) {
      this.snackBar.open("Warning", "Enter all the required fields.", {duration: 3000});
    } else {
      if(this.patientId == "") {
        this.snackBar.open("Error", "Select patient before submit.", {duration: 3000});
      } else {
        let payloadList: any[] = [];
        const epochToday = (new Date(this.lCreationDate)).getTime();
        let payload = this.getDiagPayload(epochToday, new Date(this.dEntryDate), this.diagName, this.diagRemarks, "Diag");
        payloadList.push(payload);
        this.updateDiagTable(payloadList);
        this.httpService.post(this.apiEndPoint+"/api/addLab/"+this.patientId, payloadList).subscribe((res: any) =>{
          if(res.status == true) {
            this.snackBar.open("Success", "Data has been added successfully.", {duration: 3000});
            //this.getDiagList();
          } else {
            this.snackBar.open("Error", "Can not add patient to DataBase.", {duration: 3000});
          }
        }, error =>{
          this.snackBar.open("Error", "Can not add patient to DataBase.", {duration: 3000});
        });
      }
    }
  }

  getDiagPayload(epochToday: any, diagValue: any, diagDiaType: any, diagRemarks: any, diagType: any) {
    return {
      "pMrno": this.patientMrn,
      "createdDate": epochToday,
      "diagValue": diagValue,
      "diagName": diagDiaType,
      "remarks": diagRemarks,
      "dataType": diagType
    }
  }

  addVaccineData() {
    if(this.formVaccine.invalid) {
      this.snackBar.open("Warning", "Enter all the required fields.", {duration: 3000});
    } else {
      if(this.patientId == "") {
        this.snackBar.open("Error", "Select patient before submit.", {duration: 3000});
      } else {
        let payloadList: any[] = [];
        const epochToday = (new Date(this.vCreationDate)).getTime();
        let payload = {
          "pMrno": this.patientMrn,
          "createdDate": epochToday,
          "vaccineValue": this.pVaccine,
          "vaccineName": this.vaccineName,
          "remarks": this.vaccineRemarks
        };
        payloadList.push(payload);
        this.updateVaccineTable(payloadList);
        this.httpService.post(this.apiEndPoint+"/api/addVaccine/"+this.patientId, payloadList).subscribe((res: any) =>{
          if(res.status == true) {
            this.snackBar.open("Success", "Data has been added successfully.", {duration: 3000});
            //this.getVaccineList();
          } else {
            this.snackBar.open("Error", "Can not add patient to DataBase.", {duration: 3000});
          }
        }, error =>{
          this.snackBar.open("Error", "Can not add patient to DataBase.", {duration: 3000});
        });
      }
    }
  }

  addScreenData() {
    if(this.formScreening.invalid) {
      this.snackBar.open("Warning", "Enter all the required fields.", {duration: 3000});
    } else {
      if(this.patientId == "") {
        this.snackBar.open("Error", "Select patient before submit.", {duration: 3000});
      } else {
        let payloadList: any[] = [];
        const epochToday = (new Date(this.sCreationDate)).getTime();
        let payload = {
          "pMrno": this.patientMrn,
          "createdDate": epochToday,
          "screenValue": this.screenValue,
          "screenName": this.screenName,
          "remarks": this.screenRemarks
        };
        payloadList.push(payload);
        this.updateScreenTable(payloadList);
        this.httpService.post(this.apiEndPoint+"/api/addScreening/"+this.patientId, payloadList).subscribe((res: any) =>{
          if(res.status == true) {
            this.snackBar.open("Success", "Data has been added successfully.", {duration: 3000});
            //this.getScreeningList();
          }
        }, error =>{
          this.snackBar.open("Error", "Can not add patient to DataBase.", {duration: 3000});
        });
      }
    }
  }

  addVitalData() {
    if(this.formScreening.invalid) {
      this.snackBar.open("Warning", "Enter all the required fields.", {duration: 3000});
    } else {
      if(this.patientId == "") {
        this.snackBar.open("Error", "Select patient before submit.", {duration: 3000});
      } else {
        let payloadList: any[] = [];
        const epochToday = (new Date(this.sCreationDate)).getTime();
        if(this.temperature) {
          this.vitalPayload("Temperature", this.temperature, epochToday, payloadList);
        } 
        if(this.heightInch || this.heightFeet) {
          this.vitalPayload("Height", (this.heightFeet+"."+this.heightInch), epochToday, payloadList);
        }
        if(this.respiration) {
          this.vitalPayload("Respiration", this.respiration, epochToday, payloadList);
        }
        if(this.pulseOximetry) {
          this.vitalPayload("Pulse Oximetry", this.pulseOximetry, epochToday, payloadList);
        }
        if(this.weight) {
          this.vitalPayload("Weight", this.weight, epochToday, payloadList);
        }
        if(this.systolic) {
          this.vitalPayload("Systolic", this.systolic, epochToday, payloadList);
        }
        if(this.diastolic) {
          this.vitalPayload("Diastolic", this.diastolic, epochToday, payloadList);
        }
        if(this.painScore) {
          this.vitalPayload("Pain Score", this.painScore, epochToday, payloadList);
        }
        this.updateVitalTable(payloadList);
        this.httpService.post(this.apiEndPoint+"/api/addVital/"+this.patientId, payloadList).subscribe((res: any) =>{
          if(res.status == true) {
            this.snackBar.open("Success", "Data has been added successfully.", {duration: 3000});
            //this.getVitalList();
          }
        }, error =>{
          this.snackBar.open("Error", "Can not add patient to DataBase.", {duration: 3000});
        });
      }
    }
  }

  vitalPayload(dataType: string, dataValue: any, epochToday: any, payloadList: any[]) {
    let payload = {
      "pMrno": this.patientMrn,
      "createdDate": epochToday,
      "vitalValue": dataValue,
      "vitalName": dataType,
      "remarks": this.vitalRemarks
    }
    payloadList.push(payload);
  }

}