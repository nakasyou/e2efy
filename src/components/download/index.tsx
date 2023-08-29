import type { Component } from 'solid-js'
import { createSignal } from 'solid-js'
interface Props {
  hash: () => string
}
export default ((props: Props) => {
  const id = props.hash().split('-')[0]
  const [password, setPassword] = props.hash().split('-').slice(1).join('')
  
  return <div>
    <div>
      <div class='text-2xl'>Download</div>
      <div>
        <div>
          <label>(暗号化されている場合)パスワード</label>
          <input value={password()} onInput={(evt) => {
            setPassword(evt.target.value)
          }}/>
        </div>
      </div>
    </div>
  </div>
}) satisfies Component
