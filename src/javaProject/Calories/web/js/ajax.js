function newXMLHttpRequest() {
    var xmlreq = false;
    if (window.XMLHttpRequest) {
    // Создадим XMLHttpRequest объект для не-Microsoft браузеров
    xmlreq = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        // Создадим XMLHttpRequest с помощью MS ActiveX
        try {
            // Попробуем создать XMLHttpRequest для поздних версий
            // Internet Explorer
            xmlreq = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e1) {
            // Не удалось создать требуемый ActiveXObject
            try {
            // Пробуем вариант, который поддержат более старые версии
            //  Internet Explorer
            xmlreq = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e2) {
            // Не в состоянии создать XMLHttpRequest с помощью ActiveX
            }
        }
    }
    return xmlreq;
}

/*
function newXMLHttpRequestTest(method, listener, isAsync, data) {
    var xmlreq = false;
    if (window.XMLHttpRequest) {
    // Создадим XMLHttpRequest объект для не-Microsoft браузеров
    xmlreq = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        // Создадим XMLHttpRequest с помощью MS ActiveX
        try {
            // Попробуем создать XMLHttpRequest для поздних версий
            // Internet Explorer
            xmlreq = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e1) {
            // Не удалось создать требуемый ActiveXObject
            try {
            // Пробуем вариант, который поддержат более старые версии
            //  Internet Explorer
            xmlreq = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e2) {
            // Не в состоянии создать XMLHttpRequest с помощью ActiveX
            }
        }
    }
    xmlreq.open(method, listener, isAsync);
	xmlreq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlreq.send(data);
    return xmlreq;
}
var q = new newXMLHttpRequestTest('POST', 'info.txt', true, 'kek');
q.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200){
        
    }
}
*/
