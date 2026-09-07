// 通过js实现bem规范,生成[类名]
// block 代码块  element 元素   modifier 修饰符   state 状态
// yy-button
// yy-button__element
// 默认样式：yy-button__element--disabled
// 动态添加状态：是……时候，是否选中is-checked；是否启用is-enabled

// :class = [bem.b('button')]   //通过 bem规范 简化设计样式过程
// 创建一个生成器函数
function _bem(
  prefixName: string,
  blockSuffix: string,
  element: string,
  modifier: string
) {
  if (blockSuffix) {
    prefixName += `-${blockSuffix}`
  }
  if (element) {
    prefixName += `__${element}`
  }
  if (modifier) {
    prefixName += `--${modifier}`
  }
  return prefixName
}

// 拼接字符串方法二次封装
function createBEM(prefixName: string) {
  // b即为拼接block
  const b = (blockSuffix: string = '') => _bem(prefixName, blockSuffix, '', '')
  const e = (element: string) => _bem(prefixName, '', element, '')
  const m = (modifier: string) => _bem(prefixName, '', '', modifier)

  const be = (blockSuffix: string, element: string) =>
    _bem(prefixName, blockSuffix, element, '')
  const bm = (blockSuffix: string, modifier: string) =>
    _bem(prefixName, blockSuffix, '', modifier)
  const em = (element: string, modifier: string) =>
    _bem(prefixName, '', element, modifier)

  const bem = (blockSuffix: string, element: string, modifier: string) =>
    _bem(prefixName, blockSuffix, element, modifier)
  const is = (name: string, state: string | boolean) =>
    state ? `is-${name}` : ''

  // 返回一个对象,包含所有的方法
  return { b, e, m, be, bm, em, bem, is }
}

// 创建命名空间,包含完整前缀yy,以及拼接后缀的方法
export function createNamespace(name: string) {
  const prefixName = `yy-${name}`
  return createBEM(prefixName)
}

// const bem = createNamespace("icon");
// console.log(bem.b("box"));
// console.log(bem.e('element'));
// console.log(bem.m('modifier'));
// console.log(bem.bem('box','element','modifier'));
// console.log(bem.is('checked',true));
// console.log(bem.be('box','element'));
// console.log(bem.bm('box','modifier'));
// console.log(bem.em('element','modifier'));