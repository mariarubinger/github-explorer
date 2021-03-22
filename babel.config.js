module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-typescript',
    ['@babel/preset-react', {
      runtime: 'automatic' // com essa configuraçãp, mesmo sem a importação do react tudo vai funcionar normalmente 
    }]
  ]
}