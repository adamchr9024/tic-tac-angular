import { Component, OnInit, ElementRef } from "@angular/core";
import { Neighbors } from "../Neighbors";

@Component({
  selector: 'app-imgtag',
  templateUrl: './imgtag.component.html',
  styleUrls: ['./imgtag.component.css']
  //https://www.typescriptlang.org/docs/handbook/2/objects.html
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
  move: string = "Player 1: 'X'"
  awinner: boolean = false
  toggle: boolean = false;


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
    this.toggle = !this.toggle
    // let images = document.getElementsByTagName('img')
    //console.log("images", images
    let i: number = 0;
    for (i = 0; i < 9; i++) {
      this.imgSrcClass[i].src = this.blank;
    }
    this.countmoves = 0
    // console.log(this.turn)
    this.turn = this.toggle ? 'o' : 'x'
    this.move = this.turn === 'o' ? "Computer 'O'" : "Player 1: 'X'"
    this.result = "Pending"
    // console.log('before computer move call')
    if (this.turn === 'o')
      this.computermove()

  }

  getNewImage(object: { id: number, src: string, clazz: string }) {
    if (object.src !== this.blank || this.move === "Game Over") {
      // console.log("image" + object.src + "  clicked")
      return;  //onl allow object to be clicked once

    }
    if (this.turn === 'x') {
      object.src = this.x100;

    }
    else {

      object.src = this.o100;
    }
    this.move = this.turn === 'x' ? "Player 2: 'O' Computer" : "Player 1: 'X'"
    this.turn = this.turn === 'x' ? 'o' : 'x';

    ++this.countmoves
    if (this.countmoves >= 5)  //do we have a winner
    {

      if (this.winner() || this.countmoves === 9)
        return true;
    }
    if (this.turn === 'o')
      this.computermove()
    return false;
  }
  ngOnInit() {
    //this.srcimg = this.blank;
    // this.turn = 'x'
    //    this.imgSrcClass.forEach((element)=>{
    //        console.log(element.clazz)
    //        console.log(element.id)
    //        console.log(element.src)
    //    })
  }
  computermove() {
    //console.log('computer moved called' + this.turn + this.countmoves)
    let winningmove:number = this.canIwinorlose("o") 
    console.log('winning move computer move', winningmove)
    if (winningmove !==-1 && this.turn === 'o'){
      this.makethemove(winningmove)
      //setTimeout(() => this.getNewImage(this.imgSrcClass[winningmove]), 3000)
      return
    }
    winningmove = this.canIwinorlose("x") //dont lose
    if (winningmove !==-1 && this.turn === 'o'){
      this.makethemove(winningmove)
      //setTimeout(() => this.getNewImage(this.imgSrcClass[winningmove]), 3000)
      return
    }

    let j = 4
    // console.log('computer move called ' + ++countcalls + " themove = " + themove)
    //  let theimages = Array.from(document.getElementsByTagName('img'));
    if (this.countmoves < 2 && this.imgSrcClass[j].src === this.blank) {
      this.makethemove(j)
     // setTimeout(() => this.getNewImage(this.imgSrcClass[j]), 3000)
      return;
    }


    for (let i = 0; i < this.imgSrcClass.length; i++) {
      if (this.imgSrcClass[i].src === this.blank) {
        j = i
        break;
      }
    }
    if (this.turn === 'o') {
      this.makethemove(j)
     // setTimeout(() => this.getNewImage(this.imgSrcClass[j]), 3000)
    }


  }
  makethemove(index:number){

    setTimeout(() => this.getNewImage(this.imgSrcClass[index]), 3000)
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
  canIwinorlose(turn: string): number {
    let neighbor1: number = 0;
    let neighbor2: number = 1;
    let index: number = 0;
    let winlose: number = -1
    let neighbors: Neighbors
    let src:string = turn==='x'?this.x100:this.o100

    for (index = 0; index < this.imgSrcClass.length; index+=1) {
      
      if(this.imgSrcClass[index].src !== src)
           continue;
      switch (index) {

        case 0: case 2: case 6: case 4: case 8: {
          neighbors = this.getNeighbor(index, "row") 
          neighbor1 = neighbors.neighbor1
          neighbor2 = neighbors.neighbor2
          winlose = this.possiblewin(turn, neighbor1, neighbor2)
          //console.log("neighbors",neighbors)
          console.log(turn +  ' row winlose=',winlose)
          if (winlose === -1) {
            neighbors = this.getNeighbor(index, "column")
            neighbor1 = neighbors.neighbor1
            neighbor2 = neighbors.neighbor2
            winlose = this.possiblewin(turn, neighbor1, neighbor2)
            //console.log("winlose column")
            // winlose = this.columnwin(turn, index)
          }
          else
            return winlose;
          if (winlose === -1) {
            neighbors = this.getNeighbor(index, "diagonal")
            neighbor1 = neighbors.neighbor1
            neighbor2 = neighbors.neighbor2
            winlose = this.possiblewin(turn, neighbor1, neighbor2)
           // console.log("winlose diagonal ",index)
            //winlose = this.diagonalwin(turn, index)
          }
          else
            return winlose
          break

        }
        case 1: case 3: case 5: case 7: { 
          neighbors = this.getNeighbor(index, "row")
          neighbor1 = neighbors.neighbor1
          neighbor2 = neighbors.neighbor2
          winlose = this.possiblewin(turn, neighbor1, neighbor2)
          if (winlose === -1) {
            neighbors = this.getNeighbor(index, "column")
            neighbor1 = neighbors.neighbor1
            neighbor2 = neighbors.neighbor2
            winlose = this.possiblewin(turn, neighbor1, neighbor2)

            // winlose = this.columnwin(turn, index)
          }
          else
            return winlose;
            break

        }
        default: {
          //statements; 
          break;
        }
      }//end switch
    }//end for
    return winlose // cannot win
  }
  possiblewin(turn: string, neighbor1: number, neighbor2: number): number {
    return this.checkneighborsrow(turn, neighbor1, neighbor2)
  }

  getNeighbor(index: number, rowcoldia: string): Neighbors {
    let neighbors: Neighbors = new Neighbors()
    if (rowcoldia === "row") {
      switch (index) {
        case 0: case 3: case 6: {
          neighbors.neighbor1 = index + 1
          neighbors.neighbor2 = index + 2
          break;
        }
        case 1: case 4: case 7: {
          neighbors.neighbor1 = index - 1
          neighbors.neighbor2 = index + 1
          break;
        }
        case 2: case 5: case 8: {
          neighbors.neighbor1 = index - 2
          neighbors.neighbor2 = index - 1
          break;
        }

        default: {
          break;
        }

      }
      return neighbors;
    }
    if (rowcoldia === "column") {
      switch (index) {
        case 0: case 1: case 2: {
          neighbors.neighbor1 = index + 3
          neighbors.neighbor2 = index + 6
          break;
        }

        case 3: case 4: case 5: {
          neighbors.neighbor1 = index - 3
          neighbors.neighbor2 = index + 3
          break;
        }

        case 6: case 7: case 8: {
          neighbors.neighbor1 = index - 3
          neighbors.neighbor2 = index - 6
          break;
        }
        default: {
          break;
        }

      }
      return neighbors
    }
    if (rowcoldia === "diagonal") {
      switch (index) {
        case 0: {
          neighbors.neighbor1 = 4
          neighbors.neighbor2 = 8
          break;
        }

        case 2: {
          neighbors.neighbor1 = 4
          neighbors.neighbor2 = 6
          break;
        }
        //4 is a special case 
        case 4: {
          neighbors.neighbor1 = 0
          neighbors.neighbor2 = 8
          break;
        }

        case 6: {
          neighbors.neighbor1 = 4
          neighbors.neighbor2 = 2
          break;
        }
        case 8: {
          neighbors.neighbor1 = 4
          neighbors.neighbor2 = 0
          break;
        }
        default: {
          break;
        }

      }
      return neighbors;
    }



    return neighbors;

  }
  checkneighborsrow(turn: string, neighbor1: number, neighbor2: number): number {
    let src = turn === 'x' ? this.x100 : this.o100
    if (this.imgSrcClass[neighbor1].src === src && this.imgSrcClass[neighbor2].src === this.blank)
      return neighbor2;
    if (this.imgSrcClass[neighbor1].src === this.blank && this.imgSrcClass[2].src === src)
      return neighbor1;
    return -1
  }
  columnwin(turn: string, index: number): number {
    let winlose: number = -1
    return winlose
  }
  diagonalwin(turn: string, index: number): number {
    let winlose: number = -1
    return winlose
  }
}

