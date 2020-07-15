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

/* As is, Act 1 (normal) is always the first one, as 
 */
class Route{
  constructor(){
    this.acts=[]//array of [level,act]
  }
  
  get last(){return this.acts[this.acts.length-1][1]} //last act
  
  get nextlevel(){
    let last=this.acts[this.acts.length-1]
    let min=last[0]+10
    let max=last[1].levels[1]
    let a=roll(min,max)
    let b=roll(min,max)
    return Math.min(a,b)
  }
  
  generate(){
    for(let level=1;level<=90;level=this.nextlevel){
      level=round(level)
      let act=pick(acts.bylevel.get(level))
      this.acts.push([level,act])
      if(!this.validate()) return false
    }
    return true
  }
  
  validate(){
    for(let i=0;i<this.acts.length;i++)
      for(let j=i+1;j<this.acts.length;j++)
        if(this.acts[i][1].name==this.acts[j][1].name)
          return false
    return true
  }
}

export function setup(){
  acts.setup()
  let r=false
  while(!r||!r.generate()) r=new Route()
  for(let a of r.acts){
    let level=document.createElement('div')
    level.innerHTML='Level '+a[0]
    ROUTE.appendChild(level)
    let act=document.createElement('div')
    act.innerHTML=`${a[1]} (${a[1].difficulty.toLowerCase()})`
    ROUTE.appendChild(act)
    let faction=document.createElement('div')
    if(a[1].factions.length>0)
      faction.innerHTML=pick(a[1].factions)
    ROUTE.appendChild(faction)
  }
}
