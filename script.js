//items 
const menu = [
    {
        id: 1,
        title: "Buttermilk pancakes",
        category: "Breakfast",
        price: 15.99,
        img: "/img/serving.jpg",
        desc: 'Lovely buttermilk pancakes',
    },
    {
        id: 2,
        title: "Dinner double",
        category: "Lunch",
        price: 13.99,
        img: "/img/serving.jpg",
        desc: 'Awesome dinner double',
    },
    {
        id: 3,
        title: "Oreo dream",
        category: "Shakes",
        price: 18.99,
        img: "/img/serving.jpg",
        desc: 'OREOOO',
    },
    {
        id: 4,
        title: "Steak dinner",
        category: "Dinner",
        price: 39.99,
        img: "/img/serving.jpg",
        desc: 'Yummy meat',
    },
];

 const sectionCenter = document.querySelector('.section-center');
 const containerBtn = document.querySelector('.btn-container');
 

 window.addEventListener('DOMContentLoaded', function () {
    displayMenuItems(menu);
    displayMenuBtns();
    });

 function displayMenuItems(menuItems){
    let displayMenu = menuItems.map(function(item) {
        return `<article class="menu-item item">
        <img  class="item__img" src=${item.img} alt=${item.title}>
        <div class="item__info">
            <header class="item__header">
                <h4 class="item__title">${item.title}</h4>
                <h4 class="item__price">$ ${item.price}</h4>
            </header>
            <div class="item__underline"></div>
            <p class="item__text">${item.desc}</p>
        </div>
    </article>`;
    });
    displayMenu = displayMenu.join("");
    sectionCenter.innerHTML = displayMenu;
 };

 function displayMenuBtns () {
    const categories = menu.reduce(function(values,item){
        if(!values.includes(item.category)) {
            values.push(item.category);
        }
        return values;
    },['All']);
    const categoryBtns = categories.map(function(category) {
        return `<button class="filter-btn" type="button" data-category="${category}">${category}</button>`
    }).join('');
    containerBtn.innerHTML = categoryBtns;
    //filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            const category = e.currentTarget.dataset.category;
            const menuCategory = menu.filter(function(menuItem){
                if(menuItem.category === category) {
                    return menuItem;
                }
            });
            if(category === "All") {
                displayMenuItems(menu);
            }
            else {
                displayMenuItems(menuCategory);
            }
        });
    });
 };