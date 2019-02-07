import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-kanji',
  templateUrl: './kanji.component.html',
  styleUrls: ['./kanji.component.css']
})
export class KanjiComponent implements OnInit {

  kanjis:any = [];

  constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getKanjis();
  }

  getKanjis() {
    this.kanjis = [];
    this.rest.getKanjis().subscribe((data: {}) => {
      console.log(data);
      this.kanjis = data;
    });
  }

  add() {
    this.router.navigate(['/kanji-add']);
  }

  delete(id) {
    this.rest.deleteKanji(id)
      .subscribe(res => {
          this.getKanjis();
        }, (err) => {
          console.log(err);
        }
      );
  }

}