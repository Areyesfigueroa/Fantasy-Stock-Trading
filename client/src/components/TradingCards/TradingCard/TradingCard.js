import React, { useRef } from 'react';
import classes from './TradingCard.module.css';
import Button from 'react-bootstrap/Button';
import Modal from '../../Modal/Modal';
import useModal from '../../../hooks/useModal';
import SharesForm from '../../Forms/SharesForm/SharesForm';
import Card from '../../Card/Card';
import { getCardItemVariant, formatNumToCurrency } from '../../../utils';


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
        { 
            title: "Current Price", 
            subtitle: formatNumToCurrency(props.price), 
            variant: getCardItemVariant(props.price, props.prevPrice), 
            compareTitle: "Previous Closed", 
            compareValue: formatNumToCurrency(props.prevPrice)
        },
        { 
            title: "Percent Change", 
            subtitle: `${props.percentage}%`, 
            variant: getCardItemVariant(props.percentage, 0)
        },
        { 
            title: "Daily Gain/Loss", 
            subtitle: formatNumToCurrency(props.daily),
            variant: getCardItemVariant(props.daily, 0) 
        },
        { 
            title: "Shares Held", 
            subtitle: props.sharesHeld
        },
    ];

    const buy = () => {
        props.buy(props.subtitle, parseInt(buyInputRef.current.value), isNaN(props.price) ? +props.price:props.price);
        buyModal.handleCloseModal();
    }
    
    const sell = () => {
        props.sell(props.subtitle, parseInt(sellInputRef.current.value), isNaN(props.price) ? +props.price:props.price);
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
                    <SharesForm price={props.price} shares={props.sharesHeld} inputRef={buyInputRef} />
            </Modal>
            <Modal 
                show={sellModal.show} 
                close={sellModal.handleCloseModal} 
                title={title} 
                footer={<Button onClick={sell}>Sell</Button>}>
                    <SharesForm price={props.price} shares={props.sharesHeld} inputRef={sellInputRef}/>
            </Modal>
        </div>
    );
};

export default TradingCard;