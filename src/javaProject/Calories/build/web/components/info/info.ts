class Info{
    private dom: any;
    private title: string;
    private content: string;
    private description: string;
    private img: string;
    private path: string = './img/components/';

    constructor(parent: any, title: string, content: string, description: string, img: string) {
        this.dom = parent.querySelector('.info');

        this.setInfo(title, content, description, img);
    }    
    public setInfo(title: string, content: string, description: string, img: string): void{
        this.setEmpty();

        this.setImg(img);
        this.setTitle(title);
        this.setDescription(description);
        this.setContent(content);
    }
    public setTitle(title: string): void{
        this.title = title;

        if (title){
            var titleDom = this.dom.querySelector('.info-title');
            if (!titleDom){
                titleDom = document.createElement('h2');
                titleDom.setAttribute('class', 'info-title');
                this.dom.appendChild(titleDom);
            }
            titleDom.innerHTML = this.title;
        }
    }
    public setDescription(description: string): void{
        this.description = description;
        
        if (description){
            let description = document.createElement('h3');
            description.setAttribute('class', 'info-description');
            description.innerHTML = this.description;
            this.dom.appendChild(description);
        }
    }
    public setContent(content: string): void{
        this.content = content;

        if (content) {
            var contentDom = this.dom.querySelector('.info-content');
            if (!contentDom) {
                contentDom = document.createElement('p');
                contentDom.setAttribute('class', 'info-content');
                this.dom.appendChild(contentDom);
            }
            contentDom.innerHTML = this.content;
        }
    }
    public setImg(img: string): void{
        this.img = img;
        if (img){
            let img = document.createElement('img');
            img.setAttribute('class', 'info-img');
            img.setAttribute('src', this.path + this.img);
            this.dom.appendChild(img);
        }
    }
    public setEmpty(): void{
        this.title = '';
        this.img = '';
        this.content = '';
        this.description = '';

        this.dom.innerHTML = '';
    }
    public setContentImportant(importance: number): void{
        var content = this.dom.querySelector('.info-content');

        try{
            if (importance == 1) {
                content.style.color = '#22bf65';
            }
            else if (importance == 2) {
                content.style.color = '#fff568';
            }
            else if (importance == 3) {
                content.style.color = '#f72f5f';
            }
        }
        catch (e) {
            
        }
    }
}
