;(function () {
  'use strict'

  window.Prism = { manual: true }
  var Prism = require('prismjs')
  require('prismjs/plugins/keep-markup/prism-keep-markup')

  require('prismjs/components/prism-asciidoc')
  require('prismjs/components/prism-bash')
  require('prismjs/components/prism-csv')
  require('prismjs/components/prism-diff')
  require('prismjs/components/prism-dns-zone-file')
  require('prismjs/components/prism-docker')
  require('prismjs/components/prism-http')
  require('prismjs/components/prism-ini')
  require('prismjs/components/prism-json')
  require('prismjs/components/prism-markdown')
  require('prismjs/components/prism-powershell')
  require('prismjs/components/prism-properties')
  require('prismjs/components/prism-python')
  require('prismjs/components/prism-ruby')
  require('prismjs/components/prism-sql')
  require('prismjs/components/prism-yaml')
  require('./prism-logstash')(Prism)

  Prism.languages.zsh = Prism.languages.console = Prism.languages.bash
  ;['conf', 'cron', 'openssl', 'log', 'mermaid'].forEach(function (id) {
    Prism.languages[id] = Prism.languages.plaintext
  })

  function parseLineSpec (spec) {
    var lines = {}
    spec.split(/[,;]/).forEach(function (part) {
      var m = /^\s*(\d+)\s*(?:(?:\.\.|-)\s*(\d+))?\s*$/.exec(part)
      if (!m) return
      for (var i = +m[1], to = m[2] ? +m[2] : +m[1]; i <= to; i++) lines[i] = true
    })
    return lines
  }

  function highlightLines (code, lines) {
    var open = []
    var out = code.innerHTML.split('\n').map(function (line, idx) {
      var prefix = open.join('')
      var tagRx = /<span[^>]*>|<\/span>/g
      var m
      while ((m = tagRx.exec(line))) m[0] === '</span>' ? open.pop() : open.push(m[0])
      var suffix = new Array(open.length + 1).join('</span>')
      var content = prefix + line + suffix
      return lines[idx + 1] ? '<span class="hl-line">' + content + '</span>' : content
    })
    code.innerHTML = out.join('\n')
  }

  ;[].slice.call(document.querySelectorAll('pre.highlight code')).forEach(function (node) {
    Prism.highlightElement(node)
    if (node.dataset.highlightLines) highlightLines(node, parseLineSpec(node.dataset.highlightLines))
  })
})()
