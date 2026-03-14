document.addEventListener("DOMContentLoaded", function () {

    // --- Sélecteurs DOM ---
    var pointsList = document.getElementById("pointsList");
    var addBtn = document.getElementById("addPoint");
    var newPointInput = document.getElementById("newPoint");
    var searchInput = document.getElementById("searchInput");
    var searchMessage = document.getElementById("searchtransaction");

    // --- Points par défaut ---
    var defaultPoints = [
        "Analyse du numéro de compte bancaire global et de son rôle dans la sécurité des transactions.",
        "Examen du numéro de facture et de sa conformité aux réglementations fiscales.",
        "Comparaison entre les deux pour comprendre leur rôle dans la traçabilité des transactions.",
        "Identification des différences de structure, d’utilisation et de régulation.",
        "Insights sur l’importance de la traçabilité et de la conformité légale."
    ];

    // --- Charger depuis localStorage ou utiliser les points par défaut ---
    var points = JSON.parse(localStorage.getItem("transactionPoints")) || defaultPoints;

    // --- Sauvegarder dans localStorage ---
    function savePoints() {
        localStorage.setItem("transactionPoints", JSON.stringify(points));
        console.log("Points sauvegardés :", points);
    }
    savePoints();

    // --- Affichage des points ---
    function renderPoints(filteredPoints) {
        pointsList.innerHTML = "";
        (filteredPoints || points).forEach((point, index) => {
            var li = document.createElement("li");
            li.textContent = point;

            // Bouton Edit
            var editBtn = document.createElement("button");
            editBtn.textContent = "Edit";
            editBtn.style.marginLeft = "10px";
            editBtn.onclick = function() {
                var newText = prompt("Modifier le point :", point);
                if (newText) {
                    points[index] = newText.trim();
                    savePoints();
                    renderPoints();
                }
            };

            // Bouton Supprimer
            var deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Supprimer";
            deleteBtn.style.marginLeft = "5px";
            deleteBtn.onclick = function() {
                if (confirm("Voulez-vous vraiment supprimer ce point ?")) {
                    points.splice(index, 1);
                    savePoints();
                    renderPoints();
                }
            };

            li.appendChild(editBtn);
            li.appendChild(deleteBtn);
            pointsList.appendChild(li);
        });
    }

    // --- Affichage initial ---
    renderPoints();

    // --- Ajouter un nouveau point ---
    addBtn.addEventListener("click", function() {
        var text = newPointInput.value.trim();
        if (text) {
            points.push(text);
            newPointInput.value = "";
            savePoints();
            renderPoints();
        }
    });

    // --- Recherche / Filtre ---
    searchInput.addEventListener("input", function() {
        var filter = searchInput.value.trim();
        if (!filter) {
            renderPoints();
            searchMessage.textContent = "";
        } else {
            var filtered = points.filter(p => p.includes(filter)); // recherche sensible à la casse
            renderPoints(filtered);
            searchMessage.textContent = filtered.length ? "" : "Aucun résultat trouvé.";
        }
    });

});