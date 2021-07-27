import { Component, OnInit, ElementRef } from "@angular/core";


@Component({
    selector: 'app-imgtag',
    templateUrl: './imgtag.component.html',
    styleUrls:['./imgtag.component.css']

})
export class ImgComponent implements OnInit{
  blank:string ='../../assets/images/blank.png';
  o100:string = '../../assets/images/O100.png';
  x100:string = '../../assets/images/x100.png';
  srcimg:string = this.blank;
   turn:string = 'x'
  srcimg1:boolean = false;

  imgSrcClass:Array< { id: number, src: string, class:string }> = 
  Array(
    { "id": 0, "src": this.blank, class:'l0' },
    { "id": 1, "src": this.blank, class:'l1' },
    { "id": 2, "src": this.blank, class:'l2' },
    { "id": 3, "src": this.blank, class:'l3' },
    { "id": 4, "src": this.blank, class:'l4' },
    { "id": 5, "src": this.blank, class:'l5' },
    { "id": 6, "src": this.blank, class:'l6' },
    { "id": 7, "src": this.blank, class:'l7' },
    { "id": 8, "src": this.blank, class:'l8' },
  );
  
  getNewImage(object:{ id: number, src: string, class:string }){
      if(this.turn==='x'){
          object.src=this.x100;
        
         }
       else{
        object.src=this.o100;
       }
       this.turn = this.turn==='x'?'o':'x';
      
  }
  ngOnInit(){
   this.srcimg=this.blank;
   this.turn='x'
//    this.imgSrcClass.forEach((element)=>{
//        console.log(element.class)
//        console.log(element.id)
//        console.log(element.src)
//    })
  }
}
