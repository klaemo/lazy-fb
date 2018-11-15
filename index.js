export default function loadFacebookSDK (opts = {}) {
  const id = 'facebook-jssdk'

  return new Promise(resolve => {
    if (document.getElementById(id)) {
      return resolve(window.FB)
    }

    const {
      lang = 'en_US',
      debug = false,
      sdkModule = ''
    } = opts

    opts.version = opts.version || 'v2.11'
    delete opts.lang
    delete opts.debug

    window.fbAsyncInit = () => {
      window.FB.init(opts)
      resolve(window.FB)
    }

    const fjs = document.getElementsByTagName('script')[0]
    const js = document.createElement('script')
    js.id = id
    const slash = sdkModule ? '/' : ''
    const srcPrefix = `https://connect.facebook.net/${lang}/sdk${slash}`
    const srcSuffix = `${debug ? `${sdkModule}/debug` : sdkModule}.js`
    js.src = srcPrefix + srcSuffix
    fjs.parentNode.insertBefore(js, fjs)
  })
}
