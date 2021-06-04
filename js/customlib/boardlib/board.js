class Board {
    constructor(basewidth, baseheight) {
        this.basewidth = basewidth;
        this.baseheight = baseheight;

        this.rows = [];
        for (var y = 0; y < this.basewidth; y++) {
            var temp = [];
            for (var x = 0; x < this.basewidth; x++) {
                temp.push(new TileInfo(x, y));
            }
            this.rows.push(temp);
        }
        this.pieces = [];
        this.selectedpiece = undefined;
        this.pendingpieces = [];
    }

    placepiecetoposition(x, y, piece) {
        if (piece == undefined || this.haspiececollision(piece))
            return;
        //piece.positionpiece(x, y);
        this.pieces.push(piece);
        piece.applypiece();
        this.selectedpiece = undefined;
    }

    placepiecetotile(tile, piece) {
        this.placepiecetoposition(tile.x, tile.y, piece);
    }

    displacepieceatposition(x, y) {
        var piece = this.getpieceat(x, y);
        piece.unapplypiece();
        var ind = this.pieces.indexOf(piece)
        this.pieces.splice(ind, 1);
        this.deselectpiece();
        this.selectedpiece = piece;
        this.displaypiecetoposition(x, y, this.selectedpiece);
    }

    displacepieceattile(tile) {
        this.displacepieceatposition(tile.x, tile.y);
    }

    rotateselected() {
        if(this.selectedpiece == undefined)
            return;
        this.selectedpiece.rotateclockwise();
        this.displaypiece(this.selectedpiece);
    }

    deselectpiece() {
        if (this.selectedpiece != undefined)
            this.pendingpieces.push(this.selectedpiece);
        this.selectedpiece = undefined;
        this.updateboardtiles();
    }

    selectpiece(piece) {
        var ind = this.pendingpieces.indexOf(piece);
        this.pendingpieces.splice(ind, 1);

        this.deselectpiece();
        this.selectedpiece = piece;
    }

    updateboardtiles() {
        this.rows.forEach((row, y) => {
            row.forEach((cell, x) => {
                var tp = this.getpieceat(x, y);
                if (tp == undefined)
                    this.setdisplaytype(x, y, "empty");
                else
                    this.setdisplaytype(x, y, tp.type);
            });
        });
    }

    haspiececollision(piece) {
        var collision = false;
        piece.rotatedpiece.forEach((rp, yt) => {
            if (collision)
                return;
            rp.forEach((cell, xt) => {
                if (collision)
                    return;
                if (cell == 1) {
                    var tp = this.getpieceat(piece.x + xt, piece.y + yt);
                    if (tp != undefined)
                        collision = true;
                }
            });
        });
        return collision;
    }

    displaypiecetoposition(x, y, piece) {
        if (piece == undefined)
            return;
        if (x + piece.width > this.basewidth && y + piece.height > this.baseheight)
            return;
        this.updateboardtiles();
        if (x + piece.width > this.basewidth)
            x = this.basewidth - piece.width;
        if (y + piece.height > this.baseheight)
            y = this.baseheight - piece.height;
        piece.positionpiece(x, y);
        piece.rotatedpiece.forEach((rp, yt) => {
            rp.forEach((cell, xt) => {
                if (cell == 1) {
                    var tp = this.getpieceat(x + xt, y + yt);
                    if (tp == undefined)
                        this.setdisplaytype(x + xt, y + yt, piece.type);
                    else
                        this.setdisplaytype(x + xt, y + yt, "error");
                }
            });
        });
    }

    displaypiece(piece){
        this.displaypiecetoposition(piece.x, piece.y, piece);
    }

    displaypiecetotile(tile, piece) {
        this.displaypiecetoposition(tile.x, tile.y, piece);
    }

    setdisplaytype(x, y, type) {
        if (x >= 0 && y >= 0 && x < this.basewidth && y < this.baseheight)
            this.rows[y][x].settextureid(type);
    }

    getpieceat(x, y) {
        var piece = null;
        this.pieces.forEach(pc => {
            if (pc.intersectsposition(x, y)) {
                piece = pc;
                return;
            }
        });
        return piece;
    }
}

class TileInfo {
    constructor(x, y) {
        this.textureid = "empty";
        this.x = x;
        this.y = y;
    }

    get texturepath() {
        return "images/board/tiles/" + this.textureid + ".png";
    }

    settextureid(textureid) {
        this.textureid = textureid;
    }
}