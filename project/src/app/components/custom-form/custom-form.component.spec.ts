import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomFormComponent } from './custom-form.component';

describe('CustomFormComponent', () => {
  let component: CustomFormComponent;
  let fixture: ComponentFixture<CustomFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should has its property isActive', () => {
    expect(component.isActive).toBeFalsy();
  });

  it('should has className=`header__input`', () => {
    expect(component.className).toContain('header__input');
  });

  it('should has toogle placeholder=`Search` to ``', () => {
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    const input = compiled.querySelector('input');
    expect(input.placeholder).toBeDefined();
    component.isActive = false;
    fixture.detectChanges();
    expect(input.placeholder).toEqual('Search');
    component.isActive = true;
    fixture.detectChanges();
    expect(input.placeholder).toEqual('');
  });
});


