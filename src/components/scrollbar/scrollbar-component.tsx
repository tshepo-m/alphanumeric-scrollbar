import { Component, Prop, State, Element } from '@stencil/core'

@Component({
    tag: 'scrollbar-component',
    styleUrl: 'scrollbar-component.scss',
    shadow: false
})

export class ScrollbarComponent {
    private alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    @Prop() letterList = this.alphabet.split("").concat(["fav"]);
    @Prop() initHeight = false;
    @Prop() height: number = 80;
    @State() scrollbarItems: any;

    @Element() scrollbarComponent: HTMLElement;

    private previousScrollSpan;
    private scrollNavItems: { letter: string }[] = [];
    private selectedLetterElement: HTMLElement;
    private scrollbarElement: HTMLElement;
    private scrollbarThumb: HTMLElement;
    private scrollbarBorder: HTMLElement;

    componentDidLoad() {
        this.scrollbarItems = this.generateScrollbarItems();
        this.scrollbarElement = this.scrollbarComponent.querySelector('.scrollbar');
        this.scrollbarThumb = this.scrollbarComponent.querySelector('.scrollbar-thumb');
        this.scrollbarBorder = this.scrollbarComponent.querySelector('.scrollbar-border');
        this.selectedLetterElement = this.scrollbarComponent.querySelector('.selected-letter');

        if (this.initHeight) {
            console.log(this.initHeight);
            this.initScrollbar();
        }

        let element;
        for (let i = 0; i < this.scrollbarElement.children.length; i++) {
            element = this.scrollbarElement.children[i];
            if (this.alphabet.includes(element.innerHTML)) {
                this.scrollNavItems.push({ letter: element.innerHTML })
            }
        }
    }

    private calcVFIP(initialValue, percentage) {
        return initialValue / 100 * percentage;
    }

    initScrollbar() {
        let screenHeight = window.screen.height;
        let scrollbarHeight, scrollbarBorderHeight: number;

        scrollbarHeight = this.calcVFIP(screenHeight, this.height) - parseFloat(window.getComputedStyle(this.scrollbarElement).top);
        scrollbarBorderHeight = this.calcVFIP(screenHeight, this.height + 2) - parseFloat(window.getComputedStyle(this.scrollbarBorder).top);

        this.scrollbarElement.style.height = scrollbarHeight + "px";
        this.scrollbarBorder.style.height = scrollbarBorderHeight + "px";
    }

    doScroll(ev) {
        let scrollbarTop = parseFloat(window.getComputedStyle(this.scrollbarElement).top);
        let scrollbarHeight = parseFloat(window.getComputedStyle(this.scrollbarElement).height);
        let scrollbarThumbHeight = parseFloat(window.getComputedStyle(this.scrollbarThumb).height);

        let touch = ev.touches[0];
        let selectedElement = document.elementFromPoint(touch.clientX, touch.clientY);
        if (selectedElement && (selectedElement.classList.contains('star') || selectedElement.textContent.length == 1)) {
            if (this.previousScrollSpan) {
                this.previousScrollSpan.classList.remove('active');
            }
            selectedElement.classList.add('active');
            this.previousScrollSpan = selectedElement;
            if (this.alphabet.includes(selectedElement.textContent)) {
                location.hash = '#' + selectedElement.textContent;
            } else if (selectedElement.classList.contains('star')) {
                location.hash = '#favouriteContacts';
            }

            if (touch.clientY > scrollbarTop + this.calcVFIP(scrollbarThumbHeight, 150) && touch.clientY < this.calcVFIP((scrollbarTop + scrollbarHeight - scrollbarThumbHeight / 2), 115)) {
                this.scrollbarThumb.style.top = touch.clientY - (scrollbarThumbHeight / 2) - scrollbarTop + "px";
                this.selectedLetterElement.style.top = touch.clientY - (scrollbarThumbHeight / 2) - scrollbarTop + "px";
            }
            this.selectedLetterElement.innerHTML = '<span>' + selectedElement.textContent + '</span>'
        }
    }

    generateScrollbarItems() {
        let arAlphabet = this.alphabet.split('');
        let arItems: any[] = [];
        if (this.letterList.includes('fav')) {
            arItems.push(<span class="star"> &#9734;</span>);
        } else {
            arItems.push(<span>-</span>)
        }
        const me = this;
        arAlphabet.forEach(el => {
            if (me.letterList.includes(el)) {
                arItems.push(<span>{el}</span>);
            } else {
                arItems.push(<span>-</span>);
            }
        })
        return arItems;
    }

    fadeElementOut(ev) {
        ev.preventDefault();
        if (this.previousScrollSpan) {
            this.previousScrollSpan.classList.remove('active');
        }
        this.selectedLetterElement.classList.remove('fade-in');
        this.selectedLetterElement.classList.add('fade-out');
        this.scrollbarThumb.classList.remove('fade-in-scrollthumb');
        this.scrollbarThumb.classList.add('fade-out-scrollthumb');
        // this.btnContactAdd.classList.remove('fade-out');
        // this.btnContactAdd.classList.add('fade-in');
    }

    fadeElementIn(ev) {
        ev.preventDefault();
        this.doScroll(ev);
        this.selectedLetterElement.classList.remove('fade-out');
        this.selectedLetterElement.classList.add('fade-in');
        this.scrollbarThumb.classList.remove('fade-out-scrollthumb');
        this.scrollbarThumb.classList.add('fade-in-scrollthumb');
        // this.btnContactAdd.classList.remove('fade-in');
        // this.btnContactAdd.classList.add('fade-out');
    }

    render() {
        return (
            <div>
                <div class="selected-letter animated"><span>G</span></div>
                <div class="scrollbar-thumb animated"></div>
                <div class="scrollbar-border"></div>
                <div class="scrollbar" onTouchStart={(ev) => this.fadeElementIn(ev)} onTouchEnd={(ev) => this.fadeElementOut(ev)} onTouchMove={(ev) => this.doScroll(ev)}>{this.scrollbarItems}</div>
            </div>
        )
    }
}