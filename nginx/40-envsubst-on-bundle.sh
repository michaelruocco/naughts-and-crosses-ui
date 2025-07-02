cd /usr/share/nginx/html
export existing_vars=$(printenv | awk -F= '{print $1}' | sed 's/^/\$/g' | paste -sd,);

for filename in *bundle.js; do
    echo "performing envsubst for $existing_vars on $filename"
    cat $filename | envsubst $existing_vars > temp.$filename && mv temp.$filename $filename
done