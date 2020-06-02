define(['js/Play/TablePlayer.js', 'js/Play/TableAI.js'],
function(TablePlayer, TableAI) {

    class TableFactory {

        createTablePlayer(){
            return new TablePlayer;
        }

        createTableAI(){
            return new TableAI;
        }
    }
    return TableFactory;
});