import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import {  Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit ,OnChanges {

  // toggleProBanner(event) {
  //   console.log("123");
  //   event.preventDefault();
  //   document.querySelector('body').classList.toggle('removeProbanner');
  // }
  @Input() login;
  usersobs:any
  userscols :Array<{field:string,header:string}>= [
    { field: 'users_id', header: 'User ID' },
    { field: 'name', header: 'Name' },
    { field: 'phone_number', header: 'Phone Number' },
  ]
  businesscols :Array<{field:string,header:string}>= [
    { field: 'business_id', header: 'Business ID' },
    { field: 'name', header: 'Name' },
    { field: 'sub_name', header: 'Category' },
  ]
  enquirycols :Array<{field:string,header:string}>= [
    { field: 'created_at', header: 'Enquiry Time' },
    { field: 'business_name', header: 'Name' },
    // { field: 'phone_number', header: 'Phone Number' },
  ]
  totalusers:number=0
  totalbusiness:number=0
  totalenquiry:number=0
  dailyusers:number=0
  timer: any;
  fromDate = new Date();
  toDate = new Date();
  type:number = 1;
  // refreshUsers$ =new BehaviorSubject<boolean>(true);
  users$: Observable<any>;
  business$: Observable<any>;
  enquiry$: Observable<any>;
users=[]
  constructor(private apis:ApiService, private router : Router) { }

  // ngOnInit() {
  //   let body = 'data='+'test'+'&date='+Date();
  //   console.log(body);

  //   this.apis.Postwithouttoken(environment["Category"] + "/get_last10users" ,body )
  //   // this.apis.Postwithouttoken(environment["Droptable"]  ,body )

  //   .subscribe(usersdata => {

  //     this.users =(usersdata.status)?  usersdata.data:[]
  //     this.totalusers=usersdata.totalusers
  //     this.dailyusers=usersdata.dailyusers

  //   // console.log(this.users);

  //   })
  // }
  ngOnInit(): void {
    // alert(this.login)




    this.getusers();
    this.getBusiness();
    this.getBusinessEnquiry();
    this.apis.Refreshrequired.subscribe(respone=>{
      this.getusers();
      this.getBusiness();
      this.getBusinessEnquiry();
    });
    // this.timer=setInterval( () => {
    //   this.apis.refresh()
    // }, 3000);
  // this.users$ = this.refreshUsers$.pipe(switchMap(_ => this.getusers()))
  }

  changeType(number){
    this.type = number;
    this.getusers();
    this.getBusiness();
    this.getBusinessEnquiry();
  }


  ngOnChanges(changes: SimpleChanges): void {
    console.log("ngOnChanges");
    console.log(changes);


    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.

  }
  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    console.log("ngDoCheck");

  }
  ngAfterContentInit(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
    console.log("ngAfterContentInit");

  }
  ngAfterContentChecked(): void {
    //Called after every check of the component's or directive's content.
    //Add 'implements AfterContentChecked' to the class.
    console.log("ngAfterContentChecked");

  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    console.log("ngAfterViewInit");

  }
  ngAfterViewChecked(): void {
    //Called after every check of the component's view. Applies to components only.
    //Add 'implements AfterViewChecked' to the class.
    console.log("ngAfterViewChecked");

  }

  subtractMonths(numOfMonths, date) {
    date.setMonth(date.getMonth() - numOfMonths);
    console.log("from");
    console.log(date.setMonth(date.getMonth() - numOfMonths));
    console.log("from");

    return date;
  }


  getusers(){
    var date = new Date()
    var from = this.type == 1?moment(date).format("YYYY-MM-DD"):this.type == 2?moment(new Date(date.getFullYear(), date.getMonth()-1, 1)).format("YYYY-MM-DD"):this.type == 4?moment(this.fromDate).format("YYYY-MM-DD"):'';
    var to = this.type == 1?moment(date).format("YYYY-MM-DD"):this.type == 2?moment(new Date(date.getFullYear(), date.getMonth(), 0)).format("YYYY-MM-DD"):this.type == 4?moment(this.toDate).format("YYYY-MM-DD"):'';
    var filtertype = this.type == 1?'today':this.type == 2?'past month':this.type == 3?'all':'custom';
    let body = 'data='+'test'+'&date='+Date() + '&filtertype=' + filtertype + '&fromdate=' + from+' 00:00:00' + '&todate=' + to+' 23:59:59';
    console.log(body);
    this.usersobs=this.apis.Postwithouttoken(environment["Category"] + "/get_last10users" ,body )
    // this.apis.Postwithouttoken(environment["Droptable"]  ,body )
    .subscribe(usersdata => {

         this.users$ =(usersdata.status)?  usersdata.data:[]
      this.totalusers=usersdata.data.length//.totalusers
      console.log(this.users$);


    }

    // ,
    // error=>{
    //   console.log(error);

    // }
    )

  }

  getBusiness(){
    var date = new Date()
    var from = this.type == 1?moment(date).format("YYYY-MM-DD"):this.type == 2?moment(new Date(date.getFullYear(), date.getMonth()-1, 1)).format("YYYY-MM-DD"):this.type == 4?moment(this.fromDate).format("YYYY-MM-DD"):'';
    var to = this.type == 1?moment(date).format("YYYY-MM-DD"):this.type == 2?moment(new Date(date.getFullYear(), date.getMonth(), 0)).format("YYYY-MM-DD"):this.type == 4?moment(this.toDate).format("YYYY-MM-DD"):'';
    var filtertype = this.type == 1?'today':this.type == 2?'past month':this.type == 3?'all':'custom';
    let body = 'data='+'test'+'&date='+Date() + '&filtertype=' + filtertype + '&fromdate=' + from+' 00:00:00' + '&todate=' + to+' 23:59:59';
    console.log(body);
    this.usersobs=this.apis.Postwithouttoken(environment["Category"] + "/get_last10business" ,body )
    // this.apis.Postwithouttoken(environment["Droptable"]  ,body )

    .subscribe(usersdata => {

         this.business$ =(usersdata.status)?  usersdata.data:[]
      this.totalbusiness=usersdata.data.length//.totalbusiness
      // this.dailyusers=usersdata.dailyusers
      console.log(this.business$);


    }


    // ,
    // error=>{
    //   console.log(error);

    // }
    )
  }

  viewAll(status){
    if(status == 1){
      this.router.navigate(['/users'])
    }
    if(status == 2){
      this.router.navigate(['/business'])
    }
    if(status == 3){
      this.router.navigate(['/businessenqueries'])
    }
    if(status == 4){
      this.router.navigate(['/addbusiness'], { state: { business_id:'new' , data:JSON.stringify({})}})
    }
  }

  onBlurMethodFrom(){
    setTimeout(()=>{
      this.getusers();
      this.getBusiness();
      this.getBusinessEnquiry();
    }, 100);
  }

  onBlurMethodTo( ){
    setTimeout(()=>{
      this.getusers();
      this.getBusiness();
      this.getBusinessEnquiry();
    }, 100);
  }

  getBusinessEnquiry(){
    var date = new Date()
    var from = this.type == 1?moment(date).format("YYYY-MM-DD"):this.type == 2?moment(new Date(date.getFullYear(), date.getMonth()-1, 1)).format("YYYY-MM-DD"):this.type == 4?moment(this.fromDate).format("YYYY-MM-DD"):'';
    var to = this.type == 1?moment(date).format("YYYY-MM-DD"):this.type == 2?moment(new Date(date.getFullYear(), date.getMonth(), 0)).format("YYYY-MM-DD"):this.type == 4?moment(this.toDate).format("YYYY-MM-DD"):'';
    var filtertype = this.type == 1?'today':this.type == 2?'past month':this.type == 3?'all':'custom';
    let body = 'data='+'test'+'&date='+Date() + '&filtertype=' + filtertype + '&fromdate=' + from+' 00:00:00' + '&todate=' + to+' 23:59:59';
    console.log(body);
    this.usersobs=this.apis.Postwithouttoken(environment["Category"] + "/get_last10business_enquiries" ,body )
    // this.apis.Postwithouttoken(environment["Droptable"]  ,body )

    .subscribe(usersdata => {

         this.enquiry$ =(usersdata.status)?  usersdata.data:[]
      this.totalenquiry=usersdata.data.length//.totalbusiness_enquiries
      console.log("enquiry");
      console.log(this.enquiry$);
      console.log("enquiry");


    }


    // ,
    // error=>{
    //   console.log(error);

    // }
    )
  }

  refresh(){
    // this.users ="azar"
    this.users=[{name:"azar"}]

    this.apis.refresh()
    // this.refreshUsers$.next(false)
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    clearInterval(this.timer)
    this.usersobs.unsubscribe()
  }

  // date: Date = new Date();

  // visitSaleChartData = [{
  //   label: 'CHN',
  //   data: [20, 40, 15, 35, 25, 50, 30, 20],
  //   borderWidth: 1,
  //   fill: false,
  // },
  // {
  //   label: 'USA',
  //   data: [40, 30, 20, 10, 50, 15, 35, 40],
  //   borderWidth: 1,
  //   fill: false,
  // },
  // {
  //   label: 'UK',
  //   data: [70, 10, 30, 40, 25, 50, 15, 30],
  //   borderWidth: 1,
  //   fill: false,
  // }];

  // visitSaleChartLabels = ["2013", "2014", "2014", "2015", "2016", "2017"];

  // visitSaleChartOptions = {
  //   responsive: true,
  //   legend: false,
  //   scales: {
  //       yAxes: [{
  //           ticks: {
  //               display: false,
  //               min: 0,
  //               stepSize: 20,
  //               max: 80
  //           },
  //           gridLines: {
  //             drawBorder: false,
  //             color: 'rgba(235,237,242,1)',
  //             zeroLineColor: 'rgba(235,237,242,1)'
  //           }
  //       }],
  //       xAxes: [{
  //           gridLines: {
  //             display:false,
  //             drawBorder: false,
  //             color: 'rgba(0,0,0,1)',
  //             zeroLineColor: 'rgba(235,237,242,1)'
  //           },
  //           ticks: {
  //               padding: 20,
  //               fontColor: "#9c9fa6",
  //               autoSkip: true,
  //           },
  //           categoryPercentage: 0.4,
  //           barPercentage: 0.4
  //       }]
  //     }
  // };

  // visitSaleChartColors = [
  //   {
  //     backgroundColor: [
  //       'rgba(154, 85, 255, 1)',
  //       'rgba(154, 85, 255, 1)',
  //       'rgba(154, 85, 255, 1)',
  //       'rgba(154, 85, 255, 1)',
  //       'rgba(154, 85, 255, 1)',
  //       'rgba(154, 85, 255, 1)',
  //     ],
  //     borderColor: [
  //       'rgba(154, 85, 255, 1)',
  //       'rgba(154, 85, 255, 1)',
  //       'rgba(154, 85, 255, 1)',
  //       'rgba(154, 85, 255, 1)',
  //       'rgba(154, 85, 255, 1)',
  //       'rgba(154, 85, 255, 1)',
  //     ]
  //   },
  //   {
  //     backgroundColor: [
  //       'rgba(254, 112, 150, 1)',
  //       'rgba(254, 112, 150, 1)',
  //       'rgba(254, 112, 150, 1)',
  //       'rgba(254, 112, 150, 1)',
  //       'rgba(254, 112, 150, 1)',
  //       'rgba(254, 112, 150, 1)',
  //     ],
  //     borderColor: [
  //       'rgba(254, 112, 150, 1)',
  //       'rgba(254, 112, 150, 1)',
  //       'rgba(254, 112, 150, 1)',
  //       'rgba(254, 112, 150, 1)',
  //       'rgba(254, 112, 150, 1)',
  //       'rgba(254, 112, 150, 1)',
  //     ]
  //   },
  //   {
  //     backgroundColor: [
  //       'rgba(177, 148, 250, 1)',
  //       'rgba(177, 148, 250, 1)',
  //       'rgba(177, 148, 250, 1)',
  //       'rgba(177, 148, 250, 1)',
  //       'rgba(177, 148, 250, 1)',
  //       'rgba(177, 148, 250, 1)',
  //     ],
  //     borderColor: [
  //       'rgba(177, 148, 250, 1)',
  //       'rgba(177, 148, 250, 1)',
  //       'rgba(177, 148, 250, 1)',
  //       'rgba(177, 148, 250, 1)',
  //       'rgba(177, 148, 250, 1)',
  //       'rgba(177, 148, 250, 1)',
  //     ]
  //   },
  // ];

  // trafficChartData = [
  //   {
  //     data: [30, 30, 40],
  //   }
  // ];

  // trafficChartLabels = ["Search Engines", "Direct Click", "Bookmarks Click"];

  // trafficChartOptions = {
  //   responsive: true,
  //   animation: {
  //     animateScale: true,
  //     animateRotate: true
  //   },
  //   legend: false,
  // };

  // trafficChartColors = [
  //   {
  //     backgroundColor: [
  //       'rgba(177, 148, 250, 1)',
  //       'rgba(254, 112, 150, 1)',
  //       'rgba(132, 217, 210, 1)'
  //     ],
  //     borderColor: [
  //       'rgba(177, 148, 250, .2)',
  //       'rgba(254, 112, 150, .2)',
  //       'rgba(132, 217, 210, .2)'
  //     ]
  //   }
  // ];

}
