import Loadable from 'react-loadable'
import { Loading } from '@components/common'

const AsyncLoadComponent = loader => Loadable({
  loader,
  loading: Loading
})

export default AsyncLoadComponent