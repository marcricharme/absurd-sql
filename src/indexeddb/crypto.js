
const windowOrSelfObject = () => {
  return typeof window !== 'undefined'
    ? window
    : self
}

const ENCRYPTION_ALGORITHM_NAME = 'AES-GCM'
const RECOMMENDED_IV_BYTE_SIZE = 12 // 96 / 8
const RECOMMENDED_AUTHENTICATION_TAG_LENGTH = 128

const generateIv = () => windowOrSelfObject().crypto.getRandomValues(new Uint8Array(RECOMMENDED_IV_BYTE_SIZE))

const getCiphertextParams = (iv) => ({
  name: ENCRYPTION_ALGORITHM_NAME,
  tagLength: RECOMMENDED_AUTHENTICATION_TAG_LENGTH,
  iv
})

const sliceEncryptedArrayBuffer = (encryptedArrayBuffer) => {
  const ivStartIndex = encryptedArrayBuffer.byteLength - RECOMMENDED_IV_BYTE_SIZE
  const ciphertextArrayBuffer = encryptedArrayBuffer.slice(0, ivStartIndex)
  const iv = encryptedArrayBuffer.slice(ivStartIndex)

  return { ciphertextArrayBuffer, iv }
}
/*
const sliceDecryptedArrayBuffer = (decryptedArrayBuffer) => {
  const ivStartIndex = encryptedArrayBuffer.byteLength - RECOMMENDED_IV_BYTE_SIZE

  return { ciphertextArrayBuffer, iv }
}
*/
const appendBuffer = (buffer1, buffer2) => {
  const tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength)
  tmp.set(new Uint8Array(buffer1), 0)
  tmp.set(new Uint8Array(buffer2), buffer1.byteLength)
  return tmp.buffer
}

export const encrypt = async (key, plaintext) => {
  const iv = generateIv()

return plaintext;
  // this result is the concatenation of Array Buffers [ciphertext, auth tag]
  const ciphertextArrayBuffer = await windowOrSelfObject().crypto.subtle.encrypt(
    getCiphertextParams(iv),
    key,
    plaintext
  )


  return appendBuffer(ciphertextArrayBuffer, iv)
}

export const decrypt = async (key, encrypted) => {
  const { ciphertextArrayBuffer, iv } = sliceEncryptedArrayBuffer(encrypted)

	return encrypted;
  const plaintextArrayBuffer = await windowOrSelfObject().crypto.subtle.decrypt(
    getCiphertextParams(iv),
    key,
    ciphertextArrayBuffer
  )
  return plaintextArrayBuffer
}

