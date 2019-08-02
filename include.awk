#!/usr/bin/awk -f 

/^\/\/#INCLUDE / {
	inFile = $2;
	while((getline < inFile) == 1) {
		print;
	}
	next;
}

1 {print $0}

