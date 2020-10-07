import * as actions from './store/action/index'
import React, { Suspense, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import Header from './components/Header/Header';
import LoadingSpinner from './components/Loader/LoadingSpinner'


const Auth = React.lazy(() => import('./containers/Auth/Auth'))
const Upload = React.lazy(() => import('./containers/Upload/Upload'))
const Home = React.lazy(() => import('./containers/Home'))
const Details = React.lazy(() => import('./containers/Product/ProductDetails'))
const CartPage = React.lazy(() => import('./containers/Cart/Cart'))

const App = props => {


  const { autoLogin } = props

  useEffect(() => {
    autoLogin();

  }, [autoLogin])


  let authRedirect = <Route path='/login' exact component={Auth} ></Route>
  if (props.isAuthenticated && props.role) {
    props.getCart({
      userId: props.userId,
      token: props.token
    })
    authRedirect = <Switch>
      <Route path='/login' exact component={Auth} ></Route>
      <Route path='/upload' exact component={Upload} ></Route>
      <Route path='/cart' exact component={CartPage} ></Route>
    </Switch>
  } else if (props.isAuthenticated) {
    props.getCart({
      userId: props.userId,
      token: props.token
    });
    authRedirect = <Switch>
      <Route path='/login' exact component={Auth} ></Route>

      <Route path='/cart' exact component={CartPage} ></Route>

    </Switch>
  }

  return (
    <div>
      <Header />
      <Suspense fallback={<LoadingSpinner asOverlay />}>
        <Switch>
          <Route path='/' exact component={Home}></Route>
          <Route path='/product/:productId' exact component={Details}></Route>
          {authRedirect}
          <Route exact render={() => <h1>Error:404 Page Not Found</h1>}></Route>
        </Switch>
      </Suspense>


    </div>
  );

}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    role: state.auth.role,
    userId: state.auth.userId,
    token: state.auth.token,

  }
}
const mapDispatchToProps = dispatch => {
  return {
    autoLogin: () => dispatch(actions.autoLogin()),
    getCart: (data) => dispatch(actions.getCart(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
