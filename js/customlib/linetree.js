class LineTree{
  constructor(lines, name, tilesize=64){
    this.lines = lines;
    this.name = name;
    this.tilesize = tilesize;
    this.setup();
  }

  setup(){
    var farthestleft = undefined;
    var farthestright = undefined;
    var farthestup = undefined;
    var farthestdown = undefined;

    this.lines.forEach((line, i) => {
      if(farthestleft == undefined || line.xstart < farthestleft){
        farthestleft = line.xstart;
      }
      if(line.xend < farthestleft){
        farthestleft = line.xend;
      }
      if(farthestright == undefined || line.xend > farthestright){
        farthestright = line.xend;
      }
      if(line.xstart > farthestright){
        farthestright = line.xstart;
      }
      if(farthestup == undefined || line.yend < farthestup){
        farthestup = line.yend;
      }
      if(line.ystart < farthestup){
        farthestup = line.ystart;
      }
      if(farthestdown == undefined || line.ystart > farthestdown){
        farthestdown = line.ystart;
      }
      if(line.yend > farthestdown){
        farthestdown = line.yend;
      }
    });

    console.log(farthestright + ":" + farthestleft)
    this.width = farthestright - farthestleft + this.tilesize;
    this.height = farthestdown - farthestup + this.tilesize;
    this.leftoffset = farthestleft - this.tilesize/2;
    this.topoffset = farthestup - this.tilesize/2;

    this.lines.forEach((line, i) => {
      line.xstart = line.xstart - this.leftoffset;
      line.xend = line.xend - this.leftoffset;
      line.ystart = line.ystart - this.topoffset;
      line.yend = line.yend - this.topoffset;
    });

  }
}

class Line{
  constructor(xstart, xend, ystart, yend){
    this.xstart = xstart;
    this.xend = xend;
    this.ystart = ystart;
    this.yend = yend;
  }
}

function dumplines(upgrades, pixelsize = 64){
  var lines = [];
  upgrades.forEach((upgrade, i) => {
    if(upgrade.xpos != undefined && upgrade.xpos != null){
      if(upgrade.requirements != undefined && upgrade.requirements != null && upgrade.requirements != []){
        console.log(upgrade.displayname);
        upgrade.requirements.forEach((requirement, i) => {
          if(requirement.requiredobject.xpos != undefined && requirement.requiredobject.xpos != null){
            lines.push(new Line(requirement.requiredobject.xpos + pixelsize/2, upgrade.xpos + pixelsize/2, requirement.requiredobject.ypos + pixelsize/2, upgrade.ypos + pixelsize/2))
          }
        });
      }
    }
  });
  return lines;
}
