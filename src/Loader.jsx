import React from 'react'
import { css } from 'react-emotion'
// First way to import
import { PacmanLoader } from 'react-spinners'
// Another way to import
// import ClipLoader from 'react-spinners/ClipLoader';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`

class Loader extends React.Component {
  render () {
    return (
      <div className='sweet-loading' style={{ margin: '25px 0 0 -25px', minHeight: '100px' }}>
        <PacmanLoader
          className={override}
          color={'#fefefe'}
          loading={!!this.props.loading}
        />
      </div>
    )
  }
}

export default Loader
