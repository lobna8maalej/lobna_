document.addEventListener("DOMContentLoaded", function () {

    var pointsList = document.getElementById("pointsList");
    var addBtn = document.getElementById("addBtn");
    var addInput = document.getElementById("addInput");
    var searchInput = document.getElementById("searchInput");
    var searchMessage = document.getElementById("searchMessage");

    
    var defaultPoints = [
        { name: "Comparaison des prix des produits entre MG et Jumia par catégorie", MG: Math.floor(Math.random() * 20) + 5, Jumia: Math.floor(Math.random() * 20) + 5 },
        { name: "Analyse des promotions et variations de prix selon les périodes", MG: Math.floor(Math.random() * 20) + 5, Jumia: Math.floor(Math.random() * 20) + 5 },
        { name: "Identification des écarts significatifs et opportunités sur le marché", MG: Math.floor(Math.random() * 20) + 5, Jumia: Math.floor(Math.random() * 20) + 5 },
        { name: "Étude des stratégies de tarification pour comprendre la compétitivité", MG: Math.floor(Math.random() * 20) + 5, Jumia: Math.floor(Math.random() * 20) + 5 },
        { name: "Insights sur l’accessibilité des produits et les comportements des consommateurs", MG: Math.floor(Math.random() * 20) + 5, Jumia: Math.floor(Math.random() * 20) + 5 }
    ];

    var points = JSON.parse(localStorage.getItem("commercePoints")) || defaultPoints;

    function savePoints() {
        localStorage.setItem("commercePoints", JSON.stringify(points));
    }
    savePoints();

 
    function renderPoints(filter = "") {
        pointsList.innerHTML = "";

        
        var filteredPoints = filter ? points.filter(p => p.name.includes(filter)) : points;

        filteredPoints.forEach((point, index) => {
            var li = document.createElement("li");
            li.style.marginBottom = "8px";

            var span = document.createElement("span");
            span.textContent = `${point.name}: MG=${point.MG}, Jumia=${point.Jumia}`;
            li.appendChild(span);

            var editBtn = document.createElement("button");
            editBtn.textContent = "Modifier scores";
            editBtn.style.marginLeft = "10px";
            editBtn.onclick = () => {
                point.MG = Math.floor(Math.random() * 20) + 5;
                point.Jumia = Math.floor(Math.random() * 20) + 5;
                savePoints();
                renderPoints(filter); // recalculer pour les points filtrés
                alert(`Nouveaux scores pour "${point.name}": MG=${point.MG}, Jumia=${point.Jumia}`);
            };
            li.appendChild(editBtn);

            var deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Supprimer";
            deleteBtn.style.marginLeft = "5px";
            deleteBtn.onclick = () => {
                const originalIndex = points.indexOf(point);
                points.splice(originalIndex, 1);
                savePoints();
                renderPoints(filter);
            };
            li.appendChild(deleteBtn);

            pointsList.appendChild(li);
        });

        
        var totalMG = filteredPoints.reduce((sum, p) => sum + p.MG, 0);
        var totalJumia = filteredPoints.reduce((sum, p) => sum + p.Jumia, 0);
        var message = totalMG > totalJumia ? "MG est plus compétitif." :
                      totalJumia > totalMG ? "Jumia est plus compétitif." :
                      "MG et Jumia sont équivalents.";

       
        if (filter) {
            searchMessage.textContent = filteredPoints.length 
                ? `${filteredPoints.length} résultat(s) trouvé(s) pour "${filter}". Score total: MG=${totalMG}, Jumia=${totalJumia}. ${message}` 
                : `Aucun résultat trouvé pour "${filter}".`;
        } else {
            searchMessage.textContent = `Score total: MG=${totalMG}, Jumia=${totalJumia}. ${message}`;
        }
    }

    renderPoints();

    addBtn.addEventListener("click", () => {
        var name = addInput.value.trim();
        if (!name) return;
        var MG = Math.floor(Math.random() * 20) + 5;
        var Jumia = Math.floor(Math.random() * 20) + 5;
        points.push({ name, MG, Jumia });
        addInput.value = "";
        savePoints();
        renderPoints(searchInput.value.trim()); 
    });

    searchInput.addEventListener("input", () => {
        renderPoints(searchInput.value.trim()); 
    });

});