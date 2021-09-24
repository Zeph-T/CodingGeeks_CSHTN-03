import './styles.css'
import { useState ,useEffect} from 'react'
import image from './download.jpeg'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import { Paper, Container, LinearProgress } from '@material-ui/core'
import WrappedButton from '../common/WrappedButton'
import httpService from '../../services/httpService'
import { api } from '../../utilities'
import { TextField } from '@mui/material'
const jwt = localStorage.getItem("token");

function Profile(props) {
//   const [buttonSelected, setbuttonSelected] = useState('profile');
  const [progress , setProgress] = useState(false);
  // const data = props.user
  const [products , setProducts] = useState([]);
  let resetPassword = () => {
    setProgress(true);
    httpService.post(api.BASE_URL + api.FORGOT_PASSWORD , {email : props.user.email}).then(response=>{
      if(response.data.status){
        props.openSnackBar(response.data.status);
        setProgress(false);
      }else{
        setProgress(false);
      }
    }).catch(err=>{
      setProgress(false);
      props.openSnackBar(err);
    })
  }
  useEffect(()=>{
    function orderHandler() {
        httpService
          .get(api.BASE_URL + api.GET_PAST_ORDERS, {
            headers: { accesstoken: jwt },
          })
          .then((response) => {
            if (response.data.success) {
              setProducts(response.data.orders)
            } else {
              props.openSnackBar('Error making payment')
            }
          })
          .catch((err) => {
            props.openSnackBar(err)
          })
      }
    orderHandler();
  },[])




  return (
    <div className="row">
        <div className="col-3">
          <div>
            <div className='col-md-4 animated fadeIn' key={props.user.id}>
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
                    {props.user.name}
                  </h5>
                  <div style={{ textAlign: 'center' }}>
                    <p className='card-text'> Username : {props.user.name} </p>
                    <p className='card-text'>Email : {props.user.email}</p>
                    <br />
                    <WrappedButton name="Reset Password" disabled={progress} color="primary" variant="outlined" onClick={resetPassword}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
         <div className="col-9">
            <div className='col-md-4 animated fadeIn' key={props.user._id}>
              <div className='card'>
                <div className='card-body'>
                  {products && products.map((product) => (
                    <div className='mt-5'>
                      <Container component='main' maxWidth='xl'>
                        <Paper className='' elevation={3}>
                          <div class='d-flex justify-content-between'>
                            <h1
                              className='category-head'
                              style={{ marginTop: '1rem' }}
                            >
                              {product.transactionId}
                            </h1>
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
                                  href={'/product/' + item.item._id}
                                >
                                  {item.item.name}
                                </a>
                                <p className='product-manuf'>
                                  By {item.item.manufacturer}
                                </p>
                                <hr />
                                <p>
                                  Price:{' '}
                                  <span className='price'>
                                    &#x20b9; {item.item.cost}
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
  )
}

export default Profile;