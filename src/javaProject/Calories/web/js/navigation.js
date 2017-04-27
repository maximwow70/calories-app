function initNavigation(){
    var navigation = document.querySelector('.app-navigation');
    var btn = navigation.querySelector('.app-navigation-btn');

    btn.addEventListener('click', function(){
        $(navigation).toggleClass('app-navigation--open');
    });

    var navLists = navigation.querySelectorAll('.navigation-list');
    for (var i = 0; i < navLists.length; i++){
        navLists[i].addEventListener('click', function(event){
            for (var i = 0; i < navLists.length; i++){
                $(navLists[i]).removeClass('navigation-list--selected');
            }
            $(this).addClass('navigation-list--selected');
        });
    }


    var app = document.querySelector('.calories-app');

    var allSections = document.querySelectorAll('.calories > *');
    function closeAllSections(){
        for (var i = 0; i < allSections.length; i++){
            $(allSections[i]).addClass('close');
        }
    }
    function openAllSections(){
        for (var i = 0; i < allSections.length; i++){
            $(allSections[i]).removeClass('close');
        }
    }

    var btnOpenApp = document.querySelector('.introduction-select--app');
    btnOpenApp.addEventListener('click', function(){
        closeAllSections();
        $(app).removeClass('close');
    });

    var btnCloseApp = document.querySelector('.navigation-list--close_app');
    btnCloseApp.addEventListener('click', function(){
        openAllSections();
        $(app).addClass('close');
        btn.click();
    });

}
initNavigation();