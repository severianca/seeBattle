define(['js/Base/Component.js', 'js/Render/Header.js', 'js/Render/ViewPlay.js'],
function(Component, Header, ViewPlay) {
    /**
     * класс страницы
     */
    class Page extends Component {
        render({hint, button_text}) {
            return `
                <div class="wraper">
                    ${this.childrens.create(Header, {
                        hint
                    })}
                    ${this.childrens.create(ViewPlay)}
                    <div class="management">
                        <button class="start-button" name="playButton">${button_text}</button>
                    </div>
                </div>`;
        }
    }
    return Page;
});