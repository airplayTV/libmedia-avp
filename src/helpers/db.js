// https://dexie.org/docs/Tutorial/Vue

// db.js
import Dexie from 'dexie'

const db = new Dexie('db.airplayTV')

db.version(1).stores({
  // '++id, name, age'
  'avp-timeline': [
    '++id, [key]',
    'key', // 源
    'name',
    'duration', // 总时长，秒
    'lastTime', // 最后播放时间
    'updated_at', // 更新时间
  ].join(', ')
})

const avpTable = () => {
  return db['avp-timeline']
}

const addTimeline = async (history) => {
  return await avpTable().add(history)
}

const updateTimeline = async (key, updates) => {
  return await avpTable().update(key, updates)
}

const deleteTimeline = async (source, vid) => {
  return await avpTable().where({ source: source, vid: vid }).delete()
}

const clearTimeline = async () => {
  return await avpTable().clear()
}

const findTimeline = async (key) => {
  return await avpTable().where({ key: key }).first()
}

export {
  addTimeline,
  updateTimeline,
  deleteTimeline,
  clearTimeline,
  findTimeline,
}
