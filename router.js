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
    this.acts=[]//array of [level,act,elite]
  }
  
  get last(){return this.acts.length>0&&this.acts[this.acts.length-1][1]} //last act
  
  /*get nextlevel(){
    let last=this.acts[this.acts.length-1]
    let min=last[0]+10
    let max=last[1].levels[1]
    let a=roll(min,max)
    let b=roll(min,max)
    return Math.min(a,b)
  }*/
  
  //TODO try using levels from wiki instead, only act 1 and 7 being used for normal
  generate(){
    let elite=false
    for(let level=1;level<90;){
      let candidates=acts.sequential
      let last=this.last
      if(last){
        candidates=candidates.filter(c=>this.acts.map(a=>a[1]).indexOf(c)<0)
        candidates=candidates.filter(
          a=>a.index==-1||a.index>last.index||(!elite&&!a.isnormal(level)&&a.iselite(level)))
      }
      candidates=candidates.filter(a=>(!elite&&a.isnormal(level))||a.iselite(level))
      if(candidates.length==0){
        level+=1
        continue
      }
      let act=pick(candidates)
      if(act==last) return false
      if(!elite) elite=!act.isnormal(level)&&act.iselite(level)
      this.acts.push([level,act,elite])
      let min=level+1
      let max=Math.min(level+9,elite?act.elite[1]:act.normal[1])
      level=roll(min,max)
      if(!this.validate()) return false
    }
    return this.acts.length<=9*2&&
      new Set(this.acts.map(a=>a[1].act).filter(a=>2<=a&&a)).size>=6&&
      true//this.acts.map(a=>a[1].act).filter(a=>2<=a&&a<=6).length>=3
  }
  
  validate(){
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
  while(!r||!r.generate()) r=new Route()
  for(let a of r.acts){
    let level=document.createElement('div')
    level.innerHTML='Level '+a[0]
    ROUTE.appendChild(level)
    let difficulty=document.createElement('div')
    difficulty.innerHTML=a[2]?'Elite':'Normal/veteran'
    ROUTE.appendChild(difficulty)
    let act=document.createElement('div')
    if(a[1].act>=1) act.innerHTML=`Act ${a[1].act}`
    ROUTE.appendChild(act)
    let area=document.createElement('div')
    area.innerHTML=a[1]
    ROUTE.appendChild(area)
  }
}
