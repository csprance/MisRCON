export default XMLRPC = window.XMLRPC = {};

let A = (function () {
  let A = {},
    methods = [
      'join', 'reverse', 'sort', 'push', 'pop', 'shift', 'unshift',
      'splice', 'concat', 'slice', 'indexOf', 'lastIndexOf',
      'forEach', 'map', 'reduce', 'reduceRight', 'filter',
      'some', 'every', 'isArray'
    ],
    methodCount = methods.length,
    applyMethod = function (name) {
      let method = Array.prototype[name];
      A[name] = function (arg1) {
        return method.apply(arg1, Array.prototype.slice.call(arguments, 1));
      };
    },
    i;

  for (i = 0; i < methodCount; i++) {
    applyMethod(methods[i]);
  }

  A.isArray = Array.isArray;

  return A;
})();

let XMLRPCFault = XMLRPC.XMLRPCFault = function () {
  Error.apply(this, arguments);
};
XMLRPCFault.prototype = new Error();
XMLRPCFault.prototype.type = 'XML-RPC fault';

let XMLRPCRequest = XMLRPC.XMLRPCRequest = function () {
  XMLHttpRequest.apply(this, arguments);
  this.responseType = 'document';
  this.addEventListener('readystatechange', function () {
    if (this.readyState == 4 && this.responseXML) {
      this.responseJSON = XMLRPC.fromXMLRPC(this.responseXML);
    }
  });
};
XMLRPCRequest.prototype = Object.create(XMLHttpRequest.prototype);

XMLRPCRequest.prototype.send = function (methodName, data) {
  let xmlDoc = XMLRPC.document(settings.methodName, settings.params);
  return this.prototype.send.call(this, xmlDoc);
};

let descendants = function (el, nodeName) {
  return A.filter(el.childNodes, function (node) {
    return node.nodeType == Node.ELEMENT_NODE && node.nodeName == nodeName;
  });
};
let descendant = function (el, nodeName) {
  return descendants(el, nodeName)[0];
};


/**
 * Make an XML-RPC document from a method name and a set of parameters
 */
XMLRPC.document = function (name, params) {
  let doc = document.implementation.createDocument(null, null, null);
  let mkel = function (name, children) {
    let node = doc.createElement(name);
    if (arguments.length == 1) return node;

    if (typeof children === 'string') {
      node.appendChild(doc.createTextNode(children));
    } else if (A.isArray(children)) {
      children.forEach(node.appendChild.bind(node));
    } else if (children instanceof Element) {
      node.appendChild(children);
    } else {
      throw new Error("Unknown type supplied to `mkel`");
    }
    return node;
  };

  let methodCall = mkel('methodCall', [
    mkel('methodName', name),
    mkel('params', params.map(function (param) {
      return mkel('param', mkel('value', XMLRPC.toXMLRPC(param, mkel)));
    }))
  ]);
  doc.appendChild(methodCall);
  return doc;
};

let _isInt = function (x) {
  return (x === parseInt(x, 10)) && !isNaN(x);
};

/**
 * Take a JavaScript value, and return an XML node representing the value
 * in XML-RPC style. If the value is one of the `XMLRPCType`s, that type is
 * used. Otherwise, a best guess is made as to its type. The best guess is
 * good enough in the vast majority of cases.
 */
XMLRPC.toXMLRPC = function (item, mkel) {

  if (item instanceof XMLRPCType) {
    return item.toXMLRPC(mkel);
  }

  let types = XMLRPC.types;
  let type = typeof item;

  if (item === undefined || item === null) {
    return types.nil.encode(item, mkel);
  } else if (item instanceof Date) {
    return types['date.iso8601'].encode(item, mkel);
  } else if (A.isArray(item)) {
    return types.array.encode(item, mkel);
  } else if (type == "string" || type == "boolean") {
    return types[type].encode(item, mkel);
  } else if (type == "number") {
    if (_isInt(item)) {
      return types['int'].encode(item, mkel);
    } else {
      return types['double'].encode(item, mkel);
    }
  } else if (type == "object") {
    if (item instanceof ArrayBuffer) {
      return types.base64.encode(item, mkel);
    } else {
      return types.struct.encode(item, mkel);
    }
  } else {
    throw new Error("Unknown type", item);
  }
};

/**
 * Take an XML-RPC document and decode it to an equivalent JavaScript
 * representation.
 *
 * If the XML-RPC document represents a fault, then an equivalent
 * XMLRPCFault will be thrown instead
 */
XMLRPC.parseDocument = function (doc) {
  let response = doc.querySelector('methodResponse');

  let faultNode = descendant(response, 'fault');
  if (!faultNode) {
    let params = response.querySelectorAll('params > param > value > *');
    return A.map(params, XMLRPC.parseNode);
  } else {
    let fault = XMLRPC.parseNode(faultNode.querySelector('value > *'));
    let err = new XMLRPCFault(fault.faultString);
    err.msg = err.message = fault.faultString;
    err.type = err.code = fault.faultCode;
    throw err;
  }
};

/*
 * Take an XML-RPC node, and return the JavaScript equivalent
 */
XMLRPC.parseNode = function (node) {

  // Some XML-RPC services return empty <value /> elements. This is not
  // legal XML-RPC, but we may as well handle it.
  if (node === undefined) {
    return null;
  }
  let nodename = node.nodeName.toLowerCase();
  if (nodename in XMLRPC.types) {
    return XMLRPC.types[nodename].decode(node);
  } else {
    throw new Error('Unknown type ' + nodename);
  }
};

/*
 * Take a <value> node, and return the JavaScript equivalent.
 */
XMLRPC.parseValue = function (value) {
  if (value === undefined) return;

  let child = value.childNodes[0];
  if (!child) {
    return "";
  } else if (child.nodeType === Node.ELEMENT_NODE) {
    // Child nodes should be decoded.
    return XMLRPC.parseNode(child);
  } else if (child.nodeType == Node.TEXT_NODE) {
    // If no child nodes, the value is a plain text node.
    return child.nodeValue;
  }
};

let XMLRPCType = function () {
};

XMLRPC.types = {};

/**
 * Make a XML-RPC type. We use these to encode and decode values. You can
 * also force a values type using this. See `XMLRPC.force()`
 */
XMLRPC.makeType = function (tagName, simple, encode, decode) {
  let Type;

  Type = function (value) {
    this.value = value;
  };
  Type.prototype = new XMLRPCType();
  Type.prototype.tagName = tagName;

  if (simple) {
    let simpleEncode = encode, simpleDecode = decode;
    encode = function (value, mkel) {
      let text = simpleEncode(value);
      return mkel(Type.tagName, text);
    };
    decode = function (node) {
      return simpleDecode(node.textContent, node);
    };
  }
  Type.prototype.toXMLRPC = function (mkel) {
    return Type.encode(this.value, mkel);
  };

  Type.tagName = tagName;
  Type.encode = encode;
  Type.decode = decode;

  XMLRPC.types[tagName] = Type;
};


// Number types
let _fromInt = function (value) {
  return '' + Math.floor(value);
};
let _toInt = function (text, _) {
  return parseInt(text, 10);
};

XMLRPC.makeType('int', true, _fromInt, _toInt),
  XMLRPC.makeType('i4', true, _fromInt, _toInt),
  XMLRPC.makeType('i8', true, _fromInt, _toInt),
  XMLRPC.makeType('i16', true, _fromInt, _toInt),
  XMLRPC.makeType('i32', true, _fromInt, _toInt),

  XMLRPC.makeType('double', true, String, function (text) {
    return parseFloat(text, 10);
  });

// String type. Fairly simple
XMLRPC.makeType('string', true, String, String);

// Boolean type. True == '1', False == '0'
XMLRPC.makeType('boolean', true, function (value) {
  return value ? '1' : '0';
}, function (text) {
  return text === '1';
});

// Dates are a little trickier
let _pad = function (n) {
  return n < 10 ? '0' + n : n;
};

XMLRPC.makeType('date.iso8601', true, function (d) {
  return [
    d.getUTCFullYear(), '-', _pad(d.getUTCMonth() + 1), '-',
    _pad(d.getUTCDate()), 'T', _pad(d.getUTCHours()), ':',
    _pad(d.getUTCMinutes()), ':', _pad(d.getUTCSeconds()), 'Z'
  ].join('');
}, function (text) {
  return new Date(text);
});

// Go between a base64 string and an ArrayBuffer
XMLRPC.binary = (function () {
  let pad = '=';
  let toChars = ('ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
  'abcdefghijklmnopqrstuvwxyz0123456789+/').split("");
  let fromChars = toChars.reduce(function (acc, chr, i) {
    acc[chr] = i;
    return acc;
  }, {});

  /*
   * In the following, three bytes are added together into a 24-bit
   * number, which is then split up in to 4 6-bit numbers - or vice versa.
   * That is why there is lots of shifting by multiples of 6 and 8, and
   * the magic numbers 3 and 4.
   *
   * The modulo 64 is for converting to base 64, and the modulo 256 is for
   * converting to 8-bit numbers.
   */
  return {
    toBase64: function (ab) {
      let acc = [];

      let int8View = new Uint8Array(ab);
      let int8Index = 0, int24;
      for (; int8Index < int8View.length; int8Index += 3) {

        // Grab three bytes
        int24 =
          (int8View[int8Index + 0] << 16) +
          (int8View[int8Index + 1] << 8) +
          (int8View[int8Index + 2] << 0);

        // Push four chars
        acc.push(toChars[(int24 >> 18) % 64]);
        acc.push(toChars[(int24 >> 12) % 64]);
        acc.push(toChars[(int24 >> 6) % 64]);
        acc.push(toChars[(int24 >> 0) % 64]);
      }

      // Set the last few characters to the padding character
      let padChars = 3 - ((ab.byteLength % 3) || 3);
      while (padChars--) {
        acc[acc.length - padChars - 1] = pad;
      }

      return acc.join('');
    },

    fromBase64: function (base64) {
      let base64Len = base64.length;

      // Work out the length of the data, accommodating for padding
      let abLen = (base64Len / 4) * 3;
      if (base64.charAt(base64Len - 1) === pad) {
        abLen--;
      }
      if (base64.charAt(base64Len - 2) === pad) {
        abLen--;
      }

      // Make the ArrayBuffer, and an Int8Array to work with it
      let ab = new ArrayBuffer(abLen);
      let int8View = new Uint8Array(ab);

      let base64Index = 0, int8Index = 0, int24;
      for (; base64Index < base64Len; base64Index += 4, int8Index += 3) {

        // Grab four chars
        int24 =
          (fromChars[base64[base64Index + 0]] << 18) +
          (fromChars[base64[base64Index + 1]] << 12) +
          (fromChars[base64[base64Index + 2]] << 6) +
          (fromChars[base64[base64Index + 3]] << 0);

        // Push three bytes
        int8View[int8Index + 0] = (int24 >> 16) % 256;
        int8View[int8Index + 1] = (int24 >> 8) % 256;
        int8View[int8Index + 2] = (int24 >> 0) % 256;

      }

      return ab;
    }
  };
})();

XMLRPC.makeType('base64', true, function (ab) {
  return XMLRPC.binary.toBase64(ab);
}, function (text) {
  return XMLRPC.binary.fromBase64(text);
});

// Nil/null
XMLRPC.makeType('nil', false,
  function (_, mkel) {
    return mkel('nil');
  },
  function (_) {
    return null;
  }
);

// Structs/Objects
XMLRPC.makeType('struct', false, function (value, mkel) {
  return mkel('struct', Object.keys(value).map(function (key) {
    return mkel('member', [
      mkel('name', name),
      mkel('value', XMLRPC.toXMLRPC(value[key], mkel))
    ]);
  }));
}, function (node) {
  return A.reduce(descendants(node, 'member'), function (struct, el) {
    let key = descendant(el, 'name').textContent;
    let value = XMLRPC.parseValue(descendant(el, 'value'));

    struct[key] = value;
    return struct;
  }, {});

});

// Arrays
XMLRPC.makeType('array', false, function (value, mkel) {
  return mkel('array', mkel('data', value.map(function (val) {
    return mkel('value', XMLRPC.toXMLRPC(val, mkel));
  })));
}, function (node) {
  return descendants(descendant(node, 'data'), 'value').map(XMLRPC.parseValue);
});


/**
 * Force a value to an XML-RPC type. All the usual XML-RPC types are
 * supported
 */
XMLRPC.force = function (type, value) {
  return new XMLRPC.types[type](value);
};
