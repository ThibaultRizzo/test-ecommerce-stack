#!/bin/bash

wp core install \
    --path="/var/www/html" \
    --url="http://localhost:8000" \
    --title="$WC_TITLE" \
    --admin_user="$MYSQL_USER" \
    --admin_password="$MYSQL_PASSWORD" \
    --admin_email="$WC_ADMIN_EMAIL"

wp plugin install woocommerce --activate
wp plugin activate woocommerce

if [ ! -z $CONSUMER_KEY ] && [ ! -z $CONSUMER_SECRET ]
then
echo "Starting setup..."
    # Set pretty permalink pour pouvoir utiliser l'api REST
    wp option update permalink_structure '/%postname%'

    # Ajout de quelques produits de base
    wp wc product create \
        --name='Veste en cuir' \
        --type='simple' \
        --regular_price='109.99' \
        --description='Une belle description de produit un peu longue et pas passionante' \
        --short_description='Un bon produit' \
        --user=$MYSQL_USER

    wp wc product create \
        --name='Jupe en daim' \
        --type='simple' \
        --regular_price='219.99' \
        --description='Une belle description de produit un peu longue et pas passionante' \
        --short_description='Un bon produit' \
        --user=$MYSQL_USER

    wp wc product create \
        --name='Chaussure en coton' \
        --type='simple' \
        --regular_price='1.99' \
        --description='Une belle description de produit un peu longue et pas passionante' \
        --short_description='Un bon produit' \
        --user=$MYSQL_USER

else
echo "No CONSUMER_KEY or CONSUMER_SECRET in .env file, setup was stopped..."
fi
