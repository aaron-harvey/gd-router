import * as acts from './acts.js'

const ROUTE=document.querySelector('#route')

function pick(items){//adapted from https://stackoverflow.com/a/5915122
  if(items.length==0) return false
  return items[Math.floor(Math.random() * items.length)];
}

function roll(min, max) {//https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function next(level){
  return level+roll(10,30)
}

function round(level){
  return Math.round(level/10)*10
}

class Route{
  constructor(){
    this.acts=[]//array of [level,act,difficulty,faction]
  }
  
  //TODO could separate acts into one instance per difficulty, this would make climbing difficulty less awsward (just make sure the next routing step is never lower difficulty)
  generate(){
    let level=1
    for(;level<=50;){
      let act=pick(acts.normal.get(level))
      if(this.acts.length>0&&act==this.acts.slice(-1)[0][1]) 
        continue
      this.acts.push([level,act,act.difficulties[0],''])
      level=Math.min(act.normal[1],next(level))
    }
    for(;level<=100;level++){
      let act=pick(acts.elite.get(level))
      this.acts.push([level,act,act.difficulties[1],''])
      level=Math.min(act.elite[1],next(level))
    }
  }
  
  validate(){
    //if(this.acts.length<5) return false
    for(let i=0;i<this.acts.length;i++)
      for(let j=i+1;j<this.acts.length;j++)
        if(this.acts[i][1]==this.acts[j][1])
          return false
    return true
  }
}

export function setup(){
  acts.setup()
  let r=false
  while(!r||!r.validate()){
    r=new Route()
    r.generate()
  }
  for(let a of r.acts){
    let level=document.createElement('div')
    let l=a[0]
    if(l>1) l=round(l)
    level.innerHTML='Level '+l
    ROUTE.appendChild(level)
    let act=document.createElement('div')
    act.innerHTML=`${a[1]} (${a[2].toLowerCase()})`
    ROUTE.appendChild(act)
    let faction=document.createElement('div')
    faction.innerHTML=a[3]
    ROUTE.appendChild(faction)
  }
}
