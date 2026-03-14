
var projectList = document.getElementById('projectList');
var addBtn = document.getElementById('addBtn');
var projectTitle = document.getElementById('projectTitle');
var projectLink = document.getElementById('projectLink');
var searchInput = document.getElementById('search');

var projects = [
    {
        title: "Traçabilité des Transactions : Numéro de Compte Bancaire et Numéro de Facture",
        link: "https://app.powerbi.com/view?r=eyJrIjoiNDQ0MDRiMjMtZjYwOC00ZWIzLWE3YTEtODI1NDRhYjJlMDY1IiwidCI6ImRiZDY2NjRkLTRlYjktNDZlYi05OWQ4LTVjNDNiYTE1M2M2MSIsImMiOjl9"
    },
    {
        title: "Analyse du Chiffre d’Affaires TTC et de la Clientèle Locale et Internationale",
        link: "https://app.powerbi.com/view?r=eyJrIjoiZmI5NTY2MDItNzc4OC00MzU3LWI4YzgtZmQ3ZDliOGM0ODYxIiwidCI6ImRiZDY2NjRkLTRlYjktNDZlYi05OWQ4LTVjNDNiYTE1M2M2MSIsImMiOjl9"
    },
    {
        title: "Analyse Comparative des Prix : MG vs Jumia",
        link: "https://app.powerbi.com/view?r=eyJrIjoiMzZkYWQwMTItNTU1ZC00YjMzLWFhNjAtMGM3MGNmNjRjYzJhIiwidCI6ImRiZDY2NjRkLTRlYjktNDZlYi05OWQ4LTVjNDNiYTE1M2M2MSIsImMiOjl9"
    },
    {
        title: "Analyse Comparative des Modèles Bancaires : BNA et Zitouna Bank",
        link: "https://app.powerbi.com/view?r=eyJrIjoiNzU0YTRlZDMtYTlhMS00ZjEzLWI0MmMtMjZhMDJkZDYyYzg5IiwidCI6ImRiZDY2NjRkLTRlYjktNDZlYi05OWQ4LTVjNDNiYTE1M2M2MSIsImMiOjl9"
    },
    {
        title: "Étude de la Performance des Agences Immobilières sur le Marché",
        link: "https://app.powerbi.com/view?r=eyJrIjoiNzE1YzUzYWMtMjFmMC00YWVmLWFjMTEtYTU3YjQ5ODI1MWJkIiwidCI6ImRiZDY2NjRkLTRlYjktNDZlYi05OWQ4LTVjNDNiYTE1M2M2MSIsImMiOjl9"
    }
];

if (!localStorage.getItem('projects')) {
    localStorage.setItem('projects', JSON.stringify(projects));
} else {
    projects = JSON.parse(localStorage.getItem('projects'));
}


console.log(JSON.parse(localStorage.getItem('projects')));

function renderProjects(filter = '') {
    projectList.innerHTML = '';

    projects
        .filter(function(p){
            return p.title.toLowerCase().includes(filter.toLowerCase());
        })
        .forEach(function(p, index){

            var li = document.createElement('li');

            li.innerHTML =
                "<strong>" + p.title + "</strong> " +
                '<span style="color: green; font-weight: bold; margin-left: 5px;">[Publié]</span> ' +
                '<a href="' + p.link + '" target="_blank">Voir le Dashboard</a> ' +
                '<button onclick="editProject(' + index + ')">Modifier</button> ' +
                '<button onclick="deleteProject(' + index + ')">Supprimer</button>';

            projectList.appendChild(li);
        });
}


addBtn.addEventListener('click', () => {
    var title = projectTitle.value.trim();
    var link = projectLink.value.trim();

    if (title && link) {
        projects.push({ title, link });
        localStorage.setItem('projects', JSON.stringify(projects));

        
        projectTitle.value = '';
        projectLink.value = '';

      
        renderProjects();
    } else {
        alert('Veuillez remplir les deux champs !');
    }
});


function deleteProject(index) {
    if (confirm('Voulez-vous vraiment supprimer ce projet ?')) {
        projects.splice(index, 1);
        localStorage.setItem('projects', JSON.stringify(projects));
        renderProjects();
    }
}


function editProject(index) {

    var li = projectList.children[index];

    var titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.value = projects[index].title;

    var linkInput = document.createElement("input");
    linkInput.type = "text";
    linkInput.value = projects[index].link;

    var saveBtn = document.createElement("button");
    saveBtn.textContent = "Save";

    saveBtn.onclick = function () {

        projects[index].title = titleInput.value;
        projects[index].link = linkInput.value;

        localStorage.setItem("projects", JSON.stringify(projects));

        renderProjects();
    };

    li.innerHTML = "";
    li.appendChild(titleInput);
    li.appendChild(linkInput);
    li.appendChild(saveBtn);
}
searchInput.addEventListener('input', () => {
    renderProjects(searchInput.value);
});


renderProjects();