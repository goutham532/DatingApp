/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserListsComponent } from './UserLists.component';

describe('UserListsComponent', () => {
  let component: UserListsComponent;
  let fixture: ComponentFixture<UserListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserListsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
