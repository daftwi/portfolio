const skills = {
    data: [],

    sortMode: null,

    generateList(parentElement) {
        parentElement.innerHTML = '';
        this.data.forEach(skill => {
            const dtElement = document.createElement('dt');
            dtElement.className = 'skill-item';
            dtElement.textContent = skill.name;
            dtElement.style.backgroundImage = `url('img/${skill.file}')`;
            
            const ddElement = document.createElement('dd');
            ddElement.className = 'skill-level';
            
            const divElement = document.createElement('div');
            divElement.style.width = skill.level + '%';
            divElement.textContent = skill.level;
            
            ddElement.appendChild(divElement);
            skillList.append(dtElement, ddElement);
        });
    },

    getComparer(prop) {
        return function (a,b) {
            if (a[prop] < b[prop]) {
                return -1;
            }
            if (a[prop] > b[prop]) {
                return 1;
            }
            return 0;
        }
    },

    sortList(type) {
        if (this.sortMode !== type) {
                this.data.sort(this.getComparer(type));
                this.sortMode = type;
                console.log('Отсортировали данные по ' + type);
            } else {
                this.data.reverse();
                console.log('Инвертировали порядок сортировки');
            }
        this.generateList(skillList);
    },

    showErrorMessage(parentElement) {
        parentElement.innerHTML = '';
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.style.cssText = `
            text-align: center;
            color: #ff4444;
            font-size: 18px;
        `;
        errorMessage.textContent = 'Не удалось загрузить данные о навыках.';
        parentElement.appendChild(errorMessage);
    },

    disableSortButtons(disabled) {
        skillSortButtons.forEach(button => {
            button.disabled = disabled;
            if (disabled) {
                button.style.opacity = '0.5';
                button.style.cursor = 'not-allowed';
                button.style.pointerEvents = 'none';
                button.setAttribute('tabindex', '-1');
            } else {
                button.style.opacity = '1';
                button.style.cursor = 'pointer';
                button.style.pointerEvents = 'auto';
                button.removeAttribute('tabindex');
            }
        });
    },

    getData() {
        fetch('db/skills.json')
            .then(data => data.json())
            .then(object => {
                this.data = object;
                this.disableSortButtons(false);
                this.generateList(skillList);
            })
            .catch(error => {
                console.error('Ошибка загрузки данных:', error)
                this.disableSortButtons(true);
                this.showErrorMessage(skillList);
            });
    }
};

const menu = {
    close() {
        nav.classList.add('main-nav_closed');
        navButton.classList.remove('nav-btn_close');
        navButton.classList.add('nav-btn_open');
        navButton.innerHTML = '<span class="visually-hidden">Открыть меню</span>';
    },

    open() {
        nav.classList.remove('main-nav_closed');
        navButton.classList.add('nav-btn_close');
        navButton.classList.remove('nav-btn_open');
        navButton.innerHTML = '<span class="visually-hidden">Закрыть меню</span>';
    }
};

const skillList = document.querySelector('dl.skill-list');
const skillSort = document.querySelector('.skills-buttons');
const skillSortButtons = document.querySelectorAll('.skills-buttons button');
const nav = document.querySelector('.main-nav');
const navButton = document.querySelector('.nav-btn');
const themeSwitch = document.querySelector('.switch-checkbox');
const body = document.querySelector('body');

menu.close();

skills.getData();

skillSort.addEventListener('click', (e) => {
    let target = e.target;
    
    if (target.nodeName === "BUTTON") {
        const type = target.dataset.type;
        switch(type) {
            case 'name':
                skills.sortList(type);
                break;
            case 'level':
                skills.sortList(type);
                break;
            default:
                console.log('Неизвестная кнопка');
        }
    }
});

navButton.addEventListener('click', (e) => {
    if (e.target.classList.contains('nav-btn_open')) {
        menu.open();
    } else {
        menu.close();
    }
});

if (localStorage.getItem('theme') === 'light') {
    body.classList.remove('dark-theme');
    themeSwitch.checked = true;
};

themeSwitch.addEventListener('change', (e) => {
    if (e.target.checked === true) {
        body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
    }
});