import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSubredditsComponent } from './list-subreddits.component';

describe('ListSubredditsComponent', () => {
  let component: ListSubredditsComponent;
  let fixture: ComponentFixture<ListSubredditsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListSubredditsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSubredditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
