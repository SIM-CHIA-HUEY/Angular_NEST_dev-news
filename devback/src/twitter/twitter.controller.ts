import { Get, Controller, HttpService } from '@nestjs/common';
import { AxiosResponse } from 'axios'
import { map, Observable } from 'rxjs'

  @Controller('twitter')
  export class TwitterController {
    constructor(private readonly http: HttpService) {}
  
    @Get()
    findAll(): Observable<any> {
        let options = {
            headers: {
              'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAABRPYgEAAAAAlOV4kuM%2FjgCCYefBaYPRzY4cu2Y%3DcG8rRj0T4FlQn1eM4yoAgEhTk4ChJ1YOQBXsIrdf0J01UNWqwY',
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json; charset=utf-8"
            }
          }
          return this.http.get('https://api.twitter.com/2/tweets/search/recent?query=coding&tweet.fields=created_at,entities',options).pipe(map(response => response.data));; 
    }
  
  }