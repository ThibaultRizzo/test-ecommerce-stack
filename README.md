## Presentation de la stack
Tres influence par ce tuto: https://medium.com/geekculture/headless-woocommerce-next-js-create-a-local-wordpress-with-woocommerce-4411b24a160e

- Doc de l'api REST de woocommerce: https://woocommerce.github.io/woocommerce-rest-api-docs/#rest-api-keys

Ce projet permet de mettre en place rapidemment en local un environnement de developpement avec un serveur woocommerce qui expose une API standardisee de site e-commerce. Le front est une app NextJS (avec typescript).


## Mode d'emploi sur la creation de la stack en local

### PRE-REQUIS:
- Installer docker: https://docs.docker.com/get-docker/

### Etapes
1. Lancer le setup de la stack docker
```bash
./cli setup
```

Cette petite commande va execute la fonction "start" dans le fichier "cli".
Cette fonction va demarrer trois containers:
a. xamp-wordpress: notre container qui fait tourner le backend wordpress
b. zamp-mariadb: notre container qui fait tourner notre base de donnee
c. xamp-phpmyadmin: notre container qui fait tourner phpmyadmin pour administrer notre db

La fonction va egalement "run" (executer) une tache dans un container pour appliquer les etapes suivantes:
- Installation et configuration de l'application wordpress avec un admin user ( admin/somewordpress ) et creation des tables wordpress necessaires dans la base de donnee
- Installation du plugin woocommerce
- Activation du plugin woocommerce
- Creation de plusieurs produits pour commencer


2. Creer une cle d'authentification pour des appels REST et l'ajouter au .env
- Aller a http://localhost:8000/wp-admin/admin.php?page=wc-settings&tab=advanced&section=keys et se connecter avec username: wordpress/ password: wordpress
- Cliquer sur le bouton "Add key"
- Ajouter pour la description "Cle admin", pour le user, laisser le user "wordpress" selectionné, pour les permissions: "read/write"
- Cliquer sur "Generate API key"
- Ajouter la "consumer key" dans le fichier .env devant la variable CONSUMER_KEY
- Ajouter la "consumer secret" dans le fichier .env devant la variable CONSUMER_SECRET

3. Aller dans l'interface de configuration de la boutique et changer la monnaie a euro: Woocommerce > Settings > Currency
4. Relancer le script d'initialisation
> ./cli setup

Cela va:
- activer l'api REST
- ajouter trois produits pour commencer
- modifier le nom du dossier contenant l'application front
- installer les dependences front
- Editer le fichier .env de l'application front pour inserer les secrets necessaires


5. Ajouter quelques produits via l'interface

### URL utiles
-> Acces a l'application: http://localhost:8000
-> Acces a l'interface admin: http://localhost:8000/wp-admin avec admin/somewordpress comme username/mot de passe
-> Acces aux endpoints disponibles: http://localhost:8000/wp-json/wc/v3
