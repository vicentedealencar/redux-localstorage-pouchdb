import test from 'tape'
import adapter from '../src/index'
import PouchDB from 'pouchdb'
import Erase from 'pouchdb-erase'

PouchDB.plugin(Erase)

const storage = new PouchDB('test-db')
const adapted = adapter(storage)

test('put and get', t => {
  t.plan(3)

  storage.erase().then(() => {
    adapted.put('a', 1, (err, res) => {
      t.equal(err, null)
      adapted.get('a', (err, value) => {
        t.equal(err, null)
        t.equal(value, 1)
      })
    })
  })
})

test('put and remove', t => {
  t.plan(4)

  storage.erase().then(() => {
    adapted.put('a', 1, (err, res) => {
      t.equal(err, null)
      adapted.del('a', (err, value) => {
        t.equal(err, null)
        adapted.get('a', (err, value) => {
          t.equal(err.status, 404)
          t.equal(value, undefined)
        })
      })
    })
  })
})
