import type { Component } from 'solid-js'
import { createSignal } from "solid-js"
import CryptoJS from 'crypto-js'
import {QRCodeSVG} from 'solid-qr-code';
    
const blob2BinaryString = (blob: Blob): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.readAsBinaryString(blob)
  })
}
const b64ToBuff = async (b64) => {
  return await fetch(`data:text/plain;base64,${b64}`).then(res => res.arrayBuffer()).then(buff => new Uint8Array(buff))
}

export default (() => {
  const [enableE2ee, setEnableE2ee] = createSignal(false)
  const [file, setFile] = createSignal(new File(['q'], 'a'))
  const [e2eeKey, setE2eeKey] = createSignal(crypto.randomUUID())
  const [uploadedFiles, setUploadedFiles] = createSignal<{
    fileName: string,
    fileId: string,
    removePassword: string
    password?: string
  }[]>([])
  const [shareIndex, setShareIndex] = createSignal<number | false>(false)
  return (
    <div>
      <div>
        {
          (shareIndex() !== false) && <div class='fixed w-screen h-screen bg-[#aaaa] flex justify-center items-center top-0 bottom-0 z-10'>
            <div class='elevation-3 bg-surface text-on-surface p-4 rounded-lg m-5'>
              <div class="text-xl">共有</div>
              {
                (() => {
                  const data = uploadedFiles()[shareIndex()]
                  const link = location.href + '#' + data.fileId + (data.password ? `-${data.password}` : '!')
                  return <div>
                    <div>
                      <div>ダウンロードリンク: </div>
                      <div class='overflow-x-scroll'>
                        <a href={link} class='underline'>{ link }</a>
                      </div>
                    </div>
                    <div class="flex justify-center">
<QRCodeSVG
  value={link}
  size={128}
  bgColor={"#ffffff"}
  fgColor={"#000000"}
  level={"L"}
  includeMargin={false}

/>

                    </div>
                  </div>
                })()
              }
            </div>
          </div>
        }
      </div>
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
      <div class="flex justify-center">
        <button class='outlined-button' onClick={async () => {
          let fileData = file() as File
          if (enableE2ee()) {
            const password = e2eeKey()
            
            const salt = CryptoJS.lib.WordArray.random(128 / 8)
            const iv = CryptoJS.lib.WordArray.random(128 / 8)
            const metaData: string = CryptoJS.enc.Hex.stringify(salt) + ',' + CryptoJS.enc.Hex.stringify(iv) + ','
            
            const binaryString = await blob2BinaryString(fileData)
            const encrypted = CryptoJS.AES.encrypt(
              CryptoJS.enc.Utf8.parse(binaryString),
              CryptoJS.PBKDF2(
                CryptoJS.enc.Utf8.parse(password),
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
            )
            const b64 = metaData + encrypted
            fileData = new File([b64], fileData.name)
          }
          const formData = new FormData()
          formData.append('file', fileData)
          const resJson = await fetch('https://api.end2end.tech/upload', {
            method: 'post',
            body: formData
          }).then(res => res.json())
          setUploadedFiles([...uploadedFiles(), {
            fileName: resJson.FileName,
            fileId: resJson.FileID,
            removePassword: resJson.RemovePassword,
            password: enableE2ee() ? e2eeKey() : null,
          }])
        }}>アップロード</button>
      </div>
      <div>
        <div class="grid grid-cols-3">
          <div>File Name</div>
          <div>Remove Password</div>
          <div></div>
          {
            uploadedFiles().map((data, index) => {
              return [
                <div>{ data.fileName }</div>,
                <div>{ data.removePassword }</div>,
                <div>
                  <a class='filled-button' onClick={() => {
                    setShareIndex(index)
                  }}>共有</a>
                </div>
              ]
            })
          }
        </div>
      </div>
    </div>
  )
}) satisfies Component
