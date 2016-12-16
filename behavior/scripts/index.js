'use strict'

exports.handle = function handle(client) {
  const sayHello = client.createStep({
    satisfied() {
      return Boolean(client.getConversationState().helloSent)
    },

    prompt() {
      client.addResponse('app:response:name:welcome')
      client.addResponse('app:response:name:provide/documentation', {
        documentation_link: 'http://docs.init.ai',
      })
      client.addResponse('app:response:name:provide/instructions')
      client.updateConversationState({
        helloSent: true
      })
      client.done()
    }
  })

  const untrained = client.createStep({
    satisfied() {
      return false
    },

    prompt() {
      client.addResponse('app:response:name:apology/untrained')
      client.done()
    }
  })

  const aide = client.createStep({
    satisfied() {
      return false
    },

    prompt() {
      client.addResponse('Comment puis-je vous aider ?')
      client.done()
    }
  })

  const handleGreeting = client.createStep({
    satisfied() {
      return false
    },

    prompt() {
      client.addTextResponse('Bonjour')
      client.done()
    }
  })

  const handleGoodbye = client.createStep({
    satisfied() {
      return false
    },

    prompt() {
      client.addTextResponse('Au revoir, à bientôt !')
      client.done()
    }
  })

  const handleAgressivite = client.createStep({
    satisfied() {
  
    },

    prompt() {
      client.addResponse('app:response:name:assertivite/assertivite')
      client.done()
    }
  })

  client.runFlow({
    classifications: {
      goodbye: 'goodbye',
      greeting: 'greeting',
      agressivite: 'assertivite'
    },
    streams: {
      goodbye: handleGoodbye,
      greeting: handleGreeting,
    main: 'onboarding',
      onboarding: [sayHello],
       agressivite: handleAgressivite,
      end: [aide]
    }
  })
}
