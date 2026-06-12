'use strict'

// Prism grammar for Logstash pipeline config syntax
// (input/filter/output sections, plugin blocks, key => value settings,
// conditionals with regex matches, field references, sprintf/grok
// %{...} references, {{ ... }} template placeholders and embedded
// Ruby in `code => '...'` settings).
module.exports = function (Prism) {
  // %{IP:[source][ip]} / %{[event][original]} / %{message}
  var sprintfField = {
    pattern: /%\{[^{}]*\}/,
    alias: 'variable',
    inside: {
      'grok-pattern': {
        // Pattern name in %{PATTERN:target}, e.g. IP, NOTSPACE, GREEDYDATA
        pattern: /(^%\{)[A-Z][A-Z0-9_]*/,
        lookbehind: true,
        alias: 'class-name',
      },
      'field-reference': {
        pattern: /\[[^\][]*\]/,
        alias: 'property',
      },
      punctuation: /^%\{|\}$|[:[\]]/,
    },
  }

  // {{ ansible_var }} placeholders used in templated pipeline configs
  var templatePlaceholder = {
    pattern: /\{\{[^{}]*\}\}/,
    alias: 'important',
  }

  Prism.languages.logstash = {
    comment: {
      pattern: /#.*/,
      greedy: true,
    },
    // Embedded Ruby in the ruby filter's code setting
    'ruby-code': {
      pattern: /(\bcode\s*=>\s*)(["'])(?:\\[\s\S]|(?!\2)[\s\S])*\2/,
      lookbehind: true,
      greedy: true,
      inside: {
        delimiter: {
          pattern: /^["']|["']$/,
          alias: 'string',
        },
        ruby: {
          pattern: /[\s\S]+/,
          alias: 'language-ruby',
          inside: Prism.languages.ruby,
        },
      },
    },
    string: {
      pattern: /(["'])(?:\\.|(?!\1)[\s\S])*?\1/,
      greedy: true,
      inside: {
        'sprintf-field': sprintfField,
        'template-placeholder': templatePlaceholder,
        'field-reference': {
          // e.g. "[event][original]" used as hash key / rename target
          pattern: /^(["'])(?:\[[^\][\r\n]+\])+(?=\1$)/,
          lookbehind: true,
          alias: 'variable',
        },
      },
    },
    // Regex literal after =~ / !~ in conditionals
    regex: {
      pattern: /((?:=~|!~)\s*)\/(?:\\.|[^/\\\r\n])*\//,
      lookbehind: true,
      greedy: true,
    },
    keyword: /\b(?:if|else|in|not|and|or|nand|xor)\b/,
    section: {
      // Top-level pipeline sections
      pattern: /\b(?:input|filter|output)(?=\s*\{)/,
      alias: 'keyword',
    },
    'plugin-name': {
      // Plugin blocks like mutate { ... }, grok { ... }, elasticsearch { ... }
      pattern: /\b[a-z_][\w-]*(?=\s*\{)/,
      alias: 'function',
    },
    'sprintf-field': sprintfField,
    'template-placeholder': templatePlaceholder,
    'field-reference': {
      pattern: /\[[^\][\r\n]*\]/,
      alias: 'variable',
    },
    boolean: /\b(?:true|false)\b/,
    number: /\b\d+(?:\.\d+)?\b/,
    'attr-name': /\b[a-zA-Z_][\w-]*(?=\s*=>)/,
    operator: /=>|==|!=|<=|>=|=~|!~|&&|\|\||[<>!]/,
    punctuation: /[{}[\](),]/,
  }
}
