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

class Area{
  constructor(name,normal,elite){
    this.name=name//string
    this.normal=normal//[minlevel,maxlevel]
    this.elite=elite//[minlevel,maxlevel]
    this.act=-1//defined dynamically
    this.index=-1//0-based order of apparition, defined dynamically if applicable
  }

  toString(){return this.name}
  
  isnormal(level){
    return this.normal[0]<=level&&level<=this.normal[1]
  }
  iselite(level){
    return this.elite[0]<=level&&level<=this.elite[1]
  }
}
export var acts={//TODO wiki shows compeltely different level ranges from Grim Tools
  0:[new Area("Crucible",[5,75],[5,90])],
  1:[
    new Area("Devil's crossing",[1,4],[1,65]),
    new Area("Lower crossing",[4,7],[5,65]),
    new Area("Wightmire",[6,9],[8,65]),
    new Area("Foggy bank",[8,12],[10,68]),
    new Area("Flooded passage",[9,13],[12,68]),
    new Area("Burrwitch outskirts",[12,15],[15,65]),
    new Area("Burrwitch village",[12,18],[15,68]),
    new Area("Warden's cellar",[15,25],[18,68]),
    new Area("Underground transit",[16,30],[19,69]),
    new Area("Warden's laboratory",[16,30],[19,69]),
  ],
  2:[
    new Area("Arkovian foothills",[19,38],[22,70]),
    new Area("Old Arkovia",[20,37],[23,69]),
    new Area("Cronley's hideout",[21,40],[24,72]),
    new Area("Twin falls",[21,40],[24,72]),
    new Area("Broken hills",[23,45],[26,72]),
    new Area("Smugller's pass",[25,45],[30,75]),
  ],
  3:[
    new Area("Deadman's gulch",[26,45],[32,75]),
    new Area("Prospector's trail",[28,45],[35,76]),
    new Area("Pine barrens",[28,48],[45,76]),
    new Area("Homestead",[28,48],[45,76]),
    new Area("Rotting croplands",[28,48],[45,76]),
  ],
  4:[
    new Area("Sorrow's bastion",[30,45],[36,76]),
    new Area("Blood grove",[31,58],[38,76]),
    new Area("Darkvale gate",[33,50],[40,77]),
    new Area("Asterkarn mountains",[30,60],[50,75]),
    new Area("Asterkarn road",[30,60],[50,75]),
    new Area("Asterkarn valley",[30,60],[50,75]),
    new Area("Fort Ikon",[34,60],[42,77]),
    new Area("Gates of Necropolis",[35,60],[45,78]),
    new Area("Necropolis interior",[36,60],[46,78]),
  ],
  5:[
    new Area("Gloomwald",[36,62],[50,80]),
    new Area("Gloomwald crossing",[36,62],[50,80]),
    new Area("Coven's refuge",[38,65],[55,80]),
    new Area("Ugdenbog",[38,65],[55,80]),
    new Area("Barrowholm",[38,66],[58,82]),
  ],
  6:[
    new Area("Lone watch",[40,70],[63,85]),
    new Area("Malmouth outskirts",[42,70],[63,85]),
    new Area("Malmouth sewers",[42,72],[63,85]),
    new Area("Steelcap district",[44,72],[68,86]),
    new Area("Crown hill",[46,75],[66,90]),
  ],
  7:[
    new Area("Conclave of the Three",[15,75],[25,90]),
    new Area("Korvan plateau",[15,75],[25,90]),
    new Area("Temple of Osyr",[15,75],[25,90]),
    new Area("Korvan sands",[15,75],[25,90]),
    new Area("Kaian docks",[15,75],[25,90]),
    new Area("Sunbase oasis",[15,75],[25,90]),
    new Area("Vanguard of the Three",[18,75],[28,90]),
    new Area("Ruins of Abyd",[18,75],[28,90]),
    new Area("Infernal wastes",[20,75],[30,90]),
    new Area("Korvan city",[22,75],[33,90]),
    new Area("Tomb of the Eldritch Sun",[24,75],[35,90]),
    new Area("Eldritch gate",[24,75],[35,90]),
  ]
}

export var sequential=[]

export function setup(){
  let i=0
  for(let act=0;act<=7;act++) if(acts[act])
    for(let a of acts[act]){
      a.act=act
      if(act>0) a.index=i++
      sequential.push(a)
    }
}
