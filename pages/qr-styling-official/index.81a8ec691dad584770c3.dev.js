!function (t) {
  var e = {};

  function r(o) {
    if (e[o]) return e[o].exports;
    var n = e[o] = {i: o, l: !1, exports: {}};
    return t[o].call(n.exports, n, n.exports, r), n.l = !0, n.exports
  }

  r.m = t, r.c = e, r.d = function (t, e, o) {
    r.o(t, e) || Object.defineProperty(t, e, {enumerable: !0, get: o})
  }, r.r = function (t) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(t, "__esModule", {value: !0})
  }, r.t = function (t, e) {
    if (1 & e && (t = r(t)), 8 & e) return t;
    if (4 & e && "object" == typeof t && t && t.__esModule) return t;
    var o = Object.create(null);
    if (r.r(o), Object.defineProperty(o, "default", {enumerable: !0, value: t}), 2 & e && "string" != typeof t) for (var n in t) {
      r.d(o, n, function (e) {
        return t[e]
      }.bind(null, n));
    }
    return o
  }, r.n = function (t) {
    var e = t && t.__esModule ? function () {
      return t.default
    } : function () {
      return t
    };
    return r.d(e, "a", e), e
  }, r.o = function (t, e) {
    return Object.prototype.hasOwnProperty.call(t, e)
  }, r.p = "", r(r.s = 3)
}([function (t, e, r) {
  self, t.exports = (() => {
    var t = {
      192: (t, e) => {
        var r, o, n = function () {
          var t = function (t, e) {
            var r = t, o = a[e], n = null, i = 0, c = null, y = [], v = {}, w = function (t, e) {
              n = function (t) {
                for (var e = new Array(t), r = 0; r < t; r += 1) {
                  e[r] = new Array(t);
                  for (var o = 0; o < t; o += 1) {
                    e[r][o] = null
                  }
                }
                return e
              }(i = 4 * r + 17), m(0, 0), m(i - 7, 0), m(0, i - 7), O(), x(), S(t, e), r >= 7 && _(t), null == c && (c = k(r, o, y)), M(c, e)
            }, m = function (t, e) {
              for (var r = -1; r <= 7; r += 1) {
                if (!(t + r <= -1 || i <= t + r)) for (var o = -1; o <= 7; o += 1) {
                  e + o <= -1 || i <= e + o || (n[t + r][e + o] = 0 <= r && r <= 6 && (0 == o || 6 == o) || 0 <= o && o <= 6 && (0 == r || 6 == r) || 2 <= r && r <= 4 && 2 <= o && o <= 4)
                }
              }
            }, x = function () {
              for (var t = 8; t < i - 8; t += 1) {
                null == n[t][6] && (n[t][6] = t % 2 == 0);
              }
              for (var e = 8; e < i - 8; e += 1) {
                null == n[6][e] && (n[6][e] = e % 2 == 0)
              }
            }, O = function () {
              for (var t = s.getPatternPosition(r), e = 0; e < t.length; e += 1) {
                for (var o = 0; o < t.length; o += 1) {
                  var i = t[e], a = t[o];
                  if (null == n[i][a]) for (var c = -2; c <= 2; c += 1) {
                    for (var u = -2; u <= 2; u += 1) {
                      n[i + c][a + u] = -2 == c || 2 == c || -2 == u || 2 == u || 0 == c && 0 == u
                    }
                  }
                }
              }
            }, _ = function (t) {
              for (var e = s.getBCHTypeNumber(r), o = 0; o < 18; o += 1) {
                var a = !t && 1 == (e >> o & 1);
                n[Math.floor(o / 3)][o % 3 + i - 8 - 3] = a
              }
              for (o = 0; o < 18; o += 1) {
                a = !t && 1 == (e >> o & 1), n[o % 3 + i - 8 - 3][Math.floor(o / 3)] = a
              }
            }, S = function (t, e) {
              for (var r = o << 3 | e, a = s.getBCHTypeInfo(r), c = 0; c < 15; c += 1) {
                var u = !t && 1 == (a >> c & 1);
                c < 6 ? n[c][8] = u : c < 8 ? n[c + 1][8] = u : n[i - 15 + c][8] = u
              }
              for (c = 0; c < 15; c += 1) {
                u = !t && 1 == (a >> c & 1), c < 8 ? n[8][i - c - 1] = u : c < 9 ? n[8][15 - c - 1 + 1] = u : n[8][15 - c - 1] = u;
              }
              n[i - 8][8] = !t
            }, M = function (t, e) {
              for (var r = -1, o = i - 1, a = 7, c = 0, u = s.getMaskFunction(e), l = i - 1; l > 0; l -= 2) {
                for (6 == l && (l -= 1); ;) {
                  for (var d = 0; d < 2; d += 1) {
                    if (null == n[o][l - d]) {
                      var f = !1;
                      c < t.length && (f = 1 == (t[c] >>> a & 1)), u(o, l - d) && (f = !f), n[o][l - d] = f, -1 == (a -= 1) && (c += 1, a = 7)
                    }
                  }
                  if ((o += r) < 0 || i <= o) {
                    o -= r, r = -r;
                    break
                  }
                }
              }
            }, k = function (t, e, r) {
              for (var o = l.getRSBlocks(t, e), n = d(), i = 0; i < r.length; i += 1) {
                var a = r[i];
                n.put(a.getMode(), 4), n.put(a.getLength(), s.getLengthInBits(a.getMode(), t)), a.write(n)
              }
              var c = 0;
              for (i = 0; i < o.length; i += 1) {
                c += o[i].dataCount;
              }
              if (n.getLengthInBits() > 8 * c) throw "code length overflow. (" + n.getLengthInBits() + ">" + 8 * c + ")";
              for (n.getLengthInBits() + 4 <= 8 * c && n.put(0, 4); n.getLengthInBits() % 8 != 0;) {
                n.putBit(!1);
              }
              for (; !(n.getLengthInBits() >= 8 * c || (n.put(236, 8), n.getLengthInBits() >= 8 * c));) {
                n.put(17, 8);
              }
              return function (t, e) {
                for (var r = 0, o = 0, n = 0, i = new Array(e.length), a = new Array(e.length), c = 0; c < e.length; c += 1) {
                  var l = e[c].dataCount, d = e[c].totalCount - l;
                  o = Math.max(o, l), n = Math.max(n, d), i[c] = new Array(l);
                  for (var f = 0; f < i[c].length; f += 1) {
                    i[c][f] = 255 & t.getBuffer()[f + r];
                  }
                  r += l;
                  var h = s.getErrorCorrectPolynomial(d), g = u(i[c], h.getLength() - 1).mod(h);
                  for (a[c] = new Array(h.getLength() - 1), f = 0; f < a[c].length; f += 1) {
                    var p = f + g.getLength() - a[c].length;
                    a[c][f] = p >= 0 ? g.getAt(p) : 0
                  }
                }
                var y = 0;
                for (f = 0; f < e.length; f += 1) {
                  y += e[f].totalCount;
                }
                var v = new Array(y), b = 0;
                for (f = 0; f < o; f += 1) {
                  for (c = 0; c < e.length; c += 1) {
                    f < i[c].length && (v[b] = i[c][f], b += 1);
                  }
                }
                for (f = 0; f < n; f += 1) {
                  for (c = 0; c < e.length; c += 1) {
                    f < a[c].length && (v[b] = a[c][f], b += 1);
                  }
                }
                return v
              }(n, o)
            };
            v.addData = function (t, e) {
              var r = null;
              switch (e = e || "Byte") {
                case"Numeric":
                  r = f(t);
                  break;
                case"Alphanumeric":
                  r = h(t);
                  break;
                case"Byte":
                  r = g(t);
                  break;
                case"Kanji":
                  r = p(t);
                  break;
                default:
                  throw "mode:" + e
              }
              y.push(r), c = null
            }, v.isDark = function (t, e) {
              if (t < 0 || i <= t || e < 0 || i <= e) throw t + "," + e;
              return n[t][e]
            }, v.getModuleCount = function () {
              return i
            }, v.make = function () {
              if (r < 1) {
                for (var t = 1; t < 40; t++) {
                  for (var e = l.getRSBlocks(t, o), n = d(), i = 0; i < y.length; i++) {
                    var a = y[i];
                    n.put(a.getMode(), 4), n.put(a.getLength(), s.getLengthInBits(a.getMode(), t)), a.write(n)
                  }
                  var c = 0;
                  for (i = 0; i < e.length; i++) {
                    c += e[i].dataCount;
                  }
                  if (n.getLengthInBits() <= 8 * c) break
                }
                r = t
              }
              w(!1, function () {
                for (var t = 0, e = 0, r = 0; r < 8; r += 1) {
                  w(!0, r);
                  var o = s.getLostPoint(v);
                  (0 == r || t > o) && (t = o, e = r)
                }
                return e
              }())
            }, v.createTableTag = function (t, e) {
              t = t || 2;
              var r = "";
              r += '<table style="', r += " border-width: 0px; border-style: none;", r += " border-collapse: collapse;", r += " padding: 0px; margin: " + (e = void 0 === e ? 4 * t : e) + "px;", r += '">', r += "<tbody>";
              for (var o = 0; o < v.getModuleCount(); o += 1) {
                r += "<tr>";
                for (var n = 0; n < v.getModuleCount(); n += 1) {
                  r += '<td style="', r += " border-width: 0px; border-style: none;", r += " border-collapse: collapse;", r += " padding: 0px; margin: 0px;", r += " width: " + t + "px;", r += " height: " + t + "px;", r += " background-color: ", r += v.isDark(o, n) ? "#000000" : "#ffffff", r += ";", r += '"/>';
                }
                r += "</tr>"
              }
              return (r += "</tbody>") + "</table>"
            }, v.createSvgTag = function (t, e, r, o) {
              var n = {};
              "object" == typeof arguments[0] && (t = (n = arguments[0]).cellSize, e = n.margin, r = n.alt, o = n.title), t = t || 2, e = void 0 === e ? 4 * t : e, (r = "string" == typeof r ? {text: r} : r || {}).text = r.text || null, r.id = r.text ? r.id || "qrcode-description" : null, (o = "string" == typeof o ? {text: o} : o || {}).text = o.text || null, o.id = o.text ? o.id || "qrcode-title" : null;
              var i, a, s, c, u = v.getModuleCount() * t + 2 * e, l = "";
              for (c = "l" + t + ",0 0," + t + " -" + t + ",0 0,-" + t + "z ", l += '<svg version="1.1" xmlns="http://www.w3.org/2000/svg"', l += n.scalable ? "" : ' width="' + u + 'px" height="' + u + 'px"', l += ' viewBox="0 0 ' + u + " " + u + '" ', l += ' preserveAspectRatio="xMinYMin meet"', l += o.text || r.text ? ' role="img" aria-labelledby="' + C([o.id, r.id].join(" ").trim()) + '"' : "", l += ">", l += o.text ? '<title id="' + C(o.id) + '">' + C(o.text) + "</title>" : "", l += r.text ? '<description id="' + C(r.id) + '">' + C(r.text) + "</description>" : "", l += '<rect width="100%" height="100%" fill="white" cx="0" cy="0"/>', l += '<path d="', a = 0; a < v.getModuleCount(); a += 1) {
                for (s = a * t + e, i = 0; i < v.getModuleCount(); i += 1) {
                  v.isDark(a, i) && (l += "M" + (i * t + e) + "," + s + c);
                }
              }
              return (l += '" stroke="transparent" fill="black"/>') + "</svg>"
            }, v.createDataURL = function (t, e) {
              t = t || 2, e = void 0 === e ? 4 * t : e;
              var r = v.getModuleCount() * t + 2 * e, o = e, n = r - e;
              return b(r, r, (function (e, r) {
                if (o <= e && e < n && o <= r && r < n) {
                  var i = Math.floor((e - o) / t), a = Math.floor((r - o) / t);
                  return v.isDark(a, i) ? 0 : 1
                }
                return 1
              }))
            }, v.createImgTag = function (t, e, r) {
              t = t || 2, e = void 0 === e ? 4 * t : e;
              var o = v.getModuleCount() * t + 2 * e, n = "";
              return n += "<img", n += ' src="', n += v.createDataURL(t, e), n += '"', n += ' width="', n += o, n += '"', n += ' height="', n += o, n += '"', r && (n += ' alt="', n += C(r), n += '"'), n + "/>"
            };
            var C = function (t) {
              for (var e = "", r = 0; r < t.length; r += 1) {
                var o = t.charAt(r);
                switch (o) {
                  case"<":
                    e += "&lt;";
                    break;
                  case">":
                    e += "&gt;";
                    break;
                  case"&":
                    e += "&amp;";
                    break;
                  case'"':
                    e += "&quot;";
                    break;
                  default:
                    e += o
                }
              }
              return e
            };
            return v.createASCII = function (t, e) {
              if ((t = t || 1) < 2) return function (t) {
                t = void 0 === t ? 2 : t;
                var e, r, o, n, i, a = 1 * v.getModuleCount() + 2 * t, s = t, c = a - t, u = {"██": "█", "█ ": "▀", " █": "▄", "  ": " "}, l = {"██": "▀", "█ ": "▀", " █": " ", "  ": " "}, d = "";
                for (e = 0; e < a; e += 2) {
                  for (o = Math.floor((e - s) / 1), n = Math.floor((e + 1 - s) / 1), r = 0; r < a; r += 1) {
                    i = "█", s <= r && r < c && s <= e && e < c && v.isDark(o, Math.floor((r - s) / 1)) && (i = " "), s <= r && r < c && s <= e + 1 && e + 1 < c && v.isDark(n, Math.floor((r - s) / 1)) ? i += " " : i += "█", d += t < 1 && e + 1 >= c ? l[i] : u[i];
                  }
                  d += "\n"
                }
                return a % 2 && t > 0 ? d.substring(0, d.length - a - 1) + Array(a + 1).join("▀") : d.substring(0, d.length - 1)
              }(e);
              t -= 1, e = void 0 === e ? 2 * t : e;
              var r, o, n, i, a = v.getModuleCount() * t + 2 * e, s = e, c = a - e, u = Array(t + 1).join("██"), l = Array(t + 1).join("  "), d = "", f = "";
              for (r = 0; r < a; r += 1) {
                for (n = Math.floor((r - s) / t), f = "", o = 0; o < a; o += 1) {
                  i = 1, s <= o && o < c && s <= r && r < c && v.isDark(n, Math.floor((o - s) / t)) && (i = 0), f += i ? u : l;
                }
                for (n = 0; n < t; n += 1) {
                  d += f + "\n"
                }
              }
              return d.substring(0, d.length - 1)
            }, v.renderTo2dContext = function (t, e) {
              e = e || 2;
              for (var r = v.getModuleCount(), o = 0; o < r; o++) {
                for (var n = 0; n < r; n++) {
                  t.fillStyle = v.isDark(o, n) ? "black" : "white", t.fillRect(o * e, n * e, e, e)
                }
              }
            }, v
          };
          t.stringToBytes = (t.stringToBytesFuncs = {
            default: function (t) {
              for (var e = [], r = 0; r < t.length; r += 1) {
                var o = t.charCodeAt(r);
                e.push(255 & o)
              }
              return e
            }
          }).default, t.createStringToBytes = function (t, e) {
            var r = function () {
              for (var r = v(t), o = function () {
                var t = r.read();
                if (-1 == t) throw "eof";
                return t
              }, n = 0, i = {}; ;) {
                var a = r.read();
                if (-1 == a) break;
                var s = o(), c = o() << 8 | o();
                i[String.fromCharCode(a << 8 | s)] = c, n += 1
              }
              if (n != e) throw n + " != " + e;
              return i
            }(), o = "?".charCodeAt(0);
            return function (t) {
              for (var e = [], n = 0; n < t.length; n += 1) {
                var i = t.charCodeAt(n);
                if (i < 128) e.push(i); else {
                  var a = r[t.charAt(n)];
                  "number" == typeof a ? (255 & a) == a ? e.push(a) : (e.push(a >>> 8), e.push(255 & a)) : e.push(o)
                }
              }
              return e
            }
          };
          var e, r, o, n, i, a = {L: 1, M: 0, Q: 3, H: 2}, s = (e = [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]], r = 1335, o = 7973, i = function (t) {
            for (var e = 0; 0 != t;) {
              e += 1, t >>>= 1;
            }
            return e
          }, (n = {}).getBCHTypeInfo = function (t) {
            for (var e = t << 10; i(e) - i(r) >= 0;) {
              e ^= r << i(e) - i(r);
            }
            return 21522 ^ (t << 10 | e)
          }, n.getBCHTypeNumber = function (t) {
            for (var e = t << 12; i(e) - i(o) >= 0;) {
              e ^= o << i(e) - i(o);
            }
            return t << 12 | e
          }, n.getPatternPosition = function (t) {
            return e[t - 1]
          }, n.getMaskFunction = function (t) {
            switch (t) {
              case 0:
                return function (t, e) {
                  return (t + e) % 2 == 0
                };
              case 1:
                return function (t, e) {
                  return t % 2 == 0
                };
              case 2:
                return function (t, e) {
                  return e % 3 == 0
                };
              case 3:
                return function (t, e) {
                  return (t + e) % 3 == 0
                };
              case 4:
                return function (t, e) {
                  return (Math.floor(t / 2) + Math.floor(e / 3)) % 2 == 0
                };
              case 5:
                return function (t, e) {
                  return t * e % 2 + t * e % 3 == 0
                };
              case 6:
                return function (t, e) {
                  return (t * e % 2 + t * e % 3) % 2 == 0
                };
              case 7:
                return function (t, e) {
                  return (t * e % 3 + (t + e) % 2) % 2 == 0
                };
              default:
                throw "bad maskPattern:" + t
            }
          }, n.getErrorCorrectPolynomial = function (t) {
            for (var e = u([1], 0), r = 0; r < t; r += 1) {
              e = e.multiply(u([1, c.gexp(r)], 0));
            }
            return e
          }, n.getLengthInBits = function (t, e) {
            if (1 <= e && e < 10) switch (t) {
              case 1:
                return 10;
              case 2:
                return 9;
              case 4:
              case 8:
                return 8;
              default:
                throw "mode:" + t
            } else if (e < 27) switch (t) {
              case 1:
                return 12;
              case 2:
                return 11;
              case 4:
                return 16;
              case 8:
                return 10;
              default:
                throw "mode:" + t
            } else {
              if (!(e < 41)) throw "type:" + e;
              switch (t) {
                case 1:
                  return 14;
                case 2:
                  return 13;
                case 4:
                  return 16;
                case 8:
                  return 12;
                default:
                  throw "mode:" + t
              }
            }
          }, n.getLostPoint = function (t) {
            for (var e = t.getModuleCount(), r = 0, o = 0; o < e; o += 1) {
              for (var n = 0; n < e; n += 1) {
                for (var i = 0, a = t.isDark(o, n), s = -1; s <= 1; s += 1) {
                  if (!(o + s < 0 || e <= o + s)) for (var c = -1; c <= 1; c += 1) {
                    n + c < 0 || e <= n + c || 0 == s && 0 == c || a == t.isDark(o + s, n + c) && (i += 1);
                  }
                }
                i > 5 && (r += 3 + i - 5)
              }
            }
            for (o = 0; o < e - 1; o += 1) {
              for (n = 0; n < e - 1; n += 1) {
                var u = 0;
                t.isDark(o, n) && (u += 1), t.isDark(o + 1, n) && (u += 1), t.isDark(o, n + 1) && (u += 1), t.isDark(o + 1, n + 1) && (u += 1), 0 != u && 4 != u || (r += 3)
              }
            }
            for (o = 0; o < e; o += 1) {
              for (n = 0; n < e - 6; n += 1) {
                t.isDark(o, n) && !t.isDark(o, n + 1) && t.isDark(o, n + 2) && t.isDark(o, n + 3) && t.isDark(o, n + 4) && !t.isDark(o, n + 5) && t.isDark(o, n + 6) && (r += 40);
              }
            }
            for (n = 0; n < e; n += 1) {
              for (o = 0; o < e - 6; o += 1) {
                t.isDark(o, n) && !t.isDark(o + 1, n) && t.isDark(o + 2, n) && t.isDark(o + 3, n) && t.isDark(o + 4, n) && !t.isDark(o + 5, n) && t.isDark(o + 6, n) && (r += 40);
              }
            }
            var l = 0;
            for (n = 0; n < e; n += 1) {
              for (o = 0; o < e; o += 1) {
                t.isDark(o, n) && (l += 1);
              }
            }
            return r + Math.abs(100 * l / e / e - 50) / 5 * 10
          }, n), c = function () {
            for (var t = new Array(256), e = new Array(256), r = 0; r < 8; r += 1) {
              t[r] = 1 << r;
            }
            for (r = 8; r < 256; r += 1) {
              t[r] = t[r - 4] ^ t[r - 5] ^ t[r - 6] ^ t[r - 8];
            }
            for (r = 0; r < 255; r += 1) {
              e[t[r]] = r;
            }
            return {
              glog: function (t) {
                if (t < 1) throw "glog(" + t + ")";
                return e[t]
              }, gexp: function (e) {
                for (; e < 0;) {
                  e += 255;
                }
                for (; e >= 256;) {
                  e -= 255;
                }
                return t[e]
              }
            }
          }();

          function u(t, e) {
            if (void 0 === t.length) throw t.length + "/" + e;
            var r = function () {
              for (var r = 0; r < t.length && 0 == t[r];) {
                r += 1;
              }
              for (var o = new Array(t.length - r + e), n = 0; n < t.length - r; n += 1) {
                o[n] = t[n + r];
              }
              return o
            }(), o = {
              getAt: function (t) {
                return r[t]
              }, getLength: function () {
                return r.length
              }, multiply: function (t) {
                for (var e = new Array(o.getLength() + t.getLength() - 1), r = 0; r < o.getLength(); r += 1) {
                  for (var n = 0; n < t.getLength(); n += 1) {
                    e[r + n] ^= c.gexp(c.glog(o.getAt(r)) + c.glog(t.getAt(n)));
                  }
                }
                return u(e, 0)
              }, mod: function (t) {
                if (o.getLength() - t.getLength() < 0) return o;
                for (var e = c.glog(o.getAt(0)) - c.glog(t.getAt(0)), r = new Array(o.getLength()), n = 0; n < o.getLength(); n += 1) {
                  r[n] = o.getAt(n);
                }
                for (n = 0; n < t.getLength(); n += 1) {
                  r[n] ^= c.gexp(c.glog(t.getAt(n)) + e);
                }
                return u(r, 0).mod(t)
              }
            };
            return o
          }

          var l = function () {
            var t = [[1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9], [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16], [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13], [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9], [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12], [2, 86, 68], [4, 43, 27], [4, 43, 19], [4, 43, 15], [2, 98, 78], [4, 49, 31], [2, 32, 14, 4, 33, 15], [4, 39, 13, 1, 40, 14], [2, 121, 97], [2, 60, 38, 2, 61, 39], [4, 40, 18, 2, 41, 19], [4, 40, 14, 2, 41, 15], [2, 146, 116], [3, 58, 36, 2, 59, 37], [4, 36, 16, 4, 37, 17], [4, 36, 12, 4, 37, 13], [2, 86, 68, 2, 87, 69], [4, 69, 43, 1, 70, 44], [6, 43, 19, 2, 44, 20], [6, 43, 15, 2, 44, 16], [4, 101, 81], [1, 80, 50, 4, 81, 51], [4, 50, 22, 4, 51, 23], [3, 36, 12, 8, 37, 13], [2, 116, 92, 2, 117, 93], [6, 58, 36, 2, 59, 37], [4, 46, 20, 6, 47, 21], [7, 42, 14, 4, 43, 15], [4, 133, 107], [8, 59, 37, 1, 60, 38], [8, 44, 20, 4, 45, 21], [12, 33, 11, 4, 34, 12], [3, 145, 115, 1, 146, 116], [4, 64, 40, 5, 65, 41], [11, 36, 16, 5, 37, 17], [11, 36, 12, 5, 37, 13], [5, 109, 87, 1, 110, 88], [5, 65, 41, 5, 66, 42], [5, 54, 24, 7, 55, 25], [11, 36, 12, 7, 37, 13], [5, 122, 98, 1, 123, 99], [7, 73, 45, 3, 74, 46], [15, 43, 19, 2, 44, 20], [3, 45, 15, 13, 46, 16], [1, 135, 107, 5, 136, 108], [10, 74, 46, 1, 75, 47], [1, 50, 22, 15, 51, 23], [2, 42, 14, 17, 43, 15], [5, 150, 120, 1, 151, 121], [9, 69, 43, 4, 70, 44], [17, 50, 22, 1, 51, 23], [2, 42, 14, 19, 43, 15], [3, 141, 113, 4, 142, 114], [3, 70, 44, 11, 71, 45], [17, 47, 21, 4, 48, 22], [9, 39, 13, 16, 40, 14], [3, 135, 107, 5, 136, 108], [3, 67, 41, 13, 68, 42], [15, 54, 24, 5, 55, 25], [15, 43, 15, 10, 44, 16], [4, 144, 116, 4, 145, 117], [17, 68, 42], [17, 50, 22, 6, 51, 23], [19, 46, 16, 6, 47, 17], [2, 139, 111, 7, 140, 112], [17, 74, 46], [7, 54, 24, 16, 55, 25], [34, 37, 13], [4, 151, 121, 5, 152, 122], [4, 75, 47, 14, 76, 48], [11, 54, 24, 14, 55, 25], [16, 45, 15, 14, 46, 16], [6, 147, 117, 4, 148, 118], [6, 73, 45, 14, 74, 46], [11, 54, 24, 16, 55, 25], [30, 46, 16, 2, 47, 17], [8, 132, 106, 4, 133, 107], [8, 75, 47, 13, 76, 48], [7, 54, 24, 22, 55, 25], [22, 45, 15, 13, 46, 16], [10, 142, 114, 2, 143, 115], [19, 74, 46, 4, 75, 47], [28, 50, 22, 6, 51, 23], [33, 46, 16, 4, 47, 17], [8, 152, 122, 4, 153, 123], [22, 73, 45, 3, 74, 46], [8, 53, 23, 26, 54, 24], [12, 45, 15, 28, 46, 16], [3, 147, 117, 10, 148, 118], [3, 73, 45, 23, 74, 46], [4, 54, 24, 31, 55, 25], [11, 45, 15, 31, 46, 16], [7, 146, 116, 7, 147, 117], [21, 73, 45, 7, 74, 46], [1, 53, 23, 37, 54, 24], [19, 45, 15, 26, 46, 16], [5, 145, 115, 10, 146, 116], [19, 75, 47, 10, 76, 48], [15, 54, 24, 25, 55, 25], [23, 45, 15, 25, 46, 16], [13, 145, 115, 3, 146, 116], [2, 74, 46, 29, 75, 47], [42, 54, 24, 1, 55, 25], [23, 45, 15, 28, 46, 16], [17, 145, 115], [10, 74, 46, 23, 75, 47], [10, 54, 24, 35, 55, 25], [19, 45, 15, 35, 46, 16], [17, 145, 115, 1, 146, 116], [14, 74, 46, 21, 75, 47], [29, 54, 24, 19, 55, 25], [11, 45, 15, 46, 46, 16], [13, 145, 115, 6, 146, 116], [14, 74, 46, 23, 75, 47], [44, 54, 24, 7, 55, 25], [59, 46, 16, 1, 47, 17], [12, 151, 121, 7, 152, 122], [12, 75, 47, 26, 76, 48], [39, 54, 24, 14, 55, 25], [22, 45, 15, 41, 46, 16], [6, 151, 121, 14, 152, 122], [6, 75, 47, 34, 76, 48], [46, 54, 24, 10, 55, 25], [2, 45, 15, 64, 46, 16], [17, 152, 122, 4, 153, 123], [29, 74, 46, 14, 75, 47], [49, 54, 24, 10, 55, 25], [24, 45, 15, 46, 46, 16], [4, 152, 122, 18, 153, 123], [13, 74, 46, 32, 75, 47], [48, 54, 24, 14, 55, 25], [42, 45, 15, 32, 46, 16], [20, 147, 117, 4, 148, 118], [40, 75, 47, 7, 76, 48], [43, 54, 24, 22, 55, 25], [10, 45, 15, 67, 46, 16], [19, 148, 118, 6, 149, 119], [18, 75, 47, 31, 76, 48], [34, 54, 24, 34, 55, 25], [20, 45, 15, 61, 46, 16]],
              e = function (t, e) {
                var r = {};
                return r.totalCount = t, r.dataCount = e, r
              };
            return {
              getRSBlocks: function (r, o) {
                var n = function (e, r) {
                  switch (r) {
                    case a.L:
                      return t[4 * (e - 1) + 0];
                    case a.M:
                      return t[4 * (e - 1) + 1];
                    case a.Q:
                      return t[4 * (e - 1) + 2];
                    case a.H:
                      return t[4 * (e - 1) + 3];
                    default:
                      return
                  }
                }(r, o);
                if (void 0 === n) throw "bad rs block @ typeNumber:" + r + "/errorCorrectionLevel:" + o;
                for (var i = n.length / 3, s = [], c = 0; c < i; c += 1) {
                  for (var u = n[3 * c + 0], l = n[3 * c + 1], d = n[3 * c + 2], f = 0; f < u; f += 1) {
                    s.push(e(l, d));
                  }
                }
                return s
              }
            }
          }(), d = function () {
            var t = [], e = 0, r = {
              getBuffer: function () {
                return t
              }, getAt: function (e) {
                var r = Math.floor(e / 8);
                return 1 == (t[r] >>> 7 - e % 8 & 1)
              }, put: function (t, e) {
                for (var o = 0; o < e; o += 1) {
                  r.putBit(1 == (t >>> e - o - 1 & 1))
                }
              }, getLengthInBits: function () {
                return e
              }, putBit: function (r) {
                var o = Math.floor(e / 8);
                t.length <= o && t.push(0), r && (t[o] |= 128 >>> e % 8), e += 1
              }
            };
            return r
          }, f = function (t) {
            var e = t, r = {
              getMode: function () {
                return 1
              }, getLength: function (t) {
                return e.length
              }, write: function (t) {
                for (var r = e, n = 0; n + 2 < r.length;) {
                  t.put(o(r.substring(n, n + 3)), 10), n += 3;
                }
                n < r.length && (r.length - n == 1 ? t.put(o(r.substring(n, n + 1)), 4) : r.length - n == 2 && t.put(o(r.substring(n, n + 2)), 7))
              }
            }, o = function (t) {
              for (var e = 0, r = 0; r < t.length; r += 1) {
                e = 10 * e + n(t.charAt(r));
              }
              return e
            }, n = function (t) {
              if ("0" <= t && t <= "9") return t.charCodeAt(0) - "0".charCodeAt(0);
              throw "illegal char :" + t
            };
            return r
          }, h = function (t) {
            var e = t, r = {
              getMode: function () {
                return 2
              }, getLength: function (t) {
                return e.length
              }, write: function (t) {
                for (var r = e, n = 0; n + 1 < r.length;) {
                  t.put(45 * o(r.charAt(n)) + o(r.charAt(n + 1)), 11), n += 2;
                }
                n < r.length && t.put(o(r.charAt(n)), 6)
              }
            }, o = function (t) {
              if ("0" <= t && t <= "9") return t.charCodeAt(0) - "0".charCodeAt(0);
              if ("A" <= t && t <= "Z") return t.charCodeAt(0) - "A".charCodeAt(0) + 10;
              switch (t) {
                case" ":
                  return 36;
                case"$":
                  return 37;
                case"%":
                  return 38;
                case"*":
                  return 39;
                case"+":
                  return 40;
                case"-":
                  return 41;
                case".":
                  return 42;
                case"/":
                  return 43;
                case":":
                  return 44;
                default:
                  throw "illegal char :" + t
              }
            };
            return r
          }, g = function (e) {
            var r = t.stringToBytes(e);
            return {
              getMode: function () {
                return 4
              }, getLength: function (t) {
                return r.length
              }, write: function (t) {
                for (var e = 0; e < r.length; e += 1) {
                  t.put(r[e], 8)
                }
              }
            }
          }, p = function (e) {
            var r = t.stringToBytesFuncs.SJIS;
            if (!r) throw "sjis not supported.";
            !function (t, e) {
              var o = r("友");
              if (2 != o.length || 38726 != (o[0] << 8 | o[1])) throw "sjis not supported."
            }();
            var o = r(e);
            return {
              getMode: function () {
                return 8
              }, getLength: function (t) {
                return ~~(o.length / 2)
              }, write: function (t) {
                for (var e = o, r = 0; r + 1 < e.length;) {
                  var n = (255 & e[r]) << 8 | 255 & e[r + 1];
                  if (33088 <= n && n <= 40956) n -= 33088; else {
                    if (!(57408 <= n && n <= 60351)) throw "illegal char at " + (r + 1) + "/" + n;
                    n -= 49472
                  }
                  n = 192 * (n >>> 8 & 255) + (255 & n), t.put(n, 13), r += 2
                }
                if (r < e.length) throw "illegal char at " + (r + 1)
              }
            }
          }, y = function () {
            var t = [], e = {
              writeByte: function (e) {
                t.push(255 & e)
              }, writeShort: function (t) {
                e.writeByte(t), e.writeByte(t >>> 8)
              }, writeBytes: function (t, r, o) {
                r = r || 0, o = o || t.length;
                for (var n = 0; n < o; n += 1) {
                  e.writeByte(t[n + r])
                }
              }, writeString: function (t) {
                for (var r = 0; r < t.length; r += 1) {
                  e.writeByte(t.charCodeAt(r))
                }
              }, toByteArray: function () {
                return t
              }, toString: function () {
                var e = "";
                e += "[";
                for (var r = 0; r < t.length; r += 1) {
                  r > 0 && (e += ","), e += t[r];
                }
                return e + "]"
              }
            };
            return e
          }, v = function (t) {
            var e = t, r = 0, o = 0, n = 0, i = {
              read: function () {
                for (; n < 8;) {
                  if (r >= e.length) {
                    if (0 == n) return -1;
                    throw "unexpected end of file./" + n
                  }
                  var t = e.charAt(r);
                  if (r += 1, "=" == t) return n = 0, -1;
                  t.match(/^\s$/) || (o = o << 6 | a(t.charCodeAt(0)), n += 6)
                }
                var i = o >>> n - 8 & 255;
                return n -= 8, i
              }
            }, a = function (t) {
              if (65 <= t && t <= 90) return t - 65;
              if (97 <= t && t <= 122) return t - 97 + 26;
              if (48 <= t && t <= 57) return t - 48 + 52;
              if (43 == t) return 62;
              if (47 == t) return 63;
              throw "c:" + t
            };
            return i
          }, b = function (t, e, r) {
            for (var o = function (t, e) {
              var r = t, o = e, n = new Array(t * e), i = {
                setPixel: function (t, e, o) {
                  n[e * r + t] = o
                }, write: function (t) {
                  t.writeString("GIF87a"), t.writeShort(r), t.writeShort(o), t.writeByte(128), t.writeByte(0), t.writeByte(0), t.writeByte(0), t.writeByte(0), t.writeByte(0), t.writeByte(255), t.writeByte(255), t.writeByte(255), t.writeString(","), t.writeShort(0), t.writeShort(0), t.writeShort(r), t.writeShort(o), t.writeByte(0);
                  var e = a(2);
                  t.writeByte(2);
                  for (var n = 0; e.length - n > 255;) {
                    t.writeByte(255), t.writeBytes(e, n, 255), n += 255;
                  }
                  t.writeByte(e.length - n), t.writeBytes(e, n, e.length - n), t.writeByte(0), t.writeString(";")
                }
              }, a = function (t) {
                for (var e = 1 << t, r = 1 + (1 << t), o = t + 1, i = s(), a = 0; a < e; a += 1) {
                  i.add(String.fromCharCode(a));
                }
                i.add(String.fromCharCode(e)), i.add(String.fromCharCode(r));
                var c, u, l, d = y(), f = (c = d, u = 0, l = 0, {
                  write: function (t, e) {
                    if (t >>> e != 0) throw "length over";
                    for (; u + e >= 8;) {
                      c.writeByte(255 & (t << u | l)), e -= 8 - u, t >>>= 8 - u, l = 0, u = 0;
                    }
                    l |= t << u, u += e
                  }, flush: function () {
                    u > 0 && c.writeByte(l)
                  }
                });
                f.write(e, o);
                var h = 0, g = String.fromCharCode(n[h]);
                for (h += 1; h < n.length;) {
                  var p = String.fromCharCode(n[h]);
                  h += 1, i.contains(g + p) ? g += p : (f.write(i.indexOf(g), o), i.size() < 4095 && (i.size() == 1 << o && (o += 1), i.add(g + p)), g = p)
                }
                return f.write(i.indexOf(g), o), f.write(r, o), f.flush(), d.toByteArray()
              }, s = function () {
                var t = {}, e = 0, r = {
                  add: function (o) {
                    if (r.contains(o)) throw "dup key:" + o;
                    t[o] = e, e += 1
                  }, size: function () {
                    return e
                  }, indexOf: function (e) {
                    return t[e]
                  }, contains: function (e) {
                    return void 0 !== t[e]
                  }
                };
                return r
              };
              return i
            }(t, e), n = 0; n < e; n += 1) {
              for (var i = 0; i < t; i += 1) {
                o.setPixel(i, n, r(i, n));
              }
            }
            var a = y();
            o.write(a);
            for (var s = function () {
              var t = 0, e = 0, r = 0, o = "", n = {}, i = function (t) {
                o += String.fromCharCode(a(63 & t))
              }, a = function (t) {
                if (t < 0) ; else {
                  if (t < 26) return 65 + t;
                  if (t < 52) return t - 26 + 97;
                  if (t < 62) return t - 52 + 48;
                  if (62 == t) return 43;
                  if (63 == t) return 47
                }
                throw "n:" + t
              };
              return n.writeByte = function (o) {
                for (t = t << 8 | 255 & o, e += 8, r += 1; e >= 6;) {
                  i(t >>> e - 6), e -= 6
                }
              }, n.flush = function () {
                if (e > 0 && (i(t << 6 - e), t = 0, e = 0), r % 3 != 0) for (var n = 3 - r % 3, a = 0; a < n; a += 1) {
                  o += "="
                }
              }, n.toString = function () {
                return o
              }, n
            }(), c = a.toByteArray(), u = 0; u < c.length; u += 1) {
              s.writeByte(c[u]);
            }
            return s.flush(), "data:image/gif;base64," + s
          };
          return t
        }();
        n.stringToBytesFuncs["UTF-8"] = function (t) {
          return function (t) {
            for (var e = [], r = 0; r < t.length; r++) {
              var o = t.charCodeAt(r);
              o < 128 ? e.push(o) : o < 2048 ? e.push(192 | o >> 6, 128 | 63 & o) : o < 55296 || o >= 57344 ? e.push(224 | o >> 12, 128 | o >> 6 & 63, 128 | 63 & o) : (r++, o = 65536 + ((1023 & o) << 10 | 1023 & t.charCodeAt(r)), e.push(240 | o >> 18, 128 | o >> 12 & 63, 128 | o >> 6 & 63, 128 | 63 & o))
            }
            return e
          }(t)
        }, void 0 === (o = "function" == typeof (r = function () {
          return n
        }) ? r.apply(e, []) : r) || (t.exports = o)
      }, 151: (t, e, r) => {
        "use strict";
        r.d(e, {default: () => M});
        var o = function () {
          return (o = Object.assign || function (t) {
            for (var e, r = 1, o = arguments.length; r < o; r++) {
              for (var n in e = arguments[r]) {
                Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
              }
            }
            return t
          }).apply(this, arguments)
        }, n = function () {
          for (var t = 0, e = 0, r = arguments.length; e < r; e++) {
            t += arguments[e].length;
          }
          var o = Array(t), n = 0;
          for (e = 0; e < r; e++) {
            for (var i = arguments[e], a = 0, s = i.length; a < s; a++, n++) {
              o[n] = i[a];
            }
          }
          return o
        }, i = function (t) {
          return !!t && "object" == typeof t && !Array.isArray(t)
        };

        function a(t) {
          for (var e = [], r = 1; r < arguments.length; r++) {
            e[r - 1] = arguments[r];
          }
          if (!e.length) return t;
          var s = e.shift();
          return void 0 !== s && i(t) && i(s) ? (t = o({}, t), Object.keys(s).forEach((function (e) {
            var r = t[e], o = s[e];
            Array.isArray(r) && Array.isArray(o) ? t[e] = o : i(r) && i(o) ? t[e] = a(Object.assign({}, r), o) : t[e] = o
          })), a.apply(void 0, n([t], e))) : t
        }

        const s = {L: .07, M: .15, Q: .25, H: .3};
        var c = function () {
          return (c = Object.assign || function (t) {
            for (var e, r = 1, o = arguments.length; r < o; r++) {
              for (var n in e = arguments[r]) {
                Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
              }
            }
            return t
          }).apply(this, arguments)
        };
        const u = function () {
          function t(t) {
            var e = t.context, r = t.type;
            this._context = e, this._type = r
          }

          return t.prototype.draw = function (t, e, r, o) {
            var n, i = this._context;
            switch (this._type) {
              case"dots":
                n = this._drawDot;
                break;
              case"classy":
                n = this._drawClassy;
                break;
              case"classy-rounded":
                n = this._drawClassyRounded;
                break;
              case"rounded":
                n = this._drawRounded;
                break;
              case"extra-rounded":
                n = this._drawExtraRounded;
                break;
              case"square":
              default:
                n = this._drawSquare
            }
            n.call(this, {x: t, y: e, size: r, context: i, getNeighbor: o})
          }, t.prototype._rotateFigure = function (t) {
            var e = t.x, r = t.y, o = t.size, n = t.context, i = t.rotation, a = t.draw, s = e + o / 2, c = r + o / 2;
            n.translate(s, c), i && n.rotate(i), a(), n.closePath(), i && n.rotate(-i), n.translate(-s, -c)
          }, t.prototype._basicDot = function (t) {
            var e = t.size, r = t.context;
            this._rotateFigure(c(c({}, t), {
              draw: function () {
                r.arc(0, 0, e / 2, 0, 2 * Math.PI)
              }
            }))
          }, t.prototype._basicSquare = function (t) {
            var e = t.size, r = t.context;
            this._rotateFigure(c(c({}, t), {
              draw: function () {
                r.rect(-e / 2, -e / 2, e, e)
              }
            }))
          }, t.prototype._basicSideRounded = function (t) {
            var e = t.size, r = t.context;
            this._rotateFigure(c(c({}, t), {
              draw: function () {
                r.arc(0, 0, e / 2, -Math.PI / 2, Math.PI / 2), r.lineTo(-e / 2, e / 2), r.lineTo(-e / 2, -e / 2), r.lineTo(0, -e / 2)
              }
            }))
          }, t.prototype._basicCornerRounded = function (t) {
            var e = t.size, r = t.context;
            this._rotateFigure(c(c({}, t), {
              draw: function () {
                r.arc(0, 0, e / 2, -Math.PI / 2, 0), r.lineTo(e / 2, e / 2), r.lineTo(-e / 2, e / 2), r.lineTo(-e / 2, -e / 2), r.lineTo(0, -e / 2)
              }
            }))
          }, t.prototype._basicCornerExtraRounded = function (t) {
            var e = t.size, r = t.context;
            this._rotateFigure(c(c({}, t), {
              draw: function () {
                r.arc(-e / 2, e / 2, e, -Math.PI / 2, 0), r.lineTo(-e / 2, e / 2), r.lineTo(-e / 2, -e / 2)
              }
            }))
          }, t.prototype._basicCornersRounded = function (t) {
            var e = t.size, r = t.context;
            this._rotateFigure(c(c({}, t), {
              draw: function () {
                r.arc(0, 0, e / 2, -Math.PI / 2, 0), r.lineTo(e / 2, e / 2), r.lineTo(0, e / 2), r.arc(0, 0, e / 2, Math.PI / 2, Math.PI), r.lineTo(-e / 2, -e / 2), r.lineTo(0, -e / 2)
              }
            }))
          }, t.prototype._basicCornersExtraRounded = function (t) {
            var e = t.size, r = t.context;
            this._rotateFigure(c(c({}, t), {
              draw: function () {
                r.arc(-e / 2, e / 2, e, -Math.PI / 2, 0), r.arc(e / 2, -e / 2, e, Math.PI / 2, Math.PI)
              }
            }))
          }, t.prototype._drawDot = function (t) {
            var e = t.x, r = t.y, o = t.size, n = t.context;
            this._basicDot({x: e, y: r, size: o, context: n, rotation: 0})
          }, t.prototype._drawSquare = function (t) {
            var e = t.x, r = t.y, o = t.size, n = t.context;
            this._basicSquare({x: e, y: r, size: o, context: n, rotation: 0})
          }, t.prototype._drawRounded = function (t) {
            var e = t.x, r = t.y, o = t.size, n = t.context, i = t.getNeighbor, a = +i(-1, 0), s = +i(1, 0), c = +i(0, -1), u = +i(0, 1), l = a + s + c + u;
            if (0 !== l) if (l > 2 || a && s || c && u) this._basicSquare({x: e, y: r, size: o, context: n, rotation: 0}); else {
              if (2 === l) {
                var d = 0;
                return a && c ? d = Math.PI / 2 : c && s ? d = Math.PI : s && u && (d = -Math.PI / 2), void this._basicCornerRounded({x: e, y: r, size: o, context: n, rotation: d})
              }
              if (1 === l) return d = 0, c ? d = Math.PI / 2 : s ? d = Math.PI : u && (d = -Math.PI / 2), void this._basicSideRounded({x: e, y: r, size: o, context: n, rotation: d})
            } else this._basicDot({x: e, y: r, size: o, context: n, rotation: 0})
          }, t.prototype._drawExtraRounded = function (t) {
            var e = t.x, r = t.y, o = t.size, n = t.context, i = t.getNeighbor, a = +i(-1, 0), s = +i(1, 0), c = +i(0, -1), u = +i(0, 1), l = a + s + c + u;
            if (0 !== l) if (l > 2 || a && s || c && u) this._basicSquare({x: e, y: r, size: o, context: n, rotation: 0}); else {
              if (2 === l) {
                var d = 0;
                return a && c ? d = Math.PI / 2 : c && s ? d = Math.PI : s && u && (d = -Math.PI / 2), void this._basicCornerExtraRounded({x: e, y: r, size: o, context: n, rotation: d})
              }
              if (1 === l) return d = 0, c ? d = Math.PI / 2 : s ? d = Math.PI : u && (d = -Math.PI / 2), void this._basicSideRounded({x: e, y: r, size: o, context: n, rotation: d})
            } else this._basicDot({x: e, y: r, size: o, context: n, rotation: 0})
          }, t.prototype._drawClassy = function (t) {
            var e = t.x, r = t.y, o = t.size, n = t.context, i = t.getNeighbor, a = +i(-1, 0), s = +i(1, 0), c = +i(0, -1), u = +i(0, 1);
            0 !== a + s + c + u ? a || c ? s || u ? this._basicSquare({x: e, y: r, size: o, context: n, rotation: 0}) : this._basicCornerRounded({x: e, y: r, size: o, context: n, rotation: Math.PI / 2}) : this._basicCornerRounded({x: e, y: r, size: o, context: n, rotation: -Math.PI / 2}) : this._basicCornersRounded({x: e, y: r, size: o, context: n, rotation: Math.PI / 2})
          }, t.prototype._drawClassyRounded = function (t) {
            var e = t.x, r = t.y, o = t.size, n = t.context, i = t.getNeighbor, a = +i(-1, 0), s = +i(1, 0), c = +i(0, -1), u = +i(0, 1);
            0 !== a + s + c + u ? a || c ? s || u ? this._basicSquare({x: e, y: r, size: o, context: n, rotation: 0}) : this._basicCornerExtraRounded({x: e, y: r, size: o, context: n, rotation: Math.PI / 2}) : this._basicCornerExtraRounded({x: e, y: r, size: o, context: n, rotation: -Math.PI / 2}) : this._basicCornersRounded({x: e, y: r, size: o, context: n, rotation: Math.PI / 2})
          }, t
        }();
        var l = function () {
          return (l = Object.assign || function (t) {
            for (var e, r = 1, o = arguments.length; r < o; r++) {
              for (var n in e = arguments[r]) {
                Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
              }
            }
            return t
          }).apply(this, arguments)
        };
        const d = function () {
          function t(t) {
            var e = t.context, r = t.type;
            this._context = e, this._type = r
          }

          return t.prototype.draw = function (t, e, r, o) {
            var n, i = this._context;
            switch (this._type) {
              case"square":
                n = this._drawSquare;
                break;
              case"extra-rounded":
                n = this._drawExtraRounded;
                break;
              case"dot":
              default:
                n = this._drawDot
            }
            n.call(this, {x: t, y: e, size: r, context: i, rotation: o})
          }, t.prototype._rotateFigure = function (t) {
            var e = t.x, r = t.y, o = t.size, n = t.context, i = t.rotation, a = t.draw, s = e + o / 2, c = r + o / 2;
            n.translate(s, c), i && n.rotate(i), a(), n.closePath(), i && n.rotate(-i), n.translate(-s, -c)
          }, t.prototype._basicDot = function (t) {
            var e = t.size, r = t.context, o = e / 7;
            this._rotateFigure(l(l({}, t), {
              draw: function () {
                r.arc(0, 0, e / 2, 0, 2 * Math.PI), r.arc(0, 0, e / 2 - o, 0, 2 * Math.PI)
              }
            }))
          }, t.prototype._basicSquare = function (t) {
            var e = t.size, r = t.context, o = e / 7;
            this._rotateFigure(l(l({}, t), {
              draw: function () {
                r.rect(-e / 2, -e / 2, e, e), r.rect(-e / 2 + o, -e / 2 + o, e - 2 * o, e - 2 * o)
              }
            }))
          }, t.prototype._basicExtraRounded = function (t) {
            var e = t.size, r = t.context, o = e / 7;
            this._rotateFigure(l(l({}, t), {
              draw: function () {
                r.arc(-o, -o, 2.5 * o, Math.PI, -Math.PI / 2), r.lineTo(o, -3.5 * o), r.arc(o, -o, 2.5 * o, -Math.PI / 2, 0), r.lineTo(3.5 * o, -o), r.arc(o, o, 2.5 * o, 0, Math.PI / 2), r.lineTo(-o, 3.5 * o), r.arc(-o, o, 2.5 * o, Math.PI / 2, Math.PI), r.lineTo(-3.5 * o, -o), r.arc(-o, -o, 1.5 * o, Math.PI, -Math.PI / 2), r.lineTo(o, -2.5 * o), r.arc(o, -o, 1.5 * o, -Math.PI / 2, 0), r.lineTo(2.5 * o, -o), r.arc(o, o, 1.5 * o, 0, Math.PI / 2), r.lineTo(-o, 2.5 * o), r.arc(-o, o, 1.5 * o, Math.PI / 2, Math.PI), r.lineTo(-2.5 * o, -o)
              }
            }))
          }, t.prototype._drawDot = function (t) {
            var e = t.x, r = t.y, o = t.size, n = t.context, i = t.rotation;
            this._basicDot({x: e, y: r, size: o, context: n, rotation: i})
          }, t.prototype._drawSquare = function (t) {
            var e = t.x, r = t.y, o = t.size, n = t.context, i = t.rotation;
            this._basicSquare({x: e, y: r, size: o, context: n, rotation: i})
          }, t.prototype._drawExtraRounded = function (t) {
            var e = t.x, r = t.y, o = t.size, n = t.context, i = t.rotation;
            this._basicExtraRounded({x: e, y: r, size: o, context: n, rotation: i})
          }, t
        }();
        var f = function () {
          return (f = Object.assign || function (t) {
            for (var e, r = 1, o = arguments.length; r < o; r++) {
              for (var n in e = arguments[r]) {
                Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
              }
            }
            return t
          }).apply(this, arguments)
        };
        const h = function () {
          function t(t) {
            var e = t.context, r = t.type;
            this._context = e, this._type = r
          }

          return t.prototype.draw = function (t, e, r, o) {
            var n, i = this._context;
            switch (this._type) {
              case"square":
                n = this._drawSquare;
                break;
              case"dot":
              default:
                n = this._drawDot
            }
            n.call(this, {x: t, y: e, size: r, context: i, rotation: o})
          }, t.prototype._rotateFigure = function (t) {
            var e = t.x, r = t.y, o = t.size, n = t.context, i = t.rotation, a = t.draw, s = e + o / 2, c = r + o / 2;
            n.translate(s, c), i && n.rotate(i), a(), n.closePath(), i && n.rotate(-i), n.translate(-s, -c)
          }, t.prototype._basicDot = function (t) {
            var e = t.size, r = t.context;
            this._rotateFigure(f(f({}, t), {
              draw: function () {
                r.arc(0, 0, e / 2, 0, 2 * Math.PI)
              }
            }))
          }, t.prototype._basicSquare = function (t) {
            var e = t.size, r = t.context;
            this._rotateFigure(f(f({}, t), {
              draw: function () {
                r.rect(-e / 2, -e / 2, e, e)
              }
            }))
          }, t.prototype._drawDot = function (t) {
            var e = t.x, r = t.y, o = t.size, n = t.context, i = t.rotation;
            this._basicDot({x: e, y: r, size: o, context: n, rotation: i})
          }, t.prototype._drawSquare = function (t) {
            var e = t.x, r = t.y, o = t.size, n = t.context, i = t.rotation;
            this._basicSquare({x: e, y: r, size: o, context: n, rotation: i})
          }, t
        }();
        var g = [[1, 1, 1, 1, 1, 1, 1], [1, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0, 1], [1, 1, 1, 1, 1, 1, 1]], p = [[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 1, 1, 1, 0, 0], [0, 0, 1, 1, 1, 0, 0], [0, 0, 1, 1, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]];
        const y = function () {
          function t(t) {
            this._canvas = document.createElement("canvas"), this._canvas.width = t.width, this._canvas.height = t.height, this._options = t
          }

          return Object.defineProperty(t.prototype, "context", {
            get: function () {
              return this._canvas.getContext("2d")
            }, enumerable: !1, configurable: !0
          }), Object.defineProperty(t.prototype, "width", {
            get: function () {
              return this._canvas.width
            }, enumerable: !1, configurable: !0
          }), Object.defineProperty(t.prototype, "height", {
            get: function () {
              return this._canvas.height
            }, enumerable: !1, configurable: !0
          }), t.prototype.getCanvas = function () {
            return this._canvas
          }, t.prototype.clear = function () {
            var t = this.context;
            t && t.clearRect(0, 0, this._canvas.width, this._canvas.height)
          }, t.prototype.drawQR = function (t) {
            return e = this, o = function () {
              var e, r, o, n, i, a, c, u, l, d = this;
              return function (t, e) {
                var r, o, n, i, a = {
                  label: 0, sent: function () {
                    if (1 & n[0]) throw n[1];
                    return n[1]
                  }, trys: [], ops: []
                };
                return i = {next: s(0), throw: s(1), return: s(2)}, "function" == typeof Symbol && (i[Symbol.iterator] = function () {
                  return this
                }), i;

                function s(i) {
                  return function (s) {
                    return function (i) {
                      if (r) throw new TypeError("Generator is already executing.");
                      for (; a;) {
                        try {
                          if (r = 1, o && (n = 2 & i[0] ? o.return : i[0] ? o.throw || ((n = o.return) && n.call(o), 0) : o.next) && !(n = n.call(o, i[1])).done) return n;
                          switch (o = 0, n && (i = [2 & i[0], n.value]), i[0]) {
                            case 0:
                            case 1:
                              n = i;
                              break;
                            case 4:
                              return a.label++, {value: i[1], done: !1};
                            case 5:
                              a.label++, o = i[1], i = [0];
                              continue;
                            case 7:
                              i = a.ops.pop(), a.trys.pop();
                              continue;
                            default:
                              if (!((n = (n = a.trys).length > 0 && n[n.length - 1]) || 6 !== i[0] && 2 !== i[0])) {
                                a = 0;
                                continue
                              }
                              if (3 === i[0] && (!n || i[1] > n[0] && i[1] < n[3])) {
                                a.label = i[1];
                                break
                              }
                              if (6 === i[0] && a.label < n[1]) {
                                a.label = n[1], n = i;
                                break
                              }
                              if (n && a.label < n[2]) {
                                a.label = n[2], a.ops.push(i);
                                break
                              }
                              n[2] && a.ops.pop(), a.trys.pop();
                              continue
                          }
                          i = e.call(t, a)
                        }
                        catch (t) {
                          i = [6, t], o = 0
                        }
                        finally {
                          r = n = 0
                        }
                      }
                      if (5 & i[0]) throw i[1];
                      return {value: i[0] ? i[1] : void 0, done: !0}
                    }([i, s])
                  }
                }
              }(this, (function (f) {
                switch (f.label) {
                  case 0:
                    return e = t.getModuleCount(), r = Math.min(this._options.width, this._options.height) - 2 * this._options.margin, o = Math.floor(r / e), n = {hideXDots: 0, hideYDots: 0, width: 0, height: 0}, this._qr = t, this._options.image ? [4, this.loadImage()] : [3, 2];
                  case 1:
                    if (f.sent(), !this._image) return [2];
                    i = this._options, a = i.imageOptions, c = i.qrOptions, u = a.imageSize * s[c.errorCorrectionLevel], l = Math.floor(u * e * e), n = function (t) {
                      var e = t.originalHeight, r = t.originalWidth, o = t.maxHiddenDots, n = t.maxHiddenAxisDots, i = t.dotSize, a = {x: 0, y: 0}, s = {x: 0, y: 0};
                      if (e <= 0 || r <= 0 || o <= 0 || i <= 0) return {height: 0, width: 0, hideYDots: 0, hideXDots: 0};
                      var c = e / r;
                      return a.x = Math.floor(Math.sqrt(o / c)), a.x <= 0 && (a.x = 1), n && n < a.x && (a.x = n), a.x % 2 == 0 && a.x--, s.x = a.x * i, a.y = 1 + 2 * Math.ceil((a.x * c - 1) / 2), s.y = Math.round(s.x * c), (a.y * a.x > o || n && n < a.y) && (n && n < a.y ? (a.y = n, a.y % 2 == 0 && a.x--) : a.y -= 2, s.y = a.y * i, a.x = 1 + 2 * Math.ceil((a.y / c - 1) / 2), s.x = Math.round(s.y / c)), {height: s.y, width: s.x, hideYDots: a.y, hideXDots: a.x}
                    }({originalWidth: this._image.width, originalHeight: this._image.height, maxHiddenDots: l, maxHiddenAxisDots: e - 14, dotSize: o}), f.label = 2;
                  case 2:
                    return this.clear(), this.drawBackground(), this.drawDots((function (t, r) {
                      var o, i, a, s, c, u;
                      return !(d._options.imageOptions.hideBackgroundDots && t >= (e - n.hideXDots) / 2 && t < (e + n.hideXDots) / 2 && r >= (e - n.hideYDots) / 2 && r < (e + n.hideYDots) / 2 || (null === (o = g[t]) || void 0 === o ? void 0 : o[r]) || (null === (i = g[t - e + 7]) || void 0 === i ? void 0 : i[r]) || (null === (a = g[t]) || void 0 === a ? void 0 : a[r - e + 7]) || (null === (s = p[t]) || void 0 === s ? void 0 : s[r]) || (null === (c = p[t - e + 7]) || void 0 === c ? void 0 : c[r]) || (null === (u = p[t]) || void 0 === u ? void 0 : u[r - e + 7]))
                    })), this.drawCorners(), this._options.image && this.drawImage({width: n.width, height: n.height, count: e, dotSize: o}), [2]
                }
              }))
            }, new ((r = void 0) || (r = Promise))((function (t, n) {
              function i(t) {
                try {
                  s(o.next(t))
                }
                catch (t) {
                  n(t)
                }
              }

              function a(t) {
                try {
                  s(o.throw(t))
                }
                catch (t) {
                  n(t)
                }
              }

              function s(e) {
                var o;
                e.done ? t(e.value) : (o = e.value, o instanceof r ? o : new r((function (t) {
                  t(o)
                }))).then(i, a)
              }

              s((o = o.apply(e, [])).next())
            }));
            var e, r, o
          }, t.prototype.drawBackground = function () {
            var t = this.context, e = this._options;
            if (t) {
              if (e.backgroundOptions.gradient) {
                var r = e.backgroundOptions.gradient, o = this._createGradient({context: t, options: r, additionalRotation: 0, x: 0, y: 0, size: this._canvas.width > this._canvas.height ? this._canvas.width : this._canvas.height});
                r.colorStops.forEach((function (t) {
                  var e = t.offset, r = t.color;
                  o.addColorStop(e, r)
                })), t.fillStyle = o
              }
              else e.backgroundOptions.color && (t.fillStyle = e.backgroundOptions.color);
              t.fillRect(0, 0, this._canvas.width, this._canvas.height)
            }
          }, t.prototype.drawDots = function (t) {
            var e = this;
            if (!this._qr) throw "QR code is not defined";
            var r = this.context;
            if (!r) throw "QR code is not defined";
            var o = this._options, n = this._qr.getModuleCount();
            if (n > o.width || n > o.height) throw "The canvas is too small.";
            var i = Math.min(o.width, o.height) - 2 * o.margin, a = Math.floor(i / n), s = Math.floor((o.width - n * a) / 2), c = Math.floor((o.height - n * a) / 2), l = new u({context: r, type: o.dotsOptions.type});
            r.beginPath();
            for (var d = function (r) {
              for (var o = function (o) {
                return t && !t(r, o) ? "continue" : f._qr.isDark(r, o) ? void l.draw(s + r * a, c + o * a, a, (function (i, a) {
                  return !(r + i < 0 || o + a < 0 || r + i >= n || o + a >= n) && !(t && !t(r + i, o + a)) && !!e._qr && e._qr.isDark(r + i, o + a)
                })) : "continue"
              }, i = 0; i < n; i++) {
                o(i)
              }
            }, f = this, h = 0; h < n; h++) {
              d(h);
            }
            if (o.dotsOptions.gradient) {
              var g = o.dotsOptions.gradient, p = this._createGradient({context: r, options: g, additionalRotation: 0, x: s, y: c, size: n * a});
              g.colorStops.forEach((function (t) {
                var e = t.offset, r = t.color;
                p.addColorStop(e, r)
              })), r.fillStyle = r.strokeStyle = p
            }
            else o.dotsOptions.color && (r.fillStyle = r.strokeStyle = o.dotsOptions.color);
            r.fill("evenodd")
          }, t.prototype.drawCorners = function (t) {
            var e = this;
            if (!this._qr) throw "QR code is not defined";
            var r = this.context;
            if (!r) throw "QR code is not defined";
            var o = this._options, n = this._qr.getModuleCount(), i = Math.min(o.width, o.height) - 2 * o.margin, a = Math.floor(i / n), s = 7 * a, c = 3 * a, l = Math.floor((o.width - n * a) / 2), f = Math.floor((o.height - n * a) / 2);
            [[0, 0, 0], [1, 0, Math.PI / 2], [0, 1, -Math.PI / 2]].forEach((function (i) {
              var y, v, b, w, m, x, O, _, S, M, k = i[0], C = i[1], D = i[2];
              if (!t || t(k, C)) {
                var P = l + k * a * (n - 7), I = f + C * a * (n - 7);
                if (null === (y = o.cornersSquareOptions) || void 0 === y ? void 0 : y.type) {
                  var B = new d({context: r, type: null === (v = o.cornersSquareOptions) || void 0 === v ? void 0 : v.type});
                  r.beginPath(), B.draw(P, I, s, D)
                }
                else {
                  var A = new u({context: r, type: o.dotsOptions.type});
                  r.beginPath();
                  for (var q = function (t) {
                    for (var e = function (e) {
                      if (!(null === (b = g[t]) || void 0 === b ? void 0 : b[e])) return "continue";
                      A.draw(P + t * a, I + e * a, a, (function (r, o) {
                        var n;
                        return !!(null === (n = g[t + r]) || void 0 === n ? void 0 : n[e + o])
                      }))
                    }, r = 0; r < g[t].length; r++) {
                      e(r)
                    }
                  }, E = 0; E < g.length; E++) {
                    q(E)
                  }
                }
                if (null === (w = o.cornersSquareOptions) || void 0 === w ? void 0 : w.gradient) {
                  var z = o.cornersSquareOptions.gradient, T = e._createGradient({context: r, options: z, additionalRotation: D, x: P, y: I, size: s});
                  z.colorStops.forEach((function (t) {
                    var e = t.offset, r = t.color;
                    T.addColorStop(e, r)
                  })), r.fillStyle = r.strokeStyle = T
                }
                else (null === (m = o.cornersSquareOptions) || void 0 === m ? void 0 : m.color) && (r.fillStyle = r.strokeStyle = o.cornersSquareOptions.color);
                if (r.fill("evenodd"), null === (x = o.cornersDotOptions) || void 0 === x ? void 0 : x.type) {
                  var H = new h({context: r, type: null === (O = o.cornersDotOptions) || void 0 === O ? void 0 : O.type});
                  r.beginPath(), H.draw(P + 2 * a, I + 2 * a, c, D)
                }
                else {
                  A = new u({context: r, type: o.dotsOptions.type}), r.beginPath();
                  var L = function (t) {
                    for (var e = function (e) {
                      if (!(null === (_ = p[t]) || void 0 === _ ? void 0 : _[e])) return "continue";
                      A.draw(P + t * a, I + e * a, a, (function (r, o) {
                        var n;
                        return !!(null === (n = p[t + r]) || void 0 === n ? void 0 : n[e + o])
                      }))
                    }, r = 0; r < p[t].length; r++) {
                      e(r)
                    }
                  };
                  for (E = 0; E < p.length; E++) {
                    L(E)
                  }
                }
                if (null === (S = o.cornersDotOptions) || void 0 === S ? void 0 : S.gradient) {
                  z = o.cornersDotOptions.gradient;
                  var N = e._createGradient({context: r, options: z, additionalRotation: D, x: P + 2 * a, y: I + 2 * a, size: c});
                  z.colorStops.forEach((function (t) {
                    var e = t.offset, r = t.color;
                    N.addColorStop(e, r)
                  })), r.fillStyle = r.strokeStyle = N
                }
                else (null === (M = o.cornersDotOptions) || void 0 === M ? void 0 : M.color) && (r.fillStyle = r.strokeStyle = o.cornersDotOptions.color);
                r.fill("evenodd")
              }
            }))
          }, t.prototype.loadImage = function () {
            var t = this;
            return new Promise((function (e, r) {
              var o = t._options, n = new Image;
              if (!o.image) return r("Image is not defined");
              "string" == typeof o.imageOptions.crossOrigin && (n.crossOrigin = o.imageOptions.crossOrigin), t._image = n, n.onload = function () {
                e()
              }, n.src = o.image
            }))
          }, t.prototype.drawImage = function (t) {
            var e = t.width, r = t.height, o = t.count, n = t.dotSize, i = this.context;
            if (!i) throw "canvasContext is not defined";
            if (!this._image) throw "image is not defined";
            var a = this._options, s = Math.floor((a.width - o * n) / 2), c = Math.floor((a.height - o * n) / 2), u = s + a.imageOptions.margin + (o * n - e) / 2, l = c + a.imageOptions.margin + (o * n - r) / 2, d = e - 2 * a.imageOptions.margin, f = r - 2 * a.imageOptions.margin;
            i.drawImage(this._image, u, l, d < 0 ? 0 : d, f < 0 ? 0 : f)
          }, t.prototype._createGradient = function (t) {
            var e, r = t.context, o = t.options, n = t.additionalRotation, i = t.x, a = t.y, s = t.size;
            if ("radial" === o.type) e = r.createRadialGradient(i + s / 2, a + s / 2, 0, i + s / 2, a + s / 2, s / 2); else {
              var c = ((o.rotation || 0) + n) % (2 * Math.PI), u = (c + 2 * Math.PI) % (2 * Math.PI), l = i + s / 2, d = a + s / 2, f = i + s / 2, h = a + s / 2;
              u >= 0 && u <= .25 * Math.PI || u > 1.75 * Math.PI && u <= 2 * Math.PI ? (l -= s / 2, d -= s / 2 * Math.tan(c), f += s / 2, h += s / 2 * Math.tan(c)) : u > .25 * Math.PI && u <= .75 * Math.PI ? (d -= s / 2, l -= s / 2 / Math.tan(c), h += s / 2, f += s / 2 / Math.tan(c)) : u > .75 * Math.PI && u <= 1.25 * Math.PI ? (l += s / 2, d += s / 2 * Math.tan(c), f -= s / 2, h -= s / 2 * Math.tan(c)) : u > 1.25 * Math.PI && u <= 1.75 * Math.PI && (d += s / 2, l += s / 2 / Math.tan(c), h -= s / 2, f -= s / 2 / Math.tan(c)), e = r.createLinearGradient(Math.round(l), Math.round(d), Math.round(f), Math.round(h))
            }
            return e
          }, t
        }();
        for (var v = {}, b = 0; b <= 40; b++) {
          v[b] = b;
        }
        const w = {width: 300, height: 300, data: "", margin: 0, qrOptions: {typeNumber: v[0], mode: void 0, errorCorrectionLevel: "Q"}, imageOptions: {hideBackgroundDots: !0, imageSize: .4, crossOrigin: void 0, margin: 0}, dotsOptions: {type: "square", color: "#000"}, backgroundOptions: {color: "#fff"}};
        var m = function () {
          return (m = Object.assign || function (t) {
            for (var e, r = 1, o = arguments.length; r < o; r++) {
              for (var n in e = arguments[r]) {
                Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
              }
            }
            return t
          }).apply(this, arguments)
        };

        function x(t) {
          var e = m({}, t);
          if (!e.colorStops || !e.colorStops.length) throw "Field 'colorStops' is required in gradient";
          return e.rotation ? e.rotation = Number(e.rotation) : e.rotation = 0, e.colorStops = e.colorStops.map((function (t) {
            return m(m({}, t), {offset: Number(t.offset)})
          })), e
        }

        function O(t) {
          var e = m({}, t);
          return e.width = Number(e.width), e.height = Number(e.height), e.margin = Number(e.margin), e.imageOptions = m(m({}, e.imageOptions), {
            hideBackgroundDots: Boolean(e.imageOptions.hideBackgroundDots),
            imageSize: Number(e.imageOptions.imageSize),
            margin: Number(e.imageOptions.margin)
          }), e.margin > Math.min(e.width, e.height) && (e.margin = Math.min(e.width, e.height)), e.dotsOptions = m({}, e.dotsOptions), e.dotsOptions.gradient && (e.dotsOptions.gradient = x(e.dotsOptions.gradient)), e.cornersSquareOptions && (e.cornersSquareOptions = m({}, e.cornersSquareOptions), e.cornersSquareOptions.gradient && (e.cornersSquareOptions.gradient = x(e.cornersSquareOptions.gradient))), e.cornersDotOptions && (e.cornersDotOptions = m({}, e.cornersDotOptions), e.cornersDotOptions.gradient && (e.cornersDotOptions.gradient = x(e.cornersDotOptions.gradient))), e.backgroundOptions && (e.backgroundOptions = m({}, e.backgroundOptions), e.backgroundOptions.gradient && (e.backgroundOptions.gradient = x(e.backgroundOptions.gradient))), e
        }

        var _ = r(192), S = r.n(_);
        const M = function () {
          function t(t) {
            this._options = t ? O(a(w, t)) : w, this.update()
          }

          return t._clearContainer = function (t) {
            t && (t.innerHTML = "")
          }, t.prototype.update = function (e) {
            t._clearContainer(this._container), this._options = e ? O(a(this._options, e)) : this._options, this._options.data && (this._qr = S()(this._options.qrOptions.typeNumber, this._options.qrOptions.errorCorrectionLevel), this._qr.addData(this._options.data, this._options.qrOptions.mode || function (t) {
              switch (!0) {
                case/^[0-9]*$/.test(t):
                  return "Numeric";
                case/^[0-9A-Z $%*+\-./:]*$/.test(t):
                  return "Alphanumeric";
                default:
                  return "Byte"
              }
            }(this._options.data)), this._qr.make(), this._canvas = new y(this._options), this._drawingPromise = this._canvas.drawQR(this._qr), this.append(this._container))
          }, t.prototype.append = function (t) {
            if (t) {
              if ("function" != typeof t.appendChild) throw "Container should be a single DOM node";
              this._canvas && t.appendChild(this._canvas.getCanvas()), this._container = t
            }
          }, t.prototype.download = function (t) {
            var e = this;
            this._drawingPromise && this._drawingPromise.then((function () {
              if (e._canvas) {
                var r = "png", o = "qr";
                "string" == typeof t ? (r = t, console.warn("Extension is deprecated as argument for 'download' method, please pass object { name: '...', extension: '...' } as argument")) : "object" == typeof t && null !== t && (t.name && (o = t.name), t.extension && (r = t.extension)), function (t, e) {
                  var r = document.createElement("a");
                  r.download = e, r.href = t, document.body.appendChild(r), r.click(), document.body.removeChild(r)
                }(e._canvas.getCanvas().toDataURL("image/" + r), o + "." + r)
              }
            }))
          }, t
        }()
      }
    }, e = {};

    function r(o) {
      if (e[o]) return e[o].exports;
      var n = e[o] = {exports: {}};
      return t[o](n, n.exports, r), n.exports
    }

    return r.n = t => {
      var e = t && t.__esModule ? () => t.default : () => t;
      return r.d(e, {a: e}), e
    }, r.d = (t, e) => {
      for (var o in e) {
        r.o(e, o) && !r.o(t, o) && Object.defineProperty(t, o, {enumerable: !0, get: e[o]})
      }
    }, r.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e), r(151)
  })().default
}, function (t, e, r) {
  t.exports = r.p + "10cc19bd484118dbcd0a7886a38ceddc.png"
}, function (t, e, r) {
}, function (t, e, r) {
  "use strict";
  r.r(e);
  var o = r(0), n = r.n(o);
  r(2);
  var i = r(1), a = r.n(i);
  const s = document.getElementById("form"), c = document.getElementById("qr-description"), u = new class {
    constructor({root: t} = {}) {
      t && this.init({root: t})
    }

    init({root: t}) {
      const e = t.querySelectorAll(`[${this._getNodeKey()}]`);
      e.forEach(t => {
        this._setNodeListener(t)
      }), this.nodes = this._buildNodes(e)
    }

    getState() {
      return this._buildState(this.nodes)
    }

    setState(t) {
      const e = function t(e) {
        const r = Object.keys(e), o = {};
        return r.forEach(r => {
          const n = e[r];
          if ("object" == typeof n && null !== n && n.constructor === {}.constructor) {
            const n = t(e[r]);
            Object.keys(n).forEach(t => {
              o[`${r}.${t}`] = n[t]
            })
          }
          else o[r] = n
        }), o
      }(t);
      Object.keys(e).forEach(t => {
        this._setNodeState(this.nodes[t], e[t]), this._getUpdateListener()({field: t, data: e[t]})
      })
    }

    onStateUpdate(t) {
      this.listener = t
    }

    _getUpdateListener() {
      return this.listener
    }

    _getNodeState(t) {
      return t[this._getNodeStateKey(t)]
    }

    _setNodeState(t, e) {
      t[this._getNodeStateKey(t)] = e
    }

    _getNodeKey() {
      return "node"
    }

    _getNodeStateKey(t) {
      return t.getAttribute("node-data-field") || "value"
    }

    _getChangeEventKey(t) {
      return t.getAttribute("node-change-event") || "onchange"
    }

    _buildState(t) {
      const e = Object.keys(t), r = {};
      return e.forEach(e => {
        r[e] = this._getNodeState(t[e])
      }), function t(e) {
        const r = Object.keys(e), o = {};
        return r.forEach(r => {
          const n = r.split("."), i = e[r], a = n.shift(), s = n.join(".");
          if (s.length) {
            const e = o[a] || {};
            e[s] = i, o[a] = t(e)
          }
          else o[a] = i
        }), o
      }(r)
    }

    _buildNodes(t) {
      const e = {};
      return t.forEach(t => {
        const r = t.getAttribute(this._getNodeKey());
        e[r] = t
      }), e
    }

    _setNodeListener(t) {
      const e = this._getChangeEventKey(t);
      t[e] = () => {
        this._getUpdateListener()({field: t.getAttribute(this._getNodeKey()), data: this._getNodeState(t)})
      }
    }
  }({root: s}), l = u.getState();
  delete l.dotsOptions.gradient;
  const d = new n.a({...l, image: a.a});

  function f(t, e) {
    let r, o;
    h(t) > h(e) ? (r = e, o = t) : (r = t, o = e), c.style["background-image"] = `linear-gradient(90deg, #000 0%, ${r} 50%, ${o} 100%)`
  }

  function h(t) {
    return parseInt(t.substring(1, 3), 16) + parseInt(t.substring(3, 5), 16) + parseInt(t.substring(5, 6), 16)
  }

  f(l.dotsOptions.color, l.backgroundOptions.color), u.onStateUpdate(({field: t, data: e}) => {
    const {image: r, imageUrl: o, dotsOptionsHelper: n, cornersSquareOptionsHelper: i, cornersDotOptionsHelper: a, backgroundOptionsHelper: s, ...c} = u.getState();
    if (f(c.dotsOptions.color, c.backgroundOptions.color), "image" === t && (e && e[0] ? function (t, e) {
      let r = new FileReader;
      r.onload = t => {
        e(t.target.result)
      }, r.readAsDataURL(t)
    }(e[0], t => {
      d.update({image: t})
    }) : d.update({image: null})), "dotsOptionsHelper.colorType.gradient" === t && e) {
      const t = document.getElementsByClassName("dotsOptionsHelper.colorType.gradient"), e = document.getElementsByClassName("dotsOptionsHelper.colorType.single");
      return Array.from(t).forEach(t => {
        t.style.visibility = "visible", t.style.height = "auto"
      }), Array.from(e).forEach(t => {
        t.style.visibility = "hidden", t.style.height = "0"
      }), void d.update({dotsOptions: {color: void 0, gradient: {type: n.gradient.linear ? "linear" : "radial", rotation: n.gradient.rotation / 180 * Math.PI, colorStops: [{offset: 0, color: n.gradient.color1}, {offset: 1, color: n.gradient.color2}]}}})
    }
    if ("dotsOptionsHelper.colorType.single" === t && e) {
      const t = document.getElementsByClassName("dotsOptionsHelper.colorType.single"), e = document.getElementsByClassName("dotsOptionsHelper.colorType.gradient");
      return Array.from(t).forEach(t => {
        t.style.visibility = "visible", t.style.height = "auto"
      }), Array.from(e).forEach(t => {
        t.style.visibility = "hidden", t.style.height = "0"
      }), void d.update({dotsOptions: {color: c.dotsOptions.color, gradient: null}})
    }
    if ("dotsOptionsHelper.gradient.linear" === t && e) d.update({dotsOptions: {gradient: {type: "linear"}}}); else if ("dotsOptionsHelper.gradient.radial" === t && e) d.update({dotsOptions: {gradient: {type: "radial"}}}); else if ("dotsOptionsHelper.gradient.color1" !== t) if ("dotsOptionsHelper.gradient.color2" !== t) if ("dotsOptionsHelper.gradient.rotation" !== t) {
      if ("cornersSquareOptionsHelper.colorType.gradient" === t && e) {
        const t = document.getElementsByClassName("cornersSquareOptionsHelper.colorType.gradient"), e = document.getElementsByClassName("cornersSquareOptionsHelper.colorType.single");
        return Array.from(t).forEach(t => {
          t.style.visibility = "visible", t.style.height = "auto"
        }), Array.from(e).forEach(t => {
          t.style.visibility = "hidden", t.style.height = "0"
        }), void d.update({cornersSquareOptions: {color: void 0, gradient: {type: i.gradient.linear ? "linear" : "radial", rotation: i.gradient.rotation / 180 * Math.PI, colorStops: [{offset: 0, color: i.gradient.color1}, {offset: 1, color: i.gradient.color2}]}}})
      }
      if ("cornersSquareOptionsHelper.colorType.single" === t && e) {
        const t = document.getElementsByClassName("cornersSquareOptionsHelper.colorType.single"), e = document.getElementsByClassName("cornersSquareOptionsHelper.colorType.gradient");
        return Array.from(t).forEach(t => {
          t.style.visibility = "visible", t.style.height = "auto"
        }), Array.from(e).forEach(t => {
          t.style.visibility = "hidden", t.style.height = "0"
        }), void d.update({cornersSquareOptions: {color: c.cornersSquareOptions.color, gradient: null}})
      }
      if ("cornersSquareOptionsHelper.gradient.linear" === t && e) d.update({cornersSquareOptions: {gradient: {type: "linear"}}}); else if ("cornersSquareOptionsHelper.gradient.radial" === t && e) d.update({cornersSquareOptions: {gradient: {type: "radial"}}}); else if ("cornersSquareOptionsHelper.gradient.color1" !== t) if ("cornersSquareOptionsHelper.gradient.color2" !== t) if ("cornersSquareOptionsHelper.gradient.rotation" !== t) {
        if ("cornersDotOptionsHelper.colorType.gradient" === t && e) {
          const t = document.getElementsByClassName("cornersDotOptionsHelper.colorType.gradient"), e = document.getElementsByClassName("cornersDotOptionsHelper.colorType.single");
          return Array.from(t).forEach(t => {
            t.style.visibility = "visible", t.style.height = "auto"
          }), Array.from(e).forEach(t => {
            t.style.visibility = "hidden", t.style.height = "0"
          }), void d.update({cornersDotOptions: {color: void 0, gradient: {type: a.gradient.linear ? "linear" : "radial", rotation: a.gradient.rotation / 180 * Math.PI, colorStops: [{offset: 0, color: a.gradient.color1}, {offset: 1, color: a.gradient.color2}]}}})
        }
        if ("cornersDotOptionsHelper.colorType.single" === t && e) {
          const t = document.getElementsByClassName("cornersDotOptionsHelper.colorType.single"), e = document.getElementsByClassName("cornersDotOptionsHelper.colorType.gradient");
          return Array.from(t).forEach(t => {
            t.style.visibility = "visible", t.style.height = "auto"
          }), Array.from(e).forEach(t => {
            t.style.visibility = "hidden", t.style.height = "0"
          }), void d.update({cornersDotOptions: {color: c.cornersDotOptions.color, gradient: null}})
        }
        if ("cornersDotOptionsHelper.gradient.linear" === t && e) d.update({cornersDotOptions: {gradient: {type: "linear"}}}); else if ("cornersDotOptionsHelper.gradient.radial" === t && e) d.update({cornersDotOptions: {gradient: {type: "radial"}}}); else if ("cornersDotOptionsHelper.gradient.color1" !== t) if ("cornersDotOptionsHelper.gradient.color2" !== t) if ("cornersDotOptionsHelper.gradient.rotation" !== t) {
          if ("backgroundOptionsHelper.colorType.gradient" === t && e) {
            const t = document.getElementsByClassName("backgroundOptionsHelper.colorType.gradient"), e = document.getElementsByClassName("backgroundOptionsHelper.colorType.single");
            return Array.from(t).forEach(t => {
              t.style.visibility = "visible", t.style.height = "auto"
            }), Array.from(e).forEach(t => {
              t.style.visibility = "hidden", t.style.height = "0"
            }), void d.update({backgroundOptions: {color: void 0, gradient: {type: s.gradient.linear ? "linear" : "radial", rotation: s.gradient.rotation / 180 * Math.PI, colorStops: [{offset: 0, color: s.gradient.color1}, {offset: 1, color: s.gradient.color2}]}}})
          }
          if ("backgroundOptionsHelper.colorType.single" === t && e) {
            const t = document.getElementsByClassName("backgroundOptionsHelper.colorType.single"), e = document.getElementsByClassName("backgroundOptionsHelper.colorType.gradient");
            return Array.from(t).forEach(t => {
              t.style.visibility = "visible", t.style.height = "auto"
            }), Array.from(e).forEach(t => {
              t.style.visibility = "hidden", t.style.height = "0"
            }), void d.update({backgroundOptions: {color: c.backgroundOptions.color, gradient: null}})
          }
          "backgroundOptionsHelper.gradient.linear" === t && e ? d.update({backgroundOptions: {gradient: {type: "linear"}}}) : "backgroundOptionsHelper.gradient.radial" === t && e ? d.update({backgroundOptions: {gradient: {type: "radial"}}}) : "backgroundOptionsHelper.gradient.color1" !== t ? "backgroundOptionsHelper.gradient.color2" !== t ? "backgroundOptionsHelper.gradient.rotation" !== t ? d.update(c) : d.update({backgroundOptions: {gradient: {rotation: s.gradient.rotation / 180 * Math.PI}}}) : d.update({backgroundOptions: {gradient: {colorStops: [{offset: 0, color: s.gradient.color1}, {offset: 1, color: e}]}}}) : d.update({backgroundOptions: {gradient: {colorStops: [{offset: 0, color: e}, {offset: 1, color: s.gradient.color2}]}}})
        }
        else d.update({cornersDotOptions: {gradient: {rotation: a.gradient.rotation / 180 * Math.PI}}}); else d.update({cornersDotOptions: {gradient: {colorStops: [{offset: 0, color: a.gradient.color1}, {offset: 1, color: e}]}}}); else d.update({cornersDotOptions: {gradient: {colorStops: [{offset: 0, color: e}, {offset: 1, color: a.gradient.color2}]}}})
      }
      else d.update({cornersSquareOptions: {gradient: {rotation: i.gradient.rotation / 180 * Math.PI}}}); else d.update({cornersSquareOptions: {gradient: {colorStops: [{offset: 0, color: i.gradient.color1}, {offset: 1, color: e}]}}}); else d.update({cornersSquareOptions: {gradient: {colorStops: [{offset: 0, color: e}, {offset: 1, color: i.gradient.color2}]}}})
    }
    else d.update({dotsOptions: {gradient: {rotation: n.gradient.rotation / 180 * Math.PI}}}); else d.update({dotsOptions: {gradient: {colorStops: [{offset: 0, color: n.gradient.color1}, {offset: 1, color: e}]}}}); else d.update({dotsOptions: {gradient: {colorStops: [{offset: 0, color: e}, {offset: 1, color: n.gradient.color2}]}}})
  });
  const g = document.getElementById("qr-code-generated");
  d.append(g), document.getElementById("button-cancel").onclick = () => {
    u.setState({image: (new DataTransfer).files})
  }, document.getElementById("button-clear-corners-square-color").onclick = () => {
    const t = u.getState();
    u.setState({cornersSquareOptions: {color: t.dotsOptions.color}})
  }, document.getElementById("button-clear-corners-dot-color").onclick = () => {
    const t = u.getState();
    u.setState({cornersDotOptions: {color: t.dotsOptions.color}})
  }, document.getElementById("qr-download").onclick = () => {
    const t = document.getElementById("qr-extension").value;
    d.download({extension: t, name: "qr-code-styling"})
  }, document.getElementById("export-options").addEventListener("click", (function () {
    const t = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(d._options));
    this.setAttribute("href", t), this.setAttribute("download", "options.json")
  }));
  let p = document.getElementsByClassName("accordion");
  for (let t = 0; t < p.length; t++) {
    p[t].classList.contains("accordion--open") || p[t].addEventListener("click", (function () {
      this.classList.toggle("active");
      const t = this.nextElementSibling;
      "grid" === t.style.display ? t.style.display = "none" : t.style.display = "grid"
    }))
  }
}]);
//# sourceMappingURL=index.81a8ec691dad584770c3.js.map