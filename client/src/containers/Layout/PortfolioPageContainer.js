import React, {useEffect, useContext} from 'react';
import { useHistory } from 'react-router';

import UserSessionContext from '../../context/UserSessionContext';
import PortfolioPage from '../../components/Layout/PortfolioPage/PorfolioPage';

const PortfolioPageContainer = () => {
    const userSession = useContext(UserSessionContext());
    const history = useHistory();

    useEffect(() => {
        if(!userSession.session) history.push('/login');
    });
    return (
        <PortfolioPage 
            accountBalance={100000}
            totalHoldingValue={0}
            totalAssetValue={0}
        />
    );
};

export default PortfolioPageContainer;