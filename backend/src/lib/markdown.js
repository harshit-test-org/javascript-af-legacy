import marky from 'marky-markdown'

export default (text, pack) =>
  marky(text, {
    prefixHeadingIds: false,
    package: pack
  })
