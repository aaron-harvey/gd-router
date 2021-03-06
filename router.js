import * as acts from './acts.js'

const ROUTE=document.querySelector('#route')
const ATTEMPTS=10000

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
    this.milestones={
      1:['Elite','Act 1','Main quest'], 
      20:false,
      25:false,
      30:false,
      35:false,
      40:false,
      45:false,
      50:['Elite','Act 7','Shattered Realm'],
    }
  }
  
  get last(){return this.acts.length>0&&this.acts[this.acts.length-1][1]} //last act
  
  //TODO can try using levels from wiki instead
  generate(){
    let pool=new Set([2,3,4,5,6,7])
    let levels=Object.keys(this.milestones)
    for(let level of levels.slice(1,levels.length-1).map(level=>Number(level))){
      let areas=Array.from(pool).flatMap(act=>acts.acts[act])
      let area=pick(areas.filter(area=>area.isnormal(level)))
      this.milestones[level]=['Normal','Act '+area.act,area.name]
      pool.delete(area.act)
    }
    return true
  }
}

function test(){ //9-pass console output with ?debug URL parameter
  if(window.location.href.indexOf('debug')<0) return
  for(let i=0;i<9;){
    let r=new Route()
    if(r.generate()){
      i+=1
      console.log(Object.keys(r.milestones).map(level=>r.milestones[level][1]))
    }
  }
}

export function setup(){
  acts.setup()
  let r=false
  for(let i=0;i<ATTEMPTS;i++){
    r=new Route()
    if(r.generate()) break
    r=false
  }
  if(!r) throw 'Could not generate'
  test()
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
