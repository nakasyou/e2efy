import type { Component } from 'solid-js'
import { Router, memoryIntegration, Routes, Route } from "@solidjs/router"

import Home from './apps/home/index.tsx'
import About from './apps/about/index.tsx'
const App: Component = () => {
  return <div class='min-h-screen bg-background text-on-background'>
    <div>
      <div class="flex justify-center">
        <div class="text-2xl">e2eefy</div>
      </div>
    </div>
    
    <Router source={hashIntegration()}>
      <Routes>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
      </Routes>
    </Router>
    
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
