import './styles.css'
import { useState } from 'react'
import image from './download.jpeg'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import { Paper, Container, LinearProgress } from '@material-ui/core'
import WrappedButton from '../common/WrappedButton'
import httpService from '../../services/httpService'
import { api } from '../../utilities'
const jwt = localStorage.getItem("token");

function Profile(props) {
  const [buttonSelected, setbuttonSelected] = useState('profile')
  // const data = props.user
  const data = {
    id: '1',
    image: './download.jpeg',
    picture: './download.jpeg',
    name: 'Nithin Reddy',
    location: 'AP',
    phone: '1234r134',
    email: 'qarsdvqasd',
  }
  var products

  function orderHandler() {
    httpService
      .get(api.BASE_URL + api.GET_PAST_ORDERS, {
        headers: { accesstoken: jwt },
      })
      .then((response) => {
        if (response.data.success) {
          products = response.data
        } else {
          props.openSnackBar('Error making payment')
        }
      })
      .catch((err) => {
        props.openSnackBar(err)
      })
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <ButtonGroup variant='outlined' aria-label='outlined button group'>
        <Button
          onClick={() => {
            setbuttonSelected('profile')
          }}
        >
          Profile
        </Button>
        {/* <Button>Past Scans</Button> */}
        <Button
          onClick={() => {
            setbuttonSelected('orders')
          }}
        >
          Past Orders
        </Button>
      </ButtonGroup>
      {buttonSelected === 'profile' ? (
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '1000px', margin: 'auto' }}>
            <div className='col-md-4 animated fadeIn' key={data.id}>
              <div className='card'>
                <div className='card-body'>
                  <div className='avatar' style={{ alignItems: 'center' }}>
                    <img
                      src={image}
                      style={{ width: '100px' }}
                      className='card-img-top'
                      alt=''
                    />
                  </div>
                  <h5 className='card-title' style={{ textAlign: 'center' }}>
                    {data.name}
                  </h5>
                  <div style={{ textAlign: 'center' }}>
                    <p className='card-text'> Username : {data.name} </p>
                    <p className='card-text'>Email : {data.email}</p>
                    <br />
                    <WrappedButton>Reset Password</WrappedButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div style={{ width: '1000px', margin: 'auto' }}>
            <div className='col-md-4 animated fadeIn' key={data.id}>
              <div className='card'>
                <div className='card-body'>
                  {products.map((product) => (
                    <div className='mt-5'>
                      <Container component='main' maxWidth='xl'>
                        <Paper className='' elevation={3}>
                          <div class='d-flex justify-content-between'>
                            <h1
                              className='category-head'
                              style={{ marginTop: '1rem' }}
                            >
                              {product.category}
                            </h1>
                            <a href={'/?search=' + product.category}>
                              <WrappedButton
                                variant='contained'
                                color='primary'
                                name='View All'
                                style={{
                                  marginTop: '1.4rem',
                                  marginRight: '1rem',
                                }}
                              />
                            </a>
                          </div>

                          <hr />
                          <div className='row d-flex justify-content-between'>
                            {product.items.map((item) => (
                              <div className='col p-2 m-4 prod-info-home'>
                                <img
                                  className='prod-img-home'
                                  alt='medicine'
                                  src='https://source.unsplash.com/200x200/?medicine'
                                />
                                <a
                                  className='price-home'
                                  href={'/product/' + item._id}
                                >
                                  {item.name}
                                </a>
                                <p className='product-manuf'>
                                  By {item.manufacturer}
                                </p>
                                <hr />
                                <p>
                                  Price:{' '}
                                  <span className='price'>
                                    &#x20b9; {item.cost}
                                  </span>
                                </p>
                              </div>
                            ))}
                          </div>
                        </Paper>
                      </Container>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile;