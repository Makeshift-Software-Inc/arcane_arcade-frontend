import React from 'react';

import { observer } from 'mobx-react';

import Modal from '../../../components/Modals/Modal';
import Header from '../../../components/Modals/Header/Header';

import CompletedOrder from './Completed';
import ActiveOrder from './Active';

import './Modal.scss';

const OrderDetailsModal = ({
  order,
  setSelectedOrder,
  withoutDistributionMethod,
}) => {
  if (!order) return null;

  const close = () => setSelectedOrder(undefined);

  return (
    <Modal blue={order.active()}>
      <Header close={close} closeWhite={order.active()} />
      <div className="order-details-modal">
        {order.paid() ? (
          <CompletedOrder
            order={order}
            withoutDistributionMethod={withoutDistributionMethod}
          />
        ) : (
          <ActiveOrder order={order} />
        )}
      </div>
    </Modal>
  );
};
export default observer(OrderDetailsModal);
