;(function () {
  'use strict'
  document.querySelectorAll('pre > code').forEach(function (codeBlock) {
    var sourceTypeBox = document.createElement('div')
    sourceTypeBox.className = 'source-type-box'
    var copyButton = document.createElement('a')
    copyButton.className = 'copy-code-button'
    copyButton.dataset.title = 'Copy'
    copyButton.appendChild(document.createElement('i')).className = 'far fa-copy'
    var dataSource = document.createElement('span')
    dataSource.className = 'data-source'
    if (codeBlock.dataset.lang) {
      dataSource.innerHTML += codeBlock.dataset.lang
    } else {
      dataSource.innerHTML += ' '
    }
    var fadeShadow = document.createElement('span')
    fadeShadow.className = 'fade-shadow'

    copyButton.addEventListener('click', function (e) {
      // NOTE: ignore event on pseudo-element
      if (e.currentTarget === e.target) return
      var bashText = codeBlock.innerText
      // remove '$' from copy to code functionality in code block console
      var check = bashText.charAt(0)
      if (check === '$') {
        var spliceData = bashText.substring(2)
        navigator.clipboard.writeText(spliceData).then(
          function () {
            /* Chrome doesn't seem to blur automatically,
                leaving the button in a focused state. */
            copyButton.blur()
            copyButton.dataset.title = 'Copied ✓'
            setTimeout(function () {
              copyButton.dataset.title = 'Copy'
            }, 2000)
          },
          function () {
            copyButton.dataset.title = 'Error'
          })
      } else {
        navigator.clipboard.writeText(codeBlock.innerText).then(
          function () {
            /* Chrome doesn't seem to blur automatically,
                leaving the button in a focused state. */
            copyButton.blur()
            copyButton.dataset.title = 'Copied ✓'
            setTimeout(function () {
              copyButton.dataset.title = 'Copy'
            }, 2000)
          },
          function () {
            copyButton.dataset.title = 'Error'
          })
      }
    })
    var pre = codeBlock.parentNode
    pre.appendChild(sourceTypeBox)
    sourceTypeBox.appendChild(dataSource)
    sourceTypeBox.appendChild(copyButton)
    pre.appendChild(fadeShadow)
  })
})()
