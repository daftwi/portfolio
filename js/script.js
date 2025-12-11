const skills = {
    data: [
        {
            name: 'html',
            level: 40,
            file: 'skill=html.svg'
        },
        {
            name: 'css',
            level: 40,
            file: 'skill=css.svg'
        },
        {
            name: 'python',
            level: 70,
            file: 'skill=python.svg'
        },
        {
            name: 'c++',
            level: 30,
            file: 'skill=c++.svg'
        },
        {
            name: 'javascript',
            level: 40,
            file: 'skill=javascript.svg'
        },
        {
            name: 'java',
            level: 80,
            file: 'skill=java.svg'
        },
        {
            name: 'php',
            level: 60,
            file: 'skill=php.svg'
        }
    ],

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
                console.log('отсортировали данные по ' + type);
            } else {
                this.data.reverse();
                console.log('инвертировали порядок сортировки');
            }
        this.generateList(skillList);
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
const nav = document.querySelector('.main-nav');
const navButton = document.querySelector('.nav-btn');

menu.close();

skills.generateList(skillList);

skillSort.addEventListener('click', (e) => {
    let target = e.target;
    
    if (target.nodeName === "BUTTON") {
        switch(target.dataset.type) {
            case 'name':
                skills.sortList(target.dataset.type);
                break;
            case 'level':
                skills.sortList(target.dataset.type);
                break;
            default:
                console.log('неизвестная кнопка');
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
