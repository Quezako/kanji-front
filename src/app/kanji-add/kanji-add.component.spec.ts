import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KanjiAddComponent } from './kanji-add.component';

describe('KanjiAddComponent', () => {
  let component: KanjiAddComponent;
  let fixture: ComponentFixture<KanjiAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KanjiAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KanjiAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
