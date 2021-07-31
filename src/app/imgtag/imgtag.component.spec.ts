 
import {waitForAsync,ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ImgComponent } from './imgtag.component';
import {FormsModule} from '@angular/forms';
describe('ImgComponent', () => {
   // let component: ImgComponent;
   // let fixture: ComponentFixture<ImgComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule
      ],
      declarations: [
        ImgComponent
      ],
    }).compileComponents();
  });
  it('test get caniwinlose', ()=>{
    const fixture = TestBed.createComponent(ImgComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();      
     const compiled = fixture.nativeElement as HTMLElement;
     //const img = fixture.debugElement.query(By.css('h1'));
     fixture.debugElement.nativeElement.querySelector('.l4').click()
     fixture.detectChanges();
     async ()=>{await app.computermove()}
     fixture.detectChanges();
     //setTimeout(()=>{console.log('test')
     fixture.debugElement.nativeElement.querySelector('.l2').click()
       fixture.detectChanges() 
    //},5000)
      //fixture.debugElement.nativeElement.querySelector('.l0').click()
     //fixture.debugElement.nativeElement.querySelector('.l2').click()
     fixture.detectChanges();
    const obj = {
        id:4,
        src:'../../assets/images/x100.png',
        clazz:'l4'
    }
    const hold = app.canIwinorlose('x')
    expect(hold).toBe(8)
  
} )

  it('should create the app', () => {
    const fixture = TestBed.createComponent(ImgComponent);
    const app = fixture.componentInstance;
    
    expect(app).toBeTruthy();
  });

  it(`should have as result 'Pending'`, () => {
    const fixture = TestBed.createComponent(ImgComponent);
    const app = fixture.componentInstance;
    expect(app.result).toEqual("Pending");
  });

  it('should render result label', () => {
    const fixture = TestBed.createComponent(ImgComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.result')?.textContent).toContain('Game Results:');
  });
  it('should return blank image', ()=>{
    const fixture = TestBed.createComponent(ImgComponent);
    fixture.detectChanges();      
     const compiled = fixture.nativeElement as HTMLElement;
   
    const obj = {
        id:4,
        src:'../../assets/images/blank.png',
       // src:'../../assets/images/x100.png',
        clazz:'l4'
    }
   // app.getNewImage(obj)
    expect(compiled.querySelector('.l4')?.getAttribute('src')).toBe(obj.src)
  } )
  it('should return x image on click', ()=>{
    const fixture = TestBed.createComponent(ImgComponent);
    fixture.detectChanges();      
     const compiled = fixture.nativeElement as HTMLElement;
     //const img = fixture.debugElement.query(By.css('h1'));
     fixture.debugElement.nativeElement.querySelector('.l4').click()
     fixture.detectChanges();
    const obj = {
        id:4,
        //src:'../../assets/images/blank.png',
        src:'../../assets/images/x100.png',
        clazz:'l4'
    }
   // app.getNewImage(obj)
    expect(compiled.querySelector('.l4')?.getAttribute('src')).toBe(obj.src)
    expect(compiled.querySelector('.left')?.textContent).toContain("Next Move: Player 2: 'O' Computer");
} )
});
//https://www.youtube.com/watch?v=sTXM2QdjJ2w

//fdescribe is for focused test....only one test will run
describe('ImgComponent', ()=>{
  it("first test script", ()=>{
      var anum = 11
      expect(anum).toBe(11)
      console.log("tesing first script")
  })

});
