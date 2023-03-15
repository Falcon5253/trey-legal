const menu = document.querySelector('.menu');
const submenu = document.querySelector('.menu__service-submenu')
const navigation = document.querySelector('.navigation');
const serviceMenu = document.querySelector('.menu__service-menu');
const servicesMenuItems = serviceMenu.querySelectorAll('.menu__item');
const serviceSubmenu = document.querySelector('.menu__service-submenu');
const servicesSubenuItems = serviceSubmenu.querySelectorAll('.menu__item');
const servicesButton = document.querySelector('.navigation__services-button');
const moreButton = document.querySelector('.header-info__more-button-img');
const arrowsBack = document.querySelectorAll('.menu__arrow-back');
const closeMenuArrow = document.querySelector('.menu__close-menu');
const closeNavigationButton = document.querySelector('.navigation__close-button')


let isServicesMenuShown = false;


function openMenu() {
    menu.setAttribute('class', 'menu menu_shown');
    isServicesMenuShown = true;
}

function closeMenu() {
    menu.setAttribute('class', 'menu');
    isServicesMenuShown = false;
}

function closeSubmenu() {
    servicesMenuItems.forEach((menuItem) => {
        menuItem.setAttribute('class', 'menu__item');
        let serviceId = menuItem.getAttribute('id').slice(8);
        let submenuItem = document.getElementById('submenu_' + serviceId);
        submenuItem.removeAttribute('style');
    });
}

function toggleServicesMenu() {
    if (isServicesMenuShown) {
        closeMenu();
    }
    else {
        openMenu();
    }
}

let isNavigationShown = false;

function openNavigation() {
    navigation.setAttribute('style', 'display: grid');
    isNavigationShown = true;
}

function closeNavigation() {
    navigation.removeAttribute('style');
    isNavigationShown = false;
}

function toggleNavigation() {
    if (isNavigationShown) {
        closeNavigation();
    }
    else {
        openNavigation();
    }
}

servicesButton.addEventListener('click', toggleServicesMenu);

menu.addEventListener('mouseleave', () => {
    closeMenu();
});

closeMenuArrow.addEventListener('click', closeMenu);
closeNavigationButton.addEventListener('click', closeNavigation)

navigation.addEventListener('mouseleave', (e) => {
    if (!isServicesMenuShown) {
        closeNavigation();
    }
});

function openMenuItemHandler(e) {
    closeSubmenu();
    if (e.currentTarget.getAttribute('class') == 'menu__item') {
        e.currentTarget.setAttribute('class', 'menu__item menu__item_chosen');
        let serviceId = e.currentTarget.getAttribute('id').slice(8);
        let submenu = document.getElementById('submenu_' + serviceId);
        submenu.setAttribute('style', 'display: block');
    }
}

function changeSubmenuOpenStyle() {
    servicesMenuItems.forEach((menuItem) => {
        if (window.innerWidth > 1024) {
            menuItem.addEventListener('mouseover', openMenuItemHandler);
            menuItem.removeEventListener('click', openMenuItemHandler);
        }
        else {
            menuItem.addEventListener('click', openMenuItemHandler);
            menuItem.removeEventListener('mouseover', openMenuItemHandler);
        }
    });
}
changeSubmenuOpenStyle();


document.addEventListener('click', (e) => {
    let dontCloseMenu = false;
    let dontCloseNavigation = false;
    console.log(e.composedPath());
    e.composedPath().forEach(element => {
        if (element == menu || element == servicesButton) {
            dontCloseMenu = true;
        }
        if (element == navigation) {
            dontCloseNavigation = true;
        }
    });
    console.log(dontCloseNavigation);
    if (!dontCloseMenu) {
        closeMenu();
    }
    if (!dontCloseNavigation) {
        closeNavigation();
    }
}, true);

arrowsBack.forEach(arrow => {
    arrow.addEventListener('click', (e) => {
        closeSubmenu();
    })
})

moreButton.addEventListener('click', toggleNavigation)
window.addEventListener('resize', () => {
    closeMenu();
    closeSubmenu();
    closeNavigation();
    changeSubmenuOpenStyle();
})