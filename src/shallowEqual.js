function shallowEqual (a, b) {
    // 三等判断出是true，那肯定是true
    if (a === b) return true;
    if(Object.is(a, NaN)) return Object.is(b, NaN);

    // 三等判断出是false，只要其中一个是原始类型，那这个false是有效的
    // ps：如果a,b都是函数的话统统不等
    if (typeof a !== 'object' || typeof b !== 'object') return false;
    if (a === null || b === null) return false;

    // 相同类的实例才继续，否则就没必要比了
    if (a.__proto__ !== b.__proto__) return false;
    if (a instanceof Date) return +a === +b;
    if (a instanceof RegExp) return '' + a === '' + b;
    if (a instanceof Set) return shallowEqual([...a], [...b]);
    if (a instanceof Map) {
      if(a.size !== b.size) return false;
      for (let key of a.keys()) {
        if (a.get(key) !== b.get(key)) return false
      }
      return true
    }

    // 先看看a, b的大小，不一样也没必要比了
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) return false;

    // 对其属性再进行递归比较
    return aKeys.every(k => a[k] === b[k]);
}

module.exports = shallowEqual;
