'use strict'
let cryto = require('crypto');

let generateSalt = rounds => {
   if (rounds >= 15) {
       throw new Error(`${rounds} is greater than 15, must be less`)
   }

   if (typeof rounds !== 'number') {
       throw new Error('rounds param must be a number')
   }

   if (rounds == null) {
       rounds = 12
   }

   return cryto.randomBytes(Math.ceil(rounds / 2)).toString('hex').slice(0, rounds)
}

let hash = (password, salt) => {
    if (password == null || salt == null) {
        throw new Error('provide password and salt value')
    }
    if (typeof password !== 'string' || typeof salt !== 'string') {
        throw new Error('password and salt must be string')
    }

    let hasher = cryto.createHmac('sha512', salt)
    hasher.update(password);
    let value = hasher.digest('hex')
    console.log(value)
    return value
}

let compare = (password, hash, salt) => {
    if (password == null || hash == null) {
        throw new Error('password and hash must be string')
    }

    if (typeof password !== 'string' || typeof hash !== 'string') {
        throw new Error('password and hash must be string')
    }

    let hasher = cryto.createHmac('sha512', salt)
    hasher.update(password);
    let hashPassword = hasher.digest('hex')
    if (hashPassword === hash) {
        return true
    }

    return false
}
module.exports = {generateSalt, hash, compare}