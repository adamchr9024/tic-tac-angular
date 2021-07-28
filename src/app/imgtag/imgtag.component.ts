import { Component, OnInit, ElementRef } from "@angular/core";


@Component({
  selector: 'app-imgtag',
  templateUrl: './imgtag.component.html',
  styleUrls: ['./imgtag.component.css']

})
export class ImgComponent implements OnInit {
  blank: string = '../../assets/images/blank.png';
  o100: string = '../../assets/images/O100.png';
  x100: string = '../../assets/images/x100.png';
  srcimg: string = this.blank;
  turn: string = 'x'
  srcimg1: boolean = false;
  countmoves:number=0
  imgSrcClass: Array<{ id: number, src: string, clazz: string }> =
    Array(
      { "id": 0, "src": this.blank, clazz: 'l0' },
      { "id": 1, "src": this.blank, clazz: 'l1' },
      { "id": 2, "src": this.blank, clazz: 'l2' },
      { "id": 3, "src": this.blank, clazz: 'l3' },
      { "id": 4, "src": this.blank, clazz: 'l4' },
      { "id": 5, "src": this.blank, clazz: 'l5' },
      { "id": 6, "src": this.blank, clazz: 'l6' },
      { "id": 7, "src": this.blank, clazz: 'l7' },
      { "id": 8, "src": this.blank, clazz: 'l8' },
    );
  newgame() {
   // let images = document.getElementsByTagName('img')
    //console.log("images", images
    let i: number = 0;
    for (i = 0; i < 9; i++) {
      this.imgSrcClass[i].src = this.blank;
    }
    this.countmoves=0
    this.turn = 'x'

  }

  getNewImage(object: { id: number, src: string, clazz: string }) {
    if(object.src !==this.blank){
      console.log("image"+object.src+"  clicked")
       return;  //onl allow object to be clicked once
     
    }
    if (this.turn === 'x' ) {
      object.src = this.x100;

    }
    else {
      
        object.src = this.o100;
    }

    this.turn = this.turn === 'x' ? 'o' : 'x';
    ++this.countmoves
    if(this.turn==='o')
      this.computermove()

  }
  ngOnInit() {
    this.srcimg = this.blank;
    this.turn = 'x'
    //    this.imgSrcClass.forEach((element)=>{
    //        console.log(element.clazz)
    //        console.log(element.id)
    //        console.log(element.src)
    //    })
  }
  computermove(){
    console.log('computer moved called'+this.turn+this.countmoves)
   
       
    let j=4
   // console.log('computer move called ' + ++countcalls + " themove = " + themove)
  //  let theimages = Array.from(document.getElementsByTagName('img'));
    if (this.countmoves===1){
      this.getNewImage(this.imgSrcClass[4])
       return;
    }
       
    
    for (let i = 0; i < this.imgSrcClass.length; i++) {
      if (this.imgSrcClass[i].src===this.blank) {
        j= i
             break;
      }
    } 
    if (this.turn === 'o') {
      this.getNewImage(this.imgSrcClass[j])
     }

    
  }
}
