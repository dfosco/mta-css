export default {
  siteRoot: 'https://dfosco.github.io/mta-css',
  webpack: (config, { stage }) => {
    if (stage === 'prod') {
      config.output.publicPath = '/mta-css/'
    }
    return config
  },
}
