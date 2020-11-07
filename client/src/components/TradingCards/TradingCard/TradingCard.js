import React, { useRef } from 'react';
import classes from './TradingCard.module.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from '../../Modal/Modal';
import useModal from '../../../hooks/useModal';
import CardHeader from './CardHeader/CardHeader';
import CardBody from './CardBody/CardBody';
import SharesForm from '../../Forms/SharesForm/SharesForm';

const TradingCard = (props) => {
    const title = `${props.title}: ${props.subtitle}`;
    
    const buyModal = useModal();
    const sellModal = useModal();

    const buyInputRef = useRef(null);
    const sellInputRef = useRef(null);

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
            <Card style={{ width: "100%" }}>
                <Card.Title>
                    <CardHeader 
                        title={title} 
                        handleShowBuyModal={buyModal.handleShowModal} 
                        handleShowSellModal={sellModal.handleShowModal}/>
                </Card.Title>
                <Card.Body>
                    <CardBody price={props.price} percentage={props.percentage} daily={props.daily}/>
                </Card.Body>
            </Card>

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