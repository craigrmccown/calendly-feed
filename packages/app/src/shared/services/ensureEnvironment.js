const ensureEnvironment = vars => {
  const missing = vars.filter(v => global.process.env[v] == null)

  if (missing.length > 0) {
    throw new Error(`These environment variables are required but not set: ${missing.join(', ')}`)
  }

  return vars.reduce((acc, val) => ({ ...acc, [val]: global.process.env[val] }), {})
}

export default ensureEnvironment
