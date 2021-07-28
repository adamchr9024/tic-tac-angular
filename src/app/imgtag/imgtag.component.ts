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
  countmoves: number = 0
  result: string = "Pending"
  move: string = ""
  awinner: boolean = false

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
    this.countmoves = 0
    this.turn = 'x'
    this.move="Player 1: 'X'"
    this.result="Pending"

  }

  getNewImage(object: { id: number, src: string, clazz: string }) {
    if (object.src !== this.blank || this.move==="Game Over") {
      console.log("image" + object.src + "  clicked")
      return;  //onl allow object to be clicked once

    }
    if (this.turn === 'x') {
      object.src = this.x100;

    }
    else {

      object.src = this.o100;
    }

    this.turn = this.turn === 'x' ? 'o' : 'x';
    ++this.countmoves
    if (this.countmoves >= 5)  //do we have a winner
      {
         
        if(this.winner()||this.countmoves===9)
           return true ;
      }
    if (this.turn === 'o')
      this.computermove()
    return false;
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
  computermove() {
    console.log('computer moved called' + this.turn + this.countmoves)


    let j = 4
    // console.log('computer move called ' + ++countcalls + " themove = " + themove)
    //  let theimages = Array.from(document.getElementsByTagName('img'));
    if (this.countmoves === 1) {
      this.getNewImage(this.imgSrcClass[4])
      return;
    }


    for (let i = 0; i < this.imgSrcClass.length; i++) {
      if (this.imgSrcClass[i].src === this.blank) {
        j = i
        break;
      }
    }
    if (this.turn === 'o') {
      this.getNewImage(this.imgSrcClass[j])
    }


  }
  winner(): boolean {//do we have a winner


    //compare rows i=0, 3, 6
    for (let i = 0; i < this.imgSrcClass.length; i += 3) {
      if (this.imgSrcClass[i].src.toLowerCase().includes("x100") || this.imgSrcClass[i].src.toLowerCase().includes('o100')) {
        if (this.imgSrcClass[i].src === this.imgSrcClass[i + 1].src && this.imgSrcClass[i].src === this.imgSrcClass[i + 2].src) {
          // console.log(this.imgSrcClass[i])
          this.whowon(this.imgSrcClass[i].src);
          this.awinner = true;
          // console.log('before setmove gameover and clear timmer')
          this.move = "Game Over"
          //setmove("Game Over");
          // clearInterval(timer);
          //setTimeout(() => { clearInterval(timer); alert('stop'); }, 5000);
          return true;
        }  //somebody won
      }
    }// rows are done  column index are [0,3, 6] , [1,4,7] [2,5,8] 
    for (let k = 0; k < 3; k += 1) {
      if (this.imgSrcClass[k].src.toLowerCase().includes("x100") || this.imgSrcClass[k].src.toLowerCase().includes('o100')) {
        if (this.imgSrcClass[k].src === this.imgSrcClass[k + 3].src && this.imgSrcClass[k].src === this.imgSrcClass[k + 6].src) {
          this.whowon(this.imgSrcClass[k].src)
          this.awinner = true;

          this.move = "Game Over"

          return true;
        }
      } //
    }
    // diagonals  0, 4 , 8    2 4 6
    if (this.imgSrcClass[4].src.toLowerCase().includes("x100") || this.imgSrcClass[4].src.toLowerCase().includes("o100")) {
      if ((this.imgSrcClass[0].src === this.imgSrcClass[4].src && this.imgSrcClass[0].src === this.imgSrcClass[8].src) ||
        (this.imgSrcClass[2].src === this.imgSrcClass[4].src && this.imgSrcClass[2].src === this.imgSrcClass[6].src)) {
        this.whowon(this.imgSrcClass[4].src);
        this.awinner = true;


        this.move = "Game Over"
        return true;
      }
    }
    if (this.countmoves === 9) {
      this.result = "Draw"

      this.move = "Game Over"
      // clearInterval(timer);
      return false;
    }
    return false
  }// end function winner
  whowon(winnerstring: string) {
    if (winnerstring.toLowerCase().includes('x100'))
      this.result = 'X is the winner';
    else
      this.result = 'O is the winner';
  }
}
