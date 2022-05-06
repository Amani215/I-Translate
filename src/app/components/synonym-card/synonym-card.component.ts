import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Lookup } from 'src/app/services/lookup.interface';

@Component({
  selector: 'app-synonym-card',
  templateUrl: './synonym-card.component.html',
  styleUrls: ['./synonym-card.component.css']
})
export class SynonymCardComponent implements OnInit, OnChanges {
  panelOpenState = false;
  
  @Input() trans: Lookup = {} as Lookup;
  @Input() reset!: Boolean;
  
  constructor() { }

  otherTrans: string[] =[];
  syn: string[] =[];
  examples: string[] = [];
  examplesMeaning: string[] = [];

  ngOnInit(): void {}

  //Detects the changes in the translation
  ngOnChanges(changes: SimpleChanges) {

    //reset the variables otherwise they keep the old values as well
    this.resetVariables();

    //if emptiness is not checked an error would appear in the console
    if(this.reset==false && this.trans){
      console.log(this.trans)

      this.trans.def[0].tr.forEach(t => {
        this.otherTrans?.push(t.text);

        //if there are synonyms
        if(t.syn)
          t.syn.forEach(s=>{
            this.syn.push(s.text);
          })

        //if there are examples
        if(t.ex){
          t.ex.forEach(e=>{
            this.examples.push(e.tr[0].text);
            this.examplesMeaning.push(e.text);
          })

        }
      });
    }
    else{
      this.resetVariables();
      this.trans = {} as Lookup;
    }
  }

  resetVariables(){
    this.otherTrans = [];
    this.syn = [];
    this.examples = [];
    this.examplesMeaning = [];
  }
}
