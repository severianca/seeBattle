define([],
function(){
    class TableAI {

        constructor() {
            this.countShips = 20;
            this.tableAI = [];
            for (let i=0; i<10; i++){
                this.tableAI[i] = [];
                for (let j=0; j<10; j++){
                    this.tableAI[i][j] = 0;
                }
            }
        }

        restartTableAI(){
            for (let i=0; i<10; i++){
                this.tableAI[i] = [];
                for (let j=0; j<10; j++){
                    this.tableAI[i][j] = 0;
                }
            }
        }

        createTableAI({tablePlayer}) {
            for (let i=0; i<10; i++){
                for (let j=0; j<10; j++){
                    this.tableAI[i][j] = tablePlayer[j][i];
                }
            }
        }

    }
    return TableAI;
});