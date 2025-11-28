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