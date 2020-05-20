'use strict';
/*
*   This file is part of CR-Fixes.

    CR-Fixes is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    CR-Fixes is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with CR-Fixes.  If not, see <http://www.gnu.org/licenses/>.

	Copyright 2019  Oneric  https://github.com/TheOneric , https://oneric.de
*/

/** 
D	9	Log Debug messages and below
I	2	Log Informational Messages and below
W	1	Log Warnings and below
E	0	Only log errors
For storage purposes it is encouraged to use string values, as the numeric values may change in the future.
*/
var CRF_LOG_LEVEL = "D";
browser.storage.sync.get(["logLevel"]).then(
	s => CRF_LOG_LEVEL = s.logLevel, 
	e => crfLogError("Unable to retrieve log level settings:\n"+e)
);



function crfLog(level, msg) {
	switch(level) {
		case "D":
			crfLogDebug(msg);
			break;
		case "I":
			crfLogInfo(msg);
			break;
		case "W":
			crfLogWarning(msg);
			break;
		default:
			crfLogError(msg);
			break;
	}
}

function crfLogDebug(msg) {
	if(crfLogLevelComparsion("D", CRF_LOG_LEVEL) <= 0)
		console.log("[CRF][DEBUG]: "+msg)
}

function crfLogInfo(msg) {
	if(crfLogLevelComparsion("I", CRF_LOG_LEVEL) <= 0)
		console.log("[CRF][INFO]: "+msg)
}

function crfLogWarning(msg) {
	if(crfLogLevelComparsion("W", CRF_LOG_LEVEL) <= 0)
		console.log("[CRF][WARNING]: "+msg)
}

function crfLogError(msg) {
	if(crfLogLevelComparsion("E", CRF_LOG_LEVEL) <= 0)
		console.log("[CRF][ERROR]: "+msg)
}


/**
@return Negative if lv1 < lv2; 0 if lv1 === lv2; Positive if lv1 > lv2; \
	    NaN if lv1 or lv2 are not valid logLevels
*/
function crfLogLevelComparsion(lv1, lv2) {
	if(lv1 === lv2) return 0;
	switch(lv1) {
		case "D":
			switch (lv2) {
				case "D":
				case "I":
				case "W":
				case "E":
					return +1;
				default:
					return NaN;
			}
		break;
		case "I":
			switch (lv2) {
				case "D":
					return -1;
				case "I":
				case "W":
				case "E":
					return +1;
				default:
					return NaN;
			}
		break;
		case "W":
			switch (lv2) {
				case "D":
				case "I":
					return -1;
				case "W":
				case "E":
					return +1;
				default:
					return NaN;
			}
		break;
		case "E":
			switch (lv2) {
				case "D":
				case "I":
				case "W":
					return -1;
				case "E":
					return +1;
				default:
					return NaN;
			}
		break;

	}
}

/** https://stackoverflow.com/a/9716488 */
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
