document.addEventListener("DOMContentLoaded", () => {
    // Points clés du projet
    var ul = document.getElementById("pointsList");
   var searchInput = document.getElementById("searchInput");
    var addInput = document.getElementById("addInput");
    var addBtn = document.getElementById("addBtn");
   var searchMessage = document.getElementById("searchMessage");

    // Barres et messages
   var bnaBar = document.getElementById("bnaBar");
    var zitounaBar = document.getElementById("zitounaBar");
   var winnerMessage = document.getElementById("winnerMessage");

    // Inputs taux
    var bnaInput = document.getElementById("bnaInput");
   var zitounaInput = document.getElementById("zitounaInput");
    var calcBtn = document.getElementById("calcBtn");

   
   var points = JSON.parse(localStorage.getItem("banquePoints")) ||
        Array.from(ul.querySelectorAll("li")).map(li => li.textContent.trim());

    function savePoints() {
        localStorage.setItem("banquePoints", JSON.stringify(points));
    }
    savePoints()
    function renderPoints(filter = "") {
        ul.innerHTML = "";

        var filteredPoints = points.filter(point =>
            point.toLowerCase().includes(filter.toLowerCase())
        );

       var count = filteredPoints.length;

        filteredPoints.forEach(point => {
          var li = document.createElement("li");
            li.style.display = "flex";
            li.style.alignItems = "center";
            li.style.marginBottom = "5px";

           var span = document.createElement("span");
            span.textContent = point;
            span.style.flex = "1";
            li.appendChild(span);

            
            var editBtn = document.createElement("button");
            editBtn.textContent = "Modifier";
            editBtn.style.marginLeft = "5px";
            editBtn.onclick = () => {
                var newValue = prompt("Modifier le texte :", point);
                if (newValue && newValue.trim() !== "") {
                   var index = points.indexOf(point);
                    points[index] = newValue.trim();
                    savePoints();
                    renderPoints(searchInput.value);
                }
            };
            li.appendChild(editBtn);

            
           var delBtn = document.createElement("button");
            delBtn.textContent = "Supprimer";
            delBtn.style.marginLeft = "5px";
            delBtn.onclick = () => {
               var index = points.indexOf(point);
                points.splice(index, 1);
                savePoints();
                renderPoints(searchInput.value);
            };
            li.appendChild(delBtn);

            ul.appendChild(li);
        });

        if (filter === "") {
            searchMessage.textContent = "Tapez un mot pour rechercher.";
        } else if (count === 0) {
            searchMessage.textContent = "Aucun résultat trouvé.";
        }
    }

   
    addBtn.addEventListener("click", () => {
        const text = addInput.value.trim();
        if (!text) return alert("Veuillez entrer un texte !");
        points.push(text);
        savePoints();
        addInput.value = "";
        renderPoints(searchInput.value);
    });

    searchInput.addEventListener("input", () => {
        renderPoints(searchInput.value);
    });

   
    calcBtn.addEventListener("click", () => {
        var bnaRates = bnaInput.value.split(",").map(r => parseFloat(r.trim())).filter(r => !isNaN(r));
        var zitounaRates = zitounaInput.value.split(",").map(r => parseFloat(r.trim())).filter(r => !isNaN(r));

       var bnaScore = bnaRates.length ? bnaRates.reduce((a, b) => a + b, 0) / bnaRates.length : 0;
       var zitounaScore = zitounaRates.length ? zitounaRates.reduce((a, b) => a + b, 0) / zitounaRates.length : 0;
       var difference = bnaScore - zitounaScore;

        searchMessage.textContent =
            "Taux moyen BNA = " + bnaScore.toFixed(2) + "% | Taux moyen Zitouna = " +
            zitounaScore.toFixed(2) + "% | Écart = " + difference.toFixed(2) + "%";

        // Mise à jour des barres
        bnaBar.style.width = Math.min(bnaScore, 100) + "%";
        zitounaBar.style.width = Math.min(zitounaScore, 100) + "%";

        // Message gagnant
        if (bnaScore > zitounaScore) {
            winnerMessage.textContent = "BNA offre le taux le plus compétitif.";
        } else if (zitounaScore > bnaScore) {
            winnerMessage.textContent = "Zitouna Bank offre le taux le plus compétitif.";
        } else {
            winnerMessage.textContent = "Les deux banques sont équivalentes.";
        }
    });

    // Affichage initial
    renderPoints();
});

    