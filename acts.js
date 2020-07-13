const DIFFICULTIES=['Normal/Veteran','Elite','Ultimate']
const ALL=[]

export var normal=new Map()//balanced acts by player level
export var elite=new Map()

/* TODO 
 * ultimate cannot be used as you can't unlock riftgates easily
 * might want to  add the possiblity of a end-game linear run at some point? 
 */
class Act{
  constructor(name,enabled=true){
    this.name=name//string
    this.factions=[] //array of strings
    this.normal=[] //level range
    this.elite=[]//level range
    this.ultimate=[]//level range
    this.difficulties=DIFFICULTIES//difficulty labels
    if(enabled) ALL.push(this)
  }
  
  valid(level,difficulty=false){
    return difficulty[0]<=level&&level<=difficulty[1]
  }
  
  toString(){return this.name}
}
var act1=new class extends Act{
  constructor(){
    super('Act 1')
    this.factions=["Devil's Crossing"]
    this.normal=[1,30] 
    this.elite=[45,65]
    this.ultimate=[70,100]
  }
}
var act2=new class extends Act{
  constructor(){
    super('Act 2')
    this.factions=['Rovers']
    this.normal=[18,40] 
    this.elite=[52,68]
    this.ultimate=[73,100]
  }
}
var act3=new class extends Act{
  constructor(){
    super('Act 3')
    this.factions=['Homestead',"Kymon's Chosen","Order of Death's Vigil"]
    this.normal=[26,48] 
    this.elite=[56,70]
    this.ultimate=[74,100]
  }
}
var act4=new class extends Act{
  constructor(){
    super('Act 4')
    this.factions=['The Black Legion','The Outcast']
    this.normal=[33,60] 
    this.elite=[63,70]
    this.ultimate=[77,100]
  }
}
var act5=new class extends Act{
  constructor(){
    super('Act 5')
    this.factions=['Coven of Ugdenbog','Barrowholm']
    this.normal=[36,66] 
    this.elite=[65,82]
    this.ultimate=[71,120]
  }
}
var act6=new class extends Act{
  constructor(){
    super('Act 6')
    this.factions=['Malmouth Resistance']
    this.normal=[63,75] 
    this.elite=[74,90]
    this.ultimate=[85,120]
  }
}
var act7=new class extends Act{
  constructor(){
    super('Act 7')
    this.factions=['Cult of Bysmiel','Cult of Dreeg','Cult of Solael']
    this.normal=[15,75] 
    this.elite=[25,90]
    this.ultimate=[30,120]
  }
}
var crucible=new class extends Act{
  constructor(){
    super('Crucible')
    this.factions=[]
    this.normal=[1,100] 
    this.elite=[1,100]
    this.ultimate=[1,100]
    this.difficulties=['Aspirant','Challenger','Gladiator']
  }
}
/* TODO
 * sr is a pain in the ass to unlock in-game
 * handling it intelligently would require:
 * - adding prerequisite acts logic, which is easy enough to do
 * - making each difficulty an individual Act so the prerequisite logic work on each campaign
 * Considering SR is by far the worst content in SR it's dubious wether the effort is worth it.
 */
var sr=new class extends Act{
  constructor(){
    super('Shattered Realm',false)
    this.factions=[]
    this.normal=[1,100] 
    this.elite=[1,100]
    this.ultimate=[1,100]
  }
}
var ultimate=new class extends Act{//hack that represent a "linear ultimate run" as endgame
  constructor(){
    super('Ultimate campaign')
    this.factions=[]
    this.normal=[0,0] 
    this.elite=[70,100]
    this.ultimate=[0,0]
    this.difficulties=['Ultimate','Ultimate','Ultimate']
  }
}

export function setup(){
  for(let i=1;i<=100;i++){
    normal.set(i,ALL.filter(a=>a.valid(i,a.normal)))
    elite.set(i,ALL.filter(a=>a.valid(i,a.elite)))
  }
}
