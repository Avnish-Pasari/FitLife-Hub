// import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from './components/Home';
import SignupPage from './components/SignUp';
import LogInPage from './components/LogIn';
import StudioView from './components/StudioView';
import StudioDetailView from './components/StudioDetailView';
import ProfileView from './components/ProfileView';
import UserEditProfile from './components/UserEditProfile';
import CreatePayment from './components/CreatePayment';
import EditPaymentInfo from './components/EditPaymentInfo';
import ViewClassInfo from './components/ViewClassInfo';
import APIContext, { useAPIContext } from './Contexts/APIContext';
import APIContext2, {useAPIContext2} from './Contexts/APIContext2';
import SubscriptionView from './components/SubscriptionView';
import APIContext3, {useAPIContext3} from './Contexts/APIContext3';
import APIContext4, {useAPIContext4} from './Contexts/APIContext4';
import PaymentHistory from './components/PaymentHistory';
import APIContext5, {useAPIContext5} from './Contexts/APIContext5';
import PaymentSchedule from './components/PaymentSchedule';
import APIContext6, {useAPIContext6} from './Contexts/APIContext6';
import ClassSchedule from './components/ClassSchedule';
import APIContext7, {useAPIContext7} from './Contexts/APIContext7';
import ClassHistory from './components/ClassHistory';
import APIContextFilter, {useAPIContextFilter} from './Contexts/APIContextFilter';
import MapComponent from './components/StudioMapComponent';
import FilterMapComponent from './components/StudioFilterMap';
import StudioFilterView from './components/StudioFilter';
import LandingPage from './components/LandingPage';


function App() {
    // We have used react bootstrapping to create the navigation bar, the Forms and the Table
    // Reference - https://react-bootstrap.github.io/
    const studios = (
        <APIContext.Provider value={useAPIContext()}>
            <StudioView />
        </APIContext.Provider>
    )
    const studiosFilter = (
        <APIContext.Provider value={useAPIContext()}>
            <StudioFilterView />
        </APIContext.Provider>
    )
    const classes = (
        <APIContext2.Provider value={useAPIContext2()}>
            <StudioDetailView is_begin={true}/>
        </APIContext2.Provider>
    )

    const subscriptions = (
        <APIContext3.Provider value={useAPIContext3()}>
            <SubscriptionView />
        </APIContext3.Provider>
    )

    const payhist = (
        <APIContext4.Provider value={useAPIContext4()}>
            <PaymentHistory />
        </APIContext4.Provider>
    )

    const pay = (
        <APIContext5.Provider value={useAPIContext5()}>
            <PaymentSchedule />
        </APIContext5.Provider>
    )

    const classschedule = (
        <APIContext6.Provider value={useAPIContext6()}>
            <ClassSchedule />
        </APIContext6.Provider>
    )

    const classhistory = (
        <APIContext7.Provider value={useAPIContext7()}>
            <ClassHistory />
        </APIContext7.Provider>
    )

    const classfilter = (
        <APIContextFilter.Provider value={useAPIContextFilter()}>
            <StudioDetailView />
        </APIContextFilter.Provider>


    )

  return (
    // We have used react bootstrapping to create the navigation bar, the Forms and the Table
    // Reference - https://react-bootstrap.github.io/
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage />}>
                <Route index element={<LandingPage />} />
                <Route path="signup" element={<SignupPage />} />
                <Route path="login" element={<LogInPage />} />
                {/* <Route path="studios/view" element={<StudioView />} /> */}
                <Route path="viewprofile" element={<ProfileView />} />
                <Route path="editprofile" element={<UserEditProfile />} />
                <Route path="createpaymentinfo" element={<CreatePayment />} />
                <Route path="editpaymentinfo" element={<EditPaymentInfo />} />
                <Route path="allstudiodetails" element={studios} />
                <Route path='viewclassinfo' element={<ViewClassInfo />} />
                <Route path='viewstudio' element={classes} />
                <Route path='viewsubscriptions' element={subscriptions} />
                <Route path='viewpaymenthistory' element={payhist} />
                <Route path='viewpaymentschedule' element={pay} />
                <Route path='viewclassschedule' element={classschedule} />
                <Route path='viewclasshistory' element={classhistory} />
                <Route path='inputmap' element={<MapComponent lst={[]} is_input={true}/>} />
                <Route path='filtermap' element={<FilterMapComponent lst={[]} is_input={true}/>} />
                <Route path='studiosfilter' element={studiosFilter} />
                {/* <Route path="*" element={<NoPage />} /> */}
            </Route>
        </Routes>
    </BrowserRouter>
    );
}

export default App;
