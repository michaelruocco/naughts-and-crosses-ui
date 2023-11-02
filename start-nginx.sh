#!/usr/bin/env /bin/sh
cd /usr/share/nginx/html
export EXISTING_VARS=$(printenv | awk -F= '{print $1}' | sed 's/^/\$/g' | paste -sd,);
cat bundle.js | envsubst $EXISTING_VARS > temp.bundle.js
cp -f temp.bundle.js bundle.js
rm temp.bundle.js
nginx -g 'daemon off;'