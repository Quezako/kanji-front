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
  mnemonics:string;

  constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.rest.getKanji(this.route.snapshot.params['id']).subscribe((data: {}) => {
      //console.log(data);
      this.kanji = data;
	  this.mnemonics = this.kanji.result.chmn.mnemonics;
	  // TODO: process fake html tags to true html tags.
	  /*
	  hair and beard 彡 hanging in the way while eating with spoons <a c="匕" svg="12a-f"></a>; <img svg="3465a-a"> connects 彡 and  <a c="匕" svg="12a-f"></a>
	  */
    });
  }

}