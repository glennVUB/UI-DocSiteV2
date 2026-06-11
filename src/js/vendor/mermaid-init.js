;(function () {
  'use strict'

  var codeBlocks = document.querySelectorAll('pre > code[data-lang="mermaid"]')
  if (!codeBlocks.length) return

  var siteScript = document.getElementById('site-script')
  var uiRootPath = (siteScript && siteScript.dataset.uiRootPath) || '.'

  var diagrams = []
  for (var i = 0; i < codeBlocks.length; i++) {
    var code = codeBlocks[i]
    var block = code.closest('.listingblock') || code.parentNode
    var container = document.createElement('div')
    container.className = 'mermaid'
    container.textContent = code.textContent
    block.parentNode.replaceChild(container, block)
    diagrams.push(container)
  }

  var script = document.createElement('script')
  script.src = uiRootPath + '/js/vendor/mermaid.js'
  script.onload = function () {
    window.mermaid.initialize({ startOnLoad: false })
    window.mermaid.run({ nodes: diagrams })
  }
  document.body.appendChild(script)
})()
