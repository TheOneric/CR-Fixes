
TARGET_FILES := $(shell find extension/ -type f -print )
TARGET_DIRS := $(shell find extension/ -type d \! -name 'extension' -exec echo {}/ \;)

#Most common action
all: build $(TARGET_DIRS:extension/%=build/%) $(addprefix build/,$(TARGET_FILES:extension/%=%))
	@echo "Done."


#Creating binaries
release: all bin release.version prerelease.version
	#Abort if preRelease Version is unsuitable or no version is given in manifest
	./checkVersion.sh release.version $(shell awk -f getVersion.awk build/manifest.json)
	./checkVersion.sh prerelease.version $(shell awk -f getVersion.awk build/manifest.json)
	#Build xpi  and  Update last version information
	curVer=$(shell awk -v KEEPDOTS=1 -f getVersion.awk build/manifest.json) && \
	( cd build; zip -r -FS ../bin/cr-fixes_v$${curVer}.xpi * ) && \
	( echo $$curVer > release.version )

preRelease: all bin release.version prerelease.version
	#Abort if preRelease Version is unsuitable
	sh ./checkVersion.sh release.version $(shell awk -f getVersion.awk build/manifest.json)
	sh ./checkVersion.sh prerelease.version $(shell awk -f getVersion.awk build/manifest.json)
	#Build xpi  and  Update last version information
	curVer=$(shell awk -v KEEPDOTS=1 -f getVersion.awk build/manifest.json) && \
	( cd build; zip -r -FS ../bin/cr-fixes_v$${curVer}-pre.xpi * ) && \
	( echo $$curVer > prerelease.version )


#Directory rules
build:
	mkdir -p ./build

build/%/:
	mkdir -p ./$@

bin:
	mkdir -p ./bin


#Special file rules
_IN_PLAYERSETTINGS_DEPENDENCIES := extension/js/in_playerSettings.js extension/js/lib_playerMenu.js extension/js/lib_awaitMatch.js extension/js/lib_general
build/js/in_playerSettings.js: $(_IN_PLAYERSETTINGS_DEPENDENCIES)
	awk -f include.awk $< > $@


#Default rule for non special files
build/%: extension/%
	cp $< $@


#Clean rules
clean:
	rm -fr ./build/

cleanBin:
	rm -fr ./bin/

