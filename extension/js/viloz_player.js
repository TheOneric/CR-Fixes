/*
 * This file does NOT fall under the GPL license.
 * */
function VilosPlayer() {
    function a(a) {
        i.getCurrentTime(function(b) {
            i.getDuration(function(c) {
                var d = b + a;
                d < c && i.setCurrentTime(d)
            })
        })
    }

    function b(a) {
        i.getCurrentTime(function(b) {
            var c = b - a;
            i.setCurrentTime(c > 0 ? c : 0)
        })
    }

    function c() {
        i.getPaused(function(a) {
            a ? i.play() : i.pause()
        })
    }

    function d() {
        i.getMuted(function(a) {
            a ? i.unmute() : i.mute()
        })
    }

    function e() {
        var a = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
        return !!a
    }

    function f() {
        function a(a, b) {
            a.some(function(a) {
                if (a in b) return b[a](), !0
            })
        }

        function b() {
            var b = ["requestFullscreen", "mozRequestFullScreen", "webkitRequestFullscreen", "msRequestFullscreen"];
            a(b, j)
        }

        function c() {
            var b = ["exitFullscreen", "mozCancelFullScreen", "webkitExitFullscreen"];
            a(b, document)
        }
        e() === !1 ? b() : c()
    }

    function g(e) {
        var g = 32,
            h = 37,
            i = 39,
            j = 5,
            k = 77,
            l = 70;
        switch (e) {
            case g:
                c();
                break;
            case h:
                b(j);
                break;
            case i:
                a(j);
                break;
            case k:
                d();
                break;
            case l:
                f()
        }
    }

    function h(a, b) {
        var c = document.createElement("iframe");
        c.setAttribute("src", a.src), c.setAttribute("frameborder", 0), c.setAttribute("width", "100%"), c.setAttribute("height", "100%"), c.setAttribute("id", a.id), c.setAttribute("allowfullscreen", "allowfullscreen"), c.setAttribute("allow", "autoplay; encrypted-media *"), document.querySelector(b).append(c)
    }
    var i, j, k = "vilos-player";
    this.config = {
        client: "crunchyroll-web",
        player: {
            target: "#player",
            language: "enUS",
            autoplay: !0,
            settings_menu: {
                enabled: !0,
                quality: {
                    enabled: !0
                }
            },
            preferred_volume: 1,
            pause_screen: [{
                classes: ["pause-text"],
                text: "Paused"
            }, {
                classes: ["episode-title"],
                text: "Episode Title"
            }],
            start_offset: 0
        },
        media: {},
        analytics: {},
        app: {
            page_path: window.location.pathname,
            page_title: document.title,
            page_url: window.location.href
        }
    }, this.load = function(a, b, c) {
        var d = this.config,
            e = 100 * this.config.player.preferred_volume;
        document.domain = document.domain, h({
            src: b,
            id: k
        }, a), j = document.getElementById(k), i = new playerjs.Player(k), window.VILOS_PLAYERJS = i, i.setVolume(e), j.addEventListener("load", function() {
            this.contentWindow.focus()
        }), i.on("ready", function() {
            i.send({
                method: "loadConfig",
                value: d
            })
        }), i.on("keydown", g), i.on("volumechange", function(a) {
            localStorage.setItem("vilosPreferredVolume", a.volume.toFixed(2))
        }), i.on("ended", function() {
            /** false && c && (location.href = c)  //Apart from formatiing and comments this line is the only change from the source script
        })
    }
}

/** source: https://www.crunchyroll.com/versioned_assets/js/components/vilos_player.07ba0994.js */
