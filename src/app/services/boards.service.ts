import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Board } from '../models/board';

@Injectable({
  providedIn: 'root'
})
export class BoardsService {

  constructor(private http: HttpClient) { }

  getBoards() {
    return this.http.get<any>('assets/demo/data/boards.json')
        .toPromise()
        .then(res => res.data as Board[])
        .then(data => data);
  }
}
