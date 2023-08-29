import type { Component } from 'solid-js'
import { createSignal } from 'solid-js'
interface Props {
  hash: () => string
}
export default ((props: Props) => {
  const id = props.hash().split('-')[0].slice(1)
  const [password, setPassword] = createSignal(props.hash().split('-').slice(1).join(''))
  
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
            const blobUrl = URL.createObjectURL(await fetch(url).then(res => res.blob()))
            const aTag = document.createElement('a')
            aTag.download = 'unknown'
            aTag.href = blobUrl
            aTag.click(aTag)
          }}>
            Download!
          </button>
        </div>
      </div>
    </div>
  </div>
}) satisfies Component
