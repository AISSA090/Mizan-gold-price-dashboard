# ⚖️ Mizan — Cours des Métaux Précieux & Estimateur de Bijoux

**Mizan** est une application web vitrine développée sur mesure pour la bijouterie **Al Andalous** à Nador. Elle permet de consulter en temps réel les cours de l'or et de l'argent en Dirhams (MAD), Dollars (USD) et Euros (EUR) via l'API publique `goldprice.dev`, de visualiser l'historique des variations et d'estimer instantanément la valeur d'un bijou au gramme.

---

## ✨ Fonctionnalités principales

* **Cours en temps réel (US-01 & US-02) :** Affichage dynamique des cartes de métaux (prix actuel, variation en valeur et en pourcentage, indicateur de tendance haussière/baissière et horodatage).
* **Convertisseur multi-devises persistant (US-03) :** Basculement fluide entre `MAD`, `USD` et `EUR` sans rechargement de page, avec sauvegarde du choix dans le `localStorage`.
* **Historique sans librairie (US-04) :** Mini-graphique interactif des cours sur les 7 ou 30 derniers jours, généré nativement en DOM/CSS.
* **Estimateur de bijoux au gramme (US-05) :** Calculateur instantané basé sur des fonctions pures, avec validation stricte des saisies.
* **Résilience réseau & États d'interface (US-06) :** Gestion granulaire des états (*Chargement*, *Succès*, *Erreur*) et distinction précise des pannes (Hors-ligne, Erreur réseau, HTTP 4xx/5xx, Quota 429, JSON invalide) avec bouton de relance.
* **Journal des requêtes (US-07 - Bonus) :** Panneau de débogage rétractable traçant la méthode, l'URL, le code HTTP et la durée en millisecondes de chaque appel réseau.

---

## 🛠️ Architecture & Choix Techniques

L'application respecte une séparation stricte des responsabilités grâce aux **Modules ES6 natifs** (`type="module"`), sans aucun framework ni librairie externe :

```text
mizan/
├── index.html          # Structure sémantique de l'interface (en français)
├── style.css           # Styles personnalisés, états visuels et mini-graphique
├── README.md           # Documentation et traces des états réseau
└── js/
    ├── main.js         # Point d'entrée, initialisation et écouteurs d'événements
    ├── api.js          # Module service : appels fetch(), gestion des erreurs et chronométrage
    ├── calculator.js   # Fonctions pures : calcul de valeur au gramme et validation
    ├── storage.js      # Persistance de la devise sélectionnée (localStorage)
    └── ui.js           # Rendu DOM sécurisé (exclusivement via createElement et textContent)
    