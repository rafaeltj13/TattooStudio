// import React from 'react';
// import { Switch } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import canAccess from '../../utils/authorizationRules';
// import AcessDiniedPage from '../error/AccessDeniedPage';

// const SwitchGuard = props => {
//   const role = useSelector(({ login }) => login.loggedUser.role);

//   const renderChildren = () => {
//     return React.Children.map(props.children, child => {
//       const { path, component } = child.props;
//       const allowedComponent = canAccess(role, path) ? component : AcessDiniedPage;

//       return React.cloneElement(child, {
//         ...child.props,
//         component: allowedComponent,
//       });
//     });
//   };

//   return <Switch>{renderChildren()}</Switch>;
// };

// export default SwitchGuard;
