#!/usr/bin/awk -f 
BEGIN {SUCC = 0;}

/^[[:space:]]*"version":[[:space:]]*"[0-9]+\.[0-9]+\.[0-9]+"/ {
	SUCC = 1;
	gsub(/^[[:space:]]*"version":[[:space:]]*"/, "");
	gsub(/"[[:space:]]*,[[:space:]]*$/, "");
	if(KEEPDOTS == "") gsub(/\./, " ");
	print $0;
	exit 0;
}

END {if(SUCC) exit 0; else exit 1;}
