import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Lookup } from 'src/app/services/lookup.interface';
import { TranslationService } from 'src/app/services/translation.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  constructor(private readonly translationService: TranslationService, private _snackBar: MatSnackBar) {}

  langs: string[] = [];       //List of all language pairs accepted by the API
  sourceLangs: string[] = []; //List for the source languages
  targetLangs: string[] = []; //List for the target languages

  async ngOnInit(): Promise<void> {

    // Get the possible languages accepted by the API
    //This is an array just in case we need to add other API calls in ngOnInit
    const promises: Promise<any>[] = [this.getLangs()];

    await Promise.all(promises);
  }

  async getLangs(): Promise<void> {
    this.langs = await this.translationService.getLangs();
    // Set to remove redundancies
    this.sourceLangs = [...new Set(this.langs.map((l) => l.split('-')[0]))];
    this.targetLangs = [...new Set(this.langs.map((l) => l.split('-')[1]))];
  }

  //Default source language is English
  sourceLang: string = 'en';
  changeSourceLang(value: string) {
    this.sourceLang = value;
  }

  //Default target language is English
  targetLang: string = 'en';
  changeTargetLang(value: string) {
    this.targetLang = value;
  }

  source: string = '';
  translation: string = '';

  lookup!: Lookup;
  reset: Boolean = true;
  async translate(): Promise<void> {
    //The used API does not accept more than word
    if (this.source.includes(' ')) {
      this._snackBar.open('Please enter only 1 word', "Got it");
      return;
    }

    //The API does not accept empty strings
    if (this.source === '') {
      this.translation = '';
      this.lookup={} as Lookup;
      this.reset = true;
      return;
    }

    
    //Call the translation service
    const langConfig = `${this.sourceLang}-${this.targetLang}`;

    // The language translation has to exist otherwise an error is thrown
    if(!this.langs.includes(langConfig)){
      this._snackBar.open('This translation is not possible :(', "Got it");
      return;
    }

    this.reset=false; // This is to make the synonyms card appear

    // API Call for the translation
    this.lookup = await this.translationService.lookup(
      langConfig,
      this.source
    );

    //Sometimes the API acts weird when it's the same language so it's better to have this line
    if (this.sourceLang === this.targetLang) {  
      this.translation = this.source;
    } else {
      this.translation = this.lookup.def[0].tr[0].text;
    }
  }

  // This code snippet has been copied from Stack overflow
  // This is the link
  // https://stackoverflow.com/questions/49102724/angular-5-copy-to-clipboard
  copyText(text: string){
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = text;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}
