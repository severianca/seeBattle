define([],
function(){
    class TablePlayer {

        constructor() {
            this.countShips = 20;
            this.tablePlayer = [];
            for (let i=0; i<10; i++){
                this.tablePlayer[i] = [];
                for (let j=0; j<10; j++){
                    this.tablePlayer[i][j] = 0;
                }
            }
        }

        getItem(i, j){
            return this.tablePlayer[i][j];
        }

        /**
        * Возращает true, если в этом поле нет корабля
        * Возвращает false, если корабль уже здесь стоит
        */
       canAddShip(item) {
            //определяем поле по которому кликнул игрок
            let i = item[0];
            let j = item[2];
            //если это поле пустое, то помещаем в это поле корабль
            if (this.tablePlayer[i][j] == 0){
                this.tablePlayer[i][j] = 1;
                return true;
            }
            else {
                this.tablePlayer[i][j] = 0;
                return false;
            }
        }
    }
    return TablePlayer;
});