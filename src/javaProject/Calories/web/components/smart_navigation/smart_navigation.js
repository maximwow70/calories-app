/*
function initSN(){
    var navigation = document.querySelector('.smart_navigation');
    var btn = navigation.querySelector('.smart_navigation-btn');

    btn.addEventListener('click', function(){
        $(navigation).toggleClass('smart_navigation--open');
    });

    var navLists = navigation.querySelectorAll('.navigation-list');
    function closeNavLists(){
        for (var i = 0; i < navLists.length; i++){
            $(navLists[i]).removeClass('navigation-list--selected');
        }
    }
    for (var i = 0; i < navLists.length; i++){
        navLists[i].addEventListener('click', function(event){
            closeNavLists();
            $(this).addClass('navigation-list--selected');
        });
    }
}
*/