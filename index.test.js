/* eslint-env jest */

import lazyFB from './index.js'

describe('Lazy FB', () => {
  beforeAll(() => {
    document.body.appendChild(document.createElement('script'))
  })

  afterEach(() => {
    const js = document.getElementById('facebook-jssdk')
    js.parentNode.removeChild(js)
  })

  it('should load sdk with default options', () => {
    window.FB = {
      init: jest.fn()
    }

    // pretend the sdk has been loaded
    setTimeout(() => window.fbAsyncInit())

    return lazyFB().then(sdk => {
      const js = document.getElementById('facebook-jssdk')

      expect(sdk).toBe(window.FB)
      expect(js.src).toBe('https://connect.facebook.net/en_US/sdk.js')
      expect(window.FB.init).toHaveBeenCalledWith({ version: 'v2.11' })
    })
  })

  it('should load sdk with custom options', () => {
    window.FB = {
      init: jest.fn()
    }

    // pretend the sdk has been loaded
    setTimeout(() => window.fbAsyncInit())

    return lazyFB({ lang: 'de_DE', debug: true }).then(sdk => {
      const js = document.getElementById('facebook-jssdk')

      expect(sdk).toBe(window.FB)
      expect(js.src).toBe('https://connect.facebook.net/de_DE/debug.js')
      expect(window.FB.init).toHaveBeenCalledWith({ version: 'v2.11' })
    })
  })

  it('should init sdk with custom options', () => {
    window.FB = {
      init: jest.fn()
    }

    // pretend the sdk has been loaded
    setTimeout(() => window.fbAsyncInit())

    return lazyFB({ cookie: true, appId: 'app-id' }).then(sdk => {
      expect(sdk).toBe(window.FB)
      expect(window.FB.init).toHaveBeenCalledWith({
        appId: 'app-id',
        cookie: true,
        version: 'v2.11'
      })
    })
  })

  it('should not load sdk again if it is already on the page', () => {
    // insert pretend-sdk
    const js = document.createElement('script')
    js.id = 'facebook-jssdk'
    document.body.appendChild(js)

    window.FB = {
      init: jest.fn()
    }

    return lazyFB().then(sdk => {
      expect(sdk).toBe(window.FB)
      expect(document.querySelectorAll('#facebook-jssdk').length).toBe(1)
      expect(window.FB.init).not.toHaveBeenCalled()
    })
  })
})
