export const test = (req, res) => {
  try {
    res.json('It is accessible!')
    console.log('Hello everyone')
  } catch (error) {
    console.log('Error with with mongodb: ', error)
  }
}

