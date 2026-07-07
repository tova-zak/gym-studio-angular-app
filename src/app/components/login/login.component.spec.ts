import { TestBed, ComponentFixture } from '@angular/core/testing'; // הוספנו את TestBed ו-ComponentFixture
import { LoginComponent } from './login.component';
import { provideRouter } from '@angular/router';

// הגדרת סביבת הבדיקות
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [provideRouter([])] 
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});