#!/usr/bin/env bash

cp lib/components/Modal/index.tsx lib/components/Modal/index.tsx.bkp
grep -v "<style>" lib/components/Modal/index.tsx > tmpfile
sed -i 's/import css from/import/g' tmpfile
cp tmpfile lib/components/Modal/index.tsx
rm tmpfile
tsc -p tsconfig-build.json
cp lib/components/Modal/index.tsx.bkp lib/components/Modal/index.tsx
rm lib/components/Modal/index.tsx.bkp
