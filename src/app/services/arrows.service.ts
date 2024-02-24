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

    if(data[0] > answer[0] && (data[1] - answer[1] === 20 || data[1]-answer[1] === -20)){
      return this.arrows.down
    } else if(data[0] < answer[0] && (data[1] - answer[1] === 20 || data[1]-answer[1] === -20)){
      return this.arrows.up
    } else if(data[1] > answer[1] && (data[0] - answer[0] === 20 || data[0]-answer[0] === -20)){
      return this.arrows.left;
    } else if(data[1] < answer[1] && (data[0] - answer[0] === 20 || data[0]-answer[0] === -20)){
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
