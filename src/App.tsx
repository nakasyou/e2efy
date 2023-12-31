import type { Component } from 'solid-js'
import { createSignal } from 'solid-js'
import Upload from './components/upload/index.tsx'
import Download from './components/download/index.tsx'

const App: Component = () => {
  const [hash, setHash] = createSignal(location.hash)
  window.addEventListener('hashchange', () => {
    setHash(location.hash)
  }, false)
  return <div class='min-h-screen bg-background text-on-background'>
    <div>
      <div class="flex justify-center">
        <div class="text-2xl">e2eefy</div>
      </div>
    </div>
    <div>
      {
        hash() === '' ? <Upload /> : <Download hash={hash} />
      }
    </div>
    <div>
      <hr />
      <div>
        <div>
          <a href="https://twitter.com/activetk5929">ActiveTK.</a>さんが作った匿名ファイルアップローダー、
          「<a href="https://End2End.tech">End2End.tech</a>」のクライアントです。
          本家に機能を求めたかったので、作りました。
        </div>
      </div>
    </div>
  </div>
}

export default App
