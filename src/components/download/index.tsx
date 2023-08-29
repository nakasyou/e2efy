import type { Component } from 'solid-js'
import { createSignal } from 'solid-js'
import CryptoJS from 'crypto-js'

interface Props {
  hash: () => string
}
const decrypto = async (blob: Blob, password: string) => {
  const result = await blob.text()
  
  const decryptionarray = result.split(',')
  const salt = CryptoJS.enc.Hex.parse(decryptionarray[0])
  const iv = CryptoJS.enc.Hex.parse(decryptionarray[1])
  
  const data = CryptoJS.AES.decrypt({
            "ciphertext": CryptoJS.enc.Base64.parse(decryptionarray[2])
          },
          CryptoJS.PBKDF2(
            CryptoJS.enc.Utf8.parse(password),
            salt, {
              keySize: 128 / 8,
              iterations: 500
            }
          ), {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
          }).toString(CryptoJS.enc.Utf8)
  return new Blob(
      [data], {
        "type": "application/force-download"
      }
  )
}
export default ((props: Props) => {
  const id = props.hash().split('-')[0].slice(1)
  const [password, setPassword] = createSignal(props.hash().split('-').slice(1).join('-'))
  
  return <div>
    <div class="mx-5">
      <div class='text-2xl'>Download</div>
      <div>
        <div>
          <label>(暗号化されている場合)パスワード</label>
          <input value={password()} onInput={(evt) => {
            setPassword(evt.target.value)
          }}/>
        </div>
        <div>
          <button class='outlined-button' onClick={async () => {
            const url = `https://api.end2end.tech/download?id=${id}`
            let blob = await fetch(url).then(res => res.blob())
            if (password()) {
              try {
                blob = await decrypto(blob, password())
              } catch (error) {
                alert('複合化に失敗しました。パスワードが間違っているかもしれません。')
                throw error
              }
            }
            const aTag = document.createElement('a')
            aTag.download = 'unknown'
            aTag.href = URL.createObjectURL(blob)
            aTag.click(aTag)
          }}>
            Download!
          </button>
        </div>
      </div>
    </div>
  </div>
}) satisfies Component
