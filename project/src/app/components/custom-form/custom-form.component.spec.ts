import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EventEmitter } from '@angular/core';

import { CustomFormComponent } from './custom-form.component';
import { By } from '@angular/platform-browser';

describe('CustomFormComponent', () => {
  let component: CustomFormComponent;
  let fixture: ComponentFixture<CustomFormComponent>;
  let debugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomFormComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
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

  it('should toogle placeholder `Search`', () => {
    const input = debugElement.query(By.css('input'));
    expect(input.nativeElement.placeholder).toBeDefined();

    component.isActive = false;
    fixture.detectChanges();
    expect(input.nativeElement.placeholder).toEqual('Search');

    component.isActive = true;
    fixture.detectChanges();
    expect(input.nativeElement.placeholder).toEqual('');
  });

  it('should toogle className `active`', () => {
    const input = debugElement.query(By.css('input'));
    component.isActive = false;
    expect(input.nativeElement.className).not.toContain('active');

    component.isActive = true;
    fixture.detectChanges();
    expect(input.nativeElement.className).toContain('active');
  });

  it('should be called getInputFocus `onFocus` 1 times with event', () => {
    spyOn(component.getInputFocus, 'emit');
    component.onFocus('event');
    expect(component.getInputFocus.emit).toHaveBeenCalledTimes(1);
    expect(component.getInputFocus.emit).toHaveBeenCalledWith('event');
  });

  it('should be called getInputBlur `onBlur` 1 times with event', () => {
    spyOn(component.getInputBlur, 'emit');
    component.onBlur('event');
    expect(component.getInputBlur.emit).toHaveBeenCalledTimes(1);
    expect(component.getInputBlur.emit).toHaveBeenCalledWith('event');
  });

});


