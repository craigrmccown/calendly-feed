import ensureEnvironment from '../../shared/services/ensureEnvironment'
import Env from '../../shared/services/Env'

export default { ...Env, ...ensureEnvironment(['PORT', 'WDS_PORT']) }
