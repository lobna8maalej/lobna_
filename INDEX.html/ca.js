
document.addEventListener("DOMContentLoaded", () => {
    var ul = document.getElementById("pointsList");
    var searchInput = document.getElementById("searchInput");
   var newPointText = document.getElementById("newPointText");
    var newPointEuro = document.getElementById("newPointEuro");
    var addPointBtn = document.getElementById("addPointBtn");
    var searchMessage = document.getElementById("searchMessage");

    
    let points = JSON.parse(localStorage.getItem("caPoints")) ||
                 Array.from(ul.querySelectorAll("li")).map(li => ({ text: li.textContent.trim(), euro: 0 }));

   
    function savePoints() {
        localStorage.setItem("caPoints", JSON.stringify(points));
    }

    savePoints();


    function renderPoints(filter = "") {
        ul.innerHTML = "";
        let count = 0;
        let totalEuro = 0;

        points.forEach((point, index) => {
            // Filtre
            if (filter && !point.text.includes(filter)) return;

            count++;
            totalEuro += point.euro || 0;

            var li = document.createElement("li");
            li.style.display = "flex";
            li.style.alignItems = "center";
            li.style.marginBottom = "5px";

           
            var textSpan = document.createElement("span");
            textSpan.textContent = point.text;
            textSpan.style.flex = "1";
            li.appendChild(textSpan);

           
           var tnd = (point.euro || 0) * 3.3;
            var amountSpan = document.createElement("span");
            amountSpan.textContent = ` → ${point.euro || 0} € / ${tnd.toFixed(2)} TND`;
            amountSpan.style.marginLeft = "5px";
            li.appendChild(amountSpan);

            
            var editBtn = document.createElement("button");
            editBtn.textContent = "Modifier";
            editBtn.style.marginLeft = "5px";
            editBtn.onclick = () => {
               var newText = prompt("Modifier le texte :", point.text);
               var newEuro = parseFloat(prompt("Modifier le montant (€) :", point.euro));
                if (newText !== null && !isNaN(newEuro)) {
                    point.text = newText.trim();
                    point.euro = newEuro;
                    savePoints();
                    renderPoints(searchInput.value.trim());
                }
            };
            li.appendChild(editBtn);

          
            var delBtn = document.createElement("button");
            delBtn.textContent = "Supprimer";
            delBtn.style.marginLeft = "5px";
            delBtn.onclick = () => {
                if (confirm("Voulez-vous supprimer ce point ?")) {
                    points.splice(index, 1);
                    savePoints();
                    renderPoints(searchInput.value.trim());
                }
            };
            li.appendChild(delBtn);

            ul.appendChild(li);
        });

      
        if (!filter) {
            searchMessage.textContent = "Tapez un mot pour rechercher.";
        } else if (count === 0) {
            searchMessage.textContent = `Aucun résultat trouvé pour : ${filter}`;
        } else {
           var totalTND = totalEuro * 3.3;
            searchMessage.textContent = `${count} point(s) trouvé(s) → ${totalEuro} € / ${totalTND.toFixed(2)} TND`;
        }
    }

   
    addPointBtn.addEventListener("click", () => {
       var text = newPointText.value.trim();
       var euro = parseFloat(newPointEuro.value);
        if (!text) return alert("Veuillez entrer un texte !");
        if (isNaN(euro)) return alert("Veuillez entrer un montant valide !");
        points.push({ text, euro });
        newPointText.value = "";
        newPointEuro.value = "";
        savePoints();
        renderPoints(searchInput.value.trim());
    });

  
    newPointText.addEventListener("keypress", (e) => {
        if (e.key === "Enter") addPointBtn.click();
    });

    
    searchInput.addEventListener("input", () => {
        renderPoints(searchInput.value.trim());
    });

   
    renderPoints();
});