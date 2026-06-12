;(function () {
  'use strict'

  var hljs = require('highlight.js/lib/core')
  hljs.registerLanguage('asciidoc', require('highlight.js/lib/languages/asciidoc'))
  hljs.registerLanguage('bash', require('highlight.js/lib/languages/bash'))
  hljs.registerLanguage('diff', require('highlight.js/lib/languages/diff'))
  hljs.registerLanguage('dns', require('highlight.js/lib/languages/dns'))
  hljs.registerLanguage('dockerfile', require('highlight.js/lib/languages/dockerfile'))
  hljs.registerLanguage('ini', require('highlight.js/lib/languages/ini'))
  hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'))
  hljs.registerLanguage('json', require('highlight.js/lib/languages/json'))
  hljs.registerLanguage('markdown', require('highlight.js/lib/languages/markdown'))
  hljs.registerLanguage('plaintext', require('highlight.js/lib/languages/plaintext'))
  hljs.registerLanguage('powershell', require('highlight.js/lib/languages/powershell'))
  hljs.registerLanguage('properties', require('highlight.js/lib/languages/properties'))
  hljs.registerLanguage('python', require('highlight.js/lib/languages/python'))
  hljs.registerLanguage('ruby', require('highlight.js/lib/languages/ruby'))
  hljs.registerLanguage('shell', require('highlight.js/lib/languages/shell'))
  hljs.registerLanguage('sql', require('highlight.js/lib/languages/sql'))
  hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'))
  hljs.registerLanguage('yaml', require('highlight.js/lib/languages/yaml'))

  hljs.registerAliases(['zsh'], { languageName: 'bash' })
  hljs.registerAliases(['conf', 'cron', 'openssl', 'log', 'mermaid', 'cisco', 'ios'], { languageName: 'plaintext' })

  hljs.configure({ ignoreUnescapedHTML: true })

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
      return lines[idx + 1] ? '<span class="hljs-line-hl">' + content + '</span>' : content
    })
    code.innerHTML = out.join('\n')
  }

  ;[].slice.call(document.querySelectorAll('pre code.hljs')).forEach(function (node) {
    hljs.highlightElement(node)
    if (node.dataset.highlightLines) highlightLines(node, parseLineSpec(node.dataset.highlightLines))
  })
})()
