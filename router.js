import * as acts from './acts.js'

const ROUTE=document.querySelector('#route')

function pick(items){//https://stackoverflow.com/a/5915122
  return items[Math.floor(Math.random() * items.length)];
}

function roll(min, max) {//https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}


function round(level){
  return level<10?level:Math.round(level/10)*10
}

class Route{
  constructor(){
    this.milestones={//TODO should be easy enough to have 1 milestone = 1 act, no act 1 while leveling!
      1:['Aspirant','','Crucible'], //crucible
      20:false, //normal - or elite from get-go?
      30:false, 
      40:false,
      50:false, //elite
      60:false,
      70:['Ultimate','Act 1','Main quest'], //act 1 ultimate
      100:['Ultimate','Act 7','Shattered Realm'],
    }
  }
  
  get last(){return this.acts.length>0&&this.acts[this.acts.length-1][1]} //last act
  
  //TODO can try using levels from wiki instead
  generate(){
    let pool=new Set([2,3,4,5,6,7])
    for(let level=20;level<=60;level+=10){
      if(pool.size==0) return false
      let difficulty=level<50?'Normal':'Elite'
      let candidates=Array.from(pool).flatMap(act=>acts.acts[act])
      let arealevel=level+roll(1,4)-1
      candidates=candidates.filter(
        area=>difficulty=='Normal'?area.isnormal(arealevel):area.iselite(arealevel))
      let area=pick(Array.from(candidates))
      this.milestones[level]=[difficulty,'Act '+area.act,area.name]
      pool.delete(area.act)
    }
    return true
  }
}

export function setup(){
  acts.setup()
  let r=false
  while(!r||!r.generate()) r=new Route()
  for(let m of Object.keys(r.milestones)){
    let level=document.createElement('div')
    level.innerHTML=m==100?'End-game':'Level '+m
    ROUTE.appendChild(level)
    for(let column of r.milestones[m]){
      let c=document.createElement('div')
      c.innerHTML=column
      ROUTE.appendChild(c)
    }
  }
}
