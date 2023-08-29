import type { Component } from 'solid-js'
import { createSignal } from "solid-js"

export default (() => {
  const [enableE2ee, setEnableE2ee] = createSignal(false)
  const [file, setFile] = createSignal(new File())
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
                    <input type='text' class="p-1 border-2 border-outline bg-surface text-on-surface" />
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center">
        <button class='outlined-button' onClick={async () => {
          alert(URL.createObjectURL(file()))
        }}アップロード</button>
      </div>
    </div>
  )
}) satisfies Component
