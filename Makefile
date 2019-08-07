
TARGET_FILES := $(shell find extension/ -type f -print )
TARGET_DIRS := $(shell find extension/ -type d \! -name 'extension' -exec echo {}/ \;)

#Most common action
all: build $(TARGET_DIRS:extension/%=build/%) $(addprefix build/,$(TARGET_FILES:extension/%=%))
	@echo "Done."


#Creating binaries
release: all bin release.version prerelease.version
	#TODO

preRelease: all bin release.version prerelease.version
	#TODO


#Directory rules
build:
	mkdir -p ./build

build/%/:
	mkdir -p ./$@

bin:
	mkdir -p ./bin


#Special file rules
build/js/in_playerSettings.js: extension/js/in_playerSettings.js extension/js/lib_playerMenu.js extension/js/lib_awaitMatch.js
	awk -f include.awk $< > $@


#Default rule for non special files
build/%: extension/%
	cp $< $@


#Clean rules
clean:
	rm -fr ./build/

cleanBin:
	rm -fr ./bin/

