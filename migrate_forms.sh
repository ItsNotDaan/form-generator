#!/bin/bash
# Backup all forms that need migration
for file in src/pages/{new-client,old-client,intake-{vlos,osa,steunzolen}}/index.tsx; do
  if [ -f "$file" ]; then
    cp "$file" "$file.backup.old"
  fi
done
echo "Backups created with .backup.old extension"
