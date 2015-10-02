export default (storage) => ({
  0: storage,

  put (key, value, callback) {
    storage.get(key, (err, doc) => {
      if (err) {
        storage.put({
          value: value,
          _id: key
        }, callback)
        return
      }

      const newDoc = {
        ...doc,
        value
      }

      storage.put(newDoc, callback)
    })
  },

  get (key, callback) {
    storage.get(key, (err, doc) => {
      if (err) {
        callback(err)
        return
      }

      callback(null, doc.value)
    })
  },

  del (key, callback) {
    storage.get(key, (err, doc) => {
      if (err) {
        callback(err)
        return
      }

      storage.remove(doc, callback)
    })
  }
})
