import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-kanji-detail',
  templateUrl: './kanji-detail.component.html',
  styleUrls: ['./kanji-detail.component.css']
})
export class KanjiDetailComponent implements OnInit {

  kanji:any;

  constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.rest.getKanji(this.route.snapshot.params['id']).subscribe((data: {}) => {
      console.log(data);
      this.kanji = data.result.chmn;
    });
  }

}