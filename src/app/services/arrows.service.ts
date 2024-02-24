import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArrowsService {
  arrows = {
    'up': '⬆️',
    'right': '➡️',
    'left': '⬅️',
    'down': '⬇️',
    'leftUp': '↖️',
    'rightUp': '↗️',
    'rightDown': '↘️',
    'leftDown': '↙️'
  }
  constructor() { }

  determineArrows(data: number[], answer: number[]){

    if(data[0] > answer[0] && (data[1] - answer[1] === 60 || data[1]-answer[1] === -60)){
      return this.arrows.down
    } else if(data[0] < answer[0] && (data[1] - answer[1] === 60 || data[1]-answer[1] === -60)){
      return this.arrows.up
    } else if(data[1] > answer[1] && (data[0] - answer[0] === 60 || data[0]-answer[0] === -60)){
      return this.arrows.left;
    } else if(data[1] < answer[1] && (data[0] - answer[0] === 60 || data[0]-answer[0] === -60)){
      return this.arrows.right;
    } else if(data[0] > answer[0] && data[1] > answer[1]){
      return this.arrows.leftDown;
    } else if(data[0] < answer[0] && data[1] < answer[1]){
      return this.arrows.rightUp;
    } else if(data[0] > answer[0] && data[1] < answer[1]){
      return this.arrows.rightDown;
    }

      return this.arrows.leftUp;
  }
}
