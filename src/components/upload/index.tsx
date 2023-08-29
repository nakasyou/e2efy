import type { Component } from 'solid-js'
import { createSignal } from "solid-js"

export default (() => {
  const [enableE2ee, setEnableE2ee] = createSignal(false)
  return (
    <div>
      <div class="text-2xl text-center">Upload</div>
      <div class="grid bg-secondary text-on-secondary grid-rows-2 lg:grid-cols-2">
        <div>
          <div>
            <label>ファイルを選んでください(Max: 100MB)</label>
            <input type='file' />
          </div>
        </div>
        <div>
          <div class='text-lg mono'>Options</div>
          <div>
            <div>
              <div>
                <input type='checkbox' checked={enableE2ee()} onInput={(evt) => {
      alert(evt.currentTarget.checked)
                  setE2eeEnable(evt.currentTarget.checked)
                }} />
                <label>ファイルを暗号化する</label>
                <div>{enableE2ee().toString()}</div>
                {
                  enableE2ee() && <div>
                    <label>暗号化コード</label>
                    <input type='text' class="p-3 border border-outline bg-surface text-on-surface" />
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}) satisfies Component
