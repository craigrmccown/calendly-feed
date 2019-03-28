import fs from 'fs'

const concatFiles = async path => {
  const files = await fs.promises.readdir(path)
  const content = await Promise.all(files.map(f => fs.promises.readFile(`${path}/${f}`)))

  return content.reduce((acc, val) => `${acc}${val}`, '')
}

export default concatFiles
