const { v4: uuidv4 } = require('uuid');

function generateUUID(KEYPREFIX, CRYPT_KEY_LEN_MIN, CRYPT_KEY_LEN_MAX) {
    const uuid = uuidv4().replace(/-/g, '');
    const randomLength = Math.floor(Math.random() * (CRYPT_KEY_LEN_MAX - CRYPT_KEY_LEN_MIN + 1)) + CRYPT_KEY_LEN_MIN;
    return `${KEYPREFIX}${uuid.substring(0, randomLength)}`;
}

module.exports = generateUUID;
