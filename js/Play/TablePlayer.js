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

        restartTablePlayer(){
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

        /**
        * Возращает true, если корабли раставленне по правилам
        * Возвращает false, в противном случае
        */
        checkLocationShips(){
            for (let i=0; i<10; i++){
                for (let j=0; j<10;j++){
                    if (this.tablePlayer[i][j] == 1){
                        //центр
                        if (0<i && i<9 && 0<j && j<9){
                            if ((this.tablePlayer[i-1][j-1]==1)||
                                (this.tablePlayer[i-1][j+1]==1)||
                                (this.tablePlayer[i+1][j-1]==1)||
                                (this.tablePlayer[i+1][j+1]==1)){
                                return false;
                            }
                        }
                        else {
                            //верхняя горизонтальная линия
                            if (i==0 && 0<j && j<9){
                                if ((this.tablePlayer[i+1][j-1]==1)||
                                    (this.tablePlayer[i+1][j+1]==1)){
                                    return false;
                                }
                            }
                            //нижняя горизонтальная линия
                            if (i==9 && 0<j && j<9){
                                if ((this.tablePlayer[i-1][j-1]==1)||
                                    (this.tablePlayer[i-1][j+1]==1)){
                                    return false;
                                }
                            }
                            //первая левая вертикальная линия
                            if (j==0 && 0<i && i<9){
                                if ((this.tablePlayer[i-1][j+1]==1)||
                                    (this.tablePlayer[i+1][j+1]==1)){
                                    return false;
                                }
                            }
                            //последняя вертикальная линия
                            if (j==9 && 0<i && i<9){
                                if ((this.tablePlayer[i-1][j-1]==1)||
                                    (this.tablePlayer[i+1][j-1]==1)){
                                    return false;
                                }
                            }
                            //проверим все уголки (их 4)
                            if (i==0 && j==0){
                                if (this.tablePlayer[i+1][j+1]==1){
                                    return false;
                                }
                            }
                            if (i==0 && j==9){
                                if (this.tablePlayer[i+1][j-1]==1){
                                    return false;
                                }
                            }
                            if (i==9 && j==0){
                                if (this.tablePlayer[i-1][j+1]==1){
                                    return false;
                                }
                            }
                            if (i==9 && j==9){
                                if (this.tablePlayer[i-1][j-1]==1){
                                    return false;
                                }
                            }
                        }
                    }
                }
            }
            return true;
        }

        /**
        * Возращает true, если количество расставленных кораблей верное
        * Возвращает false, в противном случае
        */
        checkCountShips(){
            let count = 0;
            for (let i=0; i<10; i++){
                for (let j=0; j<10; j++){
                    if (this.tablePlayer[i][j]==1){
                        count++;
                    }
                }
            }
            if (count == 20){
                return true;
            }
            else {
                return false;
            }
        }





    }
    return TablePlayer;
});