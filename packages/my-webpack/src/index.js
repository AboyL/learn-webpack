setTimeout(() => {
  import('./module').then(res => {
    console.log('res', res)
  })
}, 1000);