#!/bin/sh

# Strictly POSIX compliant shell script
#Exits with 0 if version given in file is lower than version given with $2.$3.$4

if [ "$#" -lt 4 ] ; then
	echo "Not enough arguments !"
	echo $@
	echo "Usage: checkVersion.sh <file-input> <maj-ver> <min-ver> <patch-lvl>"
	exit 1
fi

i=1
dif=0
#cat $1
IFS=.
set -f
for REPLY in $(cat "$1") ; do
	i="$(echo "$i + 1" | bc)"
	#echo "$i" 
	if [ "$REPLY" -gt "$(eval echo \$$i)" ] ; then
		echo "[ERROR] Version to low !"
		exit 2
	elif [ "$REPLY" -ne "$(eval echo -n \$$i)" ] ; then
		dif=1
	fi
done
#Bash-Alternative for for loop:
#while IFS=  read -r -d '.'; do
#done < "$1"

if [ $dif -eq 0 ] ; then
	echo "[WARNING] Same version already built !"
	exit 3
else
	exit 0
fi

