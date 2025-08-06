// https://dexie.org/docs/Tutorial/Vue

// db.js
import Dexie from 'dexie'

const db = new Dexie('db.airplayTV')

db.version(1).stores({
  // '++id, name, age'
  timeline: [
    '++id, [key]',
    'key', // 源
    'name',
    'duration', // 总时长，秒
    'lastTime', // 最后播放时间
    'updated_at', // 更新时间
  ].join(', ')
})

const addTimeline = async (history) => {
  return await db.timeline.add(history)
}

const updateTimeline = async (key, updates) => {
  return await db.timeline.update(key, updates)
}

const deleteTimeline = async (source, vid) => {
  return await db.timeline.where({ source: source, vid: vid }).delete()
}

const clearTimeline = async () => {
  return await db.timeline.clear()
}

const findTimeline = async (key) => {
  return await db.timeline.where({ key: key }).first()
}

export {
  addTimeline,
  updateTimeline,
  deleteTimeline,
  clearTimeline,
  findTimeline,
}
