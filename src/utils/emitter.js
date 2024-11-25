import mitt from 'mitt'

/**
 * 兄弟组件之间通信
 * @type {Emitter<Record<EventType, unknown>>}
 */

const emitter = mitt()

export default emitter
