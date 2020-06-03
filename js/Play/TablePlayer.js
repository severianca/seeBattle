define(['js/Play/Table.js'],
function(Table){
    class TablePlayer extends Table{

        getItem(i, j){
            return this.table[i][j];
        }

        getTable(){
            return this.table;
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
            if (this.table[i][j] == 0){
                this.table[i][j] = 1;
                return true;
            }
            else {
                this.table[i][j] = 0;
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
                    if (this.table[i][j] == 1){
                        //центр
                        if (0<i && i<9 && 0<j && j<9){
                            if ((this.table[i-1][j-1]==1)||
                                (this.table[i-1][j+1]==1)||
                                (this.table[i+1][j-1]==1)||
                                (this.table[i+1][j+1]==1)){
                                return false;
                            }
                        }
                        else {
                            //верхняя горизонтальная линия
                            if (i==0 && 0<j && j<9){
                                if ((this.table[i+1][j-1]==1)||
                                    (this.table[i+1][j+1]==1)){
                                    return false;
                                }
                            }
                            //нижняя горизонтальная линия
                            if (i==9 && 0<j && j<9){
                                if ((this.table[i-1][j-1]==1)||
                                    (this.table[i-1][j+1]==1)){
                                    return false;
                                }
                            }
                            //первая левая вертикальная линия
                            if (j==0 && 0<i && i<9){
                                if ((this.table[i-1][j+1]==1)||
                                    (this.table[i+1][j+1]==1)){
                                    return false;
                                }
                            }
                            //последняя вертикальная линия
                            if (j==9 && 0<i && i<9){
                                if ((this.table[i-1][j-1]==1)||
                                    (this.table[i+1][j-1]==1)){
                                    return false;
                                }
                            }
                            //проверим все уголки (их 4)
                            if (i==0 && j==0){
                                if (this.table[i+1][j+1]==1){
                                    return false;
                                }
                            }
                            if (i==0 && j==9){
                                if (this.table[i+1][j-1]==1){
                                    return false;
                                }
                            }
                            if (i==9 && j==0){
                                if (this.table[i-1][j+1]==1){
                                    return false;
                                }
                            }
                            if (i==9 && j==9){
                                if (this.table[i-1][j-1]==1){
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
                    if (this.table[i][j]==1){
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

        /**
        * Возращает true, если в это поле ИИ уже стрелял
        * Возвращает false, в противном случае
        */
        checkShot(i, j){
            if (this.table[i][j] == -1){
                return false;
            }
            else {
                return true;
            }
        }

        /**
        * i,j - координаты поля, которое нужно окрасить в цвет "промах"
        */
        paintItemMiss(i, j){
            let id = i+"_"+j+"_"+"player";
            let currentItemPlayerAction = document.getElementById(id);
            currentItemPlayerAction.style.setProperty('--background-color', '#000000');
        }

        /**
        * i,j - координаты поля, которое нужно окрасить в цвет "попал"
        */
        paintItemGet(i, j){
            let id = i+"_"+j+"_"+"player";
            let currentItemPlayerAction = document.getElementById(id);
            currentItemPlayerAction.style.setProperty('--background-color', '#FF0000');
        }

    }
    return TablePlayer;
});