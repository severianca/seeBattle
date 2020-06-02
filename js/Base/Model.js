define([],
function(){

    /**
     * Базовая модель
     */
    class Model {
        constructor(data) {
            for (let k in data) {
                this[k] = data[k];
            }
        }
    }
    
    return Model;
});

