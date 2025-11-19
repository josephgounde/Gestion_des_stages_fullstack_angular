# Guide de Dépannage - Page Blanche

## Problèmes identifiés et corrigés

### ✅ 1. URL PostgreSQL corrigée
- **Problème** : Paramètres incorrects dans `application.yml`
- **Solution** : URL corrigée avec `useSSL=false` et `useJDBCCompliantTimezoneShift=true`

### ✅ 2. Boucles de redirection supprimées
- **Problème** : AuthGuard et SessionService créaient des boucles infinies
- **Solution** : Logique simplifiée pour éviter les redirections automatiques

### ✅ 3. Routes enseignant vérifiées
- **Problème** : Routes pointant vers des fichiers inexistants
- **Solution** : Index.ts vérifié et routes corrigées

## Étapes de dépannage

### 1. Vérifier que PostgreSQL est démarré
```bash
# Vérifier le service PostgreSQL
net start postgresql-x64-13
```

### 2. Démarrer le backend
```bash
cd gestionDesStages
mvn spring-boot:run
```

### 3. Vérifier que le backend répond
- Ouvrir http://localhost:8080/swagger-ui.html
- Tester l'endpoint `/api/v1/auth/login`

### 4. Démarrer le frontend
```bash
cd frontend
ng serve --port 4200
```

### 5. Vérifier la console du navigateur
- Ouvrir F12 → Console
- Chercher les erreurs JavaScript
- Vérifier les appels API qui échouent

## Identifiants de test

### Admin
- Email: admin@example.com
- Mot de passe: admin

### Étudiant
- Email: hugo@gmail.com
- Mot de passe: password

### Enseignant
- Email: enseignant@example.com
- Mot de passe: password

### Entreprise
- Email: entreprise@example.com
- Mot de passe: password

## URLs importantes

- **Frontend** : http://localhost:4200
- **Backend** : http://localhost:8080
- **Swagger** : http://localhost:8080/swagger-ui.html
- **Base de données** : localhost:5432/gestionDesStages

## Erreurs communes

### Page blanche
1. Vérifier que les deux serveurs sont démarrés
2. Vérifier la console pour les erreurs JavaScript
3. Vérifier que PostgreSQL est accessible
4. Effacer le cache du navigateur (Ctrl+Shift+R)

### Erreur 401 Unauthorized
1. Vérifier que l'utilisateur existe en base
2. Tester la connexion avec Swagger
3. Vérifier que le JWT est valide

### Erreur de connexion à la base
1. Vérifier que PostgreSQL est démarré
2. Vérifier les identifiants dans application.yml
3. Créer la base `gestionDesStages` si elle n'existe pas

## Script de démarrage automatique

Utiliser le fichier `start-app.bat` pour démarrer automatiquement les deux serveurs.
