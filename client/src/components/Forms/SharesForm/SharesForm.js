import React from 'react'
import Form from 'react-bootstrap/Form'

const SharesForm = ({ style, price, shares, inputRef }) => {
  return (
    <Form style={style}>
      <Form.Group controlId='sharesForm'>
        <Form.Label style={{ width: '100%' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '0 3px'
            }}
          >
            <div>{`Number of shares at: $${price}`}</div>
            <div>{`Current Shares Held: ${shares}`}</div>
          </div>
        </Form.Label>
        <Form.Control type='number' min={1} defaultValue={1} ref={inputRef} />
      </Form.Group>
    </Form>
  )
}

export default SharesForm
