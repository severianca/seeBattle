define(['js/Base/Component.js', 'js/Render/Item.js'],
function(Component, Item){
    class PlayTable extends Component {

        render({playTable}) {
            var items = new Array();
            var a=0;
            for (let i=0; i<10; i++){
                for (let j=0; j<10; j++){
                    items[a]=i+"_"+j;
                    a++;
                }
            }

            return `
                ${items.map((item) => this.childrens.create(Item, {item, playTable})).join('\n')}`;
        }
    }
    return PlayTable;
});