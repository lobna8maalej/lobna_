
document.addEventListener("DOMContentLoaded", () => {
    var pointsList = document.getElementById("pointsList");
    var searchInput = document.getElementById("searchInput");
    var searchMessage = document.getElementById("searchMessage");

    // Récupérer tous les h1 comme points
   var points = Array.from(pointsList.querySelectorAll("h1")).map(h => h.textContent.trim());

    function savePoints() {
        localStorage.setItem("immobilierPoints", JSON.stringify(points));
    }
     savePoints()
    function renderPoints(filter = "") {
        // Vider la liste
        pointsList.innerHTML = "";

        // Filtrer les points
        const filteredPoints = points.filter(point =>
            point.toLowerCase().includes(filter.toLowerCase())
        );

        var count = filteredPoints.length;

        // Afficher les points filtrés
        filteredPoints.forEach(point => {
            const h = document.createElement("h1");
            h.textContent = point;
            h.style.marginBottom = "5px";
            h.style.padding = "5px";

            // Calcul du score pour ce point
            var agenceA_score = 0;
            var agenceB_score = 0;
           var lower = point.toLowerCase();
            if (lower.includes("réputation") || lower.includes("expérience")) agenceA_score += 3;
            if (lower.includes("qualité") || lower.includes("diversité")) agenceB_score += 3;
            if (lower.includes("performance") || lower.includes("stratégie")) {
                agenceA_score += 2;
                agenceB_score += 2;
            }

            // Couleur selon la compétitivité
            if (agenceA_score > agenceB_score) h.style.backgroundColor = "#f8d7da"; // rouge clair
            else if (agenceB_score > agenceA_score) h.style.backgroundColor = "#d1ecf1"; // bleu clair
            else h.style.backgroundColor = "#f2f2f2"; // gris clair

            // Bouton Modifier
            var editBtn = document.createElement("button");
            editBtn.textContent = "Modifier";
            editBtn.style.marginLeft = "10px";
            editBtn.onclick = () => {
                var newValue = prompt("Modifier le texte :", point);
                if (newValue && newValue.trim() !== "") {
                    var index = points.indexOf(point);
                    points[index] = newValue.trim();
                    savePoints();
                    renderPoints(searchInput.value.trim());
                }
            };
            h.appendChild(editBtn);

            // Bouton Supprimer
           var delBtn = document.createElement("button");
            delBtn.textContent = "Supprimer";
            delBtn.style.marginLeft = "5px";
            delBtn.onclick = () => {
               var index = points.indexOf(point);
                points.splice(index, 1);
                savePoints();
                renderPoints(searchInput.value.trim());
            };
            h.appendChild(delBtn);

            pointsList.appendChild(h);
        });

        if (filter === "") {
            searchMessage.textContent = "Tapez un mot pour rechercher.";
        } else if (count === 0) {
            searchMessage.textContent = "Aucun résultat trouvé.";
        } else {
            let totalA = 0;
            let totalB = 0;

            filteredPoints.forEach(point => {
                var lower = point.toLowerCase();
                if (lower.includes("réputation") || lower.includes("expérience")) totalA += 3;
                if (lower.includes("qualité") || lower.includes("diversité")) totalB += 3;
                if (lower.includes("performance") || lower.includes("stratégie")) {
                    totalA += 2;
                    totalB += 2;
                }
            });

            var diff = totalA - totalB;
            searchMessage.textContent = `${count} résultat(s) trouvé(s) : Score Agence A = ${totalA} | Score Agence B = ${totalB} | Écart = ${diff}`;
        }
    }

    // Ajouter un point
    var addInput = document.createElement("input");
    addInput.type = "text";
    addInput.placeholder = "Ajouter un nouveau point";
    var addBtn = document.createElement("button");
    addBtn.textContent = "Ajouter";
    addBtn.style.marginLeft = "5px";

    addBtn.onclick = () => {
       var text = addInput.value.trim();
        if (!text) return alert("Veuillez entrer un texte !");
        points.push(text);
        savePoints();
        addInput.value = "";
        renderPoints(searchInput.value.trim());
    };

    pointsList.parentNode.insertBefore(addInput, pointsList);
    pointsList.parentNode.insertBefore(addBtn, pointsList);

    // Recherche en temps réel
    searchInput.addEventListener("input", () => {
        renderPoints(searchInput.value.trim());
    });

    // Chargement initial
    renderPoints();
});