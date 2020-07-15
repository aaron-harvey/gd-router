/* TODO
 * sr is a pain in the ass to unlock in-game (needs to c omplete whole Act 1), handling it intelligently would require:
 * - adding prerequisite acts logic, which is easy enough to do
 */
const DIFFICULTIES=['Normal/Veteran','Elite','Ultimate']
const ALL=[]
const FACTIONS={
  1:["Devil's Crossing"],
  2:['Rovers'],
  3:['Homestead',"Kymon's Chosen","Order of Death's Vigil"],
  4:['The Black Legion','The Outcast'],
  5:['Coven of Ugdenbog','Barrowholm'],
  6:['Malmouth Resistance'],
  7:['Cult of Bysmiel','Cult of Dreeg','Cult of Solael'],
}

class Act{
  constructor(name,minlevel,maxlevel,difficulty,factions=[],enabled=true){
    this.name=name//string
    this.factions=factions //array of strings
    this.levels=[minlevel,maxlevel] //level range
    this.difficulty=difficulty//difficulty label
    if(enabled) ALL.push(this)
  }
  
  valid(level){return this.levels[0]<=level&&level<=this.levels[1]}
  toString(){return this.name}
}

export var normal=[
  new Act('Act 1',1,30,DIFFICULTIES[0],FACTIONS[1]),
  new Act('Act 2',18,40,DIFFICULTIES[0],FACTIONS[2]),
  new Act('Act 3',26,48,DIFFICULTIES[0],FACTIONS[3]),
  new Act('Act 4',33,60,DIFFICULTIES[0],FACTIONS[4]),
  new Act('Act 5',36,66,DIFFICULTIES[0],FACTIONS[5]),
  new Act('Act 6',63,75,DIFFICULTIES[0],FACTIONS[6]),
  new Act('Act 7',15,75,DIFFICULTIES[0],FACTIONS[7]),
  new Act('Crucible',5,75,'Aspirant'), //5 as levelling from 1 can be a major pain in Crucible
  new Act('Shattered Realm',18,75,DIFFICULTIES[0]), //can be accessed as Act 1 is "mandatory"
]
export var elite=[
  new Act('Act 1',45,65,DIFFICULTIES[1],FACTIONS[1]),
  new Act('Act 2',52,68,DIFFICULTIES[1],FACTIONS[2]),
  new Act('Act 3',56,70,DIFFICULTIES[1],FACTIONS[3]),
  new Act('Act 4',63,70,DIFFICULTIES[1],FACTIONS[4]),
  new Act('Act 5',65,82,DIFFICULTIES[1],FACTIONS[5]),
  new Act('Act 6',74,90,DIFFICULTIES[1],FACTIONS[6]),
  new Act('Act 7',25,90,DIFFICULTIES[1],FACTIONS[7]),
  new Act('Crucible',45,90,'Challenger'),
  new Act('Shattered Realm',45,90,DIFFICULTIES[1],[],false), //TODO disabled until can ensure Act 1 elite is unlocked
]
export var ultimate=[//most of ultimate cannot be used as you can't unlock riftgates easily
  new Act('Act 1',70,100,DIFFICULTIES[2],FACTIONS[1]), //enabled as can be done straight away but won't pass validations as a repeat act
  new Act('Act 2',73,100,DIFFICULTIES[2],FACTIONS[2],false),
  new Act('Act 3',74,100,DIFFICULTIES[2],FACTIONS[3],false),
  new Act('Act 4',77,100,DIFFICULTIES[2],FACTIONS[4],false),
  new Act('Act 5',71,120,DIFFICULTIES[2],FACTIONS[5],false),
  new Act('Act 6',85,120,DIFFICULTIES[2],FACTIONS[6],false),
  new Act('Act 7',30,120,DIFFICULTIES[2],FACTIONS[7],false),
  new Act('Crucible',70,120,'Challenger',[]),
  new Act('Shattered Realm',70,120,DIFFICULTIES[2],[],false), //TODO disabled until can ensure Act 1 ulti is unlocked
]
export var bylevel=new Map()

export function setup(){
  for(let i=1;i<=100;i++)
    bylevel.set(i,ALL.filter(a=>a.valid(i,a.normal)))
}
