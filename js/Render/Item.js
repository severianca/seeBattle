define(['js/Base/Component.js'],
function(Component) {

    class Item extends Component {
        render({item, playTable}) {
            return `
                <div class="item" id="${item}_${playTable}" name="${playTable}"></div>`;
        }
    }
    return Item;
});