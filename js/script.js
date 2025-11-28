const skills = {
    data: [
        {
            name: 'html',
            level: 40,
            class: 'skill-item_html',
            file: 'skill=html.svg'
        },
        {
            name: 'css',
            level: 40,
            class: 'skill-item_css',
            file: 'skill=css.svg'
        },
        {
            name: 'python',
            level: 70,
            class: 'skill-item_python',
            file: 'skill=python.svg'
        },
        {
            name: 'c++',
            level: 30,
            class: 'skill-item_cpp',
            file: 'skill=c++.svg'
        },
        {
            name: 'javascript',
            level: 40,
            class: 'skill-item_javascript',
            file: 'skill=javascript.svg'
        },
        {
            name: 'java',
            level: 80,
            class: 'skill-item_java',
            file: 'skill=java.svg'
        },
        {
            name: 'php',
            level: 60,
            class: 'skill-item_php',
            file: 'skill=php.svg'
        }
    ],

    generateList(parentElement) {
        this.data.forEach(skill => {
            const dtElement = document.createElement('dt');
            dtElement.className = 'skill-item';
            dtElement.textContent = skill.name;
            dtElement.style.backgroundImage = `url('../img/${skill.file}')`;
            
            const ddElement = document.createElement('dd');
            ddElement.className = 'skill-level';
            
            const divElement = document.createElement('div');
            divElement.style.width = skill.level + '%';
            divElement.textContent = skill.level;
            
            ddElement.appendChild(divElement);
            skillList.appendChild(dtElement);
            skillList.appendChild(ddElement);
        });
    }
}

const skillList = document.querySelector('dl.skill-list');

skills.generateList(skillList);