import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Main from './pages/Main';
import LoginMain from './pages/LoginMain';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Shop from './pages/Shop';
import CreateProduct from './pages/CreateProduct';
import ProductList from './pages/ProductList';
import Detail from './pages/Detail';
import EditProduct from './pages/EditProduct';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import ShoppingCart from './pages/ShoppingCart';
import AdminProfile from './pages/AdminProfile';
import Payment from './pages/Payment';
import Orders from './pages/Orders';
import Footer from './components/Footer.js';
import About from './pages/About.js';
import AfterPayment from './pages/AfterPayment';
import UserOrder from './pages/UserOrder';
// import Header from './components/Header';
import { isLoginMode } from './connections/authConn';
import ChangePassword from './pages/ChangePassword';
import MobileNavBt from './components/MobileNavBt';
import MainNav from './pages/MainNav';

import Test from './pages/Test';

function App() {
	const { user } = isLoginMode();
	if (isLoginMode()) {
		console.log(user.role);
	}
	return (
		<BrowserRouter>
			<MainNav />
			{/* <Header /> */}
			<Switch>
				<Route path="/" exact component={Main} />
				<Route path="/afterlogin" exact component={LoginMain} />
				<Route path="/login" exact component={Login} />
				<Route path="/signup" exact component={Signup} />
				<Route path="/shop" exact component={Shop} />
				<Route path="/shop/:categoryId" exact component={Shop} />
				<Route path="/product/:productId" exact component={Detail} />
				<Route path="/about" exact component={About} />
				<Route path="/test" exact component={Test} />

				{isLoginMode() ? (
					user.role === 1 ? (
						<Switch>
							<Route
								path="/admin/profile"
								exact
								component={AdminProfile}
							/>
							<Route path="/admin/orders" exact component={Orders} />
							<Route
								path="/create/product"
								exact
								component={CreateProduct}
							/>
							<Route
								path="/admin/product"
								exact
								component={ProductList}
							/>
							<Route
								path="/admin/product/update/:productId"
								exact
								component={EditProduct}
							/>
							<Route path="/cart" exact component={ShoppingCart} />
							<Route path="/payment" exact component={Payment} />
							<Route
								path="/payment/success"
								exact
								component={AfterPayment}
							/>
						</Switch>
					) : (
						<Switch>
							<Route
								path="/profile/orders"
								exact
								component={UserOrder}
							/>
							<Route path="/profile" exact component={Profile} />
							<Route path="/profile/:userId" exact component={Profile} />
							<Route
								path="/profile/edit/:userId"
								exact
								component={EditProfile}
							/>
							<Route
								path="/profile/edit/pass/:userId"
								exact
								component={ChangePassword}
							/>

							<Route path="/cart" exact component={ShoppingCart} />
							<Route path="/payment" exact component={Payment} />
							<Route
								path="/payment/success"
								exact
								component={AfterPayment}
							/>
						</Switch>
					)
				) : (
					<Main />
				)}
			</Switch>
		</BrowserRouter>
	);
}

export default App;
