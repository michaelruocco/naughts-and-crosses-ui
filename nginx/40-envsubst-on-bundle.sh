cd /usr/share/nginx/html
export existing_vars=$(printenv | awk -F= '{print $1}' | sed 's/^/\$/g' | paste -sd,);
cat bundle.js | envsubst $existing_vars > temp.bundle.js && cp -pf "temp.bundle.js" bundle.js