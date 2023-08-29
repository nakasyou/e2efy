import type { Component } from 'solid-js'

const App: Component = () => {
  return <div class='min-h-screen bg-background text-on-background'>
    <div>
      <div class="flex justify-center">
        <div class="text-2xl">e2eefy</div>
      </div>
    </div>
    <div>
      <div>
        <div class="text-xl text-center">Upload</div>
        <div class="grid bg-primary text-on-primary grid-rows-2 lg:grid-cols-2">
          <div>
            <div>
              <label>ファイルを選んでください(Max: 100MB)</label>
              <input type='file' />
            </div>
          </div>
          <div>
            
          </div>
        </div>
      </div>
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
