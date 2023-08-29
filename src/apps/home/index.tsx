import type { Component } from 'solid-js'

export default () => {
  const inputFileId = crypto.randomUUID()
  return <>
    <div>
      <div class="bg-primary text-on-primary">
        <label for={inputFileId}>ファイルを選択してください(Max: 100MB)</label>
        <input type='file' id={inputFileId} />
      </div>
    </div>
  </>
}
