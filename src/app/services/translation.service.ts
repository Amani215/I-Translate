import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Config } from './config.interface';
import { Lookup } from './lookup.interface';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  constructor(private readonly http: HttpClient) {}

  // Directory where the apiKey and the base URL are defined
  private readonly configURL = 'assets/config.json';

  // Get the API configuration in a more readable form
  async getConfig(): Promise<Config> {
    return lastValueFrom(this.http.get<Config>(this.configURL));
  }

  async getLangs(): Promise<string[]> {
    // First get the API configuration
    const config: Config = await this.getConfig();

    const endpoint = '/getLangs';
    const url = `${config.translateAPI.baseURL}${endpoint}`;
    
    return new Promise((resolve): void => {
      //http request to the defined url with the necessary parameters
      this.http
        .get<string[]>(url, {
          params: {
            key: config.translateAPI.apiKey,  //add the key as a parameter of the http request
          },
          responseType: 'json',
          observe: 'body',
        })
        .subscribe((obj) => resolve(obj));
    });
  }

  async lookup(lang: string, text: string):Promise<Lookup>{
    // First get the API configuration
    const config: Config = await this.getConfig();

    const endpoint = '/lookup';
    const url = `${config.translateAPI.baseURL}${endpoint}`;

    return new Promise((resolve, reject) => {
      //This http request also needs the chosen language pair and the text to translate
      //This is defined in the API documentation
      this.http
        .get<Lookup>(url, {
          params: {
            key: config.translateAPI.apiKey,
            lang: lang,
            text: text
          },
          responseType: 'json',
          observe: 'body',
        })
        .subscribe((obj) => resolve(obj));
    });
  }
}
