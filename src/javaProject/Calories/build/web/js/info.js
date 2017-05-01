var Info = (function () {
    function Info(parent, title, content, description, img) {
        this.path = './img/components/';
        this.dom = parent.querySelector('.info');
        this.setInfo(title, content, description, img);
    }
    Info.prototype.setInfo = function (title, content, description, img) {
        this.setEmpty();
        this.setImg(img);
        this.setTitle(title);
        this.setDescription(description);
        this.setContent(content);
    };
    Info.prototype.setTitle = function (title) {
        this.title = title;
        if (title) {
            var titleDom = this.dom.querySelector('.info-title');
            if (!titleDom) {
                titleDom = document.createElement('h2');
                titleDom.setAttribute('class', 'info-title');
                this.dom.appendChild(titleDom);
            }
            titleDom.innerHTML = this.title;
        }
    };
    Info.prototype.setDescription = function (description) {
        this.description = description;
        if (description) {
            var description_1 = document.createElement('h3');
            description_1.setAttribute('class', 'info-description');
            description_1.innerHTML = this.description;
            this.dom.appendChild(description_1);
        }
    };
    Info.prototype.setContent = function (content) {
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
    };
    Info.prototype.setImg = function (img) {
        this.img = img;
        if (img) {
            var img_1 = document.createElement('img');
            img_1.setAttribute('class', 'info-img');
            img_1.setAttribute('src', this.path + this.img);
            this.dom.appendChild(img_1);
        }
    };
    Info.prototype.setEmpty = function () {
        this.title = '';
        this.img = '';
        this.content = '';
        this.description = '';
        this.dom.innerHTML = '';
    };
    Info.prototype.setContentImportant = function (importance) {
        var content = this.dom.querySelector('.info-content');
        try {
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
    };
    return Info;
}());
