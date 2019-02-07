import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KanjiEditComponent } from './kanji-edit.component';

describe('KanjiEditComponent', () => {
  let component: KanjiEditComponent;
  let fixture: ComponentFixture<KanjiEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KanjiEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KanjiEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
