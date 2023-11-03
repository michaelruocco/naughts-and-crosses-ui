#!/usr/bin/env /bin/sh

export EXISTING_VARS=$(printenv | awk -F= '{print $1}' | sed 's/^/\$/g' | paste -sd,);
cd /etc/nginx/conf.d/
cat default.conf | envsubst $EXISTING_VARS > temp.default.conf
cp -f temp.default.conf default.conf
rm temp.default.conf

nginx -g 'daemon off;'