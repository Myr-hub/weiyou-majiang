// 独立示例：单选值与多选集合的更新。
const modes = new Set(['classic', 'wildcard']);
const allowedFlags = new Set(['voice', 'blockTyping']);
export function updateOptions(state, key, value) {
  if (!state || !modes.has(state.mode) || !Array.isArray(state.flags) ||
      state.flags.some(flag => !allowedFlags.has(flag)))
    throw new TypeError('无效状态');
  const flags = new Set(state.flags);
  if (key === 'mode') {
    if (!modes.has(value)) throw new TypeError('未知模式');
    return {mode:value, flags:[...flags]};
  }
  if (!allowedFlags.has(key) || typeof value !== 'boolean')
    throw new TypeError('无效开关');
  value ? flags.add(key) : flags.delete(key);
  return {mode:state.mode, flags:[...flags]};
}
