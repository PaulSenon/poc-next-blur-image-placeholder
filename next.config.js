// const withPreact = require('next-plugin-preact');

module.exports = (phase, { defaultConfig }) => {
   
    return {
        
        webpack: (config, { dev, isServer }) => {
            // Replace React with Preact only in client production build
            // if (!dev && !isServer) {
            //   Object.assign(config.resolve.alias, {
            //     'react': 'preact/compat',
            //     'react-dom/test-utils': 'preact/test-utils',
            //     'react-dom': 'preact/compat',
            //   });
            // }

            config.module= {
                ...config.module,
                exprContextCritical: false
            }
        
            return config;
        },

        images: {
            domains: ['static.euronews.com'],
        }
    }
}