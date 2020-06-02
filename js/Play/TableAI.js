define(['js/Play/Table.js'],
function(Table){
    class TableAI extends Table{

        createTableAI(tablePlayer) {
            for (let i=0; i<10; i++){
                for (let j=0; j<10; j++){
                    this.table[i][j] = tablePlayer[j][i];
                }
            }
        }

    }
    return TableAI;
});