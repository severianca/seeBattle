define([],
function(){

    class Table {

        constructor(){
            this.countShips = 20;
            this.table = [];
            for (let i=0; i<10; i++){
                this.table[i] = [];
                for (let j=0; j<10; j++){
                    this.table[i][j] = 0;
                }
            }
        }

        restartTable(){
            for (let i=0; i<10; i++){
                this.table[i] = [];
                for (let j=0; j<10; j++){
                    this.table[i][j] = 0;
                }
            }
        }

        getCountShips(){
            return this.countShips;
        }

        /**
        * i, j - координаты в которые производиться выстрел
        * Возращает true, если выстрел попал в корабль
        * Возвращает false, если не попал
        */
        shot(i, j){
            if (this.table[i][j] == 1){
                this.table[i][j] = -1;
                this.countShips = this.countShips-1;
                return true;
            }
            else {
                this.table[i][j] = -1;
                return false;
            }
        }

        /**
        * Возращает true, если корабль был "убит"
        * Возвращает false, в противном случае
        */
        checkKill(i, j){
            //центр
            if (0<i && i<9 && 0<j && j<9){
                if ((this.table[i-1][j]==1)||
                    (this.table[i][j+1]==1)||
                    (this.table[i+1][j]==1)||
                    (this.table[i][j-1]==1)){
                    return false;
                }
            }
            else {
                //верхняя горизонтальная линия
                if (i==0 && 0<j && j<9){
                    if ((this.table[i][j+1]==1)||
                        (this.table[i+1][j]==1)||
                        (this.table[i][j-1]==1)){
                        return false;
                    }
                }
                //нижняя горизонтальная линия
                if (i==9 && 0<j && j<9){
                    if ((this.table[i-1][j]==1)||
                        (this.table[i][j+1]==1)||
                        (this.table[i][j-1]==1)){
                        return false;
                    }
                }
                //первая левая вертикальная линия
                if (j==0 && 0<i && i<9){
                    if ((this.table[i-1][j]==1)||
                        (this.table[i][j+1]==1)||
                        (this.table[i+1][j]==1)){
                        return false;
                    }
                }
                //последняя вертикальная линия
                if (j==9 && 0<i && i<9){
                    if ((this.table[i-1][j]==1)||
                        (this.table[i+1][j]==1)||
                        (this.table[i][j-1]==1)){
                        return false;
                    }
                }
                //проверим все уголки (их 4)
                if (i==0 && j==0){
                    if ((this.table[i][j+1]==1)||
                        (this.table[i+1][j]==1)){
                        return false;
                    }
                }
                if (i==0 && j==9){
                    if ((this.table[i+1][j]==1)||
                        (this.table[i][j-1]==1)){
                        return false;
                    }
                }
                if (i==9 && j==0){
                    if ((this.table[i-1][j]==1)||
                        (this.table[i][j+1]==1)){
                        return false;
                    }
                }
                if (i==9 && j==9){
                    if ((this.table[i-1][j]==1)||
                        (this.table[i][j-1]==1)){
                        return false;
                    }
                }
            }
            return true;
        }

    }

    return Table;
});