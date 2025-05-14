#!/bin/bash

# Beende das Skript bei einem Fehler
set -e

# Setze den Ordnernamen
FOLDER="build"

# Lösche den Ordner rekursiv, falls er existiert
if [ -d "$FOLDER" ]; then
  rm -rf "$FOLDER"
fi

# Erstelle den Ordner
mkdir -p "$FOLDER/karel"
mkdir -p "$FOLDER/karel/src"

# Kopiere die Dateien in den Ordner
cp \
  README.md \
  tsconfig.json \
  index.html \
  Karel.ts \
  "$FOLDER/karel/"
cp src/script.ts "$FOLDER/karel/src"

# Zippe den Ordner
zip -r "${FOLDER}/karel.zip" "$FOLDER/karel"
