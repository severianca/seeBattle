define(['js/Base/Component.js'], 
function(Component){
    class Header extends Component {
        render({hint}) {
            return `
            <header>
                    <!-- подсказка для пользователей -->
                    <div class="hint" id="hint">${hint}</div>
            </header>`;
        }
    }
    return Header;
});
