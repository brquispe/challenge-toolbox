const { describe } = require('mocha')
const { expect } = require('chai')
const Validator = require('../../src/libs/validator')

describe('Validator', () => {
  it('should validate "39cca28bed77863958642cdc9d78ddfc" is hex', () => {
    const hex = '39cca28bed77863958642cdc9d78ddfc'
    const validation = Validator.isStringHex(hex)
    expect(validation).to.equal(true)
  })
  it('should validate "jzeb9ac4be38cb4a6c18f859b79a87" is not hex', () => {
    const hex = 'jzeb9ac4be38cb4a6c18f859b79a87'
    const validation = Validator.isStringHex(hex)
    expect(validation).to.equal(false)
  })
  it('should validate {name: "Braian", age: 24} is parseable into {name: "Braian", age: 24}', () => {
    const obj = {
      name: 'Braian',
      age: '24'
    }
    const data = Validator.isObjectParseable(obj, {
      name: { type: 'string' },
      age: { type: 'number' }
    })

    expect(data).to.equal(true)
  })
})
