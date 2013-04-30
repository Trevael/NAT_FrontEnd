#! /bin/bash
## 
OPTS="qr9o"
FILENAME="SIPPY_NAT-FrontEnd"
ZIPFILE="$FILENAME.zip"

if [ -f "$ZIPFILE" ]
	then
	rm "$ZIPFILE"
fi

cd wwwRoot
zip -$OPTS "../$ZIPFILE" * -x robots.txt \*/.DS_Store

echo
echo "=== ZIP file contents: ==="
cd ..
zip -Tv "$ZIPFILE"

echo 
echo "Done creating ZIP file for export"
echo 
