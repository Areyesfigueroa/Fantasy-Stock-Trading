import React, { useRef } from 'react';
import classes from './TradingCard.module.css';
import Button from 'react-bootstrap/Button';
import Modal from '../../Modal/Modal';
import useModal from '../../../hooks/useModal';
import SharesForm from '../../Forms/SharesForm/SharesForm';
import Card from '../../Card/Card';

const TradingCard = (props) => {
    const title = `${props.title}: ${props.subtitle}`;

    const buyModal = useModal();
    const sellModal = useModal();

    const buyInputRef = useRef(null);
    const sellInputRef = useRef(null);

    const cardButtonList = [
        { text: "Buy", click: buyModal.handleShowModal },
        { text: "Sell", click: sellModal.handleShowModal }
    ];

    const cardItems = [
        { title: "Current Price", subtitle: `$${props.price}` },
        { title: "Percent Change", subtitle: `${props.percentage}%` },
        { title: "Daily Gain/Loss", subtitle:  `$${props.daily}` }
    ];

    const buy = () => {
        props.buy(props.subtitle, buyInputRef.current.value);
        buyModal.handleCloseModal();
    }
    
    const sell = () => {
        props.sell(props.subtitle, sellInputRef.current.value);
        sellModal.handleCloseModal();
    }

    return (
        <div className={classes.TradingCard}>
            <Card title={title} buttonList={cardButtonList} itemList={cardItems} />

            <Modal 
                show={buyModal.show} 
                close={buyModal.handleCloseModal} 
                title={title}
                footer={<Button onClick={buy}>Buy</Button>}>
                    <SharesForm price={props.price} inputRef={buyInputRef} />
            </Modal>
            <Modal 
                show={sellModal.show} 
                close={sellModal.handleCloseModal} 
                title={title} 
                footer={<Button onClick={sell}>Sell</Button>}>
                    <SharesForm price={props.price} inputRef={sellInputRef}/>
            </Modal>
        </div>
    );
};

export default TradingCard;