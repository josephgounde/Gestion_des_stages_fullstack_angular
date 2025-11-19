# 🧪 **CHECKLIST DE TEST - Système de Rapports Amélioré**

## ✅ **Fonctionnalités à tester**

### **1. Côté Étudiant**

#### **A. Soumission de rapports**
- [ ] **Modal de soumission** s'ouvre correctement
- [ ] **Liste des enseignants** se charge (vérifier console : "Enseignants chargés: X enseignants")
- [ ] **Sélection enseignant** obligatoire (erreur si non sélectionné)
- [ ] **Choix du statut** : "Soumis pour validation" / "Version finale"
- [ ] **Entreprise du stage** s'affiche dans la modal
- [ ] **Soumission réussie** avec message de succès
- [ ] **Notification envoyée** à l'enseignant sélectionné

#### **B. Visualisation des rapports**
- [ ] **Informations de soumission** visibles après soumission
- [ ] **Statut coloré** : Brouillon (gris), Soumis (bleu), Validé (vert), Rejeté (rouge)
- [ ] **Date de soumission** affichée correctement
- [ ] **Enseignant destinataire** affiché
- [ ] **Entreprise du stage** mise en évidence
- [ ] **Commentaires enseignant** visibles si présents

#### **C. Profil étudiant**
- [ ] **Upload photo** fonctionne
- [ ] **Avatar se met à jour** dans le header après upload
- [ ] **Mise à jour profil** avec nom/prénom séparés
- [ ] **Données sauvegardées** correctement

### **2. Côté Enseignant**

#### **A. Page des rapports (/enseignant/rapports)**
- [ ] **Liste des rapports** assignés à l'enseignant
- [ ] **Filtrage par statut** fonctionne
- [ ] **Nom étudiant** affiché au lieu de l'email
- [ ] **Entreprise** et **semaine** visibles
- [ ] **Date de soumission** formatée correctement

#### **B. Actions sur les rapports**
- [ ] **Voir** : Modal de visualisation complète
- [ ] **Valider** : Modal avec commentaires optionnels
- [ ] **À modifier** : Modal avec commentaires obligatoires
- [ ] **Rejeter** : Modal avec motif obligatoire
- [ ] **Actions appliquées** avec succès
- [ ] **Statuts mis à jour** automatiquement

#### **C. Profil enseignant (/enseignant/profil)**
- [ ] **Upload photo** fonctionne
- [ ] **Champs spécifiques** : département, spécialité
- [ ] **Mise à jour profil** sauvegardée
- [ ] **Avatar header** mis à jour

### **3. Système général**

#### **A. Images et proxy**
- [ ] **Proxy Angular** actif (redémarrer avec `npm start`)
- [ ] **Images de profil** se chargent depuis `/files/`
- [ ] **Pas d'erreur 404** sur les images
- [ ] **Console backend** affiche les demandes de fichiers

#### **B. Base de données**
- [ ] **Enseignant destinataire** persisté dans `rapport_hebdomadaire`
- [ ] **Date de soumission** enregistrée
- [ ] **Commentaires enseignant** sauvegardés
- [ ] **Statuts** mis à jour correctement

#### **C. Notifications**
- [ ] **Notification créée** lors de la soumission
- [ ] **Notification reçue** par l'enseignant
- [ ] **Compteur notifications** mis à jour

## 🚀 **Instructions de test**

### **Étape 1 : Redémarrage des serveurs**
```bash
# Backend
cd gestionDesStages
./mvnw spring-boot:run

# Frontend (IMPORTANT: avec proxy)
cd frontend
npm start
```

### **Étape 2 : Test étudiant**
1. Se connecter en tant qu'étudiant
2. Aller sur `/rapports`
3. Créer un rapport ou modifier un existant
4. Cliquer "Soumettre"
5. Vérifier la modal, sélectionner enseignant, soumettre
6. Vérifier les informations de soumission

### **Étape 3 : Test enseignant**
1. Se connecter en tant qu'enseignant
2. Aller sur `/enseignant/rapports`
3. Vérifier la liste des rapports
4. Tester les actions : Voir, Valider, Modifier, Rejeter
5. Vérifier les changements de statut

### **Étape 4 : Test profils**
1. Tester upload photo étudiant et enseignant
2. Vérifier mise à jour des profils
3. Contrôler que l'avatar header se met à jour

## 🐛 **Problèmes connus à vérifier**

- [ ] **Images 404** : Vérifier que le proxy fonctionne
- [ ] **Enseignants vides** : Vérifier l'endpoint `/enseignants/all`
- [ ] **Date non affichée** : Vérifier le format de date
- [ ] **Nom étudiant manquant** : Vérifier `etudiantDetails` dans le DTO

## 📝 **Logs à surveiller**

### **Console Frontend**
```
✅ Enseignants chargés: X enseignants
✅ Rapport soumis avec succès
✅ Photo uploadée avec succès
✅ Image rechargée depuis le serveur
```

### **Console Backend**
```
=== SOUMISSION RAPPORT ÉTUDIANT ===
EnseignantId Long: X
✅ Rapport soumis avec succès
=== DEMANDE FICHIER ===
✅ Fichier trouvé: filename.jpg
```

## ✅ **Critères de succès**

Le système est fonctionnel si :
1. **Toutes les modales** sont stylées et cohérentes
2. **Les enseignants** se chargent et sont sélectionnables
3. **Les soumissions** fonctionnent avec persistance BD
4. **Les images** se chargent sans erreur 404
5. **Les profils** se mettent à jour correctement
6. **Les notifications** sont envoyées et reçues
7. **Les statuts** se synchronisent automatiquement

---
**🎉 Si tous les tests passent, le système de rapports est entièrement fonctionnel !**
