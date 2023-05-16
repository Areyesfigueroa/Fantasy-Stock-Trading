import React, { useRef, useState } from 'react'
import classes from './TradingCard.module.css'
import Button from 'react-bootstrap/Button'
import Modal from '../../Modal/Modal'
import useModal from '../../../hooks/useModal'
import SharesForm from '../../Forms/SharesForm/SharesForm'
import Card from '../../Card/Card'
import { getCardItemVariant, formatNumToCurrency } from '../../../utils'

const TradingCard = ({
  title,
  subtitle,
  price,
  prevPrice,
  percentage,
  daily,
  sharesHeld,
  buy,
  sell
}) => {
  const { handleCloseModal, handleShowModal, show: showModal } = useModal()

  const inputRef = useRef()

  const [showBuyFooterButton, setShowBuyFooterButton] = useState(true)

  const handleShowBuyModal = () => {
    setShowBuyFooterButton(true)
    handleShowModal()
  }
  const handleShowSellModal = () => {
    setShowBuyFooterButton(false)
    handleShowModal()
  }

  const cardButtonList = [
    { text: 'Buy', click: handleShowBuyModal },
    { text: 'Sell', click: handleShowSellModal }
  ]

  const cardItems = [
    {
      title: 'Current Price',
      subtitle: formatNumToCurrency(price),
      variant: getCardItemVariant(price, prevPrice),
      compareTitle: 'Previous Closed',
      compareValue: formatNumToCurrency(prevPrice)
    },
    {
      title: 'Percent Change',
      subtitle: `${percentage}%`,
      variant: getCardItemVariant(percentage, 0)
    },
    {
      title: 'Daily Gain/Loss',
      subtitle: formatNumToCurrency(daily),
      variant: getCardItemVariant(daily, 0)
    },
    {
      title: 'Shares Held',
      subtitle: sharesHeld
    }
  ]

  const handleBuy = () => {
    buy(
      subtitle,
      parseInt(inputRef.current.value),
      isNaN(price) ? +price : price
    )
    handleCloseModal()
  }

  const handleSell = () => {
    sell(
      subtitle,
      parseInt(inputRef.current.value),
      isNaN(price) ? +price : price
    )
    handleCloseModal()
  }

  const renderFooterButton = () => {
    if (showBuyFooterButton) return <Button onClick={handleBuy}>Buy</Button>
    return <Button onClick={handleSell}>Sell</Button>
  }

  const cardTitle = `${title}: ${subtitle}`

  return (
    <div className={classes.TradingCard}>
      <Card
        title={cardTitle}
        buttonList={cardButtonList}
        itemList={cardItems}
      />
      <Modal
        show={showModal}
        close={handleCloseModal}
        title={cardTitle}
        footer={renderFooterButton()}
      >
        <SharesForm price={price} shares={sharesHeld} inputRef={inputRef} />
      </Modal>
    </div>
  )
}

export default TradingCard
