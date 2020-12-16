(function () {
  /*!
   * domready (c) Dustin Diaz 2014 - License MIT
   */
  function domReady() {
    var fns = [],
      listener,
      doc = typeof document === 'object' && document,
      hack = doc && doc.documentElement.doScroll,
      domContentLoaded = 'DOMContentLoaded',
      loaded =
        doc && (hack ? /^loaded|^c/ : /^loaded|^i|^c/).test(doc.readyState);

    if (!loaded && doc)
      doc.addEventListener(
        domContentLoaded,
        (listener = function () {
          doc.removeEventListener(domContentLoaded, listener);
          loaded = 1;
          while ((listener = fns.shift())) listener();
        }),
      );

    return function (fn) {
      loaded ? setTimeout(fn, 0) : fns.push(fn);
    };
  }

  var getElementsByClassName = function (className, tag, elm) {
    if (document.getElementsByClassName) {
      getElementsByClassName = function (className, tag, elm) {
        elm = elm || document;
        var elements = elm.getElementsByClassName(className),
          nodeName = tag ? new RegExp('\\b' + tag + '\\b', 'i') : null,
          returnElements = [],
          current;
        for (var i = 0, il = elements.length; i < il; i += 1) {
          current = elements[i];
          if (!nodeName || nodeName.test(current.nodeName)) {
            returnElements.push(current);
          }
        }
        return returnElements;
      };
    } else if (document.evaluate) {
      getElementsByClassName = function (className, tag, elm) {
        tag = tag || '*';
        elm = elm || document;
        var classes = className.split(' '),
          classesToCheck = '',
          xhtmlNamespace = 'http://www.w3.org/1999/xhtml',
          namespaceResolver =
            document.documentElement.namespaceURI === xhtmlNamespace
              ? xhtmlNamespace
              : null,
          returnElements = [],
          elements,
          node;
        for (var j = 0, jl = classes.length; j < jl; j += 1) {
          classesToCheck +=
            "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
        }
        try {
          elements = document.evaluate(
            './/' + tag + classesToCheck,
            elm,
            namespaceResolver,
            0,
            null,
          );
        } catch (e) {
          elements = document.evaluate(
            './/' + tag + classesToCheck,
            elm,
            null,
            0,
            null,
          );
        }
        while ((node = elements.iterateNext())) {
          returnElements.push(node);
        }
        return returnElements;
      };
    } else {
      getElementsByClassName = function (className, tag, elm) {
        tag = tag || '*';
        elm = elm || document;
        var classes = className.split(' '),
          classesToCheck = [],
          elements =
            tag === '*' && elm.all ? elm.all : elm.getElementsByTagName(tag),
          current,
          returnElements = [],
          match;
        for (var k = 0, kl = classes.length; k < kl; k += 1) {
          classesToCheck.push(new RegExp('(^|\\s)' + classes[k] + '(\\s|$)'));
        }
        for (var l = 0, ll = elements.length; l < ll; l += 1) {
          current = elements[l];
          match = false;
          for (var m = 0, ml = classesToCheck.length; m < ml; m += 1) {
            match = classesToCheck[m].test(current.className);
            if (!match) {
              break;
            }
          }
          if (match) {
            returnElements.push(current);
          }
        }
        return returnElements;
      };
    }
    return getElementsByClassName(className, tag, elm);
  };

  domReady()(function () {
    var widget, iframe, i, widgets, isDev, href;
    widgets = getElementsByClassName('covid-act-now-embed');
    for (i = 0; i < widgets.length; i++) {
      widget = widgets[i];
      iframe = document.createElement('iframe');
      href = 'https://covidactnow.org/embed/us/';
      var fips = widget.getAttribute('data-fips-id');
      var stateId = widget.getAttribute('data-state-id');
      // Fips can be passed to embed,
      if (stateId) {
        // Older versions of the embed passed state id + optionally fips.
        // In a later version, we will always pass fips and send embeds to one url
        if (fips) {
          href += 'county/' + fips;
        } else if (stateId) {
          href += stateId;
        }
      } else if (fips) {
        href += 'fips/' + fips;
      }

      // duplicated in EmbedEnums.ts
      var EMBED_WIDTH = 350; // in pixels
      var EMBED_HEIGHT = 370; // in pixels
      var US_MAP_EMBED_WIDTH = 400; // in pixels;
      var US_MAP_EMBED_HEIGHT = 440; // in pixels;

      iframe.setAttribute('src', href);
      iframe.setAttribute('frameborder', '0');

      if (fips || stateId) {
        iframe.setAttribute('width', EMBED_WIDTH);
        iframe.setAttribute('height', EMBED_HEIGHT);
      } else {
        iframe.setAttribute('width', US_MAP_EMBED_WIDTH);
        iframe.setAttribute('height', US_MAP_EMBED_HEIGHT);
      }

      widget.parentNode.replaceChild(iframe, widget);
    }
  });
})();
