import type { Component } from 'solid-js'
import { createSignal } from "solid-js"

const blob2BinaryString = (blob: Blob): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.readAsBinaryString(blob)
  })
}
export default (() => {
  const [enableE2ee, setEnableE2ee] = createSignal(false)
  const [file, setFile] = createSignal(new Blob())
  const [e2eeKey, setE2eeKey] = createSignal(crypto.randomUUID())
  return (
    <div>
      <div class="text-2xl text-center">Upload</div>
      <div class="grid bg-secondary text-on-secondary grid-rows-2 lg:grid-cols-2">
        <div>
          <div>
            <label>ファイルを選んでください(Max: 100MB)</label>
            <input type='file' onChange={(evt) => {
              setFile(evt.target.files[0])
            }} />
          </div>
        </div>
        <div>
          <div class='text-lg mono'>Options</div>
          <div>
            <div>
              <div>
                <input type='checkbox' checked={enableE2ee()} onInput={(evt) => {
                  setEnableE2ee(evt.currentTarget.checked)
                }} />
                <label>ファイルを暗号化する</label>
                <div>{enableE2ee().toString()}</div>
                {
                  enableE2ee() && <div>
                    <label>暗号化コード: </label>
                    <input type='text'
                      class="p-1 border-2 border-outline bg-surface text-on-surface"
                      value={e2eeKey()}
                      onInput={(evt) => setE2eeKey(evt.target.value)}/>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center">
        <button class='outlined-button' onClick={async () => {
          alert(e2eeKey())
          const salt = CryptoJS.lib.WordArray.random(128 / 8);
          const iv = CryptoJS.lib.WordArray.random(128 / 8);
          const metaData: string = CryptoJS.enc.Hex.stringify(salt) + ',' + CryptoJS.enc.Hex.stringify(iv) + ','

          const encrypted = CryptoJS.AES.encrypt(
                            CryptoJS.enc.Utf8.parse(reader.result),
                            CryptoJS.PBKDF2(
                                CryptoJS.enc.Utf8.parse(_("password").value),
                                salt,
                                {
                                    keySize: 128 / 8,
                                    iterations: 500
                                }
                            ),
                            {
                                iv: iv,
                                mode: CryptoJS.mode.CBC,
                                padding: CryptoJS.pad.Pkcs7
                            }
                        );
        }}>アップロード</button>
      </div>
    </div>
  )
}) satisfies Component
