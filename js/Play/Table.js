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
        
    }

    return Table;
});