"use strict";
let $rt_seed = 2463534242,
$rt_nextId = () => {
    let x = $rt_seed;
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    $rt_seed = x;
    return x;
},
$rt_wrapFunction0 = f => function() {
    return f(this);
},
$rt_wrapFunction1 = f => function(p1) {
    return f(this, p1);
},
$rt_wrapFunction2 = f => function(p1, p2) {
    return f(this, p1, p2);
},
$rt_mainStarter = f => (args, callback) => {
    if (!args) {
        args = [];
    }
    let javaArgs = $rt_createArray($rt_objcls(), args.length);
    for (let i = 0;i < args.length;++i) {
        javaArgs.data[i] = $rt_str(args[i]);
    }
    $rt_startThread(() => {
        f.call(null, javaArgs);
    }, callback);
},
$rt_eraseClinit = target => target.$clinit = () => {
},
$dbg_class = obj => {
    let cls = obj.constructor;
    let arrayDegree = 0;
    while (cls[$rt_meta] && cls[$rt_meta].item) {
        ++arrayDegree;
        cls = cls[$rt_meta].item;
    }
    let clsName = "";
    if (cls[$rt_meta].primitiveKind !== 0) {
        clsName = cls[$rt_meta].name;
    } else {
        clsName = cls[$rt_meta] ? cls[$rt_meta].name || "a/" + cls.name : "@" + cls.name;
    }
    while (arrayDegree-- > 0) {
        clsName += "[]";
    }
    return clsName;
},
$rt_classWithoutFields = superclass => {
    if (superclass === 0) {
        return function() {
        };
    }
    if (superclass === void 0) {
        superclass = $rt_objcls();
    }
    return function() {
        superclass.call(this);
    };
},
$rt_meta = Symbol("teavm_meta"),
$rt_cls = cls => {
    if (cls[$rt_meta].classObject === null) {
        cls[$rt_meta].classObject = jl_Class_createClass(cls);
    }
    return cls[$rt_meta].classObject;
},
$rt_objcls = () => jl_Object,
$rt_getThread = () => {
    {
        return jl_Thread_currentThread();
    }
},
$rt_setThread = t => {
    {
        return jl_Thread_setCurrentThread(t);
    }
},
$rt_callWithReceiver = f => function() {
    return f.apply(null, [this].concat(Array.prototype.slice.call(arguments)));
},
$rt_newClassMetadata = source => {
    return Object.assign({ name: null, binaryName: null, parent: null, superinterfaces: [], modifiers: 0, primitiveKind: 0, itemType: null, arrayType: null, enclosingClass: null, declaringClass: null, simpleName: null, clinit: () => {
    }, constructor: null, enumConstants: () => null, resolvedEnumConstants: null, reflection: null, classObject: null, assignableCache: null, valueToObject: o => o, objectToValue: o => o }, source || {  });
},
$rt_createPrimitiveCls = (name, binaryName, kind, config) => {
    let cls = () => {
    };
    let meta = $rt_newClassMetadata({ name: name, binaryName: binaryName, modifiers: 1 | 1 << 4, primitiveKind: kind });
    cls[$rt_meta] = meta;
    if (typeof config === 'function') {
        config(meta);
    }
    return cls;
},
$rt_booleancls = $rt_createPrimitiveCls("boolean", "Z", 1, meta => {
}),
$rt_bytecls = $rt_createPrimitiveCls("byte", "B", 2, meta => {
}),
$rt_shortcls = $rt_createPrimitiveCls("short", "S", 3, meta => {
}),
$rt_charcls = $rt_createPrimitiveCls("char", "C", 4, meta => {
}),
$rt_intcls = $rt_createPrimitiveCls("int", "I", 5, meta => {
}),
$rt_voidcls = $rt_createPrimitiveCls("void", "V", 9, meta => {
    meta.valueToObject = () => null;
}),
$rt_compare = (a, b) => a === b ? 0 : a < b ?  -1 : 1,
$rt_imul = Math.imul || function(a, b) {
    let ah = a >>> 16 & 0xFFFF;
    let al = a & 0xFFFF;
    let bh = b >>> 16 & 0xFFFF;
    let bl = b & 0xFFFF;
    return al * bl + (ah * bl + al * bh << 16 >>> 0) | 0;
},
$rt_udiv = (a, b) => (a >>> 0) / (b >>> 0) >>> 0,
$rt_umod = (a, b) => (a >>> 0) % (b >>> 0) >>> 0,
$rt_ucmp = (a, b) => {
    a >>>= 0;
    b >>>= 0;
    return a < b ?  -1 : a > b ? 1 : 0;
},
Long_ZERO = BigInt(0),
Long_create = (lo, hi) => BigInt.asIntN(64, BigInt.asUintN(64, BigInt(lo)) | BigInt.asUintN(64, BigInt(hi) << BigInt(32))),
Long_fromInt = val => BigInt.asIntN(64, BigInt(val | 0)),
Long_fromNumber = val => BigInt.asIntN(64, BigInt(val >= 0 ? Math.floor(val) : Math.ceil(val))),
Long_lo = val => Number(BigInt.asIntN(32, val)) | 0,
Long_lt = (a, b) => a < b,
Long_le = (a, b) => a <= b,
Long_add = (a, b) => BigInt.asIntN(64, a + b),
Long_sub = (a, b) => BigInt.asIntN(64, a - b),
Long_mul = (a, b) => BigInt.asIntN(64, a * b),
Long_and = (a, b) => BigInt.asIntN(64, a & b),
Long_xor = (a, b) => BigInt.asIntN(64, a ^ b),
Long_shr = (a, b) => BigInt.asIntN(64, a >> BigInt(b & 63)),
$rt_createArray = (cls, sz) => {
    let data = new Array(sz);
    data.fill(null);
    return new ($rt_arraycls(cls))(data);
},
$rt_createUnfilledArray = (cls, sz) => new ($rt_arraycls(cls))(new Array(sz)),
$rt_createCharArray = sz => new $rt_charArrayCls(new Uint16Array(sz)),
$rt_createByteArray = sz => new $rt_byteArrayCls(new Int8Array(sz)),
$rt_createByteArrayFromData = data => {
    let buffer = new Int8Array(data.length);
    buffer.set(data);
    return new $rt_byteArrayCls(buffer);
},
$rt_createShortArray = sz => new $rt_shortArrayCls(new Int16Array(sz)),
$rt_createIntArray = sz => new $rt_intArrayCls(new Int32Array(sz)),
$rt_createIntArrayFromData = data => {
    let buffer = new Int32Array(data.length);
    buffer.set(data);
    return new $rt_intArrayCls(buffer);
},
$rt_createBooleanArray = sz => new $rt_booleanArrayCls(new Int8Array(sz));
let $rt_arraycls = cls => {
    let result = cls[$rt_meta].arrayType;
    if (result === null) {
        function JavaArray(data) {
            ($rt_objcls()).call(this);
            this.data = data;
        }
        JavaArray.prototype = Object.create(($rt_objcls()).prototype);
        JavaArray.prototype.type = cls;
        JavaArray.prototype.constructor = JavaArray;
        JavaArray.prototype.toString = function() {
            let str = "[";
            for (let i = 0;i < this.data.length;++i) {
                if (i > 0) {
                    str += ", ";
                }
                str += this.data[i].toString();
            }
            str += "]";
            return str;
        };
        JavaArray.prototype.$clone = function() {
            let dataCopy;
            if ('slice' in this.data) {
                dataCopy = this.data.slice();
            } else {
                dataCopy = new this.data.constructor(this.data.length);
                for (let i = 0;i < dataCopy.length;++i) {
                    dataCopy[i] = this.data[i];
                }
            }
            return new ($rt_arraycls(this.type))(dataCopy);
        };
        let name = "[" + cls[$rt_meta].binaryName;
        JavaArray[$rt_meta] = $rt_newClassMetadata({ name: name, binaryName: name, parent: $rt_objcls(), itemType: cls });
        result = JavaArray;
        cls[$rt_meta].arrayType = JavaArray;
    }
    return result;
},
$rt_createMultiArray = (cls, dimensions) => {
    let first = 0;
    for (let i = dimensions.length - 1;i >= 0;i = i - 1 | 0) {
        if (dimensions[i] === 0) {
            first = i;
            break;
        }
    }
    if (first > 0) {
        for (let i = 0;i < first;i = i + 1 | 0) {
            cls = $rt_arraycls(cls);
        }
        if (first === dimensions.length - 1) {
            return $rt_createArray(cls, dimensions[first]);
        }
    }
    let arrays = new Array($rt_primitiveArrayCount(dimensions, first));
    let firstDim = dimensions[first] | 0;
    for (let i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createArray(cls, firstDim);
    }
    return $rt_createMultiArrayImpl(cls, arrays, dimensions, first, 0);
},
$rt_createShortMultiArray = dimensions => {
    let arrays = new Array($rt_primitiveArrayCount(dimensions, 0));
    if (arrays.length === 0) {
        return $rt_createMultiArray($rt_shortcls, dimensions);
    }
    let firstDim = dimensions[0] | 0;
    for (let i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createShortArray(firstDim);
    }
    return $rt_createMultiArrayImpl($rt_shortcls, arrays, dimensions, 0);
},
$rt_primitiveArrayCount = (dimensions, start) => {
    let val = dimensions[start + 1] | 0;
    for (let i = start + 2;i < dimensions.length;i = i + 1 | 0) {
        val = val * (dimensions[i] | 0) | 0;
        if (val === 0) {
            break;
        }
    }
    return val;
},
$rt_createMultiArrayImpl = (cls, arrays, dimensions, start) => {
    let limit = arrays.length;
    for (let i = start + 1 | 0;i < dimensions.length;i = i + 1 | 0) {
        cls = $rt_arraycls(cls);
        let dim = dimensions[i];
        let index = 0;
        let packedIndex = 0;
        while (index < limit) {
            let arr = $rt_createUnfilledArray(cls, dim);
            for (let j = 0;j < dim;j = j + 1 | 0) {
                arr.data[j] = arrays[index];
                index = index + 1 | 0;
            }
            arrays[packedIndex] = arr;
            packedIndex = packedIndex + 1 | 0;
        }
        limit = packedIndex;
    }
    return arrays[0];
};
function $rt_arrayLength(array) {
    return array.data.length;
}
let $rt_stringPool_instance,
$rt_stringPool = strings => {
    $rt_stringClassInit();
    $rt_stringPool_instance = new Array(strings.length);
    for (let i = 0;i < strings.length;++i) {
        $rt_stringPool_instance[i] = $rt_intern($rt_str(strings[i]));
    }
},
$rt_s = index => $rt_stringPool_instance[index],
$rt_charArrayToString = (array, offset, count) => {
    let result = "";
    let limit = offset + count;
    if (count <= 16) {
        for (let i = offset;i < limit;i = i + 1 | 0) {
            result += String.fromCharCode(array[i]);
        }
    } else {
        for (let i = offset;i < limit;i = i + 1024 | 0) {
            let next = Math.min(limit, i + 1024 | 0);
            result += String.fromCharCode.apply(null, array.subarray(i, next));
        }
    }
    return result;
},
$rt_str = str => str === null ? null : jl_String__init_(str),
$rt_ustr = str => str === null ? null : str.$nativeString,
$rt_stringClassInit = () => jl_String_$callClinit(),
$rt_intern;
{
    $rt_intern = str => str;
}
let $rt_isInstance = (obj, cls) => obj instanceof $rt_objcls() && !!obj.constructor[$rt_meta] && $rt_isAssignable(obj.constructor, cls),
$rt_isAssignable = (from, to) => {
    if (to === $rt_objcls()) {
        return from[$rt_meta].primitiveKind === 0;
    }
    if (from === to) {
        return true;
    }
    let map = from[$rt_meta].assignableCache;
    if (map === null) {
        map = new Map();
        from[$rt_meta].assignableCache = map;
    }
    let cachedResult = map.get(to);
    if (typeof cachedResult !== 'undefined') {
        return cachedResult;
    }
    if (to[$rt_meta].itemType !== null) {
        let result = from[$rt_meta].itemType !== null && $rt_isAssignable(from[$rt_meta].itemType, to[$rt_meta].itemType);
        map.set(to, result);
        return result;
    }
    let parent = from[$rt_meta].parent;
    if (parent !== null && parent !== from) {
        if ($rt_isAssignable(parent, to)) {
            map.set(to, true);
            return true;
        }
    }
    let superinterfaces = from[$rt_meta].superinterfaces;
    for (let i = 0;i < superinterfaces.length;i = i + 1 | 0) {
        if ($rt_isAssignable(superinterfaces[i], to)) {
            map.set(to, true);
            return true;
        }
    }
    map.set(to, false);
    return false;
},
$rt_castToInterface = (obj, cls) => {
    if (obj !== null && !$rt_isInstance(obj, cls)) {
        $rt_throwCCE();
    }
    return obj;
},
$rt_castToClass = (obj, cls) => {
    if (obj !== null && !(obj instanceof cls)) {
        $rt_throwCCE();
    }
    return obj;
},
$rt_throw = ex => {
    throw $rt_exception(ex);
},
$rt_javaExceptionProp = Symbol("javaException"),
$rt_exception = ex => {
    if (!ex.$jsException) {
        $rt_fillNativeException(ex);
    }
    return ex.$jsException;
},
$rt_fillNativeException = ex => {
    let javaCause = $rt_throwableCause(ex);
    let jsCause = javaCause !== null ? javaCause.$jsException : void 0;
    let cause = typeof jsCause === "object" ? { cause: jsCause } : void 0;
    let err = new JavaError("Java exception thrown", cause);
    if (typeof Error.captureStackTrace === "function") {
        Error.captureStackTrace(err);
    }
    err[$rt_javaExceptionProp] = ex;
    ex.$jsException = err;
    $rt_fillStack(err, ex);
},
$rt_fillStack = (err, ex) => {
    if (typeof $rt_decodeStack === "function" && err.stack) {
        let stack = $rt_decodeStack(err.stack);
        let javaStack = $rt_createArray($rt_stecls(), stack.length);
        let elem;
        let noStack = false;
        for (let i = 0;i < stack.length;++i) {
            let element = stack[i];
            elem = $rt_createStackElement($rt_str(element.className), $rt_str(element.methodName), $rt_str(element.fileName), element.lineNumber);
            if (elem == null) {
                noStack = true;
                break;
            }
            javaStack.data[i] = elem;
        }
        if (!noStack) {
            $rt_setStack(ex, javaStack);
        }
    }
},
JavaError;
if (typeof Reflect === 'object') {
    let defaultMessage = Symbol("defaultMessage");
    JavaError = function JavaError(message, cause) {
        let self = Reflect.construct(Error, [void 0, cause], JavaError);
        Object.setPrototypeOf(self, JavaError.prototype);
        self[defaultMessage] = message;
        return self;
    }
    ;
    JavaError.prototype = Object.create(Error.prototype, { constructor: { configurable: true, writable: true, value: JavaError }, message: { get() {
        try {
            let javaException = this[$rt_javaExceptionProp];
            if (typeof javaException === 'object') {
                let javaMessage = $rt_throwableMessage(javaException);
                if (typeof javaMessage === "object") {
                    return javaMessage !== null ? javaMessage.toString() : null;
                }
            }
            return this[defaultMessage];
        } catch (e){
            return "Exception occurred trying to extract Java exception message: " + e;
        }
    } } });
} else {
    JavaError = Error;
}
let $rt_javaException = e => e instanceof Error && typeof e[$rt_javaExceptionProp] === 'object' ? e[$rt_javaExceptionProp] : null,
$rt_wrapException = err => {
    let ex = err[$rt_javaExceptionProp];
    if (!ex) {
        ex = $rt_createException($rt_str("(JavaScript) " + err.toString()));
        err[$rt_javaExceptionProp] = ex;
        ex.$jsException = err;
        $rt_fillStack(err, ex);
    }
    return ex;
},
$rt_createException = message => jl_RuntimeException__init_1(message),
$rt_throwableMessage = t => jl_Throwable_getMessage(t),
$rt_throwableCause = t => jl_Throwable_getCause(t),
$rt_stecls = () => $rt_objcls(),
$rt_throwAIOOBE = () => $rt_throw(jl_ArrayIndexOutOfBoundsException__init_()),
$rt_throwCCE = () => $rt_throw(jl_ClassCastException__init_0()),
$rt_createStackElement = (className, methodName, fileName, lineNumber) => {
    {
        return null;
    }
},
$rt_setStack = (e, stack) => {
},
$rt_checkBounds = (index, array) => {
    if (index < 0 || index >= array.length) {
        $rt_throwAIOOBE();
    }
    return index;
},
$rt_checkUpperBound = (index, array) => {
    if (index >= array.length) {
        $rt_throwAIOOBE();
    }
    return index;
},
$rt_checkLowerBound = index => {
    if (index < 0) {
        $rt_throwAIOOBE();
    }
    return index;
},
$rt_nullCheck = val => {
    if (val === null) {
        $rt_throw(jl_NullPointerException__init_());
    }
    return val;
},
$rt_createOutputFunction = outputFunction => {
    let buffer = "";
    return msg => {
        let index = 0;
        while (true) {
            let next = msg.indexOf('\n', index);
            if (next < 0) {
                break;
            }
            outputFunction(buffer + msg.substring(index, next));
            buffer = "";
            index = next + 1;
        }
        buffer += msg.substring(index);
    };
},
$rt_putStderr = typeof $rt_putStderrCustom === "function" ? $rt_putStderrCustom : typeof console === "object" ? $rt_createOutputFunction(msg => console.error(msg)) : () => {
},
$rt_packageData = null,
$rt_packages = data => {
    let i = 0;
    let packages = new Array(data.length);
    for (let j = 0;j < data.length;++j) {
        let prefixIndex = data[i++];
        let prefix = prefixIndex >= 0 ? packages[prefixIndex] : "";
        packages[j] = prefix + data[i++] + ".";
    }
    $rt_packageData = packages;
},
$rt_allClasses = [],
$rt_metadata = data => {
    let packages = $rt_packageData;
    let i = 0;
    while (i < data.length) {
        let cls = data[i++];
        $rt_allClasses.push(cls);
        let m = $rt_newClassMetadata();
        cls[$rt_meta] = m;
        let className = data[i++];
        m.name = className !== 0 ? className : null;
        if (m.name !== null) {
            let packageIndex = data[i++];
            if (packageIndex >= 0) {
                m.name = packages[packageIndex] + m.name;
            }
        }
        m.binaryName = "L" + m.name + ";";
        let superclass = data[i++];
        m.parent = superclass !== 0 ? superclass : null;
        m.superinterfaces = data[i++];
        if (m.parent) {
            cls.prototype = Object.create(m.parent.prototype);
        } else {
            cls.prototype = {  };
        }
        cls.prototype.constructor = cls;
        m.modifiers = data[i++];
        m.primitiveKind = 0;
        if ((m.modifiers & 1 << 9) !== 0) {
            m.parent = null;
        }
        let innerClassInfo = data[i++];
        if (innerClassInfo !== 0) {
            let enclosingClass = innerClassInfo[0];
            m.enclosingClass = enclosingClass !== 0 ? enclosingClass : null;
            let declaringClass = innerClassInfo[1];
            m.declaringClass = declaringClass !== 0 ? declaringClass : null;
            let simpleName = innerClassInfo[2];
            m.simpleName = simpleName !== 0 ? simpleName : null;
        }
        let clinit = data[i++];
        m.clinit = clinit !== 0 ? () => {
            m.clinit = () => {
            };
            clinit();
        } : () => {
        };
        let virtualMethods = data[i++];
        if (virtualMethods !== 0) {
            for (let j = 0;j < virtualMethods.length;j += 2) {
                let name = virtualMethods[j];
                let func = virtualMethods[j + 1];
                if (typeof name === 'string') {
                    name = [name];
                }
                for (let k = 0;k < name.length;++k) {
                    cls.prototype[name[k]] = func;
                }
            }
        }
    }
};
function TeaVMThread(runner) {
    this.status = 3;
    this.stack = [];
    this.suspendCallback = null;
    this.runner = runner;
    this.attribute = null;
    this.completeCallback = null;
}
TeaVMThread.prototype.push = function() {
    for (let i = 0;i < arguments.length;++i) {
        this.stack.push(arguments[i]);
    }
    return this;
};
TeaVMThread.prototype.s = TeaVMThread.prototype.push;
TeaVMThread.prototype.pop = function() {
    return this.stack.pop();
};
TeaVMThread.prototype.l = TeaVMThread.prototype.pop;
TeaVMThread.prototype.isResuming = function() {
    return this.status === 2;
};
TeaVMThread.prototype.isSuspending = function() {
    return this.status === 1;
};
TeaVMThread.prototype.suspend = function(callback) {
    this.suspendCallback = callback;
    this.status = 1;
};
TeaVMThread.prototype.start = function(callback) {
    if (this.status !== 3) {
        throw new Error("Thread already started");
    }
    if ($rt_currentNativeThread !== null) {
        throw new Error("Another thread is running");
    }
    this.status = 0;
    this.completeCallback = callback ? callback : result => {
        if (result instanceof Error) {
            throw result;
        }
    };
    this.run();
};
TeaVMThread.prototype.resume = function() {
    if ($rt_currentNativeThread !== null) {
        throw new Error("Another thread is running");
    }
    this.status = 2;
    this.run();
};
TeaVMThread.prototype.run = function() {
    $rt_currentNativeThread = this;
    let result;
    try {
        result = this.runner();
    } catch (e){
        result = e;
    } finally {
        $rt_currentNativeThread = null;
    }
    if (this.suspendCallback !== null) {
        let self = this;
        let callback = this.suspendCallback;
        this.suspendCallback = null;
        callback(() => self.resume());
    } else if (this.status === 0) {
        this.completeCallback(result);
    }
};
let $rt_suspending = () => {
    let thread = $rt_nativeThread();
    return thread != null && thread.isSuspending();
},
$rt_resuming = () => {
    let thread = $rt_nativeThread();
    return thread != null && thread.isResuming();
},
$rt_requireNativeThread = () => {
    let nativeThread = $rt_nativeThread();
    if (nativeThread === null) {
        throw new Error("Suspension point reached from non-threading context " + "(perhaps, from native JS method). See https://teavm.org/docs/runtime/coroutines.html " + "('Interaction with JavaScript' section)");
    }
    return nativeThread;
},
$rt_startThread = (runner, callback) => (new TeaVMThread(runner)).start(callback),
$rt_currentNativeThread = null,
$rt_nativeThread = () => $rt_currentNativeThread,
$rt_invalidPointer = () => {
    throw new Error("Invalid recorded state");
};
function jl_Object() {
    this.$monitor = null;
    this.$id$ = 0;
}
let jl_Object_monitorEnterSync = $o => {
    let $o_0, var$3;
    if (jl_Thread_currentThread() !== null) {
        $o_0 = $rt_nullCheck($o);
        if ($o_0.$monitor === null)
            jl_Object_createMonitor($o_0);
        $o = $rt_nullCheck($o_0.$monitor);
        var$3 = $o.$owner;
        if (var$3 === null)
            $o.$owner = jl_Thread_currentThread();
        else if (var$3 !== jl_Thread_currentThread()) {
            var$3 = new jl_IllegalStateException;
            jl_Exception__init_0(var$3, $rt_s(0));
            $rt_throw(var$3);
        }
        $o = $rt_nullCheck($o_0.$monitor);
        $o.$count = $o.$count + 1 | 0;
        return;
    }
},
jl_Object_monitorExitSync = $o => {
    let var$2, var$3;
    if (jl_Thread_currentThread() !== null) {
        $o = $rt_nullCheck($o);
        if (!jl_Object_isEmptyMonitor($o) && ($rt_nullCheck($o.$monitor)).$owner === jl_Thread_currentThread()) {
            var$2 = $rt_nullCheck($o.$monitor);
            var$3 = var$2.$count - 1 | 0;
            var$2.$count = var$3;
            if (!var$3)
                var$2.$owner = null;
            jl_Object_isEmptyMonitor($o);
            return;
        }
        $o = new jl_IllegalMonitorStateException;
        jl_Exception__init_($o);
        $rt_throw($o);
    }
},
jl_Object_monitorEnter = $o => {
    let var$2, var$3, var$4, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        let $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$4 = $thread.pop();var$3 = $thread.pop();var$2 = $thread.pop();$o = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        var$2 = 1;
        var$3 = $rt_nullCheck($o);
        if (var$3.$monitor === null)
            jl_Object_createMonitor(var$3);
        var$4 = $rt_nullCheck(var$3.$monitor);
        if (var$4.$owner === null)
            var$4.$owner = jl_Thread_currentThread();
        if (($rt_nullCheck(var$3.$monitor)).$owner !== jl_Thread_currentThread()) {
            $ptr = 1;
            continue main;
        }
        $o = $rt_nullCheck(var$3.$monitor);
        $o.$count = $o.$count + var$2 | 0;
        return;
    case 1:
        jl_Object_monitorEnterWait$_asyncCall_$(var$3, var$2);
        if ($rt_suspending()) {
            break main;
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($o, var$2, var$3, var$4, $ptr);
},
jl_Object_createMonitor = $o => {
    let var$2;
    var$2 = new jl_Object$Monitor;
    var$2.$owner = jl_Thread_currentThread();
    ($rt_nullCheck($o)).$monitor = var$2;
},
jl_Object_monitorEnterWait = ($o, $count, $callback) => {
    let $thread_0, $o_0, $monitor, var$7, var$8, var$9, var$10, var$11, var$12, var$13;
    $thread_0 = jl_Thread_currentThread();
    $o_0 = $rt_nullCheck($o);
    $monitor = $o_0.$monitor;
    if ($monitor !== null) {
        if ($monitor.$owner !== null) {
            if ($monitor.$enteringThreads === null) {
                $o = new ju_ArrayDeque;
                $o.$array = $rt_createArray(jl_Object, 9);
                $monitor.$enteringThreads = $o;
            }
            $o = $monitor.$enteringThreads;
            $monitor = new jl_Object$monitorEnterWait$lambda$_6_0;
            $monitor.$_00 = $thread_0;
            $monitor.$_1 = $o_0;
            $monitor.$_2 = $count;
            $monitor.$_3 = $callback;
            $o = $rt_nullCheck($o);
            $count = $o.$tail;
            var$7 = $o.$head;
            $count = ($count >= var$7 ? $count - var$7 | 0 : (($rt_nullCheck($o.$array)).data.length - var$7 | 0) + $count | 0) + 1 | 0;
            var$7 = ($rt_nullCheck($o.$array)).data.length;
            if ($count >= var$7) {
                $count = jl_Math_max(var$7 * 2 | 0, (($count * 3 | 0) / 2 | 0) + 1 | 0);
                if ($count < 1)
                    $count = 2147483647;
                var$8 = $rt_createArray(jl_Object, $count);
                $count = 0;
                var$9 = $o.$head;
                var$10 = $o.$tail;
                if (var$9 <= var$10) {
                    var$11 = var$8.data;
                    while (var$9 < var$10) {
                        var$7 = $count + 1 | 0;
                        var$12 = ($rt_nullCheck($o.$array)).data;
                        var$9 = $rt_checkBounds(var$9, var$12);
                        var$11[$rt_checkBounds($count, var$11)] = var$12[var$9];
                        var$9 = var$9 + 1 | 0;
                        $count = var$7;
                    }
                } else {
                    var$11 = var$8.data;
                    while (true) {
                        var$12 = ($rt_nullCheck($o.$array)).data;
                        if (var$9 >= var$12.length)
                            break;
                        var$13 = $count + 1 | 0;
                        var$7 = $rt_checkBounds(var$9, var$12);
                        var$11[$rt_checkBounds($count, var$11)] = var$12[var$7];
                        var$9 = var$7 + 1 | 0;
                        $count = var$13;
                    }
                    var$7 = 0;
                    while (var$7 < var$10) {
                        var$9 = $count + 1 | 0;
                        var$7 = $rt_checkBounds(var$7, var$12);
                        var$11[$rt_checkBounds($count, var$11)] = var$12[var$7];
                        var$7 = var$7 + 1 | 0;
                        $count = var$9;
                    }
                }
                $o.$head = 0;
                $o.$tail = $count;
                $o.$array = var$8;
            }
            var$8 = $o.$array;
            $count = $o.$tail;
            var$8 = ($rt_nullCheck(var$8)).data;
            var$8[$rt_checkBounds($count, var$8)] = $monitor;
            $o.$tail = ju_ArrayDeque_modInc($count, var$8.length);
            $o.$version = $o.$version + 1 | 0;
            return;
        }
        $monitor.$owner = $thread_0;
        jl_Thread_setCurrentThread($thread_0);
        $o = $rt_nullCheck($o_0.$monitor);
        $o.$count = $o.$count + $count | 0;
        $o = null;
        otpp_AsyncCallbackWrapper_complete($rt_nullCheck($callback), $o);
        return;
    }
    jl_Object_createMonitor($o_0);
    jl_Thread_setCurrentThread($thread_0);
    $o = $rt_nullCheck($o_0.$monitor);
    $o.$count = $o.$count + $count | 0;
    $o = null;
    otpp_AsyncCallbackWrapper_complete($rt_nullCheck($callback), $o);
},
jl_Object_monitorExit = $o => {
    let var$2, var$3;
    var$2 = $rt_nullCheck($o);
    if (!jl_Object_isEmptyMonitor(var$2) && ($rt_nullCheck(var$2.$monitor)).$owner === jl_Thread_currentThread()) {
        $o = $rt_nullCheck(var$2.$monitor);
        var$3 = $o.$count - 1 | 0;
        $o.$count = var$3;
        if (var$3 <= 0) {
            $o.$owner = null;
            $o = $o.$enteringThreads;
            if (!($o !== null && !ju_ArrayDeque_isEmpty($rt_nullCheck($o))))
                jl_Object_isEmptyMonitor(var$2);
            else {
                $o = new jl_Object$monitorExit$lambda$_8_1;
                $o.$_0 = var$2;
                otp_Platform_schedule($o, 0);
            }
        }
        return;
    }
    $o = new jl_IllegalMonitorStateException;
    jl_Exception__init_($o);
    $rt_throw($o);
},
jl_Object_isEmptyMonitor = $this => {
    let $monitor, var$2;
    $monitor = $this.$monitor;
    if ($monitor !== null) {
        a: {
            if ($monitor.$owner === null) {
                var$2 = $monitor.$enteringThreads;
                if (!(var$2 !== null && !ju_ArrayDeque_isEmpty($rt_nullCheck(var$2)))) {
                    $monitor = $monitor.$notifyListeners;
                    if ($monitor === null)
                        break a;
                    if ($monitor.$isEmpty())
                        break a;
                }
            }
            return 0;
        }
        $this.$monitor = null;
        return 1;
    }
    return 1;
},
jl_Object__init_ = $this => {
    return;
},
jl_Object__init_0 = () => {
    let var_0 = new jl_Object();
    jl_Object__init_(var_0);
    return var_0;
},
jl_Object_getClass = $this => {
    return $rt_cls($rt_nullCheck(jl_Object_getObjectClassInfo($this)));
},
jl_Object_getObjectClassInfo = var$1 => {
    return var$1.constructor;
},
jl_Object_equals = ($this, var$1) => {
    return $this !== var$1 ? 0 : 1;
},
jl_Object_toString = $this => {
    let var$1, var$2, var$3, var$4, var$5, var$6, var$7, var$8, var$9;
    var$1 = jl_Class_getName($rt_nullCheck(jl_Object_getClass($this)));
    var$2 = $this;
    if (!var$2.$id$)
        var$2.$id$ = $rt_nextId();
    var$3 = $this.$id$;
    jl_Integer_$callClinit();
    if (!var$3)
        var$4 = $rt_s(1);
    else {
        if (!var$3)
            var$5 = 32;
        else {
            var$6 = 0;
            var$5 = var$3 >>> 16 | 0;
            if (var$5)
                var$6 = 16;
            else
                var$5 = var$3;
            var$7 = var$5 >>> 8 | 0;
            if (!var$7)
                var$7 = var$5;
            else
                var$6 = var$6 | 8;
            var$5 = var$7 >>> 4 | 0;
            if (!var$5)
                var$5 = var$7;
            else
                var$6 = var$6 | 4;
            var$7 = var$5 >>> 2 | 0;
            if (!var$7)
                var$7 = var$5;
            else
                var$6 = var$6 | 2;
            if (var$7 >>> 1 | 0)
                var$6 = var$6 | 1;
            var$5 = (32 - var$6 | 0) - 1 | 0;
        }
        var$5 = (((32 - var$5 | 0) + 4 | 0) - 1 | 0) / 4 | 0;
        var$8 = $rt_createCharArray(var$5);
        var$9 = var$8.data;
        var$6 = (var$5 - 1 | 0) * 4 | 0;
        var$5 = 0;
        while (var$6 >= 0) {
            var$7 = var$5 + 1 | 0;
            var$9[$rt_checkBounds(var$5, var$9)] = jl_Character_forDigit((var$3 >>> var$6 | 0) & 15, 16);
            var$6 = var$6 - 4 | 0;
            var$5 = var$7;
        }
        var$4 = jl_String__init_0(var$8);
    }
    var$2 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$2);
    jl_StringBuilder_append($rt_nullCheck(jl_StringBuilder_append0($rt_nullCheck(jl_StringBuilder_append(var$2, var$1)), 64)), var$4);
    return jl_AbstractStringBuilder_toString(var$2);
},
jl_Object_monitorEnterWait$_asyncCall_$ = (var$1, var$2) => {
    let thread = $rt_requireNativeThread();
    let javaThread = $rt_getThread();
    if (thread.isResuming()) {
        thread.status = 0;
        let result = thread.attribute;
        if (result instanceof Error) {
            throw result;
        }
        return result;
    }
    let callback = function() {
    };
    callback.$complete = val => {
        thread.attribute = val;
        $rt_setThread(javaThread);
        thread.resume();
    };
    callback.$error = e => {
        thread.attribute = $rt_exception(e);
        $rt_setThread(javaThread);
        thread.resume();
    };
    callback = otpp_AsyncCallbackWrapper_create(callback);
    thread.suspend(() => {
        try {
            jl_Object_monitorEnterWait(var$1, var$2, callback);
            ;
        } catch ($e){
            callback.$error($e);
        }
    });
    return null;
},
ji_Serializable = $rt_classWithoutFields(0),
jl_Comparable = $rt_classWithoutFields(0),
jl_CharSequence = $rt_classWithoutFields(0);
function jl_String() {
    jl_Object.call(this);
    this.$hashCode0 = 0;
}
let jl_String_EMPTY_CHARS = null,
jl_String_EMPTY = null,
jl_String_CASE_INSENSITIVE_ORDER = null,
jl_String_$callClinit = () => {
    jl_String_$callClinit = $rt_eraseClinit(jl_String);
    jl_String__clinit_();
},
jl_String__init_2 = ($this, var$1) => {
    let var$2;
    jl_String_$callClinit();
    var$2 = $rt_nullCheck(var$1);
    $this.$nativeString = $rt_charArrayToString(var$2.data, 0, var$2.data.length);
},
jl_String__init_0 = var_0 => {
    let var_1 = new jl_String();
    jl_String__init_2(var_1, var_0);
    return var_1;
},
jl_String__init_3 = (var$0, var$1) => {
    var$0.$nativeString = var$1;
},
jl_String__init_ = var_0 => {
    let var_1 = new jl_String();
    jl_String__init_3(var_1, var_0);
    return var_1;
},
jl_String__init_4 = (var$0, var$1, $offset, $count) => {
    let $value, var$5, var$6;
    jl_String_$callClinit();
    $value = $rt_nullCheck(var$1);
    var$5 = $value.data.length;
    if ($offset >= 0 && $count >= 0 && $count <= (var$5 - $offset | 0)) {
        var$0.$nativeString = $rt_charArrayToString($value.data, $offset, $count);
        return;
    }
    var$6 = new jl_IndexOutOfBoundsException;
    jl_Exception__init_(var$6);
    $rt_throw(var$6);
},
jl_String__init_1 = (var_0, var_1, var_2) => {
    let var_3 = new jl_String();
    jl_String__init_4(var_3, var_0, var_1, var_2);
    return var_3;
},
jl_String_charAt = ($this, $index) => {
    let var$2;
    if ($index >= 0 && $index < $this.$nativeString.length)
        return $this.$nativeString.charCodeAt($index);
    var$2 = new jl_StringIndexOutOfBoundsException;
    jl_Exception__init_(var$2);
    $rt_throw(var$2);
},
jl_String_length = $this => {
    return $this.$nativeString.length;
},
jl_String_substring = ($this, $beginIndex, $endIndex) => {
    let $length, var$4, var$5;
    $length = $this.$nativeString.length;
    var$4 = $rt_compare($beginIndex, $endIndex);
    if (var$4) {
        if (!$beginIndex && $endIndex == $length)
            return $this;
        if ($beginIndex >= 0 && var$4 <= 0 && $endIndex <= $length)
            return jl_String__init_($this.$nativeString.substring($beginIndex, $endIndex));
        var$5 = new jl_StringIndexOutOfBoundsException;
        jl_Exception__init_(var$5);
        $rt_throw(var$5);
    }
    return jl_String_EMPTY;
},
jl_String_equals = ($this, $other) => {
    let $str;
    if ($this !== $other) {
        if ($other instanceof jl_String) {
            $str = $rt_castToClass($other, jl_String);
            return $this.$nativeString !== ($rt_nullCheck($str)).$nativeString ? 0 : 1;
        }
        return 0;
    }
    return 1;
},
jl_String_hashCode = $this => {
    let $i;
    a: {
        if (!$this.$hashCode0) {
            $i = 0;
            while (true) {
                if ($i >= $this.$nativeString.length)
                    break a;
                $this.$hashCode0 = (31 * $this.$hashCode0 | 0) + $this.$nativeString.charCodeAt($i) | 0;
                $i = $i + 1 | 0;
            }
        }
    }
    return $this.$hashCode0;
},
jl_String_toLowerCase = $this => {
    let $lowerCase;
    $lowerCase = $this.$nativeString.toLowerCase();
    if ($lowerCase !== $this.$nativeString)
        $this = jl_String__init_($lowerCase);
    return $this;
},
jl_String__clinit_ = () => {
    let var$1;
    jl_String_EMPTY_CHARS = $rt_createCharArray(0);
    var$1 = new jl_String;
    jl_String_$callClinit();
    var$1.$nativeString = "";
    jl_String_EMPTY = var$1;
    jl_String_CASE_INSENSITIVE_ORDER = new jl_String$_clinit_$lambda$_118_0;
},
jlr_AnnotatedElement = $rt_classWithoutFields(0),
jlr_GenericDeclaration = $rt_classWithoutFields(0),
jlr_Type = $rt_classWithoutFields(0);
function jl_Class() {
    let a = this; jl_Object.call(a);
    a.$flags = 0;
    a.$classInfo = null;
    a.$name0 = null;
}
let jl_Class_createClass = $classInfo => {
    let var$2;
    var$2 = new jl_Class;
    var$2.$classInfo = $classInfo;
    return var$2;
},
jl_Class_getName = $this => {
    let var$1, $metadataName, $result, $itemType, $itemName;
    var$1 = $this.$flags;
    if (!(var$1 & 1)) {
        $this.$flags = var$1 | 1;
        $metadataName = ($rt_nullCheck($this.$classInfo))[$rt_meta].name;
        $result = $metadataName === null ? null : $rt_str($metadataName);
        if ($result === null) {
            $itemType = ($rt_nullCheck($this.$classInfo))[$rt_meta].itemType;
            if ($itemType !== null) {
                $itemName = jl_Class_getName($rt_nullCheck($rt_cls($itemType)));
                if ($itemName !== null) {
                    if ($itemType[$rt_meta].itemType !== null) {
                        $metadataName = new jl_StringBuilder;
                        jl_AbstractStringBuilder__init_($metadataName);
                        jl_StringBuilder_append($rt_nullCheck(jl_StringBuilder_append0($metadataName, 91)), $itemName);
                        $result = jl_AbstractStringBuilder_toString($metadataName);
                    } else {
                        $metadataName = new jl_StringBuilder;
                        jl_AbstractStringBuilder__init_($metadataName);
                        jl_StringBuilder_append0($rt_nullCheck(jl_StringBuilder_append($rt_nullCheck(jl_StringBuilder_append($metadataName, $rt_s(2))), $itemName)), 59);
                        $result = jl_AbstractStringBuilder_toString($metadataName);
                    }
                }
            }
        }
        $this.$name0 = $result;
    }
    return $this.$name0;
},
jl_Class_isPrimitive = $this => {
    return !($rt_nullCheck($this.$classInfo))[$rt_meta].primitiveKind ? 0 : 1;
},
jl_Class_getComponentType = $this => {
    let $itemTypeInfo;
    $itemTypeInfo = ($rt_nullCheck($this.$classInfo))[$rt_meta].itemType;
    return $itemTypeInfo === null ? null : $rt_cls($itemTypeInfo);
},
jl_Number = $rt_classWithoutFields(),
jl_Number_shortValue = $this => {
    return ($rt_nullCheck($this)).$value1 << 16 >> 16;
};
function jl_Integer() {
    jl_Number.call(this);
    this.$value1 = 0;
}
let jl_Integer_TYPE = null,
jl_Integer_$callClinit = () => {
    jl_Integer_$callClinit = $rt_eraseClinit(jl_Integer);
    jl_Integer__clinit_();
},
jl_Integer__init_0 = ($this, $value) => {
    jl_Integer_$callClinit();
    $this.$value1 = $value;
},
jl_Integer__init_ = var_0 => {
    let var_1 = new jl_Integer();
    jl_Integer__init_0(var_1, var_0);
    return var_1;
},
jl_Integer__clinit_ = () => {
    jl_Integer_TYPE = $rt_cls($rt_intcls);
};
function jl_AbstractStringBuilder() {
    let a = this; jl_Object.call(a);
    a.$buffer = null;
    a.$length0 = 0;
}
let jl_AbstractStringBuilder__init_ = $this => {
    jl_AbstractStringBuilder__init_0($this, 16);
},
jl_AbstractStringBuilder__init_2 = () => {
    let var_0 = new jl_AbstractStringBuilder();
    jl_AbstractStringBuilder__init_(var_0);
    return var_0;
},
jl_AbstractStringBuilder__init_0 = ($this, $capacity) => {
    $this.$buffer = $rt_createCharArray($capacity);
},
jl_AbstractStringBuilder__init_1 = var_0 => {
    let var_1 = new jl_AbstractStringBuilder();
    jl_AbstractStringBuilder__init_0(var_1, var_0);
    return var_1;
},
jl_AbstractStringBuilder_append = ($this, $string) => {
    return $this.$insert($this.$length0, $string);
},
jl_AbstractStringBuilder_insert = ($this, $index, $string) => {
    let $i, var$4, $i_0, var$6, $i_1;
    if ($index >= 0 && $index <= $this.$length0) {
        if ($string === null)
            $string = $rt_s(3);
        else if ($string.$nativeString.length ? 0 : 1)
            return $this;
        $this.$ensureCapacity($this.$length0 + $string.$nativeString.length | 0);
        $i = $this.$length0 - 1 | 0;
        while ($i >= $index) {
            var$4 = $this.$buffer;
            $i_0 = $i + $string.$nativeString.length | 0;
            var$6 = ($rt_nullCheck($this.$buffer)).data;
            $i_1 = $rt_checkBounds($i, var$6);
            $i = var$6[$i_1];
            var$4 = ($rt_nullCheck(var$4)).data;
            var$4[$rt_checkBounds($i_0, var$4)] = $i;
            $i = $i_1 + (-1) | 0;
        }
        $this.$length0 = $this.$length0 + $string.$nativeString.length | 0;
        $i_0 = 0;
        while ($i_0 < $string.$nativeString.length) {
            var$4 = $this.$buffer;
            $i = $index + 1 | 0;
            $i_1 = jl_String_charAt($string, $i_0);
            var$4 = ($rt_nullCheck(var$4)).data;
            var$4[$rt_checkBounds($index, var$4)] = $i_1;
            $i_0 = $i_0 + 1 | 0;
            $index = $i;
        }
        return $this;
    }
    $string = new jl_StringIndexOutOfBoundsException;
    jl_Exception__init_($string);
    $rt_throw($string);
},
jl_AbstractStringBuilder_append0 = ($this, $value) => {
    return jl_AbstractStringBuilder_append1($this, $value, 10);
},
jl_AbstractStringBuilder_append1 = ($this, $value, $radix) => {
    return jl_AbstractStringBuilder_insert0($this, $this.$length0, $value, $radix);
},
jl_AbstractStringBuilder_insert0 = ($this, $target, $value, $radix) => {
    let $positive, var$5, $pos, $sz, $posLimit, var$9;
    $positive = 1;
    if ($value < 0) {
        $positive = 0;
        $value =  -$value | 0;
    }
    a: {
        if ($rt_ucmp($value, $radix) < 0) {
            if ($positive)
                jl_AbstractStringBuilder_insertSpace($this, $target, $target + 1 | 0);
            else {
                jl_AbstractStringBuilder_insertSpace($this, $target, $target + 2 | 0);
                var$5 = $this.$buffer;
                $pos = $target + 1 | 0;
                var$5 = ($rt_nullCheck(var$5)).data;
                var$5[$rt_checkBounds($target, var$5)] = 45;
                $target = $pos;
            }
            var$5 = $this.$buffer;
            $value = jl_Character_forDigit($value, $radix);
            var$5 = ($rt_nullCheck(var$5)).data;
            var$5[$rt_checkBounds($target, var$5)] = $value;
        } else {
            $pos = 1;
            $sz = 1;
            $posLimit = $rt_udiv((-1), $radix);
            b: {
                c: {
                    while (true) {
                        var$9 = $rt_imul($pos, $radix);
                        if ($rt_ucmp(var$9, $value) > 0)
                            break c;
                        $sz = $sz + 1 | 0;
                        if ($rt_ucmp(var$9, $posLimit) > 0)
                            break;
                        $pos = var$9;
                    }
                    break b;
                }
                var$9 = $pos;
            }
            if (!$positive)
                $sz = $sz + 1 | 0;
            jl_AbstractStringBuilder_insertSpace($this, $target, $target + $sz | 0);
            if ($positive)
                $positive = $target;
            else {
                var$5 = $this.$buffer;
                $positive = $target + 1 | 0;
                var$5 = ($rt_nullCheck(var$5)).data;
                var$5[$rt_checkBounds($target, var$5)] = 45;
            }
            while (true) {
                if (!var$9)
                    break a;
                var$5 = $this.$buffer;
                $pos = $positive + 1 | 0;
                $sz = jl_Character_forDigit($rt_udiv($value, var$9), $radix);
                var$5 = ($rt_nullCheck(var$5)).data;
                var$5[$rt_checkBounds($positive, var$5)] = $sz;
                $value = $rt_umod($value, var$9);
                var$9 = $rt_udiv(var$9, $radix);
                $positive = $pos;
            }
        }
    }
    return $this;
},
jl_AbstractStringBuilder_ensureCapacity = ($this, $capacity) => {
    let var$2, $newLength, var$4, var$5, var$6;
    var$2 = ($rt_nullCheck($this.$buffer)).data.length;
    if (var$2 < $capacity) {
        $newLength = var$2 >= 1073741823 ? 2147483647 : jl_Math_max($capacity, jl_Math_max(var$2 * 2 | 0, 5));
        var$4 = $this.$buffer;
        var$5 = $rt_createCharArray($newLength);
        var$6 = var$5.data;
        var$4 = ($rt_nullCheck(var$4)).data;
        $newLength = jl_Math_min($newLength, var$4.length);
        var$2 = 0;
        while (var$2 < $newLength) {
            var$2 = $rt_checkBounds(var$2, var$4);
            $capacity = var$4[var$2];
            var$2 = $rt_checkUpperBound(var$2, var$6);
            var$6[var$2] = $capacity;
            var$2 = var$2 + 1 | 0;
        }
        $this.$buffer = var$5;
        return;
    }
},
jl_AbstractStringBuilder_toString = $this => {
    return jl_String__init_1($this.$buffer, 0, $this.$length0);
},
jl_AbstractStringBuilder_insertSpace = ($this, $start, $end) => {
    let var$3, $sz, $i, var$6;
    var$3 = $this.$length0;
    $sz = var$3 - $start | 0;
    $this.$ensureCapacity((var$3 + $end | 0) - $start | 0);
    $i = $sz - 1 | 0;
    while ($i >= 0) {
        var$6 = $this.$buffer;
        var$3 = $end + $i | 0;
        $sz = $start + $i | 0;
        var$6 = ($rt_nullCheck(var$6)).data;
        $sz = var$6[$rt_checkBounds($sz, var$6)];
        var$6[$rt_checkBounds(var$3, var$6)] = $sz;
        $i = $i + (-1) | 0;
    }
    $this.$length0 = $this.$length0 + ($end - $start | 0) | 0;
},
jl_Appendable = $rt_classWithoutFields(0),
jl_StringBuilder = $rt_classWithoutFields(jl_AbstractStringBuilder),
jl_StringBuilder_append = ($this, $obj) => {
    let var$2, var$3;
    var$2 = $this.$length0;
    var$3 = $rt_nullCheck($this);
    $obj = $obj === null ? $rt_s(3) : $rt_nullCheck($obj);
    jl_AbstractStringBuilder_insert($rt_nullCheck(var$3), var$2, $obj);
    return $this;
},
jl_StringBuilder_append0 = ($this, $c) => {
    let var$2, var$3, var$4;
    var$2 = $this.$length0;
    var$3 = $rt_nullCheck($this);
    jl_AbstractStringBuilder_insertSpace(var$3, var$2, var$2 + 1 | 0);
    var$4 = ($rt_nullCheck(var$3.$buffer)).data;
    var$4[$rt_checkBounds(var$2, var$4)] = $c;
    return $this;
},
jl_StringBuilder_toString = $this => {
    return jl_AbstractStringBuilder_toString($this);
},
jl_StringBuilder_ensureCapacity = ($this, var$1) => {
    jl_AbstractStringBuilder_ensureCapacity($this, var$1);
},
jl_StringBuilder_insert = ($this, var$1, var$2) => {
    jl_AbstractStringBuilder_insert($this, var$1, var$2);
    return $this;
};
function jl_Throwable() {
    let a = this; jl_Object.call(a);
    a.$message = null;
    a.$cause = null;
    a.$suppressionEnabled = 0;
    a.$writableStackTrace = 0;
    a.$suppressed = null;
    a.$stackTrace = null;
}
let jl_Throwable_fillInStackTrace = $this => {
    return $this;
},
jl_Throwable_initNativeException = $this => {
    $rt_fillNativeException($this);
},
jl_Throwable_getMessage = $this => {
    return $this.$message;
},
jl_Throwable_getLocalizedMessage = $this => {
    return $this.$message;
},
jl_Throwable_getCause = $this => {
    let var$1;
    var$1 = $this.$cause;
    if (var$1 === $this)
        var$1 = null;
    return var$1;
},
jl_Throwable_printStackTrace = $this => {
    let var$1, var$2, var$3;
    if (jl_System_errCache === null) {
        var$1 = new otcic_JSStderrPrintStream;
        var$2 = null;
        var$3 = null;
        ji_FilterOutputStream__init_(var$1, var$2);
        var$2 = new jl_StringBuilder;
        jl_AbstractStringBuilder__init_(var$2);
        var$1.$sb = var$2;
        var$1.$buffer0 = $rt_createCharArray(32);
        var$1.$autoFlush = 0;
        var$1.$charset = var$3;
        jl_System_errCache = var$1;
    }
    jl_Throwable_printStackTrace0($this, jl_System_errCache);
},
jl_Throwable_printStackTrace0 = ($this, $stream) => {
    let var$2, var$3, $element, var$5, var$6, var$7, var$8;
    var$2 = jl_Class_getName($rt_nullCheck(jl_Object_getClass($this)));
    var$3 = $rt_nullCheck($stream);
    otcic_JSStderrPrintStream_print(var$3, var$2);
    $element = $this.$message;
    if ($element !== null) {
        var$2 = new jl_StringBuilder;
        jl_AbstractStringBuilder__init_(var$2);
        jl_StringBuilder_append($rt_nullCheck(jl_StringBuilder_append(var$2, $rt_s(4))), $element);
        otcic_JSStderrPrintStream_print(var$3, jl_AbstractStringBuilder_toString(var$2));
    }
    a: {
        var$5 = $rt_nullCheck($rt_nullCheck($stream));
        otcic_JSStderrPrintStream_print(var$5, $rt_s(5));
        var$6 = $this.$stackTrace;
        if (var$6 !== null) {
            var$6 = var$6.data;
            var$7 = var$6.length;
            var$8 = 0;
            while (true) {
                if (var$8 >= var$7)
                    break a;
                var$8 = $rt_checkLowerBound(var$8);
                $element = var$6[var$8];
                otcic_JSStderrPrintStream_print(var$3, $rt_s(6));
                var$2 = $rt_s(3);
                if ($element !== null)
                    var$2 = $element.$toString();
                otcic_JSStderrPrintStream_print(var$5, var$2);
                otcic_JSStderrPrintStream_print(var$5, $rt_s(5));
                var$8 = var$8 + 1 | 0;
            }
        }
    }
    var$2 = $this.$cause;
    if (var$2 !== null && var$2 !== $this) {
        otcic_JSStderrPrintStream_print(var$3, $rt_s(7));
        ($rt_nullCheck($this.$cause)).$printStackTrace($stream);
    }
},
jl_Exception = $rt_classWithoutFields(jl_Throwable),
jl_Exception__init_ = $this => {
    $this.$suppressed = $rt_createArray(jl_Throwable, 0);
    jl_Throwable_initNativeException($this);
    $this.$suppressionEnabled = 1;
    $this.$writableStackTrace = 1;
},
jl_Exception__init_1 = () => {
    let var_0 = new jl_Exception();
    jl_Exception__init_(var_0);
    return var_0;
},
jl_Exception__init_0 = ($this, $message) => {
    $this.$suppressed = $rt_createArray(jl_Throwable, 0);
    jl_Throwable_initNativeException($this);
    $this.$suppressionEnabled = 1;
    $this.$writableStackTrace = 1;
    $this.$message = $message;
},
jl_Exception__init_2 = var_0 => {
    let var_1 = new jl_Exception();
    jl_Exception__init_0(var_1, var_0);
    return var_1;
},
jl_RuntimeException = $rt_classWithoutFields(jl_Exception),
jl_RuntimeException__init_ = $this => {
    jl_Exception__init_($this);
},
jl_RuntimeException__init_2 = () => {
    let var_0 = new jl_RuntimeException();
    jl_RuntimeException__init_(var_0);
    return var_0;
},
jl_RuntimeException__init_0 = ($this, $message) => {
    jl_Exception__init_0($this, $message);
},
jl_RuntimeException__init_1 = var_0 => {
    let var_1 = new jl_RuntimeException();
    jl_RuntimeException__init_0(var_1, var_0);
    return var_1;
},
jl_IndexOutOfBoundsException = $rt_classWithoutFields(jl_RuntimeException),
jl_ArrayIndexOutOfBoundsException = $rt_classWithoutFields(jl_IndexOutOfBoundsException),
jl_ArrayIndexOutOfBoundsException__init_0 = $this => {
    jl_Exception__init_($this);
},
jl_ArrayIndexOutOfBoundsException__init_ = () => {
    let var_0 = new jl_ArrayIndexOutOfBoundsException();
    jl_ArrayIndexOutOfBoundsException__init_0(var_0);
    return var_0;
},
jl_NullPointerException = $rt_classWithoutFields(jl_RuntimeException),
jl_NullPointerException__init_0 = $this => {
    jl_Exception__init_($this);
},
jl_NullPointerException__init_ = () => {
    let var_0 = new jl_NullPointerException();
    jl_NullPointerException__init_0(var_0);
    return var_0;
},
jl_ClassCastException = $rt_classWithoutFields(jl_RuntimeException),
jl_ClassCastException__init_ = $this => {
    jl_Exception__init_($this);
},
jl_ClassCastException__init_0 = () => {
    let var_0 = new jl_ClassCastException();
    jl_ClassCastException__init_(var_0);
    return var_0;
},
otrr_ReflectionInfo = $rt_classWithoutFields(),
otrr_ClassInfo = $rt_classWithoutFields(otrr_ReflectionInfo),
otrr_ClassInfo_newArrayInstance = (var$0, var$1) => {
    switch (var$0.primitiveKind) {
        default: return $rt_createArray(var$0, var$1);
    }
},
otr_StringInfo = $rt_classWithoutFields(otrr_ReflectionInfo),
BrowserGame = $rt_classWithoutFields(),
BrowserGame_$callClinit = () => {
    BrowserGame_$callClinit = $rt_eraseClinit(BrowserGame);
    BrowserGame__clinit_();
},
BrowserGame_main = var$1 => {
    let $game, var$3, var$4, var$5, var$6, var$7, var$8, var$9, var$10, $$je;
    BrowserGame_$callClinit();
    $game = GameMIDlet__init_0();
    a: {
        b: {
            try {
                if ($game.$int3) {
                    b_goto($rt_nullCheck($game.$do5));
                    h_if();
                    jml_Display_setCurrent($rt_nullCheck($game.$else3), $game.$do5);
                    $game.$char3 = 0;
                } else if ($game.$char3)
                    j_else($rt_nullCheck($game.$new1));
                else
                    j_else($rt_nullCheck($game.$do5));
                $game.$try5 = jl_Thread__init_0($game);
                break a;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_Exception) {
                    var$3 = $$je;
                    break b;
                } else {
                    throw $$e;
                }
            }
        }
        jl_Throwable_printStackTrace(var$3);
        jmm_MIDlet_notifyDestroyed($game);
    }
    var$3 = new BrowserGame$main$lambda$_1_0;
    var$3.$_03 = $game;
    var$4 = new BrowserGame$main$lambda$_1_1;
    var$5 = new BrowserGame$main$lambda$_1_2;
    var$6 = new BrowserGame$main$lambda$_1_3;
    var$7 = new BrowserGame$main$lambda$_1_4;
    var$8 = new BrowserGame$main$lambda$_1_5;
    var$8.$_01 = $game;
    var$9 = new BrowserGame$main$lambda$_1_6;
    var$10 = new BrowserGame$main$lambda$_1_7;
    var$10.$_04 = $game;
    mikiPlatform.bind(otji_JS_function(otji_JSWrapper_unwrap(var$3), "run"), otji_JS_function(otji_JSWrapper_unwrap(var$4), "run"), otji_JS_function(otji_JSWrapper_unwrap(var$5), "run"), otji_JS_function(otji_JSWrapper_unwrap(var$6), "run"), otji_JS_function(otji_JSWrapper_unwrap(var$7), "run"), otji_JS_function(otji_JSWrapper_unwrap(var$8), "run"), otji_JS_function(otji_JSWrapper_unwrap(var$9), "run"), otji_JS_function(otji_JSWrapper_unwrap(var$10), "get"));
    jml_Display_$callClinit();
    jml_Display_refresh($rt_nullCheck(jml_Display_instance));
},
BrowserGame__clinit_ = () => {
    return;
},
otp_Platform = $rt_classWithoutFields(),
otp_Platform_launchThread = $runnable => {
    let var$2, var$3, var$4, var$5;
    a: {
        b: {
            $runnable = $rt_nullCheck(($rt_nullCheck($runnable)).$_0);
            if (!jl_Object_isEmptyMonitor($runnable)) {
                var$2 = $rt_nullCheck($runnable.$monitor);
                if (var$2.$owner === null)
                    break b;
            }
            break a;
        }
        $runnable = var$2.$enteringThreads;
        if ($runnable !== null && !ju_ArrayDeque_isEmpty($rt_nullCheck($runnable))) {
            $runnable = $rt_nullCheck(var$2.$enteringThreads);
            var$3 = $runnable.$head;
            if (var$3 == $runnable.$tail)
                var$4 = null;
            else {
                var$5 = ($rt_nullCheck($runnable.$array)).data;
                var$4 = var$5[$rt_checkBounds(var$3, var$5)];
                var$5[$rt_checkBounds(var$3, var$5)] = null;
                $runnable.$head = ju_ArrayDeque_modInc(var$3, var$5.length);
                $runnable.$version = $runnable.$version + 1 | 0;
            }
            if (var$4 !== null) {
                var$4 = var$4;
                var$2.$enteringThreads = null;
                $runnable = $rt_nullCheck(var$4);
                var$4 = $runnable.$_00;
                var$2 = $runnable.$_1;
                var$3 = $runnable.$_2;
                $runnable = $runnable.$_3;
                jl_Thread_setCurrentThread(var$4);
                var$2 = $rt_nullCheck(($rt_nullCheck(var$2)).$monitor);
                var$2.$owner = var$4;
                var$2.$count = var$2.$count + var$3 | 0;
                var$4 = null;
                otpp_AsyncCallbackWrapper_complete($rt_nullCheck($runnable), var$4);
            } else {
                $runnable = new ju_NoSuchElementException;
                jl_Exception__init_($runnable);
                $rt_throw($runnable);
            }
        }
    }
},
otp_Platform_schedule = (var$1, var$2) => {
    setTimeout(() => {
        otp_Platform_launchThread(var$1);
    }, var$2);
},
otji_JS = $rt_classWithoutFields(),
otji_JS_function = (var$1, var$2) => {
    if (var$1 === null || var$1 === undefined) {
        return null;
    }
    let name = 'jso$functor$' + var$2;
    let result = var$1[name];
    if (typeof result !== 'function') {
        let fn = function() {
            return var$1[var$2].apply(var$1, arguments);
        };
        result = () => fn;
        var$1[name] = result;
    }
    return result();
},
otci_IntegerUtil = $rt_classWithoutFields(),
jmm_MIDlet = $rt_classWithoutFields(),
jmm_MIDlet_destroyed = 0,
jmm_MIDlet_notifyDestroyed = $this => {
    jmm_MIDlet_destroyed = 1;
    mikiPlatform.destroyed();
},
jl_Runnable = $rt_classWithoutFields(0);
function GameMIDlet() {
    let a = this; jmm_MIDlet.call(a);
    a.$else3 = null;
    a.$new1 = null;
    a.$do5 = null;
    a.$int3 = 0;
    a.$char3 = 0;
    a.$if11 = 0;
    a.$for7 = 0;
    a.$byte4 = 0;
    a.$try5 = null;
    a.$a29 = null;
}
let GameMIDlet_case = null,
GameMIDlet_if = (var$0, var$1) => {
    let var$2;
    var$2 = ($rt_nullCheck(GameMIDlet_case)).data;
    return var$2[$rt_checkBounds(var$1, var$2)];
},
GameMIDlet_a = var$1 => {
    let var$2;
    var$2 = GameMIDlet_case;
    var$1 = 16 + var$1 | 0;
    var$2 = ($rt_nullCheck(var$2)).data;
    return var$2[$rt_checkBounds(var$1, var$2)];
},
GameMIDlet_int = () => {
    return ($rt_nullCheck(GameMIDlet_case)).data.length - 16 | 0;
},
GameMIDlet__init_ = var$0 => {
    let var$1, var$2, var$3, var$4, var$5, var$6, var$7, $$je;
    var$0.$int3 = 1;
    var$0.$char3 = (-1);
    var$0.$if11 = 0;
    var$0.$for7 = 0;
    a: {
        b: {
            try {
                var$1 = null;
                c: {
                    d: {
                        try {
                            var$2 = $rt_nullCheck(jl_System_getProperty($rt_s(8)));
                            var$1 = var$2;
                            if (jl_String_length(var$2) > 2) {
                                var$1 = var$2;
                                var$2 = jl_String_substring(var$2, 0, 2);
                                var$1 = var$2;
                            }
                            break c;
                        } catch ($$e) {
                            $$je = $rt_wrapException($$e);
                            if ($$je instanceof jl_Exception) {
                                break d;
                            } else {
                                throw $$e;
                            }
                        }
                    }
                    var$2 = var$1;
                }
                var$1 = var$2 === null ? $rt_s(9) : jl_StringBuffer_toString($rt_nullCheck(jl_StringBuffer_append($rt_nullCheck(jl_StringBuffer_append(jl_StringBuffer__init_(), $rt_s(10))), jl_String_toLowerCase(var$2))));
                var$2 = w_Resources_open(jl_Object_getClass(var$0), var$1);
                if (var$2 === null)
                    var$2 = w_Resources_open(jl_Object_getClass(var$0), $rt_s(9));
                var$3 = ji_DataInputStream__init_(var$2);
                GameMIDlet_case = $rt_createArray(jl_String, ji_DataInputStream_readByte(var$3));
                var$4 = 0;
                while (true) {
                    var$5 = ($rt_nullCheck(GameMIDlet_case)).data;
                    if (var$4 >= var$5.length)
                        break;
                    var$6 = ji_DataInputStream_readUTF(var$3);
                    var$7 = $rt_checkBounds(var$4, var$5);
                    var$5[var$7] = var$6;
                    var$4 = var$7 + 1 | 0;
                }
                ji_ByteArrayInputStream_close($rt_nullCheck(var$2));
                var$1 = w_Resources_open(jl_Object_getClass(var$0), jl_StringBuffer_toString($rt_nullCheck(jl_StringBuffer_append($rt_nullCheck(jl_StringBuffer_append(jl_StringBuffer__init_(), var$1)), $rt_s(11)))));
                if (var$1 === null)
                    var$1 = w_Resources_open(jl_Object_getClass(var$0), $rt_s(12));
                var$3 = ji_DataInputStream_readUTF(ji_DataInputStream__init_(var$1));
                ji_ByteArrayInputStream_close($rt_nullCheck(var$1));
                e: {
                    f: {
                        try {
                            var$0.$a29 = k__init_($rt_s(13), $rt_s(14), 0, 1, 10, 1);
                            break e;
                        } catch ($$e) {
                            $$je = $rt_wrapException($$e);
                            if ($$je instanceof jl_Exception) {
                                break f;
                            } else {
                                throw $$e;
                            }
                        }
                    }
                    var$0.$a29 = null;
                }
                var$0.$else3 = jml_Display_getDisplay(var$0);
                var$1 = l__init_();
                var$2 = b__init_();
                var$0.$do5 = var$2;
                b_a4(var$2, var$3);
                var$2 = var$0.$do5;
                var$3 = var$0.$a29;
                b_a2($rt_nullCheck(var$2), var$3);
                j_a1($rt_nullCheck(var$0.$do5), var$0);
                b_a3($rt_nullCheck(var$0.$do5), var$1);
                var$1 = var$0.$do5;
                jml_Displayable_setCommandListener($rt_nullCheck(var$1), var$1);
                var$1 = g__init_();
                var$2 = d__init_();
                var$0.$new1 = var$2;
                j_a1(var$2, var$0);
                d_a10($rt_nullCheck(var$0.$new1), var$1);
                var$1 = var$0.$new1;
                var$2 = var$0.$do5;
                jml_Displayable_setCommandListener($rt_nullCheck(var$1), var$2);
                c_a4(var$0);
                var$1 = var$0.$do5;
                var$2 = var$0.$new1;
                b_a5($rt_nullCheck(var$1), var$2);
                j_a(d_e($rt_nullCheck(var$0.$new1)));
                break a;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_Exception) {
                    var$1 = $$je;
                    break b;
                } else {
                    throw $$e;
                }
            }
        }
        jl_Throwable_printStackTrace(var$1);
        jmm_MIDlet_notifyDestroyed(var$0);
    }
},
GameMIDlet__init_0 = () => {
    let var_0 = new GameMIDlet();
    GameMIDlet__init_(var_0);
    return var_0;
},
otj_JSObject = $rt_classWithoutFields(0),
w_Browser$Tick = $rt_classWithoutFields(0);
function BrowserGame$main$lambda$_1_0() {
    jl_Object.call(this);
    this.$_03 = null;
}
let BrowserGame$main$lambda$_1_0_run$exported$0 = var$1 => {
    let var$2, var$3, var$4, var$5, var$6, var$7, var$8, $$je;
    var$1 = ($rt_nullCheck(var$1)).$_03;
    BrowserGame_$callClinit();
    if (!jmm_MIDlet_destroyed) {
        var$1 = $rt_nullCheck(var$1);
        var$2 = 0;
        var$3 = var$1.$char3;
        if (!var$3) {
            j_run($rt_nullCheck(var$1.$do5));
            var$2 = ($rt_nullCheck(var$1.$do5)).$dn;
        } else if (var$3 == 1) {
            j_run($rt_nullCheck(var$1.$new1));
            var$2 = ($rt_nullCheck(var$1.$new1)).$bW;
        }
        if (var$2)
            a: {
                b: {
                    var$2 = var$1.$char3;
                    switch (var$2) {
                        case 0:
                            break;
                        case 1:
                            break b;
                        default:
                            break a;
                    }
                    if (var$2 != 1) {
                        j_a(1);
                        b_for($rt_nullCheck(var$1.$do5));
                        var$1.$char3 = 1;
                        if (!var$1.$byte4) {
                            var$4 = $rt_nullCheck(var$1.$new1);
                            if (!var$4.$bW)
                                j_else(var$4);
                            else
                                d_goto(var$4);
                            jml_Display_setCurrent($rt_nullCheck(var$1.$else3), var$1.$new1);
                        } else {
                            var$4 = $rt_nullCheck(var$1.$new1);
                            if (!var$4.$bW && !var$1.$int3)
                                d_for1(var$4);
                            jml_Canvas_repaint($rt_nullCheck(var$1.$new1));
                            var$4 = var$1.$a29;
                            if (var$4 === null)
                                var$4 = $rt_nullCheck(var$1.$new1);
                            else {
                                var$5 = var$1.$new1;
                                k_a(var$4, 0, 0);
                                var$4 = $rt_nullCheck(var$5);
                            }
                            d_goto($rt_nullCheck(var$1.$new1));
                            jml_Display_setCurrent($rt_nullCheck(var$1.$else3), var$1.$new1);
                        }
                        var$1.$int3 = 0;
                    }
                    break a;
                }
                if (var$2) {
                    var$1.$char3 = 0;
                    var$2 = 0;
                    var$4 = $rt_nullCheck(var$1.$new1);
                    if (!(var$4.$bW && !var$4.$as)) {
                        if (var$4.$d0)
                            j_a(1);
                        else {
                            j_if(var$4);
                            j_a(1);
                        }
                    } else {
                        d_for1(var$4);
                        j_a(0);
                        var$4 = var$1.$a29;
                        if (var$4 !== null) {
                            var$6 = ($rt_nullCheck(var$1.$new1)).$a110;
                            var$7 = ($rt_nullCheck(var$4.$if9)).data;
                            var$7 = var$7[$rt_checkUpperBound(0, var$7)];
                            var$8 = var$4.$new2 - 1 | 0;
                            var$7 = ($rt_nullCheck(var$7)).data;
                            var$8 = var$7[$rt_checkBounds(var$8, var$7)];
                            if (!var$4.$int5 ? (var$6 >= var$8 ? 0 : 1) : var$6 <= var$8 ? 0 : 1)
                                var$2 = 1;
                        }
                    }
                    b_goto($rt_nullCheck(var$1.$do5));
                    jml_Display_setCurrent($rt_nullCheck(var$1.$else3), var$1.$do5);
                    if (var$2) {
                        var$4 = var$1.$do5;
                        var$2 = ($rt_nullCheck(var$1.$new1)).$a110;
                        var$4 = $rt_nullCheck(var$4);
                        var$4.$dp = var$2;
                        jml_TextField_setString($rt_nullCheck(var$4.$dc), $rt_s(15));
                        jml_Display_setCurrent($rt_nullCheck(jml_Display_getDisplay(var$4.$goto1)), var$4.$dh);
                    }
                    var$4 = $rt_nullCheck(var$1.$do5);
                }
            }
        if (var$1.$if11) {
            if (var$1.$char3)
                d_for1($rt_nullCheck(var$1.$new1));
            else
                b_for($rt_nullCheck(var$1.$do5));
            var$1.$for7 = 1;
        }
        if (var$1.$for7) {
            var$4 = $rt_nullCheck(var$1.$new1);
            c: {
                d: {
                    try {
                        var$5 = jmr_RecordStore_openRecordStore($rt_s(16), 0);
                        var$7 = var$4.$E;
                        var$3 = ($rt_nullCheck(var$7)).data.length;
                        var$4 = $rt_nullCheck(var$5);
                        jmr_RecordStore_setRecord(var$4, 1, var$7, 0, var$3);
                        jmr_RecordStore_closeRecordStore(var$4);
                        break c;
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        if ($$je instanceof jl_Exception) {
                            var$4 = $$je;
                            break d;
                        } else {
                            throw $$e;
                        }
                    }
                }
                jl_Throwable_printStackTrace(var$4);
            }
            var$4 = $rt_nullCheck(var$1.$do5);
            jmm_MIDlet_notifyDestroyed(var$1);
        }
        jml_Display_$callClinit();
        jml_Display_refresh($rt_nullCheck(jml_Display_instance));
    }
},
w_Browser$Key = $rt_classWithoutFields(0),
BrowserGame$main$lambda$_1_1 = $rt_classWithoutFields(),
BrowserGame$main$lambda$_1_1_run$exported$0 = (var$1, var$2, var$3) => {
    let var$4, var$5;
    var$4 = var$2;
    var$5 = var$3 ? 1 : 0;
    var$1 = $rt_nullCheck(var$1);
    BrowserGame_$callClinit();
    jml_Display_$callClinit();
    var$1 = ($rt_nullCheck(jml_Display_instance)).$current;
    if (var$1 instanceof jml_Canvas) {
        var$1 = $rt_nullCheck($rt_castToClass(var$1, jml_Canvas));
        if (!var$5)
            j_keyReleased($rt_nullCheck(var$1), var$4);
        else
            j_keyPressed($rt_nullCheck(var$1), var$4);
    }
},
w_Browser$Action = $rt_classWithoutFields(0),
BrowserGame$main$lambda$_1_2 = $rt_classWithoutFields(),
BrowserGame$main$lambda$_1_2_run$exported$0 = (var$1, var$2) => {
    let var$3, var$4, var$5;
    var$3 = var$2;
    var$1 = $rt_nullCheck(var$1);
    BrowserGame_$callClinit();
    jml_Display_$callClinit();
    var$1 = $rt_nullCheck(jml_Display_instance);
    var$2 = var$1.$current;
    if (var$2 !== null) {
        var$4 = var$2.$listener;
        if (var$4 !== null && var$3 >= 0) {
            var$5 = $rt_nullCheck(var$2.$commands);
            if (var$3 < var$5.$size0) {
                var$4.$commandAction($rt_castToClass(ju_ArrayList_get(var$5, var$3), jml_Command), var$2);
                jml_Display_refresh(var$1);
            }
        }
    }
},
BrowserGame$main$lambda$_1_3 = $rt_classWithoutFields(),
BrowserGame$main$lambda$_1_3_run$exported$0 = (var$1, var$2) => {
    let var$3, var$4;
    var$3 = var$2;
    var$1 = $rt_nullCheck(var$1);
    BrowserGame_$callClinit();
    jml_Display_$callClinit();
    var$1 = $rt_nullCheck(jml_Display_instance);
    var$2 = var$1.$current;
    if (var$2 instanceof jml_List) {
        var$2 = $rt_nullCheck($rt_castToClass(var$2, jml_List));
        var$2.$selected = var$3;
        var$4 = var$2.$listener;
        if (var$4 !== null) {
            jml_List_$callClinit();
            var$4.$commandAction(jml_List_SELECT_COMMAND, var$2);
        }
        jml_Display_refresh(var$1);
    }
},
w_Browser$Text = $rt_classWithoutFields(0),
BrowserGame$main$lambda$_1_4 = $rt_classWithoutFields(),
BrowserGame$main$lambda$_1_4_run$exported$0 = (var$1, var$2, var$3) => {
    let var$4;
    var$4 = var$2;
    var$2 = $rt_str(var$3);
    var$1 = $rt_nullCheck(var$1);
    BrowserGame_$callClinit();
    jml_Display_$callClinit();
    var$1 = ($rt_nullCheck(jml_Display_instance)).$current;
    if (var$1 instanceof jml_Form) {
        var$1 = ju_ArrayList_get($rt_nullCheck(($rt_nullCheck($rt_castToClass(var$1, jml_Form))).$items), var$4);
        if (var$1 instanceof jml_TextField)
            jml_TextField_setString($rt_nullCheck($rt_castToClass(var$1, jml_TextField)), var$2);
    }
};
function BrowserGame$main$lambda$_1_5() {
    jl_Object.call(this);
    this.$_01 = null;
}
let BrowserGame$main$lambda$_1_5_run$exported$0 = var$1 => {
    var$1 = ($rt_nullCheck(var$1)).$_01;
    BrowserGame_$callClinit();
    var$1 = $rt_nullCheck(var$1);
    if (var$1.$char3)
        j_if($rt_nullCheck(var$1.$new1));
    else
        j_if($rt_nullCheck(var$1.$do5));
},
BrowserGame$main$lambda$_1_6 = $rt_classWithoutFields(),
BrowserGame$main$lambda$_1_6_run$exported$0 = var$1 => {
    var$1 = $rt_nullCheck(var$1);
    BrowserGame_$callClinit();
    jml_Display_$callClinit();
    var$1 = ($rt_nullCheck(jml_Display_instance)).$current;
    if (var$1 instanceof jml_Canvas)
        ($rt_nullCheck(var$1)).$showNotify();
},
w_Browser$Inspect = $rt_classWithoutFields(0);
function BrowserGame$main$lambda$_1_7() {
    jl_Object.call(this);
    this.$_04 = null;
}
let BrowserGame$main$lambda$_1_7_get$exported$0 = var$1 => {
    let var$2, var$3, var$4, var$5, var$6, var$7, var$8;
    var$1 = ($rt_nullCheck(var$1)).$_04;
    BrowserGame_$callClinit();
    var$1 = $rt_nullCheck(($rt_nullCheck(var$1)).$new1);
    var$2 = $rt_createIntArray(14).data;
    var$2[0] = var$1.$cK;
    var$2[1] = var$1.$aO;
    var$2[2] = var$1.$aM;
    var$2[3] = var$1.$a80;
    var$2[4] = var$1.$a110;
    var$2[5] = var$1.$c00;
    var$2[6] = var$1.$H;
    var$2[7] = var$1.$bS;
    var$2[8] = var$1.$bR;
    var$2[9] = var$1.$b1;
    var$2[10] = var$1.$cQ;
    var$1 = $rt_nullCheck(var$1.$bd);
    var$2[11] = var$1.$if8;
    var$2[12] = var$1.$char2;
    var$3 = var$1.$long0;
    if (var$3 === null)
        var$4 = 0;
    else {
        var$4 = 1;
        var$5 = 0;
        while (true) {
            var$6 = var$3.data;
            if (var$5 >= var$6.length)
                break;
            var$4 = 31 * var$4 | 0;
            var$7 = $rt_checkLowerBound(var$5);
            var$5 = var$6[var$7];
            jl_Byte_$callClinit();
            var$4 = var$4 + var$5 | 0;
            var$5 = var$7 + 1 | 0;
        }
    }
    var$2[13] = var$4;
    var$1 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$1);
    jl_AbstractStringBuilder_append(var$1, $rt_s(17));
    var$8 = 0;
    var$4 = var$2.length;
    while (var$8 < var$4) {
        if (var$8 > 0)
            jl_AbstractStringBuilder_append(var$1, $rt_s(18));
        var$5 = $rt_checkLowerBound(var$8);
        jl_AbstractStringBuilder_append0(var$1, var$2[var$5]);
        var$8 = var$5 + 1 | 0;
    }
    jl_AbstractStringBuilder_append(var$1, $rt_s(19));
    return $rt_ustr(jl_AbstractStringBuilder_toString(var$1));
};
function otji_JSWrapper() {
    jl_Object.call(this);
    this.$js = null;
}
let otji_JSWrapper_unwrap = $o => {
    if ($o !== null)
        return !($o instanceof otji_JSWrapper) ? $o : ($rt_nullCheck($rt_castToClass($o, otji_JSWrapper))).$js;
    return null;
},
w_Browser = $rt_classWithoutFields(),
w_Browser_now = () => {
    return Long_fromNumber(mikiPlatform.clock);
},
w_Browser_text$js_body$_12 = (var$1, var$2, var$3, var$4, var$5, var$6, var$7, var$8, var$9, var$10, var$11) => {
    mikiPlatform.text(var$1, var$2, var$3, var$4, var$5, var$6, var$7, var$8, var$9, var$10, var$11);
};
function jml_Display() {
    jl_Object.call(this);
    this.$current = null;
}
let jml_Display_instance = null,
jml_Display_$callClinit = () => {
    jml_Display_$callClinit = $rt_eraseClinit(jml_Display);
    jml_Display__clinit_();
},
jml_Display_getDisplay = var$1 => {
    jml_Display_$callClinit();
    return jml_Display_instance;
},
jml_Display_getCurrent = $this => {
    return $this.$current;
},
jml_Display_setCurrent = ($this, $next) => {
    let var$2;
    var$2 = $this.$current;
    if (var$2 !== $next) {
        if (var$2 !== null)
            var$2.$hideNotify();
        $this.$current = $next;
        $next = $rt_nullCheck($next);
        $next.$dirty = 1;
        $next.$showNotify();
        return;
    }
},
jml_Display_refresh = $this => {
    let var$1;
    var$1 = $this.$current;
    if (var$1 !== null && var$1.$dirty)
        var$1.$render();
},
jml_Display__clinit_ = () => {
    let var$1;
    var$1 = new jml_Display;
    jml_Display_$callClinit();
    jml_Display_instance = var$1;
},
ju_Comparator = $rt_classWithoutFields(0),
jl_String$_clinit_$lambda$_118_0 = $rt_classWithoutFields(),
jl_Character = $rt_classWithoutFields(),
jl_Character_TYPE = null,
jl_Character_characterCache = null,
jl_Character_$callClinit = () => {
    jl_Character_$callClinit = $rt_eraseClinit(jl_Character);
    jl_Character__clinit_();
},
jl_Character_forDigit = ($digit, $radix) => {
    jl_Character_$callClinit();
    if ($radix >= 2 && $radix <= 36 && $digit >= 0 && $digit < $radix)
        return $digit < 10 ? (48 + $digit | 0) & 65535 : ((97 + $digit | 0) - 10 | 0) & 65535;
    return 0;
},
jl_Character__clinit_ = () => {
    jl_Character_TYPE = $rt_cls($rt_charcls);
    jl_Character_characterCache = $rt_createArray(jl_Character, 128);
},
jl_StringBuffer = $rt_classWithoutFields(jl_AbstractStringBuilder),
jl_StringBuffer__init_0 = $this => {
    jl_AbstractStringBuilder__init_($this);
},
jl_StringBuffer__init_ = () => {
    let var_0 = new jl_StringBuffer();
    jl_StringBuffer__init_0(var_0);
    return var_0;
},
jl_StringBuffer_append = ($this, $string) => {
    jl_AbstractStringBuilder_append($this, $string);
    return $this;
},
jl_StringBuffer_append0 = ($this, $value) => {
    jl_AbstractStringBuilder_append0($this, $value);
    return $this;
},
jl_StringBuffer_toString = $this => {
    return jl_AbstractStringBuilder_toString($this);
},
jl_StringBuffer_ensureCapacity = ($this, var$1) => {
    jl_AbstractStringBuilder_ensureCapacity($this, var$1);
},
jl_StringBuffer_insert = ($this, var$1, var$2) => {
    jl_AbstractStringBuilder_insert($this, var$1, var$2);
    return $this;
},
w_Resources = $rt_classWithoutFields(),
w_Resources_open = ($owner, $name) => {
    let $length, $data, var$5, $i, var$7;
    $length = mikiPlatform.resourceLength($rt_ustr($name));
    if ($length >= 0) {
        $data = $rt_createByteArray($length);
        var$5 = $data.data;
        $i = 0;
        while ($i < $length) {
            var$7 = mikiPlatform.resourceByte($rt_ustr($name), $i) << 24 >> 24;
            $i = $rt_checkBounds($i, var$5);
            var$5[$i] = var$7;
            $i = $i + 1 | 0;
        }
        return ji_ByteArrayInputStream__init_($data);
    }
    return null;
},
jl_AutoCloseable = $rt_classWithoutFields(0),
ji_Closeable = $rt_classWithoutFields(0),
ji_InputStream = $rt_classWithoutFields();
function ji_FilterInputStream() {
    ji_InputStream.call(this);
    this.$in = null;
}
let ji_FilterInputStream_close = $this => {
    let var$1;
    var$1 = $rt_nullCheck($this.$in);
},
ji_FilterInputStream_skip = ($this, $count) => {
    let var$2, var$3, var$4, var$5;
    var$2 = $rt_nullCheck($this.$in);
    var$3 = var$2.$count1;
    var$4 = var$2.$pos;
    var$5 = Long_fromInt(var$3 - var$4 | 0);
    if (Long_lt($count, var$5))
        var$5 = $count;
    var$3 = Long_lo(var$5);
    var$2.$pos = var$4 + var$3 | 0;
    return Long_fromInt(var$3);
},
ji_DataInput = $rt_classWithoutFields(0);
function ji_DataInputStream() {
    ji_FilterInputStream.call(this);
    this.$buff = null;
}
let ji_DataInputStream__init_0 = ($this, $in) => {
    $this.$in = $in;
    $this.$buff = $rt_createByteArray(8);
},
ji_DataInputStream__init_ = var_0 => {
    let var_1 = new ji_DataInputStream();
    ji_DataInputStream__init_0(var_1, var_0);
    return var_1;
},
ji_DataInputStream_readBoolean = $this => {
    let $temp, var$2;
    $temp = ji_ByteArrayInputStream_read0($rt_nullCheck($this.$in));
    if ($temp >= 0)
        return !$temp ? 0 : 1;
    var$2 = new ji_EOFException;
    jl_Exception__init_(var$2);
    $rt_throw(var$2);
},
ji_DataInputStream_readByte = $this => {
    let $temp, var$2;
    $temp = ji_ByteArrayInputStream_read0($rt_nullCheck($this.$in));
    if ($temp < 0) {
        var$2 = new ji_EOFException;
        jl_Exception__init_(var$2);
        $rt_throw(var$2);
    }
    return $temp << 24 >> 24;
},
ji_DataInputStream_readToBuff = ($this, $count) => {
    let $offset, var$3, var$4, var$5, $bytesRead;
    $offset = 0;
    while ($offset < $count) {
        var$3 = $this.$in;
        var$4 = $this.$buff;
        var$5 = $count - $offset | 0;
        $bytesRead = ji_ByteArrayInputStream_read($rt_nullCheck(var$3), var$4, $offset, var$5);
        if ($bytesRead == (-1))
            return $bytesRead;
        $offset = $offset + $bytesRead | 0;
    }
    return $offset;
},
ji_DataInputStream_readInt = $this => {
    let var$1, var$2;
    if (ji_DataInputStream_readToBuff($this, 4) >= 0) {
        var$1 = ($rt_nullCheck($this.$buff)).data;
        return (var$1[$rt_checkUpperBound(0, var$1)] & 255) << 24 | (var$1[$rt_checkUpperBound(1, var$1)] & 255) << 16 | (var$1[$rt_checkUpperBound(2, var$1)] & 255) << 8 | var$1[$rt_checkUpperBound(3, var$1)] & 255;
    }
    var$2 = new ji_EOFException;
    jl_Exception__init_(var$2);
    $rt_throw(var$2);
},
ji_DataInputStream_readShort = $this => {
    let var$1, var$2;
    if (ji_DataInputStream_readToBuff($this, 2) >= 0) {
        var$1 = ($rt_nullCheck($this.$buff)).data;
        return ((var$1[$rt_checkUpperBound(0, var$1)] & 255) << 24 >> 16 | var$1[$rt_checkUpperBound(1, var$1)] & 255) << 16 >> 16;
    }
    var$2 = new ji_EOFException;
    jl_Exception__init_(var$2);
    $rt_throw(var$2);
},
ji_DataInputStream_readUTF = $this => {
    let var$1, var$2, var$3, var$4, var$5, var$6, var$7;
    if (ji_DataInputStream_readToBuff($this, 2) >= 0) {
        var$1 = ($rt_nullCheck($this.$buff)).data;
        var$2 = ((var$1[$rt_checkUpperBound(0, var$1)] & 255) << 8 | var$1[$rt_checkUpperBound(1, var$1)] & 255) & 65535;
        var$1 = $rt_createByteArray(var$2);
        var$3 = $rt_createCharArray(var$2);
        var$4 = 0;
        var$5 = $rt_nullCheck($this);
        if (var$2 >= 0) {
            a: {
                if (var$2) {
                    if (var$5.$in !== null) {
                        if (var$4 <= (var$1.data.length - var$2 | 0)) {
                            var$6 = var$2;
                            while (var$6 > 0) {
                                var$7 = ji_ByteArrayInputStream_read($rt_nullCheck(var$5.$in), var$1, var$4, var$6);
                                if (var$7 < 0) {
                                    var$5 = new ji_EOFException;
                                    jl_Exception__init_(var$5);
                                    $rt_throw(var$5);
                                }
                                var$4 = var$4 + var$7 | 0;
                                var$6 = var$6 - var$7 | 0;
                            }
                            break a;
                        }
                        var$5 = new jl_IndexOutOfBoundsException;
                        jl_Exception__init_(var$5);
                        $rt_throw(var$5);
                    }
                    var$5 = new jl_NullPointerException;
                    jl_Exception__init_(var$5);
                    $rt_throw(var$5);
                }
            }
            return ji_DataInputStream_convertUTF8WithBuf(var$1, var$3, 0, var$2);
        }
        var$5 = new jl_IndexOutOfBoundsException;
        jl_Exception__init_(var$5);
        $rt_throw(var$5);
    }
    var$5 = new ji_EOFException;
    jl_Exception__init_(var$5);
    $rt_throw(var$5);
},
ji_DataInputStream_convertUTF8WithBuf = ($buf, $out, $offset, $utfSize) => {
    let $count, $s, var$7, $b, var$9, $ch, var$11, $s_0, $a, var$14, $c;
    $count = 0;
    $s = 0;
    a: {
        while ($count < $utfSize) {
            var$7 = $count + 1 | 0;
            $b = $offset + $count | 0;
            $buf = $rt_nullCheck($buf);
            var$9 = $buf.data;
            $ch = var$9[$rt_checkBounds($b, var$9)] & 65535;
            $out = $rt_nullCheck($out);
            var$11 = $out.data;
            $s_0 = $rt_checkBounds($s, var$11);
            var$11[$s_0] = $ch;
            $a = var$11[$s_0];
            if ($ch < 128)
                $s = $s_0 + 1 | 0;
            else if (($a & 224) == 192) {
                if (var$7 >= $utfSize) {
                    var$14 = new ji_UTFDataFormatException;
                    jl_Exception__init_0(var$14, $rt_s(20));
                    $rt_throw(var$14);
                }
                $c = var$7 + 1 | 0;
                $b = var$9[$rt_checkBounds($offset + var$7 | 0, var$9)];
                if (($b & 192) != 128) {
                    var$14 = new ji_UTFDataFormatException;
                    jl_Exception__init_0(var$14, $rt_s(21));
                    $rt_throw(var$14);
                }
                $s = $s_0 + 1 | 0;
                var$11[$s_0] = (($a & 31) << 6 | $b & 63) & 65535;
                var$7 = $c;
            } else {
                if (($a & 240) != 224) {
                    var$14 = new ji_UTFDataFormatException;
                    jl_Exception__init_0(var$14, $rt_s(21));
                    $rt_throw(var$14);
                }
                $count = var$7 + 1 | 0;
                if ($count >= $utfSize) {
                    var$14 = new ji_UTFDataFormatException;
                    jl_Exception__init_0(var$14, $rt_s(21));
                    $rt_throw(var$14);
                }
                $b = var$9[$rt_checkBounds($offset + var$7 | 0, var$9)];
                var$7 = $count + 1 | 0;
                $c = var$9[$rt_checkBounds($offset + $count | 0, var$9)];
                if (($b & 192) != 128)
                    break a;
                if (($c & 192) != 128)
                    break a;
                $s = $s_0 + 1 | 0;
                var$11[$s_0] = (($a & 15) << 12 | ($b & 63) << 6 | $c & 63) & 65535;
            }
            $count = var$7;
        }
        return jl_String__init_1($out, 0, $s);
    }
    var$14 = new ji_UTFDataFormatException;
    jl_Exception__init_0(var$14, $rt_s(21));
    $rt_throw(var$14);
},
l = $rt_classWithoutFields(),
l__init_0 = var$0 => {
    return;
},
l__init_ = () => {
    let var_0 = new l();
    l__init_0(var_0);
    return var_0;
};
function jml_Displayable() {
    let a = this; jl_Object.call(a);
    a.$commands = null;
    a.$listener = null;
    a.$title = null;
    a.$dirty = 0;
}
let jml_Displayable__init_ = $this => {
    $this.$commands = ju_ArrayList__init_();
    $this.$title = $rt_s(15);
    $this.$dirty = 1;
},
jml_Displayable_addCommand = ($this, $command) => {
    let var$2, var$3, var$4, var$5, var$6, var$7, var$8, var$9, var$10, var$11, var$12, var$13, var$14, var$15, var$16, var$17, var$18, var$19, var$20, var$21, var$22, var$23;
    var$2 = $rt_nullCheck($rt_nullCheck($this.$commands));
    var$3 = new ju_AbstractList$1;
    var$3.$this$0 = var$2;
    var$3.$modCount0 = var$2.$modCount;
    var$3.$size2 = ($rt_nullCheck(var$2)).$size0;
    var$3.$removeIndex = (-1);
    var$2 = $rt_nullCheck(var$3);
    a: {
        b: {
            while (true) {
                var$4 = var$2.$index;
                if (!(var$4 >= var$2.$size2 ? 0 : 1))
                    break b;
                var$5 = var$2.$modCount0;
                var$3 = var$2.$this$0;
                if (var$5 != ($rt_nullCheck(var$3)).$modCount)
                    break;
                var$2.$removeIndex = var$4;
                var$2.$index = var$4 + 1 | 0;
                if (ju_Objects_equals(ju_ArrayList_get($rt_nullCheck(var$3), var$4), $command)) {
                    var$4 = 1;
                    break a;
                }
            }
            $command = new ju_ConcurrentModificationException;
            jl_Exception__init_($command);
            $rt_throw($command);
        }
        var$4 = 0;
    }
    if (!var$4) {
        ju_ArrayList_add($rt_nullCheck($this.$commands), $command);
        $command = $this.$commands;
        var$2 = new jml_Displayable$addCommand$lambda$_1_0;
        var$3 = new ju_Comparator$comparingInt$lambda$_14_0;
        var$3.$_02 = var$2;
        $command = $rt_nullCheck($command);
        var$6 = $command.$array0;
        var$7 = $command.$size0;
        if (0 <= var$7) {
            var$8 = $rt_createArray(jl_Object, var$7 - 0 | 0);
            var$9 = var$8.data;
            var$5 = 0;
            while (var$5 < var$7) {
                var$10 = var$5 - 0 | 0;
                var$6 = $rt_nullCheck(var$6);
                var$11 = var$6.data;
                var$5 = $rt_checkBounds(var$5, var$11);
                var$9[$rt_checkBounds(var$10, var$9)] = var$11[var$5];
                var$5 = var$5 + 1 | 0;
            }
            var$12 = var$9.length;
            if (var$12) {
                var$11 = $rt_createArray(jl_Object, var$12);
                var$5 = 1;
                var$13 = var$8;
                while (var$5 < var$12) {
                    var$14 = 0;
                    while (true) {
                        var$15 = var$13.data;
                        var$16 = var$15.length;
                        if (var$14 >= var$16)
                            break;
                        var$17 = jl_Math_min(var$16, var$14 + var$5 | 0);
                        var$18 = var$14 + (2 * var$5 | 0) | 0;
                        var$19 = jl_Math_min(var$16, var$18);
                        var$20 = var$14;
                        var$21 = var$17;
                        c: {
                            d: {
                                while (var$14 != var$17) {
                                    if (var$21 == var$19)
                                        break d;
                                    var$14 = $rt_checkBounds(var$14, var$15);
                                    var$2 = var$15[var$14];
                                    var$21 = $rt_checkBounds(var$21, var$15);
                                    var$22 = var$15[var$21];
                                    if (var$3.$compare(var$2, var$22) > 0) {
                                        var$23 = var$11.data;
                                        var$16 = var$20 + 1 | 0;
                                        var$23[$rt_checkBounds(var$20, var$23)] = var$22;
                                        var$21 = var$21 + 1 | 0;
                                    } else {
                                        var$23 = var$11.data;
                                        var$16 = var$20 + 1 | 0;
                                        var$23[$rt_checkBounds(var$20, var$23)] = var$2;
                                        var$14 = var$14 + 1 | 0;
                                    }
                                    var$20 = var$16;
                                }
                                while (true) {
                                    if (var$21 >= var$19)
                                        break c;
                                    var$23 = var$11.data;
                                    var$10 = var$20 + 1 | 0;
                                    var$16 = var$21 + 1 | 0;
                                    var$23[$rt_checkBounds(var$20, var$23)] = var$15[$rt_checkBounds(var$21, var$15)];
                                    var$20 = var$10;
                                    var$21 = var$16;
                                }
                            }
                            while (true) {
                                if (var$14 >= var$17)
                                    break c;
                                var$23 = var$11.data;
                                var$10 = var$20 + 1 | 0;
                                var$16 = var$14 + 1 | 0;
                                var$23[$rt_checkBounds(var$20, var$23)] = var$15[$rt_checkBounds(var$14, var$15)];
                                var$20 = var$10;
                                var$14 = var$16;
                            }
                        }
                        var$14 = var$18;
                    }
                    var$5 = var$5 * 2 | 0;
                    var$23 = var$13;
                    var$13 = var$11;
                    var$11 = var$23;
                }
                e: {
                    if (var$13 !== var$8) {
                        var$5 = 0;
                        while (true) {
                            var$13 = $rt_nullCheck(var$13);
                            var$8 = var$13.data;
                            if (var$5 >= var$8.length)
                                break e;
                            var$23 = var$11.data;
                            var$5 = $rt_checkLowerBound(var$5);
                            var$2 = var$8[var$5];
                            var$10 = $rt_checkUpperBound(var$5, var$23);
                            var$23[var$10] = var$2;
                            var$5 = var$10 + 1 | 0;
                        }
                    }
                }
            }
            var$5 = 0;
            while (var$5 < var$7) {
                var$2 = var$9[$rt_checkBounds(var$5 - 0 | 0, var$9)];
                var$6 = $rt_nullCheck(var$6);
                var$11 = var$6.data;
                var$5 = $rt_checkBounds(var$5, var$11);
                var$11[var$5] = var$2;
                var$5 = var$5 + 1 | 0;
            }
            $command.$modCount = $command.$modCount + 1 | 0;
            $this.$dirty = 1;
        } else {
            $command = new jl_IllegalArgumentException;
            jl_Exception__init_($command);
            $rt_throw($command);
        }
    }
},
jml_Displayable_removeCommand = ($this, $command) => {
    let var$2, var$3, var$4, var$5;
    var$2 = $rt_nullCheck($this.$commands);
    var$3 = $rt_nullCheck($rt_nullCheck(var$2));
    var$4 = var$3.$size0;
    var$5 = 0;
    a: {
        b: {
            while (true) {
                if (var$5 >= var$4)
                    break b;
                if (ju_Objects_equals($command, ju_ArrayList_get(var$3, var$5)))
                    break;
                var$5 = var$5 + 1 | 0;
            }
            break a;
        }
        var$5 = (-1);
    }
    if (var$5 >= 0)
        ju_ArrayList_remove(var$2, var$5);
    $this.$dirty = 1;
},
jml_Displayable_setCommandListener = ($this, $listener) => {
    $this.$listener = $listener;
},
jml_Displayable_showNotify = $this => {
    return;
},
jml_Displayable_hideNotify = $this => {
    return;
},
jml_Displayable_render = $this => {
    let var$1, $i;
    var$1 = $this.$title;
    $i = !($this instanceof jml_Canvas) ? 1 : 0;
    mikiPlatform.beginScreen($rt_ustr(var$1), $i);
    $i = 0;
    while (true) {
        var$1 = $rt_nullCheck($this.$commands);
        if ($i >= var$1.$size0)
            break;
        mikiPlatform.command($rt_ustr(($rt_nullCheck($rt_castToClass(ju_ArrayList_get(var$1, $i), jml_Command))).$label), $i);
        $i = $i + 1 | 0;
    }
    $this.$dirty = 0;
};
function jml_Canvas() {
    jml_Displayable.call(this);
    this.$repaint0 = 0;
}
let jml_Canvas_getWidth = $this => {
    return 176;
},
jml_Canvas_getHeight = $this => {
    return 144;
},
jml_Canvas_isDoubleBuffered = $this => {
    return 1;
},
jml_Canvas_getGameAction = ($this, $code) => {
    switch ($code) {
        case -5:
        case 53:
            break;
        case -4:
        case 54:
            return 5;
        case -3:
        case 52:
            return 2;
        case -2:
        case 56:
            return 6;
        case -1:
        case 50:
            return 1;
        default:
            return 0;
    }
    return 8;
},
jml_Canvas_repaint = $this => {
    $this.$repaint0 = 1;
},
jml_Canvas_serviceRepaints = $this => {
    let var$1;
    if ($this.$repaint0) {
        $this.$repaint0 = 0;
        var$1 = jml_Graphics__init_(0);
        j_paint($rt_nullCheck($this), var$1);
    }
},
jml_CommandListener = $rt_classWithoutFields(0);
function j() {
    let a = this; jml_Canvas.call(a);
    a.$d0 = 0;
    a.$for8 = null;
    a.$goto1 = null;
    a.$byte2 = 0;
    a.$try3 = null;
    a.$m0 = 0;
    a.$long1 = 0;
    a.$c5 = 0;
    a.$b5 = 0;
    a.$void1 = 0;
    a.$h1 = 0;
    a.$a33 = 0;
    a.$if10 = Long_ZERO;
}
let j_g = null,
j_null = null,
j_j = null,
j_e = null,
j_char = null,
j_case = null,
j_l = null,
j_new = null,
j_f = null,
j_int = null,
j_k = null,
j_else0 = null,
j_i = null,
j_do = 0,
j_$callClinit = () => {
    j_$callClinit = $rt_eraseClinit(j);
    j__clinit_();
},
j__init_ = var$0 => {
    j_$callClinit();
    jml_Displayable__init_(var$0);
    var$0.$d0 = 1;
    var$0.$byte2 = 0;
    var$0.$try3 = $rt_createIntArray(5);
    var$0.$m0 = 20;
    var$0.$b5 = 500;
    var$0.$c5 = 20;
},
j__init_0 = () => {
    let var_0 = new j();
    j__init_(var_0);
    return var_0;
},
j_a1 = (var$0, var$1) => {
    var$0.$goto1 = var$1;
},
j_a0 = (var$0, var$1) => {
    let var$2, var$3, $$je;
    j_$callClinit();
    if (j_g === null) {
        a: {
            b: {
                try {
                    var$1 = $rt_nullCheck(jmr_RecordStore_openRecordStore($rt_s(22), 1));
                    if (jmr_RecordStore_getNumRecords(var$1))
                        j_i = jmr_RecordStore_getRecord(var$1, 1);
                    else {
                        var$2 = j_i;
                        jmr_RecordStore_addRecord(var$1, var$2, 0, ($rt_nullCheck(var$2)).data.length);
                    }
                    jmr_RecordStore_closeRecordStore(var$1);
                    break a;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    if ($$je instanceof jl_Exception) {
                        var$1 = $$je;
                        break b;
                    } else {
                        throw $$e;
                    }
                }
            }
            jl_Throwable_printStackTrace(var$1);
        }
        var$2 = ($rt_nullCheck(j_i)).data;
        h_a0(var$2[$rt_checkUpperBound(2, var$2)] != 1 ? 0 : 1);
        var$2 = ($rt_nullCheck(j_i)).data;
        var$0.$a33 = var$2[$rt_checkUpperBound(2, var$2)];
        c_a2(var$2[$rt_checkUpperBound(1, var$2)] != 1 ? 0 : 1);
        var$2 = ($rt_nullCheck(j_i)).data;
        var$0.$h1 = var$2[$rt_checkUpperBound(1, var$2)];
        j_else0 = jml_Command__init_(GameMIDlet_if($rt_nullCheck(var$0.$goto1), 4), 4, 1);
        j_case = jml_Command__init_(GameMIDlet_if($rt_nullCheck(var$0.$goto1), 5), 2, 2);
        j_g = jml_Command__init_(GameMIDlet_if($rt_nullCheck(var$0.$goto1), 10), 1, 2);
        j_null = jml_Command__init_(GameMIDlet_if($rt_nullCheck(var$0.$goto1), 0), 1, 1);
        j_j = jml_Command__init_(GameMIDlet_if($rt_nullCheck(var$0.$goto1), 1), 1, 3);
        j_k = jml_Command__init_(GameMIDlet_if($rt_nullCheck(var$0.$goto1), 2), 1, 4);
        var$1 = new jml_Command;
        var$3 = new jl_StringBuffer;
        jl_AbstractStringBuilder__init_(var$3);
        jl_AbstractStringBuilder_append(var$3, GameMIDlet_if($rt_nullCheck(var$0.$goto1), 14));
        jl_AbstractStringBuilder_append(var$3, GameMIDlet_if($rt_nullCheck(var$0.$goto1), 12));
        jml_Command__init_0(var$1, jl_AbstractStringBuilder_toString(var$3), 1, 5);
        j_l = var$1;
        var$1 = new jml_Command;
        var$3 = new jl_StringBuffer;
        jl_AbstractStringBuilder__init_(var$3);
        jl_AbstractStringBuilder_append(var$3, GameMIDlet_if($rt_nullCheck(var$0.$goto1), 14));
        jl_AbstractStringBuilder_append(var$3, GameMIDlet_if($rt_nullCheck(var$0.$goto1), 13));
        jml_Command__init_0(var$1, jl_AbstractStringBuilder_toString(var$3), 1, 5);
        j_new = var$1;
        var$1 = new jml_Command;
        var$3 = new jl_StringBuffer;
        jl_AbstractStringBuilder__init_(var$3);
        jl_AbstractStringBuilder_append(var$3, GameMIDlet_if($rt_nullCheck(var$0.$goto1), 15));
        jl_AbstractStringBuilder_append(var$3, GameMIDlet_if($rt_nullCheck(var$0.$goto1), 12));
        jml_Command__init_0(var$1, jl_AbstractStringBuilder_toString(var$3), 1, 6);
        j_f = var$1;
        var$1 = new jml_Command;
        var$3 = new jl_StringBuffer;
        jl_AbstractStringBuilder__init_(var$3);
        jl_AbstractStringBuilder_append(var$3, GameMIDlet_if($rt_nullCheck(var$0.$goto1), 15));
        jml_Command__init_0(var$1, jl_StringBuffer_toString($rt_nullCheck(jl_StringBuffer_append(var$3, GameMIDlet_if($rt_nullCheck(var$0.$goto1), 13)))), 1, 6);
        j_int = var$1;
        j_e = jml_Command__init_(GameMIDlet_if($rt_nullCheck(var$0.$goto1), 11), 1, 7);
        j_char = jml_Command__init_(GameMIDlet_if($rt_nullCheck(var$0.$goto1), 3), 7, 8);
    }
    jml_Displayable_addCommand(var$0, j_g);
    jml_Displayable_addCommand(var$0, j_j);
    jml_Displayable_addCommand(var$0, j_k);
    var$2 = ($rt_nullCheck(j_i)).data;
    if (var$2[$rt_checkUpperBound(1, var$2)] != 1)
        jml_Displayable_addCommand(var$0, j_new);
    else
        jml_Displayable_addCommand(var$0, j_l);
    var$2 = ($rt_nullCheck(j_i)).data;
    var$0.$h1 = var$2[$rt_checkUpperBound(1, var$2)];
    if (var$2[$rt_checkUpperBound(2, var$2)] != 1)
        jml_Displayable_addCommand(var$0, j_int);
    else
        jml_Displayable_addCommand(var$0, j_f);
    var$2 = ($rt_nullCheck(j_i)).data;
    var$0.$a33 = var$2[$rt_checkUpperBound(2, var$2)];
    var$1 = j_e;
    if (var$1 !== null)
        jml_Displayable_addCommand(var$0, var$1);
    jml_Displayable_addCommand(var$0, j_char);
},
j_if0 = (var$0, var$1, var$2) => {
    return;
},
j_goto = var$0 => {
    let var$1, var$2, var$3, var$4;
    j_byte(var$0);
    var$0.$byte2 = 1;
    var$0.$d0 = 0;
    var$0.$void1 = 0;
    var$0.$long1 = 0;
    var$1 = ($rt_nullCheck(var$0.$try3)).data;
    var$2 = var$1.length - 1 | 0;
    while (var$2 >= 0) {
        var$3 = var$2;
        while (var$3 >= 0) {
            var$4 = $rt_checkBounds(var$3, var$1);
            var$1[var$4] = var$1[var$4] + var$0.$c5 | 0;
            var$3 = var$4 + (-1) | 0;
        }
        var$2 = var$2 + (-1) | 0;
    }
    var$0.$m0 = var$0.$c5;
    var$0.$if10 = w_Browser_now();
},
j_a2 = (var$0, var$1) => {
    let var$2, var$3, var$4, var$5, var$6;
    var$2 = var$0.$b5;
    if (var$1 <= var$2)
        var$2 = var$1;
    var$0.$void1 = var$0.$void1 + var$2 | 0;
    var$1 = 0;
    while (true) {
        var$3 = ($rt_nullCheck(var$0.$try3)).data;
        var$4 = var$3.length;
        if (var$1 >= var$4)
            break;
        var$4 = $rt_checkBounds(var$1, var$3);
        var$3[var$4] = var$3[var$4] + var$2 | 0;
        var$1 = var$4 + 1 | 0;
    }
    var$5 = var$0.$long1;
    var$6 = var$3[$rt_checkBounds(var$5, var$3)] / var$4 | 0;
    var$3[$rt_checkBounds(var$5, var$3)] = 0;
    var$1 = var$5 + 1 | 0;
    var$0.$long1 = var$1;
    var$0.$long1 = var$1 % var$4 | 0;
    var$0.$m0 = var$6;
},
j_if = var$0 => {
    if (!var$0.$d0)
        var$0.$d0 = 1;
},
j_else = var$0 => {
    if (var$0.$d0) {
        var$0.$d0 = 0;
        j_byte(var$0);
        var$0.$if10 = w_Browser_now();
    }
},
j_for = var$0 => {
    var$0.$byte2 = 0;
    var$0.$d0 = 0;
},
j_new0 = var$0 => {
    let var$1, var$2, var$3, $$je;
    a: {
        b: {
            try {
                var$1 = jmr_RecordStore_openRecordStore($rt_s(22), 0);
                j_$callClinit();
                var$2 = j_i;
                var$3 = ($rt_nullCheck(var$2)).data.length;
                var$1 = $rt_nullCheck(var$1);
                jmr_RecordStore_setRecord(var$1, 1, var$2, 0, var$3);
                jmr_RecordStore_closeRecordStore(var$1);
                break a;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_Exception) {
                    var$1 = $$je;
                    break b;
                } else {
                    throw $$e;
                }
            }
        }
        jl_Throwable_printStackTrace(var$1);
    }
},
j_try = var$0 => {
    return var$0.$d0;
},
j_paint = (var$0, var$1) => {
    let var$2;
    if (!var$0.$byte2) {
        var$1 = $rt_nullCheck(var$1);
        jml_Graphics_setColor(var$1, 255, 255, 255);
        jml_Graphics_fillRect(var$1, 0, 0, 176, 144);
    } else {
        var$2 = var$0.$for8;
        if (var$2 === null)
            var$0.$a7(var$1);
        else {
            var$0.$a7(jml_Image_getGraphics(var$2));
            jml_Graphics_drawImage($rt_nullCheck(var$1), var$0.$for8, 0, 0, 20);
        }
    }
},
j_keyPressed = (var$0, var$1) => {
    var$0.$a8(var$1, jml_Canvas_getGameAction(var$0, var$1));
},
j_keyReleased = (var$0, var$1) => {
    var$0.$if1(var$1, jml_Canvas_getGameAction(var$0, var$1));
},
j_hideNotify = var$0 => {
    if (var$0.$byte2 && !var$0.$d0)
        j_if(var$0);
},
j_showNotify = var$0 => {
    if (var$0.$byte2 && var$0.$d0)
        j_else(var$0);
},
j_run = var$0 => {
    let var$1, var$2, $$je;
    a: {
        b: {
            try {
                if (!j_try(var$0)) {
                    var$1 = w_Browser_now();
                    j_a2(var$0, Long_lo(Long_sub(var$1, var$0.$if10)));
                    var$0.$if10 = var$1;
                    var$0.$do(var$0.$m0, var$0.$void1);
                    if (jml_Display_getCurrent($rt_nullCheck(jml_Display_getDisplay(var$0.$goto1))) === var$0) {
                        jml_Canvas_repaint(var$0);
                        jml_Canvas_serviceRepaints(var$0);
                    }
                }
                break a;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_Exception) {
                    var$2 = $$je;
                    break b;
                } else {
                    throw $$e;
                }
            }
        }
        jl_Throwable_printStackTrace(var$2);
    }
},
j_byte = var$0 => {
    let var$1, var$2, var$3;
    var$1 = var$0.$h1;
    j_$callClinit();
    var$2 = ($rt_nullCheck(j_i)).data;
    if (var$1 != var$2[$rt_checkUpperBound(1, var$2)]) {
        if (var$1 != 1)
            jml_Displayable_removeCommand(var$0, j_new);
        else
            jml_Displayable_removeCommand(var$0, j_l);
        var$2 = ($rt_nullCheck(j_i)).data;
        if (var$2[$rt_checkUpperBound(1, var$2)] != 1)
            jml_Displayable_addCommand(var$0, j_new);
        else
            jml_Displayable_addCommand(var$0, j_l);
        var$2 = ($rt_nullCheck(j_i)).data;
        var$0.$h1 = var$2[$rt_checkUpperBound(1, var$2)];
    }
    var$3 = var$0.$a33;
    var$2 = ($rt_nullCheck(j_i)).data;
    if (var$3 != var$2[$rt_checkUpperBound(2, var$2)]) {
        if (var$3 != 1)
            jml_Displayable_removeCommand(var$0, j_int);
        else
            jml_Displayable_removeCommand(var$0, j_f);
        var$2 = ($rt_nullCheck(j_i)).data;
        if (var$2[$rt_checkUpperBound(2, var$2)] != 1)
            jml_Displayable_addCommand(var$0, j_int);
        else
            jml_Displayable_addCommand(var$0, j_f);
        var$2 = ($rt_nullCheck(j_i)).data;
        var$0.$a33 = var$2[$rt_checkUpperBound(2, var$2)];
    }
    jml_Displayable_removeCommand(var$0, j_null);
    if (j_do)
        jml_Displayable_addCommand(var$0, j_null);
},
j_a = var$1 => {
    j_$callClinit();
    j_do = var$1;
},
j_case0 = var$0 => {
    return;
},
j__clinit_ = () => {
    j_i = $rt_createByteArrayFromData([1, 1, 1]);
    j_do = 0;
};
function b() {
    let a = this; j.call(a);
    a.$dc = null;
    a.$di = null;
    a.$db = 0;
    a.$dm = null;
    a.$df = null;
    a.$dh = null;
    a.$de = null;
    a.$dp = 0;
    a.$dd = null;
    a.$dl = null;
    a.$dj = 0;
    a.$dn = 0;
    a.$dq = null;
    a.$dg = 0;
    a.$dk = 0;
}
let b__init_0 = var$0 => {
    j__init_(var$0);
    var$0.$db = 1;
    var$0.$dj = 1;
    var$0.$dk = 0;
},
b__init_ = () => {
    let var_0 = new b();
    b__init_0(var_0);
    return var_0;
},
b_a4 = (var$0, var$1) => {
    var$0.$dl = var$1;
},
b_a5 = (var$0, var$1) => {
    var$0.$dd = var$1;
},
b_o = var$0 => {
    let var$1, var$2;
    var$0.$dn = 1;
    var$1 = var$0.$goto1;
    var$2 = var$0.$dg != 1 ? 0 : 1;
    var$1 = $rt_nullCheck(var$1);
    var$1.$byte4 = var$2;
    var$1.$char3 = 0;
    var$0.$dg = 0;
},
b_commandAction = (var$0, var$1, var$2) => {
    let var$3, var$4, $$je;
    a: {
        j_$callClinit();
        if (var$1 === j_char) {
            ($rt_nullCheck(var$0.$goto1)).$if11 = 1;
            break a;
        }
        if (var$1 === j_case) {
            var$1 = jml_Display_getDisplay(var$0.$goto1);
            var$2 = var$0.$dq;
            if (var$2 === var$0)
                var$0.$dk = 0;
            jml_Display_setCurrent($rt_nullCheck(var$1), var$2);
            var$0.$dq = null;
            while (true) {
                var$1 = $rt_nullCheck(var$0.$df);
                var$2 = $rt_nullCheck(var$1.$items);
                if (var$2.$size0 <= 0)
                    break;
                ju_ArrayList_remove(var$2, 0);
                var$1.$dirty = 1;
            }
            break a;
        }
        if (var$1 === j_g) {
            var$0.$dg = 1;
            b_o(var$0);
            break a;
        }
        if (var$1 === j_null) {
            var$0.$dg = 2;
            b_o(var$0);
            break a;
        }
        if (var$1 === j_j) {
            jml_Screen_setTitle($rt_nullCheck(var$0.$df), GameMIDlet_if($rt_nullCheck(var$0.$goto1), 1));
            jml_Form_append($rt_nullCheck(var$0.$df), var$0.$dl);
            var$1 = $rt_nullCheck(jml_Display_getDisplay(var$0.$goto1));
            var$0.$dq = var$1.$current;
            jml_Display_setCurrent(var$1, var$0.$df);
            break a;
        }
        if (var$1 === j_k) {
            b_a(var$0, ($rt_nullCheck(jml_Display_getDisplay(var$0.$goto1))).$current);
            break a;
        }
        if (var$1 === j_e) {
            jml_Screen_setTitle($rt_nullCheck(var$0.$df), GameMIDlet_if($rt_nullCheck(var$0.$goto1), 11));
            jml_Form_append($rt_nullCheck(var$0.$df), $rt_s(23));
            var$1 = $rt_nullCheck(jml_Display_getDisplay(var$0.$goto1));
            var$0.$dq = var$1.$current;
            jml_Display_setCurrent(var$1, var$0.$df);
            break a;
        }
        if (!(var$1 !== j_l && var$1 !== j_new)) {
            var$3 = ($rt_nullCheck(j_i)).data;
            var$4 = $rt_checkUpperBound(1, var$3);
            var$3[var$4] = (var$3[var$4] + 1 | 0) << 24 >> 24;
            var$4 = $rt_checkUpperBound(1, var$3);
            var$3[var$4] = (var$3[var$4] % 2 | 0) << 24 >> 24;
            j_byte(var$0);
            j_byte($rt_nullCheck(var$0.$dd));
            var$3 = ($rt_nullCheck(j_i)).data;
            c_a2(var$3[$rt_checkUpperBound(1, var$3)] != 1 ? 0 : 1);
            j_new0(var$0);
            break a;
        }
        if (var$1 !== j_f && var$1 !== j_int) {
            if (var$1 !== j_else0)
                break a;
            k_a0($rt_nullCheck(var$0.$di), 0, ($rt_nullCheck(var$0.$dc)).$value0, var$0.$dp);
            b: {
                c: {
                    try {
                        k_if($rt_nullCheck(var$0.$di));
                        break b;
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        if ($$je instanceof jl_Exception) {
                            break c;
                        } else {
                            throw $$e;
                        }
                    }
                }
            }
            b_a(var$0, var$0);
            break a;
        }
        var$3 = ($rt_nullCheck(j_i)).data;
        var$4 = $rt_checkUpperBound(2, var$3);
        var$3[var$4] = (var$3[var$4] + 1 | 0) << 24 >> 24;
        var$4 = $rt_checkUpperBound(2, var$3);
        var$3[var$4] = (var$3[var$4] % 2 | 0) << 24 >> 24;
        j_byte(var$0);
        j_byte($rt_nullCheck(var$0.$dd));
        var$3 = ($rt_nullCheck(j_i)).data;
        h_a0(var$3[$rt_checkUpperBound(2, var$3)] != 1 ? 0 : 1);
        j_new0(var$0);
    }
},
b_a = (var$0, var$1) => {
    let var$2, var$3, var$4, var$5, var$6, $$je;
    var$2 = var$0.$df;
    var$3 = GameMIDlet_if($rt_nullCheck(var$0.$goto1), 2);
    jml_Screen_setTitle($rt_nullCheck(var$2), var$3);
    var$2 = $rt_s(15);
    var$4 = 0;
    while (var$4 < ($rt_nullCheck(var$0.$di)).$new2) {
        a: {
            b: {
                try {
                    var$5 = var$2;
                    var$2 = jl_StringBuffer_toString($rt_nullCheck(jl_StringBuffer_append($rt_nullCheck(jl_StringBuffer_append0($rt_nullCheck(jl_StringBuffer_append($rt_nullCheck(jl_StringBuffer_append(jl_StringBuffer__init_(), var$2)), $rt_s(15))), var$4 + 1 | 0)), $rt_s(24))));
                    var$5 = var$2;
                    var$2 = jl_StringBuffer_toString($rt_nullCheck(jl_StringBuffer_append($rt_nullCheck(jl_StringBuffer_append(jl_StringBuffer__init_(), var$2)), k_if0($rt_nullCheck(var$0.$di), 0, var$4))));
                    var$5 = var$2;
                    var$2 = jl_StringBuffer_toString($rt_nullCheck(jl_StringBuffer_append($rt_nullCheck(jl_StringBuffer_append(jl_StringBuffer__init_(), var$2)), $rt_s(25))));
                    var$5 = var$2;
                    var$2 = jl_StringBuffer_append(jl_StringBuffer__init_(), var$2);
                    var$3 = var$0.$dd;
                    var$6 = k_a($rt_nullCheck(var$0.$di), 0, var$4);
                    var$2 = jl_StringBuffer_toString($rt_nullCheck(jl_StringBuffer_append($rt_nullCheck(var$2), d_if2($rt_nullCheck(var$3), var$6))));
                    var$5 = var$2;
                    var$2 = jl_StringBuffer_toString($rt_nullCheck(jl_StringBuffer_append($rt_nullCheck(jl_StringBuffer_append(jl_StringBuffer__init_(), var$2)), $rt_s(5))));
                    var$5 = var$2;
                    break a;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    if ($$je instanceof jl_Exception) {
                        var$2 = $$je;
                        break b;
                    } else {
                        throw $$e;
                    }
                }
            }
            jl_Throwable_printStackTrace(var$2);
            var$2 = var$5;
        }
        var$4 = var$4 + 1 | 0;
    }
    jml_Form_append($rt_nullCheck(var$0.$df), var$2);
    var$0.$dq = var$1;
    var$1 = jml_Display_getDisplay(var$0.$goto1);
    var$2 = var$0.$df;
    jml_Display_setCurrent($rt_nullCheck(var$1), var$2);
},
b_a3 = (var$0, var$1) => {
    let var$2, var$3;
    j_a0(var$0, var$1);
    var$0.$de = var$1;
    var$2 = jml_Form__init_($rt_s(15));
    var$0.$df = var$2;
    jml_Displayable_addCommand(var$2, j_case);
    ($rt_nullCheck(var$0.$df)).$listener = var$0;
    var$1 = new jml_TextField;
    var$2 = GameMIDlet_if($rt_nullCheck(var$0.$goto1), 8);
    var$3 = $rt_nullCheck(var$0.$de);
    var$1.$label0 = var$2;
    var$1.$max0 = 8;
    jml_TextField_setString(var$1, $rt_s(15));
    var$0.$dc = var$1;
    var$2 = $rt_nullCheck(var$0.$de);
    var$1.$max0 = 8;
    jml_TextField_setString(var$1, var$1.$value0);
    var$1 = jml_Form__init_(GameMIDlet_if($rt_nullCheck(var$0.$goto1), 7));
    var$0.$dh = var$1;
    jml_Displayable_addCommand(var$1, j_else0);
    var$1 = $rt_nullCheck(var$0.$dh);
    var$1.$listener = var$0;
    var$2 = var$0.$dc;
    ju_ArrayList_add($rt_nullCheck(var$1.$items), var$2);
    var$1.$dirty = 1;
    var$1 = $rt_nullCheck(var$1.$items);
},
b_a2 = (var$0, var$1) => {
    var$0.$di = var$1;
},
b_goto = var$0 => {
    let var$1, $$je;
    a: {
        b: {
            try {
                var$0.$dm = jml_Image_createImage($rt_s(26));
                break a;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_Exception) {
                    var$1 = $$je;
                    break b;
                } else {
                    throw $$e;
                }
            }
        }
        jl_Throwable_printStackTrace(var$1);
    }
    var$0.$dg = 0;
    var$0.$dn = 0;
    var$0.$db = 1;
    j_goto(var$0);
},
b_do = (var$0, var$1, var$2) => {
    let $$je;
    a: {
        b: {
            try {
                var$2 = var$0.$dk + var$1 | 0;
                var$0.$dk = var$2;
                if ((var$2 + var$1 | 0) >= 5000 && var$2 <= 5000)
                    j_case0(var$0);
                if (var$0.$dj) {
                    var$0.$dj = 0;
                    c_byte0();
                }
                c: {
                    d: {
                        switch (var$0.$dg) {
                            case 1:
                            case 2:
                                break;
                            default:
                                break d;
                        }
                        break c;
                    }
                }
                break a;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_Exception) {
                    break b;
                } else {
                    throw $$e;
                }
            }
        }
    }
},
b_a1 = (var$0, var$1) => {
    let var$2, var$3, var$4, var$5;
    if (var$0.$db) {
        var$1 = $rt_nullCheck(var$1);
        jml_Graphics_setColor(var$1, 255, 255, 255);
        jml_Graphics_fillRect(var$1, 0, 0, 176, 144);
    }
    if (var$0.$db) {
        var$0.$db = 0;
        var$2 = var$0.$dm;
        if (var$2 !== null) {
            var$3 = $rt_nullCheck(var$0.$de);
            var$4 = 0 + ((176 - jml_Image_getWidth(var$2) | 0) / 2 | 0) | 0;
            var$2 = $rt_nullCheck(var$0.$de);
            var$5 = 0 + ((144 - jml_Image_getHeight($rt_nullCheck(var$0.$dm)) | 0) / 2 | 0) | 0;
            jml_Graphics_drawImage($rt_nullCheck(var$1), var$0.$dm, var$4, var$5, 20);
        }
    }
},
b_a0 = (var$0, var$1, var$2) => {
    return;
},
b_showNotify = var$0 => {
    j_showNotify(var$0);
    var$0.$db = 1;
},
b_for = var$0 => {
    j_for(var$0);
    var$0.$dk = 100000;
    var$0.$dm = null;
},
g = $rt_classWithoutFields(),
g__init_0 = var$0 => {
    return;
},
g__init_ = () => {
    let var_0 = new g();
    g__init_0(var_0);
    return var_0;
},
g_char = var$0 => {
    return 8;
},
g_i = var$0 => {
    return 14;
},
g_case = var$0 => {
    return 40;
},
g_int = var$0 => {
    return 31;
},
g_else = var$0 => {
    return 4;
},
g_void = var$0 => {
    return 131;
},
g_null = var$0 => {
    return 144;
},
g_c = var$0 => {
    return 2;
},
g_k = var$0 => {
    return 158;
},
g_do = var$0 => {
    return 130;
},
g_for = var$0 => {
    return 59;
},
g_goto = var$0 => {
    return 57;
},
g_j = var$0 => {
    return 176;
},
g_l = var$0 => {
    return 144;
},
g_long = var$0 => {
    return 11;
},
g_g = var$0 => {
    return 11;
},
g_d = var$0 => {
    return 25;
},
g_f = var$0 => {
    return 25;
},
g_byte = var$0 => {
    return 10;
},
g_h = var$0 => {
    return 161;
},
i = $rt_classWithoutFields(j),
i_hideNotify = var$0 => {
    let var$1;
    var$1 = !(var$0.$byte2 && !var$0.$d0) ? 0 : 1;
    j_hideNotify(var$0);
};
function d() {
    let a = this; i.call(a);
    a.$c3 = null;
    a.$b8 = null;
    a.$bi = null;
    a.$H = 0;
    a.$a40 = 0;
    a.$bW = 0;
    a.$as = 0;
    a.$bd = null;
    a.$I = null;
    a.$X = null;
    a.$bP = null;
    a.$bZ = 0;
    a.$cU = 0;
    a.$K = null;
    a.$b4 = null;
    a.$aR = null;
    a.$aA = null;
    a.$y = null;
    a.$bE = null;
    a.$V = null;
    a.$ai = null;
    a.$bT = 0;
    a.$b6 = 0;
    a.$cI = 0;
    a.$ac = 0;
    a.$cF = 0;
    a.$c2 = 0;
    a.$a210 = 0;
    a.$aI = 0;
    a.$L = 0;
    a.$aH = 0;
    a.$aF = 0;
    a.$bJ = 0;
    a.$bI = 0;
    a.$da = 0;
    a.$cb = 0;
    a.$ca = 0;
    a.$F = 0;
    a.$D = 0;
    a.$ar = 0;
    a.$ap = 0;
    a.$br = 0;
    a.$aP = 0;
    a.$a00 = 0;
    a.$ah = 0;
    a.$aO = 0;
    a.$aM = 0;
    a.$aB = 0;
    a.$az = 0;
    a.$w = 0;
    a.$v = 0;
    a.$B = 0;
    a.$z = 0;
    a.$bF = null;
    a.$bD = null;
    a.$S = null;
    a.$bp = 0;
    a.$cv = 0;
    a.$Q = 0;
    a.$cr = 0;
    a.$be = 0;
    a.$bO = 0;
    a.$aD = null;
    a.$bU = 0;
    a.$cK = 0;
    a.$ba = 0;
    a.$U = 0;
    a.$bv = 0;
    a.$bb = 0;
    a.$b7 = 0;
    a.$aj = 0;
    a.$cR = 0;
    a.$A = 0;
    a.$aq = 0;
    a.$cy0 = 0;
    a.$cW = null;
    a.$n = 0;
    a.$cE = 0;
    a.$cu = 0;
    a.$bL = 0;
    a.$cA = 0;
    a.$c8 = 0;
    a.$c50 = 0;
    a.$bh = 0;
    a.$a110 = 0;
    a.$c7 = 0;
    a.$aa = null;
    a.$cQ = 0;
    a.$a80 = 0;
    a.$bS = 0;
    a.$bR = 0;
    a.$cY = 0;
    a.$cm = null;
    a.$cG = null;
    a.$G = 0;
    a.$aQ = 0;
    a.$b1 = 0;
    a.$bH = null;
    a.$b50 = 0;
    a.$c00 = 0;
    a.$c9 = null;
    a.$by = null;
    a.$c10 = null;
    a.$a90 = null;
    a.$C = 0;
    a.$aw = 0;
    a.$a70 = 0;
    a.$aN = 0;
    a.$aK = 0;
    a.$at = 0;
    a.$Y = 0;
    a.$cP = 0;
    a.$bm = 0;
    a.$cO = 0;
    a.$au = 0;
    a.$ao = 0;
    a.$an = 0;
    a.$cX = 0;
    a.$cV = 0;
    a.$af = 0;
    a.$ae = 0;
    a.$aZ = 0;
    a.$aX = 0;
    a.$T = 0;
    a.$P = 0;
    a.$ab = 0;
    a.$bK = null;
    a.$bq = 0;
    a.$bo = 0;
    a.$aE = 0;
    a.$a50 = 0;
    a.$cl = 0;
    a.$ck = 0;
    a.$s = 0;
    a.$W = 0;
    a.$bf = 0;
    a.$cL = null;
    a.$bQ = 0;
    a.$M = null;
    a.$ag = null;
    a.$a30 = 0;
    a.$cM = 0;
    a.$bG = 0;
    a.$bx = 0;
    a.$bV = 0;
    a.$bN = 0;
    a.$cd = 0;
    a.$bY = 0;
    a.$am = 0;
    a.$ak = 0;
    a.$cD = 0;
    a.$b3 = 0;
    a.$cz = 0;
    a.$bA = 0;
    a.$bt = 0;
    a.$r = 0;
    a.$aJ = null;
    a.$cS = 0;
    a.$aG = null;
    a.$aL = null;
    a.$bz = 0;
    a.$bn = 0;
    a.$cn = 0;
    a.$bs = 0;
    a.$bM = 0;
    a.$aW = 0;
    a.$aS = 0;
    a.$cx0 = 0;
    a.$ch0 = 0;
    a.$cC = 0;
    a.$bj = 0;
    a.$bu = 0;
    a.$E = null;
    a.$a60 = 0;
    a.$ci = 0;
    a.$ay = null;
    a.$ax = null;
    a.$Z = null;
    a.$cj = null;
    a.$cg = null;
    a.$cB = null;
    a.$R = null;
    a.$ad = 0;
    a.$u = 0;
    a.$aU = 0;
    a.$aT = 0;
    a.$cJ = 0;
    a.$cH = 0;
    a.$bX = 0;
    a.$aV = 0;
    a.$p = 0;
    a.$bw = 0;
    a.$av = 0;
    a.$cq = 0;
    a.$O = 0;
    a.$N = 0;
    a.$bC = null;
    a.$bB = null;
    a.$c6 = 0;
    a.$bg = 0;
    a.$cp = 0;
    a.$al = 0;
    a.$aC = 0;
    a.$cf = 0;
    a.$ce = 0;
    a.$x = null;
    a.$t = 0;
}
let d__init_0 = var$0 => {
    let var$1, var$2;
    j__init_(var$0);
    var$0.$bW = 0;
    var$0.$cI = 0;
    var$0.$ac = 1;
    var$0.$cF = 2;
    var$0.$aI = 35;
    var$0.$L = 13;
    var$0.$aH = 12;
    var$0.$aF = 21;
    var$0.$bJ = 6;
    var$0.$bI = 20;
    var$0.$da = 7;
    var$0.$cb = 15;
    var$0.$ca = 22;
    var$0.$F = 23;
    var$0.$D = 23;
    var$0.$ar = 1;
    var$0.$ap = 1;
    var$0.$aB = (-1);
    var$0.$az = (-1);
    var$0.$S = $rt_createIntArrayFromData([67, 64, 58, 48, 36, 23, 7, (-7), (-23), (-36), (-48), (-58), (-64), (-67)]);
    var$0.$Q = 21;
    var$0.$U = 0;
    var$0.$bv = 3;
    var$0.$bb = 4;
    var$0.$b7 = 5;
    var$0.$aj = 7;
    var$0.$cR = 6;
    var$0.$A = 10;
    var$0.$aq = 11;
    var$0.$cy0 = 12;
    var$0.$cE = 0;
    var$0.$cu = 1;
    var$0.$bL = 2;
    var$0.$cA = 3;
    var$0.$c8 = 4;
    var$0.$c50 = 5;
    var$0.$bh = 6;
    var$0.$c7 = 55;
    var$0.$b50 = 3;
    var$0.$a70 = 1;
    var$0.$aE = 8;
    var$0.$a50 = 16;
    var$0.$M = $rt_createByteArrayFromData([0, 0, 22, 22, 22, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 22]);
    var$0.$r = 20;
    var$0.$cn = 0;
    var$0.$bs = 21;
    var$0.$bM = 22;
    var$0.$aW = 23;
    var$0.$aS = 24;
    var$0.$cx0 = 25;
    var$0.$ch0 = 21;
    var$0.$cC = 25;
    var$0.$bj = 5;
    var$0.$bu = 4;
    var$1 = $rt_createByteArray(1);
    var$1.data[0] = 0;
    var$0.$E = var$1;
    var$0.$av = 10;
    var$0.$t = 0;
    var$2 = new ju_Random;
    var$2.$seed = Long_and(Long_xor(w_Browser_now(), Long_create(3740067437, 5)), Long_create(4294967295, 65535));
    var$0.$aD = var$2;
},
d__init_ = () => {
    let var_0 = new d();
    d__init_0(var_0);
    return var_0;
},
d_a10 = (var$0, var$1) => {
    let var$2, var$3, var$4, var$5, var$6, var$7, var$8, $$je;
    j_a0(var$0, var$1);
    var$1 = var$1;
    var$0.$c3 = var$1;
    var$1 = $rt_nullCheck(var$1);
    var$0.$aa = jml_Image_createImage0(176, 144);
    var$0.$bE = jml_Image_createImage($rt_s(27));
    var$0.$bT = 14;
    var$0.$b6 = 14;
    var$0.$V = jml_Image_createImage($rt_s(28));
    var$0.$ai = jml_Image_createImage($rt_s(29));
    var$0.$b4 = jml_Image_createImage($rt_s(30));
    var$0.$aR = jml_Image_createImage($rt_s(31));
    var$1 = jml_Image_createImage($rt_s(32));
    var$0.$K = var$1;
    var$0.$bZ = jml_Image_getWidth($rt_nullCheck(var$1)) / 5 | 0;
    var$0.$cU = jml_Image_getHeight($rt_nullCheck(var$0.$K));
    var$0.$aP = 16;
    var$0.$aA = jml_Image_createImage($rt_s(33));
    var$0.$y = jml_Image_createImage($rt_s(34));
    var$0.$ah = (var$0.$aP * 3 | 0) / 7 | 0;
    var$0.$bH = $rt_createShortArray(6);
    var$0.$c9 = $rt_createByteArray(3);
    var$0.$by = $rt_createByteArray(3);
    var$0.$c10 = $rt_createShortArray(6);
    var$0.$a90 = $rt_createIntArray(3);
    var$1 = new a;
    var$1.$int4 = 1;
    var$1.$case2 = 1;
    var$0.$bd = var$1;
    var$1 = new f;
    var$1.$a32 = 0;
    var$1.$long2 = (-1);
    var$1.$c4 = 0;
    var$1.$b2 = 0;
    var$0.$I = var$1;
    var$2 = (16 * var$0.$bT | 0) / 8 | 0;
    var$0.$cl = var$2;
    var$3 = (16 * var$0.$b6 | 0) / 8 | 0;
    var$0.$ck = var$3;
    var$4 = 0;
    while (true) {
        var$5 = ($rt_nullCheck(var$0.$S)).data;
        if (var$4 >= var$5.length)
            break;
        var$6 = $rt_checkBounds(var$4, var$5);
        var$4 = $rt_imul(var$5[var$6], var$3) >> 4;
        var$7 = $rt_checkUpperBound(var$6, var$5);
        var$5[var$7] = var$4;
        var$4 = var$7 + 1 | 0;
    }
    var$0.$cr = ((1 * var$2 | 0) * 90 | 0) / 100 | 0;
    var$0.$be = ((2 * var$2 | 0) * 90 | 0) / 100 | 0;
    var$0.$bO = 2 * var$3 | 0;
    var$0.$bA = 1;
    var$0.$bt = 2;
    var$1 = e__init_0(var$0.$goto1, var$0);
    var$0.$aJ = var$1;
    var$1.$b0 = g_j($rt_nullCheck(var$0.$c3));
    var$1 = var$0.$aJ;
    var$2 = g_l($rt_nullCheck(var$0.$c3));
    ($rt_nullCheck(var$1)).$try4 = var$2;
    var$1 = var$0.$aJ;
    var$2 = var$0.$b6;
    ($rt_nullCheck(var$1)).$long3 = var$2;
    a: {
        b: {
            try {
                var$1 = $rt_nullCheck(jmr_RecordStore_openRecordStore($rt_s(16), 1));
                if (jmr_RecordStore_getNumRecords(var$1))
                    var$0.$E = jmr_RecordStore_getRecord(var$1, 1);
                else {
                    var$5 = var$0.$E;
                    jmr_RecordStore_addRecord(var$1, var$5, 0, ($rt_nullCheck(var$5)).data.length);
                }
                jmr_RecordStore_closeRecordStore(var$1);
                break a;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_Exception) {
                    var$1 = $$je;
                    break b;
                } else {
                    throw $$e;
                }
            }
        }
        jl_Throwable_printStackTrace(var$1);
    }
    var$5 = $rt_createIntArray(15);
    var$8 = var$5.data;
    var$0.$aG = var$5;
    var$8[$rt_checkUpperBound(0, var$8)] = 55;
    var$8[$rt_checkUpperBound(1, var$8)] = 55;
    var$8[$rt_checkUpperBound(2, var$8)] = 55;
    var$8[$rt_checkUpperBound(3, var$8)] = 55;
    var$8[$rt_checkUpperBound(4, var$8)] = 51;
    var$8[$rt_checkUpperBound(5, var$8)] = 51;
    var$8[$rt_checkUpperBound(6, var$8)] = 50;
    var$8[$rt_checkUpperBound(7, var$8)] = 50;
    var$8[$rt_checkUpperBound(8, var$8)] = 50;
    var$8[$rt_checkUpperBound(9, var$8)] = 55;
    var$8[$rt_checkUpperBound(10, var$8)] = 55;
    var$8[$rt_checkUpperBound(11, var$8)] = 55;
    var$8[$rt_checkUpperBound(12, var$8)] = 51;
    var$8[$rt_checkUpperBound(13, var$8)] = 51;
    var$8[$rt_checkUpperBound(14, var$8)] = 56;
    var$0.$aL = $rt_createIntArray(var$8.length);
    var$0.$bz = 0;
    d_b(var$0);
},
d_if2 = (var$0, var$1) => {
    let var$2;
    var$2 = new jl_StringBuffer;
    jl_AbstractStringBuilder__init_(var$2);
    jl_AbstractStringBuilder_append(var$2, $rt_s(15));
    jl_AbstractStringBuilder_append0(var$2, var$1);
    jl_AbstractStringBuilder_append(var$2, $rt_s(10));
    jl_AbstractStringBuilder_append0(var$2, var$0.$c7);
    return jl_AbstractStringBuilder_toString(var$2);
},
d_a4 = (var$0, var$1, var$2) => {
    let var$3, var$4, var$5, var$6, var$7, var$8, var$9, var$10;
    var$3 = var$0.$cK;
    if (var$3 != 20) {
        if (var$3 == 12 && !(var$1 != 53 && var$2 != 8)) {
            if (var$0.$bU < 7000)
                var$0.$bU = 7000;
            else {
                var$0.$as = 0;
                var$0.$bW = 1;
            }
            return;
        }
        var$4 = var$0.$aL;
        var$5 = var$0.$bz;
        var$6 = ($rt_nullCheck(var$4)).data;
        var$6[$rt_checkBounds(var$5, var$6)] = var$1;
        var$4 = ($rt_nullCheck(var$0.$aG)).data;
        var$7 = var$4.length - 1 | 0;
        var$8 = var$5;
        a: {
            b: {
                while (var$7 >= 0) {
                    var$9 = $rt_checkBounds(var$8, var$6);
                    var$10 = var$6[var$9];
                    var$7 = $rt_checkBounds(var$7, var$4);
                    if (var$10 != var$4[var$7])
                        break b;
                    var$10 = var$6.length;
                    var$8 = ((var$9 + var$10 | 0) - 1 | 0) % var$10 | 0;
                    var$7 = var$7 + (-1) | 0;
                }
                break a;
            }
        }
        var$10 = var$5 + 1 | 0;
        var$0.$bz = var$10;
        var$0.$bz = var$10 % var$6.length | 0;
        if (var$7 == (-1)) {
            var$4 = ($rt_nullCheck(var$0.$E)).data;
            var$4[$rt_checkUpperBound(0, var$4)] = 1;
            var$0.$bn = 2000;
        }
        if (var$3 >= 21 && var$3 <= 25)
            d_int(var$0, var$1, var$2);
        if (var$1 == 51) {
            var$0.$bR = (-1);
            var$0.$bS = 2;
        } else if (!(var$1 != 54 && var$2 != 5))
            var$0.$bS = 2;
        else if (var$1 == 49) {
            var$0.$bR = (-1);
            var$0.$bS = (-2);
        } else if (!(var$1 != 52 && var$2 != 2))
            var$0.$bS = (-2);
        else if (!(var$1 != 50 && var$2 != 1))
            var$0.$bR = (-1);
        else if (!(var$1 != 56 && var$2 != 6) && var$0.$W != (-1))
            var$0.$s = 1;
        return;
    }
    if (!(var$1 != 53 && var$2 != 8))
        var$0.$cS = 1;
},
d_if3 = (var$0, var$1, var$2) => {
    var$0.$bS = 0;
    var$0.$bR = 0;
},
d_goto = var$0 => {
    let var$1;
    var$0.$bW = 0;
    var$0.$as = 1;
    var$0.$a110 = 0;
    var$1 = ($rt_nullCheck(var$0.$E)).data;
    if (var$1[$rt_checkUpperBound(0, var$1)] == 1)
        var$0.$cK = 21;
    else {
        d_c(var$0);
        var$0.$cS = 0;
        e_a0($rt_nullCheck(var$0.$aJ), $rt_s(35));
        d_for(var$0, (-1));
    }
    j_goto(var$0);
},
d_c = var$0 => {
    let var$1, var$2, var$3, var$4, var$5, var$6, var$7, var$8, $$je;
    var$0.$bU = 0;
    var$0.$c00 = 0;
    var$0.$W = (-1);
    var$0.$bf = 0;
    var$0.$s = 0;
    var$0.$a80 = 3;
    var$0.$aQ = (-1);
    var$0.$cM = 0;
    var$0.$cY = 0;
    a: {
        b: {
            try {
                var$0.$bP = jml_Image_createImage($rt_s(36));
                var$0.$X = jml_Image_createImage($rt_s(37));
                var$0.$cW = jml_Image_createImage($rt_s(38));
                break a;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_Exception) {
                    break b;
                } else {
                    throw $$e;
                }
            }
        }
    }
    var$0.$a00 = jml_Image_getHeight($rt_nullCheck(var$0.$aR));
    var$0.$C = ((jml_Image_getWidth($rt_nullCheck(var$0.$aR)) / 8 | 0) - (jml_Image_getWidth($rt_nullCheck(var$0.$bP)) / 2 | 0) | 0) / 2 | 0;
    var$0.$aw = ((jml_Image_getHeight($rt_nullCheck(var$0.$aR)) / 8 | 0) - (jml_Image_getHeight($rt_nullCheck(var$0.$bP)) / 2 | 0) | 0) / 2 | 0;
    var$0.$cO = 0;
    var$0.$n = 0;
    var$0.$H = 0;
    var$0.$a40 = 0;
    var$0.$cQ = 60000;
    var$1 = null;
    c: {
        d: {
            e: {
                try {
                    var$2 = var$1;
                    var$3 = new ji_DataInputStream;
                    var$1 = var$3;
                    var$2 = var$3;
                    ji_DataInputStream__init_0(var$3, w_Resources_open(jl_Object_getClass(var$0), $rt_s(39)));
                    var$4 = $rt_createByteArray(ji_DataInputStream_readByte(var$3));
                    var$5 = 0;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    if ($$je instanceof jl_Exception) {
                        var$3 = $$je;
                        break e;
                    } else{
                        var$1 = $$je;
                        break d;
                    }
                }
                var$6 = var$4.data;
                var$7 = var$6.length;
                while (true) {
                    try {
                        var$2 = var$3;
                        var$1 = var$3;
                        if (var$5 >= var$7)
                            break;
                        var$2 = var$3;
                        var$1 = var$3;
                        var$8 = ji_DataInputStream_readByte(var$3);
                        var$5 = $rt_checkBounds(var$5, var$6);
                        var$6[var$5] = var$8;
                        var$5 = var$5 + 1 | 0;
                        continue;
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        if ($$je instanceof jl_Exception) {
                            var$3 = $$je;
                            break e;
                        } else{
                            var$1 = $$je;
                            break d;
                        }
                    }
                }
                try {
                    var$2 = var$3;
                    var$1 = var$3;
                    var$0.$at = ji_DataInputStream_readByte(var$3) << 16 >> 16;
                    var$5 = ji_DataInputStream_readByte(var$3);
                    var$7 = 0;
                    while (true) {
                        var$2 = var$3;
                        var$1 = var$3;
                        if (var$7 >= var$5)
                            break;
                        var$2 = var$3;
                        var$1 = var$3;
                        var$8 = var$0.$Y << 10;
                        var$0.$Y = var$8;
                        var$0.$Y = var$8 | ji_DataInputStream_readByte(var$3);
                        var$7 = var$7 + 1 | 0;
                    }
                    var$2 = var$3;
                    var$1 = var$3;
                    var$0.$cX = ($rt_imul(ji_DataInputStream_readShort(var$3), var$0.$cl) / 16 | 0) << 16 >> 16;
                    var$0.$cV = ($rt_imul(ji_DataInputStream_readShort(var$3), var$0.$ck) / 16 | 0) << 16 >> 16;
                    var$0.$cP = ji_DataInputStream_readByte(var$3) << 16 >> 16;
                    var$5 = ji_DataInputStream_readByte(var$3);
                    var$7 = 0;
                    while (true) {
                        var$2 = var$3;
                        var$1 = var$3;
                        if (var$7 >= var$5)
                            break;
                        var$2 = var$3;
                        var$1 = var$3;
                        var$8 = var$0.$bm << 10;
                        var$0.$bm = var$8;
                        var$0.$bm = var$8 | ji_DataInputStream_readByte(var$3);
                        var$7 = var$7 + 1 | 0;
                    }
                    var$2 = var$3;
                    var$1 = var$3;
                    var$0.$af = ($rt_imul(ji_DataInputStream_readShort(var$3), var$0.$cl) / 16 | 0) << 16 >> 16;
                    var$0.$ae = ($rt_imul(ji_DataInputStream_readShort(var$3), var$0.$ck) / 16 | 0) << 16 >> 16;
                    var$0.$w = $rt_imul(ji_DataInputStream_readShort(var$3), var$0.$cl) << 16 >> 16;
                    var$0.$v = $rt_imul(ji_DataInputStream_readShort(var$3), var$0.$ck) << 16 >> 16;
                    var$0.$B = $rt_imul(ji_DataInputStream_readShort(var$3), var$0.$cl) << 16 >> 16;
                    var$0.$z = $rt_imul(ji_DataInputStream_readShort(var$3), var$0.$ck) << 16 >> 16;
                    var$7 = ji_DataInputStream_readByte(var$3);
                    var$0.$bF = $rt_createShortArray(var$7);
                    var$0.$bD = $rt_createShortArray(var$7);
                    var$5 = 0;
                    while (true) {
                        var$2 = var$3;
                        var$1 = var$3;
                        if (var$5 >= var$7)
                            break;
                        var$2 = var$3;
                        var$1 = var$3;
                        var$6 = var$0.$bF;
                        var$8 = $rt_imul(ji_DataInputStream_readShort(var$3), var$0.$cl) << 16 >> 16;
                        var$6 = ($rt_nullCheck(var$6)).data;
                        var$5 = $rt_checkBounds(var$5, var$6);
                        var$6[var$5] = var$8;
                        var$6 = var$0.$bD;
                        var$8 = $rt_imul(ji_DataInputStream_readShort(var$3), var$0.$ck) << 16 >> 16;
                        var$6 = ($rt_nullCheck(var$6)).data;
                        var$5 = $rt_checkUpperBound(var$5, var$6);
                        var$6[var$5] = var$8;
                        var$5 = var$5 + 1 | 0;
                    }
                    var$2 = var$3;
                    var$1 = var$3;
                    var$0.$P = ji_DataInputStream_readShort(var$3);
                    var$0.$ab = ji_DataInputStream_readShort(var$3);
                    var$0.$bK = $rt_createShortArray(var$7);
                    var$5 = 0;
                    while (true) {
                        var$2 = var$3;
                        var$1 = var$3;
                        if (var$5 >= var$7)
                            break;
                        var$2 = var$3;
                        var$1 = var$3;
                        var$6 = var$0.$bK;
                        var$8 = ji_DataInputStream_readShort(var$3);
                        var$6 = ($rt_nullCheck(var$6)).data;
                        var$5 = $rt_checkBounds(var$5, var$6);
                        var$6[var$5] = var$8;
                        var$5 = var$5 + 1 | 0;
                    }
                    var$2 = var$3;
                    var$1 = var$3;
                    var$0.$b8 = $rt_createShortArray(ji_DataInputStream_readByte(var$3));
                    var$7 = 0;
                    while (true) {
                        var$2 = var$3;
                        var$1 = var$3;
                        var$6 = ($rt_nullCheck(var$0.$b8)).data;
                        if (var$7 >= var$6.length)
                            break;
                        var$2 = var$3;
                        var$1 = var$3;
                        var$5 = ji_DataInputStream_readShort(var$3);
                        var$7 = $rt_checkBounds(var$7, var$6);
                        var$6[var$7] = var$5;
                        var$7 = var$7 + 1 | 0;
                    }
                    var$2 = var$3;
                    var$1 = var$3;
                    var$0.$bi = $rt_createShortArray(ji_DataInputStream_readByte(var$3));
                    var$5 = 0;
                    while (true) {
                        var$2 = var$3;
                        var$1 = var$3;
                        var$6 = ($rt_nullCheck(var$0.$bi)).data;
                        if (var$5 >= var$6.length)
                            break;
                        var$2 = var$3;
                        var$1 = var$3;
                        var$7 = ji_DataInputStream_readShort(var$3);
                        var$8 = $rt_checkBounds(var$5, var$6);
                        var$6[var$8] = var$7;
                        var$5 = var$8 + 1 | 0;
                    }
                    var$2 = var$3;
                    var$1 = var$3;
                    var$0.$c7 = ji_DataInputStream_readByte(var$3) << 16 >> 16;
                    var$0.$aZ = ($rt_imul(ji_DataInputStream_readShort(var$3), var$0.$cl) / 16 | 0) << 16 >> 16;
                    var$0.$aX = ($rt_imul(ji_DataInputStream_readShort(var$3), var$0.$ck) / 16 | 0) << 16 >> 16;
                    d_a7(var$0, var$3);
                    d_if1(var$0, var$4);
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    if ($$je instanceof jl_Exception) {
                        var$3 = $$je;
                        break e;
                    } else{
                        var$1 = $$je;
                        break d;
                    }
                }
                f: {
                    g: {
                        try {
                            ji_FilterInputStream_close($rt_nullCheck(var$3));
                            break f;
                        } catch ($$e) {
                            $$je = $rt_wrapException($$e);
                            if ($$je instanceof jl_Exception) {
                                break g;
                            } else {
                                throw $$e;
                            }
                        }
                    }
                }
                try {
                    var$2 = var$3;
                    break c;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    var$1 = $$je;
                    break d;

                }
            }
            try {
                var$2 = var$1;
                jl_Throwable_printStackTrace(var$3);
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                var$1 = $$je;
                break d;

            }
            h: {
                i: {
                    j: {
                        try {
                            if (var$1 === null)
                                break j;
                        } catch ($$e) {
                            $$je = $rt_wrapException($$e);
                            var$1 = $$je;
                            break d;

                        }
                        try {
                            ji_FilterInputStream_close($rt_nullCheck(var$1));
                            break j;
                        } catch ($$e) {
                            $$je = $rt_wrapException($$e);
                            if ($$je instanceof jl_Exception) {
                                break i;
                            } else {
                                throw $$e;
                            }
                        }
                    }
                    break h;
                }
            }
            try {
                var$2 = var$1;
                break c;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                var$1 = $$je;
                break d;

            }
        }
        k: {
            l: {
                try {
                    if (var$2 !== null)
                        ji_FilterInputStream_close($rt_nullCheck(var$2));
                    break k;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    if ($$je instanceof jl_Exception) {
                        break l;
                    } else {
                        throw $$e;
                    }
                }
            }
        }
        $rt_throw(var$1);
    }
    var$0.$aB = (-1);
    var$0.$az = (-1);
    d_for(var$0, 0);
    var$0.$aN = (-1);
    var$0.$aK = (-1);
    var$5 = (var$0.$ak + g_l($rt_nullCheck(var$0.$c3)) | 0) + var$0.$b6 | 0;
    d_new(var$0, var$0.$ak, var$5);
    var$0.$br = 40;
},
d_if1 = (var$0, var$1) => {
    let var$2, var$3, var$4, var$5, var$6, var$7, var$8, var$9, var$10, var$11, var$12, var$13, var$14, var$15;
    var$2 = ju_Vector__init_();
    var$3 = ju_Vector__init_();
    var$4 = ju_Vector__init_();
    var$5 = $rt_nullCheck(var$0.$bd);
    var$6 = var$5.$long0;
    var$7 = var$5.$if8;
    var$8 = var$5.$char2;
    var$9 = 0;
    var$0.$c7 = 0;
    var$10 = 0;
    while (var$10 < var$8) {
        var$11 = 0;
        while (var$11 < var$7) {
            var$6 = $rt_nullCheck(var$6);
            var$12 = var$6.data;
            var$13 = $rt_checkBounds(var$9, var$12);
            if (var$12[var$13] != 13) {
                if (var$12[var$13] == 8) {
                    var$0.$bq = var$11 << 16 >> 16;
                    var$0.$bo = var$10 << 16 >> 16;
                } else if (var$12[var$13] == 15) {
                    var$5 = jl_Integer__init_(var$13);
                    ju_Vector_addElement(var$3, var$5);
                    ju_Vector_addElement(var$2, var$5);
                } else if (var$12[var$13] == 6) {
                    var$0.$c7 = (var$0.$c7 + 1 | 0) << 16 >> 16;
                    ju_Vector_addElement(var$2, jl_Integer__init_(var$13));
                } else if (var$12[var$13] == 12)
                    a_a($rt_nullCheck(var$0.$bd), var$11, var$10 - 1 | 0, 21);
            } else {
                ju_Vector_addElement(var$4, jl_Integer__init_(var$11));
                ju_Vector_addElement(var$4, jl_Integer__init_(var$10));
                var$9 = 0;
                a: {
                    b: {
                        while (true) {
                            var$14 = $rt_compare(var$11, var$7);
                            if (var$14 >= 0)
                                break;
                            var$13 = $rt_checkBounds(var$13, var$12);
                            if (var$12[var$13] != 13)
                                break b;
                            var$12[var$13] = 0;
                            var$9 = var$9 + 1 | 0;
                            var$13 = var$13 + 1 | 0;
                            var$11 = var$11 + 1 | 0;
                        }
                        break a;
                    }
                }
                if (!var$14)
                    var$13 = var$13 + (-1) | 0;
                ju_Vector_addElement(var$4, jl_Integer__init_(var$9));
            }
            var$11 = var$11 + 1 | 0;
            var$9 = var$13 + 1 | 0;
        }
        var$10 = var$10 + 1 | 0;
    }
    var$0.$cL = $rt_createShortArray(ju_Vector_size(var$3));
    var$8 = 0;
    while (var$8 < ju_Vector_size(var$3)) {
        var$6 = var$0.$cL;
        var$7 = jl_Number_shortValue($rt_nullCheck(ju_Vector_elementAt(var$3, var$8)));
        var$6 = ($rt_nullCheck(var$6)).data;
        var$8 = $rt_checkBounds(var$8, var$6);
        var$6[var$8] = var$7;
        var$8 = var$8 + 1 | 0;
    }
    var$0.$ag = $rt_createShortArray(ju_Vector_size(var$2) * 3 | 0);
    var$10 = 0;
    while (var$10 < ju_Vector_size(var$2)) {
        var$7 = ($rt_nullCheck(ju_Vector_elementAt(var$2, var$10))).$value1;
        var$6 = var$0.$ag;
        var$9 = var$10 * 3 | 0;
        var$8 = ($rt_nullCheck(var$0.$bd)).$if8;
        var$11 = (var$7 % var$8 | 0) << 16 >> 16;
        var$6 = ($rt_nullCheck(var$6)).data;
        var$9 = $rt_checkBounds(var$9, var$6);
        var$6[var$9] = var$11;
        var$11 = var$9 + 1 | 0;
        var$7 = (var$7 / var$8 | 0) << 16 >> 16;
        var$6[$rt_checkBounds(var$11, var$6)] = var$7;
        var$6[$rt_checkBounds(var$9 + 2 | 0, var$6)] = (-1);
        var$10 = var$10 + 1 | 0;
    }
    var$0.$a30 = 0;
    var$12 = ($rt_nullCheck(var$1)).data;
    var$11 = var$12.length;
    var$0.$cm = $rt_createShortMultiArray([4, var$11]);
    var$0.$cG = $rt_createShortArray(var$11);
    var$7 = 0;
    while (var$7 < var$11) {
        var$9 = var$7 * 3 | 0;
        var$10 = jl_Number_shortValue($rt_nullCheck(ju_Vector_elementAt(var$4, var$9)));
        var$8 = jl_Number_shortValue($rt_nullCheck(ju_Vector_elementAt(var$4, var$9 + 1 | 0)));
        var$13 = jl_Number_shortValue($rt_nullCheck(ju_Vector_elementAt(var$4, var$9 + 2 | 0)));
        var$9 = (var$10 * 8 | 0) << 16 >> 16;
        var$14 = (var$8 * 8 | 0) << 16 >> 16;
        var$10 = $rt_checkBounds(var$7, var$12);
        var$15 = (var$12[var$10] & 255) << 16 >> 16;
        var$8 = ($rt_imul(var$9, var$0.$cl) / 16 | 0) << 16 >> 16;
        var$7 = ($rt_imul(var$14, var$0.$ck) / 16 | 0) << 16 >> 16;
        if (!var$13)
            var$13 = ($rt_nullCheck(var$0.$bd)).$if8 << 16 >> 16;
        var$1 = ($rt_nullCheck(var$0.$cm)).data;
        var$10 = $rt_checkUpperBound(var$10, var$1);
        var$6 = ($rt_nullCheck(var$1[var$10])).data;
        var$6[$rt_checkUpperBound(0, var$6)] = var$8;
        var$10 = $rt_checkUpperBound(var$10, var$1);
        var$6 = ($rt_nullCheck(var$1[var$10])).data;
        var$6[$rt_checkUpperBound(1, var$6)] = var$7;
        var$9 = $rt_checkUpperBound(var$10, var$1);
        var$6 = ($rt_nullCheck(var$1[var$9])).data;
        var$6[$rt_checkUpperBound(2, var$6)] = var$13;
        var$9 = $rt_checkUpperBound(var$9, var$1);
        var$1 = ($rt_nullCheck(var$1[var$9])).data;
        var$1[$rt_checkUpperBound(3, var$1)] = var$15;
        var$1 = ($rt_nullCheck(var$0.$cG)).data;
        var$7 = $rt_checkUpperBound(var$9, var$1);
        var$1[var$7] = var$8;
        var$7 = var$7 + 1 | 0;
    }
},
d_new = (var$0, var$1, var$2) => {
    let var$3, var$4, var$5, var$6, var$7, var$8;
    a: {
        var$3 = var$0.$ag;
        var$4 = var$0.$a30 + 1 | 0;
        var$3 = ($rt_nullCheck(var$3)).data;
        var$5 = var$3[$rt_checkBounds(var$4, var$3)];
        var$6 = var$0.$b6;
        if ($rt_imul(var$5, var$6) < var$1) {
            var$5 = var$3.length - 3 | 0;
            b: {
                while (true) {
                    var$4 = var$0.$a30;
                    if (var$4 >= var$5)
                        break;
                    if ($rt_imul(var$3[$rt_checkBounds(var$4 + 1 | 0, var$3)], var$6) >= var$1)
                        break b;
                    var$0.$a30 = var$4 + 3 | 0;
                }
                break a;
            }
        } else if ($rt_imul(var$3[$rt_checkBounds(var$4, var$3)], var$6) > var$1)
            while (true) {
                var$4 = var$0.$a30;
                if (var$4 <= 0)
                    break a;
                if ($rt_imul(var$3[$rt_checkBounds(var$4 + 1 | 0, var$3)], var$6) < var$1)
                    break;
                var$0.$a30 = var$4 - 3 | 0;
            }
    }
    var$3 = var$0.$cm;
    var$6 = var$0.$cY;
    var$7 = ($rt_nullCheck(var$3)).data;
    var$3 = ($rt_nullCheck(var$7[$rt_checkBounds(var$6, var$7)])).data;
    if (var$1 > var$3[$rt_checkUpperBound(1, var$3)]) {
        var$4 = var$7.length;
        c: {
            while (true) {
                if (var$6 >= var$4)
                    break c;
                var$6 = $rt_checkBounds(var$6, var$7);
                var$3 = ($rt_nullCheck(var$7[var$6])).data;
                if (var$3[$rt_checkUpperBound(1, var$3)] >= var$1)
                    break;
                var$6 = var$6 + 1 | 0;
            }
            var$0.$cY = var$6;
        }
        var$5 = var$0.$cY;
        var$6 = var$5;
        d: {
            e: {
                while (true) {
                    if (var$6 >= var$4)
                        break e;
                    var$8 = $rt_checkBounds(var$6, var$7);
                    var$3 = ($rt_nullCheck(var$7[var$8])).data;
                    if (var$3[$rt_checkUpperBound(1, var$3)] >= var$2)
                        break;
                    var$6 = var$8 + 1 | 0;
                }
                break d;
            }
            var$8 = (-1);
        }
        if (var$8 != (-1))
            var$4 = var$8;
        var$0.$G = var$4 - var$5 | 0;
    } else {
        var$4 = var$7.length;
        if (var$6 < var$4) {
            f: {
                while (true) {
                    if (var$6 < 0)
                        break f;
                    var$6 = $rt_checkBounds(var$6, var$7);
                    var$3 = ($rt_nullCheck(var$7[var$6])).data;
                    if (var$3[$rt_checkUpperBound(1, var$3)] < var$1)
                        break;
                    if (!var$6)
                        break;
                    var$6 = var$6 + (-1) | 0;
                }
                var$0.$cY = var$6;
            }
            var$5 = var$0.$cY;
            var$6 = var$5;
            g: {
                h: {
                    while (true) {
                        if (var$6 >= var$4)
                            break h;
                        var$8 = $rt_checkBounds(var$6, var$7);
                        var$3 = ($rt_nullCheck(var$7[var$8])).data;
                        if (var$3[$rt_checkUpperBound(1, var$3)] >= var$2)
                            break;
                        var$6 = var$8 + 1 | 0;
                    }
                    break g;
                }
                var$8 = (-1);
            }
            if (var$8 != (-1))
                var$4 = var$8;
            var$0.$G = var$4 - var$5 | 0;
        }
    }
},
d_for1 = var$0 => {
    var$0.$a60 = 0;
    var$0.$ci = 0;
    var$0.$ay = null;
    var$0.$ax = null;
    var$0.$Z = null;
    var$0.$cg = null;
    var$0.$cj = null;
    var$0.$bB = null;
    var$0.$X = null;
    var$0.$cB = null;
    e_if($rt_nullCheck(var$0.$aJ));
    var$0.$cW = null;
    var$0.$bP = null;
    var$0.$X = null;
    var$0.$bF = null;
    var$0.$bD = null;
    var$0.$bi = null;
    var$0.$b8 = null;
    var$0.$bK = null;
    var$0.$cL = null;
    var$0.$cm = null;
    var$0.$cG = null;
    var$0.$ag = null;
    j_for(var$0);
},
d_byte = (var$0, var$1, var$2) => {
    let var$3, var$4, var$5, var$6, var$7, var$8, var$9, var$10, var$11, var$12, var$13, var$14, var$15;
    if (var$0.$s) {
        a: {
            var$0.$bf = 0;
            if (var$0.$c2 != 1) {
                var$1 = var$0.$W;
                if (var$1 != 65535) {
                    var$2 = 0;
                    while (true) {
                        var$3 = ($rt_nullCheck(var$0.$cL)).data;
                        if (var$2 >= var$3.length)
                            break a;
                        var$4 = $rt_checkBounds(var$2, var$3);
                        if (var$1 == var$3[var$4])
                            break;
                        var$2 = var$4 + 1 | 0;
                    }
                    d_for0(var$0, jml_Image_getGraphics($rt_nullCheck(var$0.$aa)));
                    var$0.$b1 = 0;
                    var$0.$ba = var$0.$cK;
                    var$0.$cK = 11;
                    var$0.$a210 = (2 + var$4 | 0) << 24 >> 24;
                    var$0.$W = (-1);
                } else {
                    d_for0(var$0, jml_Image_getGraphics($rt_nullCheck(var$0.$aa)));
                    var$0.$b1 = 0;
                    var$0.$ba = 6;
                    var$0.$cK = 11;
                    var$0.$a210 = 1;
                    var$0.$W = (-1);
                }
            } else {
                d_for0(var$0, jml_Image_getGraphics($rt_nullCheck(var$0.$aa)));
                var$0.$b1 = 0;
                var$0.$ba = var$0.$cK;
                var$0.$cK = 11;
                var$0.$a210 = 0;
            }
        }
        var$0.$s = 0;
    }
    var$1 = var$0.$b1 + 1 | 0;
    var$0.$b1 = var$1;
    if (var$0.$cO == 2 && !var$0.$c2 && !(var$1 % 35 | 0))
        d_try(var$0, (-1), var$0.$ak);
    var$1 = var$0.$n;
    if (!(var$1 && var$1 != 1 && var$1 != 2)) {
        var$1 = var$0.$bR;
        if (var$1 < 0 && var$0.$bS < 0) {
            var$0.$n = 3;
            var$0.$bp = 0;
            var$0.$cv = 1;
            var$0.$cn = 1;
        } else if (var$1 < 0 && var$0.$bS > 0) {
            var$0.$n = 5;
            var$0.$bp = 0;
            var$0.$cv = 3;
            var$0.$cn = 1;
        } else if (var$1 < 0) {
            var$0.$n = 4;
            var$0.$bp = 0;
        } else {
            var$1 = var$0.$bS;
            if (var$1 < 0)
                var$0.$n = 1;
            else if (var$1 > 0)
                var$0.$n = 2;
        }
    }
    var$1 = var$0.$bS;
    if (!var$1) {
        var$2 = var$0.$n;
        if (!(var$2 != 1 && var$2 != 2))
            var$0.$n = 0;
    }
    b: {
        c: {
            d: {
                e: {
                    f: {
                        g: {
                            h: {
                                i: {
                                    var$2 = 0;
                                    var$4 = 0;
                                    switch (var$0.$n) {
                                        case 0:
                                            break f;
                                        case 1:
                                            break h;
                                        case 2:
                                            break g;
                                        case 3:
                                            break c;
                                        case 4:
                                            break d;
                                        case 5:
                                            break;
                                        case 6:
                                            break e;
                                        default:
                                            break i;
                                    }
                                    var$3 = var$0.$S;
                                    var$5 = var$0.$bp;
                                    var$3 = ($rt_nullCheck(var$3)).data;
                                    var$4 =  -var$3[$rt_checkBounds(var$5, var$3)] | 0;
                                    if (var$0.$cn)
                                        var$2 = var$2 + var$0.$be | 0;
                                    if (var$1 < 0 && !var$0.$bR) {
                                        var$2 =  -var$0.$be | 0;
                                        var$0.$cn = 0;
                                        var$0.$cv = 1;
                                    } else if (var$1 > 0 && !var$0.$bR) {
                                        var$2 = var$0.$be;
                                        var$0.$cn = 0;
                                        var$0.$cv = 3;
                                    }
                                    var$1 = var$5 + 1 | 0;
                                    var$0.$bp = var$1;
                                    if (var$1 != var$3.length)
                                        break b;
                                    var$0.$bp = 0;
                                    var$0.$n = 0;
                                    break b;
                                }
                                break b;
                            }
                            var$0.$cv = (var$0.$b1 / 3 | 0) % 2 | 0;
                            var$2 = var$2 - var$0.$be | 0;
                            break b;
                        }
                        var$0.$cv = 2 + ((var$0.$b1 / 3 | 0) % 2 | 0) | 0;
                        var$2 = var$2 + var$0.$be | 0;
                        break b;
                    }
                    if (var$0.$cv < 2) {
                        var$0.$cv = 0;
                        break b;
                    }
                    var$0.$cv = 2;
                    break b;
                }
                if (var$1 < 0) {
                    var$0.$cv = 1;
                    var$2 =  -var$0.$cr | 0;
                } else if (var$1 > 0) {
                    var$0.$cv = 3;
                    var$2 = var$0.$cr;
                }
                var$4 = var$4 + var$0.$bO | 0;
                break b;
            }
            if (var$1 < 0) {
                var$0.$cv = 1;
                var$2 =  -var$0.$be | 0;
            } else if (var$1 > 0) {
                var$0.$cv = 3;
                var$2 = var$0.$be;
            }
            var$3 = var$0.$S;
            var$1 = var$0.$bp;
            var$3 = ($rt_nullCheck(var$3)).data;
            var$4 =  -var$3[$rt_checkBounds(var$1, var$3)] | 0;
            var$1 = var$1 + 1 | 0;
            var$0.$bp = var$1;
            if (var$1 != var$3.length)
                break b;
            var$0.$bp = 0;
            var$0.$n = 0;
            break b;
        }
        var$3 = var$0.$S;
        var$5 = var$0.$bp;
        var$3 = ($rt_nullCheck(var$3)).data;
        var$4 =  -var$3[$rt_checkBounds(var$5, var$3)] | 0;
        if (!(var$1 < 0 && !var$0.$bR)) {
            if (var$1 > 0 && !var$0.$bR) {
                var$2 = var$0.$cr;
                var$0.$cn = 0;
                var$0.$cv = 3;
            } else if (var$0.$cn)
                var$2 = var$2 - var$0.$be | 0;
        } else {
            var$2 =  -var$0.$cr | 0;
            var$0.$cn = 0;
            var$0.$cv = 1;
        }
        var$1 = var$5 + 1 | 0;
        var$0.$bp = var$1;
        if (var$1 == var$3.length) {
            var$0.$bp = 0;
            var$0.$n = 0;
        }
    }
    var$1 = 0;
    var$5 = var$0.$aQ;
    if (var$5 != (-1)) {
        var$3 = ($rt_nullCheck(var$0.$cG)).data;
        var$1 = var$3[$rt_checkBounds(var$5, var$3)];
    }
    d_l(var$0);
    var$5 = var$0.$aQ;
    var$6 = $rt_compare(var$5, (-1));
    if (var$6) {
        var$3 = ($rt_nullCheck(var$0.$cG)).data;
        var$2 = var$2 + ((var$3[$rt_checkBounds(var$5, var$3)] - var$1 | 0) << 4) | 0;
    }
    j: {
        var$7 = var$0.$aO >> 4;
        var$8 = var$0.$aM >> 4;
        var$1 = var$7 + (var$0.$aP / 2 | 0) | 0;
        var$9 = var$0.$ah;
        var$10 = var$1 - var$9 | 0;
        var$9 = var$1 + var$9 | 0;
        var$11 = 0;
        if (!var$6 && var$4 > 0) {
            var$1 = var$8 + 1 | 0;
            var$5 = var$0.$cY;
            var$10 = var$10 << 4;
            var$9 = var$9 << 4;
            var$12 = var$1 << 4;
            k: {
                while (var$5 < (var$0.$cY + var$0.$G | 0)) {
                    if (var$11)
                        break k;
                    var$3 = ($rt_nullCheck(var$0.$cm)).data;
                    var$13 = $rt_checkBounds(var$5, var$3);
                    var$14 = ($rt_nullCheck(var$3[var$13])).data;
                    if (!(var$14[$rt_checkUpperBound(3, var$14)] & 1)) {
                        var$14 = ($rt_nullCheck(var$0.$cG)).data;
                        var$6 = $rt_checkUpperBound(var$13, var$14);
                        var$5 = var$14[var$6];
                        var$8 = $rt_checkUpperBound(var$6, var$3);
                        var$14 = ($rt_nullCheck(var$3[var$8])).data;
                        var$6 = var$14[$rt_checkUpperBound(1, var$14)];
                        var$1 = var$0.$bT;
                        var$13 = $rt_checkUpperBound(var$8, var$3);
                        var$3 = ($rt_nullCheck(var$3[var$13])).data;
                        var$1 = d_a3(var$0, var$10, var$9, var$12, var$4, var$5 << 4, (var$5 + $rt_imul(var$1, var$3[$rt_checkUpperBound(2, var$3)]) | 0) << 4, var$6 << 4);
                        if (var$1 < var$4) {
                            var$11 = 1;
                            var$0.$aQ = var$13;
                            var$4 = var$0.$cO;
                            if (!var$4 && var$13 == var$0.$at) {
                                var$0.$cO = var$4 + 1 | 0;
                                var$4 = var$0.$b1;
                                var$0.$au = var$4;
                                var$0.$T = 0;
                                var$0.$bQ = var$4;
                                var$0.$ao = var$0.$cX;
                                var$0.$an = var$0.$cV;
                                c_try();
                                var$0.$cK = 4;
                                var$4 = var$1;
                            } else if (var$4 != 2)
                                var$4 = var$1;
                            else if (var$13 != var$0.$cP)
                                var$4 = var$1;
                            else {
                                var$0.$cO = var$4 + 1 | 0;
                                var$4 = var$0.$b1;
                                var$0.$au = var$4;
                                var$0.$T = 0;
                                var$0.$bQ = var$4;
                                var$0.$ao = var$0.$af;
                                var$0.$an = var$0.$ae;
                                c_try();
                                var$0.$cK = 5;
                                var$4 = var$1;
                            }
                        }
                    }
                    var$5 = var$13 + 1 | 0;
                }
                break j;
            }
        } else if (var$6) {
            l: {
                var$3 = ($rt_nullCheck(var$0.$cG)).data;
                var$6 = var$3[$rt_checkBounds(var$5, var$3)];
                var$14 = ($rt_nullCheck(var$0.$cm)).data;
                var$3 = ($rt_nullCheck(var$14[$rt_checkBounds(var$5, var$14)])).data;
                var$12 = var$3[$rt_checkUpperBound(1, var$3)];
                var$13 = var$0.$bT;
                var$3 = ($rt_nullCheck(var$14[$rt_checkBounds(var$5, var$14)])).data;
                var$1 = var$6 + $rt_imul(var$13, var$3[$rt_checkUpperBound(2, var$3)]) | 0;
                var$13 = $rt_compare(var$10, var$6);
                if (!(var$13 >= 0 && var$10 <= var$1) && !(var$9 >= var$6 && var$9 <= var$1)) {
                    if (var$13 > 0)
                        break l;
                    if (var$9 < var$1)
                        break l;
                }
                if ((var$12 - var$8 | 0) == 1) {
                    var$3 = ($rt_nullCheck(var$14[$rt_checkBounds(var$5, var$14)])).data;
                    if (!(var$3[$rt_checkUpperBound(3, var$3)] & 1))
                        break j;
                }
            }
            var$0.$aQ = (-1);
        }
    }
    var$5 = var$0.$aP;
    var$1 = (70 * var$5 | 0) / 200 | 0;
    var$15 = var$0.$I;
    var$6 = var$0.$aO + var$1 | 0;
    var$8 = var$0.$aM;
    var$10 = var$0.$a00 << 4;
    if (f_a($rt_nullCheck(var$15), var$6, var$8 - var$10 | 0, (var$5 - var$1 | 0) << 4, var$10, var$2, var$4)) {
        var$11 = 1;
        var$2 = f_for($rt_nullCheck(var$0.$I));
        var$4 = f_do($rt_nullCheck(var$0.$I));
    }
    if (!var$11 && var$0.$aQ == (-1)) {
        var$1 = var$0.$n;
        if (var$1 != 6 && var$4 >= 0 && var$1 != 3 && var$1 != 4 && var$1 != 5)
            var$0.$n = 6;
    }
    if (var$11) {
        var$1 = var$0.$n;
        if (!(var$1 != 6 && var$1 != 3 && var$1 != 4 && var$1 != 5))
            var$0.$n = 0;
    }
    if (var$7 <= 2 && var$2 < 0) {
        var$0.$aO = 32;
        var$2 = 0;
    } else if (((var$7 + var$0.$aP | 0) + 2 | 0) >= $rt_imul(a_do($rt_nullCheck(var$0.$bd)), var$0.$bT) && var$2 > 0) {
        var$0.$aO = (($rt_imul(a_do($rt_nullCheck(var$0.$bd)), var$0.$bT) - var$0.$aP | 0) - 2 | 0) << 4;
        var$2 = 0;
    }
    var$1 = var$0.$aO + var$2 | 0;
    var$0.$aO = var$1;
    var$2 = var$0.$aM + var$4 | 0;
    var$0.$aM = var$2;
    var$1 = var$1 >> 4;
    var$2 = var$2 >> 4;
    var$4 = var$2 - (var$0.$a00 / 2 | 0) | 0;
    var$5 = var$0.$b6;
    var$4 = var$4 / var$5 | 0;
    var$5 = var$2 / var$5 | 0;
    var$7 = var$0.$aP;
    var$6 = var$7 / 3 | 0;
    var$8 = var$1 + var$6 | 0;
    var$10 = var$0.$bT;
    var$8 = var$8 / var$10 | 0;
    var$7 = ((var$1 + var$7 | 0) - var$6 | 0) / var$10 | 0;
    var$3 = a_for($rt_nullCheck(var$0.$bd));
    if (var$0.$W == (-1))
        var$0.$bf = 2000;
    var$0.$W = (-1);
    while (var$4 <= var$5) {
        var$6 = $rt_imul(var$4, a_do($rt_nullCheck(var$0.$bd))) + var$8 | 0;
        var$10 = var$8;
        while (var$10 <= var$7) {
            m: {
                n: {
                    o: {
                        p: {
                            q: {
                                var$3 = $rt_nullCheck(var$3);
                                var$14 = var$3.data;
                                var$12 = $rt_checkBounds(var$6, var$14);
                                switch (var$14[var$12]) {
                                    case 6:
                                    case 20:
                                        break o;
                                    case 7:
                                        break p;
                                    case 8:
                                    case 9:
                                    case 10:
                                    case 11:
                                    case 13:
                                    case 14:
                                    case 21:
                                        break m;
                                    case 12:
                                        break n;
                                    case 15:
                                    case 22:
                                        break;
                                    case 16:
                                    case 17:
                                    case 18:
                                    case 19:
                                        break q;
                                    default:
                                        break m;
                                }
                                var$0.$W = var$12;
                                break m;
                            }
                            var$0.$W = 65535;
                            break m;
                        }
                        a_a($rt_nullCheck(var$0.$bd), var$10, var$4, 0);
                        var$15 = var$0.$bd;
                        var$6 = var$0.$bq;
                        var$9 = var$0.$bo;
                        a_a($rt_nullCheck(var$15), var$6, var$9, 16);
                        var$15 = var$0.$bd;
                        var$6 = var$0.$bq + 1 | 0;
                        var$9 = var$0.$bo;
                        a_a($rt_nullCheck(var$15), var$6, var$9, 17);
                        var$15 = var$0.$bd;
                        var$6 = var$0.$bq;
                        var$9 = var$0.$bo + 1 | 0;
                        a_a($rt_nullCheck(var$15), var$6, var$9, 18);
                        var$15 = var$0.$bd;
                        var$6 = var$0.$bq + 1 | 0;
                        var$9 = var$0.$bo + 1 | 0;
                        a_a($rt_nullCheck(var$15), var$6, var$9, 19);
                        var$0.$cM = 1;
                        c_if0();
                        var$6 = var$0.$b1;
                        var$0.$bQ = var$6;
                        var$0.$au = var$6;
                        break m;
                    }
                    a_a($rt_nullCheck(var$0.$bd), var$10, var$4, 0);
                    var$6 = var$0.$a110 + 1 | 0;
                    var$0.$a110 = var$6;
                    if (var$6 != var$0.$c7)
                        c_for0();
                    else {
                        var$14 = ($rt_nullCheck(var$0.$E)).data;
                        var$14[$rt_checkUpperBound(0, var$14)] = 1;
                        var$0.$bn = 2000;
                        c_do0();
                    }
                    if (var$0.$a110 % 15 | 0)
                        break m;
                    var$6 = var$0.$a80;
                    if (var$6 >= 6)
                        break m;
                    var$0.$a80 = var$6 + 1 | 0;
                    break m;
                }
                a_a($rt_nullCheck(var$0.$bd), var$10, var$4, 0);
                a_a($rt_nullCheck(var$0.$bd), var$10, var$4 - 1 | 0, 0);
                var$0.$aN = $rt_imul(var$10, var$0.$bT);
                var$0.$aK = ($rt_imul(var$4 + 1 | 0, var$0.$b6) - (var$0.$cU / 2 | 0) | 0) + 3 | 0;
                c_char0();
                if (var$0.$c2 != 2)
                    var$0.$H = var$0.$H + 1 | 0;
                else {
                    var$9 = var$0.$a40 + 1 | 0;
                    var$0.$a40 = var$9;
                    var$14 = ($rt_nullCheck(var$0.$bi)).data;
                    if (var$9 >= var$14.length) {
                        c_a1();
                        var$0.$cS = 0;
                        e_a0($rt_nullCheck(var$0.$aJ), $rt_s(40));
                        d_for(var$0, (-2));
                    } else {
                        var$6 = var$14[$rt_checkBounds(var$9, var$14)] % a_do($rt_nullCheck(var$0.$bd)) | 0;
                        var$14 = var$0.$bi;
                        var$9 = var$0.$a40;
                        var$14 = ($rt_nullCheck(var$14)).data;
                        var$9 = var$14[$rt_checkBounds(var$9, var$14)] / a_do($rt_nullCheck(var$0.$bd)) | 0;
                        a_a($rt_nullCheck(var$0.$bd), var$6, var$9, 12);
                        var$15 = var$0.$bd;
                        var$9 = var$9 - 1 | 0;
                        a_a($rt_nullCheck(var$15), var$6, var$9, 21);
                    }
                }
            }
            var$10 = var$10 + 1 | 0;
            var$6 = var$12 + 1 | 0;
        }
        var$4 = var$4 + 1 | 0;
    }
    d_j(var$0);
    d_k(var$0);
    var$4 = var$1 + (var$0.$aP / 2 | 0) | 0;
    var$5 = 0;
    while (var$5 < 3) {
        var$3 = ($rt_nullCheck(var$0.$by)).data;
        var$8 = $rt_checkBounds(var$5, var$3);
        if (var$3[var$8] != (-1)) {
            var$14 = var$0.$bH;
            var$5 = var$8 * 2 | 0;
            var$14 = ($rt_nullCheck(var$14)).data;
            var$10 = $rt_checkBounds(var$5, var$14);
            var$5 = var$4 - var$14[var$10] | 0;
            var$9 = $rt_checkBounds(var$10 + 1 | 0, var$14);
            var$7 = var$2 - var$14[var$9] | 0;
            if (var$5 < 0)
                var$5 =  -var$5 | 0;
            if (var$5 < 4 && var$7 < 5 && var$7 > (-2)) {
                var$6 = $rt_checkUpperBound(var$8, var$3);
                var$3[var$6] = (-1);
                var$0.$a80 = var$0.$a80 - 1 | 0;
                c_goto0();
                h_a1(100, 200);
                var$3 = var$0.$c10;
                var$5 = (var$1 + var$0.$C | 0) << 16 >> 16;
                var$3 = ($rt_nullCheck(var$3)).data;
                var$3[$rt_checkUpperBound(var$10, var$3)] = var$5;
                var$3[$rt_checkUpperBound(var$9, var$3)] = (var$2 + var$0.$aw | 0) << 16 >> 16;
                var$3 = var$0.$a90;
                var$5 = var$0.$b1;
                var$3 = ($rt_nullCheck(var$3)).data;
                var$8 = $rt_checkUpperBound(var$6, var$3);
                var$3[var$8] = var$5;
                if (var$0.$a80 <= 0) {
                    var$0.$a80 = 0;
                    var$0.$bU = 0;
                    var$0.$cK = 3;
                }
            }
        }
        var$3 = var$0.$c10;
        var$5 = var$8 * 2 | 0;
        var$3 = ($rt_nullCheck(var$3)).data;
        var$6 = $rt_checkBounds(var$5, var$3);
        if (var$3[var$6] != (-1)) {
            var$5 = var$0.$b1;
            var$14 = ($rt_nullCheck(var$0.$a90)).data;
            var$8 = $rt_checkUpperBound(var$8, var$14);
            if ((var$5 - var$14[var$8] | 0) > 21)
                var$3[$rt_checkUpperBound(var$6, var$3)] = (-1);
        }
        var$5 = var$8 + 1 | 0;
    }
},
d_case = (var$0, var$1, var$2) => {
    var$0.$b1 = var$0.$b1 + 1 | 0;
    d_l(var$0);
    d_j(var$0);
    d_k(var$0);
    if (!var$0.$bU) {
        c_$callClinit();
        if (c_else) {
            cnms_Sound_play($rt_nullCheck(c_case), 1);
            c_byte = c_case;
        }
    }
    var$1 = var$0.$bU + var$1 | 0;
    var$0.$bU = var$1;
    if (var$1 > 3000) {
        var$0.$as = 0;
        var$0.$bW = 1;
    }
},
d_a9 = (var$0, var$1, var$2, var$3, var$4, var$5, var$6) => {
    let var$7, var$8, var$9, var$10;
    if (!var$0.$bG) {
        var$7 = var$1 - var$3 | 0;
        var$8 = var$0.$bV;
        var$0.$bG = !(var$7 >= var$8 && ((var$3 + var$5 | 0) - var$1 | 0) >= (var$8 + var$0.$bT | 0)) ? 1 : 0;
    }
    if (!var$0.$bx) {
        var$7 = var$2 - var$4 | 0;
        var$8 = var$0.$bN;
        var$0.$bx = !(var$7 >= var$8 && ((var$4 + var$6 | 0) - var$2 | 0) >= (var$8 + var$0.$b6 | 0)) ? 1 : 0;
    }
    if (var$0.$bG) {
        var$8 = var$1 - var$3 | 0;
        var$7 = var$0.$cd;
        var$9 = $rt_compare(var$8, var$7);
        if (var$9 >= 0 && ((var$3 + var$5 | 0) - var$1 | 0) >= var$7)
            var$0.$bG = 0;
        else {
            var$10 = var$7 / 3 | 0;
            if (var$8 < var$10)
                var$0.$am = var$1 - var$10 | 0;
            else {
                var$3 = (var$3 + var$5 | 0) - var$1 | 0;
                if (var$3 < var$10)
                    var$0.$am = (var$1 + var$10 | 0) - var$5 | 0;
                else if (var$9 < 0)
                    var$0.$am = var$0.$am - var$0.$bA | 0;
                else if (var$3 < var$7)
                    var$0.$am = var$0.$am + var$0.$bA | 0;
            }
        }
    }
    if (var$0.$bx) {
        var$3 = var$2 - var$4 | 0;
        var$5 = var$0.$bY;
        var$8 = $rt_compare(var$3, var$5);
        if (var$8 >= 0 && ((var$4 + var$6 | 0) - var$2 | 0) >= var$5)
            var$0.$bx = 0;
        else {
            var$1 = var$5 / 3 | 0;
            if (var$3 < var$1)
                var$0.$ak = var$2 - var$1 | 0;
            else {
                var$3 = (var$4 + var$6 | 0) - var$2 | 0;
                if (var$3 < var$1)
                    var$0.$ak = (var$2 + var$1 | 0) - var$6 | 0;
                else if (var$8 < 0)
                    var$0.$ak = var$0.$ak - var$0.$bt | 0;
                else if (var$3 < var$5)
                    var$0.$ak = var$0.$ak + var$0.$bt | 0;
            }
        }
    }
    var$1 = var$0.$am;
    if (var$1 < 0) {
        var$0.$am = 0;
        var$0.$bG = 0;
    } else {
        var$2 = var$0.$cD;
        if (var$1 > var$2) {
            var$0.$am = var$2;
            var$0.$bG = 0;
        }
    }
    var$1 = var$0.$ak;
    var$2 = var$0.$b3;
    if (var$1 < var$2) {
        var$0.$ak = var$2;
        var$0.$bx = 0;
    } else {
        var$2 = var$0.$cz;
        if (var$1 > var$2) {
            var$0.$ak = var$2;
            var$0.$bx = 0;
        }
    }
},
d_do0 = (var$0, var$1, var$2) => {
    let var$3, var$4, var$5, var$6, var$7, var$8, var$9, var$10, var$11, var$12, var$13, var$14;
    a: {
        var$1 = var$0.$br + var$1 | 0;
        var$0.$br = var$1;
        if (var$1 >= 20) {
            var$0.$br = 0;
            var$0.$bf = var$0.$bf - var$1 | 0;
            var$0.$bn = var$0.$bn - var$1 | 0;
            var$3 = var$0.$cK;
            if (var$3 >= 21 && var$3 <= 25) {
                d_char(var$0, var$1, var$2);
                return;
            }
            var$4 = 1;
            if (var$3 != 11) {
                if (var$3 != 10) {
                    var$5 = var$0.$ak;
                    d_new(var$0, var$5 - var$0.$b6 | 0, (var$5 + g_l($rt_nullCheck(var$0.$c3)) | 0) + var$0.$b6 | 0);
                    var$6 = a_for($rt_nullCheck(var$0.$bd));
                    a_do($rt_nullCheck(var$0.$bd));
                    var$7 = var$0.$ak + g_l($rt_nullCheck(var$0.$c3)) | 0;
                    var$8 = var$0.$a30;
                    while (true) {
                        var$9 = ($rt_nullCheck(var$0.$ag)).data;
                        if (var$8 >= var$9.length)
                            break;
                        var$10 = $rt_checkBounds(var$8 + 1 | 0, var$9);
                        if ($rt_imul(var$9[var$10], var$0.$b6) >= var$7)
                            break;
                        var$11 = $rt_checkBounds(var$8, var$9);
                        var$5 = var$9[var$11];
                        var$3 = var$9[$rt_checkUpperBound(var$10, var$9)];
                        var$10 = var$5 + $rt_imul(a_do($rt_nullCheck(var$0.$bd)), var$3) | 0;
                        var$8 = ((((var$0.$b1 / 10 | 0) + var$5 | 0) + var$3 | 0) / 1 | 0) % 3 | 0;
                        if (var$8 > 1)
                            var$8 = 1;
                        b: {
                            var$9 = var$0.$ag;
                            var$12 = var$11 + 2 | 0;
                            var$9 = ($rt_nullCheck(var$9)).data;
                            var$13 = $rt_checkBounds(var$12, var$9);
                            if (var$9[var$13] != var$8) {
                                c: {
                                    d: {
                                        var$9[$rt_checkUpperBound(var$13, var$9)] = var$8 << 16 >> 16;
                                        var$6 = $rt_nullCheck(var$6);
                                        var$9 = var$6.data;
                                        switch (var$9[$rt_checkBounds(var$10, var$9)]) {
                                            case 6:
                                            case 20:
                                                break d;
                                            case 15:
                                            case 22:
                                                break c;
                                            default:
                                        }
                                        break b;
                                    }
                                    if (var$8) {
                                        a_a($rt_nullCheck(var$0.$bd), var$5, var$3, 20);
                                        break b;
                                    }
                                    a_a($rt_nullCheck(var$0.$bd), var$5, var$3, 6);
                                    break b;
                                }
                                if (var$8)
                                    a_a($rt_nullCheck(var$0.$bd), var$5, var$3, 22);
                                else
                                    a_a($rt_nullCheck(var$0.$bd), var$5, var$3, 15);
                            }
                        }
                        var$8 = var$11 + 3 | 0;
                    }
                    e: {
                        f: {
                            g: {
                                h: {
                                    i: {
                                        j: {
                                            k: {
                                                l: {
                                                    m: {
                                                        switch (var$0.$cK) {
                                                            case 0:
                                                                break m;
                                                            case 3:
                                                                break l;
                                                            case 4:
                                                                break f;
                                                            case 5:
                                                                break h;
                                                            case 6:
                                                                break g;
                                                            case 7:
                                                                break k;
                                                            case 12:
                                                                break j;
                                                            case 20:
                                                                break i;
                                                            case 1:
                                                            case 2:
                                                            case 8:
                                                            case 9:
                                                            case 10:
                                                            case 11:
                                                            case 13:
                                                            case 14:
                                                            case 15:
                                                            case 16:
                                                            case 17:
                                                            case 18:
                                                            case 19:
                                                                break;
                                                            default:
                                                        }
                                                        break e;
                                                    }
                                                    d_byte(var$0, var$1, var$2);
                                                    break e;
                                                }
                                                d_case(var$0, var$1, var$2);
                                                break e;
                                            }
                                            d_byte(var$0, var$1, var$2);
                                            break e;
                                        }
                                        var$5 = var$0.$bU + var$1 | 0;
                                        var$0.$bU = var$5;
                                        if (var$5 <= 14000) {
                                            d_byte(var$0, var$1, var$2);
                                            break e;
                                        }
                                        var$0.$as = 0;
                                        var$0.$bW = 1;
                                        break e;
                                    }
                                    d_byte(var$0, var$1, var$2);
                                    e_a2($rt_nullCheck(var$0.$aJ), var$1, var$2);
                                    if (!e_a3($rt_nullCheck(var$0.$aJ)) && !var$0.$cS)
                                        break e;
                                    var$0.$cS = 0;
                                    var$0.$cK = 0;
                                    if (var$0.$c2 != (-1)) {
                                        c_new0();
                                        var$0.$bU = 0;
                                        var$0.$cK = 12;
                                        break e;
                                    }
                                    e_if($rt_nullCheck(var$0.$aJ));
                                    d_for(var$0, 0);
                                    c_int0();
                                    break e;
                                }
                                var$5 = var$0.$bQ;
                                var$3 = var$5 - var$0.$au | 0;
                                var$0.$bQ = var$5 + 1 | 0;
                                if (!var$0.$cM) {
                                    var$9 = var$0.$by;
                                    var$5 = var$0.$c00;
                                    var$9 = ($rt_nullCheck(var$9)).data;
                                    if (var$9[$rt_checkBounds(var$5, var$9)] == (-1)) {
                                        var$5 = $rt_compare(var$3 % 35 | 0, 23);
                                        if (var$5 < 0)
                                            var$0.$T = 1;
                                        else if (!var$5) {
                                            var$0.$T = 0;
                                            var$5 = (jml_Image_getHeight($rt_nullCheck(var$0.$b4)) - var$0.$cU | 0) - 2 | 0;
                                            d_try(var$0, var$0.$af, var$0.$ae - var$5 | 0);
                                        }
                                    }
                                } else if (var$3 > 0 && var$3 < 30) {
                                    var$0.$T = 0;
                                    if ((var$3 / 4 | 0) % 2 | 0)
                                        var$0.$an = 0;
                                    else
                                        var$0.$an = var$0.$ae;
                                } else if (var$3 == 30) {
                                    var$0.$an = 0;
                                    var$5 = var$0.$bm & 1023;
                                    if (var$5) {
                                        var$9 = ($rt_nullCheck(var$0.$cm)).data;
                                        var$9 = ($rt_nullCheck(var$9[$rt_checkBounds(var$5, var$9)])).data;
                                        var$10 = $rt_checkUpperBound(3, var$9);
                                        var$9[var$10] = (var$9[var$10] & 65534) << 16 >> 16;
                                    }
                                } else if (var$3 == 50) {
                                    var$5 = var$0.$bm >> 10 & 1023;
                                    if (var$5) {
                                        var$9 = ($rt_nullCheck(var$0.$cm)).data;
                                        var$9 = ($rt_nullCheck(var$9[$rt_checkBounds(var$5, var$9)])).data;
                                        var$10 = $rt_checkUpperBound(3, var$9);
                                        var$9[var$10] = (var$9[var$10] & 65534) << 16 >> 16;
                                    }
                                } else if (var$3 == 70) {
                                    var$5 = var$0.$bm >> 20 & 1023;
                                    if (var$5) {
                                        var$9 = ($rt_nullCheck(var$0.$cm)).data;
                                        var$9 = ($rt_nullCheck(var$9[$rt_checkBounds(var$5, var$9)])).data;
                                        var$10 = $rt_checkUpperBound(3, var$9);
                                        var$9[var$10] = (var$9[var$10] & 65534) << 16 >> 16;
                                    }
                                    var$0.$cO = var$0.$cO + 1 | 0;
                                    var$0.$cK = 0;
                                }
                                d_byte(var$0, var$1, var$2);
                                break e;
                            }
                            if (var$0.$c2 == 2) {
                                var$5 = var$0.$cQ - var$1 | 0;
                                var$0.$cQ = var$5;
                                if (var$5 < 0) {
                                    if (var$5 < 0)
                                        var$0.$cQ = 0;
                                    var$0.$bU = 0;
                                    var$0.$cK = 3;
                                }
                            }
                            var$5 = var$0.$cQ;
                            if (var$5 < 60000) {
                                var$9 = var$0.$by;
                                var$5 = var$0.$c00;
                                var$9 = ($rt_nullCheck(var$9)).data;
                                if (var$9[$rt_checkBounds(var$5, var$9)] == (-1)) {
                                    var$5 = $rt_compare(var$0.$b1 % 35 | 0, 23);
                                    if (var$5 < 0)
                                        var$0.$T = 1;
                                    else if (!var$5) {
                                        var$0.$T = 0;
                                        var$5 = (jml_Image_getHeight($rt_nullCheck(var$0.$b4)) - var$0.$cU | 0) - 2 | 0;
                                        d_try(var$0, var$0.$aZ, var$0.$aX - var$5 | 0);
                                    }
                                }
                                d_byte(var$0, var$1, var$2);
                                break e;
                            }
                            var$0.$am = ((var$0.$aO >> 4) + (var$0.$aP / 2 | 0) | 0) - var$0.$bV | 0;
                            if (var$5 >= 65000)
                                var$0.$ak = var$0.$b3;
                            else {
                                var$1 = var$0.$b3;
                                var$0.$ak = var$1 + ($rt_imul((65000 - var$5 | 0) * 115 | 0, var$0.$cz - var$1 | 0) / 500000 | 0) | 0;
                            }
                            var$1 = var$0.$ak;
                            var$2 = var$0.$cz;
                            if (var$1 >= var$2)
                                var$0.$ak = var$2;
                            var$4 = 0;
                            break e;
                        }
                        n: {
                            o: {
                                var$5 = var$0.$bQ;
                                var$3 = var$5 - var$0.$au | 0;
                                var$0.$bQ = var$5 + 1 | 0;
                                if (!(var$3 >= 0 && var$3 < 30)) {
                                    var$10 = $rt_compare(var$3, 60);
                                    if (var$10 <= 0)
                                        break o;
                                    if (var$3 >= 90)
                                        break o;
                                }
                                if ((var$3 / 4 | 0) % 2 | 0) {
                                    var$0.$an = 0;
                                    break n;
                                }
                                var$0.$an = var$0.$cV;
                                break n;
                            }
                            if (var$3 == 30) {
                                var$0.$an = var$0.$cV;
                                var$0.$T = 1;
                            } else if (!var$10) {
                                var$0.$T = 0;
                                var$5 = (jml_Image_getHeight($rt_nullCheck(var$0.$b4)) - var$0.$cU | 0) - 2 | 0;
                                d_try(var$0, var$0.$cX, var$0.$cV - var$5 | 0);
                            } else if (var$3 == 90) {
                                var$0.$an = 0;
                                var$5 = var$0.$Y & 1023;
                                if (var$5) {
                                    var$9 = ($rt_nullCheck(var$0.$cm)).data;
                                    var$9 = ($rt_nullCheck(var$9[$rt_checkBounds(var$5, var$9)])).data;
                                    var$10 = $rt_checkUpperBound(3, var$9);
                                    var$9[var$10] = (var$9[var$10] & 65534) << 16 >> 16;
                                }
                            } else if (var$3 == 110) {
                                var$5 = var$0.$Y >> 10 & 1023;
                                if (var$5) {
                                    var$9 = ($rt_nullCheck(var$0.$cm)).data;
                                    var$9 = ($rt_nullCheck(var$9[$rt_checkBounds(var$5, var$9)])).data;
                                    var$5 = $rt_checkUpperBound(3, var$9);
                                    var$9[var$5] = (var$9[var$5] & 65534) << 16 >> 16;
                                }
                            } else if (var$3 == 130) {
                                var$5 = var$0.$Y >> 20 & 1023;
                                if (var$5) {
                                    var$9 = ($rt_nullCheck(var$0.$cm)).data;
                                    var$9 = ($rt_nullCheck(var$9[$rt_checkBounds(var$5, var$9)])).data;
                                    var$5 = $rt_checkUpperBound(3, var$9);
                                    var$9[var$5] = (var$9[var$5] & 65534) << 16 >> 16;
                                }
                                var$0.$cO = var$0.$cO + 1 | 0;
                                var$0.$cK = 0;
                            }
                        }
                        d_byte(var$0, var$1, var$2);
                    }
                    if (var$4) {
                        var$1 = g_j($rt_nullCheck(var$0.$c3));
                        var$2 = g_l($rt_nullCheck(var$0.$c3));
                        d_a9(var$0, (var$0.$aO >> 4) + (var$0.$aP / 2 | 0) | 0, (var$0.$aM >> 4) - (var$0.$a00 / 2 | 0) | 0, var$0.$am, var$0.$ak, var$1, var$2);
                    }
                    var$1 = var$0.$cK;
                    if (var$1 != 20 && var$1 != 12)
                        break a;
                    var$14 = $rt_nullCheck(var$0.$aJ);
                    var$0.$am = var$14.$do7;
                    var$0.$ak = var$14.$if13;
                    break a;
                }
                var$1 = var$0.$b1 + 1 | 0;
                var$0.$b1 = var$1;
                if (var$1 == 35) {
                    var$0.$b1 = 0;
                    var$0.$cK = var$0.$ba;
                }
                return;
            }
            if (var$0.$b1 == 1)
                c_else0();
            var$5 = var$0.$b1 + 1 | 0;
            var$0.$b1 = var$5;
            if (var$5 == 35) {
                d_for(var$0, var$0.$a210);
                var$0.$br = 30;
                var$0.$b1 = 0;
                d_do0(var$0, var$1, var$2);
                var$0.$bf = 0;
                d_for0(var$0, jml_Image_getGraphics($rt_nullCheck(var$0.$aa)));
                var$0.$cK = 10;
            }
            return;
        }
    }
},
d_a3 = (var$0, var$1, var$2, var$3, var$4, var$5, var$6, var$7) => {
    let var$8;
    a: {
        var$8 = $rt_compare(var$1, var$5);
        if (!(var$8 >= 0 && var$1 <= var$6) && !(var$2 >= var$5 && var$2 <= var$6)) {
            if (var$8 > 0)
                break a;
            if (var$2 < var$6)
                break a;
        }
        var$1 = var$3 + var$4 | 0;
        if (var$1 >= var$3) {
            var$2 = var$1;
            var$1 = var$3;
            var$3 = var$2;
        }
        if (var$7 >= var$1 && var$7 <= var$3) {
            if (var$4 > 0)
                return var$7 - var$1 | 0;
            return var$7 - var$3 | 0;
        }
    }
    return var$4;
},
d_l = var$0 => {
    let var$1, var$2, var$3, var$4, var$5, var$6, var$7, var$8, var$9, var$10, var$11;
    var$1 = var$0.$cY;
    var$2 = var$1;
    while (var$2 < (var$1 + var$0.$G | 0)) {
        var$3 = ($rt_nullCheck(var$0.$cm)).data;
        var$4 = $rt_checkBounds(var$2, var$3);
        var$5 = ($rt_nullCheck(var$3[var$4])).data;
        var$2 = var$5[$rt_checkUpperBound(3, var$5)];
        var$6 = var$2 & 6;
        var$7 = $rt_compare(var$6, 2);
        if (!(var$7 && var$6 != 4)) {
            var$8 = (var$2 & 56) >> 3;
            var$9 = var$0.$bT;
            var$8 = $rt_imul(var$8, var$9);
            var$2 = $rt_imul(((var$2 & 192) >> 6) + 1 | 0, var$0.$cl) >> 4;
            var$10 = 0;
            if (var$8) {
                var$2 = ($rt_imul(var$0.$b1, var$2) / 4 | 0) % (var$8 * 2 | 0) | 0;
                if (var$2 > var$8)
                    var$2 = var$8 - (var$2 - var$8 | 0) | 0;
                if (!var$7) {
                    var$5 = var$0.$cG;
                    var$7 = $rt_checkUpperBound(var$4, var$3);
                    var$3 = ($rt_nullCheck(var$3[var$7])).data;
                    var$2 = (var$3[$rt_checkUpperBound(0, var$3)] + var$2 | 0) << 16 >> 16;
                    var$3 = ($rt_nullCheck(var$5)).data;
                    var$4 = $rt_checkUpperBound(var$7, var$3);
                    var$3[var$4] = var$2;
                } else if (var$6 == 4) {
                    var$5 = var$0.$cG;
                    var$7 = $rt_checkUpperBound(var$4, var$3);
                    var$3 = ($rt_nullCheck(var$3[var$7])).data;
                    var$2 = (var$3[$rt_checkUpperBound(0, var$3)] - var$2 | 0) << 16 >> 16;
                    var$3 = ($rt_nullCheck(var$5)).data;
                    var$4 = $rt_checkUpperBound(var$7, var$3);
                    var$3[var$4] = var$2;
                }
            } else {
                var$8 = ($rt_nullCheck(var$0.$bd)).$if8;
                var$11 = $rt_checkUpperBound(var$4, var$3);
                var$5 = ($rt_nullCheck(var$3[var$11])).data;
                var$8 = $rt_imul(var$8 + var$5[$rt_checkUpperBound(2, var$5)] | 0, var$9);
                if (!var$7) {
                    var$2 = $rt_imul(var$0.$b1, var$2) / 4 | 0;
                    var$7 = $rt_checkUpperBound(var$11, var$3);
                    var$5 = ($rt_nullCheck(var$3[var$7])).data;
                    var$2 = var$2 + var$5[$rt_checkUpperBound(0, var$5)] | 0;
                    var$11 = $rt_checkUpperBound(var$7, var$3);
                    var$5 = ($rt_nullCheck(var$3[var$11])).data;
                    var$10 = (var$2 + $rt_imul(var$5[$rt_checkUpperBound(2, var$5)], var$9) | 0) % var$8 | 0;
                } else if (var$6 == 4) {
                    var$11 = $rt_checkUpperBound(var$11, var$3);
                    var$5 = ($rt_nullCheck(var$3[var$11])).data;
                    var$10 = ((var$5[$rt_checkUpperBound(0, var$5)] + var$8 | 0) - (($rt_imul(var$0.$b1, var$2) / 4 | 0) % var$8 | 0) | 0) % var$8 | 0;
                }
                var$6 = $rt_checkUpperBound(var$11, var$3);
                var$3 = ($rt_nullCheck(var$3[var$6])).data;
                var$2 = var$10 - $rt_imul(var$3[$rt_checkUpperBound(2, var$3)], var$9) | 0;
                var$3 = var$0.$cG;
                var$2 = var$2 << 16 >> 16;
                var$3 = ($rt_nullCheck(var$3)).data;
                var$4 = $rt_checkUpperBound(var$6, var$3);
                var$3[var$4] = var$2;
            }
        }
        var$2 = var$4 + 1 | 0;
    }
},
d_j = var$0 => {
    let var$1, var$2;
    var$1 = var$0.$aN;
    if (var$1 != (-1)) {
        var$2 = var$1 + 1 | 0;
        var$0.$aN = var$2;
        if (var$2 > $rt_imul(($rt_nullCheck(var$0.$bd)).$if8, var$0.$bT))
            var$0.$aN = (-1);
    }
},
d_k = var$0 => {
    let var$1, var$2, var$3, var$4, var$5, var$6, var$7, var$8, var$9, var$10, var$11, var$12, var$13, var$14, var$15, var$16, var$17, var$18, var$19, var$20, var$21;
    var$1 = var$0.$ak;
    var$2 = $rt_nullCheck(var$0.$c3);
    var$3 = var$1 + 216 | 0;
    var$4 = var$0.$bZ;
    var$5 = var$0.$cU;
    var$6 = 0;
    var$7 = var$4 << 4;
    var$8 = var$5 << 4;
    while (var$6 < 3) {
        a: {
            var$9 = ($rt_nullCheck(var$0.$by)).data;
            var$10 = $rt_checkBounds(var$6, var$9);
            if (var$9[var$10] != (-1)) {
                var$11 = 0;
                var$12 = var$0.$bH;
                var$1 = var$10 * 2 | 0;
                var$12 = ($rt_nullCheck(var$12)).data;
                var$6 = $rt_checkBounds(var$1, var$12);
                var$13 = var$12[var$6];
                var$14 = var$13 + var$4 | 0;
                var$15 = $rt_checkBounds(var$6 + 1 | 0, var$12);
                var$16 = var$12[var$15];
                var$17 = $rt_checkUpperBound(var$15, var$12);
                if (var$12[var$17] > var$3) {
                    var$10 = $rt_checkUpperBound(var$10, var$9);
                    var$9[var$10] = (-1);
                } else {
                    var$15 = 1;
                    var$1 = var$0.$cY;
                    b: {
                        c: {
                            while (var$1 < (var$0.$cY + var$0.$G | 0)) {
                                var$9 = ($rt_nullCheck(var$0.$cm)).data;
                                var$18 = $rt_checkBounds(var$1, var$9);
                                var$12 = ($rt_nullCheck(var$9[var$18])).data;
                                if (!(var$12[$rt_checkUpperBound(3, var$12)] & 1)) {
                                    var$12 = ($rt_nullCheck(var$0.$cG)).data;
                                    var$19 = $rt_checkUpperBound(var$18, var$12);
                                    var$20 = var$12[var$19];
                                    var$21 = $rt_checkUpperBound(var$19, var$9);
                                    var$12 = ($rt_nullCheck(var$9[var$21])).data;
                                    var$19 = var$12[$rt_checkUpperBound(1, var$12)];
                                    var$1 = var$0.$bT;
                                    var$18 = $rt_checkUpperBound(var$21, var$9);
                                    var$12 = ($rt_nullCheck(var$9[var$18])).data;
                                    if (d_a3(var$0, var$13, var$14, var$16, 2, var$20, var$20 + $rt_imul(var$1, var$12[$rt_checkUpperBound(2, var$12)]) | 0, var$19) < 2)
                                        break c;
                                }
                                var$1 = var$18 + 1 | 0;
                            }
                            break b;
                        }
                        var$11 = 1;
                    }
                    if (f_a($rt_nullCheck(var$0.$I), var$13 << 4, (var$16 - var$5 | 0) << 4, var$7, var$8, 0, 16)) {
                        var$11 = 1;
                        var$15 = ($rt_nullCheck(var$0.$I)).$else2;
                    }
                    d: {
                        e: {
                            var$12 = ($rt_nullCheck(var$0.$by)).data;
                            var$10 = $rt_checkUpperBound(var$10, var$12);
                            switch (var$12[var$10]) {
                                case 0:
                                    break e;
                                case 1:
                                    break d;
                                default:
                            }
                            break a;
                        }
                        if (!var$11) {
                            var$12 = ($rt_nullCheck(var$0.$bH)).data;
                            var$1 = $rt_checkUpperBound(var$17, var$12);
                            var$12[var$1] = (var$12[var$1] + var$15 | 0) << 16 >> 16;
                            break a;
                        }
                        var$1 = $rt_checkUpperBound(var$10, var$12);
                        var$12[var$1] = 1;
                        if (ju_Random_nextInt($rt_nullCheck(var$0.$aD)) % 2 | 0) {
                            var$12 = ($rt_nullCheck(var$0.$c9)).data;
                            var$10 = $rt_checkUpperBound(var$1, var$12);
                            var$12[var$10] = (-1);
                            break a;
                        }
                        var$12 = ($rt_nullCheck(var$0.$c9)).data;
                        var$10 = $rt_checkUpperBound(var$1, var$12);
                        var$12[var$10] = 1;
                        break a;
                    }
                    if (!var$11) {
                        var$10 = $rt_checkUpperBound(var$10, var$12);
                        var$12[var$10] = 0;
                        var$12 = ($rt_nullCheck(var$0.$bH)).data;
                        var$1 = $rt_checkUpperBound(var$17, var$12);
                        var$12[var$1] = (var$12[var$1] + var$15 | 0) << 16 >> 16;
                    } else {
                        var$9 = ($rt_nullCheck(var$0.$bH)).data;
                        var$1 = $rt_checkUpperBound(var$6, var$9);
                        var$6 = var$9[var$1];
                        var$12 = ($rt_nullCheck(var$0.$c9)).data;
                        var$10 = $rt_checkUpperBound(var$10, var$12);
                        var$13 = var$6 + var$12[var$10] | 0;
                        if (var$13 <= 0) {
                            var$13 = 1;
                            var$6 = $rt_checkUpperBound(var$10, var$12);
                            var$11 = ( -var$12[var$6] | 0) << 24 >> 24;
                            var$10 = $rt_checkUpperBound(var$6, var$12);
                            var$12[var$10] = var$11;
                        } else {
                            var$11 = var$13 + var$4 | 0;
                            var$6 = $rt_imul(($rt_nullCheck(var$0.$bd)).$if8, var$0.$bT);
                            if (var$11 >= var$6) {
                                var$13 = (var$6 - var$4 | 0) - 1 | 0;
                                var$6 = $rt_checkUpperBound(var$10, var$12);
                                var$11 = ( -var$12[var$6] | 0) << 24 >> 24;
                                var$10 = $rt_checkUpperBound(var$6, var$12);
                                var$12[var$10] = var$11;
                            }
                        }
                        var$6 = var$13 << 16 >> 16;
                        var$9[$rt_checkUpperBound(var$1, var$9)] = var$6;
                    }
                }
            }
        }
        var$6 = var$10 + 1 | 0;
    }
},
d_try = (var$0, var$1, var$2) => {
    let var$3, var$4, var$5, var$6;
    var$3 = var$0.$by;
    var$4 = var$0.$c00;
    var$3 = ($rt_nullCheck(var$3)).data;
    if (var$3[$rt_checkBounds(var$4, var$3)] == (-1)) {
        if (var$1 != (-1)) {
            var$3 = var$0.$bH;
            var$5 = var$4 * 2 | 0;
            var$1 = var$1 << 16 >> 16;
            var$3 = ($rt_nullCheck(var$3)).data;
            var$3[$rt_checkBounds(var$5, var$3)] = var$1;
        } else {
            var$3 = var$0.$bH;
            var$1 = var$4 * 2 | 0;
            var$5 = ju_Random_nextInt($rt_nullCheck(var$0.$aD));
            var$6 = $rt_nullCheck(var$0.$c3);
            var$5 = (var$5 % ((14 * var$0.$bT | 0) - 8 | 0) | 0) << 16 >> 16;
            var$3 = ($rt_nullCheck(var$3)).data;
            var$3[$rt_checkBounds(var$1, var$3)] = var$5;
            var$3 = var$0.$bH;
            var$1 = var$0.$c00 * 2 | 0;
            var$3 = ($rt_nullCheck(var$3)).data;
            if (var$3[$rt_checkBounds(var$1, var$3)] < 0)
                var$3[$rt_checkBounds(var$1, var$3)] = ( -var$3[$rt_checkBounds(var$1, var$3)] | 0) << 16 >> 16;
            var$4 = $rt_checkBounds(var$1, var$3);
            var$3[var$4] = (var$3[var$4] + var$0.$am | 0) << 16 >> 16;
        }
        var$3 = var$0.$bH;
        var$1 = var$0.$c00;
        var$5 = (var$1 * 2 | 0) + 1 | 0;
        var$2 = var$2 << 16 >> 16;
        var$3 = ($rt_nullCheck(var$3)).data;
        var$3[$rt_checkBounds(var$5, var$3)] = var$2;
        var$3 = ($rt_nullCheck(var$0.$by)).data;
        var$3[$rt_checkBounds(var$1, var$3)] = 0;
        var$1 = var$1 + 1 | 0;
        var$0.$c00 = var$1;
        var$0.$c00 = var$1 % 3 | 0;
    }
},
d_a5 = (var$0, var$1) => {
    let var$2, var$3, var$4, var$5;
    var$2 = $rt_nullCheck(var$0.$c3);
    var$3 = $rt_nullCheck(var$1);
    jml_Graphics_translate(var$3, 0, 0);
    var$4 = var$0.$cK;
    if (var$4 >= 21 && var$4 <= 25)
        d_if0(var$0, var$3);
    else if (var$4 == 10) {
        var$1 = $rt_nullCheck(var$0.$c3);
        jml_Graphics_setClip(var$3, 0, 0, 176, 144);
        var$1 = $rt_nullCheck(var$0.$c3);
        var$4 = ((-176) * (35 - var$0.$b1 | 0) | 0) / 35 | 0;
        jml_Graphics_setColor(var$3, 0, 0, 0);
        var$1 = $rt_nullCheck(var$0.$c3);
        jml_Graphics_fillRect(var$3, var$4 + 176 | 0, 0,  -var$4 | 0, 144);
        jml_Graphics_drawImage(var$3, var$0.$aa, var$4, 0, 20);
    } else if (var$4 != 11)
        d_for0(var$0, var$3);
    else {
        var$1 = $rt_nullCheck(var$0.$c3);
        jml_Graphics_setClip(var$3, 0, 0, 176, 144);
        var$1 = $rt_nullCheck(var$0.$c3);
        var$4 = (176 * var$0.$b1 | 0) / 35 | 0;
        jml_Graphics_setColor(var$3, 0, 0, 0);
        var$1 = $rt_nullCheck(var$0.$c3);
        jml_Graphics_fillRect(var$3, 0, 0, var$4, 144);
        jml_Graphics_drawImage(var$3, var$0.$aa, var$4, 0, 20);
    }
    var$4 = var$0.$cK;
    if (!(var$4 != 20 && var$4 != 12)) {
        var$1 = $rt_nullCheck(var$0.$c3);
        jml_Graphics_setClip(var$3, 0, 0, 176, 144);
        jml_Graphics_setColor(var$3, 0, 0, 0);
        var$1 = $rt_nullCheck(var$0.$c3);
        jml_Graphics_fillRect(var$3, 0, 0, 176, 21);
        var$1 = $rt_nullCheck(var$0.$c3);
        jml_Graphics_fillRect(var$3, 0, 123, 176, 21);
        if (var$0.$cK == 12) {
            if (var$0.$bU <= 7000) {
                var$1 = $rt_nullCheck(var$0.$c3);
                jml_Graphics_setClip(var$3, 0, 0, 176, 144);
                var$1 = var$0.$cW;
                var$2 = $rt_nullCheck(var$0.$c3);
                var$4 = (176 - jml_Image_getWidth($rt_nullCheck(var$1)) | 0) / 2 | 0;
                var$2 = $rt_nullCheck(var$0.$c3);
                jml_Graphics_drawImage(var$3, var$1, var$4, (144 - jml_Image_getHeight($rt_nullCheck(var$0.$cW)) | 0) / 2 | 0, 20);
            } else {
                var$1 = jml_Font_getFont(64, 1, 0);
                var$3.$font = var$1;
                var$2 = $rt_nullCheck(var$0.$c3);
                jml_Graphics_setClip(var$3, 0, 0, 176, 144);
                jml_Graphics_setColor(var$3, 0, 0, 0);
                var$2 = $rt_nullCheck(var$0.$c3);
                jml_Graphics_fillRect(var$3, 0, 0, 176, 144);
                jml_Graphics_setColor(var$3, 255, 255, 255);
                var$2 = $rt_nullCheck(var$0.$c3);
                var$2 = $rt_nullCheck(var$1);
                var$5 = 72 - jml_Font_getHeight(var$2) | 0;
                jml_Graphics_drawString(var$3, GameMIDlet_a(4), 88, var$5, 33);
                var$5 = var$5 + jml_Font_getHeight(var$2) | 0;
                jml_Graphics_drawString(var$3, GameMIDlet_a(5), 88, var$5, 33);
                var$5 = var$5 + jml_Font_getHeight(var$2) | 0;
                jml_Graphics_drawString(var$3, GameMIDlet_a(6), 88, var$5, 33);
                var$5 = var$5 + jml_Font_getHeight(var$2) | 0;
                jml_Graphics_drawString(var$3, GameMIDlet_a(7), 88, var$5, 33);
            }
        }
    }
},
d_do1 = (var$0, var$1) => {
    let var$2, var$3, var$4, var$5;
    var$2 = $rt_nullCheck(var$0.$c3);
    var$3 = (176 / jml_Image_getWidth($rt_nullCheck(var$0.$V)) | 0) + 2 | 0;
    var$4 = ( -(var$0.$b1 / 32 | 0) | 0) % jml_Image_getWidth($rt_nullCheck(var$0.$V)) | 0;
    var$5 = 0;
    while (var$5 < var$3) {
        var$2 = var$0.$V;
        var$1 = $rt_nullCheck(var$1);
        jml_Graphics_drawImage(var$1, var$2, var$4, 0, 20);
        var$4 = var$4 + jml_Image_getWidth($rt_nullCheck(var$0.$V)) | 0;
        var$5 = var$5 + 1 | 0;
    }
    var$2 = $rt_nullCheck(var$0.$c3);
    var$3 = ( -((var$0.$b1 / 25 | 0) + (var$0.$am / 4 | 0) | 0) | 0) % 38 | 0;
    var$4 = 0;
    while (var$4 < 6) {
        var$1 = $rt_nullCheck(var$1);
        jml_Graphics_setClip(var$1, 0, 0, 176, 144);
        jml_Graphics_clipRect(var$1, var$3, 99, 38, 27);
        jml_Graphics_drawImage(var$1, var$0.$ai, var$3, 99, 20);
        var$3 = var$3 + 38 | 0;
        var$4 = var$4 + 1 | 0;
    }
    var$2 = $rt_nullCheck(var$0.$c3);
    var$3 = ( -((var$0.$b1 / 5 | 0) + (var$0.$am / 2 | 0) | 0) | 0) % 45 | 0;
    var$4 = 0;
    while (var$4 < 5) {
        var$1 = $rt_nullCheck(var$1);
        jml_Graphics_setClip(var$1, 0, 0, 176, 144);
        jml_Graphics_clipRect(var$1, var$3, 114, 45, 30);
        jml_Graphics_drawImage(var$1, var$0.$ai, var$3, 87, 20);
        var$3 = var$3 + 45 | 0;
        var$4 = var$4 + 1 | 0;
    }
},
d_for0 = (var$0, var$1) => {
    let var$2, var$3, var$4, var$5, var$6, var$7, var$8, var$9, var$10, var$11, var$12, var$13, var$14, var$15, var$16;
    var$2 = (jml_Canvas_getWidth(var$0) - g_j($rt_nullCheck(var$0.$c3)) | 0) / 2 | 0;
    var$3 = (jml_Canvas_getHeight(var$0) - g_l($rt_nullCheck(var$0.$c3)) | 0) / 2 | 0;
    var$4 = $rt_nullCheck(var$1);
    jml_Graphics_translate(var$4, var$2, var$3);
    var$2 = g_j($rt_nullCheck(var$0.$c3));
    var$3 = g_l($rt_nullCheck(var$0.$c3));
    jml_Graphics_setClip(var$4, 0, 0, var$2, var$3);
    d_do1(var$0, var$4);
    jml_Graphics_setClip(var$4, 0, 0, var$2, var$3);
    var$1 = var$0.$bd;
    var$5 = g_j($rt_nullCheck(var$0.$c3));
    var$6 = g_l($rt_nullCheck(var$0.$c3));
    var$7 = var$0.$am;
    var$8 = var$0.$ak;
    a_a0($rt_nullCheck(var$1), var$4, 0, 0, var$5, var$6, var$7, var$8);
    d_int0(var$0, var$4);
    var$9 = var$0.$cY;
    while (var$9 < (var$0.$cY + var$0.$G | 0)) {
        var$10 = ($rt_nullCheck(var$0.$cG)).data;
        var$5 = $rt_checkBounds(var$9, var$10);
        var$11 = var$10[var$5] - var$0.$am | 0;
        var$10 = ($rt_nullCheck(var$0.$cm)).data;
        var$5 = $rt_checkUpperBound(var$5, var$10);
        var$12 = ($rt_nullCheck(var$10[var$5])).data;
        var$9 = var$12[$rt_checkUpperBound(1, var$12)] - var$0.$ak | 0;
        var$13 = $rt_checkUpperBound(var$5, var$10);
        var$10 = ($rt_nullCheck(var$10[var$13])).data;
        if (!(var$10[$rt_checkUpperBound(3, var$10)] & 1)) {
            var$14 = var$9 + (-4) | 0;
            var$9 = ((var$0.$b1 + (var$13 * 3 | 0) | 0) / 32 | 0) % 4 | 0;
            var$15 = jml_Image_getWidth($rt_nullCheck(var$0.$bE));
            var$5 = 0;
            while (true) {
                var$10 = ($rt_nullCheck(var$0.$cm)).data;
                var$13 = $rt_checkUpperBound(var$13, var$10);
                var$10 = ($rt_nullCheck(var$10[var$13])).data;
                if (var$5 >= var$10[$rt_checkUpperBound(2, var$10)])
                    break;
                var$6 = 0;
                if (var$0.$aQ == var$13) {
                    var$7 = (((var$0.$aO >> 4) - var$0.$am | 0) + (var$0.$aP / 2 | 0) | 0) - var$11 | 0;
                    if (var$7 <= var$0.$bT && var$7 >= 0)
                        var$6 = 2;
                }
                jml_Graphics_setClip(var$4, 0, 0, var$2, var$3);
                var$7 = var$14 + (var$9 / 2 | 0) | 0;
                jml_Graphics_clipRect(var$4, var$11, var$7 + var$6 | 0, var$0.$bT, var$0.$b6);
                var$8 = (-13) * var$0.$bT | 0;
                var$16 = var$8 % var$15 | 0;
                var$8 = $rt_imul(var$8 / var$15 | 0, var$0.$b6);
                jml_Graphics_drawImage(var$4, var$0.$bE, var$11 + var$16 | 0, (var$7 + var$8 | 0) + var$6 | 0, 20);
                var$9 = (var$9 + 1 | 0) % 4 | 0;
                var$11 = var$11 + var$0.$bT | 0;
                var$5 = var$5 + 1 | 0;
            }
        }
        jml_Graphics_setClip(var$4, 0, 0, var$2, var$3);
        var$9 = var$13 + 1 | 0;
    }
    var$9 = jml_Image_getWidth($rt_nullCheck(var$0.$bP)) / 2 | 0;
    var$15 = jml_Image_getHeight($rt_nullCheck(var$0.$bP));
    var$5 = 0;
    while (true) {
        var$10 = ($rt_nullCheck(var$0.$c10)).data;
        if (var$5 >= var$10.length)
            break;
        var$7 = $rt_checkBounds(var$5, var$10);
        if (var$10[var$7] != (-1)) {
            var$7 = $rt_checkUpperBound(var$7, var$10);
            var$5 = var$10[var$7] - var$0.$am | 0;
            var$8 = var$10[$rt_checkBounds(var$7 + 1 | 0, var$10)] - var$0.$ak | 0;
            jml_Graphics_setClip(var$4, 0, 0, var$2, var$3);
            jml_Graphics_clipRect(var$4, var$5, var$8 - var$15 | 0, var$9, var$15);
            var$16 = var$0.$b1;
            var$10 = var$0.$a90;
            var$6 = var$7 / 2 | 0;
            var$10 = ($rt_nullCheck(var$10)).data;
            var$6 = $rt_imul(((var$16 - var$10[$rt_checkBounds(var$6, var$10)] | 0) / 3 | 0) % 2 | 0, var$9);
            jml_Graphics_drawImage(var$4, var$0.$bP, var$5 - var$6 | 0, var$8, 36);
        }
        var$5 = var$7 + 2 | 0;
    }
    if (var$0.$cK == 3) {
        var$9 = g_for($rt_nullCheck(var$0.$c3));
        var$15 = g_goto($rt_nullCheck(var$0.$c3));
        jml_Graphics_setClip(var$4, var$9, var$15, jml_Image_getWidth($rt_nullCheck(var$0.$X)), jml_Image_getHeight($rt_nullCheck(var$0.$X)) / 2 | 0);
        if (var$0.$a80)
            var$15 = var$15 - (jml_Image_getHeight($rt_nullCheck(var$0.$X)) / 2 | 0) | 0;
        jml_Graphics_drawImage(var$4, var$0.$X, var$9, var$15, 20);
    }
    if (var$0.$cK != 7 && var$0.$c2 >= 0) {
        jml_Graphics_setClip(var$4, 0, 0, var$2, var$3);
        var$9 = g_k($rt_nullCheck(var$0.$c3));
        var$15 = g_do($rt_nullCheck(var$0.$c3));
        var$5 = 0;
        while (var$5 < var$0.$a80) {
            jml_Graphics_setClip(var$4, var$9, var$15, var$0.$bT, var$0.$b6);
            var$1 = var$0.$bE;
            jml_Graphics_drawImage(var$4, var$1, var$9 - ((24 * var$0.$bT | 0) % jml_Image_getWidth($rt_nullCheck(var$1)) | 0) | 0, var$15 - $rt_imul((24 * var$0.$bT | 0) / jml_Image_getWidth($rt_nullCheck(var$0.$bE)) | 0, var$0.$b6) | 0, 20);
            var$9 = var$9 - var$0.$bT | 0;
            var$5 = var$5 + 1 | 0;
        }
        if (var$0.$c2 != 2) {
            jml_Graphics_setClip(var$4, 0, 0, var$2, var$3);
            var$3 = g_else($rt_nullCheck(var$0.$c3));
            var$9 = g_void($rt_nullCheck(var$0.$c3));
            var$15 = var$0.$c7 - var$0.$a110 | 0;
            if (var$15 < 0)
                var$15 = 0;
            d_a1(var$0, var$4, var$3, var$9, var$0.$aA, g_char($rt_nullCheck(var$0.$c3)), 4, var$15, 1);
        } else {
            var$9 = var$0.$cQ;
            if (var$9 >= 60000) {
                var$15 = var$9 - 60000 | 0;
                if (var$15 > 3500 && var$15 < 5000)
                    e_a($rt_nullCheck(var$0.$aJ), var$4, GameMIDlet_a(1));
                else if (var$15 > 2000 && var$15 < 3400)
                    e_a($rt_nullCheck(var$0.$aJ), var$4, GameMIDlet_a(2));
                else if (var$15 > 0 && var$15 < 1900 && !((var$9 / 200 | 0) % 2 | 0))
                    e_a($rt_nullCheck(var$0.$aJ), var$4, GameMIDlet_a(3));
            }
            var$9 = var$0.$cQ;
            if (!(var$9 >= 60000 && ((var$9 / 500 | 0) % 2 | 0))) {
                jml_Graphics_setClip(var$4, 0, 0, var$2, var$3);
                var$9 = g_else($rt_nullCheck(var$0.$c3));
                var$15 = g_void($rt_nullCheck(var$0.$c3)) - 2 | 0;
                jml_Graphics_setClip(var$4, var$9, var$15, var$0.$bT, var$0.$b6);
                var$1 = var$0.$bE;
                jml_Graphics_drawImage(var$4, var$1, var$9 - ((21 * var$0.$bT | 0) % jml_Image_getWidth($rt_nullCheck(var$1)) | 0) | 0, var$15 - $rt_imul((12 * var$0.$bT | 0) / jml_Image_getWidth($rt_nullCheck(var$0.$bE)) | 0, var$0.$b6) | 0, 20);
                var$5 = var$0.$b6;
                jml_Graphics_setClip(var$4, var$9, var$15 - var$5 | 0, var$0.$bT, var$5);
                var$1 = var$0.$bE;
                var$5 = var$9 - ((12 * var$0.$bT | 0) % jml_Image_getWidth($rt_nullCheck(var$1)) | 0) | 0;
                var$6 = (21 * var$0.$bT | 0) / jml_Image_getWidth($rt_nullCheck(var$0.$bE)) | 0;
                var$7 = var$0.$b6;
                jml_Graphics_drawImage(var$4, var$1, var$5, (var$15 - $rt_imul(var$6, var$7) | 0) - var$7 | 0, 20);
                d_a1(var$0, var$4, (var$9 + var$0.$bT | 0) + 3 | 0, var$15 + ((var$0.$b6 - jml_Image_getHeight($rt_nullCheck(var$0.$aA)) | 0) / 2 | 0) | 0, var$0.$aA, g_char($rt_nullCheck(var$0.$c3)), 1, ($rt_nullCheck(var$0.$bi)).data.length - var$0.$a40 | 0, 0);
            }
            var$9 = var$0.$cQ;
            if (!(var$9 <= 10000 && ((var$0.$b1 / 15 | 0) % 2 | 0))) {
                var$9 = var$9 / 1000 | 0;
                if (var$9 > 60)
                    var$9 = 60;
                jml_Graphics_setClip(var$4, 0, 0, var$2, var$3);
                d_a1(var$0, var$4, g_null($rt_nullCheck(var$0.$c3)), g_c($rt_nullCheck(var$0.$c3)), var$0.$y, g_i($rt_nullCheck(var$0.$c3)), 2, var$9, 0);
            }
        }
    }
    if (var$0.$cK == 20)
        e_a1($rt_nullCheck(var$0.$aJ), var$4);
    if (var$0.$W != (-1) && var$0.$bf > 0)
        e_a($rt_nullCheck(var$0.$aJ), var$4, GameMIDlet_a(0));
    if (var$0.$bn > 0)
        e_a($rt_nullCheck(var$0.$aJ), var$4, GameMIDlet_a(12));
},
d_int0 = (var$0, var$1) => {
    let var$2, var$3, var$4, var$5, var$6, var$7, var$8, var$9, var$10;
    var$2 = $rt_nullCheck(var$0.$c3);
    var$3 = var$0.$cK;
    if (!(var$3 != 4 && var$3 != 5 && var$3 != 6)) {
        var$3 = var$0.$ao - var$0.$am | 0;
        var$4 = var$0.$an - var$0.$ak | 0;
        var$5 = jml_Image_getHeight($rt_nullCheck(var$0.$b4));
        var$1 = $rt_nullCheck(var$1);
        jml_Graphics_setClip(var$1, 0, 0, 176, 144);
        jml_Graphics_clipRect(var$1, var$3, var$4 - var$5 | 0, 31, var$5);
        var$6 = var$3 - (80 + (31 * var$0.$T | 0) | 0) | 0;
        jml_Graphics_drawImage(var$1, var$0.$b4, var$6, var$4, 36);
    }
    var$6 = var$0.$aN;
    if (var$6 != (-1)) {
        var$6 = var$6 - var$0.$am | 0;
        var$3 = var$0.$aK - var$0.$ak | 0;
        var$4 = var$0.$bZ;
        var$5 = var$0.$cU;
        var$1 = $rt_nullCheck(var$1);
        jml_Graphics_setClip(var$1, 0, 0, 176, 144);
        jml_Graphics_clipRect(var$1, var$6, var$3 - var$5 | 0, var$4, var$5);
        var$6 = var$6 + $rt_imul( -var$4 | 0, 1 + ((var$0.$b1 / 6 | 0) % 2 | 0) | 0) | 0;
        jml_Graphics_drawImage(var$1, var$0.$K, var$6, var$3, 36);
    }
    var$6 = var$0.$bZ;
    var$7 = var$0.$cU;
    var$3 = 0;
    while (var$3 < 3) {
        var$8 = ($rt_nullCheck(var$0.$by)).data;
        var$9 = $rt_checkBounds(var$3, var$8);
        if (var$8[var$9] != (-1)) {
            var$8 = var$0.$bH;
            var$3 = var$9 * 2 | 0;
            var$8 = ($rt_nullCheck(var$8)).data;
            var$3 = $rt_checkBounds(var$3, var$8);
            var$10 = var$8[var$3] - var$0.$am | 0;
            var$3 = var$8[$rt_checkBounds(var$3 + 1 | 0, var$8)] - var$0.$ak | 0;
            var$1 = $rt_nullCheck(var$1);
            jml_Graphics_setClip(var$1, 0, 0, 176, 144);
            jml_Graphics_clipRect(var$1, var$10, var$3 - var$7 | 0, var$6, var$7);
            var$4 = var$10 - $rt_imul(var$6, 3 + ((var$0.$b1 / 2 | 0) % 2 | 0) | 0) | 0;
            jml_Graphics_drawImage(var$1, var$0.$K, var$4, var$3, 36);
        }
        var$3 = var$9 + 1 | 0;
    }
    if (var$0.$cK != 3) {
        var$6 = (var$0.$aO >> 4) - var$0.$am | 0;
        var$3 = ((var$0.$aM >> 4) - var$0.$ak | 0) + 1 | 0;
        var$4 = jml_Image_getHeight($rt_nullCheck(var$0.$aR));
        var$1 = $rt_nullCheck(var$1);
        jml_Graphics_setClip(var$1, 0, 0, 176, 144);
        jml_Graphics_clipRect(var$1, var$6, var$3 - var$4 | 0, var$0.$aP, var$4);
        var$6 = var$6 - $rt_imul(var$0.$aP, var$0.$cv) | 0;
        jml_Graphics_drawImage(var$1, var$0.$aR, var$6, var$3, 36);
    }
    if (var$0.$cK == 20)
        e_if0($rt_nullCheck(var$0.$aJ), var$1);
},
d_a1 = (var$0, var$1, var$2, var$3, var$4, var$5, var$6, var$7, var$8) => {
    let var$9, var$10, var$11, var$12;
    var$9 = var$6 - 1 | 0;
    var$2 = var$2 + $rt_imul(var$9, var$5) | 0;
    var$10 = 0;
    a: {
        while (true) {
            if (var$10 >= var$6)
                break a;
            var$11 = var$7 % 10 | 0;
            var$7 = var$7 / 10 | 0;
            if (var$10 == var$9 && var$8)
                var$11 = 10;
            var$12 = $rt_nullCheck(var$0.$c3);
            var$1 = $rt_nullCheck(var$1);
            jml_Graphics_setClip(var$1, 0, 0, 176, 144);
            var$4 = $rt_nullCheck(var$4);
            jml_Graphics_clipRect(var$1, var$2, var$3, var$5, jml_Image_getHeight(var$4));
            jml_Graphics_drawImage(var$1, var$4, var$2 - $rt_imul(var$11, var$5) | 0, var$3, 20);
            var$2 = var$2 - var$5 | 0;
            if (!var$8 && !var$7)
                break;
            var$10 = var$10 + 1 | 0;
        }
    }
},
d_e = var$0 => {
    return var$0.$as;
},
d_a7 = (var$0, var$1) => {
    let var$2, var$3, var$4, var$5, var$6, var$7, var$8, var$9, var$10, var$11, var$12, var$13, var$14;
    var$2 = var$0.$bd;
    var$3 = var$0.$bE;
    var$4 = var$0.$bT;
    var$5 = var$0.$b6;
    var$6 = $rt_nullCheck(var$0.$c3);
    var$2 = $rt_nullCheck(var$2);
    var$2.$for5 = var$3;
    var$2.$try2 = var$4;
    var$2.$a28 = var$5;
    var$2.$byte5 = 14;
    var$2.$goto4 = 12;
    var$1 = $rt_nullCheck(var$1);
    ji_DataInputStream_readByte(var$1);
    var$3 = $rt_nullCheck(var$1);
    ji_FilterInputStream_skip(var$3, Long_ZERO);
    ji_FilterInputStream_skip(var$3, Long_fromInt(((ji_DataInputStream_readInt(var$1) - 0 | 0) - 1 | 0) - 4 | 0));
    var$2.$if8 = ji_DataInputStream_readShort(var$1);
    var$2.$char2 = ji_DataInputStream_readShort(var$1);
    var$5 = ji_DataInputStream_readByte(var$1);
    var$7 = var$2.$long0;
    if (!(var$7 !== null && var$7.data.length == $rt_imul(var$2.$if8, var$2.$char2)))
        var$2.$long0 = $rt_createByteArray($rt_imul(var$2.$if8, var$2.$char2));
    var$8 = 8;
    var$9 = 4;
    var$10 = 15;
    if (var$5 == 8) {
        var$8 = 4;
        var$9 = 8;
        var$10 = 255;
    }
    var$11 = 0;
    a: while (var$11 < $rt_imul(var$2.$if8, var$2.$char2)) {
        var$4 = ji_DataInputStream_readInt(var$1);
        var$5 = 0;
        b: {
            while (var$5 < var$8) {
                var$7 = ($rt_nullCheck(var$2.$long0)).data;
                if (var$11 >= var$7.length)
                    break b;
                var$5 = var$5 + 1 | 0;
                var$12 = (var$4 >> (32 - $rt_imul(var$5, var$9) | 0) & var$10) << 24 >> 24;
                var$13 = $rt_checkBounds(var$11, var$7);
                var$7[var$13] = var$12;
                var$11 = var$13 + 1 | 0;
            }
            continue a;
        }
    }
    var$1 = var$0.$I;
    var$2 = $rt_nullCheck(var$0.$bd);
    var$14 = var$2.$long0;
    var$12 = var$2.$if8;
    var$13 = var$2.$char2;
    var$4 = var$0.$bT;
    var$5 = var$0.$b6;
    var$7 = var$0.$M;
    var$2 = $rt_nullCheck(var$1);
    var$2.$new4 = var$14;
    var$2.$if12 = var$12;
    var$2.$byte6 = var$13;
    var$2.$char4 = var$4;
    var$2.$void2 = var$5;
    var$2.$null2 = var$7;
    var$0.$bG = 0;
    var$0.$bx = 0;
    var$1 = $rt_nullCheck(var$0.$c3);
    var$0.$bV = 86;
    var$0.$bN = 86;
    var$0.$cd = 86;
    var$0.$bY = 70;
    var$4 = $rt_imul(var$12, var$4) - 176 | 0;
    var$0.$cD = var$4;
    if (var$4 < 0)
        var$0.$cD = 0;
    var$2.$a32 = 4;
    var$2.$long2 = (-16);
},
d_for = (var$0, var$1) => {
    let var$2, var$3, var$4, var$5, var$6, var$7, var$8;
    var$2 = 1;
    if (var$1 < 0) {
        var$2 = 0;
        var$0.$b3 = 0;
        var$0.$cz = ($rt_imul(a_if0($rt_nullCheck(var$0.$bd)), var$0.$b6) - g_l($rt_nullCheck(var$0.$c3)) | 0) - 1 | 0;
        var$0.$c2 = var$1 << 24 >> 24;
        var$0.$cK = 20;
        if (var$1 == (-1))
            c_new0();
        else if (var$1 == (-2))
            c_a1();
    } else if (!var$1) {
        var$0.$b3 = 0;
        var$0.$cz = ($rt_imul(var$0.$P, var$0.$b6) - g_l($rt_nullCheck(var$0.$c3)) | 0) - 1 | 0;
        var$0.$aO = var$0.$w;
        var$0.$aM = var$0.$v;
        var$1 = var$0.$aB;
        if (var$1 != (-1)) {
            var$0.$aO = var$1;
            var$0.$aM = var$0.$az;
            var$0.$aB = (-1);
            var$0.$az = (-1);
        }
        var$0.$c2 = 0;
    } else if (var$1 != 1) {
        if (var$1 == 2)
            var$0.$b3 = $rt_imul(var$0.$ab, var$0.$b6);
        else {
            var$3 = var$0.$bK;
            var$4 = var$1 - 3 | 0;
            var$3 = ($rt_nullCheck(var$3)).data;
            var$0.$b3 = $rt_imul(var$3[$rt_checkBounds(var$4, var$3)], var$0.$b6);
        }
        var$3 = var$0.$bK;
        var$1 = var$1 - 2 | 0;
        var$3 = ($rt_nullCheck(var$3)).data;
        var$5 = $rt_checkBounds(var$1, var$3);
        var$0.$cz = ($rt_imul(var$3[var$5], var$0.$b6) - g_l($rt_nullCheck(var$0.$c3)) | 0) - 1 | 0;
        var$0.$aB = var$0.$aO;
        var$0.$az = var$0.$aM;
        var$3 = ($rt_nullCheck(var$0.$bF)).data;
        var$4 = $rt_checkUpperBound(var$5, var$3);
        var$0.$aO = var$3[var$4];
        var$3 = ($rt_nullCheck(var$0.$bD)).data;
        var$0.$aM = var$3[$rt_checkUpperBound(var$4, var$3)];
        var$0.$c2 = 1;
    } else {
        var$1 = var$0.$P;
        var$4 = var$0.$b6;
        var$0.$b3 = $rt_imul(var$1, var$4);
        var$0.$cz = ($rt_imul(var$0.$ab, var$4) - g_l($rt_nullCheck(var$0.$c3)) | 0) - 1 | 0;
        var$0.$aO = var$0.$B;
        var$0.$aM = var$0.$z;
        var$0.$cQ = 67000;
        var$0.$ao = var$0.$aZ;
        var$0.$an = var$0.$aX;
        var$3 = a_for($rt_nullCheck(var$0.$bd));
        var$1 = a_do($rt_nullCheck(var$0.$bd));
        var$4 = 0;
        while (var$4 < var$0.$H) {
            var$6 = ($rt_nullCheck(var$0.$b8)).data;
            if (var$4 >= var$6.length)
                break;
            var$7 = $rt_checkBounds(var$4, var$6);
            var$4 = var$6[var$7];
            var$3 = $rt_nullCheck(var$3);
            var$6 = var$3.data;
            var$8 = $rt_checkBounds(var$4, var$6);
            var$6[var$8] = 23;
            var$6[$rt_checkBounds(var$8 + 1 | 0, var$6)] = 23;
            var$4 = var$7 + 1 | 0;
        }
        var$4 = 1;
        while (true) {
            var$6 = ($rt_nullCheck(var$0.$bi)).data;
            if (var$4 >= var$6.length)
                break;
            var$7 = $rt_checkBounds(var$4, var$6);
            var$4 = var$6[var$7];
            var$3 = $rt_nullCheck(var$3);
            var$6 = var$3.data;
            var$4 = $rt_checkBounds(var$4, var$6);
            var$6[var$4] = 0;
            var$6[$rt_checkBounds(var$4 - var$1 | 0, var$6)] = 0;
            var$4 = var$7 + 1 | 0;
        }
        var$0.$a40 = 0;
        var$1 = 0;
        while (true) {
            var$3 = ($rt_nullCheck(var$0.$by)).data;
            if (var$1 >= var$3.length)
                break;
            var$1 = $rt_checkBounds(var$1, var$3);
            var$3[var$1] = (-1);
            var$1 = var$1 + 1 | 0;
        }
        var$0.$cK = 6;
        var$0.$c2 = 2;
        c_try();
    }
    if (var$2) {
        var$0.$am = ((var$0.$aO >> 4) + (var$0.$aP / 2 | 0) | 0) - var$0.$bV | 0;
        var$0.$ak = (var$0.$aM >> 4) - (jml_Canvas_getHeight(var$0) / 2 | 0) | 0;
    }
    if (var$0.$am < 0)
        var$0.$am = 0;
    var$1 = var$0.$am;
    var$2 = var$0.$cD;
    if (var$1 > var$2)
        var$0.$am = var$2;
    var$1 = var$0.$ak;
    var$2 = var$0.$b3;
    if (var$1 < var$2)
        var$0.$ak = var$2;
    var$1 = var$0.$ak;
    var$2 = var$0.$cz;
    if (var$1 > var$2)
        var$0.$ak = var$2;
    var$1 = 0;
    while (true) {
        var$3 = ($rt_nullCheck(var$0.$bH)).data;
        if (var$1 >= var$3.length)
            break;
        var$6 = ($rt_nullCheck(var$0.$c10)).data;
        var$4 = $rt_checkBounds(var$1, var$6);
        var$6[var$4] = (-1);
        var$2 = $rt_checkUpperBound(var$4, var$3);
        var$3[var$2] = (-1);
        var$1 = var$2 + 1 | 0;
    }
    var$1 = 0;
    while (true) {
        var$3 = ($rt_nullCheck(var$0.$c9)).data;
        if (var$1 >= var$3.length)
            break;
        var$1 = $rt_checkBounds(var$1, var$3);
        var$3[var$1] = 0;
        var$3 = ($rt_nullCheck(var$0.$by)).data;
        var$1 = $rt_checkUpperBound(var$1, var$3);
        var$3[var$1] = (-1);
        var$1 = var$1 + 1 | 0;
    }
},
d_b = var$0 => {
    let var$1, var$2, var$3;
    var$1 = new jml_List;
    var$2 = GameMIDlet_a(15);
    jml_List_$callClinit();
    jml_Displayable__init_(var$1);
    var$1.$items0 = ju_ArrayList__init_();
    var$1.$title = var$2;
    var$0.$x = var$1;
    jml_List_append(var$1, GameMIDlet_a(13), null);
    var$1 = var$0.$x;
    var$2 = GameMIDlet_a(14);
    var$3 = null;
    jml_List_append($rt_nullCheck(var$1), var$2, var$3);
    var$1 = var$0.$x;
    j_$callClinit();
    var$2 = j_case;
    jml_Displayable_addCommand($rt_nullCheck(var$1), var$2);
    ($rt_nullCheck(var$0.$x)).$listener = var$0;
},
d_commandAction = (var$0, var$1, var$2) => {
    let var$3;
    a: {
        b: {
            jml_List_$callClinit();
            if (var$1 === jml_List_SELECT_COMMAND) {
                var$3 = var$0.$x;
                if (var$2 === var$3)
                    break b;
            }
            j_$callClinit();
            if (var$1 !== j_case)
                break a;
            var$0.$bW = 1;
            break a;
        }
        if (($rt_nullCheck(var$3)).$selected)
            var$0.$ci = 2;
        else
            var$0.$ci = 1;
        jml_Display_setCurrent($rt_nullCheck(jml_Display_getDisplay(var$0.$goto1)), var$0);
    }
},
d_i = var$0 => {
    let var$1, var$2, var$3, var$4, var$5, var$6, var$7, $$je;
    var$0.$a60 = 0;
    var$0.$ci = 0;
    var$0.$t = 0;
    a: {
        b: {
            try {
                var$0.$Z = jml_Image_createImage($rt_s(41));
                var$0.$cg = jml_Image_createImage($rt_s(42));
                var$0.$cj = jml_Image_createImage($rt_s(43));
                var$0.$X = jml_Image_createImage($rt_s(37));
                break a;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_Exception) {
                    var$1 = $$je;
                    break b;
                } else {
                    throw $$e;
                }
            }
        }
        jl_Throwable_printStackTrace(var$1);
    }
    var$1 = $rt_nullCheck(var$0.$c3);
    var$0.$ay = jml_Image_createImage0(5, 144);
    var$1 = $rt_nullCheck(var$0.$c3);
    var$0.$ax = jml_Image_createImage0(5, 144);
    var$1 = $rt_nullCheck(var$0.$c3);
    var$2 = 0;
    var$1 = jml_Image_getGraphics($rt_nullCheck(var$0.$ay));
    while (var$2 < jml_Image_getHeight($rt_nullCheck(var$0.$ay))) {
        var$3 = $rt_nullCheck(var$0.$c3);
        var$1 = $rt_nullCheck(var$1);
        jml_Graphics_setClip(var$1, 0, var$2, 5, 8);
        jml_Graphics_drawImage(var$1, var$0.$cg, (-22), var$2, 20);
        var$3 = $rt_nullCheck(var$0.$c3);
        var$2 = var$2 + 8 | 0;
    }
    var$1 = $rt_nullCheck(var$0.$c3);
    var$2 = 0;
    var$1 = jml_Image_getGraphics($rt_nullCheck(var$0.$ax));
    while (var$2 < jml_Image_getHeight($rt_nullCheck(var$0.$ax))) {
        var$3 = $rt_nullCheck(var$0.$c3);
        var$1 = $rt_nullCheck(var$1);
        jml_Graphics_setClip(var$1, 0, var$2, 5, 8);
        jml_Graphics_drawImage(var$1, var$0.$cg, (-27), var$2, 20);
        var$3 = $rt_nullCheck(var$0.$c3);
        var$2 = var$2 + 8 | 0;
    }
    var$0.$bX = 1;
    var$0.$cJ = 0;
    var$0.$cH = 0;
    var$0.$cq = 1;
    var$0.$aU = (-1);
    var$0.$aT = (-1);
    var$0.$an = 0;
    var$0.$aM = 0;
    var$0.$bU = 0;
    var$0.$cv = 3;
    var$0.$cB = $rt_createByteArray(20);
    var$0.$bC = $rt_createByteArray(20);
    var$0.$R = $rt_createByteArray(40);
    var$0.$ad = 0;
    var$0.$u = 0;
    var$1 = $rt_nullCheck(var$0.$c3);
    var$0.$c6 = 72;
    var$0.$bg = 72;
    var$0.$cp = 72;
    var$0.$al = 72;
    var$0.$aC = 0;
    var$4 = $rt_createIntArray(28);
    var$5 = var$4.data;
    var$0.$bB = var$4;
    var$5[$rt_checkUpperBound(0, var$5)] = 0;
    var$5[$rt_checkUpperBound(1, var$5)] = 0;
    var$5[$rt_checkUpperBound(2, var$5)] = 4;
    var$5[$rt_checkUpperBound(3, var$5)] = 0;
    var$5[$rt_checkUpperBound(4, var$5)] = 0;
    var$5[$rt_checkUpperBound(5, var$5)] = 3;
    var$5[$rt_checkUpperBound(6, var$5)] = 4;
    var$5[$rt_checkUpperBound(7, var$5)] = 3;
    var$2 = 8;
    var$6 = 1;
    while (var$6 < 3) {
        var$7 = $rt_checkBounds(var$2 + (var$6 * 4 | 0) | 0, var$5);
        var$5[var$7] = var$6;
        var$5[$rt_checkBounds(var$7 + 1 | 0, var$5)] = 0;
        var$5[$rt_checkBounds(var$7 + 2 | 0, var$5)] = var$6;
        var$5[$rt_checkBounds(var$7 + 3 | 0, var$5)] = 3;
        var$2 = var$2 + 4 | 0;
        var$6 = var$6 + 1 | 0;
    }
    var$6 = 1;
    while (var$6 < 2) {
        var$7 = $rt_checkBounds(var$2 + (var$6 * 4 | 0) | 0, var$5);
        var$5[var$7] = 0;
        var$5[$rt_checkBounds(var$7 + 1 | 0, var$5)] = var$6;
        var$5[$rt_checkBounds(var$7 + 2 | 0, var$5)] = 4;
        var$5[$rt_checkBounds(var$7 + 3 | 0, var$5)] = var$6;
        var$2 = var$2 + 4 | 0;
        var$6 = var$6 + 1 | 0;
    }
},
d_int = (var$0, var$1, var$2) => {
    let var$3, var$4;
    a: {
        switch (var$0.$cK) {
            case 22:
                break;
            default:
                break a;
        }
        if (!var$0.$aC) {
            if (!(var$1 != 50 && var$2 != 1 && var$1 != 49 && var$1 != 51)) {
                var$3 = var$0.$cH;
                if (var$3 > 0)
                    var$0.$cH = var$3 - 1 | 0;
            }
            if (!(var$1 != 56 && var$2 != 6 && var$1 != 55 && var$1 != 57)) {
                var$4 = var$0.$cH;
                if (var$4 < 3)
                    var$0.$cH = var$4 + 1 | 0;
            }
            if (!(var$1 != 52 && var$2 != 2 && var$1 != 49 && var$1 != 55)) {
                var$4 = var$0.$cJ;
                if (var$4 > 0)
                    var$0.$cJ = var$4 - 1 | 0;
            }
            if (!(var$1 != 54 && var$2 != 5 && var$1 != 51 && var$1 != 57)) {
                var$4 = var$0.$cJ;
                if (var$4 < 4)
                    var$0.$cJ = var$4 + 1 | 0;
            }
            if (!(var$1 != 53 && var$2 != 8)) {
                d_m(var$0);
                if (var$0.$cq) {
                    var$0.$aU = var$0.$cJ;
                    var$0.$aT = var$0.$cH;
                }
            }
        } else
            return;
    }
},
d_m = var$0 => {
    let var$1, var$2, var$3;
    a: {
        b: {
            c: {
                var$1 = var$0.$cJ + (var$0.$cH * 5 | 0) | 0;
                var$2 = ($rt_nullCheck(var$0.$cB)).data;
                var$3 = $rt_checkBounds(var$1, var$2);
                if (var$2[var$3]) {
                    var$1 = var$0.$t;
                    if (!var$1) {
                        var$3 = $rt_checkUpperBound(var$3, var$2);
                        if (!(var$2[var$3] & 8))
                            break c;
                    }
                    if (var$1 != 1)
                        break b;
                    if (!(var$2[$rt_checkUpperBound(var$3, var$2)] & 8))
                        break b;
                }
            }
            var$1 = 1;
            break a;
        }
        var$1 = 0;
    }
    var$0.$cq = var$1;
},
d_char = (var$0, var$1, var$2) => {
    let var$3, var$4, var$5, var$6, var$7, $$je;
    a: {
        var$3 = var$0.$ci;
        if (var$3 == 1) {
            jml_Display_setCurrent($rt_nullCheck(jml_Display_getDisplay(var$0.$goto1)), var$0);
            d_c(var$0);
            var$0.$cS = 0;
            e_a0($rt_nullCheck(var$0.$aJ), $rt_s(35));
            d_for(var$0, (-1));
            var$0.$ci = 0;
        } else if (var$3 == 2) {
            jml_Display_setCurrent($rt_nullCheck(jml_Display_getDisplay(var$0.$goto1)), var$0);
            d_i(var$0);
            var$0.$cK = 22;
            var$0.$ci = 0;
        } else if (var$0.$cK == 21) {
            var$4 = $rt_nullCheck(jml_Display_getDisplay(var$0.$goto1));
            var$5 = var$4.$current;
            var$6 = var$0.$x;
            if (var$5 !== var$6)
                jml_Display_setCurrent(var$4, var$6);
            b: {
                try {
                    break a;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    if ($$je instanceof jl_Exception) {
                        break b;
                    } else {
                        throw $$e;
                    }
                }
            }
        } else {
            var$2 = var$0.$b1 + 1 | 0;
            var$0.$b1 = var$2;
            if (!(var$2 % 2 | 0))
                d_h(var$0);
            var$2 = var$0.$aC;
            if (var$2) {
                var$1 = var$0.$bU + var$1 | 0;
                var$0.$bU = var$1;
                if (var$1 > 5000) {
                    var$0.$as = 0;
                    var$0.$bW = 1;
                }
            }
            c: {
                d: {
                    e: {
                        switch (var$0.$cK) {
                            case 22:
                                break e;
                            case 23:
                                break c;
                            case 24:
                                break;
                            case 25:
                                break d;
                            default:
                                break a;
                        }
                        if (var$2)
                            break a;
                        d_null(var$0);
                        var$0.$p = 0;
                        var$0.$cK = 25;
                        break a;
                    }
                    d_m(var$0);
                    var$1 = var$0.$aU;
                    if (var$1 == (-1))
                        break a;
                    d_a(var$0, var$0.$cB, var$1, var$0.$aT, var$0.$t);
                    if (!d_if(var$0, var$0.$cB, var$0.$aU, var$0.$aT, var$0.$t))
                        d_g(var$0);
                    else {
                        var$0.$bw = var$0.$aU + (var$0.$aT * 5 | 0) | 0;
                        var$0.$aV = 0;
                        var$0.$p = var$0.$b1;
                        var$0.$cK = 23;
                    }
                    var$0.$aU = (-1);
                    break a;
                }
                var$0.$T = 1;
                var$1 = var$0.$p + 1 | 0;
                var$0.$p = var$1;
                if (var$1 != 20)
                    break a;
                var$0.$T = 0;
                d_a(var$0, var$0.$cB, var$0.$cf, var$0.$ce, var$0.$t);
                if (!d_if(var$0, var$0.$cB, var$0.$cf, var$0.$ce, var$0.$t)) {
                    d_g(var$0);
                    break a;
                }
                var$0.$bw = var$0.$cf + (var$0.$ce * 5 | 0) | 0;
                var$0.$aV = 0;
                var$0.$p = var$0.$b1;
                var$0.$cK = 23;
                break a;
            }
            var$1 = var$0.$b1 - var$0.$p | 0;
            if (!(var$1 > 0 && var$1 < 10))
                var$1 = 10;
            var$0.$aV = var$1;
            if (var$1 == 10) {
                var$1 = var$0.$bw;
                var$2 = var$1 % 5 | 0;
                var$1 = var$1 / 5 | 0;
                d_a2(var$0, var$0.$cB, var$2, var$1);
                var$1 = d_do(var$0, var$0.$cB);
                d_a0(var$0, var$0.$cB);
                var$2 = var$0.$O;
                var$3 = var$0.$N;
                var$7 = var$2 + var$3 | 0;
                if (var$7) {
                    var$4 = $rt_nullCheck(var$0.$c3);
                    var$2 = 144 - (((10080 * var$2 | 0) / var$7 | 0) / 100 | 0) | 0;
                    var$0.$bg = var$2;
                    var$3 = 144 - (((10080 * var$3 | 0) / var$7 | 0) / 100 | 0) | 0;
                    var$0.$al = var$3;
                    var$7 = var$0.$aC;
                    if (var$7 == 2)
                        var$0.$bg = var$2 + 30 | 0;
                    else if (var$7 == 1)
                        var$0.$al = var$3 + 30 | 0;
                }
                if (!var$0.$aC) {
                    d_a0(var$0, var$0.$cB);
                    var$2 = var$0.$O;
                    if (!(var$2 && var$0.$N)) {
                        if (var$2) {
                            var$0.$al = var$0.$al + 20 | 0;
                            var$0.$aC = 1;
                            c_a1();
                        } else {
                            var$0.$bg = var$0.$bg + 20 | 0;
                            var$0.$aC = 2;
                            c_try();
                        }
                    }
                }
                if (var$1 == (-1))
                    d_g(var$0);
                else {
                    var$0.$bw = var$1;
                    var$0.$aV = 0;
                    var$0.$p = var$0.$b1;
                }
            }
        }
    }
},
d_a2 = (var$0, var$1, var$2, var$3) => {
    if (var$2 > 0)
        d_a(var$0, var$1, var$2 - 1 | 0, var$3, var$0.$t);
    if (var$2 < 4)
        d_a(var$0, var$1, var$2 + 1 | 0, var$3, var$0.$t);
    if (var$3 > 0)
        d_a(var$0, var$1, var$2, var$3 - 1 | 0, var$0.$t);
    if (var$3 < 3)
        d_a(var$0, var$1, var$2, var$3 + 1 | 0, var$0.$t);
},
d_do = (var$0, var$1) => {
    let var$2, var$3, var$4, var$5, var$6;
    var$2 = 0;
    var$3 = 0;
    while (!var$3) {
        var$4 = var$0.$ad;
        var$5 = var$0.$u;
        if (var$4 == var$5)
            break;
        var$6 = ($rt_nullCheck(var$0.$R)).data;
        var$2 = var$6[$rt_checkBounds(var$5, var$6)];
        var$3 = d_if(var$0, var$1, var$2 % 5 | 0, var$2 / 5 | 0, var$0.$t);
        var$4 = var$0.$u + 1 | 0;
        var$0.$u = var$4;
        var$0.$u = var$4 % ($rt_nullCheck(var$0.$R)).data.length | 0;
    }
    if (!var$3)
        return (-1);
    return var$2;
},
d_null = var$0 => {
    let var$1, var$2, var$3, var$4, var$5, var$6, var$7, var$8, var$9, var$10, var$11, var$12, var$13;
    ju_Random_nextInt($rt_nullCheck(var$0.$aD));
    d_a0(var$0, var$0.$bC);
    var$1 = var$0.$N;
    var$2 = $rt_createIntArray(3).data;
    var$2[0] = 0;
    var$2[1] = 0;
    var$2[2] = 0;
    var$3 = $rt_createIntArray(3).data;
    var$3[0] = 0;
    var$3[1] = 0;
    var$3[2] = 0;
    var$4 = $rt_createIntArray(3).data;
    var$4[0] = 0;
    var$4[1] = 0;
    var$4[2] = 0;
    var$5 = 0;
    while (var$5 < 4) {
        var$6 = 0;
        while (var$6 < 5) {
            a: {
                var$7 = var$0.$cB;
                jl_System_fastArraycopy(var$7, 0, var$0.$bC, 0, ($rt_nullCheck(var$7)).data.length);
                var$8 = var$6 + (var$5 * 5 | 0) | 0;
                var$7 = var$0.$bC;
                var$9 = ($rt_nullCheck(var$7)).data;
                var$8 = $rt_checkBounds(var$8, var$9);
                if (var$9[var$8]) {
                    var$8 = $rt_checkUpperBound(var$8, var$9);
                    if (!(var$9[var$8] & 8)) {
                        var$10 = 0;
                        break a;
                    }
                }
                var$10 = 1;
            }
            if (var$10) {
                var$8 = $rt_checkUpperBound(var$8, var$9);
                var$9[var$8] = (var$9[var$8] + 1 | 0) << 24 >> 24;
                var$11 = $rt_checkUpperBound(var$8, var$9);
                var$9[var$11] = (var$9[var$11] | 8) << 24 >> 24;
                d_if(var$0, var$7, var$6, var$5, var$0.$t);
                var$12 = 0;
                b: {
                    while (true) {
                        if (var$0.$ad == var$0.$u)
                            break b;
                        var$8 = var$11 % 5 | 0;
                        var$10 = var$11 / 5 | 0;
                        d_a2(var$0, var$0.$bC, var$8, var$10);
                        var$11 = d_do(var$0, var$0.$bC);
                        var$12 = var$12 + 1 | 0;
                        if (var$12 <= 5)
                            continue;
                        var$12 = 0;
                        d_a0(var$0, var$0.$bC);
                        if (!var$0.$O)
                            break b;
                        if (!var$0.$N)
                            break;
                    }
                }
                d_a0(var$0, var$0.$bC);
                var$8 = var$2[0];
                var$10 = var$0.$N;
                if (var$8 < var$10) {
                    var$8 = 0;
                    c: {
                        d: {
                            while (var$8 < var$2.length) {
                                var$8 = $rt_checkBounds(var$8, var$2);
                                if (var$10 <= var$2[var$8])
                                    break d;
                                var$8 = var$8 + 1 | 0;
                            }
                            break c;
                        }
                    }
                    var$8 = var$8 + (-1) | 0;
                    var$12 = var$8;
                    while (var$12 > 0) {
                        var$11 = var$12 - 1 | 0;
                        var$13 = $rt_checkBounds(var$12, var$2);
                        var$12 = var$2[var$13];
                        var$11 = $rt_checkBounds(var$11, var$2);
                        var$2[var$11] = var$12;
                        var$13 = $rt_checkUpperBound(var$13, var$3);
                        var$12 = var$3[var$13];
                        var$11 = $rt_checkUpperBound(var$11, var$3);
                        var$3[var$11] = var$12;
                        var$13 = $rt_checkUpperBound(var$13, var$4);
                        var$4[$rt_checkUpperBound(var$11, var$4)] = var$4[var$13];
                        var$12 = var$13 + (-1) | 0;
                    }
                    var$8 = $rt_checkBounds(var$8, var$2);
                    var$2[var$8] = var$10;
                    var$8 = $rt_checkUpperBound(var$8, var$3);
                    var$3[var$8] = var$6;
                    var$4[$rt_checkUpperBound(var$8, var$4)] = var$5;
                }
            }
            var$6 = var$6 + 1 | 0;
        }
        var$5 = var$5 + 1 | 0;
    }
    var$8 = var$2.length;
    if (var$2[$rt_checkLowerBound(var$8 - 1 | 0)] != (var$1 + 1 | 0))
        var$10 = var$8;
    else {
        var$10 = 0;
        var$1 = 0;
        e: {
            f: {
                while (true) {
                    var$2 = ($rt_nullCheck(var$0.$bB)).data;
                    if (var$1 >= var$2.length)
                        break;
                    var$13 = $rt_checkBounds(var$1, var$2);
                    var$1 = var$2[var$13];
                    var$6 = $rt_checkBounds(var$13 + 1 | 0, var$2);
                    var$1 = var$1 + (var$2[var$6] * 5 | 0) | 0;
                    var$9 = ($rt_nullCheck(var$0.$cB)).data;
                    if (var$9[$rt_checkBounds(var$1, var$9)] ? 0 : 1) {
                        var$13 = $rt_checkUpperBound(var$13, var$2);
                        var$1 = var$2[var$13];
                        var$12 = $rt_checkBounds(var$10, var$3);
                        var$3[var$12] = var$1;
                        var$10 = var$2[$rt_checkUpperBound(var$6, var$2)];
                        var$1 = $rt_checkUpperBound(var$12, var$4);
                        var$4[var$1] = var$10;
                        var$10 = var$1 + 1 | 0;
                        if (var$10 == var$8)
                            break f;
                    }
                    var$1 = var$13 + 2 | 0;
                }
                break e;
            }
        }
        if (!var$10)
            var$10 = var$8;
    }
    var$8 = var$3.length - 1 | 0;
    var$1 = ju_Random_nextInt($rt_nullCheck(var$0.$aD)) % 100 | 0;
    if (var$1 < 40 && var$1 > (-40)) {
        var$8 = ju_Random_nextInt($rt_nullCheck(var$0.$aD)) % var$10 | 0;
        if (var$8 < 0)
            var$8 =  -var$8 | 0;
    }
    var$10 = $rt_checkBounds(var$8, var$3);
    var$0.$cf = var$3[var$10];
    var$0.$ce = var$4[$rt_checkUpperBound(var$10, var$4)];
},
d_h = var$0 => {
    let var$1, var$2, var$3;
    var$1 = var$0.$c6;
    var$2 = var$0.$bg;
    var$3 = $rt_compare(var$1, var$2);
    if (var$3 < 0) {
        var$3 = var$1 + 1 | 0;
        var$0.$c6 = var$3;
        if ((var$2 - var$3 | 0) > 10)
            var$0.$c6 = var$3 + 1 | 0;
    } else if (var$3 > 0) {
        var$3 = var$1 - 1 | 0;
        var$0.$c6 = var$3;
        if ((var$3 - var$2 | 0) > 10)
            var$0.$c6 = var$3 - 1 | 0;
    }
    var$3 = var$0.$cp;
    var$1 = var$0.$al;
    var$2 = $rt_compare(var$3, var$1);
    if (var$2 < 0) {
        var$3 = var$3 + 1 | 0;
        var$0.$cp = var$3;
        if ((var$1 - var$3 | 0) > 10)
            var$0.$cp = var$3 + 1 | 0;
    } else if (var$2 > 0) {
        var$3 = var$3 - 1 | 0;
        var$0.$cp = var$3;
        if ((var$3 - var$1 | 0) > 10)
            var$0.$cp = var$3 - 1 | 0;
    }
},
d_g = var$0 => {
    let var$1;
    var$1 = var$0.$t + 1 | 0;
    var$0.$t = var$1;
    var$1 = var$1 % 2 | 0;
    var$0.$t = var$1;
    if (var$1 != 1)
        var$0.$cK = 22;
    else
        var$0.$cK = 24;
},
d_if = (var$0, var$1, var$2, var$3, var$4) => {
    let var$5, var$6, var$7, var$8;
    var$5 = 4;
    if (!(var$2 && (var$2 + 1 | 0) != 5))
        var$5 = 3;
    if (!(var$3 && (var$3 + 1 | 0) != 4))
        var$5 = var$5 + (-1) | 0;
    var$4 = var$3 * 5 | 0;
    var$6 = var$2 + var$4 | 0;
    var$1 = ($rt_nullCheck(var$1)).data;
    var$7 = $rt_checkBounds(var$6, var$1);
    if ((var$1[var$7] & 7) == var$5) {
        var$1[var$7] = 0;
        if (var$2 > 0) {
            var$1 = var$0.$R;
            var$6 = var$0.$ad;
            var$8 = ((var$2 - 1 | 0) + var$4 | 0) << 24 >> 24;
            var$1 = ($rt_nullCheck(var$1)).data;
            var$1[$rt_checkBounds(var$6, var$1)] = var$8;
            var$6 = var$6 + 1 | 0;
            var$0.$ad = var$6;
            var$0.$ad = var$6 % var$1.length | 0;
        }
        if (var$2 < 4) {
            var$1 = var$0.$R;
            var$6 = var$0.$ad;
            var$4 = ((var$2 + 1 | 0) + var$4 | 0) << 24 >> 24;
            var$1 = ($rt_nullCheck(var$1)).data;
            var$1[$rt_checkBounds(var$6, var$1)] = var$4;
            var$4 = var$6 + 1 | 0;
            var$0.$ad = var$4;
            var$0.$ad = var$4 % var$1.length | 0;
        }
        if (var$3 > 0) {
            var$1 = var$0.$R;
            var$4 = var$0.$ad;
            var$6 = (var$2 + ((var$3 - 1 | 0) * 5 | 0) | 0) << 24 >> 24;
            var$1 = ($rt_nullCheck(var$1)).data;
            var$1[$rt_checkBounds(var$4, var$1)] = var$6;
            var$4 = var$4 + 1 | 0;
            var$0.$ad = var$4;
            var$0.$ad = var$4 % var$1.length | 0;
        }
        if (var$3 < 3) {
            var$1 = var$0.$R;
            var$6 = var$0.$ad;
            var$2 = (var$2 + ((var$3 + 1 | 0) * 5 | 0) | 0) << 24 >> 24;
            var$1 = ($rt_nullCheck(var$1)).data;
            var$1[$rt_checkBounds(var$6, var$1)] = var$2;
            var$2 = var$6 + 1 | 0;
            var$0.$ad = var$2;
            var$0.$ad = var$2 % var$1.length | 0;
        }
        return 1;
    }
    return 0;
},
d_a = (var$0, var$1, var$2, var$3, var$4) => {
    let var$5, var$6;
    var$5 = var$2 + (var$3 * 5 | 0) | 0;
    var$6 = 4;
    if (!(var$2 && var$2 != 4))
        var$6 = 3;
    if (!(var$3 && var$3 != 3))
        var$6 = var$6 + (-1) | 0;
    var$1 = ($rt_nullCheck(var$1)).data;
    var$5 = $rt_checkBounds(var$5, var$1);
    if ((var$1[var$5] & 7) < var$6)
        var$1[var$5] = (var$1[var$5] + 1 | 0) << 24 >> 24;
    if (!var$4)
        var$1[var$5] = (var$1[var$5] & 7) << 24 >> 24;
    else if (var$4 == 1)
        var$1[var$5] = (var$1[var$5] | 8) << 24 >> 24;
},
d_a0 = (var$0, var$1) => {
    let var$2, var$3, var$4, var$5, var$6;
    var$0.$O = 0;
    var$0.$N = 0;
    var$2 = 0;
    var$3 = 0;
    while (var$3 < 4) {
        var$4 = 0;
        while (var$4 < 5) {
            var$1 = $rt_nullCheck(var$1);
            var$5 = var$1.data;
            var$6 = $rt_checkBounds(var$2, var$5);
            if (!(var$5[var$6] & 8))
                var$0.$O = var$0.$O + var$5[var$6] | 0;
            else
                var$0.$N = var$0.$N + (var$5[var$6] & 7) | 0;
            var$4 = var$4 + 1 | 0;
            var$2 = var$6 + 1 | 0;
        }
        var$3 = var$3 + 1 | 0;
    }
},
d_a8 = (var$0, var$1, var$2, var$3, var$4) => {
    let var$5, var$6, var$7, var$8;
    var$5 = var$2 + 2 | 0;
    var$6 = var$3 + 2 | 0;
    var$7 = $rt_nullCheck(var$0.$c3);
    var$8 = 0;
    if (var$4 & 8) {
        var$4 = var$4 & 7;
        var$8 = 11;
    }
    if (var$4 > 0) {
        var$1 = $rt_nullCheck(var$1);
        jml_Graphics_setClip(var$1, var$5, var$6, 11, 11);
        jml_Graphics_drawImage(var$1, var$0.$cg, var$5 - var$8 | 0, var$6, 20);
    }
    if (var$4 > 1) {
        var$2 = var$5 + 11 | 0;
        var$1 = $rt_nullCheck(var$1);
        jml_Graphics_setClip(var$1, var$2, var$6, 11, 11);
        jml_Graphics_drawImage(var$1, var$0.$cg, var$2 - var$8 | 0, var$6, 20);
    }
    if (var$4 > 2) {
        var$2 = var$6 + 11 | 0;
        var$1 = $rt_nullCheck(var$1);
        jml_Graphics_setClip(var$1, var$5, var$2, 11, 11);
        jml_Graphics_drawImage(var$1, var$0.$cg, var$5 - var$8 | 0, var$2, 20);
    }
    if (var$4 > 3) {
        var$2 = var$5 + 11 | 0;
        var$3 = var$6 + 11 | 0;
        var$1 = $rt_nullCheck(var$1);
        jml_Graphics_setClip(var$1, var$2, var$3, 11, 11);
        jml_Graphics_drawImage(var$1, var$0.$cg, var$2 - var$8 | 0, var$3, 20);
    }
},
d_a6 = (var$0, var$1, var$2, var$3, var$4, var$5, var$6, var$7) => {
    let var$8, var$9, var$10;
    var$8 = $rt_nullCheck(var$0.$c3);
    var$2 = var$2 + (var$4 * 25 | 0) | 0;
    var$3 = var$3 + (var$5 * 25 | 0) | 0;
    var$2 = var$2 + 2 | 0;
    var$3 = var$3 + 2 | 0;
    var$9 = 0;
    if (var$6 == 1)
        var$9 = 11;
    var$10 = (25 * var$0.$aV | 0) / 10 | 0;
    if (var$4 > 0) {
        var$6 = var$2 - var$10 | 0;
        var$1 = $rt_nullCheck(var$1);
        jml_Graphics_setClip(var$1, var$6, var$3, 11, 11);
        jml_Graphics_drawImage(var$1, var$0.$cg, (var$2 - var$9 | 0) - var$10 | 0, var$3, 20);
    }
    if (var$4 < 4) {
        var$4 = (var$2 + var$10 | 0) + 11 | 0;
        var$1 = $rt_nullCheck(var$1);
        jml_Graphics_setClip(var$1, var$4, var$3, 11, 11);
        jml_Graphics_drawImage(var$1, var$0.$cg, ((var$2 - var$9 | 0) + var$10 | 0) + 11 | 0, var$3, 20);
    }
    if (var$5 > 0) {
        var$4 = var$2 + 11 | 0;
        var$6 = var$3 - var$10 | 0;
        var$1 = $rt_nullCheck(var$1);
        jml_Graphics_setClip(var$1, var$4, var$6, 11, 11);
        jml_Graphics_drawImage(var$1, var$0.$cg, (var$2 - var$9 | 0) + 11 | 0, var$6, 20);
    }
    if (var$5 < 3) {
        var$3 = (var$3 + var$10 | 0) + 11 | 0;
        var$1 = $rt_nullCheck(var$1);
        jml_Graphics_setClip(var$1, var$2, var$3, 11, 11);
        jml_Graphics_drawImage(var$1, var$0.$cg, var$2 - var$9 | 0, var$3, 20);
    }
},
d_if0 = (var$0, var$1) => {
    let var$2, var$3, var$4, var$5, var$6, var$7, var$8, var$9, var$10, var$11, var$12;
    if (var$0.$cK == 21) {
        var$1 = $rt_nullCheck(var$1);
        jml_Graphics_setColor(var$1, 255, 255, 255);
        jml_Graphics_fillRect(var$1, 0, 0, jml_Canvas_getWidth(var$0), jml_Canvas_getHeight(var$0));
    } else {
        var$2 = (g_j($rt_nullCheck(var$0.$c3)) - jml_Image_getWidth($rt_nullCheck(var$0.$Z)) | 0) / 2 | 0;
        var$3 = ((g_l($rt_nullCheck(var$0.$c3)) - jml_Image_getHeight($rt_nullCheck(var$0.$Z)) | 0) / 2 | 0) - 1 | 0;
        d_do1(var$0, var$1);
        var$4 = jml_Canvas_getWidth(var$0);
        var$5 = jml_Canvas_getHeight(var$0);
        var$6 = $rt_nullCheck(var$1);
        jml_Graphics_setClip(var$6, 0, 0, var$4, var$5);
        jml_Graphics_drawImage(var$6, var$0.$Z, var$2, var$3, 20);
        var$2 = var$2 + 1 | 0;
        var$3 = var$3 + 1 | 0;
        var$7 = g_d($rt_nullCheck(var$0.$c3));
        var$8 = g_f($rt_nullCheck(var$0.$c3));
        g_long($rt_nullCheck(var$0.$c3));
        g_g($rt_nullCheck(var$0.$c3));
        var$4 = 0;
        var$5 = 0;
        while (var$5 < 4) {
            var$9 = 0;
            while (var$9 < 5) {
                var$10 = var$2 + $rt_imul(var$9, var$7) | 0;
                var$11 = var$3 + $rt_imul(var$5, var$8) | 0;
                var$12 = ($rt_nullCheck(var$0.$cB)).data;
                var$4 = $rt_checkBounds(var$4, var$12);
                d_a8(var$0, var$6, var$10, var$11, var$12[var$4]);
                var$9 = var$9 + 1 | 0;
                var$4 = var$4 + 1 | 0;
            }
            var$5 = var$5 + 1 | 0;
        }
        if (var$0.$cK == 23) {
            var$4 = var$0.$bw;
            var$5 = var$4 % 5 | 0;
            var$4 = var$4 / 5 | 0;
            jml_Graphics_setClip(var$6, 0, 0, jml_Canvas_getWidth(var$0), jml_Canvas_getHeight(var$0));
            d_a6(var$0, var$6, var$2, var$3, var$5, var$4, var$0.$t, var$0.$aV);
        }
        if (var$0.$cK == 22 && !var$0.$aC) {
            var$4 = jml_Image_getWidth($rt_nullCheck(var$0.$cj)) / 2 | 0;
            var$5 = jml_Image_getHeight($rt_nullCheck(var$0.$cj));
            var$2 = (var$2 + $rt_imul(var$0.$cJ, var$7) | 0) - ((var$4 - var$7 | 0) / 2 | 0) | 0;
            var$3 = (var$3 + $rt_imul(var$0.$cH, var$8) | 0) - ((var$5 - var$8 | 0) / 2 | 0) | 0;
            jml_Graphics_setClip(var$6, var$2, var$3, var$4, var$5);
            if (var$0.$cq && !((var$0.$b1 / 16 | 0) % 2 | 0))
                var$2 = var$2 - (jml_Image_getWidth($rt_nullCheck(var$0.$cj)) / 2 | 0) | 0;
            jml_Graphics_drawImage(var$6, var$0.$cj, var$2, var$3, 20);
        }
        jml_Graphics_setClip(var$6, 0, 0, g_j($rt_nullCheck(var$0.$c3)), g_l($rt_nullCheck(var$0.$c3)));
        var$2 = var$0.$c6;
        var$3 = var$0.$cp;
        jml_Graphics_drawImage(var$6, var$0.$ay, g_byte($rt_nullCheck(var$0.$c3)), var$0.$c6, 20);
        jml_Graphics_drawImage(var$6, var$0.$ax, g_h($rt_nullCheck(var$0.$c3)), var$0.$cp, 20);
        var$2 = var$2 + var$0.$aM | 0;
        var$7 = g_byte($rt_nullCheck(var$0.$c3)) - ((var$0.$aP - jml_Image_getWidth($rt_nullCheck(var$0.$ay)) | 0) / 2 | 0) | 0;
        var$8 = jml_Image_getHeight($rt_nullCheck(var$0.$aR));
        jml_Graphics_clipRect(var$6, var$7, var$2 - var$8 | 0, var$0.$aP, var$8);
        var$7 = var$7 - $rt_imul(var$0.$aP, var$0.$cv) | 0;
        jml_Graphics_drawImage(var$6, var$0.$aR, var$7, var$2, 36);
        var$2 = g_int($rt_nullCheck(var$0.$c3));
        var$3 = var$3 + var$0.$an | 0;
        var$7 = (g_h($rt_nullCheck(var$0.$c3)) - ((var$2 - jml_Image_getWidth($rt_nullCheck(var$0.$ax)) | 0) / 2 | 0) | 0) - 1 | 0;
        var$8 = jml_Image_getHeight($rt_nullCheck(var$0.$b4));
        jml_Graphics_setClip(var$6, 0, 0, g_j($rt_nullCheck(var$0.$c3)), g_l($rt_nullCheck(var$0.$c3)));
        jml_Graphics_clipRect(var$6, var$7, var$3 - var$8 | 0, var$2, var$8);
        var$2 = var$7 - ($rt_imul(var$2, var$0.$T) + (g_case($rt_nullCheck(var$0.$c3)) * 2 | 0) | 0) | 0;
        jml_Graphics_drawImage(var$6, var$0.$b4, var$2, var$3, 36);
        if (var$0.$cK == 25) {
            var$2 = $rt_imul(var$0.$cf, g_d($rt_nullCheck(var$0.$c3)));
            var$3 = $rt_imul(var$0.$ce, g_f($rt_nullCheck(var$0.$c3)));
            var$2 = var$2 + ((g_j($rt_nullCheck(var$0.$c3)) - jml_Image_getWidth($rt_nullCheck(var$0.$Z)) | 0) / 2 | 0) | 0;
            var$3 = var$3 + (((g_l($rt_nullCheck(var$0.$c3)) - jml_Image_getHeight($rt_nullCheck(var$0.$Z)) | 0) / 2 | 0) - 1 | 0) | 0;
            var$2 = var$2 + ((g_d($rt_nullCheck(var$0.$c3)) - var$0.$bZ | 0) / 2 | 0) | 0;
            var$7 = g_f($rt_nullCheck(var$0.$c3));
            var$8 = var$0.$cU;
            var$3 = var$3 + ((var$7 - var$8 | 0) / 2 | 0) | 0;
            var$7 = var$0.$bZ;
            jml_Graphics_setClip(var$6, var$2, var$3, var$7, var$8);
            var$2 = var$2 - $rt_imul(var$7, 3 + ((var$0.$b1 / 2 | 0) % 2 | 0) | 0) | 0;
            jml_Graphics_drawImage(var$6, var$0.$K, var$2, var$3, 20);
        }
        if (var$0.$bU > 1500) {
            var$2 = g_for($rt_nullCheck(var$0.$c3));
            var$3 = g_goto($rt_nullCheck(var$0.$c3));
            jml_Graphics_setClip(var$6, var$2, var$3, jml_Image_getWidth($rt_nullCheck(var$0.$X)), jml_Image_getHeight($rt_nullCheck(var$0.$X)) / 2 | 0);
            jml_Graphics_drawImage(var$6, var$0.$X, var$2, var$3, 20);
        }
    }
},
c = $rt_classWithoutFields(),
c_else = 0,
c_long = null,
c_null = null,
c_do = null;
let c_char = null,
c_try0 = null,
c_a0 = null,
c_case = null,
c_if = null,
c_int = null,
c_goto = null,
c_for = null,
c_new = null,
c_byte = null,
c_$callClinit = () => {
    c_$callClinit = $rt_eraseClinit(c);
    c__clinit_();
},
c_a = (var$1, var$2, var$3) => {
    let var$4, var$5, var$6, var$7, var$8, var$9, var$10, var$11;
    c_$callClinit();
    var$4 = ji_DataInputStream__init_(w_Resources_open(jl_Object_getClass($rt_nullCheck(var$1)), var$2));
    var$1 = var$4.$in;
    var$5 = $rt_nullCheck(var$3);
    var$6 = var$5.data.length;
    var$7 = $rt_createByteArray(ji_ByteArrayInputStream_read($rt_nullCheck(var$1), var$5, 0, var$6));
    var$5 = var$7.data;
    var$8 = var$5.length;
    jl_System_fastArraycopy(var$3, 0, var$7, 0, var$8);
    var$9 = new cnms_Sound;
    var$9.$handle0 = mikiPlatform.newSound(var$8);
    var$10 = 0;
    while (var$10 < var$8) {
        var$11 = var$9.$handle0;
        var$10 = $rt_checkLowerBound(var$10);
        var$6 = var$5[var$10] & 255;
        mikiPlatform.sounds[var$11][var$10] = var$6;
        var$10 = var$10 + 1 | 0;
    }
    ji_FilterInputStream_close($rt_nullCheck(var$4));
    return var$9;
},
c_a4 = var$1 => {
    let var$2, $$je;
    c_$callClinit();
    a: {
        b: {
            try {
                var$2 = $rt_createByteArray(1000);
                c_long = c_a(var$1, $rt_s(44), var$2);
                c_null = c_a(var$1, $rt_s(45), var$2);
                c_do = c_a(var$1, $rt_s(46), var$2);
                c_char = c_a(var$1, $rt_s(47), var$2);
                c_try0 = c_a(var$1, $rt_s(48), var$2);
                c_a0 = c_a(var$1, $rt_s(49), var$2);
                c_case = c_a(var$1, $rt_s(50), var$2);
                c_if = c_a(var$1, $rt_s(51), var$2);
                c_int = c_a(var$1, $rt_s(52), var$2);
                c_goto = c_a(var$1, $rt_s(53), var$2);
                c_for = c_a(var$1, $rt_s(54), var$2);
                c_new = c_a(var$1, $rt_s(55), var$2);
                break a;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_Exception) {
                    var$1 = $$je;
                    break b;
                } else {
                    throw $$e;
                }
            }
        }
        jl_Throwable_printStackTrace(var$1);
    }
},
c_a2 = var$1 => {
    let var$2;
    c_$callClinit();
    c_else = var$1;
    if (!var$1) {
        var$2 = c_byte;
        if (var$2 !== null)
            mikiPlatform.stopSound(var$2.$handle0);
    }
},
c_a3 = var$1 => {
    c_$callClinit();
    a: {
        b: {
            c: {
                switch (var$1) {
                    case 0:
                        break;
                    case 1:
                        break c;
                    case 2:
                        break b;
                    default:
                        break a;
                }
                c_char0();
                break a;
            }
            c_try();
            break a;
        }
        c_goto0();
    }
},
c_byte0 = () => {
    c_$callClinit();
    if (c_else) {
        cnms_Sound_play($rt_nullCheck(c_for), 1);
        c_byte = c_for;
    }
},
c_try = () => {
    c_$callClinit();
    if (c_else) {
        cnms_Sound_play($rt_nullCheck(c_goto), 1);
        c_byte = c_goto;
    }
},
c_char0 = () => {
    c_$callClinit();
    if (c_else) {
        cnms_Sound_play($rt_nullCheck(c_do), 1);
        c_byte = c_do;
    }
},
c_for0 = () => {
    c_$callClinit();
    if (c_else) {
        cnms_Sound_play($rt_nullCheck(c_char), 1);
        c_byte = c_char;
    }
},
c_goto0 = () => {
    c_$callClinit();
    if (c_else) {
        cnms_Sound_play($rt_nullCheck(c_try0), 1);
        c_byte = c_try0;
    }
},
c_new0 = () => {
    c_$callClinit();
    if (c_else) {
        cnms_Sound_play($rt_nullCheck(c_long), 1);
        c_byte = c_long;
    }
},
c_do0 = () => {
    c_$callClinit();
    if (c_else) {
        cnms_Sound_play($rt_nullCheck(c_null), 1);
        c_byte = c_null;
    }
},
c_int0 = () => {
    c_$callClinit();
    if (c_else) {
        cnms_Sound_play($rt_nullCheck(c_if), 1);
        c_byte = c_if;
    }
},
c_else0 = () => {
    c_$callClinit();
    if (c_else) {
        cnms_Sound_play($rt_nullCheck(c_new), 1);
        c_byte = c_new;
    }
},
c_if0 = () => {
    c_$callClinit();
    if (c_else) {
        cnms_Sound_play($rt_nullCheck(c_int), 1);
        c_byte = c_int;
    }
},
c_a1 = () => {
    c_$callClinit();
    if (c_else) {
        cnms_Sound_play($rt_nullCheck(c_a0), 1);
        c_byte = c_a0;
    }
},
c__clinit_ = () => {
    c_else = 1;
    c_byte = null;
},
jl_System = $rt_classWithoutFields(),
jl_System_errCache = null,
jl_System_properties = null,
jl_System_arraycopy = ($src, $srcPos, $dest, $destPos, $length) => {
    let $srcType, $targetType, $srcArray, $i, var$10, var$11, var$12, $elem;
    if ($src !== null && $dest !== null) {
        if ($srcPos >= 0 && $destPos >= 0 && $length >= 0 && ($srcPos + $length | 0) <= jlr_Array_getLength($src) && ($destPos + $length | 0) <= jlr_Array_getLength($dest)) {
            a: {
                if ($src !== $dest) {
                    $src = $rt_nullCheck($src);
                    $srcType = jl_Class_getComponentType($rt_nullCheck(jl_Object_getClass($src)));
                    $dest = $rt_nullCheck($dest);
                    $targetType = jl_Class_getComponentType($rt_nullCheck(jl_Object_getClass($dest)));
                    if (!($srcType !== null && $targetType !== null)) {
                        $src = new jl_ArrayStoreException;
                        jl_Exception__init_($src);
                        $rt_throw($src);
                    } else if ($srcType !== $targetType) {
                        $srcType = $rt_nullCheck($srcType);
                        if (!jl_Class_isPrimitive($srcType)) {
                            $targetType = $rt_nullCheck($targetType);
                            if (!jl_Class_isPrimitive($targetType)) {
                                $srcArray = $rt_castToInterface($src, $rt_arraycls(jl_Object));
                                $i = 0;
                                var$10 = $srcPos;
                                while ($i < $length) {
                                    b: {
                                        c: {
                                            var$11 = var$10 + 1 | 0;
                                            $srcArray = $rt_nullCheck($srcArray);
                                            var$12 = $srcArray.data;
                                            $elem = var$12[$rt_checkBounds(var$10, var$12)];
                                            if ($elem !== null) {
                                                $elem = jl_Object_getClass($elem);
                                                if ($rt_isAssignable(($rt_nullCheck($elem)).$classInfo, $rt_nullCheck($targetType.$classInfo)))
                                                    break c;
                                            }
                                            var$10 = 0;
                                            break b;
                                        }
                                        var$10 = 1;
                                    }
                                    if (!var$10) {
                                        jl_System_doArrayCopy($src, $srcPos, $dest, $destPos, $i);
                                        $src = new jl_ArrayStoreException;
                                        jl_Exception__init_($src);
                                        $rt_throw($src);
                                    }
                                    $i = $i + 1 | 0;
                                    var$10 = var$11;
                                }
                                jl_System_doArrayCopy($src, $srcPos, $dest, $destPos, $length);
                                return;
                            }
                        }
                        if (!jl_Class_isPrimitive($srcType))
                            break a;
                        if (!jl_Class_isPrimitive($rt_nullCheck($targetType)))
                            break a;
                    }
                }
                jl_System_doArrayCopy($src, $srcPos, $dest, $destPos, $length);
                return;
            }
            $src = new jl_ArrayStoreException;
            jl_Exception__init_($src);
            $rt_throw($src);
        }
        $src = new jl_IndexOutOfBoundsException;
        jl_Exception__init_($src);
        $rt_throw($src);
    }
    $dest = new jl_NullPointerException;
    jl_Exception__init_0($dest, $rt_s(56));
    $rt_throw($dest);
},
jl_System_fastArraycopy = ($src, $srcPos, $dest, $destPos, $length) => {
    if ($srcPos >= 0 && $destPos >= 0 && $length >= 0 && ($srcPos + $length | 0) <= jl_System_fastArrayLength($src) && ($destPos + $length | 0) <= jl_System_fastArrayLength($dest)) {
        jl_System_doArrayCopy($src, $srcPos, $dest, $destPos, $length);
        return;
    }
    $src = new jl_IndexOutOfBoundsException;
    jl_Exception__init_($src);
    $rt_throw($src);
},
jl_System_fastArrayLength = $obj => {
    return $rt_arrayLength($obj);
},
jl_System_doArrayCopy = (var$1, var$2, var$3, var$4, var$5) => {
    if (var$5 !== 0) {
        if (typeof var$1.data.buffer !== 'undefined') {
            var$3.data.set(var$1.data.subarray(var$2, var$2 + var$5), var$4);
        } else if (var$1 !== var$3 || var$4 < var$2) {
            for (let i = 0;i < var$5;i = i + 1 | 0) {
                var$3.data[var$4++] = var$1.data[var$2++];
            }
        } else {
            var$2 = var$2 + var$5 | 0;
            var$4 = var$4 + var$5 | 0;
            for (let i = 0;i < var$5;i = i + 1 | 0) {
                var$3.data[ --var$4] = var$1.data[ --var$2];
            }
        }
    }
},
jl_System_currentTimeMillis = () => {
    return Long_fromNumber((new Date()).getTime());
},
jl_System_getProperty = var$1 => {
    let var$2, var$3, var$4, var$5;
    if (jl_System_properties === null) {
        var$2 = new ju_Properties;
        ju_Hashtable__init_(var$2);
        var$3 = $rt_nullCheck(var$2);
        ju_Hashtable_put(var$3, $rt_s(57), $rt_s(58));
        ju_Hashtable_put(var$3, $rt_s(59), $rt_s(60));
        var$4 = $rt_nullCheck(otrf_VirtualFileSystemProvider_getInstance());
        ju_Hashtable_put(var$3, $rt_s(61), $rt_s(10));
        var$4 = $rt_nullCheck(otrf_VirtualFileSystemProvider_getInstance());
        ju_Hashtable_put(var$3, $rt_s(62), $rt_s(63));
        ju_Hashtable_put(var$3, $rt_s(64), $rt_s(5));
        ju_Hashtable_put(var$3, $rt_s(65), $rt_s(66));
        ju_Hashtable_put(var$3, $rt_s(67), $rt_s(58));
        ju_Hashtable_put(var$3, $rt_s(68), $rt_s(10));
        var$5 = new ju_Properties;
        ju_Hashtable__init_(var$5);
        var$5.$defaults = var$2;
        jl_System_properties = var$5;
    }
    return ju_Properties_getProperty($rt_nullCheck(jl_System_properties), var$1);
};
function k() {
    let a = this; jl_Object.call(a);
    a.$for6 = 0;
    a.$new2 = 0;
    a.$int5 = 0;
    a.$do6 = null;
    a.$if9 = null;
    a.$a34 = null;
}
let k__init_0 = (var$0, var$1, var$2, var$3, var$4, var$5, var$6) => {
    let var$7, var$8, var$9, var$10, var$11, var$12, var$13, var$14, var$15, var$16, var$17, var$18, var$19, $$je;
    var$0.$a34 = var$1;
    var$7 = 0;
    a: {
        b: {
            try {
                var$8 = jmr_RecordStore_openRecordStore(var$1, 1);
                break a;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_Exception) {
                    break b;
                } else {
                    throw $$e;
                }
            }
        }
        jmr_RecordStore_deleteRecordStore(var$1);
        var$8 = jmr_RecordStore_openRecordStore(var$1, 1);
        var$7 = 1;
    }
    c: {
        var$9 = $rt_nullCheck(var$8);
        if (jmr_RecordStore_getNumRecords(var$9)) {
            var$10 = jmr_RecordStore_getRecord(var$9, 1);
            var$11 = null;
            d: {
                e: {
                    try {
                        f: {
                            g: {
                                var$12 = var$9;
                                var$13 = var$11;
                                var$14 = new ji_DataInputStream;
                                var$11 = var$14;
                                var$13 = var$14;
                                ji_DataInputStream__init_0(var$14, ji_ByteArrayInputStream__init_(var$10));
                                var$15 = ji_DataInputStream_readByte(var$14);
                                var$16 = ji_DataInputStream_readByte(var$14);
                                var$17 = ji_DataInputStream_readBoolean(var$14);
                                if (var$15 == var$4) {
                                    var$12 = var$9;
                                    var$13 = var$14;
                                    var$11 = var$14;
                                    if (var$16 == var$5) {
                                        var$12 = var$9;
                                        var$13 = var$14;
                                        var$11 = var$14;
                                        if (var$6 == var$17)
                                            break g;
                                    }
                                }
                                var$12 = var$9;
                                var$13 = var$14;
                                var$11 = var$14;
                                ji_FilterInputStream_close($rt_nullCheck(var$14));
                                var$8 = null;
                                var$11 = var$8;
                                var$13 = var$8;
                                jmr_RecordStore_closeRecordStore(var$9);
                                jmr_RecordStore_deleteRecordStore(var$1);
                                var$9 = jmr_RecordStore_openRecordStore(var$1, 1);
                                var$12 = var$9;
                                var$7 = 1;
                                break f;
                            }
                            var$12 = var$9;
                            var$13 = var$14;
                            var$11 = var$14;
                            var$0.$do6 = $rt_createArray($rt_arraycls(jl_String), var$4);
                            var$0.$if9 = $rt_createArray($rt_arraycls($rt_intcls), var$4);
                            var$15 = 0;
                            while (true) {
                                var$12 = var$9;
                                var$13 = var$14;
                                var$11 = var$14;
                                if (var$15 >= var$4)
                                    break;
                                var$12 = var$9;
                                var$13 = var$14;
                                var$11 = var$14;
                                var$10 = var$0.$do6;
                                var$18 = $rt_createArray(jl_String, var$5);
                                var$10 = ($rt_nullCheck(var$10)).data;
                                var$15 = $rt_checkBounds(var$15, var$10);
                                var$10[var$15] = var$18;
                                var$10 = var$0.$if9;
                                var$18 = $rt_createIntArray(var$5);
                                var$10 = ($rt_nullCheck(var$10)).data;
                                var$17 = $rt_checkUpperBound(var$15, var$10);
                                var$10[var$17] = var$18;
                                var$15 = 0;
                                while (true) {
                                    var$12 = var$9;
                                    var$13 = var$14;
                                    var$11 = var$14;
                                    if (var$15 >= var$5)
                                        break;
                                    var$12 = var$9;
                                    var$13 = var$14;
                                    var$11 = var$14;
                                    var$10 = ($rt_nullCheck(var$0.$do6)).data;
                                    var$16 = $rt_checkUpperBound(var$17, var$10);
                                    var$10 = var$10[var$16];
                                    var$8 = ji_DataInputStream_readUTF(var$14);
                                    var$10 = ($rt_nullCheck(var$10)).data;
                                    var$15 = $rt_checkBounds(var$15, var$10);
                                    var$10[var$15] = var$8;
                                    var$10 = ($rt_nullCheck(var$0.$if9)).data;
                                    var$17 = $rt_checkUpperBound(var$16, var$10);
                                    var$10 = var$10[var$17];
                                    var$16 = ji_DataInputStream_readInt(var$14);
                                    var$10 = ($rt_nullCheck(var$10)).data;
                                    var$15 = $rt_checkUpperBound(var$15, var$10);
                                    var$10[var$15] = var$16;
                                    var$15 = var$15 + 1 | 0;
                                }
                                var$12 = var$9;
                                var$13 = var$14;
                                var$11 = var$14;
                                var$15 = var$17 + 1 | 0;
                            }
                            var$12 = var$9;
                            var$13 = var$14;
                            var$11 = var$14;
                            ji_FilterInputStream_close($rt_nullCheck(var$14));
                            var$8 = null;
                            var$11 = var$8;
                            var$13 = var$8;
                        }
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        if ($$je instanceof jl_Exception) {
                            break e;
                        } else{
                            var$1 = $$je;
                            break d;
                        }
                    }
                    var$13 = null;
                    try {
                        break c;
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        var$1 = $$je;
                        break d;

                    }
                }
                try {
                    var$13 = var$11;
                    jmr_RecordStore_closeRecordStore($rt_nullCheck(var$12));
                    jmr_RecordStore_deleteRecordStore(var$1);
                    var$9 = jmr_RecordStore_openRecordStore(var$1, 1);
                    var$7 = 1;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    var$1 = $$je;
                    break d;

                }
                h: {
                    try {
                        if (var$11 === null)
                            break h;
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        var$1 = $$je;
                        break d;

                    }
                    ji_FilterInputStream_close($rt_nullCheck(var$11));
                }
                var$13 = null;
                try {
                    break c;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    var$1 = $$je;
                    break d;

                }
            }
            if (var$13 !== null)
                ji_FilterInputStream_close($rt_nullCheck(var$13));
            $rt_throw(var$1);
        }
    }
    var$1 = $rt_nullCheck(var$9);
    if (!(jmr_RecordStore_getNumRecords(var$1) && !var$7)) {
        var$10 = $rt_createArray($rt_arraycls(jl_String), var$4);
        var$19 = var$10.data;
        var$0.$do6 = var$10;
        var$10 = $rt_createArray($rt_arraycls($rt_intcls), var$4);
        var$18 = var$10.data;
        var$0.$if9 = var$10;
        var$15 = 0;
        while (var$15 < var$4) {
            var$10 = $rt_createArray(jl_String, var$5);
            var$15 = $rt_checkBounds(var$15, var$19);
            var$19[var$15] = var$10;
            var$10 = $rt_createIntArray(var$5);
            var$17 = $rt_checkUpperBound(var$15, var$18);
            var$18[var$17] = var$10;
            var$15 = 0;
            while (var$15 < var$5) {
                var$16 = $rt_checkUpperBound(var$17, var$19);
                var$10 = ($rt_nullCheck(var$19[var$16])).data;
                var$15 = $rt_checkBounds(var$15, var$10);
                var$10[var$15] = var$2;
                var$17 = $rt_checkUpperBound(var$16, var$18);
                var$10 = ($rt_nullCheck(var$18[var$17])).data;
                var$16 = $rt_checkUpperBound(var$15, var$10);
                var$10[var$16] = var$3;
                var$15 = var$16 + 1 | 0;
            }
            var$15 = var$17 + 1 | 0;
        }
        var$18 = $rt_nullCheck(k_do(var$0));
        jmr_RecordStore_addRecord(var$1, var$18, 0, var$18.data.length);
    }
    var$0.$for6 = var$4;
    var$0.$new2 = var$5;
    var$0.$int5 = var$6;
},
k__init_ = (var_0, var_1, var_2, var_3, var_4, var_5) => {
    let var_6 = new k();
    k__init_0(var_6, var_0, var_1, var_2, var_3, var_4, var_5);
    return var_6;
},
k_if = var$0 => {
    let var$1, var$2, var$3;
    var$1 = jmr_RecordStore_openRecordStore(var$0.$a34, 1);
    var$2 = $rt_nullCheck(k_do(var$0));
    var$3 = var$2.data.length;
    jmr_RecordStore_setRecord($rt_nullCheck(var$1), 1, var$2, 0, var$3);
},
k_do = var$0 => {
    let var$1, var$2, var$3, var$4, var$5, var$6, var$7, var$8, $$je;
    var$1 = null;
    try {
        a: {
            b: {
                try {
                    var$2 = var$1;
                    var$3 = new ji_ByteArrayOutputStream;
                    var$1 = var$3;
                    var$2 = var$3;
                    ji_ByteArrayOutputStream__init_(var$3);
                    var$4 = ji_DataOutputStream__init_(var$3);
                    ji_DataOutputStream_writeByte(var$4, var$0.$for6);
                    ji_DataOutputStream_writeByte(var$4, var$0.$new2);
                    ji_DataOutputStream_writeBoolean(var$4, var$0.$int5);
                    var$5 = 0;
                    while (true) {
                        var$2 = var$3;
                        var$1 = var$3;
                        if (var$5 >= var$0.$for6)
                            break;
                        var$2 = var$3;
                        var$1 = var$3;
                        var$6 = 0;
                        while (true) {
                            var$2 = var$3;
                            var$1 = var$3;
                            if (var$6 >= var$0.$new2)
                                break;
                            var$2 = var$3;
                            var$1 = var$3;
                            var$7 = ($rt_nullCheck(var$0.$do6)).data;
                            var$8 = $rt_checkBounds(var$5, var$7);
                            var$7 = ($rt_nullCheck(var$7[var$8])).data;
                            var$6 = $rt_checkBounds(var$6, var$7);
                            ji_DataOutputStream_writeUTF(var$4, var$7[var$6]);
                            var$7 = ($rt_nullCheck(var$0.$if9)).data;
                            var$5 = $rt_checkUpperBound(var$8, var$7);
                            var$7 = ($rt_nullCheck(var$7[var$5])).data;
                            var$6 = $rt_checkUpperBound(var$6, var$7);
                            ji_DataOutputStream_writeInt(var$4, var$7[var$6]);
                            var$6 = var$6 + 1 | 0;
                        }
                        var$2 = var$3;
                        var$1 = var$3;
                        var$5 = var$5 + 1 | 0;
                    }
                    var$2 = var$3;
                    var$1 = var$3;
                    var$7 = ji_ByteArrayOutputStream_toByteArray(var$3);
                    break a;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    if ($$je instanceof jl_Exception) {
                        var$3 = $$je;
                        break b;
                    } else {
                        throw $$e;
                    }
                }
            }
            var$2 = var$1;
            $rt_throw(var$3);
        }
    } catch ($$e) {
        $$je = $rt_wrapException($$e);
        var$1 = $$je;
        if (var$2 !== null)
            var$3 = $rt_nullCheck(var$2);
        $rt_throw(var$1);

    }
    var$1 = $rt_nullCheck(var$3);
    var$2 = null;
    return var$7;
},
k_if0 = (var$0, var$1, var$2) => {
    let var$3;
    var$3 = ($rt_nullCheck(var$0.$do6)).data;
    var$3 = ($rt_nullCheck(var$3[$rt_checkBounds(var$1, var$3)])).data;
    return var$3[$rt_checkBounds(var$2, var$3)];
},
k_a = (var$0, var$1, var$2) => {
    let var$3;
    var$3 = ($rt_nullCheck(var$0.$if9)).data;
    var$3 = ($rt_nullCheck(var$3[$rt_checkBounds(var$1, var$3)])).data;
    return var$3[$rt_checkBounds(var$2, var$3)];
},
k_a0 = (var$0, var$1, var$2, var$3) => {
    let var$4, var$5, var$6, var$7, var$8, var$9, var$10, var$11;
    if (!(var$2 !== null && !jl_String_equals(var$2, $rt_s(69))))
        var$2 = $rt_s(69);
    a: {
        var$4 = var$0.$new2;
        var$5 = var$4 - 1 | 0;
        if (var$0.$int5)
            b: {
                while (var$5 >= 0) {
                    var$6 = ($rt_nullCheck(var$0.$if9)).data;
                    var$1 = $rt_checkBounds(var$1, var$6);
                    var$6 = ($rt_nullCheck(var$6[var$1])).data;
                    var$5 = $rt_checkBounds(var$5, var$6);
                    if (var$3 <= var$6[var$5])
                        break b;
                    var$5 = var$5 + (-1) | 0;
                }
                break a;
            }
        else
            c: {
                while (var$5 >= 0) {
                    var$6 = ($rt_nullCheck(var$0.$if9)).data;
                    var$1 = $rt_checkBounds(var$1, var$6);
                    var$6 = ($rt_nullCheck(var$6[var$1])).data;
                    var$5 = $rt_checkBounds(var$5, var$6);
                    if (var$3 >= var$6[var$5])
                        break c;
                    var$5 = var$5 + (-1) | 0;
                }
                break a;
            }
    }
    var$7 = var$5 + 1 | 0;
    var$5 = var$4 - 2 | 0;
    while (var$5 >= var$7) {
        var$6 = ($rt_nullCheck(var$0.$do6)).data;
        var$1 = $rt_checkBounds(var$1, var$6);
        var$8 = var$6[var$1];
        var$9 = var$5 + 1 | 0;
        var$1 = $rt_checkUpperBound(var$1, var$6);
        var$6 = ($rt_nullCheck(var$6[var$1])).data;
        var$5 = $rt_checkBounds(var$5, var$6);
        var$10 = var$6[var$5];
        var$6 = ($rt_nullCheck(var$8)).data;
        var$9 = $rt_checkBounds(var$9, var$6);
        var$6[var$9] = var$10;
        var$6 = ($rt_nullCheck(var$0.$if9)).data;
        var$1 = $rt_checkUpperBound(var$1, var$6);
        var$8 = var$6[var$1];
        var$1 = $rt_checkUpperBound(var$1, var$6);
        var$6 = ($rt_nullCheck(var$6[var$1])).data;
        var$11 = $rt_checkUpperBound(var$5, var$6);
        var$5 = var$6[var$11];
        var$6 = ($rt_nullCheck(var$8)).data;
        var$6[$rt_checkUpperBound(var$9, var$6)] = var$5;
        var$5 = var$11 + (-1) | 0;
    }
    if (var$7 < var$4) {
        var$6 = ($rt_nullCheck(var$0.$do6)).data;
        var$1 = $rt_checkBounds(var$1, var$6);
        var$6 = ($rt_nullCheck(var$6[var$1])).data;
        var$5 = $rt_checkBounds(var$7, var$6);
        var$6[var$5] = var$2;
        var$6 = ($rt_nullCheck(var$0.$if9)).data;
        var$6 = ($rt_nullCheck(var$6[$rt_checkUpperBound(var$1, var$6)])).data;
        var$6[$rt_checkUpperBound(var$5, var$6)] = var$3;
    }
},
ju_Objects = $rt_classWithoutFields(),
ju_Objects_equals = ($a, $b) => {
    if ($a !== $b)
        return $a !== null ? $a.$equals0($b) : $b !== null ? 0 : 1;
    return 1;
},
jl_StringIndexOutOfBoundsException = $rt_classWithoutFields(jl_IndexOutOfBoundsException);
function ji_ByteArrayInputStream() {
    let a = this; ji_InputStream.call(a);
    a.$buf0 = null;
    a.$pos = 0;
    a.$mark = 0;
    a.$count1 = 0;
}
let ji_ByteArrayInputStream__init_0 = ($this, $buf) => {
    let $buf_0, var$3;
    $buf_0 = $rt_nullCheck($buf);
    var$3 = $buf_0.data.length;
    $this.$buf0 = $buf_0;
    $this.$pos = 0;
    $this.$mark = 0;
    $this.$count1 = 0 + var$3 | 0;
},
ji_ByteArrayInputStream__init_ = var_0 => {
    let var_1 = new ji_ByteArrayInputStream();
    ji_ByteArrayInputStream__init_0(var_1, var_0);
    return var_1;
},
ji_ByteArrayInputStream_read0 = $this => {
    let var$1, var$2, var$3;
    var$1 = $this.$pos;
    if (var$1 >= $this.$count1)
        var$2 = (-1);
    else {
        var$3 = $this.$buf0;
        $this.$pos = var$1 + 1 | 0;
        var$3 = ($rt_nullCheck(var$3)).data;
        var$2 = var$3[$rt_checkBounds(var$1, var$3)] & 255;
    }
    return var$2;
},
ji_ByteArrayInputStream_read = ($this, $b, $off, $len) => {
    let $bytesToRead, $i, var$6, var$7;
    $bytesToRead = jl_Math_min($len, $this.$count1 - $this.$pos | 0);
    $i = 0;
    while ($i < $bytesToRead) {
        $len = $off + 1 | 0;
        var$6 = $this.$buf0;
        var$7 = $this.$pos;
        $this.$pos = var$7 + 1 | 0;
        var$6 = ($rt_nullCheck(var$6)).data;
        var$7 = var$6[$rt_checkBounds(var$7, var$6)];
        $b = $rt_nullCheck($b);
        var$6 = $b.data;
        var$6[$rt_checkBounds($off, var$6)] = var$7;
        $i = $i + 1 | 0;
        $off = $len;
    }
    if ($bytesToRead <= 0)
        $bytesToRead = (-1);
    return $bytesToRead;
},
ji_ByteArrayInputStream_close = $this => {
    return;
},
ji_IOException = $rt_classWithoutFields(jl_Exception),
ji_EOFException = $rt_classWithoutFields(ji_IOException),
jur_RandomGenerator = $rt_classWithoutFields(0);
function ju_Random() {
    jl_Object.call(this);
    this.$seed = Long_ZERO;
}
let ju_Random_nextInt = $this => {
    let var$1;
    var$1 = Long_and(Long_add(Long_mul($this.$seed, Long_create(3740067437, 5)), Long_fromInt(11)), Long_create(4294967295, 65535));
    $this.$seed = var$1;
    return Long_lo(Long_shr(var$1, 16));
};
function jmr_RecordStore() {
    jl_Object.call(this);
    this.$name = null;
}
let jmr_RecordStore_openRecordStore = ($name, $create) => {
    let var$3, var$4;
    if (!(mikiPlatform.storeExists($rt_ustr($name)) ? 1 : 0)) {
        if (!$create) {
            var$3 = new jl_IllegalStateException;
            var$4 = new jl_StringBuilder;
            jl_AbstractStringBuilder__init_(var$4);
            jl_StringBuilder_append($rt_nullCheck(jl_StringBuilder_append(var$4, $rt_s(70))), $name);
            jl_Exception__init_0(var$3, jl_AbstractStringBuilder_toString(var$4));
            $rt_throw(var$3);
        }
        mikiPlatform.storeCreate($rt_ustr($name));
    }
    var$3 = new jmr_RecordStore;
    var$3.$name = $name;
    return var$3;
},
jmr_RecordStore_deleteRecordStore = $name => {
    mikiPlatform.storeDelete($rt_ustr($name));
},
jmr_RecordStore_getNumRecords = $this => {
    return mikiPlatform.storeCount($rt_ustr($this.$name));
},
jmr_RecordStore_getRecord = ($this, $id) => {
    let var$2, var$3, var$4, var$5, var$6, var$7, var$8;
    otci_Base64Impl_$callClinit();
    var$2 = otci_Base64Impl_reverse;
    var$3 = $rt_nullCheck($rt_str(mikiPlatform.storeRead($rt_ustr($this.$name), $id)));
    var$4 = $rt_createByteArray(var$3.$nativeString.length);
    var$5 = var$4.data;
    $id = 0;
    var$6 = var$5.length;
    while ($id < var$6) {
        var$7 = jl_String_charAt(var$3, $id) << 24 >> 24;
        $id = $rt_checkLowerBound($id);
        var$5[$id] = var$7;
        $id = $id + 1 | 0;
    }
    var$8 = (var$6 / 4 | 0) * 3 | 0;
    var$7 = var$6 % 4 | 0;
    if (!(var$7 != 2 && var$7 != 3))
        var$8 = var$8 + (var$7 - 1 | 0) | 0;
    $id = var$6 - 1 | 0;
    while ($id >= 0) {
        var$7 = $rt_checkBounds($id, var$5);
        if (var$5[var$7] != 61)
            break;
        var$8 = var$8 + (-1) | 0;
        $id = var$7 + (-1) | 0;
    }
    var$5 = $rt_createByteArray(var$8);
    otci_Base64Impl_decode0(var$4, var$5, var$2);
    return var$5;
},
jmr_RecordStore_addRecord = ($this, $data, $offset, $length) => {
    let $id;
    $id = jmr_RecordStore_getNumRecords($this) + 1 | 0;
    jmr_RecordStore_setRecord($this, $id, $data, $offset, $length);
    return $id;
},
jmr_RecordStore_setRecord = ($this, $id, $data, $offset, $length) => {
    let var$5, var$6, var$7, var$8, var$9, var$10, var$11;
    var$5 = $this.$name;
    otci_Base64Impl_$callClinit();
    var$6 = otci_Base64Impl_alphabet;
    $length = $offset + $length | 0;
    $data = ($rt_nullCheck($data)).data;
    var$7 = $data.length;
    if ($offset <= $length) {
        if ($offset >= 0 && $offset <= var$7) {
            var$8 = $rt_createByteArray($length - $offset | 0);
            var$9 = var$8.data;
            var$10 = jl_Math_min($length, var$7);
            $length = $offset;
            while ($length < var$10) {
                var$7 = $length - $offset | 0;
                $length = $rt_checkBounds($length, $data);
                var$9[$rt_checkBounds(var$7, var$9)] = $data[$length];
                $length = $length + 1 | 0;
            }
            var$9 = $rt_createByteArray(((var$9.length + 2 | 0) / 3 | 0) * 4 | 0);
            $data = var$9.data;
            otci_Base64Impl_encode0(var$8, var$9, var$6, 1);
            $offset = $data.length;
            var$8 = $rt_createCharArray($offset);
            var$9 = var$8.data;
            $length = 0;
            while ($length < $offset) {
                var$10 = $rt_checkBounds($length, $data);
                $length = $data[var$10] & 255 & 65535;
                var$7 = $rt_checkUpperBound(var$10, var$9);
                var$9[var$7] = $length;
                $length = var$7 + 1 | 0;
            }
            mikiPlatform.storeWrite($rt_ustr(var$5), $id, $rt_ustr(jl_String__init_0(var$8)));
            return;
        }
        var$5 = new jl_ArrayIndexOutOfBoundsException;
        jl_Exception__init_(var$5);
        $rt_throw(var$5);
    }
    var$5 = new jl_IllegalArgumentException;
    var$11 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$11);
    jl_AbstractStringBuilder_append0(var$11, $offset);
    jl_AbstractStringBuilder_append0($rt_nullCheck(jl_StringBuilder_append(var$11, $rt_s(71))), $length);
    jl_Exception__init_0(var$5, jl_AbstractStringBuilder_toString(var$11));
    $rt_throw(var$5);
},
jmr_RecordStore_closeRecordStore = $this => {
    return;
};
function jml_Image() {
    jl_Object.call(this);
    this.$handle = 0;
}
let jml_Image__init_0 = ($this, $handle) => {
    $this.$handle = $handle;
},
jml_Image__init_ = var_0 => {
    let var_1 = new jml_Image();
    jml_Image__init_0(var_1, var_0);
    return var_1;
},
jml_Image_createImage = $name => {
    return jml_Image__init_(mikiPlatform.image($rt_ustr($name)));
},
jml_Image_createImage0 = ($width, $height) => {
    return jml_Image__init_(mikiPlatform.surface($width, $height));
},
jml_Image_getWidth = $this => {
    return mikiPlatform.surfaces[$this.$handle].width;
},
jml_Image_getHeight = $this => {
    return mikiPlatform.surfaces[$this.$handle].height;
},
jml_Image_getGraphics = $this => {
    return jml_Graphics__init_($this.$handle);
};
function cnms_Sound() {
    jl_Object.call(this);
    this.$handle0 = 0;
}
let cnms_Sound_play = ($this, $count) => {
    mikiPlatform.playSound($this.$handle0, $count);
},
ju_Dictionary = $rt_classWithoutFields(),
ju_Map = $rt_classWithoutFields(0),
jl_Cloneable = $rt_classWithoutFields(0);
function ju_Hashtable() {
    let a = this; ju_Dictionary.call(a);
    a.$elementCount0 = 0;
    a.$elementData = null;
    a.$loadFactor = 0.0;
    a.$threshold = 0;
    a.$firstSlot = 0;
    a.$lastSlot = 0;
    a.$modCount1 = 0;
}
let ju_Hashtable_EMPTY_ENUMERATION = null,
ju_Hashtable_EMPTY_ITERATOR = null,
ju_Hashtable_$callClinit = () => {
    ju_Hashtable_$callClinit = $rt_eraseClinit(ju_Hashtable);
    ju_Hashtable__clinit_();
},
ju_Hashtable__init_ = $this => {
    let var$1, var$2;
    ju_Hashtable_$callClinit();
    $this.$lastSlot = (-1);
    $this.$elementCount0 = 0;
    var$1 = $rt_createArray(ju_Hashtable$Entry, 11);
    var$2 = var$1.data;
    $this.$elementData = var$1;
    $this.$firstSlot = var$2.length;
    $this.$loadFactor = 0.75;
    ju_Hashtable_computeMaxSize($this);
},
ju_Hashtable__init_0 = () => {
    let var_0 = new ju_Hashtable();
    ju_Hashtable__init_(var_0);
    return var_0;
},
ju_Hashtable_computeMaxSize = $this => {
    $this.$threshold = ($rt_nullCheck($this.$elementData)).data.length * $this.$loadFactor | 0;
},
ju_Hashtable_get = ($this, $key) => {
    let $hash, $index, var$4, $entry;
    jl_Object_monitorEnterSync($this);
    try {
        $hash = jl_String_hashCode($rt_nullCheck($key));
        $index = $hash & 2147483647;
        var$4 = ($rt_nullCheck($this.$elementData)).data;
        $entry = var$4[$rt_checkBounds($index % var$4.length | 0, var$4)];
        while ($entry !== null) {
            if (ju_Hashtable$Entry_equalsKey($entry, $key, $hash))
                return $entry.$value;
            $entry = $entry.$next;
        }
        return null;
    } finally {
        jl_Object_monitorExitSync($this);
    }
},
ju_Hashtable_put = ($this, $key, $value) => {
    let $result, $hash, var$5, var$6, $index, $entry, $index_0, var$10, var$11, var$12, var$13;
    jl_Object_monitorEnterSync($this);
    try {
        if ($key !== null && $value !== null) {
            $result = $rt_nullCheck($key);
            $hash = jl_String_hashCode($result);
            var$5 = $hash & 2147483647;
            var$6 = ($rt_nullCheck($this.$elementData)).data;
            $index = $rt_checkBounds(var$5 % var$6.length | 0, var$6);
            $entry = var$6[$index];
            while ($entry !== null && !ju_Hashtable$Entry_equalsKey($entry, $key, $hash)) {
                $entry = $entry.$next;
            }
            if ($entry === null) {
                $this.$modCount1 = $this.$modCount1 + 1 | 0;
                $index_0 = $this.$elementCount0 + 1 | 0;
                $this.$elementCount0 = $index_0;
                if ($index_0 > $this.$threshold) {
                    $index_0 = (($rt_nullCheck($this.$elementData)).data.length << 1) + 1 | 0;
                    if (!$index_0)
                        $index_0 = 1;
                    $hash = (-1);
                    var$10 = $rt_createArray(ju_Hashtable$Entry, $index_0);
                    var$11 = $this.$lastSlot + 1 | 0;
                    var$12 = $index_0;
                    while (true) {
                        $index = var$11 + (-1) | 0;
                        if ($index < $this.$firstSlot)
                            break;
                        var$6 = ($rt_nullCheck($this.$elementData)).data;
                        var$11 = $rt_checkBounds($index, var$6);
                        var$13 = var$6[var$11];
                        while (var$13 !== null) {
                            $index = (jl_String_hashCode($rt_nullCheck(var$13.$key)) & 2147483647) % $index_0 | 0;
                            if ($index < var$12)
                                var$12 = $index;
                            if ($index > $hash)
                                $hash = $index;
                            $entry = var$13.$next;
                            var$10 = $rt_nullCheck(var$10);
                            var$6 = var$10.data;
                            $index = $rt_checkBounds($index, var$6);
                            var$13.$next = var$6[$index];
                            var$6[$index] = var$13;
                            var$13 = $entry;
                        }
                    }
                    $this.$firstSlot = var$12;
                    $this.$lastSlot = $hash;
                    $this.$elementData = var$10;
                    ju_Hashtable_computeMaxSize($this);
                    $index = var$5 % ($rt_nullCheck($this.$elementData)).data.length | 0;
                }
                if ($index < $this.$firstSlot)
                    $this.$firstSlot = $index;
                if ($index > $this.$lastSlot)
                    $this.$lastSlot = $index;
                ju_Hashtable_$callClinit();
                $entry = new ju_Hashtable$Entry;
                $entry.$key = $key;
                $entry.$value = $value;
                $entry.$hashcode = jl_String_hashCode($result);
                var$6 = ($rt_nullCheck($this.$elementData)).data;
                $index_0 = $rt_checkBounds($index, var$6);
                $entry.$next = var$6[$index_0];
                var$6[$rt_checkUpperBound($index_0, var$6)] = $entry;
                return null;
            }
            $result = $entry.$value;
            $entry.$value = $value;
            return $result;
        }
        $key = new jl_NullPointerException;
        jl_Exception__init_($key);
        $rt_throw($key);
    } finally {
        jl_Object_monitorExitSync($this);
    }
},
ju_Hashtable__clinit_ = () => {
    ju_Hashtable_EMPTY_ENUMERATION = new ju_Hashtable$1;
    ju_Hashtable_EMPTY_ITERATOR = new ju_Hashtable$2;
};
function ju_Properties() {
    ju_Hashtable.call(this);
    this.$defaults = null;
}
let ju_Properties_getProperty = ($this, $name) => {
    let $result, $property;
    $result = ju_Hashtable_get($this, $name);
    $property = !($result instanceof jl_String) ? null : $result;
    if ($property === null) {
        $result = $this.$defaults;
        if ($result !== null)
            $property = ju_Properties_getProperty($result, $name);
    }
    return $property;
},
otrf_VirtualFileSystemProvider = $rt_classWithoutFields(),
otrf_VirtualFileSystemProvider_instance = null,
otrf_VirtualFileSystemProvider_getInstance = () => {
    let var$1, var$2, var$3, var$4, var$5, var$6;
    if (otrf_VirtualFileSystemProvider_instance === null) {
        var$1 = new otrfm_InMemoryVirtualFileSystem;
        var$2 = new otrfm_InMemoryVirtualDirectory;
        var$2.$lastModified = jl_System_currentTimeMillis();
        var$2.$name2 = $rt_s(15);
        var$3 = new ju_LinkedHashMap;
        jl_Object__init_(var$3);
        var$3.$elementCount1 = 0;
        var$4 = $rt_nullCheck(var$3);
        var$5 = $rt_createArray(ju_LinkedHashMap$LinkedHashMapEntry, 16);
        var$6 = var$5.data;
        var$3.$elementData1 = var$5;
        var$3.$loadFactor0 = 0.75;
        var$3.$threshold0 = var$6.length * 0.75 | 0;
        var$3.$accessOrder = 0;
        var$3.$head0 = null;
        var$2.$children = var$3;
        var$1.$root = var$2;
        var$1.$userDir = $rt_s(10);
        otrf_VirtualFileSystemProvider_instance = var$1;
    }
    return otrf_VirtualFileSystemProvider_instance;
},
ju_Base64 = $rt_classWithoutFields(),
jl_IllegalStateException = $rt_classWithoutFields(jl_RuntimeException),
ji_Flushable = $rt_classWithoutFields(0),
ji_OutputStream = $rt_classWithoutFields();
function ji_FilterOutputStream() {
    ji_OutputStream.call(this);
    this.$out = null;
}
let ji_FilterOutputStream__init_ = ($this, $out) => {
    $this.$out = $out;
},
ji_FilterOutputStream__init_0 = var_0 => {
    let var_1 = new ji_FilterOutputStream();
    ji_FilterOutputStream__init_(var_1, var_0);
    return var_1;
},
ji_DataOutput = $rt_classWithoutFields(0);
function ji_DataOutputStream() {
    let a = this; ji_FilterOutputStream.call(a);
    a.$written = 0;
    a.$buff0 = null;
}
let ji_DataOutputStream__init_0 = ($this, $out) => {
    ji_FilterOutputStream__init_($this, $out);
    $this.$buff0 = $rt_createByteArray(8);
},
ji_DataOutputStream__init_ = var_0 => {
    let var_1 = new ji_DataOutputStream();
    ji_DataOutputStream__init_0(var_1, var_0);
    return var_1;
},
ji_DataOutputStream_writeBoolean = ($this, $val) => {
    let var$2;
    var$2 = $this.$out;
    $val = !$val ? 0 : 1;
    ji_ByteArrayOutputStream_write($rt_nullCheck(var$2), $val);
    $this.$written = $this.$written + 1 | 0;
},
ji_DataOutputStream_writeByte = ($this, $val) => {
    ji_ByteArrayOutputStream_write($rt_nullCheck($this.$out), $val);
    $this.$written = $this.$written + 1 | 0;
},
ji_DataOutputStream_writeInt = ($this, $val) => {
    let var$2, var$3, var$4, var$5;
    var$2 = $this.$buff0;
    var$3 = $val >> 24 << 24 >> 24;
    var$4 = ($rt_nullCheck(var$2)).data;
    var$4[$rt_checkUpperBound(0, var$4)] = var$3;
    var$3 = $val >> 16 << 24 >> 24;
    var$4[$rt_checkUpperBound(1, var$4)] = var$3;
    var$5 = $val >> 8 << 24 >> 24;
    var$4[$rt_checkUpperBound(2, var$4)] = var$5;
    $val = $val << 24 >> 24;
    var$4[$rt_checkUpperBound(3, var$4)] = $val;
    ji_ByteArrayOutputStream_write0($rt_nullCheck($this.$out), var$2, 0, 4);
    $this.$written = $this.$written + 4 | 0;
},
ji_DataOutputStream_writeUTF = ($this, $str) => {
    let var$2, var$3, $offset, var$5, $utfCount, $buffer, var$8, var$9, var$10, var$11, var$12;
    var$2 = 0;
    $str = $rt_nullCheck($str);
    var$3 = $str.$nativeString.length;
    $offset = 0;
    while ($offset < var$3) {
        var$5 = jl_String_charAt($str, $offset);
        var$2 = var$5 > 0 && var$5 <= 127 ? var$2 + 1 | 0 : var$5 > 2047 ? var$2 + 3 | 0 : var$2 + 2 | 0;
        $offset = $offset + 1 | 0;
    }
    $utfCount = Long_fromInt(var$2);
    if (Long_le($utfCount, Long_fromInt(65535))) {
        var$2 = Long_lo($utfCount);
        $buffer = $rt_createByteArray(var$2 + 2 | 0);
        var$8 = $buffer.data;
        var$8[$rt_checkUpperBound(0, var$8)] = var$2 >> 8 << 24 >> 24;
        var$9 = 2;
        var$8[$rt_checkUpperBound(1, var$8)] = var$2 << 24 >> 24;
        var$5 = $str.$nativeString.length;
        var$10 = 0;
        while (var$10 < var$5) {
            var$3 = jl_String_charAt($str, var$10);
            if (var$3 > 0 && var$3 <= 127) {
                var$11 = var$9 + 1 | 0;
                var$8[$rt_checkBounds(var$9, var$8)] = var$3 << 24 >> 24;
            } else if (var$3 <= 2047) {
                $offset = var$9 + 1 | 0;
                var$8[$rt_checkBounds(var$9, var$8)] = (192 | 31 & var$3 >> 6) << 24 >> 24;
                var$11 = $offset + 1 | 0;
                var$8[$rt_checkBounds($offset, var$8)] = (128 | 63 & var$3) << 24 >> 24;
            } else {
                var$12 = var$9 + 1 | 0;
                var$8[$rt_checkBounds(var$9, var$8)] = (224 | 15 & var$3 >> 12) << 24 >> 24;
                $offset = var$12 + 1 | 0;
                var$8[$rt_checkBounds(var$12, var$8)] = (128 | 63 & var$3 >> 6) << 24 >> 24;
                var$11 = $offset + 1 | 0;
                var$8[$rt_checkBounds($offset, var$8)] = (128 | 63 & var$3) << 24 >> 24;
            }
            var$10 = var$10 + 1 | 0;
            var$9 = var$11;
        }
        ji_ByteArrayOutputStream_write0($rt_nullCheck($this.$out), $buffer, 0, var$9);
        $this.$written = $this.$written + var$9 | 0;
        return;
    }
    $str = new ji_IOException;
    jl_Exception__init_0($str, $rt_s(72));
    $rt_throw($str);
};
function ji_ByteArrayOutputStream() {
    let a = this; ji_OutputStream.call(a);
    a.$buf = null;
    a.$count0 = 0;
}
let ji_ByteArrayOutputStream__init_ = $this => {
    $this.$buf = $rt_createByteArray(32);
},
ji_ByteArrayOutputStream__init_0 = () => {
    let var_0 = new ji_ByteArrayOutputStream();
    ji_ByteArrayOutputStream__init_(var_0);
    return var_0;
},
ji_ByteArrayOutputStream_write = ($this, $b) => {
    let var$2, var$3;
    ji_ByteArrayOutputStream_ensureCapacity($this, $this.$count0 + 1 | 0);
    var$2 = $this.$buf;
    var$3 = $this.$count0;
    $this.$count0 = var$3 + 1 | 0;
    $b = $b << 24 >> 24;
    var$2 = ($rt_nullCheck(var$2)).data;
    var$2[$rt_checkBounds(var$3, var$2)] = $b;
},
ji_ByteArrayOutputStream_write0 = ($this, $b, $off, $len) => {
    let $i, var$5, var$6, var$7, var$8;
    ji_ByteArrayOutputStream_ensureCapacity($this, $this.$count0 + $len | 0);
    $i = 0;
    while ($i < $len) {
        var$5 = $this.$buf;
        var$6 = $this.$count0;
        $this.$count0 = var$6 + 1 | 0;
        var$7 = $off + 1 | 0;
        $b = $rt_nullCheck($b);
        var$8 = $b.data;
        $off = var$8[$rt_checkBounds($off, var$8)];
        var$5 = ($rt_nullCheck(var$5)).data;
        var$5[$rt_checkBounds(var$6, var$5)] = $off;
        $i = $i + 1 | 0;
        $off = var$7;
    }
},
ji_ByteArrayOutputStream_ensureCapacity = ($this, $capacity) => {
    let var$2;
    var$2 = ($rt_nullCheck($this.$buf)).data.length;
    if (var$2 < $capacity) {
        $capacity = jl_Math_max($capacity, (var$2 * 3 | 0) / 2 | 0);
        $this.$buf = ju_Arrays_copyOf($this.$buf, $capacity);
    }
},
ji_ByteArrayOutputStream_toByteArray = $this => {
    return ju_Arrays_copyOf($this.$buf, $this.$count0);
},
jlr_Array = $rt_classWithoutFields(),
jlr_Array_getLength = $array => {
    let $array_0, $cls;
    $array_0 = $rt_nullCheck($array);
    $cls = $rt_nullCheck(($rt_nullCheck(jl_Object_getClass($array_0))).$classInfo);
    if ($cls[$rt_meta].itemType === null) {
        $array = new jl_IllegalArgumentException;
        jl_Exception__init_($array);
        $rt_throw($array);
    }
    return $rt_arrayLength($array_0);
},
jl_ArrayStoreException = $rt_classWithoutFields(jl_RuntimeException),
jl_IllegalArgumentException = $rt_classWithoutFields(jl_RuntimeException);
function ju_Base64$Decoder() {
    jl_Object.call(this);
    this.$mapping = null;
}
let otci_Base64Impl = $rt_classWithoutFields(),
otci_Base64Impl_alphabet = null,
otci_Base64Impl_urlAlphabet = null,
otci_Base64Impl_reverse = null,
otci_Base64Impl_urlReverse = null,
otci_Base64Impl_$callClinit = () => {
    otci_Base64Impl_$callClinit = $rt_eraseClinit(otci_Base64Impl);
    otci_Base64Impl__clinit_();
},
otci_Base64Impl_decode0 = ($text, $output, $mapping) => {
    let $inputSize, $i, $triples, var$7, $j, $out, $a, $b, $c, $d, var$14, $rem;
    otci_Base64Impl_$callClinit();
    $text = ($rt_nullCheck($text)).data;
    $inputSize = $text.length;
    $i = $inputSize - 1 | 0;
    while ($i >= 0) {
        $i = $rt_checkBounds($i, $text);
        if ($text[$i] != 61)
            break;
        $inputSize = $inputSize + (-1) | 0;
        $i = $i + (-1) | 0;
    }
    $triples = ($inputSize / 4 | 0) * 4 | 0;
    var$7 = 0;
    $j = 0;
    while (var$7 < $triples) {
        $out = var$7 + 1 | 0;
        $a = otci_Base64Impl_decode($mapping, $text[$rt_checkBounds(var$7, $text)]);
        $i = $out + 1 | 0;
        $b = otci_Base64Impl_decode($mapping, $text[$rt_checkBounds($out, $text)]);
        $out = $i + 1 | 0;
        $c = otci_Base64Impl_decode($mapping, $text[$rt_checkBounds($i, $text)]);
        var$7 = $out + 1 | 0;
        $d = otci_Base64Impl_decode($mapping, $text[$rt_checkBounds($out, $text)]);
        $out = $a << 18 | $b << 12 | $c << 6 | $d;
        $d = $j + 1 | 0;
        $i = ($out >>> 16 | 0) << 24 >> 24;
        $output = $rt_nullCheck($output);
        var$14 = $output.data;
        var$14[$rt_checkBounds($j, var$14)] = $i;
        $i = $d + 1 | 0;
        $j = ($out >>> 8 | 0) << 24 >> 24;
        var$14[$rt_checkBounds($d, var$14)] = $j;
        $j = $i + 1 | 0;
        $d = $out << 24 >> 24;
        var$14[$rt_checkBounds($i, var$14)] = $d;
    }
    $rem = $inputSize - var$7 | 0;
    if ($rem == 2) {
        $d = $rt_checkBounds(var$7, $text);
        $d = (otci_Base64Impl_decode($mapping, $text[$d]) << 2 | (otci_Base64Impl_decode($mapping, $text[$rt_checkBounds($d + 1 | 0, $text)]) >>> 4 | 0)) << 24 >> 24;
        $text = ($rt_nullCheck($output)).data;
        $text[$rt_checkBounds($j, $text)] = $d;
    } else if ($rem == 3) {
        $out = $rt_checkBounds(var$7, $text);
        $a = otci_Base64Impl_decode($mapping, $text[$out]);
        $b = otci_Base64Impl_decode($mapping, $text[$rt_checkBounds($out + 1 | 0, $text)]);
        $c = otci_Base64Impl_decode($mapping, $text[$rt_checkBounds($out + 2 | 0, $text)]);
        $d = ($a << 2 | ($b >>> 4 | 0)) << 24 >> 24;
        $text = ($rt_nullCheck($output)).data;
        $j = $rt_checkBounds($j, $text);
        $text[$j] = $d;
        $d = $j + 1 | 0;
        $text[$rt_checkBounds($d, $text)] = ($b << 4 | ($c >>> 2 | 0)) << 24 >> 24;
    }
},
otci_Base64Impl_decode = ($mapping, $c) => {
    otci_Base64Impl_$callClinit();
    $mapping = ($rt_nullCheck($mapping)).data;
    return $mapping[$rt_checkBounds($c, $mapping)];
},
otci_Base64Impl_encode0 = ($data, $output, $mapping, $pad) => {
    let var$5, $j, $triples, $i, $j_0, var$10, $j_1, $rem, var$13;
    otci_Base64Impl_$callClinit();
    var$5 = ($rt_nullCheck($data)).data;
    $j = var$5.length;
    $triples = ($j / 3 | 0) * 3 | 0;
    $i = 0;
    $j_0 = 0;
    while ($j_0 < $triples) {
        var$10 = $i + 1 | 0;
        $j_1 = $rt_checkBounds($j_0, var$5);
        $rem = otci_Base64Impl_encode($mapping, (var$5[$j_1] >>> 2 | 0) << 24 >> 24);
        $output = $rt_nullCheck($output);
        $data = $output.data;
        $data[$rt_checkBounds($i, $data)] = $rem;
        $rem = var$10 + 1 | 0;
        $j_0 = var$5[$j_1] << 4;
        var$13 = $rt_checkBounds($j_1 + 1 | 0, var$5);
        $j_0 = otci_Base64Impl_encode($mapping, ($j_0 | ((var$5[var$13] & 255) >>> 4 | 0)) << 24 >> 24);
        $data[$rt_checkBounds(var$10, $data)] = $j_0;
        $j_0 = $rem + 1 | 0;
        $i = var$5[var$13] << 2;
        $j_1 = $rt_checkBounds(var$13 + 1 | 0, var$5);
        $i = otci_Base64Impl_encode($mapping, ($i | ((var$5[$j_1] & 255) >>> 6 | 0)) << 24 >> 24);
        $data[$rt_checkBounds($rem, $data)] = $i;
        $i = $j_0 + 1 | 0;
        $rem = otci_Base64Impl_encode($mapping, var$5[$j_1]);
        $data[$rt_checkBounds($j_0, $data)] = $rem;
        $j_0 = $j_1 + 1 | 0;
    }
    $rem = $j - $j_0 | 0;
    if ($rem == 1) {
        $rem = $i + 1 | 0;
        $j = $rt_checkBounds($j_0, var$5);
        $j_0 = otci_Base64Impl_encode($mapping, (var$5[$j] >>> 2 | 0) << 24 >> 24);
        $data = ($rt_nullCheck($output)).data;
        $data[$rt_checkBounds($i, $data)] = $j_0;
        $i = $rem + 1 | 0;
        $data[$rt_checkBounds($rem, $data)] = otci_Base64Impl_encode($mapping, var$5[$j] << 4 << 24 >> 24);
        if ($pad) {
            $pad = $i + 1 | 0;
            $data[$rt_checkBounds($i, $data)] = 61;
            $i = $pad + 1 | 0;
            $data[$rt_checkBounds($pad, $data)] = 61;
        }
    } else if ($rem == 2) {
        $j_1 = $i + 1 | 0;
        $j = $rt_checkBounds($j_0, var$5);
        $rem = otci_Base64Impl_encode($mapping, (var$5[$j] >>> 2 | 0) << 24 >> 24);
        $data = ($rt_nullCheck($output)).data;
        $data[$rt_checkBounds($i, $data)] = $rem;
        $j_0 = $j_1 + 1 | 0;
        $triples = var$5[$j] << 4;
        $j = $rt_checkBounds($j + 1 | 0, var$5);
        $data[$rt_checkBounds($j_1, $data)] = otci_Base64Impl_encode($mapping, ($triples | ((var$5[$j] & 255) >>> 4 | 0)) << 24 >> 24);
        $rem = $j_0 + 1 | 0;
        $data[$rt_checkBounds($j_0, $data)] = otci_Base64Impl_encode($mapping, var$5[$j] << 2 << 24 >> 24);
        if (!$pad)
            $i = $rem;
        else {
            $i = $rem + 1 | 0;
            $data[$rt_checkBounds($rem, $data)] = 61;
        }
    }
    return $i;
},
otci_Base64Impl_encode = ($mapping, $b) => {
    otci_Base64Impl_$callClinit();
    $b = $b & 63;
    $mapping = ($rt_nullCheck($mapping)).data;
    return $mapping[$rt_checkBounds($b, $mapping)];
},
otci_Base64Impl__clinit_ = () => {
    let var$1, var$2, var$3, $i, $c, $c_0;
    var$1 = $rt_createByteArray(64);
    var$2 = var$1.data;
    otci_Base64Impl_alphabet = var$1;
    var$1 = $rt_createByteArray(64);
    var$3 = var$1.data;
    otci_Base64Impl_urlAlphabet = var$1;
    var$1 = $rt_createIntArray(256);
    otci_Base64Impl_reverse = var$1;
    otci_Base64Impl_urlReverse = $rt_createIntArray(256);
    $i = 0;
    $c = 65;
    while ($c <= 90) {
        $c_0 = $c << 24 >> 24;
        $i = $rt_checkBounds($i, var$2);
        var$2[$i] = $c_0;
        $i = $rt_checkUpperBound($i, var$3);
        var$3[$i] = $c_0;
        $i = $i + 1 | 0;
        $c = ($c + 1 | 0) & 65535;
    }
    $c_0 = 97;
    while ($c_0 <= 122) {
        $c = $c_0 << 24 >> 24;
        $i = $rt_checkBounds($i, var$2);
        var$2[$i] = $c;
        $i = $rt_checkUpperBound($i, var$3);
        var$3[$i] = $c;
        $i = $i + 1 | 0;
        $c_0 = ($c_0 + 1 | 0) & 65535;
    }
    $c_0 = 48;
    while ($c_0 <= 57) {
        $c = $c_0 << 24 >> 24;
        $i = $rt_checkBounds($i, var$2);
        var$2[$i] = $c;
        $i = $rt_checkUpperBound($i, var$3);
        var$3[$i] = $c;
        $i = $i + 1 | 0;
        $c_0 = ($c_0 + 1 | 0) & 65535;
    }
    $i = $rt_checkBounds($i, var$2);
    var$2[$i] = 43;
    $i = $rt_checkUpperBound($i, var$3);
    var$3[$i] = 45;
    $c = $rt_checkBounds($i + 1 | 0, var$2);
    var$2[$c] = 47;
    var$3[$rt_checkUpperBound($c, var$3)] = 95;
    ju_Arrays_fill(var$1, (-1));
    ju_Arrays_fill(otci_Base64Impl_urlReverse, (-1));
    $c_0 = 0;
    while (true) {
        var$1 = ($rt_nullCheck(otci_Base64Impl_alphabet)).data;
        if ($c_0 >= var$1.length)
            break;
        var$2 = otci_Base64Impl_reverse;
        $c_0 = $rt_checkBounds($c_0, var$1);
        $i = var$1[$c_0];
        var$1 = ($rt_nullCheck(var$2)).data;
        var$1[$rt_checkBounds($i, var$1)] = $c_0;
        var$1 = otci_Base64Impl_urlReverse;
        var$2 = ($rt_nullCheck(otci_Base64Impl_urlAlphabet)).data;
        $i = $rt_checkUpperBound($c_0, var$2);
        $c_0 = var$2[$i];
        var$1 = ($rt_nullCheck(var$1)).data;
        var$1[$rt_checkBounds($c_0, var$1)] = $i;
        $c_0 = $i + 1 | 0;
    }
},
ju_Arrays = $rt_classWithoutFields(),
ju_Arrays_copyOf = ($array, $length) => {
    let $result, var$4, $sz, $i;
    $result = $rt_createByteArray($length);
    var$4 = $result.data;
    $array = ($rt_nullCheck($array)).data;
    $sz = jl_Math_min($length, $array.length);
    $i = 0;
    while ($i < $sz) {
        $i = $rt_checkBounds($i, $array);
        $length = $array[$i];
        $i = $rt_checkUpperBound($i, var$4);
        var$4[$i] = $length;
        $i = $i + 1 | 0;
    }
    return $result;
},
ju_Arrays_fill = ($a, $val) => {
    let var$3, var$4, var$5, var$6;
    var$3 = 0;
    $a = ($rt_nullCheck($a)).data;
    var$4 = $a.length;
    if (var$3 <= var$4) {
        while (var$3 < var$4) {
            var$5 = var$3 + 1 | 0;
            $a[$rt_checkBounds(var$3, $a)] = $val;
            var$3 = var$5;
        }
        return;
    }
    var$6 = new jl_IllegalArgumentException;
    jl_Exception__init_(var$6);
    $rt_throw(var$6);
},
jl_Iterable = $rt_classWithoutFields(0),
ju_Collection = $rt_classWithoutFields(0),
ju_AbstractCollection = $rt_classWithoutFields(),
ju_SequencedCollection = $rt_classWithoutFields(0),
ju_List = $rt_classWithoutFields(0);
function ju_AbstractList() {
    ju_AbstractCollection.call(this);
    this.$modCount = 0;
}
let ju_RandomAccess = $rt_classWithoutFields(0);
function ju_ArrayList() {
    let a = this; ju_AbstractList.call(a);
    a.$array0 = null;
    a.$size0 = 0;
}
let ju_ArrayList__init_0 = $this => {
    $this.$array0 = $rt_createArray(jl_Object, 10);
},
ju_ArrayList__init_ = () => {
    let var_0 = new ju_ArrayList();
    ju_ArrayList__init_0(var_0);
    return var_0;
},
ju_ArrayList_get = ($this, $index) => {
    let var$2;
    ju_ArrayList_checkIndex($this, $index);
    var$2 = ($rt_nullCheck($this.$array0)).data;
    return var$2[$rt_checkBounds($index, var$2)];
},
ju_ArrayList_add = ($this, $element) => {
    let var$2, var$3, var$4, var$5, var$6, var$7, var$8;
    a: {
        var$2 = $this.$size0 + 1 | 0;
        var$3 = ($rt_nullCheck($this.$array0)).data.length;
        if (var$3 < var$2) {
            var$2 = var$3 >= 1073741823 ? 2147483647 : jl_Math_max(var$2, jl_Math_max(var$3 * 2 | 0, 5));
            var$4 = $rt_nullCheck($this.$array0);
            var$5 = jl_Class_getComponentType($rt_nullCheck(jl_Object_getClass(var$4)));
            if (var$5 !== null) {
                if (var$5 !== $rt_cls($rt_voidcls)) {
                    if (var$2 >= 0) {
                        var$4 = var$4.data;
                        var$6 = otrr_ClassInfo_newArrayInstance($rt_nullCheck(($rt_nullCheck(var$5)).$classInfo), var$2);
                        var$2 = jl_Math_min(var$2, var$4.length);
                        var$7 = 0;
                        while (var$7 < var$2) {
                            var$7 = $rt_checkBounds(var$7, var$4);
                            var$5 = var$4[var$7];
                            var$6 = $rt_nullCheck(var$6);
                            var$8 = var$6.data;
                            var$3 = $rt_checkUpperBound(var$7, var$8);
                            var$8[var$3] = var$5;
                            var$7 = var$3 + 1 | 0;
                        }
                        $this.$array0 = var$6;
                        break a;
                    }
                    $element = new jl_NegativeArraySizeException;
                    jl_Exception__init_($element);
                    $rt_throw($element);
                }
                $element = new jl_IllegalArgumentException;
                jl_Exception__init_($element);
                $rt_throw($element);
            }
            $element = new jl_NullPointerException;
            jl_Exception__init_($element);
            $rt_throw($element);
        }
    }
    var$4 = $this.$array0;
    var$7 = $this.$size0;
    $this.$size0 = var$7 + 1 | 0;
    var$4 = ($rt_nullCheck(var$4)).data;
    var$4[$rt_checkBounds(var$7, var$4)] = $element;
    $this.$modCount = $this.$modCount + 1 | 0;
    return 1;
},
ju_ArrayList_remove = ($this, $index) => {
    let var$2, $i, $old, var$5, $i_0, var$7;
    ju_ArrayList_checkIndex($this, $index);
    var$2 = ($rt_nullCheck($this.$array0)).data;
    $i = $rt_checkBounds($index, var$2);
    $old = var$2[$i];
    var$5 = $this.$size0 - 1 | 0;
    $this.$size0 = var$5;
    while ($i < var$5) {
        $i_0 = $rt_checkBounds($i + 1 | 0, var$2);
        var$7 = var$2[$i_0];
        var$2[$rt_checkBounds($i, var$2)] = var$7;
        $i = $i_0;
    }
    var$7 = null;
    var$2[$rt_checkBounds(var$5, var$2)] = var$7;
    $this.$modCount = $this.$modCount + 1 | 0;
    return $old;
},
ju_ArrayList_checkIndex = ($this, $index) => {
    let var$2;
    if ($index >= 0 && $index < $this.$size0)
        return;
    var$2 = new jl_IndexOutOfBoundsException;
    jl_Exception__init_(var$2);
    $rt_throw(var$2);
},
otrf_VirtualFileSystem = $rt_classWithoutFields(0);
function otrfm_InMemoryVirtualFileSystem() {
    let a = this; jl_Object.call(a);
    a.$root = null;
    a.$userDir = null;
}
function ju_Base64$Encoder() {
    let a = this; jl_Object.call(a);
    a.$mapping0 = null;
    a.$padding = 0;
}
let jl_Math = $rt_classWithoutFields(),
jl_Math_min = ($a, $b) => {
    if ($a < $b)
        $b = $a;
    return $b;
},
jl_Math_max = ($a, $b) => {
    if ($a > $b)
        $b = $a;
    return $b;
},
ju_Enumeration = $rt_classWithoutFields(0),
ju_Hashtable$1 = $rt_classWithoutFields(),
ju_Iterator = $rt_classWithoutFields(0),
ju_Hashtable$2 = $rt_classWithoutFields();
function otrfm_AbstractInMemoryVirtualFile() {
    let a = this; jl_Object.call(a);
    a.$name2 = null;
    a.$lastModified = Long_ZERO;
}
function otrfm_InMemoryVirtualDirectory() {
    otrfm_AbstractInMemoryVirtualFile.call(this);
    this.$children = null;
}
let ju_Map$Entry = $rt_classWithoutFields(0);
function ju_MapEntry() {
    let a = this; jl_Object.call(a);
    a.$key = null;
    a.$value = null;
}
function ju_Hashtable$Entry() {
    let a = this; ju_MapEntry.call(a);
    a.$next = null;
    a.$hashcode = 0;
}
let ju_Hashtable$Entry_equalsKey = ($this, $aKey, $hash) => {
    return !($this.$hashcode == jl_String_hashCode($rt_nullCheck($aKey)) && jl_String_equals($rt_nullCheck($this.$key), $aKey)) ? 0 : 1;
},
ju_AbstractMap = $rt_classWithoutFields();
function ju_HashMap() {
    let a = this; ju_AbstractMap.call(a);
    a.$elementCount1 = 0;
    a.$elementData1 = null;
    a.$loadFactor0 = 0.0;
    a.$threshold0 = 0;
}
let ju_SequencedMap = $rt_classWithoutFields(0);
function ju_LinkedHashMap() {
    let a = this; ju_HashMap.call(a);
    a.$accessOrder = 0;
    a.$head0 = null;
}
let h = $rt_classWithoutFields(),
h_a = 0,
h_$callClinit = () => {
    h_$callClinit = $rt_eraseClinit(h);
    h__clinit_();
},
h_if = () => {
    h_$callClinit();
},
h_a0 = var$1 => {
    h_$callClinit();
    h_a = var$1;
},
h_a1 = (var$1, var$2) => {
    let $$je;
    h_$callClinit();
    a: {
        b: {
            try {
                if (h_a)
                    cnmu_DeviceControl_startVibra(var$1, Long_fromInt(var$2));
                break a;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_IllegalStateException) {
                    break b;
                } else {
                    throw $$e;
                }
            }
        }
        h_a = 0;
    }
},
h__clinit_ = () => {
    h_a = 1;
};
function jl_Thread() {
    let a = this; jl_Object.call(a);
    a.$id = Long_ZERO;
    a.$timeSliceStart = Long_ZERO;
    a.$finishedLock = null;
    a.$name1 = null;
    a.$alive = 0;
    a.$target0 = null;
}
let jl_Thread_mainThread = null,
jl_Thread_currentThread0 = null,
jl_Thread_nextId = 0,
jl_Thread_activeCount = 0,
jl_Thread_defaultUncaughtExceptionHandler = null,
jl_Thread_$callClinit = () => {
    jl_Thread_$callClinit = $rt_eraseClinit(jl_Thread);
    jl_Thread__clinit_();
},
jl_Thread__init_1 = ($this, $target) => {
    jl_Thread_$callClinit();
    jl_Thread__init_($this, $target, null);
},
jl_Thread__init_0 = var_0 => {
    let var_1 = new jl_Thread();
    jl_Thread__init_1(var_1, var_0);
    return var_1;
},
jl_Thread__init_ = ($this, $target, $name) => {
    let var$3;
    jl_Thread_$callClinit();
    $this.$finishedLock = new jl_Object;
    $this.$alive = 1;
    $this.$name1 = $name;
    $this.$target0 = $target;
    var$3 = jl_Thread_nextId;
    jl_Thread_nextId = var$3 + 1 | 0;
    $this.$id = Long_fromInt(var$3);
},
jl_Thread__init_2 = (var_0, var_1) => {
    let var_2 = new jl_Thread();
    jl_Thread__init_(var_2, var_0, var_1);
    return var_2;
},
jl_Thread_setCurrentThread = $thread_0 => {
    let var$2;
    jl_Thread_$callClinit();
    if (jl_Thread_currentThread0 !== $thread_0)
        jl_Thread_currentThread0 = $thread_0;
    $thread_0 = jl_Thread_currentThread0;
    var$2 = jl_System_currentTimeMillis();
    ($rt_nullCheck($thread_0)).$timeSliceStart = var$2;
},
jl_Thread_currentThread = () => {
    jl_Thread_$callClinit();
    return jl_Thread_currentThread0;
},
jl_Thread__clinit_ = () => {
    let var$1;
    var$1 = new jl_Thread;
    jl_Thread_$callClinit();
    jl_Thread__init_(var$1, null, $rt_s(73));
    jl_Thread_mainThread = var$1;
    jl_Thread_currentThread0 = var$1;
    jl_Thread_nextId = 1;
    jl_Thread_activeCount = 1;
    jl_Thread_defaultUncaughtExceptionHandler = new jl_DefaultUncaughtExceptionHandler;
},
jml_Screen = $rt_classWithoutFields(jml_Displayable),
jml_Screen_setTitle = ($this, $title) => {
    $this.$title = $title;
    $this.$dirty = 1;
};
function jml_Form() {
    jml_Screen.call(this);
    this.$items = null;
}
let jml_Form__init_0 = ($this, $title) => {
    jml_Displayable__init_($this);
    $this.$items = ju_ArrayList__init_();
    $this.$title = $title;
},
jml_Form__init_ = var_0 => {
    let var_1 = new jml_Form();
    jml_Form__init_0(var_1, var_0);
    return var_1;
},
jml_Form_append = ($this, $text) => {
    ju_ArrayList_add($rt_nullCheck($this.$items), $text);
    $this.$dirty = 1;
    return ($rt_nullCheck($this.$items)).$size0 - 1 | 0;
},
jml_Form_render = $this => {
    let $i, $item, $text;
    jml_Displayable_render($this);
    $i = 0;
    while (true) {
        $item = $rt_nullCheck($this.$items);
        if ($i >= $item.$size0)
            break;
        $item = ju_ArrayList_get($item, $i);
        if (!($item instanceof jml_TextField))
            mikiPlatform.paragraph($rt_ustr($rt_castToClass($item, jl_String)));
        else {
            $text = $rt_nullCheck($rt_castToClass($item, jml_TextField));
            mikiPlatform.textField($rt_ustr($text.$label0), $rt_ustr($text.$value0), $text.$max0, $i);
        }
        $i = $i + 1 | 0;
    }
},
jml_Item = $rt_classWithoutFields();
function jml_TextField() {
    let a = this; jml_Item.call(a);
    a.$label0 = null;
    a.$max0 = 0;
    a.$value0 = null;
}
let jml_TextField_setString = ($this, $text) => {
    let var$2;
    var$2 = $this.$max0;
    $text = $rt_nullCheck($text);
    $this.$value0 = jl_String_substring($text, 0, jl_Math_min(var$2, $text.$nativeString.length));
};
function a() {
    let a = this; jl_Object.call(a);
    a.$long0 = null;
    a.$if8 = 0;
    a.$char2 = 0;
    a.$for5 = null;
    a.$try2 = 0;
    a.$a28 = 0;
    a.$byte5 = 0;
    a.$goto4 = 0;
    a.$int4 = 0;
    a.$case2 = 0;
}
let a_for = var$0 => {
    return var$0.$long0;
},
a_do = var$0 => {
    return var$0.$if8;
},
a_if0 = var$0 => {
    return var$0.$char2;
},
a_a = (var$0, var$1, var$2, var$3) => {
    let var$4;
    var$4 = var$0.$long0;
    var$1 = var$1 + $rt_imul(var$2, var$0.$if8) | 0;
    var$4 = ($rt_nullCheck(var$4)).data;
    var$4[$rt_checkBounds(var$1, var$4)] = var$3;
},
a_a0 = (var$0, var$1, var$2, var$3, var$4, var$5, var$6, var$7) => {
    let var$8, var$9, var$10, var$11, var$12, var$13, var$14, var$15;
    if (!var$0.$int4) {
        if (var$6 >= 0)
            var$8 = var$6;
        else {
            var$4 = $rt_imul(var$0.$if8, var$0.$try2);
            var$8 = (var$6 % var$4 | 0) + var$4 | 0;
        }
    } else if (var$6 < 0)
        var$8 = 0;
    else {
        var$8 = $rt_imul(var$0.$if8, var$0.$try2) - var$4 | 0;
        if (var$6 < var$8)
            var$8 = var$6;
    }
    if (!var$0.$case2) {
        if (var$7 >= 0)
            var$5 = var$7;
        else {
            var$4 = $rt_imul(var$0.$char2, var$0.$a28);
            var$5 = (var$7 % var$4 | 0) + var$4 | 0;
        }
    } else if (var$7 < 0)
        var$5 = 0;
    else {
        var$5 = $rt_imul(var$0.$char2, var$0.$a28) - var$5 | 0;
        if (var$7 < var$5)
            var$5 = var$7;
    }
    var$6 = var$0.$try2;
    var$7 = var$8 / var$6 | 0;
    var$4 = var$0.$a28;
    var$9 = var$5 / var$4 | 0;
    var$6 = var$8 % var$6 | 0;
    var$4 = var$5 % var$4 | 0;
    var$2 = var$2 - var$6 | 0;
    var$10 = var$3 - var$4 | 0;
    var$3 = var$0.$goto4;
    var$4 = 0;
    var$5 = var$9 + var$3 | 0;
    var$6 = var$0.$char2;
    if (var$5 <= var$6)
        var$5 = var$3;
    else {
        var$5 = var$6 - var$9 | 0;
        var$4 = var$3 - var$5 | 0;
    }
    var$3 = var$0.$byte5;
    var$6 = 0;
    var$8 = var$7 + var$3 | 0;
    var$11 = var$0.$if8;
    if (var$8 <= var$11)
        var$8 = var$3;
    else {
        var$8 = var$11 - var$7 | 0;
        var$6 = var$3 - var$8 | 0;
    }
    var$1 = $rt_nullCheck(var$1);
    var$12 = jml_Graphics_getClipX(var$1);
    var$13 = jml_Graphics_getClipY(var$1);
    var$14 = var$1.$cw;
    var$15 = var$1.$ch;
    a_if(var$0, var$1, var$2, var$10, var$7, var$9, var$8, var$5);
    if (!var$0.$int4 && var$6 > 0) {
        jml_Graphics_setClip(var$1, var$12, var$13, var$14, var$15);
        a_if(var$0, var$1, var$2 + $rt_imul(var$8, var$0.$try2) | 0, var$10, 0, var$9, var$6, var$5);
    }
    if (!var$0.$case2 && var$4 > 0) {
        jml_Graphics_setClip(var$1, var$12, var$13, var$14, var$15);
        a_if(var$0, var$1, var$2, var$10 + $rt_imul(var$5, var$0.$a28) | 0, var$7, 0, var$8, var$4);
    }
    if (!var$0.$int4 && !var$0.$case2 && var$6 > 0 && var$4 > 0) {
        jml_Graphics_setClip(var$1, var$12, var$13, var$14, var$15);
        a_if(var$0, var$1, var$2 + $rt_imul(var$8, var$0.$try2) | 0, var$10 + $rt_imul(var$5, var$0.$a28) | 0, 0, 0, var$6, var$4);
    }
    jml_Graphics_setClip(var$1, var$12, var$13, var$14, var$15);
},
a_if = (var$0, var$1, var$2, var$3, var$4, var$5, var$6, var$7) => {
    let var$8, var$9, var$10, var$11, var$12, var$13, var$14, var$15, var$16, var$17, var$18, var$19, var$20;
    var$8 = $rt_nullCheck(var$1);
    var$9 = jml_Graphics_getClipX(var$8);
    var$10 = jml_Graphics_getClipY(var$8);
    var$11 = var$8.$cw;
    var$12 = var$8.$ch;
    var$13 = jml_Image_getWidth($rt_nullCheck(var$0.$for5));
    var$14 = var$4 + $rt_imul(var$5, var$0.$if8) | 0;
    var$15 = 0;
    while (var$15 < var$7) {
        var$16 = 0;
        var$17 = var$2;
        var$4 = var$14;
        while (var$16 < var$6) {
            var$18 = ($rt_nullCheck(var$0.$long0)).data;
            var$19 = $rt_checkBounds(var$4, var$18);
            var$20 = var$18[var$19];
            if (var$20) {
                jml_Graphics_setClip(var$8, var$9, var$10, var$11, var$12);
                jml_Graphics_clipRect(var$8, var$17, var$3, var$0.$try2, var$0.$a28);
                var$4 = $rt_imul( -var$20 | 0, var$0.$try2);
                var$5 = var$4 % var$13 | 0;
                var$4 = $rt_imul(var$4 / var$13 | 0, var$0.$a28);
                jml_Graphics_drawImage(var$8, var$0.$for5, var$17 + var$5 | 0, var$3 + var$4 | 0, 20);
            }
            var$17 = var$17 + var$0.$try2 | 0;
            var$16 = var$16 + 1 | 0;
            var$4 = var$19 + 1 | 0;
        }
        var$3 = var$3 + var$0.$a28 | 0;
        var$14 = var$14 + var$0.$if8 | 0;
        var$15 = var$15 + 1 | 0;
    }
};
function f() {
    let a = this; jl_Object.call(a);
    a.$goto2 = 0;
    a.$else2 = 0;
    a.$new4 = null;
    a.$if12 = 0;
    a.$byte6 = 0;
    a.$char4 = 0;
    a.$void2 = 0;
    a.$null2 = null;
    a.$a32 = 0;
    a.$long2 = 0;
    a.$c4 = 0;
    a.$b2 = 0;
}
let f_for = var$0 => {
    return var$0.$goto2;
},
f_do = var$0 => {
    return var$0.$else2;
},
f_a = (var$0, var$1, var$2, var$3, var$4, var$5, var$6) => {
    let var$7, var$8, var$9, var$10, var$11, var$12, var$13, var$14, var$15, var$16;
    a: {
        var$0.$goto2 = var$5;
        var$0.$else2 = var$6;
        var$0.$c4 = 0;
        var$0.$b2 = 0;
        if (var$5) {
            var$7 = var$1 + var$5 | 0;
            if (var$5 <= 0)
                var$8 = var$1;
            else {
                var$8 = var$1 + var$3 | 0;
                var$7 = var$7 + var$3 | 0;
            }
            var$9 = var$0.$char4;
            var$8 = var$8 / var$9 | 0;
            var$10 = var$0.$a32;
            var$8 = var$8 >> var$10;
            var$7 = (var$7 / var$9 | 0) >> var$10;
            if (var$8 != var$7) {
                var$8 = var$0.$void2;
                var$11 = (var$2 / var$8 | 0) >> var$10;
                var$8 = ((var$2 + var$4 | 0) / var$8 | 0) >> var$10;
                var$12 = var$0.$if12;
                var$13 = var$7 + $rt_imul(var$11, var$12) | 0;
                b: {
                    while (true) {
                        if (var$11 > var$8)
                            break a;
                        var$14 = var$0.$null2;
                        var$15 = ($rt_nullCheck(var$0.$new4)).data;
                        var$16 = $rt_checkBounds(var$13, var$15);
                        var$13 = var$15[var$16];
                        var$14 = ($rt_nullCheck(var$14)).data;
                        var$13 = var$14[$rt_checkBounds(var$13, var$14)];
                        if (var$13) {
                            if (var$5 > 0 && !(var$13 & 2))
                                break b;
                            if (var$5 < 0 && !(var$13 & 4))
                                break;
                        }
                        var$11 = var$11 + 1 | 0;
                        var$13 = var$16 + var$12 | 0;
                    }
                    var$0.$goto2 = ( -var$1 | 0) % (var$9 << var$10) | 0;
                    var$0.$c4 = 1;
                    break a;
                }
                var$0.$goto2 = ((($rt_imul(var$7, var$9) - (var$3 >> var$10) | 0) - (var$1 >> var$10) | 0) - 1 | 0) << var$10;
                var$0.$c4 = 1;
            }
        }
    }
    c: {
        if (var$6) {
            var$8 = var$2 + var$6 | 0;
            if (var$6 <= 0)
                var$7 = var$2;
            else {
                var$7 = var$2 + var$4 | 0;
                var$8 = var$8 + var$4 | 0;
            }
            var$5 = var$0.$void2;
            var$11 = var$7 / var$5 | 0;
            var$7 = var$0.$a32;
            var$11 = var$11 >> var$7;
            var$8 = (var$8 / var$5 | 0) >> var$7;
            if (var$11 != var$8) {
                var$12 = var$0.$char4;
                var$11 = (var$1 / var$12 | 0) >> var$7;
                var$12 = ((var$1 + var$3 | 0) / var$12 | 0) >> var$7;
                var$1 = var$11 + $rt_imul(var$8, var$0.$if12) | 0;
                d: {
                    while (true) {
                        if (var$11 > var$12)
                            break c;
                        var$15 = var$0.$null2;
                        var$14 = ($rt_nullCheck(var$0.$new4)).data;
                        var$1 = $rt_checkBounds(var$1, var$14);
                        var$3 = var$14[var$1];
                        var$14 = ($rt_nullCheck(var$15)).data;
                        var$3 = var$14[$rt_checkBounds(var$3, var$14)];
                        if (var$3) {
                            if (var$6 > 0 && !(var$3 & 8))
                                break d;
                            if (var$6 < 0 && !(var$3 & 16))
                                break;
                        }
                        var$11 = var$11 + 1 | 0;
                        var$1 = var$1 + 1 | 0;
                    }
                    var$0.$else2 = ( -var$2 | 0) % (var$5 << var$7) | 0;
                    var$0.$b2 = 1;
                    break c;
                }
                var$0.$else2 = ((($rt_imul(var$8, var$5) - (var$4 >> var$7) | 0) - (var$2 >> var$7) | 0) - 1 | 0) << var$7;
                var$0.$b2 = 1;
            }
        }
    }
    return !(!var$0.$c4 && !var$0.$b2) ? 1 : 0;
};
function e() {
    let a = this; jl_Object.call(a);
    a.$char5 = null;
    a.$c1 = 0;
    a.$d1 = 0;
    a.$byte3 = null;
    a.$a31 = null;
    a.$null1 = null;
    a.$new3 = null;
    a.$for4 = null;
    a.$e0 = null;
    a.$void0 = null;
    a.$case3 = null;
    a.$f0 = 0;
    a.$int6 = 0;
    a.$goto3 = null;
    a.$do7 = 0;
    a.$if13 = 0;
    a.$b0 = 0;
    a.$try4 = 0;
    a.$long3 = 0;
    a.$else1 = null;
}
let e__init_ = (var$0, var$1, var$2) => {
    var$0.$goto3 = jml_Font_getFont(64, 0, 8);
    var$0.$char5 = var$1;
    var$0.$else1 = var$2;
    var$1 = jml_Image_createImage($rt_s(74));
    var$0.$case3 = var$1;
    var$0.$f0 = jml_Image_getWidth($rt_nullCheck(var$1)) / 4 | 0;
    var$0.$int6 = jml_Image_getHeight($rt_nullCheck(var$0.$case3));
},
e__init_0 = (var_0, var_1) => {
    let var_2 = new e();
    e__init_(var_2, var_0, var_1);
    return var_2;
},
e_if = var$0 => {
    let var$1, $$je;
    a: {
        b: {
            try {
                var$1 = var$0.$e0;
                if (var$1 !== null)
                    ji_FilterInputStream_close($rt_nullCheck(var$1));
                break a;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_Exception) {
                    break b;
                } else {
                    throw $$e;
                }
            }
        }
    }
    var$0.$e0 = null;
},
e_a0 = (var$0, var$1) => {
    let var$2, var$3, var$4, var$5, var$6, var$7, var$8, $$je;
    a: {
        b: {
            try {
                c: {
                    try {
                        var$0.$void0 = $rt_createBooleanArray(GameMIDlet_int());
                        var$2 = ji_DataInputStream__init_(w_Resources_open(jl_Object_getClass(var$0), jl_StringBuffer_toString($rt_nullCheck(jl_StringBuffer_append($rt_nullCheck(jl_StringBuffer_append(jl_StringBuffer__init_(), $rt_s(10))), var$1)))));
                        var$0.$e0 = var$2;
                        var$3 = ji_DataInputStream_readByte(var$2);
                        var$0.$byte3 = $rt_createBooleanArray(var$3);
                        var$0.$a31 = $rt_createByteArray(var$3);
                        var$0.$null1 = $rt_createByteArray(var$3);
                        var$0.$new3 = $rt_createShortArray(var$3);
                        var$0.$for4 = $rt_createShortArray(var$3);
                        var$4 = 0;
                        while (var$4 < var$3) {
                            var$5 = var$0.$a31;
                            var$6 = ji_DataInputStream_readByte($rt_nullCheck(var$0.$e0));
                            var$5 = ($rt_nullCheck(var$5)).data;
                            var$7 = $rt_checkBounds(var$4, var$5);
                            var$5[var$7] = var$6;
                            var$4 = var$7 + 1 | 0;
                        }
                        var$0.$d1 = ji_DataInputStream_readByte($rt_nullCheck(var$0.$e0));
                        break a;
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        if ($$je instanceof jl_Exception) {
                            var$1 = $$je;
                            break c;
                        } else {
                            throw $$e;
                        }
                    }
                }
                d: {
                    e: {
                        try {
                            var$8 = var$0.$e0;
                            if (var$8 !== null)
                                ji_FilterInputStream_close($rt_nullCheck(var$8));
                            break d;
                        } catch ($$e) {
                            $$je = $rt_wrapException($$e);
                            if ($$je instanceof jl_Exception) {
                                break e;
                            } else {
                                throw $$e;
                            }
                        }
                    }
                }
                var$0.$e0 = null;
                jl_Throwable_printStackTrace(var$1);
                break a;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                var$1 = $$je;
                break b;

            }
        }
        $rt_throw(var$1);
    }
    var$0.$c1 = 0;
    var$0.$d1 = 0;
},
e_a3 = var$0 => {
    return var$0.$d1 != (-1) ? 0 : 1;
},
e_a2 = (var$0, var$1, var$2) => {
    let var$3, var$4, var$5, var$6, var$7, $$je;
    var$0.$c1 = var$0.$c1 + 1 | 0;
    a: {
        b: {
            try {
                while (true) {
                    var$1 = var$0.$d1;
                    if (var$1 == (-1))
                        break;
                    if (var$0.$c1 < var$1)
                        break;
                    c: {
                        d: {
                            e: {
                                f: {
                                    g: {
                                        h: {
                                            i: {
                                                j: {
                                                    k: {
                                                        switch (ji_DataInputStream_readByte($rt_nullCheck(var$0.$e0))) {
                                                            case -1:
                                                                break;
                                                            case 0:
                                                                break e;
                                                            case 1:
                                                                break i;
                                                            case 2:
                                                                break f;
                                                            case 3:
                                                                break d;
                                                            case 4:
                                                                break j;
                                                            case 5:
                                                                break k;
                                                            case 6:
                                                                break h;
                                                            case 7:
                                                                break g;
                                                            default:
                                                                break c;
                                                        }
                                                        break c;
                                                    }
                                                    ji_DataInputStream_readByte($rt_nullCheck(var$0.$e0));
                                                    break c;
                                                }
                                                c_a3(ji_DataInputStream_readByte($rt_nullCheck(var$0.$e0)));
                                                break c;
                                            }
                                            var$1 = ji_DataInputStream_readByte($rt_nullCheck(var$0.$e0));
                                            var$3 = ($rt_nullCheck(var$0.$byte3)).data;
                                            var$3[$rt_checkBounds(var$1, var$3)] = 0;
                                            break c;
                                        }
                                        var$1 = ji_DataInputStream_readByte($rt_nullCheck(var$0.$e0));
                                        var$3 = ($rt_nullCheck(var$0.$void0)).data;
                                        var$3[$rt_checkBounds(var$1, var$3)] = 1;
                                        break c;
                                    }
                                    var$1 = ji_DataInputStream_readByte($rt_nullCheck(var$0.$e0));
                                    var$3 = ($rt_nullCheck(var$0.$void0)).data;
                                    var$3[$rt_checkBounds(var$1, var$3)] = 0;
                                    break c;
                                }
                                var$0.$do7 = $rt_imul(ji_DataInputStream_readShort($rt_nullCheck(var$0.$e0)), ($rt_nullCheck(var$0.$else1)).$cl) >> 4;
                                var$0.$if13 = $rt_imul(ji_DataInputStream_readShort($rt_nullCheck(var$0.$e0)), ($rt_nullCheck(var$0.$else1)).$ck) >> 4;
                                break c;
                            }
                            var$1 = ji_DataInputStream_readByte($rt_nullCheck(var$0.$e0));
                            var$2 = ji_DataInputStream_readShort($rt_nullCheck(var$0.$e0));
                            var$4 = ji_DataInputStream_readShort($rt_nullCheck(var$0.$e0));
                            var$3 = ($rt_nullCheck(var$0.$new3)).data;
                            var$1 = $rt_checkBounds(var$1, var$3);
                            var$3[var$1] = var$2;
                            var$3 = ($rt_nullCheck(var$0.$for4)).data;
                            var$2 = $rt_checkUpperBound(var$1, var$3);
                            var$3[var$2] = var$4;
                            var$3 = ($rt_nullCheck(var$0.$byte3)).data;
                            var$3[$rt_checkUpperBound(var$2, var$3)] = 1;
                            break c;
                        }
                        var$1 = ji_DataInputStream_readByte($rt_nullCheck(var$0.$e0));
                        var$2 = ji_DataInputStream_readByte($rt_nullCheck(var$0.$e0));
                        var$4 = ji_DataInputStream_readByte($rt_nullCheck(var$0.$e0));
                        var$5 = ji_DataInputStream_readByte($rt_nullCheck(var$0.$e0));
                        var$3 = ($rt_nullCheck(var$0.$new3)).data;
                        var$6 = $rt_checkBounds(var$1, var$3);
                        var$3[var$6] = (var$3[var$6] + var$2 | 0) << 16 >> 16;
                        var$3 = ($rt_nullCheck(var$0.$for4)).data;
                        var$2 = $rt_checkUpperBound(var$6, var$3);
                        var$3[var$2] = (var$3[var$2] + var$4 | 0) << 16 >> 16;
                        var$3 = ($rt_nullCheck(var$0.$null1)).data;
                        var$3[$rt_checkUpperBound(var$2, var$3)] = var$5;
                    }
                    var$0.$c1 = var$0.$d1;
                    var$1 = ji_DataInputStream_readByte($rt_nullCheck(var$0.$e0));
                    if (var$1 < 0) {
                        var$0.$d1 = (-1);
                        continue;
                    }
                    var$0.$d1 = var$0.$d1 + var$1 | 0;
                }
                break a;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_Exception) {
                    var$7 = $$je;
                    break b;
                } else {
                    throw $$e;
                }
            }
        }
        jl_Throwable_printStackTrace(var$7);
    }
},
e_if0 = (var$0, var$1) => {
    let var$2, var$3, var$4, var$5, var$6, var$7, var$8, var$9, var$10, var$11;
    var$2 = 0;
    while (true) {
        var$3 = ($rt_nullCheck(var$0.$a31)).data;
        if (var$2 >= var$3.length)
            break;
        a: {
            var$4 = ($rt_nullCheck(var$0.$byte3)).data;
            var$5 = $rt_checkBounds(var$2, var$4);
            if (var$4[var$5]) {
                b: {
                    c: {
                        d: {
                            e: {
                                f: {
                                    g: {
                                        h: {
                                            i: {
                                                var$4 = ($rt_nullCheck(var$0.$new3)).data;
                                                var$6 = $rt_checkUpperBound(var$5, var$4);
                                                var$2 = var$4[var$6];
                                                var$7 = $rt_nullCheck(var$0.$else1);
                                                var$2 = ($rt_imul(var$2, var$7.$cl) >> 4) - var$0.$do7 | 0;
                                                var$4 = ($rt_nullCheck(var$0.$for4)).data;
                                                var$8 = $rt_checkUpperBound(var$6, var$4);
                                                var$9 = ($rt_imul(var$4[var$8], var$7.$ck) >> 4) - var$0.$if13 | 0;
                                                var$5 = $rt_checkUpperBound(var$8, var$3);
                                                switch (var$3[var$5]) {
                                                    case 0:
                                                        break i;
                                                    case 1:
                                                        break g;
                                                    case 2:
                                                        break f;
                                                    case 3:
                                                        break c;
                                                    case 4:
                                                        break e;
                                                    case 5:
                                                        break d;
                                                    case 6:
                                                        break b;
                                                    case 7:
                                                    case 8:
                                                    case 9:
                                                    case 10:
                                                        break h;
                                                    default:
                                                }
                                                break a;
                                            }
                                            var$6 = var$7.$a00;
                                            var$8 = var$9 - var$6 | 0;
                                            var$10 = var$7.$aP;
                                            var$1 = $rt_nullCheck(var$1);
                                            jml_Graphics_setClip(var$1, var$2, var$8, var$10, var$6);
                                            var$11 = $rt_nullCheck(var$0.$else1);
                                            var$7 = var$11.$aR;
                                            var$4 = ($rt_nullCheck(var$0.$null1)).data;
                                            var$5 = $rt_checkUpperBound(var$5, var$4);
                                            jml_Graphics_drawImage(var$1, var$7, var$2 - $rt_imul(var$4[var$5], var$11.$aP) | 0, var$9, 36);
                                            break a;
                                        }
                                        var$6 = var$0.$int6;
                                        var$8 = var$9 - var$6 | 0;
                                        var$10 = var$0.$f0;
                                        var$1 = $rt_nullCheck(var$1);
                                        jml_Graphics_setClip(var$1, var$2, var$8, var$10, var$6);
                                        var$11 = var$0.$case3;
                                        var$6 = var$0.$f0;
                                        var$4 = ($rt_nullCheck(var$0.$a31)).data;
                                        var$5 = $rt_checkUpperBound(var$5, var$4);
                                        jml_Graphics_drawImage(var$1, var$11, var$2 - $rt_imul(var$6, var$4[var$5] - 7 | 0) | 0, var$9, 36);
                                        break a;
                                    }
                                    var$6 = var$7.$a00;
                                    var$8 = var$9 - var$6 | 0;
                                    var$10 = var$7.$aP;
                                    var$1 = $rt_nullCheck(var$1);
                                    jml_Graphics_setClip(var$1, var$2, var$8, var$10, var$6);
                                    var$11 = $rt_nullCheck(var$0.$else1);
                                    var$7 = var$11.$aR;
                                    var$4 = ($rt_nullCheck(var$0.$null1)).data;
                                    var$5 = $rt_checkUpperBound(var$5, var$4);
                                    jml_Graphics_drawImage(var$1, var$7, var$2 - $rt_imul(4 + var$4[var$5] | 0, var$11.$aP) | 0, var$9, 36);
                                    break a;
                                }
                                var$11 = $rt_nullCheck(var$7.$c3);
                                var$6 = jml_Image_getHeight($rt_nullCheck(var$7.$b4));
                                var$8 = var$9 - var$6 | 0;
                                var$1 = $rt_nullCheck(var$1);
                                jml_Graphics_setClip(var$1, var$2, var$8, 40, var$6);
                                var$4 = ($rt_nullCheck(var$0.$null1)).data;
                                var$5 = $rt_checkUpperBound(var$5, var$4);
                                var$2 = var$2 - (40 * var$4[var$5] | 0) | 0;
                                jml_Graphics_drawImage(var$1, ($rt_nullCheck(var$0.$else1)).$b4, var$2, var$9, 36);
                                break a;
                            }
                            var$6 = var$7.$bZ;
                            var$8 = var$7.$cU;
                            var$10 = var$9 - var$8 | 0;
                            var$1 = $rt_nullCheck(var$1);
                            jml_Graphics_setClip(var$1, var$2, var$10, var$6, var$8);
                            var$6 =  -var$6 | 0;
                            var$4 = ($rt_nullCheck(var$0.$null1)).data;
                            var$5 = $rt_checkUpperBound(var$5, var$4);
                            var$2 = var$2 + $rt_imul(var$6, 1 + var$4[var$5] | 0) | 0;
                            jml_Graphics_drawImage(var$1, ($rt_nullCheck(var$0.$else1)).$K, var$2, var$9, 36);
                            break a;
                        }
                        var$4 = ($rt_nullCheck(var$0.$null1)).data;
                        var$5 = $rt_checkUpperBound(var$5, var$4);
                        if (var$4[var$5])
                            break a;
                        var$6 = var$7.$bZ;
                        var$8 = var$7.$cU;
                        var$10 = var$9 - var$8 | 0;
                        var$1 = $rt_nullCheck(var$1);
                        jml_Graphics_setClip(var$1, var$2, var$10, var$6, var$8);
                        jml_Graphics_drawImage(var$1, ($rt_nullCheck(var$0.$else1)).$K, var$2, var$9, 36);
                        break a;
                    }
                    var$11 = $rt_nullCheck(var$7.$c3);
                    var$6 = jml_Image_getHeight($rt_nullCheck(var$7.$b4));
                    var$8 = var$9 - var$6 | 0;
                    var$1 = $rt_nullCheck(var$1);
                    jml_Graphics_setClip(var$1, var$2, var$8, 31, var$6);
                    var$4 = ($rt_nullCheck(var$0.$null1)).data;
                    var$5 = $rt_checkUpperBound(var$5, var$4);
                    var$2 = var$2 - (80 + (31 * var$4[var$5] | 0) | 0) | 0;
                    jml_Graphics_drawImage(var$1, ($rt_nullCheck(var$0.$else1)).$b4, var$2, var$9, 36);
                    break a;
                }
                var$6 = jml_Image_getWidth($rt_nullCheck(var$7.$bP)) / 2 | 0;
                var$8 = jml_Image_getHeight($rt_nullCheck(($rt_nullCheck(var$0.$else1)).$bP));
                var$10 = var$9 - var$8 | 0;
                var$1 = $rt_nullCheck(var$1);
                jml_Graphics_setClip(var$1, var$2, var$10, var$6, var$8);
                var$4 = ($rt_nullCheck(var$0.$null1)).data;
                var$5 = $rt_checkUpperBound(var$5, var$4);
                var$2 = var$2 - $rt_imul(var$6, var$4[var$5]) | 0;
                jml_Graphics_drawImage(var$1, ($rt_nullCheck(var$0.$else1)).$bP, var$2, var$9, 36);
            }
        }
        var$2 = var$5 + 1 | 0;
    }
},
e_a1 = (var$0, var$1) => {
    let var$2, var$3, var$4;
    var$2 = 0;
    while (true) {
        var$3 = ($rt_nullCheck(var$0.$void0)).data;
        if (var$2 >= var$3.length)
            break;
        var$4 = $rt_checkBounds(var$2, var$3);
        if (var$3[var$4])
            e_a(var$0, var$1, GameMIDlet_a(var$4));
        var$2 = var$4 + 1 | 0;
    }
},
e_a = (var$0, var$1, var$2) => {
    let var$3, var$4, var$5, var$6, var$7, var$8, var$9, var$10, var$11, var$12, var$13, var$14, var$15;
    var$3 = var$0.$b0;
    var$4 = var$0.$try4;
    var$1 = $rt_nullCheck(var$1);
    jml_Graphics_setClip(var$1, 0, 0, var$3, var$4);
    var$5 = var$0.$goto3;
    var$1.$font = var$5;
    var$6 = mikiPlatform.measure($rt_ustr(var$2), ($rt_nullCheck(var$5)).$size1) + 4 | 0;
    var$7 = jml_Font_getHeight($rt_nullCheck(var$0.$goto3)) + 4 | 0;
    var$8 = (var$0.$try4 / 2 | 0) + 3 | 0;
    jml_Graphics_setColor(var$1, 99, 48, 0);
    var$4 = var$0.$b0 / 2 | 0;
    var$3 = var$6 / 2 | 0;
    var$4 = (var$4 - var$3 | 0) - 1 | 0;
    var$9 = ((var$8 - var$7 | 0) + 2 | 0) - 1 | 0;
    var$10 = var$6 + 2 | 0;
    var$11 = var$7 + 2 | 0;
    jml_Graphics_fillRect(var$1, var$4, var$9, var$10, var$11);
    jml_Graphics_setColor(var$1, 255, 255, 255);
    var$6 = ((var$0.$b0 / 2 | 0) - var$3 | 0) - 1 | 0;
    var$3 = var$1.$target;
    var$4 = var$6 + var$1.$tx | 0;
    var$9 = var$9 + var$1.$ty | 0;
    var$7 = var$1.$color;
    var$12 = var$1.$cx;
    var$13 = var$1.$cy;
    var$14 = var$1.$cw;
    var$15 = var$1.$ch;
    mikiPlatform.rect(var$3, var$4, var$9, var$10, var$11, var$7, !!0, var$12, var$13, var$14, var$15);
    jml_Graphics_drawString(var$1, var$2, var$0.$b0 / 2 | 0, var$8, 33);
},
ju_HashMap$HashEntry = $rt_classWithoutFields(ju_MapEntry),
ju_LinkedHashMap$LinkedHashMapEntry = $rt_classWithoutFields(ju_HashMap$HashEntry),
cnmu_DeviceControl = $rt_classWithoutFields(),
cnmu_DeviceControl_startVibra = ($strength, $duration) => {
    mikiPlatform.vibrate(Long_lo($duration));
};
function jml_Command() {
    let a = this; jl_Object.call(a);
    a.$label = null;
    a.$type = 0;
    a.$priority = 0;
}
let jml_Command__init_0 = ($this, $label, $type, $priority) => {
    $this.$label = $label;
    $this.$type = $type;
    $this.$priority = $priority;
},
jml_Command__init_ = (var_0, var_1, var_2) => {
    let var_3 = new jml_Command();
    jml_Command__init_0(var_3, var_0, var_1, var_2);
    return var_3;
};
function jml_Font() {
    jl_Object.call(this);
    this.$size1 = 0;
}
let jml_Font_getFont = ($face, $style, $size) => {
    let var$4;
    var$4 = new jml_Font;
    var$4.$size1 = $size == 8 ? 10 : $size != 16 ? 12 : 14;
    return var$4;
},
jml_Font_getHeight = $this => {
    return $this.$size1 + 2 | 0;
};
function jml_List() {
    let a = this; jml_Screen.call(a);
    a.$items0 = null;
    a.$selected = 0;
}
let jml_List_SELECT_COMMAND = null,
jml_List_$callClinit = () => {
    jml_List_$callClinit = $rt_eraseClinit(jml_List);
    jml_List__clinit_();
},
jml_List_append = ($this, $label, $image) => {
    ju_ArrayList_add($rt_nullCheck($this.$items0), $label);
    $this.$dirty = 1;
    return ($rt_nullCheck($this.$items0)).$size0 - 1 | 0;
},
jml_List_render = $this => {
    let $i, var$2;
    jml_Displayable_render($this);
    $i = 0;
    while (true) {
        var$2 = $rt_nullCheck($this.$items0);
        if ($i >= var$2.$size0)
            break;
        mikiPlatform.listItem($rt_ustr($rt_castToClass(ju_ArrayList_get(var$2, $i), jl_String)), $i);
        $i = $i + 1 | 0;
    }
},
jml_List__clinit_ = () => {
    jml_List_SELECT_COMMAND = jml_Command__init_($rt_s(75), 1, 0);
};
function ji_PrintStream() {
    let a = this; ji_FilterOutputStream.call(a);
    a.$autoFlush = 0;
    a.$sb = null;
    a.$buffer0 = null;
    a.$charset = null;
}
let otcic_JsConsolePrintStream = $rt_classWithoutFields(ji_PrintStream),
otcic_JSStderrPrintStream = $rt_classWithoutFields(otcic_JsConsolePrintStream),
otcic_JSStderrPrintStream_print = ($this, $s) => {
    if ($s === null)
        $s = $rt_s(3);
    $rt_putStderr($rt_ustr($s));
};
function jl_Object$Monitor() {
    let a = this; jl_Object.call(a);
    a.$enteringThreads = null;
    a.$notifyListeners = null;
    a.$owner = null;
    a.$count = 0;
}
let jl_IllegalMonitorStateException = $rt_classWithoutFields(jl_RuntimeException),
jl_Thread$UncaughtExceptionHandler = $rt_classWithoutFields(0),
jl_DefaultUncaughtExceptionHandler = $rt_classWithoutFields(),
ji_UTFDataFormatException = $rt_classWithoutFields(ji_IOException),
otp_PlatformRunnable = $rt_classWithoutFields(0);
function jl_Object$monitorExit$lambda$_8_1() {
    jl_Object.call(this);
    this.$_0 = null;
}
let jnc_Charset = $rt_classWithoutFields(),
oti_AsyncCallback = $rt_classWithoutFields(0);
function otpp_AsyncCallbackWrapper() {
    jl_Object.call(this);
    this.$realAsyncCallback = null;
}
let otpp_AsyncCallbackWrapper_create = $realAsyncCallback => {
    let var$2;
    var$2 = new otpp_AsyncCallbackWrapper;
    var$2.$realAsyncCallback = $realAsyncCallback;
    return var$2;
},
otpp_AsyncCallbackWrapper_complete = ($this, $result) => {
    ($rt_nullCheck($this.$realAsyncCallback)).$complete($result);
},
otpp_AsyncCallbackWrapper_error = ($this, $e) => {
    ($rt_nullCheck($this.$realAsyncCallback)).$error($e);
};
function jl_Object$monitorEnterWait$lambda$_6_0() {
    let a = this; jl_Object.call(a);
    a.$_00 = null;
    a.$_1 = null;
    a.$_2 = 0;
    a.$_3 = null;
}
let ju_Queue = $rt_classWithoutFields(0),
ju_Deque = $rt_classWithoutFields(0);
function ju_ArrayDeque() {
    let a = this; ju_AbstractCollection.call(a);
    a.$version = 0;
    a.$array = null;
    a.$head = 0;
    a.$tail = 0;
}
let ju_ArrayDeque_isEmpty = $this => {
    return $this.$head != $this.$tail ? 0 : 1;
},
ju_ArrayDeque_modInc = ($i, $mod) => {
    $i = $i + 1 | 0;
    if ($i == $mod)
        $i = 0;
    return $i;
},
juf_ToIntFunction = $rt_classWithoutFields(0),
jml_Displayable$addCommand$lambda$_1_0 = $rt_classWithoutFields(),
jml_Displayable$addCommand$lambda$_1_0_applyAsInt = (var$0, var$1) => {
    return ($rt_nullCheck($rt_castToClass(var$1, jml_Command))).$priority;
};
function ju_Comparator$comparingInt$lambda$_14_0() {
    jl_Object.call(this);
    this.$_02 = null;
}
let ju_Comparator$comparingInt$lambda$_14_0_compare = (var$0, var$1, var$2) => {
    let var$3, var$4, var$5;
    var$3 = $rt_nullCheck(var$0.$_02);
    var$4 = jml_Displayable$addCommand$lambda$_1_0_applyAsInt(var$3, var$1);
    var$5 = jml_Displayable$addCommand$lambda$_1_0_applyAsInt(var$3, var$2);
    jl_Integer_$callClinit();
    return $rt_compare(var$4, var$5);
};
function jl_Byte() {
    jl_Number.call(this);
    this.$value2 = 0;
}
let jl_Byte_TYPE = null,
jl_Byte_byteCache = null,
jl_Byte_$callClinit = () => {
    jl_Byte_$callClinit = $rt_eraseClinit(jl_Byte);
    jl_Byte__clinit_();
},
jl_Byte__clinit_ = () => {
    let var$1, var$2, var$3, var$4, var$5;
    jl_Byte_TYPE = $rt_cls($rt_bytecls);
    jl_Byte_$callClinit();
    var$1 = $rt_createArray(jl_Byte, 256);
    var$2 = var$1.data;
    var$3 = 0;
    var$4 = var$2.length;
    while (var$3 < var$4) {
        var$5 = new jl_Byte;
        var$5.$value2 = (var$3 - 128 | 0) << 24 >> 24;
        var$3 = $rt_checkLowerBound(var$3);
        var$2[var$3] = var$5;
        var$3 = var$3 + 1 | 0;
    }
    jl_Byte_byteCache = var$1;
},
ju_Comparator$NaturalOrder = $rt_classWithoutFields(),
ju_Comparator$NaturalOrder_INSTANCE = null,
ju_Comparator$NaturalOrder_$callClinit = () => {
    ju_Comparator$NaturalOrder_$callClinit = $rt_eraseClinit(ju_Comparator$NaturalOrder);
    ju_Comparator$NaturalOrder__clinit_();
},
ju_Comparator$NaturalOrder_compare = ($this, $o1, $o2) => {
    let var$3, var$4, var$5;
    a: {
        $o1 = $rt_nullCheck($rt_castToInterface($o1, jl_Comparable));
        $o2 = $rt_castToClass($o2, jl_String);
        if ($o1 === $o2)
            var$3 = 0;
        else {
            var$4 = $o1.$nativeString.length;
            $o2 = $rt_nullCheck($o2);
            var$4 = jl_Math_min(var$4, $o2.$nativeString.length);
            var$5 = 0;
            b: {
                while (true) {
                    if (var$5 >= var$4)
                        break b;
                    var$3 = $o1.$nativeString.charCodeAt(var$5) - $o2.$nativeString.charCodeAt(var$5) | 0;
                    if (var$3)
                        break;
                    var$5 = var$5 + 1 | 0;
                }
                break a;
            }
            var$3 = $o1.$nativeString.length - $o2.$nativeString.length | 0;
        }
    }
    return var$3;
},
ju_Comparator$NaturalOrder_instance = () => {
    ju_Comparator$NaturalOrder_$callClinit();
    return ju_Comparator$NaturalOrder_INSTANCE;
},
ju_Comparator$NaturalOrder__clinit_ = () => {
    let var$1;
    var$1 = new ju_Comparator$NaturalOrder;
    ju_Comparator$NaturalOrder_$callClinit();
    ju_Comparator$NaturalOrder_INSTANCE = var$1;
},
jl_NegativeArraySizeException = $rt_classWithoutFields(jl_RuntimeException);
function ju_AbstractList$1() {
    let a = this; jl_Object.call(a);
    a.$index = 0;
    a.$modCount0 = 0;
    a.$size2 = 0;
    a.$removeIndex = 0;
    a.$this$0 = null;
}
function jml_Graphics() {
    let a = this; jl_Object.call(a);
    a.$target = 0;
    a.$width = 0;
    a.$height = 0;
    a.$tx = 0;
    a.$ty = 0;
    a.$cx = 0;
    a.$cy = 0;
    a.$cw = 0;
    a.$ch = 0;
    a.$color = 0;
    a.$font = null;
}
let jml_Graphics__init_0 = ($this, $target) => {
    let var$2;
    $this.$font = jml_Font_getFont(0, 0, 0);
    $this.$target = $target;
    $this.$width = mikiPlatform.surfaces[$target].width;
    var$2 = mikiPlatform.surfaces[$target].height;
    $this.$height = var$2;
    $this.$cw = $this.$width;
    $this.$ch = var$2;
},
jml_Graphics__init_ = var_0 => {
    let var_1 = new jml_Graphics();
    jml_Graphics__init_0(var_1, var_0);
    return var_1;
},
jml_Graphics_setColor = ($this, $red, $green, $blue) => {
    $this.$color = $red << 16 | $green << 8 | $blue;
},
jml_Graphics_translate = ($this, $x, $y) => {
    $this.$tx = $this.$tx + $x | 0;
    $this.$ty = $this.$ty + $y | 0;
},
jml_Graphics_setClip = ($this, $x, $y, $w, $h) => {
    let $right, $bottom;
    $right = jl_Math_min($this.$width, ($x + $this.$tx | 0) + jl_Math_max(0, $w) | 0);
    $bottom = jl_Math_min($this.$height, ($y + $this.$ty | 0) + jl_Math_max(0, $h) | 0);
    $this.$cx = jl_Math_max(0, $x + $this.$tx | 0);
    $this.$cy = jl_Math_max(0, $y + $this.$ty | 0);
    $this.$cw = jl_Math_max(0, $right - $this.$cx | 0);
    $this.$ch = jl_Math_max(0, $bottom - $this.$cy | 0);
},
jml_Graphics_clipRect = ($this, $x, $y, $w, $h) => {
    let $right, $bottom;
    $right = jl_Math_min($this.$cx + $this.$cw | 0, ($x + $this.$tx | 0) + jl_Math_max(0, $w) | 0);
    $bottom = jl_Math_min($this.$cy + $this.$ch | 0, ($y + $this.$ty | 0) + jl_Math_max(0, $h) | 0);
    $this.$cx = jl_Math_max($this.$cx, $x + $this.$tx | 0);
    $this.$cy = jl_Math_max($this.$cy, $y + $this.$ty | 0);
    $this.$cw = jl_Math_max(0, $right - $this.$cx | 0);
    $this.$ch = jl_Math_max(0, $bottom - $this.$cy | 0);
},
jml_Graphics_getClipX = $this => {
    return $this.$cx - $this.$tx | 0;
},
jml_Graphics_getClipY = $this => {
    return $this.$cy - $this.$ty | 0;
},
jml_Graphics_drawImage = ($this, $image, $x, $y, $anchor) => {
    let var$5, var$6, var$7, var$8, var$9;
    if ($anchor & 8) {
        $image = $rt_nullCheck($image);
        $x = $x - jml_Image_getWidth($image) | 0;
    } else if ($anchor & 1) {
        $image = $rt_nullCheck($image);
        $x = $x - (jml_Image_getWidth($image) / 2 | 0) | 0;
    }
    if ($anchor & 32) {
        $image = $rt_nullCheck($image);
        $y = $y - jml_Image_getHeight($image) | 0;
    } else if ($anchor & 2) {
        $image = $rt_nullCheck($image);
        $y = $y - (jml_Image_getHeight($image) / 2 | 0) | 0;
    }
    $anchor = $this.$target;
    var$5 = ($rt_nullCheck($image)).$handle;
    $x = $x + $this.$tx | 0;
    $y = $y + $this.$ty | 0;
    var$6 = $this.$cx;
    var$7 = $this.$cy;
    var$8 = $this.$cw;
    var$9 = $this.$ch;
    mikiPlatform.drawImage($anchor, var$5, $x, $y, var$6, var$7, var$8, var$9);
},
jml_Graphics_fillRect = ($this, $x, $y, $w, $h) => {
    let var$5, var$6, var$7, var$8, var$9, var$10, var$11;
    var$5 = $this.$target;
    var$6 = $x + $this.$tx | 0;
    var$7 = $y + $this.$ty | 0;
    var$8 = $this.$color;
    $y = $this.$cx;
    var$9 = $this.$cy;
    var$10 = $this.$cw;
    var$11 = $this.$ch;
    mikiPlatform.rect(var$5, var$6, var$7, $w, $h, var$8, !!1, $y, var$9, var$10, var$11);
},
jml_Graphics_drawString = ($this, $value, $x, $y, $anchor) => {
    let var$5, var$6, var$7, var$8, var$9, var$10, var$11;
    var$5 = $this.$target;
    var$6 = $x + $this.$tx | 0;
    var$7 = $y + $this.$ty | 0;
    $x = ($rt_nullCheck($this.$font)).$size1;
    $y = $this.$color;
    var$8 = $this.$cx;
    var$9 = $this.$cy;
    var$10 = $this.$cw;
    var$11 = $this.$ch;
    w_Browser_text$js_body$_12(var$5, $rt_ustr($value), var$6, var$7, $anchor, $x, $y, var$8, var$9, var$10, var$11);
},
ju_NoSuchElementException = $rt_classWithoutFields(jl_RuntimeException);
function ju_Vector() {
    let a = this; ju_AbstractList.call(a);
    a.$elementCount = 0;
    a.$elementData0 = null;
    a.$capacityIncrement = 0;
}
let ju_Vector_$assertionsDisabled = 0,
ju_Vector_$callClinit = () => {
    ju_Vector_$callClinit = $rt_eraseClinit(ju_Vector);
    ju_Vector__clinit_();
},
ju_Vector__init_0 = $this => {
    ju_Vector_$callClinit();
    $this.$elementData0 = $rt_createArray(jl_Object, 10);
    $this.$elementCount = 0;
    $this.$capacityIncrement = 0;
},
ju_Vector__init_ = () => {
    let var_0 = new ju_Vector();
    ju_Vector__init_0(var_0);
    return var_0;
},
ju_Vector_addElement = ($this, $object) => {
    let var$2, var$3, var$4, var$5, var$6;
    jl_Object_monitorEnterSync($this);
    try {
        var$2 = $this.$elementCount;
        var$3 = $this.$elementData0;
        var$4 = ($rt_nullCheck(var$3)).data.length;
        if (var$2 == var$4) {
            var$5 = $this.$capacityIncrement;
            if (var$5 <= 0)
                var$5 = !var$4 ? 1 : var$4;
            var$6 = $rt_createArray(jl_Object, var$4 + var$5 | 0);
            jl_System_fastArraycopy(var$3, 0, var$6, 0, var$2);
            $this.$elementData0 = var$6;
        }
        var$6 = $this.$elementData0;
        var$4 = $this.$elementCount;
        $this.$elementCount = var$4 + 1 | 0;
        var$6 = ($rt_nullCheck(var$6)).data;
        var$6[$rt_checkBounds(var$4, var$6)] = $object;
        $this.$modCount = $this.$modCount + 1 | 0;
    } finally {
        jl_Object_monitorExitSync($this);
    }
},
ju_Vector_elementAt = ($this, $location) => {
    let var$2, var$3;
    jl_Object_monitorEnterSync($this);
    try {
        if ($location >= $this.$elementCount) {
            var$2 = new jl_ArrayIndexOutOfBoundsException;
            jl_Integer_$callClinit();
            jl_Exception__init_0(var$2, ($rt_nullCheck(jl_AbstractStringBuilder_append1(jl_AbstractStringBuilder__init_1(20), $location, 10))).$toString());
            $rt_throw(var$2);
        }
        var$3 = ($rt_nullCheck($this.$elementData0)).data;
        return var$3[$rt_checkBounds($location, var$3)];
    } finally {
        jl_Object_monitorExitSync($this);
    }
},
ju_Vector_size = $this => {
    jl_Object_monitorEnterSync($this);
    try {
        return $this.$elementCount;
    } finally {
        jl_Object_monitorExitSync($this);
    }
},
ju_Vector__clinit_ = () => {
    ju_Vector_$assertionsDisabled = 0;
},
ju_ConcurrentModificationException = $rt_classWithoutFields(jl_RuntimeException);
$rt_packages([-1, "java", 0, "util", 0, "io", 0, "lang"
]);
$rt_metadata([jl_Object, "Object", 3, 0, [], 1, 0, 0, ["$equals0", $rt_wrapFunction1(jl_Object_equals)],
ji_Serializable, 0, jl_Object, [], 1537, 0, 0, 0,
jl_Comparable, 0, jl_Object, [], 1537, 0, 0, 0,
jl_CharSequence, 0, jl_Object, [], 1537, 0, 0, 0,
jl_String, 0, jl_Object, [ji_Serializable, jl_Comparable, jl_CharSequence], 17, 0, () => jl_String_$callClinit(), ["$equals0", $rt_wrapFunction1(jl_String_equals)],
jlr_AnnotatedElement, 0, jl_Object, [], 1537, 0, 0, 0,
jlr_GenericDeclaration, 0, jl_Object, [jlr_AnnotatedElement], 1537, 0, 0, 0,
jlr_Type, 0, jl_Object, [], 1537, 0, 0, 0,
jl_Class, 0, jl_Object, [jlr_GenericDeclaration, jlr_Type], 17, 0, 0, 0,
jl_Number, 0, jl_Object, [ji_Serializable], 1025, 0, 0, 0,
jl_Integer, 0, jl_Number, [jl_Comparable], 1, 0, () => jl_Integer_$callClinit(), 0,
jl_AbstractStringBuilder, 0, jl_Object, [ji_Serializable, jl_CharSequence], 0, 0, 0, ["$ensureCapacity", $rt_wrapFunction1(jl_AbstractStringBuilder_ensureCapacity), "$toString", $rt_wrapFunction0(jl_AbstractStringBuilder_toString)],
jl_Appendable, 0, jl_Object, [], 1537, 0, 0, 0,
jl_StringBuilder, 0, jl_AbstractStringBuilder, [jl_Appendable], 1, 0, 0, ["$toString", $rt_wrapFunction0(jl_StringBuilder_toString), "$ensureCapacity", $rt_wrapFunction1(jl_StringBuilder_ensureCapacity), "$insert", $rt_wrapFunction2(jl_StringBuilder_insert)],
jl_Throwable, 0, jl_Object, [], 1, 0, 0, 0,
jl_Exception, 0, jl_Throwable, [], 1, 0, 0, 0,
jl_RuntimeException, 0, jl_Exception, [], 1, 0, 0, 0,
jl_IndexOutOfBoundsException, "IndexOutOfBoundsException", 3, jl_RuntimeException, [], 1, 0, 0, 0,
jl_ArrayIndexOutOfBoundsException, "ArrayIndexOutOfBoundsException", 3, jl_IndexOutOfBoundsException, [], 1, 0, 0, 0,
jl_NullPointerException, "NullPointerException", 3, jl_RuntimeException, [], 1, 0, 0, 0,
jl_ClassCastException, "ClassCastException", 3, jl_RuntimeException, [], 1, 0, 0, 0,
otrr_ReflectionInfo, 0, jl_Object, [], 1025, 0, 0, 0,
otrr_ClassInfo, 0, otrr_ReflectionInfo, [], 17, 0, 0, 0,
otr_StringInfo, 0, otrr_ReflectionInfo, [], 17, 0, 0, 0,
BrowserGame, 0, jl_Object, [], 17, 0, () => BrowserGame_$callClinit(), 0,
otp_Platform, 0, jl_Object, [], 17, 0, 0, 0,
otji_JS, 0, jl_Object, [], 17, 0, 0, 0,
otci_IntegerUtil, 0, jl_Object, [], 17, 0, 0, 0,
jmm_MIDlet, 0, jl_Object, [], 1025, 0, 0, 0,
jl_Runnable, 0, jl_Object, [], 1537, 0, 0, 0,
GameMIDlet, 0, jmm_MIDlet, [jl_Runnable], 1, 0, 0, 0,
otj_JSObject, 0, jl_Object, [], 1537, 0, 0, 0,
w_Browser$Tick, 0, jl_Object, [otj_JSObject], 1537, 0, 0, 0,
BrowserGame$main$lambda$_1_0, 0, jl_Object, [w_Browser$Tick], 1, 0, 0, 0,
w_Browser$Key, 0, jl_Object, [otj_JSObject], 1537, 0, 0, 0,
BrowserGame$main$lambda$_1_1, 0, jl_Object, [w_Browser$Key], 1, 0, 0, 0,
w_Browser$Action, 0, jl_Object, [otj_JSObject], 1537, 0, 0, 0,
BrowserGame$main$lambda$_1_2, 0, jl_Object, [w_Browser$Action], 1, 0, 0, 0,
BrowserGame$main$lambda$_1_3, 0, jl_Object, [w_Browser$Action], 1, 0, 0, 0,
w_Browser$Text, 0, jl_Object, [otj_JSObject], 1537, 0, 0, 0,
BrowserGame$main$lambda$_1_4, 0, jl_Object, [w_Browser$Text], 1, 0, 0, 0,
BrowserGame$main$lambda$_1_5, 0, jl_Object, [w_Browser$Tick], 1, 0, 0, 0,
BrowserGame$main$lambda$_1_6, 0, jl_Object, [w_Browser$Tick], 1, 0, 0, 0,
w_Browser$Inspect, 0, jl_Object, [otj_JSObject], 1537, 0, 0, 0,
BrowserGame$main$lambda$_1_7, 0, jl_Object, [w_Browser$Inspect], 1, 0, 0, 0,
otji_JSWrapper, 0, jl_Object, [], 17, 0, 0, 0,
w_Browser, 0, jl_Object, [], 17, 0, 0, 0,
jml_Display, 0, jl_Object, [], 17, 0, () => jml_Display_$callClinit(), 0,
ju_Comparator, 0, jl_Object, [], 1537, 0, 0, 0,
jl_String$_clinit_$lambda$_118_0, 0, jl_Object, [ju_Comparator], 1, 0, 0, 0]);
$rt_metadata([jl_Character, 0, jl_Object, [jl_Comparable], 1, 0, () => jl_Character_$callClinit(), 0,
jl_StringBuffer, 0, jl_AbstractStringBuilder, [jl_Appendable], 1, 0, 0, ["$toString", $rt_wrapFunction0(jl_StringBuffer_toString), "$ensureCapacity", $rt_wrapFunction1(jl_StringBuffer_ensureCapacity), "$insert", $rt_wrapFunction2(jl_StringBuffer_insert)],
w_Resources, 0, jl_Object, [], 17, 0, 0, 0,
jl_AutoCloseable, 0, jl_Object, [], 1537, 0, 0, 0,
ji_Closeable, 0, jl_Object, [jl_AutoCloseable], 1537, 0, 0, 0,
ji_InputStream, 0, jl_Object, [ji_Closeable], 1025, 0, 0, 0,
ji_FilterInputStream, 0, ji_InputStream, [], 1, 0, 0, 0,
ji_DataInput, 0, jl_Object, [], 1537, 0, 0, 0,
ji_DataInputStream, 0, ji_FilterInputStream, [ji_DataInput], 1, 0, 0, 0,
l, 0, jl_Object, [], 1, 0, 0, 0,
jml_Displayable, 0, jl_Object, [], 1025, 0, 0, ["$showNotify", $rt_wrapFunction0(jml_Displayable_showNotify), "$hideNotify", $rt_wrapFunction0(jml_Displayable_hideNotify), "$render", $rt_wrapFunction0(jml_Displayable_render)],
jml_Canvas, 0, jml_Displayable, [], 1025, 0, 0, 0,
jml_CommandListener, 0, jl_Object, [], 1537, 0, 0, 0,
j, 0, jml_Canvas, [jl_Runnable, jml_CommandListener], 1, 0, () => j_$callClinit(), ["$if1", $rt_wrapFunction2(j_if0), "$hideNotify", $rt_wrapFunction0(j_hideNotify), "$showNotify", $rt_wrapFunction0(j_showNotify)],
b, 0, j, [], 1, 0, 0, ["$commandAction", $rt_wrapFunction2(b_commandAction), "$do", $rt_wrapFunction2(b_do), "$a7", $rt_wrapFunction1(b_a1), "$a8", $rt_wrapFunction2(b_a0), "$showNotify", $rt_wrapFunction0(b_showNotify)],
g, 0, jl_Object, [], 1, 0, 0, 0,
i, 0, j, [], 1, 0, 0, ["$hideNotify", $rt_wrapFunction0(i_hideNotify)],
d, 0, i, [], 1, 0, 0, ["$a8", $rt_wrapFunction2(d_a4), "$if1", $rt_wrapFunction2(d_if3), "$do", $rt_wrapFunction2(d_do0), "$a7", $rt_wrapFunction1(d_a5), "$commandAction", $rt_wrapFunction2(d_commandAction)],
c, 0, jl_Object, [], 1, 0, () => c_$callClinit(), 0,
jl_System, 0, jl_Object, [], 17, 0, 0, 0,
k, 0, jl_Object, [], 1, 0, 0, 0,
ju_Objects, 0, jl_Object, [], 17, 0, 0, 0,
jl_StringIndexOutOfBoundsException, "StringIndexOutOfBoundsException", 3, jl_IndexOutOfBoundsException, [], 1, 0, 0, 0,
ji_ByteArrayInputStream, 0, ji_InputStream, [], 1, 0, 0, 0,
ji_IOException, 0, jl_Exception, [], 1, 0, 0, 0,
ji_EOFException, "EOFException", 2, ji_IOException, [], 1, 0, 0, 0,
jur_RandomGenerator, 0, jl_Object, [], 1537, 0, 0, 0,
ju_Random, 0, jl_Object, [jur_RandomGenerator, ji_Serializable], 1, 0, 0, 0,
jmr_RecordStore, 0, jl_Object, [], 17, 0, 0, 0,
jml_Image, 0, jl_Object, [], 17, 0, 0, 0,
cnms_Sound, 0, jl_Object, [], 17, 0, 0, 0,
ju_Dictionary, 0, jl_Object, [], 1025, 0, 0, 0,
ju_Map, 0, jl_Object, [], 1537, 0, 0, 0,
jl_Cloneable, 0, jl_Object, [], 1537, 0, 0, 0,
ju_Hashtable, 0, ju_Dictionary, [ju_Map, jl_Cloneable, ji_Serializable], 1, 0, () => ju_Hashtable_$callClinit(), 0,
ju_Properties, 0, ju_Hashtable, [], 1, 0, 0, 0,
otrf_VirtualFileSystemProvider, 0, jl_Object, [], 17, 0, 0, 0,
ju_Base64, 0, jl_Object, [], 17, 0, 0, 0,
jl_IllegalStateException, "IllegalStateException", 3, jl_RuntimeException, [], 1, 0, 0, 0,
ji_Flushable, 0, jl_Object, [], 1537, 0, 0, 0,
ji_OutputStream, 0, jl_Object, [ji_Closeable, ji_Flushable], 1025, 0, 0, 0,
ji_FilterOutputStream, 0, ji_OutputStream, [], 1, 0, 0, 0,
ji_DataOutput, 0, jl_Object, [], 1537, 0, 0, 0,
ji_DataOutputStream, 0, ji_FilterOutputStream, [ji_DataOutput], 1, 0, 0, 0,
ji_ByteArrayOutputStream, 0, ji_OutputStream, [], 1, 0, 0, 0,
jlr_Array, 0, jl_Object, [], 17, 0, 0, 0,
jl_ArrayStoreException, "ArrayStoreException", 3, jl_RuntimeException, [], 1, 0, 0, 0,
jl_IllegalArgumentException, "IllegalArgumentException", 3, jl_RuntimeException, [], 1, 0, 0, 0,
ju_Base64$Decoder, 0, jl_Object, [], 1, 0, 0, 0,
otci_Base64Impl, 0, jl_Object, [], 17, 0, () => otci_Base64Impl_$callClinit(), 0]);
$rt_metadata([ju_Arrays, 0, jl_Object, [], 1, 0, 0, 0,
jl_Iterable, 0, jl_Object, [], 1537, 0, 0, 0,
ju_Collection, 0, jl_Object, [jl_Iterable], 1537, 0, 0, 0,
ju_AbstractCollection, 0, jl_Object, [ju_Collection], 1025, 0, 0, 0,
ju_SequencedCollection, 0, jl_Object, [ju_Collection], 1537, 0, 0, 0,
ju_List, 0, jl_Object, [ju_SequencedCollection], 1537, 0, 0, 0,
ju_AbstractList, 0, ju_AbstractCollection, [ju_List], 1025, 0, 0, 0,
ju_RandomAccess, 0, jl_Object, [], 1537, 0, 0, 0,
ju_ArrayList, 0, ju_AbstractList, [jl_Cloneable, ji_Serializable, ju_RandomAccess], 1, 0, 0, 0,
otrf_VirtualFileSystem, 0, jl_Object, [], 1537, 0, 0, 0,
otrfm_InMemoryVirtualFileSystem, 0, jl_Object, [otrf_VirtualFileSystem], 1, 0, 0, 0,
ju_Base64$Encoder, 0, jl_Object, [], 1, 0, 0, 0,
jl_Math, 0, jl_Object, [], 17, 0, 0, 0,
ju_Enumeration, 0, jl_Object, [], 1537, 0, 0, 0,
ju_Hashtable$1, 0, jl_Object, [ju_Enumeration], 0, 0, 0, 0,
ju_Iterator, 0, jl_Object, [], 1537, 0, 0, 0,
ju_Hashtable$2, 0, jl_Object, [ju_Iterator], 0, 0, 0, 0,
otrfm_AbstractInMemoryVirtualFile, 0, jl_Object, [], 1025, 0, 0, 0,
otrfm_InMemoryVirtualDirectory, 0, otrfm_AbstractInMemoryVirtualFile, [], 1, 0, 0, 0,
ju_Map$Entry, 0, jl_Object, [], 1537, 0, 0, 0,
ju_MapEntry, 0, jl_Object, [ju_Map$Entry, jl_Cloneable], 0, 0, 0, 0,
ju_Hashtable$Entry, 0, ju_MapEntry, [], 0, 0, 0, 0,
ju_AbstractMap, 0, jl_Object, [ju_Map], 1025, 0, 0, 0,
ju_HashMap, 0, ju_AbstractMap, [jl_Cloneable, ji_Serializable], 1, 0, 0, 0,
ju_SequencedMap, 0, jl_Object, [ju_Map], 1537, 0, 0, 0,
ju_LinkedHashMap, 0, ju_HashMap, [ju_SequencedMap], 1, 0, 0, 0,
h, 0, jl_Object, [], 1, 0, () => h_$callClinit(), 0,
jl_Thread, 0, jl_Object, [jl_Runnable], 1, 0, () => jl_Thread_$callClinit(), 0,
jml_Screen, 0, jml_Displayable, [], 1025, 0, 0, 0,
jml_Form, 0, jml_Screen, [], 17, 0, 0, ["$render", $rt_wrapFunction0(jml_Form_render)],
jml_Item, 0, jl_Object, [], 1025, 0, 0, 0,
jml_TextField, 0, jml_Item, [], 17, 0, 0, 0,
a, 0, jl_Object, [], 1, 0, 0, 0,
f, 0, jl_Object, [], 1, 0, 0, 0,
e, 0, jl_Object, [], 1, 0, 0, 0,
ju_HashMap$HashEntry, 0, ju_MapEntry, [], 0, 0, 0, 0,
ju_LinkedHashMap$LinkedHashMapEntry, 0, ju_HashMap$HashEntry, [], 16, 0, 0, 0,
cnmu_DeviceControl, 0, jl_Object, [], 17, 0, 0, 0,
jml_Command, 0, jl_Object, [], 17, 0, 0, 0,
jml_Font, 0, jl_Object, [], 17, 0, 0, 0,
jml_List, 0, jml_Screen, [], 17, 0, () => jml_List_$callClinit(), ["$render", $rt_wrapFunction0(jml_List_render)],
ji_PrintStream, 0, ji_FilterOutputStream, [jl_Appendable], 1, 0, 0, 0,
otcic_JsConsolePrintStream, 0, ji_PrintStream, [], 1025, 0, 0, 0,
otcic_JSStderrPrintStream, 0, otcic_JsConsolePrintStream, [], 1, 0, 0, 0,
jl_Object$Monitor, 0, jl_Object, [], 0, 0, 0, 0,
jl_IllegalMonitorStateException, 0, jl_RuntimeException, [], 1, 0, 0, 0,
jl_Thread$UncaughtExceptionHandler, 0, jl_Object, [], 1537, 0, 0, 0,
jl_DefaultUncaughtExceptionHandler, 0, jl_Object, [jl_Thread$UncaughtExceptionHandler], 1, 0, 0, 0,
ji_UTFDataFormatException, "UTFDataFormatException", 2, ji_IOException, [], 1, 0, 0, 0,
otp_PlatformRunnable, 0, jl_Object, [], 1537, 0, 0, 0]);
$rt_metadata([jl_Object$monitorExit$lambda$_8_1, 0, jl_Object, [otp_PlatformRunnable], 1, 0, 0, 0,
jnc_Charset, 0, jl_Object, [jl_Comparable], 1025, 0, 0, 0,
oti_AsyncCallback, 0, jl_Object, [], 1537, 0, 0, 0,
otpp_AsyncCallbackWrapper, 0, jl_Object, [oti_AsyncCallback], 0, 0, 0, ["$complete", $rt_wrapFunction1(otpp_AsyncCallbackWrapper_complete), "$error", $rt_wrapFunction1(otpp_AsyncCallbackWrapper_error)],
jl_Object$monitorEnterWait$lambda$_6_0, 0, jl_Object, [otp_PlatformRunnable], 1, 0, 0, 0,
ju_Queue, 0, jl_Object, [ju_Collection], 1537, 0, 0, 0,
ju_Deque, 0, jl_Object, [ju_Queue, ju_SequencedCollection], 1537, 0, 0, 0,
ju_ArrayDeque, 0, ju_AbstractCollection, [ju_Deque, jl_Cloneable, ji_Serializable], 1, 0, 0, 0,
juf_ToIntFunction, 0, jl_Object, [], 1537, 0, 0, 0,
jml_Displayable$addCommand$lambda$_1_0, 0, jl_Object, [juf_ToIntFunction], 1, 0, 0, 0,
ju_Comparator$comparingInt$lambda$_14_0, 0, jl_Object, [ju_Comparator], 1, 0, 0, ["$compare", $rt_wrapFunction2(ju_Comparator$comparingInt$lambda$_14_0_compare)],
jl_Byte, 0, jl_Number, [jl_Comparable], 1, 0, () => jl_Byte_$callClinit(), 0,
ju_Comparator$NaturalOrder, 0, jl_Object, [ju_Comparator], 1, 0, () => ju_Comparator$NaturalOrder_$callClinit(), ["$compare", $rt_wrapFunction2(ju_Comparator$NaturalOrder_compare)],
jl_NegativeArraySizeException, "NegativeArraySizeException", 3, jl_RuntimeException, [], 1, 0, 0, 0,
ju_AbstractList$1, 0, jl_Object, [ju_Iterator], 0, 0, 0, 0,
jml_Graphics, 0, jl_Object, [], 17, 0, 0, 0,
ju_NoSuchElementException, 0, jl_RuntimeException, [], 1, 0, 0, 0,
ju_Vector, 0, ju_AbstractList, [ju_List, ju_RandomAccess, jl_Cloneable, ji_Serializable], 1, 0, () => ju_Vector_$callClinit(), 0,
ju_ConcurrentModificationException, "ConcurrentModificationException", 1, jl_RuntimeException, [], 1, 0, 0, 0]);
let $rt_booleanArrayCls = $rt_arraycls($rt_booleancls),
$rt_charArrayCls = $rt_arraycls($rt_charcls),
$rt_byteArrayCls = $rt_arraycls($rt_bytecls),
$rt_shortArrayCls = $rt_arraycls($rt_shortcls),
$rt_intArrayCls = $rt_arraycls($rt_intcls);
$rt_stringPool(["Can\'t enter monitor from another thread synchronously", "0", "[L", "null", ": ", "\n", "\tat ", "Caused by: ", "microedition.locale", "/en", "/", ".hlp", "/en.hlp", "HallOfFame", "aaa", "", "GameData", "[", ", ", "]", "End of stream reached", "Malformed UTF-8 sequence", "AppData", "Miki\'s World 1: The Lost Tiara v1.1.2\nCopyright 2002 Sumea\nwww.sumea.com", ". ", " - ", "/title.png", "/tiles.png", "/sky.png", "/clouds.png", "/lord.png", "/player.png", "/items.png", "/numbers.png", "/time.png",
"begin.bin", "/damage.png", "/gameover.png", "/end.png", "/level.bin", "end.bin", "/grid.png", "/bonus.png", "/cursor.png", "/onceuponatime.ott", "/bonus.ott", "/cage.ott", "/coin.ott", "/damage.ott", "/gameend.ott", "/gameover.ott", "/gamestart.ott", "/key.ott", "/lord.ott", "/title.ott", "/transportation.ott", "Either src or dest is null", "java.version", "21", "os.name", "TeaVM", "file.separator", "path.separator", ":", "line.separator", "java.io.tmpdir", "/tmp", "java.vm.version", "user.home", " ", "Record store does not exist: ",
" > ", "UTF Error", "main", "/symbols.png", "Select"]);
jl_String.prototype.toString = function() {
    return $rt_ustr(this);
};
jl_String.prototype.valueOf = jl_String.prototype.toString;
jl_Object.prototype.toString = function() {
    return $rt_ustr(jl_Object_toString(this));
};
jl_Object.prototype.__teavm_class__ = function() {
    return $dbg_class(this);
};
let $rt_export_main = $rt_mainStarter(BrowserGame_main);
$rt_export_main.javaException = $rt_javaException;
let $rt_jso_marker = Symbol('jsoClass');
(() => {
    let c;
    c = BrowserGame$main$lambda$_1_0.prototype;
    c.run = $rt_callWithReceiver(BrowserGame$main$lambda$_1_0_run$exported$0);
    c = BrowserGame$main$lambda$_1_1.prototype;
    c.run = $rt_callWithReceiver(BrowserGame$main$lambda$_1_1_run$exported$0);
    c = BrowserGame$main$lambda$_1_2.prototype;
    c.run = $rt_callWithReceiver(BrowserGame$main$lambda$_1_2_run$exported$0);
    c = BrowserGame$main$lambda$_1_3.prototype;
    c.run = $rt_callWithReceiver(BrowserGame$main$lambda$_1_3_run$exported$0);
    c = BrowserGame$main$lambda$_1_4.prototype;
    c.run = $rt_callWithReceiver(BrowserGame$main$lambda$_1_4_run$exported$0);
    c = BrowserGame$main$lambda$_1_5.prototype;
    c.run = $rt_callWithReceiver(BrowserGame$main$lambda$_1_5_run$exported$0);
    c = BrowserGame$main$lambda$_1_6.prototype;
    c.run = $rt_callWithReceiver(BrowserGame$main$lambda$_1_6_run$exported$0);
    c = BrowserGame$main$lambda$_1_7.prototype;
    c.get = $rt_callWithReceiver(BrowserGame$main$lambda$_1_7_get$exported$0);
})();
export { $rt_export_main as main };
