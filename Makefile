
TARGET_FILES := $(shell find extension/ -type f -print )

all: build $(addprefix build/,$(TARGET_FILES:extension/%=%))
	#echo 
	echo "Done."
	

build:
	mkdir -p ./build/js
	mkdir -p ./build/extension_pages
	mkdir -p ./build/css
	mkdir -p ./build/img

build/js/in_playerSettings.js: extension/js/in_playerSettings.js extension/js/lib_playerMenu.js extension/js/lib_awaitMatch.js
	awk -f include.awk $< > $@

build/%: extension/%
	cp $< $@


